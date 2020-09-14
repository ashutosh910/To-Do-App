import React from 'react';
import { removeTasks } from '../actions';
import Moment from 'react-moment';

export default class TaskItem extends React.Component {

    deleteTask = () => {
        removeTasks(this.props && [this.props.item]);
        this.props.refresh();
    }

    editTask = () => {
        this.props.edit(this.props.item);
    }

    toggleStatus = () => {
        this.props.toggleStatus(this.props.item);
    }

    render() {
        let { item } = this.props;
        return (
            <div className={`listitem  ${item.status}Status priority${item.priority}`}>
                <div className="item-checkbox">
                    <input type="checkbox" checked={item.status === "open" ? false : true} onChange={() => this.toggleStatus()}></input>
                </div>
                {/* <div className="item-title">{item.title}</div> */}
                <div className="item-description">
                    <div>{item.description}</div>
                    <div className="item-due-datetime"> <Moment format="MMM Do YYYY">
                        {item.dueDateTime}
                    </Moment></div>
                </div>
                <div className="item-actions">
                    <div className="item-priority">{item.priority}</div>
                    <button className="transparentButton" onClick={() => this.editTask()}>
                        <i className="fa fa-edit" />
                    </button>
                    <button className="transparentButton" onClick={() => this.deleteTask()}>
                        <i className="fa fa-close" />
                    </button>
                </div>
            </div>
        );
    }
}