<script>
	import { db } from './../scripts/fb.js';
    import { onMount } from "svelte";
    import { doc, getDoc,updateDoc,setDoc, collection } from "firebase/firestore";
    import {
    Configuration,
    OpenAIApi
} from 'openai';
	import Status from './Status.svelte';
const configuration = new Configuration({
    apiKey: "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",
});
let NoteGPT = "";
let AiResponse = "";
let flashcards = "";
let noteGptLoading = false;
export let Quill;
const openai = new OpenAIApi(configuration);
    let editor;
    export let userDB;
    export let docum = "Loading...";
      export let toolbarOptions = [
          [{ header: 1 }, { header: 2 }, "blockquote", "link", "image", "video"],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "ordered" }],
          [{ align: [] }],
          ["clean"]
      ];
      let quill;
    onMount(async () => {

      quill = new Quill(editor, {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow",
        placeholder: "Start writing your notes :D."
      });
      //quill inner html
      try {
        quill.root.innerHTML = docum.noteContent;
      } catch (error) {
        location.reload();
      }
      //  quill.root.innerHTML = document.noteContent;
       addEventListener("keyup", (event) => {
    if (event.keyCode === 18) {
    aiAutocomplete();
    return;
  }
  // do something
});
      });

      async function save(){
        const docRef = doc(db, "Users", userDB.uid);
        const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        userDB = docSnap.data();
        const dr = doc(collection(db, "Users/"),userDB.uid);
          // const docSnap = await getDoc(docRef);
        userDB.notes[docum.docid] = {
            noteContent: quill.root.innerHTML,
            docid: docum.docid,
            title: docum.title
        }
          updateDoc(dr, {
            notes  :userDB.notes});  
      }          // save quill inner html to firestore
        

      }
      async function aiAutocomplete() {
        console.log("Autocompleting...")
        let prmpt = `
        You are a smart AI AutoCompleter! Autocomplete the next bulletpoint.
        Example: 
          Notes:
            1.The Reconstruction Era
              a)
          Bullet Point: The Reconstruction era was a period in American history following the American Civil War and lasting until approximately the Compromise of 1877.
        
        Notes:
        
    ${quill.getText()}
    Bullet Point:
    `
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prmpt,
    temperature: 0.7,
    max_tokens: 30,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    });
    console.log(response.data.choices[0].text);
    let selection = quill.getSelection(true);
    quill.insertText(selection.index, response.data.choices[0].text);
    }
    //get quil text
    async function generateFlashcards(){
        console.log("Generating Flashcards...")
        let prmpt = `
    Generate Flashcards ( The Notes Are Being Rendered By Quill.js )
    Sample Response: What is Messi's age? /flash/ 33
    Notes:
    ${quill.getText()}
   Flashcards (With /flash/ as a delimiter):
    `
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prmpt,
    temperature: 0.7,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    }); 

  flashcards = response.data.choices[0].text;
  }
  async function sendNoteGPT(){
    noteGptLoading = true;
    console.log("Sending to NoteGPT...")
    let prmpt = `
    You are an assistant named Note GPT. You are tasked with helping the user with whatever they may with of their notes.
    Additonally you can also edit their notes to change them however they ask you. But if no change is done write no change. (The Notes will be given in html thats rendered with QuillJS)

    Example1 
      Question: Give Me A list of the bolded parts in my notes and explain what they mean.
      Response:
        {
          "airesponse": "You have 2 bolded parts in your notes. \n 1. The Reconstruction Era \n \t A) The Reconstruction era was a period in American history following the American Civil War and lasting until approximately the Compromise of 1877. \n 2. The Great Depression\n \tA) The Great Depression was an economic shock that impacted most countries across the world
          "newnotes": "No Change",
        }
    Example2
        Question: Add a section for Lewandoski to my notes
        Notes: <h1>Messi</h1><p>Short but good dribler Best Player</p><h1>Ronaldo</h1><p>Tall and athletic but worse than messi</p>
        Response: {
  "airesponse": "I have added a section for Lewandoski in your notes.",
  "newnotes": "<h1>Messi</h1><p>Short but good dribler Best Player</p><h1>Ronaldo</h1><p>Tall and athletic but worse than messi</p><h1>Lewandoski</h1><p>Good shooter</p>"
}

    BUT MAKE IT SO THE RESPONSE CAN BE PARSED AS JSON WITH NO ERROR
    Task:
    Notes:${quill.root.innerHTML}
    Question: ${NoteGPT}
    Response: 
    `
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prmpt,
    temperature: 0.7,
    max_tokens: 300,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    }); 
    try {
      let ai = JSON.parse(response.data.choices[0].text);
      AiResponse = ai.airesponse;
      if(ai.newnotes != "No Change"){
        quill.root.innerHTML = ai.newnotes;
      }
      noteGptLoading = false;
} catch (error) {
  console.log(response.data.choices[0].text);
  console.log(JSON.parse(response.data.choices[0].text));
  AiResponse = "Sorry Their Was an Error With Your Request. Please Try Again Later.";
  }
}
async function deleteNote() {
    const docRef = doc(db, "Users", userDB.uid);
const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        userDB = docSnap.data();
        if (userDB.notes[docum.docid]) {
    const notes = userDB.notes;
    let docid = docum.docid;
    delete notes[docid];
    console.log(notes)
    let docref = doc(db, "Users", userDB.uid)
    setDoc(docRef, {
        email: userDB.email,
        uid: userDB.uid,
        name: userDB.name,
        credits: userDB.credits,
        notes: notes
    }).then(() => {
location.href = "/Dashboard"
    })
    }
}
// location.href = "/Dashboard"
}
  </script>
  
  
  
  <style>
    @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
	@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

  </style>
   <div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
      <div class="tile is-parent">
        <article class="tile is-child notification box"style="height: 80vh">
          <p class="title" contenteditable="true" bind:textContent={docum.title}></p>
          <p class="subtitle">Start writing your notes :D. (PS Click on Title Above To Change It ^)</p>
          <div class="content">
            <!-- Content -->
            <div class="editor-wrapper" style="height: 50vh;">
              <div style="font-size: 25px;" bind:this={editor} />
              <br>
            </div>
          </div>
          <br>
          <button class="btn text-white" on:click={save}>Save</button>
          <button class="btn btn-primary text-white" on:click={deleteNote}>Delete</button>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-success">
        <div class="content">
          <p class="title">Tools</p>
          <p class="subtitle">Click <code>ALT</code> to Autocomplete</p>
          <button class="btn text-white" on:click={generateFlashcards}>Generate Flashcards</button>  
          Import the result into quizlet (With /flash/ as a delimiter)
          <br>
          <p>Flashcards:<br> {flashcards}</p>
          <div class="content">
           <br>
           <p class="title">NoteGPT</p>
           <p class="subtitle">Ask NoteGPT questions about your text or instruct it to make changes.</p>
           <p class="subtitle">Example: Give me a list of the bolded parts in my notes and explain what they mean.</p>
            <p class="subtitle">Example: Make the first sentence of the first paragraph bold.</p>
          <div class="box">
          {#if !noteGptLoading}
          <p class="subtitle">Response: {AiResponse}</p>
          <input bind:value={NoteGPT} class="input"/>
          <button class="btn btn-se text-white" on:click={sendNoteGPT}>Send</button>
          {:else}
          <Status/>
          {/if}
          </div>

<p class="title">Lofi Music</p>
<div class="">
  <audio controls style="margin-top: 2%;">
      <source
        src="https://coderadio-admin.freecodecamp.org/radio/8010/radio.mp3"
        type="audio/mpeg"
      />
    </audio>
</div>

          </div>
        </div>
      </article>
    </div>
  </div>
   