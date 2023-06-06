import { FC, useContext } from 'react';

// Components
import { Button, Powerstats } from '../../components/index';

// Context
import { HeroesContext } from '../../context/HeroesContext';

// Interfaces
import { Hero } from '../../types/types';

// Styles
import './styles.scss';

interface HeroCardProps {
  hero: Hero;
  isSearchItem?: boolean;
}

export const HeroCard: FC<HeroCardProps> = ({ hero, isSearchItem = false }) => {
  const { name, image, id, powerstats } = hero;
  const { addHero, deleteHero, heroIsAlreadyInTeam } = useContext(HeroesContext);

  return (
    <div className='hero-card'>
      <h2>{name}</h2>
      <img alt={name} src={image.url} className='hero-card__photo' />
      {!isSearchItem && <Powerstats powerstats={powerstats} />}
      {heroIsAlreadyInTeam(hero) ? (
        <Button variant='delete' onClick={() => deleteHero(id)}>
          Eliminar
        </Button>
      ) : (
        <Button onClick={() => addHero(hero)}>Agregar</Button>
      )}
      <Button variant='secundary'>Detalles</Button>
    </div>
  );
};
