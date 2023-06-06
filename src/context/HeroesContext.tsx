import { createContext, FC, ReactNode, useState, useEffect } from 'react';

// Interfaces
import { Hero } from '../types/types';

interface HeroesContextProps {
  team: Array<Hero>;
  addHero: (hero: Hero) => void;
  deleteHero: (heroId: string) => void;
  heroIsAlreadyInTeam: (hero: Hero) => boolean;
}

export const HeroesContext = createContext({} as HeroesContextProps);

const initialState = () => JSON.parse(localStorage.getItem('team') as string) || [];

interface HeroesProviderProps {
  children: ReactNode;
}

export const HeroesProvider: FC<HeroesProviderProps> = ({ children }) => {
  const [team, setTeam] = useState<Array<Hero>>(initialState);

  useEffect(() => {
    localStorage.setItem('team', JSON.stringify(team));
  }, [team]);

  // Validamos si el heroe ya esta en el equipo o no
  function heroIsAlreadyInTeam(hero: Hero): boolean {
    return team.some(({ id }) => id === hero.id);
  }

  // Agregar heroe al equipo
  function addHero(hero: Hero): void {
    console.log(`El heroe ${hero.name} ha sido agregado exitosamente`);
    setTeam([...team, hero]);

    // console.log(`El heroe ${hero.name} que esta intentando agregar ya existe en su equipo`);
  }

  // Eliminar heroe del equipo
  function deleteHero(heroId: string): void {
    const newArr = team.filter(({ id }) => id !== heroId);
    setTeam(newArr);
  }

  return (
    <HeroesContext.Provider value={{ team, addHero, deleteHero, heroIsAlreadyInTeam }}>
      {children}
    </HeroesContext.Provider>
  );
};
