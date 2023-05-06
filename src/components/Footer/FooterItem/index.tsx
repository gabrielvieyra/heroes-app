import { FC } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';

interface FooterItemProps {
  label: string;
  route: string;
}

export const FooterItem: FC<FooterItemProps> = ({ label, route }) => {
  return (
    <li className='footer-item'>
      <Link to={route}>{label}</Link>
    </li>
  );
};
