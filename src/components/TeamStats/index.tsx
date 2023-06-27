import { FC, useState, useEffect, useContext } from 'react';

// Components
import { Powerstats, Appearance } from '../../components/index';

// Context
import { HeroesContext } from '../../context/HeroesContext';

// Interfaces
import { PowerstatsI } from '../../types/types';

// Helpers
import { getSumOfAllPowerstats } from '../../helpers/getSumOfAllPowerstats';

// Styles
import './styles.scss';

interface TeamStatsProps {
  updateTeamSpeciality: (newTeamSpeciality: string) => void;
}

export const TeamStats: FC<TeamStatsProps> = ({ updateTeamSpeciality }) => {
  const { team } = useContext(HeroesContext);
  const [teamStats, setTeamStats] = useState<PowerstatsI>({
    intelligence: '0',
    strength: '0',
    speed: '0',
    durability: '0',
    power: '0',
    combat: '0',
  });

  useEffect(() => {
    calculateTeamSpeciality();
  }, [team]);

  function calculateTeamSpeciality(): void {
    // Lista con los powerstats de cada uno de los heroes del equipo
    const allPowerstats: Array<PowerstatsI> = team.map(({ powerstats }) => powerstats);

    const sumOfStats: PowerstatsI = getSumOfAllPowerstats(allPowerstats);

    const maxValue: number = Math.max(...Object.values(sumOfStats).map(val => parseInt(val)));

    Object.keys(sumOfStats).forEach(key => {
      if (sumOfStats[key as keyof PowerstatsI] === maxValue.toString()) updateTeamSpeciality(key);
    });

    setTeamStats(sumOfStats);
  }

  return (
    <div className='team-stats'>
      <div className='team-stats__powerstats'>
        <h2>Poderes</h2>
        <Powerstats powerstats={teamStats} variant='fullHorizontal' />
      </div>
      <div className='team-stats__appearance'>
        <h2>Peso y altura promedio</h2>
        <Appearance team={team} />
      </div>
    </div>
  );
};
