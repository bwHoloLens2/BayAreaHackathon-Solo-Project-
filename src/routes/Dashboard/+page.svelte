<script>
    import { auth, db } from "../../scripts/fb";
	import { onMount } from "svelte";
    import { doc, getDoc, setDoc } from "firebase/firestore";
	import Status from "../../Components/Status.svelte";
    import Navbar from "../../components/Navbar.svelte";
    import { v4 as uuidv4 } from 'uuid';
    let user = "Loading..."
    let userDB = "Loading..."
    onMount(async () => {
        auth.onAuthStateChanged( async (usr) => {
        if (usr) {
            user = usr
            let uid = usr.uid


const docRef = doc(db, "Users", user.uid);
const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        userDB = docSnap.data();
    } else {
            // doc.data() will be undefined in this case
            let docid = uuidv4()
            const notes = {};
            notes[docid] =  {
                title: "Welcome to AiNotes!",
                noteContent: "This is a note. Try using AI to autocomplete your notes!",
                docid: docid,
              }
            setDoc(docRef, {
                email: user.email,
                uid: user.uid,
                name: user.displayName,
                credits: 300,
                notes: notes
            })
            userDB = {
                email: user.email,
                uid: user.uid,
                name: user.displayName,
                credits: 300,
                notes: notes
            }
        }
    } 
    
    else {
            location.href = "/"
        }
    });
    });
    
    async function createNote() {
        user = "Loading..."
        let docid = uuidv4()
        const notes = userDB.notes;
        notes[docid] =  {
            title: "Untitled Document",
            noteContent: "",
            docid: docid,
          }
        const docRef = doc(db, "Users", user.uid);
        await setDoc(docRef, {
            email: user.email,
            uid: user.uid,
            name: user.displayName,
            credits: userDB.credits,
            notes: notes
        })
        location.href = "/editor/"+docid
    }
</script>
<html data-theme="pastel">
 
  {#if user !== 'Loading...' && user !== null && userDB !== 'Loading...' && userDB !== null}
<Navbar userDB={userDB} dashboard={true}/>
  <div class="hero min-h-screen bg-base-200 has-text-centered ">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Welcome To Your Dashboard, {userDB.name}</h1>
        <p class="py-6">Here you can access all of your notes :D. (PS Click On Their Title To Open Them)</p>
        <button class="btn text-white" on:click={createNote}>Create Note</button>
        <br>
        <br>

        <div class="grid grid-cols-3 gap-2">
          {#each Object.values(userDB.notes) as note}
    
          <div class="box" on:click{go}>
              <a href={"/editor/"+note.docid} class="subtitle text-center">{note.title}</a>
          </div>
          {/each}
      
        </div>
      </div>
    </div>
  </div>
   
{:else}
	<Status />
{/if}
</html>

<style>
.box {
    background-color: #fff;
    border-radius: 6px;
    -webkit-box-shadow: 0 .5em 1em -.125em hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.02);
    box-shadow: 0 .5em 1em -.125em hsla(0,0%,4%,.1),0 0 0 1px hsla(0,0%,4%,.02);
    color: #4a4a4a;
    display: block;
    padding: 1.25rem
}


</style>

