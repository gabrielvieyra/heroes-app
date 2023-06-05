import { FC } from 'react';

// Interfaces
import { PowerstatsI } from '../../types/types';

// Styles
import './styles.scss';

interface PowerstatsProps {
  powerstats: PowerstatsI;
}

export const Powerstats: FC<PowerstatsProps> = ({ powerstats }) => {
  return (
    <div className='powerstats'>
      {Object.entries(powerstats).map(([title, value]) => {
        return (
          <div className='powerstats__container' key={title}>
            <div className='powerstats__container-wrapper'>
              <span>{title}</span>
              <span>{value}</span>
            </div>
            <div className='powerstats__container-progress-bar'>
              <div
                style={{ width: `${value}%` }}
                className='powerstats__container-progress-bar-percent'
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
