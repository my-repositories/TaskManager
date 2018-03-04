import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Task } from '../shared/models/Task';

interface SubtasksListProps {
    task: Task;
    tasks: Task[];
}

export const SubtasksList = ({task, tasks} : SubtasksListProps) => {
    const subtasks = tasks.filter(subtask => subtask.parentId === task.id);
    return subtasks.length > 0
        ? <div>
            <p>Subtasks:</p>
            <ul>
                { subtasks.map(subtask =>
                    <li key={subtask.id}>
                        <NavLink to={'/task/' + subtask.id} >
                            #{subtask.id}: {subtask.title}
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
        : null;
}