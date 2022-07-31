import './footer.css';
import PropTypes from 'prop-types';

function Footer({ onClearCompletedHandler, leftTasks, children }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${leftTasks} `}
        items left
      </span>
      {children}
      <button type="button" className="clear-completed" onClick={onClearCompletedHandler}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  onClearCompletedHandler: PropTypes.func.isRequired,
  leftTasks: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default Footer;
