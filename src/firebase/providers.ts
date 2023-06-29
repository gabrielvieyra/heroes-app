// Todas las funciones de autenticacion que vamos a usar vienen de firebase/auth
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

// Interfaces
import { LogUser, RegUser } from '../types/types';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    // A signInWithPopup le pasamos como primer argumento la instancia que creamos en el archivo config.ts y como segundo argumento el proveedor que quiero usar para
    // que aparezca el popup ej google, twitter
    const response = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName } = response.user;
    const token = await response.user.getIdToken();

    return { ok: true, displayName, token };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const registerUserWithEmailAndPassword = async (user: RegUser) => {
  const { email, password, username } = user;
  try {
    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    // Actualizamos el displayName en Firebase
    await updateProfile(FirebaseAuth.currentUser!, { displayName: username });
    const { displayName } = response.user;
    const token = await response.user.getIdToken();

    return {
      ok: true,
      token,
      displayName,
    };
  } catch (err: any) {
    return {
      ok: false,
      errorMessage: err.message,
    };
  }
};

// Autenticacion con el usuario y contraseña que creamos
export const loginWithEmailAndPassword = async (user: LogUser) => {
  const { email, password } = user;
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName } = response.user;
    const token = await response.user.getIdToken();

    return {
      ok: true,
      token,
      displayName,
    };
  } catch (error: any) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
