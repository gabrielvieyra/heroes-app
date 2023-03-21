// Data
import { heroes } from '../data/heroes';

// Interfaces
import { Heroe } from '../types/types';

export const getHeroesByName = (name = ''): Array<Heroe> => {
  name = name.toLowerCase().trim();

  if (name.length === 0) return [];

  return heroes.filter(heroe => heroe.superhero.toLowerCase().includes(name));
};
