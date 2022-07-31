import './newTaskForm.css';

import { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    const { isEditorField, editingText } = this.props;
    this.state = {
      value: isEditorField ? editingText : '',
    };
  }

  onInputHandler = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    const { onAddNewHandler, isEditorField, onEditTaskHanlder } = this.props;
    const { value } = this.state;

    if (e.code === 'Enter' && value.trim()) {
      if (!isEditorField) {
        onAddNewHandler(value);
      } else {
        onEditTaskHanlder(value);
      }

      this.setState({
        value: '',
      });
    }
  };

  render() {
    const { isEditorField } = this.props;
    const { value } = this.state;

    const inputClass = classNames({
      'new-todo': !isEditorField,
      edit: isEditorField,
    });

    return (
      <input
        className={inputClass}
        placeholder={isEditorField ? '' : 'What needs to be done?'}
        value={value}
        onChange={this.onInputHandler}
        onKeyDown={this.onSubmitHandler}
      />
    );
  }
}

NewTaskForm.defaultProps = {
  isEditorField: false,
  editingText: '',
  onAddNewHandler: () => {},
  onEditTaskHanlder: () => {},
};

NewTaskForm.propTypes = {
  isEditorField: PropTypes.bool,
  editingText: PropTypes.string,
  onAddNewHandler: PropTypes.func,
  onEditTaskHanlder: PropTypes.func,
};
