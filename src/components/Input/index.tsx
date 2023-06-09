import { FC, HTMLInputTypeAttribute } from 'react';

// Components
import { Error } from '../../components';

// Styles
import './styles.scss';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  autoComplete?: string;
  value: string;
  onChange: (e: inputEvent) => void;
  error?: boolean;
  errorMsg?: string;
}

type inputEvent = React.ChangeEvent<HTMLInputElement>;

export const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  name,
  autoComplete = 'off',
  value,
  onChange,
  error = false,
  errorMsg = '',
}) => {
  return (
    <div className='input-container'>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={`input-container__input ${error ? 'input-container__input--error' : ''}`}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
      {error && (
        <Error>{errorMsg}</Error>
      )}
    </div>
  );
};
