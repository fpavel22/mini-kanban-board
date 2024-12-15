import cn from 'classnames';

export const CheckboxItem = ({
  completed,
  loading,
  darkMode,
  title,
  children,
  ...props
}) => {
  const _className = cn('checkbox__item', {
    'checkbox__item--d-mode': darkMode,
    'checkbox__item--completed': completed,
    'checkbox__item--loading': loading,
  });

  return (
    <label className={ _className }>
      <input
        { ...props }
        type="checkbox"
        checked={ completed }
        disabled={ loading }
      />
      <span className="checkbox__title">{ children }</span>
      <span className="checkbox__tooltip">{ title }</span>
    </label>
  );
};
