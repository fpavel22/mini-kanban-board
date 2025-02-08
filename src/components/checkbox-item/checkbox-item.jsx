import cn from 'classnames';

import './checkbox-item.scss';

export const CheckboxItem = ({
  children,
  completed,
  darkMode,
  loading,
  title,
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
        checked={ completed }
        disabled={ loading }
        type="checkbox"
      />
      <span className="checkbox__title">{ children }</span>
      <span className="checkbox__tooltip">{ title }</span>
    </label>
  );
};
