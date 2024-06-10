import { useState, useEffect } from 'react';

function initFieldsState(fields) {
  return fields.reduce((prevFormState, field) => ({
    ...prevFormState,
    [ field.name ]: ''
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
  const [ formState, setFormState ] = useState(() => initFieldsState(fields));

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
      setFormState(initFieldsState(fields));
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
