import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Task } from '../shared/models/Task';
import { EstimationTimeView } from './EstimationTimeView';

interface SubtasksListProps {
    task: Task;
    tasks: Task[];
}

export class SubtasksList extends React.Component<SubtasksListProps, {}> {
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
        const subtasks = this.props.tasks.filter(subtask => subtask.parentId === this.props.task.id);
        return subtasks.length > 0
            ? <div>
                <p>Subtasks:</p>
                <ul>
                    { subtasks.map(subtask =>
                        <li key={subtask.id}>
                            <NavLink to={'/task/' + subtask.id} >
                                #{subtask.id}: {subtask.title}
                            </NavLink>
                            { subtask.estimatedTime > 0 &&
                                <span>
                                    &nbsp;(Estimation: <EstimationTimeView time={this.computeTotalTime(subtask, 'estimatedTime')} />)
                                </span>
                            }
                        </li>
                    )}
                </ul>
            </div>
            : null;;
    }
}
