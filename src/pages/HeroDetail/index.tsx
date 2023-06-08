import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Components
import { Button, Spinner } from '../../components/index';

// Services
import { getHeroById } from '../../services';

// Interfaces
import { Hero } from '../../types/types';

// Styles
import './styles.scss';

type Status = 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS';

export const HeroDetail: FC = () => {
  const [status, setStatus] = useState<Status>('LOADING');
  const [hero, setHero] = useState<Hero>();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getHeroById(id!)
      .then(hero => {
        if (hero) {
          setStatus('SUCCESS');
          setHero(hero);
        }
      })
      .catch(err => console.log(err));
  }, []);

  function onNavigateBack(): void {
    // el -1 lo que hace es navegar al historial anterior
    navigate(-1);
  }

  return (
    <section className='hero-detail'>
      {status === 'LOADING' && <Spinner size='medium' color='blue' />}
      {hero && (
        <div className='hero-detail__container'>
          <img alt={hero.name} src={hero.image.url} />
          <div className='hero-detail__container-info'>
            <h1>{hero.name}</h1>
            <p>{hero.biography['alter-egos']}</p>
            <ul>
              <li>
                <span>Full Name: </span> {hero.biography['full-name']}
              </li>
              <li>
                <span>Alignment: </span> {hero.biography.alignment}
              </li>
              <li>
                <span>Work Place: </span> {hero.work.base}
              </li>
              <li>
                <span>Height: </span> {hero.appearance.height[1]}
              </li>
              <li>
                <span>Weight: </span> {hero.appearance.weight[1]}
              </li>
              <li>
                <span>Hair Color: </span> {hero.appearance['hair-color']}
              </li>
              <li>
                <span>Eye Color: </span> {hero.appearance['eye-color']}
              </li>
            </ul>
            <Button onClick={onNavigateBack}>Volver</Button>
          </div>
        </div>
      )}
    </section>
  );
};
