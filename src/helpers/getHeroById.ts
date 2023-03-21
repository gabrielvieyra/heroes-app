// Data
import { heroes } from '../data/heroes';

// Interfaces
import { Heroe } from '../types/types';

export const getHeroById = (id: string): Heroe => {
  return heroes.find(hero => hero.id === id)!;
};
