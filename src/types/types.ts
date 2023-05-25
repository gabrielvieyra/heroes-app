export interface UserInfo {
  token: string | null;
  status: 'checking' | 'not-authenticated' | 'authenticated';
  displayName: string;
  errorMsg: string;
}

export interface LogUser {
  email: string;
  password: string;
}

export interface RegUser {
  username: string;
  email: string;
  password: string;
}

export interface FormErrorMsgs {
  username?: string;
  email?: string;
  password?: string;
}

export interface Heroe {
  id: string;
  superhero: string;
  publisher: 'DC Comics' | 'Marvel Comics' | '';
  alterEgo: string;
  firstAppearance: string;
  characters: string;
}
