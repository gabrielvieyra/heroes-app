import { FC, useState, useEffect } from 'react';

// Interfaces
import { Hero } from '../../../types/types';

// Styles
import './styles.scss';

interface AppearanceProps {
  team: Array<Hero>;
}

interface Averages {
  height: number;
  weight: number;
}

export const Appearance: FC<AppearanceProps> = ({ team }) => {
  const [averages, setAverages] = useState<Averages>({
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    calculateAverages();
  }, [team]);

  function calculateAverages(): void {
    let averages: Averages = {
      height: 0,
      weight: 0,
    };

    // Obtenemos el peso y altura de cada uno de los personajes del equipo
    const physicalStats = team.map(({ appearance }) => {
      return {
        height: parseInt(appearance.height[1]),
        weight: parseInt(appearance.weight[1]),
      };
    });

    // Obtenemos el peso y altura promedio
    for (const hero of physicalStats) {
      averages = {
        height: averages.height + hero.height,
        weight: averages.weight + hero.weight,
      };
    }
    averages = {
      height: Math.round(averages.height / physicalStats.length),
      weight: Math.round(averages.weight / physicalStats.length),
    };
    setAverages(averages);
  }

  return (
    <ul className='appearance'>
      <li className='appearance__container'>
        <span>Height</span>
        <span>{`${averages.height} cm`}</span>
      </li>
      <li className='appearance__container'>
        <span>Weight</span>
        <span>{`${averages.weight} kg`}</span>
      </li>
    </ul>
  );
};
