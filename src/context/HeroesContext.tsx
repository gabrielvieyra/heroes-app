import { createContext, FC, ReactNode, useState, useEffect } from 'react';

// Interfaces
import { Hero } from '../types/types';

// React Toastify
import { toast } from 'react-toastify';

interface HeroesContextProps {
  team: Array<Hero>;
  addHero: (hero: Hero) => void;
  deleteHero: (hero: Hero) => void;
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

  const isTeamFull: boolean = team.length >= 6;

  // Validamos si el heroe ya esta en el equipo o no
  function heroIsAlreadyInTeam(hero: Hero): boolean {
    return team.some(({ id }) => id === hero.id);
  }

  function isAligmentFull(hero: Hero): boolean {
    const quantityMatchingAlignmentHeroes = team.filter(
      ({ biography }) => biography.alignment === hero.biography.alignment
    ).length;
    return quantityMatchingAlignmentHeroes >= 3;
  }

  function heroIsOkToAdd(hero: Hero): boolean {
    return !isTeamFull && !isAligmentFull(hero);
  }

  function errorHandling(hero: Hero): string {
    const { biography } = hero;
    if (isAligmentFull(hero)) {
      return `Tu equipo ya cuenta con 3 héroes con orientación ${biography.alignment}`;
    } else if (isTeamFull) {
      return 'Tu equipo esta completo';
    } else {
      return 'Error desconocido';
    }
  }

  // Agregar heroe al equipo
  function addHero(hero: Hero): void {
    if (heroIsOkToAdd(hero)) {
      setTeam([...team, hero]);
      // React Toastify
      toast.success(`El heroe ${hero.name} ha sido agregado exitosamente`, {
        position: 'bottom-center',
        autoClose: 3000,
      });
    } else {
      toast.error(`${errorHandling(hero)}`, {
        position: 'bottom-center',
        autoClose: 3000,
      });
    }
  }

  // Eliminar heroe del equipo
  function deleteHero(hero: Hero): void {
    const newArr = team.filter(({ id }) => id !== hero.id);
    setTeam(newArr);
    // React Toastify
    toast.success(`El heroe ${hero.name} ha sido eliminado exitosamente`, {
      position: 'bottom-center',
      autoClose: 3000,
    });
  }

  return (
    <HeroesContext.Provider value={{ team, addHero, deleteHero, heroIsAlreadyInTeam }}>
      {children}
    </HeroesContext.Provider>
  );
};
