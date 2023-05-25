import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';

interface ButtonLinkProps {
  children: ReactNode;
  route: string;
  onClick?: () => void;
}

export const ButtonLink: FC<ButtonLinkProps> = ({ children, route, onClick }) => {
  return (
    <Link to={route} className='button-link' onClick={onClick}>
      {children}
    </Link>
  );
};
