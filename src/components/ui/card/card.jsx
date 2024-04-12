import cn from 'classnames';

export const Card = ({ task, darkMode, ...props }) => {
  const { title, subtasks, priority } = task;
  const subtasksCount = subtasks.length;
  const tasksCompleted = subtasks.filter(({ completed }) => completed).length;

  const _className = cn('card', {
    'card--d-mode': darkMode,
    [`card--priority-${ priority }`]: priority
  });

  return (
    <div { ...props } className={ _className }>
      <h4 className="card__header">{ title }</h4>
      <p className="card__summary">
        { subtasksCount
          ? `${ tasksCompleted } of ${ subtasksCount } subtasks completed`
          : 'No subtasks added' }
      </p>
    </div>
  );
};
