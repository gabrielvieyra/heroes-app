import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';

interface ButtonLinkProps {
  children: ReactNode;
  route: string;
}

export const ButtonLink: FC<ButtonLinkProps> = ({ children, route }) => {
  return (
    <Link to={route} className='button-link'>
      {children}
    </Link>
  );
};
