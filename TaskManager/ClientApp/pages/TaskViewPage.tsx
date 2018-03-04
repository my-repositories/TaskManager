import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Task } from '../shared/models/Task';
import TaskStore from '../shared/stores/TaskStore';

interface TaskViewPageProps {
    id: string;
}

@observer
export class TaskViewPage extends React.Component<RouteComponentProps<TaskViewPageProps>, {}> {
    public render() {
        let contents = TaskStore.tasks.length === 0
            ? <p><em>Sorry, Task not found ...</em></p>
            : JSON.stringify(TaskStore.getById(+this.props.match.params.id));

        return <div>
            <h1>Task View</h1>
            { contents }
        </div>;
    }
}
