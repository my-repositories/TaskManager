import * as React from 'react';

import { TASK_STATUSES } from '../shared/constants/Task';
import { TASK_STATUS } from '../shared/enums/Task';

interface TaskStatusProps {
    status: number;
}

export const TaskStatus = ({status}: TaskStatusProps) => {
    let className = '';

    switch (status)
    {
        case TASK_STATUS.Performed:
            className = 'bg-info';
            break;

        case TASK_STATUS.Suspended:
            className = 'bg-danger';
            break;

        case TASK_STATUS.Completed:
            className = 'bg-success';
            break;

        default:
            className = 'bg-warning';
            break;
    }

    return <span className={className}>{TASK_STATUSES[status]}</span>;
};
