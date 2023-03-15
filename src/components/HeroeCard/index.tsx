import { FC } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Info } from '../../components';

// Styles
import './styles.scss';

interface HeroeCardProps {
  id: string;
  superhero: string;
  publisher: 'DC Comics' | 'Marvel Comics' | '';
  alterEgo: string;
  firstAppearance: string;
  characters: string;
}

const HeroeCard: FC<HeroeCardProps> = ({ id, superhero, alterEgo, firstAppearance }) => {
  const heroImageUrl = `assets/heroes/${id}.jpg`;

  return (
    <div className='heroeCard'>
      <img src={heroImageUrl} alt={superhero} className='heroeCard__img' />
      <div className='heroeCard__body'>
        <div className='heroeCard__body-info'>
          <h2 className='heroeCard__body-info-title'>{superhero}</h2>
          <Info sectionName='Alter ego:' sectionData={alterEgo} />
          <Info sectionName='First appearance:' sectionData={firstAppearance} />
        </div>
        <Link className='heroeCard__body-link' to={`/hero/${id}`}>
          Más información...
        </Link>
      </div>
    </div>
  );
};

export default HeroeCard;
