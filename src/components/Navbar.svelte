<script>
	import { auth } from './../scripts/fb.js';
    export let userDB;
    import {signOut} from "firebase/auth";
    export let dashboard = false
    function logOut() {
        signOut(auth).then(() => {
            location.href = "/"
        }).catch((error) => {
            console.log(error)
        });
    }
</script>
<div class="navbar bg-base-400">
    <div class="navbar-start">
      <a class="text-2xl font-bold text-black">
        {userDB.name}
      </a>
    </div>
    <div class="navbar-center">
       
    </div>
    <div class="navbar-end">
      {#if !dashboard}
      <button on:click={()=>{location.href="/Dashboard"}} class="btn text-white">Dashboard</button>
      <div style="width:5px;"></div>
      {/if}
      <button on:click={logOut} class="btn text-white">Log out</button>
    </div>
  </div>