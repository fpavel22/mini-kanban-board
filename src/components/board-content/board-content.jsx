import { Card } from '../card';
import { CardModal } from '../card-modal';
import { EmptyBoard } from './empty-board';
import { TaskForm } from '../task-form';

import './board-content.scss';

export const BoardContent = () => {
  const cards = [];

  return (
    <div className="board__content">
      { cards.length > 0 ? <p>added</p> : <EmptyBoard /> }
    </div>
  );
};

// {/* <Card title="Card title 1" tasks={ 3 } tasksCompleted={ 5 } />
//       <Card title="Card title 2" tasks={ 2 } tasksCompleted={ 1 } />
//       <Card title="Card title 3" tasks={ 6 } tasksCompleted={ 2 } /> */}
//       <CardModal>
//         <TaskForm />
//       </CardModal>