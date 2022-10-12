import { useSelector } from 'react-redux';
import cn from 'classnames';

import { themeSliceSelector } from '../../features/themeSlice';
import { DROPDOWN_OPTIONS } from '../../constants';
import './dropdown.scss';

export const Dropdown = ({ options, ...props }) => {
  const darkMode = useSelector(themeSliceSelector);
  const _options = options ?? DROPDOWN_OPTIONS;

  const _className = cn('dropdown__select', {
    'dropdown__select--d-mode': darkMode
  });

  return (
    <select { ...props } className={ _className }>
      { _options.map(({ label, value }) => (
        <option key={ value } className="dropdown__select-option" value={ value }>
          { label }
        </option>
      )) }
    </select>
  );
}