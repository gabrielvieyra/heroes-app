import { FC } from 'react';

// Styles
import './styles.scss';

interface SpinnerProps {
  size?: 'small' | 'medium';
  color?: 'white' | 'blue';
}

export const Spinner: FC<SpinnerProps> = ({ size = 'small', color = 'white' }) => {
  return <div className={`spinner spinner--${size} spinner--${color}`}></div>;
};
