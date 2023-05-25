import { FC, useState, useMemo, useContext } from 'react';

// Components
import { Input, Button, ButtonLink, Spinner, Error } from '../../components';

// Context
import { AuthContext } from '../../context/AuthContext';

// Custom hooks
import { useForm } from '../../hooks/useForm';

// Interfaces
import { RegUser, FormErrorMsgs } from '../../types/types';

// Styles
import './styles.scss';

type submitEvent = React.FormEvent<HTMLFormElement>;

const initialState: RegUser = {
  username: '',
  email: '',
  password: '',
};

const Register: FC = () => {
  const [errors, setErrors] = useState<FormErrorMsgs>({});
  const { formState, onInputChange } = useForm<RegUser>(initialState);
  const { user, creatingUserWithEmailAndPassword, removeErrorMsg } = useContext(AuthContext);
  const isCheckingAuthentication = useMemo(() => user.status === 'checking', [user.status]);

  function handleSubmit(e: submitEvent): void {
    e.preventDefault();
    const errors: FormErrorMsgs = {};

    if (formState.username.length < 6) {
      errors.username = 'El nombre de usuario debe tener al menos 6 caracteres';
    }

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(formState.email)) {
      errors.email = 'Correo electrónico no válido';
    }

    if (formState.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      creatingUserWithEmailAndPassword(formState);
    } else {
      return;
    }
  }

  return (
    <div className='register'>
      <div className='register__container'>
        <h1>Crear cuenta</h1>
        {user.errorMsg && <Error>{user.errorMsg}</Error>}
        <form onSubmit={handleSubmit} className='register__container-form'>
          <Input
            placeholder='Nombre de usuario'
            name='username'
            type='text'
            value={formState.username}
            onChange={onInputChange}
            error={errors.username ? true : false}
            errorMsg={errors.username}
          />
          <Input
            placeholder='Email'
            name='email'
            type='email'
            value={formState.email}
            onChange={onInputChange}
            error={errors.email ? true : false}
            errorMsg={errors.email}
          />
          <Input
            placeholder='Contraseña'
            name='password'
            type='password'
            value={formState.password}
            onChange={onInputChange}
            error={errors.password ? true : false}
            errorMsg={errors.password}
          />
          <Button type='submit' disabled={isCheckingAuthentication}>
            {user.status === 'checking' ? (
              <div className='register__container-form-spinner'>
                <Spinner />
              </div>
            ) : (
              'Crear cuenta'
            )}
          </Button>
          <p className='register__container-form-description'>
            ¿Ya tienes cuenta?
            <ButtonLink route='/login' onClick={removeErrorMsg}>
              Ingresar
            </ButtonLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
