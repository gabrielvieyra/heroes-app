import { FC } from 'react';
import { Link } from 'react-router-dom';

// Components
import { NotFoundImage } from './NotFoundImage';
import { Button } from '../../components';

// Styles
import './styles.scss';

export const NotFound: FC = () => {
  return (
    <div className='not-found'>
      <div className='not-found__container'>
        <NotFoundImage />
        <h1>La pagina a la que intentas ingresar no existe</h1>
        <Link to='/login'>
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
};
