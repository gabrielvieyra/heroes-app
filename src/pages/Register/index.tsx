import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

// Custom hooks
import { useForm } from '../../hooks/useForm';

// Styles
import './styles.scss';

type eventSubmit = React.FormEvent<HTMLFormElement>;

const Register: FC = () => {
  const { formState, onInputChange } = useForm({
    email: '',
    password: '',
    fullName: '',
  });
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

  function validate(): void {
    const errorMsgs = [];
    const { fullName, email, password } = formState;

    if (fullName!.length < 4) {
      errorMsgs.push('El nombre completo debe tener al menos 4 caracteres');
    }

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email!)) {
      errorMsgs.push('Correo electrónico no válido');
    }

    if (password!.length < 6) {
      errorMsgs.push('La contraseña debe tener al menos 6 caracteres');
    }

    setErrorMessages(errorMsgs);
    formSubmitted(errorMsgs);
  }

  function formSubmitted(value: Array<string>): void {
    if (value.length === 0) {
      console.log('formulario valido');
    }
  }

  function handleSubmit(e: eventSubmit): void {
    e.preventDefault();
    validate();
  }

  return (
    <div className='register'>
      <h2>Crear cuenta</h2>
      {errorMessages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {errorMessages.map((msg, key) => {
            return <span key={key}>{msg}</span>;
          })}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name='fullName'
          type='text'
          placeholder='Nombre completo'
          value={formState.fullName}
          onChange={onInputChange}
        />
        <input
          name='email'
          type='email'
          placeholder='Correo'
          value={formState.email}
          onChange={onInputChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Contraseña'
          value={formState.password}
          onChange={onInputChange}
        />

        <div>
          <button type='submit' style={{ backgroundColor: 'lightcoral' }}>
            Crear cuenta
          </button>
          <div>
            <span>
              ¿Ya tienes cuenta?
              <Link to='/login'>
                <span>Ingresar</span>
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
