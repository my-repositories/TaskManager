import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Task } from '../shared/models/Task';
import TaskStore from '../shared/stores/TaskStore';
import { TasksTable } from '../components/TasksTable';

@observer
export class TaskListPage extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        let contents = TaskStore.tasks.length === 0
            ? <p><em>Tasks not found ...</em></p>
            : <TasksTable tasks={TaskStore.tasks} />;

        return <div>
            <h1>Task List</h1>
            { contents }
        </div>;
    }
}
