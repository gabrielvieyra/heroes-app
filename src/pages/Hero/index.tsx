import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Helpers
import { getHeroById } from '../../helpers/index';

// Interfaces
import { Heroe } from '../../types/types';

// Styles
import './styles.scss';

const Hero: FC = () => {
  const [hero, setHero] = useState<Heroe>({
    id: '',
    superhero: '',
    publisher: '',
    alterEgo: '',
    firstAppearance: '',
    characters: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setHero(getHeroById(id!));
  }, []);

  function onNavigateBack(): void {
    // el -1 lo que hace es navegar al historial anterior
    navigate(-1);
  }

  if (!hero) {
    navigate('/marvel');
  }

  return (
    <div className='hero'>
      <img src={`/assets/heroes/${id}.jpg`} alt={hero.superhero} className='hero__img' />
      <div>
        <h2>{hero.superhero}</h2>

        <ul>
          <li>
            <b>Alter ego:</b>
            {hero.alterEgo}
          </li>
          <li>
            <b>Publisher:</b>
            {hero.publisher}
          </li>
          <li>
            <b>First appearance:</b>
            {hero.firstAppearance}
          </li>
        </ul>

        <h5>Characters</h5>
        <p>{hero.characters}</p>

        <button onClick={onNavigateBack}>Regresar</button>
      </div>
    </div>
  );
};

export default Hero;
