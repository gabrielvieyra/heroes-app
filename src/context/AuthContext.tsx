import { FC, ReactNode, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  status: 'checking' | 'not-authenticated' | 'authenticated';
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage?: string;
}

interface AuthContextProps {
  dataLogin: AuthState;
  setDataLogin: (value: AuthState) => void;
  handleLogout: (errorMessage: string) => void;
  handleLogin: (uid: string, displayName: string, email: string, photoURL: string) => void;
  onLoginWithCredentials: (email: string, password: string) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState<AuthState>({
    status: 'not-authenticated',
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    errorMessage: '',
  });

  function onLoginWithCredentials(email: string, password: string): void {
    console.log('email:', email);
    console.log('password:', password);
  }

  function handleLogout(errorMessage: string): void {
    setDataLogin({
      ...dataLogin,
      status: 'not-authenticated',
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      errorMessage: errorMessage,
    });
  }

  function handleLogin(uid: string, displayName: string, email: string, photoURL: string): void {
    setDataLogin({ ...dataLogin, status: 'authenticated', uid, displayName, email, photoURL });
    setLocalStorage('true', displayName);
    const lastPath = localStorage.getItem('lastPath') || '/';
    navigate(lastPath);
  }

  function setLocalStorage(isLogged: string, name: string): void {
    localStorage.setItem('isLogged', isLogged);
    localStorage.setItem('displayName', name);
  }

  return (
    <AuthContext.Provider
      value={{ dataLogin, setDataLogin, onLoginWithCredentials, handleLogout, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
