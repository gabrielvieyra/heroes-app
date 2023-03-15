import { FC, useState, useEffect } from 'react';

// Components
import { HeroeCard } from '../../components';

// Helpers
import { getHeroesByPublisher } from '../../helpers/index';

// Interfaces
import { Heroe } from '../../types/types';

// Styles
import './styles.scss';

interface HeroeCardsContainerProps {
  title: string;
  publisher: 'DC Comics' | 'Marvel Comics';
}

const HeroeCardsContainer: FC<HeroeCardsContainerProps> = ({ title, publisher }) => {
  const [heroes, setHeroes] = useState<Array<Heroe>>([]);

  useEffect(() => {
    setHeroes(getHeroesByPublisher(publisher));
  }, []);

  return (
    <div className='heroeCardsContainer'>
      <h1 className='heroeCardsContainer__title'>{title}</h1>
      <div className='heroeCardsContainer__grid'>
        {heroes.map((heroe, index) => {
          const { id, superhero, publisher, alterEgo, firstAppearance, characters } = heroe;
          return (
            <HeroeCard
              key={id ? id : index}
              id={id}
              superhero={superhero}
              publisher={publisher}
              alterEgo={alterEgo}
              firstAppearance={firstAppearance}
              characters={characters}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroeCardsContainer;
