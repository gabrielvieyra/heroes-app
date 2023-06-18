import { FC } from 'react';

// Styles
import './styles.scss';

interface ProgressBarProps {
  value: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className='progress-bar'>
      <div style={{ width: `${value}%` }} className='progress-bar-percent'></div>
    </div>
  );
};
