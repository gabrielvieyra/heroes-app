import { FC, ReactNode, useState, createContext } from 'react';
import Cookies from 'js-cookie';

// Firebase
import {
  registerUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  singInWithGoogle,
} from '../firebase/providers';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

// Interfaces
import { UserInfo, LogUser, RegUser } from '../types/types';

interface AuthContextProps {
  user: UserInfo;
  logOut: () => void;
  creatingUserWithEmailAndPassword: (data: RegUser) => void;
  onLoginWithCredentials: (data: LogUser) => void;
  onGoogleSignIn: () => void;
  authUser: () => void;
  removeErrorMsg: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo>({
    token: null,
    status: 'not-authenticated',
    displayName: '',
    errorMsg: '',
  });

  function authUser(): void {
    onAuthStateChanged(FirebaseAuth, userInfo => {
      setUser({
        ...user,
        token: Cookies.get('token')!,
        status: 'authenticated',
        displayName: userInfo!.displayName!,
        errorMsg: '',
      });
    });
  }

  // Cuando disparan el onGoogleSignIn quiere decir que estan intentando autenticarse con google
  // Autentico al usuario o muestro un error
  async function onGoogleSignIn(): Promise<void> {
    checkingCredentials();
    const response = await singInWithGoogle();
    // Si la autenticacion sale mal reseteamos todo
    if (!response.ok) {
      const { errorMessage } = response;
      signInOrSignUpFailed(errorMessage);
      return;
    }
    // Si todo sale bien, logueamos al usuario
    const { displayName, token } = response;
    signInOrSignUpSuccess(displayName!, token!);
  }

  async function onLoginWithCredentials(user: LogUser): Promise<void> {
    checkingCredentials();
    const response = await loginWithEmailAndPassword(user);
    // Si la autenticacion sale mal reseteamos todo
    if (!response.ok) {
      const { errorMessage } = response;
      // logFailed(errorMessage);
      signInOrSignUpFailed(errorMessage);
      return;
    }
    // Si todo sale bien, logueamos al usuario
    const { displayName, token } = response;
    signInOrSignUpSuccess(displayName!, token!);
  }

  function signInOrSignUpSuccess(username: string, token: string): void {
    Cookies.set('token', token);
    setUser({
      ...user,
      token: Cookies.get('token')!,
      status: 'authenticated',
      displayName: username,
      errorMsg: '',
    });
  }

  function signInOrSignUpFailed(errorMsg: string): void {
    Cookies.remove('token');
    setUser({
      ...user,
      token: null,
      status: 'not-authenticated',
      displayName: '',
      errorMsg,
    });
  }

  async function creatingUserWithEmailAndPassword(user: RegUser): Promise<void> {
    checkingCredentials();
    const response = await registerUserWithEmailAndPassword(user);
    // Si la creacion sale mal reseteamos todo
    if (!response.ok) {
      const { errorMessage } = response;
      signInOrSignUpFailed(errorMessage);
      return;
    }
    // Si todo sale bien, logueamos al usuario
    const { displayName, token } = response;
    signInOrSignUpSuccess(displayName!, token!);
  }

  function checkingCredentials(): void {
    setUser({ ...user, status: 'checking' });
  }

  function removeErrorMsg(): void {
    setUser({ ...user, errorMsg: '' });
  }

  function logOut(): void {
    Cookies.remove('token');
    setUser({
      ...user,
      token: null,
      status: 'not-authenticated',
      displayName: '',
      errorMsg: '',
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        onLoginWithCredentials,
        onGoogleSignIn,
        creatingUserWithEmailAndPassword,
        logOut,
        removeErrorMsg,
        authUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
