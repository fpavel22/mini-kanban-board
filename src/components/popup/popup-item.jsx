import cn from 'classnames';
import { POPUP_STATES } from '@/constants';

export const PopupItem = ({ option }) => {
  const { value, label, onClick } = option;

  const _className = cn('popup__item', {
    'popup__item--danger': value === POPUP_STATES.DANGER,
    'popup__item--important': value === POPUP_STATES.IMPORTANT
  });

  return <li className={ _className } onClick={ onClick }>{ label }</li>;
};
