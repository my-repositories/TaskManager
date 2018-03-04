import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Task } from '../shared/models/Task';
import TaskStore from '../shared/stores/TaskStore';

@observer
export class TaskAddPage extends React.Component<RouteComponentProps<{}>, {}> {
    private _task: Task = new Task();

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
        TaskStore.saveTask(this._task);
    }

    public render() {
        return <div>
            <h1>Add Task</h1>

            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Title
                        <input type="text" className="form-control" placeholder="Task title" required={true} minLength={3} name="title" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description
                        <textarea className="form-control" placeholder="Task description" name="description" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Parent Task
                        <select className="form-control" name="parentId" onChange={this.handleChange} >
                            <option key={0} value="0">-</option>
                            { TaskStore.tasks.map(task =>
                                <option key={task.id} value={task.id}>#{ task.id }: { task.title }</option>
                            )}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Responsible
                        <input type="text" className="form-control" placeholder="Responsible Fullname" required={true} minLength={3} name="responsible" onChange={this.handleChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Estimation
                        <input type="number" className="form-control" placeholder="Estimated Time" name="estimatedTime" onChange={this.handleChange} />
                    </label>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>;
    }
}
