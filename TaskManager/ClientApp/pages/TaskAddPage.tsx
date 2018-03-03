import 'isomorphic-fetch';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Task } from '../shared/interfaces/Task';

interface TaskAddPageState {
    tasks: Task[];
}

export class TaskAddPage extends React.Component<RouteComponentProps<{}>, TaskAddPageState> {
    constructor() {
        super();
        this.state = { tasks: [] };
    }

    public componentDidMount() {
        fetch('api/Task')
            .then(response => response.json() as Promise<Task[]>)
            .then(data => {
                this.setState({ tasks: data });
            });
    }

    public render() {
        return <div>
            <h1>Add Task</h1>

            <form>
                <div className="form-group">
                    <label>
                        Title
                        <input type="text" className="form-control" placeholder="Task title" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description
                        <textarea className="form-control" placeholder="Task description" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Parent Task
                        <select className="form-control">
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
                        <input type="text" className="form-control" placeholder="Responsible Fullname" />
                    </label>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>;
    }
}
