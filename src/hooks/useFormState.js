import { useState } from 'react';

export const useFormState = (initialValues) => {
  const [ formState, setFormState ] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value
    }));
  }

  return [ formState, handleChange ];
};
