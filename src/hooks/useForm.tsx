import { useState } from 'react';

export const useForm = (initialForm: {
  searchText: string;
}): {
  formState: { searchText: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [formState, setFormState] = useState<{ searchText: string }>(initialForm);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const {name, value} = e.target;
    setFormState({
        ...formState, [name]: value
    })
  }

  return {
    formState,
    onInputChange,
  };
};
