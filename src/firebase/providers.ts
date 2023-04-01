// Todas las funciones de autenticacion que vamos a usar vienen de firebase/auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    // A signInWithPopup le pasamos como primer argumento la instancia que creamos en el archivo config.ts y como segundo argumento el proveedor que quiero usar para
    // que aparezca el popup ej google, twitter
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = response.user;
    // Actualizamos el displayName en Firebase
    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

// Autenticacion con el usuario y contraseña que creamos
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = response.user;
    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
