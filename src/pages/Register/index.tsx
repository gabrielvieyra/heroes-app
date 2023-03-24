import { FC } from 'react';

// Custom hooks
import { useForm } from '../../hooks/useForm';

// Styles
import './styles.scss';

type eventSubmit = React.FormEvent<HTMLFormElement>;

const Register: FC = () => {
  const { formState, onInputChange } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e: eventSubmit): void {
    e.preventDefault();
  }

  return (
    <div className='register'>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <input
          name='email'
          type='email'
          placeholder='E-mail'
          value={formState.email}
          onChange={onInputChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={formState.password}
          onChange={onInputChange}
        />

        <div>
          <button type='submit' style={{ backgroundColor: 'lightcoral' }}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
