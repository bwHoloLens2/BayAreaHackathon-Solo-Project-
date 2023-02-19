import { GoogleAuthProvider, getAuth, signInWithPopup } from  'firebase/auth'
import { browser } from '$app/environment';
import { auth } from './database';

export async function GAUTH() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/cloud-platform.read-only'); //Get read only data such as profile picture and name / email :)
    auth.languageCode = 'it';
    await signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        if (browser) {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
        return true;
    }).catch((error) => {
        return false;
    })
    return true;
}