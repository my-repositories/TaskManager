import * as React from 'react';

import { TaskStatus } from './TaskStatus';
import { Task } from '../shared/models/Task';
import { SubtasksList } from './SubtasksList';
import { DateTimeView } from './DateTimeView';
import { EstimationTimeView } from './EstimationTimeView';

interface TasksTableProps {
    tasks: Task[];
}

export class TasksTable extends React.Component<TasksTableProps, {}> {
    constructor() {
        super();
        this.computeTotalTime = this.computeTotalTime.bind(this);
    }

    public computeTotalTime(task: any, timeType: any) {
        return this.props.tasks
            .reduce((prev, cur) => {
                if (cur.parentId === task.id) {
                    prev += this.computeTotalTime(cur, timeType);
                }
                
                return prev;
            }, task[timeType])
    }

    public render() {
        const tasks = this.props.tasks;

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
                    <SubtasksList task={task} tasks={tasks} />
                </td>
                <td><EstimationTimeView time={this.computeTotalTime(task, 'estimatedTime')} /></td>
                <td><EstimationTimeView time={this.computeTotalTime(task, 'leadTime')} /></td>
                <td>{ task.responsible }</td>
            </tr>
        )}
        </tbody>
    </table>;
    }
}
