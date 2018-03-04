import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink, RouteComponentProps } from 'react-router-dom';

import { Task } from '../shared/models/Task';
import TaskStore from '../shared/stores/TaskStore';
import { TaskStatus } from '../components/TaskStatus';
import { SubtasksList } from '../components/SubtasksList';
import { DateTimeView } from '../components/DateTimeView';
import { EstimationTimeView } from '../components/EstimationTimeView';

interface TaskViewPageProps {
    id: string;
}

@observer
export class TaskViewPage extends React.Component<RouteComponentProps<TaskViewPageProps>, {}> {
    private _task: Task;

    constructor() {
        super();
        this.removeTask = this.removeTask.bind(this);
    }

    public removeTask() {
        TaskStore.removeTask(this._task);
        this.props.history.push('/task-list');
    }

    public render() {
        this._task = {...TaskStore.getById(+this.props.match.params.id)};
        const task = this._task;

        if (TaskStore.tasks.length === 0 || !task.id) {
            return <p><em>Sorry, Task not found ...</em></p>;
        }

        return <div className="card">
            <div className="card-body">
                <h1 className="card-title">#{ task.id}: {task.title }</h1>
                <p className="card-text">{ task.description }</p>
                <p className="card-text"><TaskStatus status={task.status} /></p>
                <p className="card-text">
                    <b>Created at:</b> <DateTimeView date={task.createdAt} />
                </p>
                {task.completedAt > 0 && <p className="card-text">
                    <b>Completed at:</b> <DateTimeView date={task.completedAt} />
                </p>}
                {task.parentId != 0 && <p className="card-text">
                    <b>Parent task:</b> &nbsp;
                    <NavLink to={'/task/' + task.parentId} >
                        #{task.parentId}: {TaskStore.getById(task.parentId).title}
                    </NavLink>
                </p>}
                <p className="card-text">
                    <b>Responsible:</b> {task.responsible}
                </p>
                {task.estimatedTime > 0 && <p className="card-text">
                    <b>Estimated time:</b> <EstimationTimeView time={task.estimatedTime} />
                </p>}
                {task.leadTime > 0 && <p className="card-text">
                    <b>Lead time:</b> <EstimationTimeView time={task.leadTime} />
                </p>}
                <hr />
                <NavLink to={`/task/${task.id}/edit`}  className="btn btn-warning">
                    Edit task
                </NavLink> &nbsp;
                <button className="btn btn-danger" onClick={this.removeTask}>Delete task</button>
                <hr />
                <SubtasksList task={task} tasks={TaskStore.tasks} />
            </div>
        </div>;
    }
}
