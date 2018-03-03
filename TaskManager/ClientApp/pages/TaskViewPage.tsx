import 'isomorphic-fetch';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Task } from '../shared/interfaces/Task';

interface TaskViewPageProps {
    id: number;
}

interface TaskViewPageState {
    task: Task;
    loading: boolean;
}

export class TaskViewPage extends React.Component<RouteComponentProps<TaskViewPageProps>, TaskViewPageState> {
    constructor() {
        super();
        this.state = { task: {} as Task, loading: true };
    }

    public componentDidMount() {
        fetch('api/Task/' + this.props.match.params.id)
            .then(response => response.json() as Promise<Task>)
            .then(data => {
                this.setState({ task: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : JSON.stringify(this.state.task);

        return <div>
            <h1>Task View</h1>
            { contents }
        </div>;
    }
}
