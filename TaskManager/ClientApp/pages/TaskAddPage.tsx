import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Task } from '../shared/interfaces/Task';
import { ApiService } from '../shared/ApiService';

interface TaskAddPageState {
    tasks: Task[];
}

export class TaskAddPage extends React.Component<RouteComponentProps<{}>, TaskAddPageState> {
    private _task: Task = new Task();

    constructor() {
        super();
        this.state = { tasks: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount() {
        ApiService.get('/Task')
            .then(response => this.setState({ tasks: response.data }));
    }

    public handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const name = event.target.name;
        const value = event.target.value;
        (this._task as any)[name] = value;
    }

    public handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        ApiService.patch('/Task', this._task)
            .then(response => this.setState((prevState, props) => ({tasks: [...prevState.tasks, response.data]})));
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
                            <option value="0">-</option>
                            { this.state.tasks.map(task =>
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
