import './app.css';

import { Component } from 'react';
import { v1 as uuid } from 'uuid';

import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';
import TaskList from '../TaskList';
import TasksFilter from '../TasksFilter';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tasksData: [
        {
          id: '132de',
          title: 'Completed task',
          completed: true,
          isEditing: false,
          time: new Date(2022, 3, 15, 13, 22),
        },
        {
          id: '378fx',
          title: 'Click icon for edit',
          completed: false,
          isEditing: false,
          time: new Date(2022, 3, 10, 10, 22),
        },
        {
          id: 'sd789',
          title: 'Active task',
          completed: false,
          isEditing: false,
          time: new Date(2022, 3, 2, 22, 22),
        },
      ],
      filter: 'All',
    };
  }

  onToggleProperty = (id, property) => {
    const { tasksData } = this.state;
    const newArray = tasksData.map((task) => {
      if (task.id === id) return { ...task, [property]: !task[property] };
      return task;
    });

    this.setState({
      tasksData: newArray,
    });
  };

  onSwitchEditMode = (id) => {
    const { tasksData } = this.state;
    const newArray = tasksData.map((task) => {
      if (task.completed) return task;
      if (task.id === id) return { ...task, isEditing: true };
      if (task.isEditing) return { ...task, isEditing: false };
      return task;
    });

    this.setState({
      tasksData: newArray,
    });
  };

  onDelete = (id) => {
    const { tasksData } = this.state;
    this.setState({
      tasksData: tasksData.filter((task) => task.id !== id),
    });
  };

  onAddNewTask = (title) => {
    const { tasksData } = this.state;
    const newTask = {
      id: uuid(),
      title,
      completed: false,
      isEditing: false,
      time: new Date(),
    };

    this.setState({
      tasksData: [...tasksData, newTask],
    });
  };

  onEdit = (text) => {
    const { tasksData } = this.state;
    const newArray = tasksData.map((task) => {
      if (task.isEditing) return { ...task, isEditing: false, title: text };
      return task;
    });

    this.setState({
      tasksData: newArray,
    });
  };

  onToggleFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  onClearCompleted = () => {
    const { tasksData } = this.state;
    this.setState({
      tasksData: tasksData.filter((task) => !task.completed),
    });
  };

  getTasksByFilter() {
    const { tasksData: tasks } = this.state;
    const { filter } = this.state;

    switch (filter) {
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }

  render() {
    const { tasksData, filter } = this.state;
    const tasks = this.getTasksByFilter();
    const leftTasks = tasksData.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddNewHandler={this.onAddNewTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            onTogglePropertyHandler={this.onToggleProperty}
            onDeleteHandler={this.onDelete}
            onSwitchEditModeHandler={this.onSwitchEditMode}
            onEditTaskHandler={this.onEdit}
          />
          <Footer
            onToggleFilterHandler={this.onToggleFilter}
            onClearCompletedHandler={this.onClearCompleted}
            filter={filter}
            leftTasks={leftTasks}
          >
            <TasksFilter filter={filter} onToggleFilterHandler={this.onToggleFilter} />
          </Footer>
        </section>
      </section>
    );
  }
}
