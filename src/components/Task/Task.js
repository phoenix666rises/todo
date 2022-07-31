import './task.css';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function Task({ task, onTogglePropertyHandler, onDeleteHandler, onSwitchEditModeHandler, children }) {
  const { id, completed, isEditing, title, time } = task;

  const liClass = classNames({
    completed,
    editing: isEditing,
  });

  return (
    <li className={liClass}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onTogglePropertyHandler(id, 'completed')}
        />
        <label>
          <span className="description" onClickCapture={() => onTogglePropertyHandler(id, 'completed')}>
            {title}
          </span>
          <span className="created">
            created
            {` ${formatDistanceToNow(time, { includeSeconds: true })} `}
            ago
          </span>
        </label>
        <button type="button" className="icon icon-edit" onClick={() => onSwitchEditModeHandler(id)} />
        <button type="button" className="icon icon-destroy" onClick={() => onDeleteHandler(id)} />
      </div>
      {task.isEditing && children}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onTogglePropertyHandler: PropTypes.func.isRequired,
  onDeleteHandler: PropTypes.func.isRequired,
  onSwitchEditModeHandler: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Task;
