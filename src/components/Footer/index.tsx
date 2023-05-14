import { FC } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Logo } from '../Logo';
import { FooterItem } from './FooterItem';

// Styles
import './styles.scss';

interface FooterLink {
  label: string;
  route: string;
}

export const Footer: FC = () => {
  const links: Array<FooterLink> = [
    {
      label: 'GitHub',
      route: 'https://github.com/gabrielvieyra',
    },
    {
      label: 'LinkedIn',
      route: 'https://www.linkedin.com/in/gabrielvieyra/',
    },
  ];

  return (
    <footer className='footer' aria-label='footer'>
      <nav className='footer__container'>
        <Link to='/'>
          <Logo />
        </Link>
        <ul className='footer__container-links'>
          {links.map(({ route, label }) => {
            return <FooterItem label={label} route={route} key={label}></FooterItem>;
          })}
        </ul>
      </nav>
    </footer>
  );
};
