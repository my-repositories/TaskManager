import 'isomorphic-fetch';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Task } from '../shared/interfaces/Task';
import { TaskStatus } from '../components/TaskStatus';
import { DateTimeView } from '../components/DateTimeView';
import { EstimationTimeView } from '../components/EstimationTimeView';

interface TaskListPageState {
    tasks: Task[];
    loading: boolean;
}

export class TaskListPage extends React.Component<RouteComponentProps<{}>, TaskListPageState> {
    constructor() {
        super();
        this.state = { tasks: [], loading: true };
    }

    public componentDidMount() {
        fetch('api/Task')
            .then(response => response.json() as Promise<Task[]>)
            .then(data => {
                this.setState({ tasks: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TaskListPage.renderTasksTable(this.state.tasks);

        return <div>
            <h1>Task List</h1>
            { contents }
        </div>;
    }

    private static renderTasksTable(tasks: Task[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Created at</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Estimated time</th>
                    <th>Lead time</th>
                    <th>Responsible</th>
                </tr>
            </thead>
            <tbody>
            { tasks.filter(task => task.parentId === 0).map(task =>
                <tr key={ task.id }>
                    <td><TaskStatus status={task.status} /></td>
                    <td><DateTimeView date={task.createdAt} /></td>
                    <td>{ task.title }</td>
                    <td>
                        { task.description }
                        { TaskListPage.renderSubtasksList(task, tasks) }
                    </td>
                    <td><EstimationTimeView time={task.estimatedTime} /></td>
                    <td><EstimationTimeView time={task.leadTime} /></td>
                    <td>{ task.responsible }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    private static renderSubtasksList(task: Task, tasks: Task[]) {
        const subtasks = tasks.filter(subtask => subtask.parentId === task.id);
        return subtasks.length > 0
            ? <div>
                <p>Subtasks:</p>
                <ul>
                    { subtasks.map(subtask =>
                        <li key={subtask.id}>#{subtask.id}: {subtask.title}</li>
                    )}
                </ul>
            </div>
            : null;
    }
}
