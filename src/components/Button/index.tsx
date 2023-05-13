import { FC, ReactNode } from 'react';

// Styles
import './styles.scss';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
}) => {
  return (
    <button type={type} className='button' onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
