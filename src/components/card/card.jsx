import cn from 'classnames';

import './card.scss';

export const Card = ({
  className,
  darkMode,
  description,
  priority,
  title,
  ...props
}) => {
  const _className = cn('card', {
    'card--d-mode': darkMode,
    [`card--priority-${ priority }`]: priority
  }, className);

  return (
    <div { ...props } className={ _className }>
      <h4 className="card__title">{ title }</h4>
      <p className="card__description">
        { description }
      </p>
    </div>
  );
};
