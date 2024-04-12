import cn from 'classnames';

import { DROPDOWN_DEFAULT_OPTIONS } from '@/constants';

export const Dropdown = ({ darkMode, options = DROPDOWN_DEFAULT_OPTIONS, ...props }) => {
  const _className = cn('dropdown__select', {
    'dropdown__select--d-mode': darkMode
  });

  return (
    <select { ...props } className={ _className }>
      { options.map(({ label, value }) => (
        <option key={ value } className="dropdown__select-option" value={ value }>
          { label }
        </option>
      )) }
    </select>
  );
};
