import { ChangeEvent, useState } from 'react';

// Interfaces
import { LogUser } from '../types/types';

type inputEvent = ChangeEvent<HTMLInputElement>;

export const useForm = (
  inicialState: LogUser
): {
  formState: LogUser;
  onInputChange: (e: inputEvent) => void;
} => {
  // Variable de estado donde almacenamos el estado del formulario
  const [formState, setFormState] = useState<LogUser>(inicialState);

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
