
<script>
    import { auth } from "../../scripts/fb.js";
    import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getRedirectResult, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from  'firebase/auth'
        import { onMount } from "svelte";
      let email = "";
      let password = "";
    async function GAUTH() {
        console.log("test")
        getRedirectResult(auth)
        const provider = new GoogleAuthProvider();  
        provider.addScope('https://www.googleapis.com/auth/cloud-platform.read-only');
        auth.languageCode = 'it';
        await signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
    
        // The signed-in user info.
        const user = result.user;
        alert(user)
        console.log(user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log(error)
      });
    }
    export async function gath() {
      console.log("popup")
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/cloud-platform.read-only'); //Get read only data such as profile picture and name / email :)
        auth.languageCode = 'it';
        await signInWithPopup(auth, provider)
        .catch((error) => {
            return false;
        })
        return true;
    }
    
    async function signWithPass () {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created successfully", response.user.email);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          console.log("User already exists, logging in instead");
          await signInWithEmailAndPassword(auth, email, password)
        } else {
          console.error("Error creating user", error);
        }
      }
        
    }
    onMount(async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          location.href = "/Dashboard"
        }
      });
    })
    </script>
    <br>
    <br>
    <br>
    <section class="items-center justify-center relative bg-white overflow-hidden" style="height: 100vh;">
        <div class="relative z-10 flex flex-wrap -m-8">
          <div class="w-full md:w-1/2 p-6">
            <div class="container px-10 mx-auto">
              <div class="flex flex-wrap">
                <div class="w-full ">
                  <div class="md:max-w-lg mx-auto md:pb-32">
                    <a class="mb-10 inline-block">
                    </a>
                    <h2 class="mb-5 text-xl md:text-5xl font-bold font-heading tracking-px-n leading-tight">Boost your productivity today.</h2>
                    <h3 class="mb-2 text-xl font-bold font-heading leading-normal">How is AiNotes different?</h3>
                    <ul class="md:max-w-xs">
                      <li class="mb-5 flex flex-wrap">
                        <svg class="mr-2" width="25" height="26" viewbox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="#4F46E5"></path>
                        </svg>
                        <span class="flex-1 font-medium leading-relaxed">We use artificial intellifence to <code>ASSIST</code> you.</span>
                      </li>
                      <li class="mb-5 flex flex-wrap">
                        <svg class="mr-2" width="25" height="26" viewbox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z" fill="#4F46E5"></path>
                        </svg>
                        <span class="flex-1 font-medium leading-relaxed">We seemlessly let you <code>autocomplete notes</code>  <code>generate flashcards</code> and talk with <code>NoteGPT</code></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 p-6">
            <div class="p-4 py-16 flex flex-col justify-center bg-blueGray-100 h-full">
              <!-- <form class="md:max-w-lg mx-auto"> -->
                <label class="block mb-4">
                  <p class="mb-2 text-gray-900 font-semibold leading-normal">Email Address *</p>
                  <input bind:value={email} class="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signInInput1-1" type="text" placeholder="Enter email address">
                </label>
                <label class="block mb-5">
                  <p class="mb-2 text-gray-900 font-semibold leading-normal">Password *</p>
                  <input bind:value={password} class="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signInInput1-2" type="password" placeholder="********">
                </label>
              
                <button on:click={signWithPass} class="mb-9 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="button">Sign In/Up</button>
                <p class="mb-5 text-sm text-gray-500 font-medium text-center">Or continue with</p>
                <div class="flex flex-wrap justify-center -m-2">
                  <div class="w-auto p-">
                    <button on:click={GAUTH} class="flex items-center p-4 bg-white hover:bg-gray-50 border rounded-lg transition ease-in-out duration-200">
                      <span class="font-semibold leading-normal" >Sign In/Up with Google   </span>
                      <svg style="padding-left: 7px" class="svg" width="35" height="35" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill-rule="evenodd" fill-opacity="1" fill="#4285f4" stroke="none"></path><path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill-rule="evenodd" fill-opacity="1" fill="#34a853" stroke="none"></path><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill-rule="evenodd" fill-opacity="1" fill="#fbbc05" stroke="none"></path><path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill-rule="evenodd" fill-opacity="1" fill="#ea4335" stroke="none"></path></svg>
                    
                    </button>
                  </div>
                </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </section>
      <style>

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
        :root {
            --accent: 124, 58, 237;
            --accent-gradient: linear-gradient(45deg, rgb(var(--accent)), #da62c4 30%, white 60%);
        }
            code {
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
                Bitstream Vera Sans Mono, Courier New, monospace;
          font-size: 0.875em;
        font-weight: bold;
        background: rgba(var(--accent),12%);
        color: rgb(var(--accent));
        border-radius: 4px;
        padding: 0.3em 0.45em;
        }
      </style>
    
