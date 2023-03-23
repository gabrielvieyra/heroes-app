import { FC, ReactNode, useState, createContext } from 'react';

interface AuthState {
  logged: boolean;
  name: string;
}

interface AuthContextProps {
  dataLogin: AuthState;
  setDataLogin: (value: AuthState) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [dataLogin, setDataLogin] = useState<AuthState>({
    logged: false,
    name: '',
  });

  return (
    <AuthContext.Provider value={{ dataLogin, setDataLogin }}>{children}</AuthContext.Provider>
  );
};
