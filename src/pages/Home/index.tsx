import { FC, useContext } from 'react';

// Components
import { EmptyState, HeroCard } from '../../components/index';

// Context
import { HeroesContext } from '../../context/HeroesContext';

// Styles
import './styles.scss';

export const Home: FC = () => {
  const { team } = useContext(HeroesContext);

  return (
    <section className='home'>
      <h1>Equipo</h1>
      {team.length === 0 && <EmptyState />}
      {team.length > 0 && (
        <div className='home__team'>
          {team.map(hero => {
            return <HeroCard key={hero.id} hero={hero} />;
          })}
        </div>
      )}
    </section>
  );
};
