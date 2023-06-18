import { FC, useContext } from 'react';

// Components
import { ProgressBar } from '../../components/index';

// Context
import { HeroesContext } from '../../context/HeroesContext';

// Interfaces
import { PowerstatsI } from '../../types/types';

// Styles
import './styles.scss';

type PowerstatsVariant = 'default' | 'fullHorizontal';

interface PowerstatsProps {
  powerstats: PowerstatsI;
  variant?: PowerstatsVariant;
}

export const Powerstats: FC<PowerstatsProps> = ({ powerstats, variant = 'default' }) => {
  const { team } = useContext(HeroesContext);

  return (
    <div className='powerstats'>
      {Object.entries(powerstats).map(([title, value]) => {
        return variant === 'default' ? (
          <div className='powerstats__container' key={title}>
            <div className='powerstats__container-wrapper'>
              <span>{title}</span>
              <span>{value}</span>
            </div>
            <ProgressBar value={value} />
          </div>
        ) : (
          <div className='powerstats__fullHorizontal' key={title}>
            <div className='powerstats__fullHorizontal-container'>
              <span>{title}</span>
              <span>{value}</span>
            </div>
            <ProgressBar value={(value / team.length).toString()} />
          </div>
        );
      })}
    </div>
  );
};
