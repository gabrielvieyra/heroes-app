import { FC, ReactNode } from 'react';

// Styles
import './styles.scss';

type ButtonVariant = 'primary' | 'secundary' | 'delete';
type ButtonType = 'button' | 'submit';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`button button--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
