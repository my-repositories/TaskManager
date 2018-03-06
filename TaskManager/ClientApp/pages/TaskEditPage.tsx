import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink, RouteComponentProps } from 'react-router-dom';

import { Task } from '../shared/models/Task';
import TaskStore from '../shared/stores/TaskStore';
import { TASK_STATUSES } from '../shared/constants/Task';
import NotificationService from '../shared/services/NotificationService';

interface TaskEditwPageProps {
    id: string;
}

@observer
export class TaskEditPage extends React.Component<RouteComponentProps<TaskEditwPageProps>, {}> {
    private _task: Task;

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const name = event.target.name;
        const value = event.target.value;
        (this._task as any)[name] = value;
    }

    public handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this._task.status = +this._task.status;
        TaskStore.updateTask(this._task);
        this.props.history.push('/task/' + this._task.id);
        NotificationService.success({
            title: 'Success',
            message: `Task: "${this._task.title}" has been successfully updated.`
        });
    }

    public render() {
        this._task = {...TaskStore.getById(+this.props.match.params.id)};
        const task = this._task;

        if (TaskStore.tasks.length === 0 || !task.id) {
            return <p><em>Sorry, Task not found ...</em></p>;
        }

        return <div>
        <h1>Edit Task</h1>

        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>
                    Title
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task title"
                        required={true}
                        minLength={3}
                        name="title"
                        onChange={this.handleChange}
                        defaultValue={task.title}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Description
                    <textarea
                        cols={40}
                        rows={5}
                        className="form-control"
                        placeholder="Task description"
                        name="description"
                        onChange={this.handleChange}
                        defaultValue={task.description}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Parent Task
                    <select className="form-control" name="parentId" onChange={this.handleChange} defaultValue={task.parentId.toString()}>
                        <option key={0} value="0">-</option>
                        { TaskStore.tasks.map(taskItem =>
                            <option key={taskItem.id.toString()} value={taskItem.id.toString()} >
                                #{ taskItem.id }: { taskItem.title }
                            </option>
                        )}
                    </select>
                </label>
            </div>
            <div className="form-group">
                <label>
                    Responsible
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Responsible Fullname"
                        required={true}
                        minLength={3}
                        name="responsible"
                        onChange={this.handleChange}
                        defaultValue={task.responsible}
                    />
                </label>
            </div>
            {task.status !== 3 && <div className="form-group">
                <label>
                    Status
                    <select className="form-control" name="status" onChange={this.handleChange} defaultValue={task.status.toString()}>
                        <option key={0} value={0}>{TASK_STATUSES[0]}</option>
                        <option key={1} value={1}>{TASK_STATUSES[1]}</option>
                        <option key={2} value={2}>{TASK_STATUSES[2]}</option>
                        {task.status !== 0 && <option key={3} value={3}>{TASK_STATUSES[3]}</option>}
                    </select>
                </label>
            </div>}
            <div className="form-group">
                <label>
                    Estimation (in minutes)
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Estimated Time"
                        name="estimatedTime"
                        onChange={this.handleChange}
                        defaultValue={task.estimatedTime.toString()}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Actual time expenditure (in minutes)
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Lead Time"
                        name="leadTime"
                        onChange={this.handleChange}
                        defaultValue={task.leadTime.toString()}
                    />
                </label>
            </div>
            <NavLink to={`/task/${task.id}`} className="btn btn-default">Back</NavLink> &nbsp;
            <button type="submit" className="btn btn-success">Save</button>
        </form>
    </div>;
    }
}
