import { FC, useState, useContext } from 'react';

// Components
import { EmptyState, HeroCard, TeamStats } from '../../components/index';

// Context
import { HeroesContext } from '../../context/HeroesContext';

// Styles
import './styles.scss';

export const Home: FC = () => {
  const { team } = useContext(HeroesContext);
  const [teamSpeciality, setTeamSpeciality] = useState<string>('');

  function updateTeamSpeciality(newTeamSpeciality: string): void {
    setTeamSpeciality(newTeamSpeciality);
  }

  return (
    <section className='home'>
      {team.length === 0 && <EmptyState />}
      {team.length > 0 && (
        <div className='home__container'>
          <h1>Estadisticas del equipo</h1>
          <TeamStats updateTeamSpeciality={updateTeamSpeciality} />
          <h1>Equipo</h1>
          <h4>
            Especialidad del equipo: <span>{teamSpeciality}</span>
          </h4>
          <div className='home__container-team'>
            {team.map(hero => {
              return <HeroCard key={hero.id} hero={hero} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};
