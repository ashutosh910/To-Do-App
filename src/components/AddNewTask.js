import React from 'react';
import { addTask, idGenerator, updateTask, getCurrentDateTimeLocal } from '../actions';
const priorityList = ["High", "Medium", "Low"];

export default class AddNewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id || idGenerator(),
            // title: "",
            description: this.props.data.description || "",
            priority: this.props.data.priority || "Low",
            createdDateTime: this.props.data.createdDateTime || new Date(),
            dueDateTime: this.props.data.dueDateTime || getCurrentDateTimeLocal(),
            status: this.props.data.status || "open"
        }
    }

    addTask = () => {
        //Add or update the task
        let success = false;
        if (this.props.data && this.props.data.id) {
            success = updateTask(this.state);
        } else {
            success = addTask(this.state);
        }
        this.props.closeDialog(success);
    }

    closeAddTaskDialog = () => {
        this.props.closeDialog();
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="header">
                        <span>Add New Task</span>
                    </div>
                    <div className="addtask">
                        {/* <div className="addtask-title">
                            <label>Title</label>
                            <input type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value })}></input>
                        </div> */}
                        <div className="addtask-description">
                            <label>Description</label>
                            <textarea value={this.state.description} onChange={e => this.setState({ description: e.target.value })}></textarea>
                        </div>
                        <div className="addtask-priority">
                            <label>Priority</label>
                            <select onChange={e => this.setState({ priority: e.target.value })}>
                                {priorityList.map((priority) => {
                                    if (priority === this.state.priority) {
                                        return <option key={priority} value={priority} selected="selected">{priority}</option>;
                                    } else {
                                        return <option key={priority} value={priority}>{priority}</option>;
                                    }
                                })}
                            </select>
                        </div>
                        <div className="addtask-dueDate">
                            <label>Due Date Time</label>
                            <input type="datetime-local" value={this.state.dueDateTime} onChange={e => this.setState({ dueDateTime: e.target.value })}></input>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="primaryButton btn-add" onClick={() => this.addTask()}>
                            {(this.props.data && this.props.data.id) ? "Update" : "Add"}
                        </button>
                        <button className="primaryButton btn-close" onClick={() => this.closeAddTaskDialog()}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}