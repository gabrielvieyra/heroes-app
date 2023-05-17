export interface LogUser {
  email: string;
  password: string;
}

export interface FormErrorMsgs {
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
