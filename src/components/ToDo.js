import React from 'react';
import TaskItem from './TaskItem';
import AddNewTask from './AddNewTask';

import { updateTask } from '../actions';

import { getTasks, completeAll as completeAllAction } from '../actions';


export default class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTaskDialogFlag: false,
            taskItems: [],
            dialogData: {}
        };
    }

    getTasksList() {
        let taskItems = getTasks();
        this.setState({ taskItems });
    }

    componentDidMount() {
        this.getTasksList();
    }

    showAddTaskDialog = () => {
        this.setState({
            showAddTaskDialogFlag: true
        });
    }

    closeAddTaskDialog = () => {
        this.setState({
            showAddTaskDialogFlag: false,
            dialogData: {}
        });
        this.getTasksList();
    }

    refreshList = () => {
        this.getTasksList();
    }

    searchList = (keyword) => {
        let taskItems = getTasks();
        var newTaskItems = [];
        for (var i = 0; i < taskItems.length; i++) {
            if (
                // taskItems[i]["title"].indexOf(keyword) > -1 ||
                taskItems[i]["description"].toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                taskItems[i]["priority"].toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                newTaskItems.push(taskItems[i]);
            }
        }

        this.setState({ taskItems: newTaskItems });
    }

    completeAll() {
        completeAllAction();
        this.getTasksList();
    }

    editTask = (data) => {
        this.setState({
            showAddTaskDialogFlag: true,
            dialogData: data
        });
    }

    toggleStatus = (data) => {
        data.status === "open" ? data.status = "closed" : data.status = "open";
        updateTask(data);
        this.getTasksList();
    }

    render() {
        return (
            <div className="todo-page">
                <div className="main-container">
                    <div className="header">
                        <span className="header-text">Tasks</span>
                        <div className="actions">
                            <button className="primaryButton addButton" onClick={() => this.showAddTaskDialog()}><span>Add New Task</span></button>
                        </div>
                    </div>
                    <div className="todo-openlist">
                        <div className="search-bar">
                            <input type="search" placeholder="Search list" onChange={(e) => this.searchList(e.target.value)}></input>
                            <button className="transparentButton" onClick={() => this.completeAll()}><span><i className="fa fa-check"></i>Complete All</span></button>
                        </div>
                        {(this.state && this.state.taskItems.length > 0 && this.state.taskItems.map(item => <TaskItem key={item.id} item={item} toggleStatus={this.toggleStatus} refresh={this.refreshList} edit={this.editTask}></TaskItem>)) || <span className="no-task">No task available</span>}
                    </div>
                </div>
                {this.state && this.state.showAddTaskDialogFlag && <AddNewTask data={this.state.dialogData} closeDialog={this.closeAddTaskDialog} />}
            </div>
        );
    }
}