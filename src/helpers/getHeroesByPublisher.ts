// Data
import { heroes } from '../data/heroes';

// Interfaces
import { Heroe } from '../types/types';

export const getHeroesByPublisher = (publisher: 'DC Comics' | 'Marvel Comics'): Array<Heroe> => {
  return heroes.filter(heroe => {
    return heroe.publisher === publisher;
  });
};
