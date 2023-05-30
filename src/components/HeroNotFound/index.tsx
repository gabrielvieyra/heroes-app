import { FC } from 'react';

// Components
import { HeroNotFoundImage } from './HeroNotFoundImage';

// Styles
import './styles.scss';

export const HeroNotFound: FC = () => {
  return (
    <div className='hero-not-found'>
      <HeroNotFoundImage />
      <h2>No se encontró el héroe que buscas</h2>
    </div>
  );
};
