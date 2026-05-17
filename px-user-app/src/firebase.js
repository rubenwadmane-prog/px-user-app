import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDw7rxrZybeyyg9EOz3fDdCDj1_7BcW8EY",
  authDomain: "my-px-c156a.firebaseapp.com",
  projectId: "my-px-c156a",
  storageBucket: "my-px-c156a.firebasestorage.app",
  messagingSenderId: "228814944279",
  appId: "1:228814944279:android:837415f16e303a3a728452"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
