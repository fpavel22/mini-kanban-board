import { useState, useEffect } from 'react';

function createFieldsState(fields) {
  return fields.reduce((prevFormState, field) => ({
    ...prevFormState, [field.name]: ''
  }), {});
}

export const PageForm = ({
  loading,
  error,
  success,
  fields,
  className,
  onSubmit = () => {},
  children,
  ...props
}) => {
  const [ formState, setFormState ] = useState(() => createFieldsState(fields));

  function handleInputChange({ target }) {
    setFormState((prevState) => ({
      ...prevState,
      [ target.name ]: target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(Object.values(formState));
  }

  useEffect(() => {
    if (success) {
      setFormState(createFieldsState(fields));
    }
  }, [ success ]);

  return (
    <form { ...props } className={ className } onSubmit={ handleSubmit }>
      { children(
        {
          fields,
          formState,
          formError: error,
          formSuccess: success,
          isLoading: loading,
          handleInputChange
        }
      ) }
    </form>
  );
};
