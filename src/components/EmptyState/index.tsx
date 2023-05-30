import { FC } from 'react';

// Components
import { EmptyStateImage } from './EmptyStateImage';

// Styles
import './styles.scss';

export const EmptyState: FC = () => {
  return (
    <div className='empty-state'>
      <EmptyStateImage />
      <div className='empty-state__container'>
        <h2>Tu equipo no tiene miembros</h2>
        <p>Busca tus héroes favoritos y agregalos a tu equipo</p>
      </div>
    </div>
  );
};
