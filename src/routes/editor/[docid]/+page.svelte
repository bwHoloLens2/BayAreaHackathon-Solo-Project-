<script>
	import { auth, db } from './../../../scripts/fb.js';
	import { onMount } from "svelte";
	import Status from '../../../components/Status.svelte';
    import { doc, getDoc, setDoc } from "firebase/firestore";
	import Navbar from '../../../components/Navbar.svelte';
	import Editr from '../../../components/Editr.svelte';
    let editor;
    let docid = ""
    let loading = "Loading..."
    let user = "Loading..."
    let userDB = "Loading..."
    let document = "Loading..."
    import Quill from "quill";
    onMount(async () => {
        docid = location.href.split('/').pop().replace(/\?/g,'')
        auth.onAuthStateChanged( async (usr) => {
        if (usr) {
            user = usr
            let uid = usr.uid


const docRef = doc(db, "Users", user.uid);
const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        userDB = docSnap.data();
        if (userDB.notes[docid]) {
            document = userDB.notes[docid]
            loading = "Done"
        } else {
            location.href = "/"
        }

    } else {
            location.href = "/"
        }
    } else {
            location.href = "/"
    }
    });
    });

</script>
{#if loading != "Loading..." &&  document != "Loading..." && document}
    <Navbar userDB={userDB}></Navbar>
    <Editr userDB={userDB} docum={document} Quill={Quill}/>

{:else} 
<Status />
{/if}
<!-- <div class="editor-wrapper"> -->
    <!-- <div bind:this={editor} /> -->
  <!-- </div> -->
  <style>
	@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

  </style>