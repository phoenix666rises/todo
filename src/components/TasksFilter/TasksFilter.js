import './tasksFilter.css';
import PropTypes from 'prop-types';

function TasksFilter({ onToggleFilterHandler, filter }) {
  const filters = ['All', 'Completed', 'Active'];

  return (
    <ul className="filters">
      {filters.map((filterName) => (
        <li key={filterName}>
          <button
            type="button"
            className={filter === filterName ? 'selected' : ''}
            onClick={(e) => onToggleFilterHandler(e.target.textContent)}
          >
            {filterName}
          </button>
        </li>
      ))}
    </ul>
  );
}

TasksFilter.propTypes = {
  onToggleFilterHandler: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TasksFilter;
