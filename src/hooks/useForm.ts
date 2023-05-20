import { ChangeEvent, useState } from 'react';

// Interfaces
import { LogUser, RegUser } from '../types/types';

type inputEvent = ChangeEvent<HTMLInputElement>;

export const useForm = <T extends LogUser | RegUser>(initialState: T) => {
  // Variable de estado donde almacenamos el estado del formulario
  const [formState, setFormState] = useState(initialState);

  function onInputChange(e: inputEvent): void {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  return {
    formState,
    onInputChange,
  };
};
