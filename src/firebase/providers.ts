// Todas las funciones de autenticacion que vamos a usar vienen de firebase/auth
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
