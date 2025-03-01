import cn from 'classnames';

import './dropdown.scss';

export const Dropdown = ({
  className,
  darkMode,
  options = [],
  ...props
}) => {
  const _className = cn('dropdown__select', {
    'dropdown__select--d-mode': darkMode
  }, className);

  return (
    <select { ...props } className={ _className }>
      { options.map(({ label, value }) => (
        <option key={ value } value={ value }>
          { label }
        </option>
      )) }
    </select>
  );
};
