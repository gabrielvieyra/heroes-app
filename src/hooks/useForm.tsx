import { useState } from 'react';

interface InitialForm {
  email?: string;
  password?: string;
  searchText?: string;
}

type eventInput = React.ChangeEvent<HTMLInputElement>;

export const useForm = (
  initialForm: InitialForm
): {
  formState: InitialForm;
  onInputChange: (e: eventInput) => void;
} => {
  const [formState, setFormState] = useState<InitialForm>(initialForm);

  function onInputChange(e: eventInput): void {
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
