// Authentication
export interface UserInfo {
  token: string | null;
  status: 'checking' | 'not-authenticated' | 'authenticated';
  displayName: string;
  errorMsg: string;
}

// Login / Register
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

// Hero
export interface Appearance {
  'eye-color': string;
  gender: string;
  'hair-color': string;
  height: Array<string>;
  race: string;
  weight: Array<string>;
}

export interface Biography {
  aliases: Array<string>;
  alignment: string;
  'alter-egos': string;
  'first-appearance': string;
  'full-name': string;
  'place-of-birth': string;
  publisher: string;
}

export interface Connections {
  'group-affiliation': string;
  relatives: string;
}

export interface Image {
  url: string;
}

export interface PowerstatsI {
  combat: string;
  durability: string;
  intelligence: string;
  power: string;
  speed: string;
  strength: string;
}

export interface Work {
  occupation: string;
  base: string;
}

export interface Hero {
  appearance: Appearance;
  biography: Biography;
  connections: Connections;
  id: string;
  image: Image;
  name: string;
  powerstats: PowerstatsI;
  work: Work;
}
