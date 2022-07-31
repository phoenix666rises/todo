import './taskList.css';

import PropTypes from 'prop-types';

import Task from '../Task';
import NewTaskForm from '../NewTaskForm';

function TaskList({ tasks, onTogglePropertyHandler, onDeleteHandler, onSwitchEditModeHandler, onEditTaskHandler }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onTogglePropertyHandler={onTogglePropertyHandler}
          onDeleteHandler={onDeleteHandler}
          onSwitchEditModeHandler={onSwitchEditModeHandler}
        >
          <NewTaskForm isEditorField editingText={task.title} onEditTaskHanlder={onEditTaskHandler} />
        </Task>
      ))}
    </ul>
  );
}

TaskList.propType = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      isEditing: PropTypes.bool.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  onTogglePropertyHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  onSwitchEditModeHandler: PropTypes.func.isRequired,
  onEditTaskHandler: PropTypes.func.isRequired,
};

export default TaskList;
