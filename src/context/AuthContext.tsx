import { FC, ReactNode, useState, createContext } from 'react';

// Firebase
import {
  registerUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  singInWithGoogle,
  logoutFirebase,
} from '../firebase/providers';
interface AuthState {
  status: 'checking' | 'not-authenticated' | 'authenticated';
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessages?: Array<string>;
}

interface AuthContextProps {
  dataLogin: AuthState;
  setDataLogin: (value: AuthState) => void;
  handleLogout: (errorMessage: string) => void;
  handleLogin: (uid: string, displayName: string, email: string, photoURL: string) => void;
  onLoginWithCredentials: (email: string, password: string) => void;
  creatingUserWithEmailAndPassword: (email: string, password: string, fullName: string) => void;
  onGoogleSignIn: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [dataLogin, setDataLogin] = useState<AuthState>({
    status: 'not-authenticated',
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    errorMessages: [],
  });

  // Cuando disparan el onGoogleSignIn quiere decir que estan intentando autenticarse con google
  // Autentico al usuario o muestro un error
  async function onGoogleSignIn(): Promise<void> {
    checkingCredentials();

    const result = await singInWithGoogle();
    // Si la autenticacion sale mal reseteamos todo
    if (!result.ok) {
      const { errorMessage } = result;
      handleLogout(errorMessage);
      return;
    }
    // Si todo sale bien, logueamos al usuario
    const { uid, displayName, email, photoURL } = result;
    handleLogin(uid!, displayName!, email!, photoURL!);
  }

  async function onLoginWithCredentials(email: string, password: string): Promise<void> {
    checkingCredentials();
    const response = await loginWithEmailAndPassword(email, password);
    // Si la autenticacion sale mal reseteamos todo
    if (!response.ok) {
      const { errorMessage } = response;
      handleLogout(errorMessage);
      return;
    }
    // Si todo sale bien, logueamos al usuario
    const { uid, displayName, photoURL } = response;
    handleLogin(uid!, displayName!, email, photoURL!);
  }

  async function creatingUserWithEmailAndPassword(
    email: string,
    password: string,
    fullName: string
  ): Promise<void> {
    checkingCredentials();
    const response = await registerUserWithEmailAndPassword(email, password, fullName);
    // Si la creacion sale mal reseteamos todo
    if (!response.ok) {
      const { errorMessage } = response;
      handleLogout(errorMessage);
      return;
    }
    // Si todo sale bien, logueamos al usuario
    const { uid, displayName, photoURL } = response;
    handleLogin(uid!, displayName!, email, photoURL!);
  }

  function checkingCredentials(): void {
    setDataLogin({ ...dataLogin, status: 'checking' });
  }

  async function handleLogout(errorMessage: string): Promise<void> {
    await logoutFirebase();
    setDataLogin({
      ...dataLogin,
      status: 'not-authenticated',
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      errorMessages: [errorMessage],
    });
  }

  function handleLogin(uid: string, displayName: string, email: string, photoURL: string): void {
    setDataLogin({ ...dataLogin, status: 'authenticated', uid, displayName, email, photoURL });
  }

  return (
    <AuthContext.Provider
      value={{
        dataLogin,
        setDataLogin,
        onLoginWithCredentials,
        creatingUserWithEmailAndPassword,
        onGoogleSignIn,
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
