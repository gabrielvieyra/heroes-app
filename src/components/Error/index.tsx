import { FC, ReactNode } from 'react';

// Styles
import './styles.scss';

interface ErrorProps {
  children: ReactNode;
}

export const Error: FC<ErrorProps> = ({ children }) => {
  return (
    <div className='error'>
      <p className='error__description'>{children}</p>
    </div>
  );
};
