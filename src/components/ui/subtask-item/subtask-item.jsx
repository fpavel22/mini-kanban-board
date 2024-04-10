import cn from 'classnames';

export const SubtaskItem = ({
  completed,
  loading,
  darkMode,
  title,
  children,
  ...props
}) => {
  const _className = cn('subtask__item', {
    'subtask__item--d-mode': darkMode,
    'subtask__item--completed': completed,
    'subtask__item--loading': loading,
  });

  return (
    <label className={ _className }>
      <input
        { ...props }
        type="checkbox"
        checked={ completed }
        disabled={ loading }
      />
      <span className="subtask__title">{ children }</span>
      <span className="subtask__tooltip">{ title }</span>
    </label>
  );
};
