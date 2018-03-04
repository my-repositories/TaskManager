import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import TaskStore from '../shared/stores/TaskStore';
import { Task, TaskWithChildren } from '../shared/models/Task';

interface TasksTreeProps {
    root: TaskWithChildren;
}

class TasksTree extends React.Component<TasksTreeProps, {}> {
    public render(): JSX.Element {
        const { root } = this.props;

        if (root.children.length === 0) {
            return <div />;
        }

        return <ul className='tree'>
            { root.children.map(tree => [
                <li key={tree.id}>
                    <NavLink to={'/task/' + tree.id}>{ tree.title }</NavLink>
                </li>,
                <TasksTree root={tree} />
            ])}
        </ul>;
    }
}

@observer
export class TasksTreeContainer extends React.Component<{}, {}> {
    public render() {
        return <TasksTree root={TaskStore.tree} />;
    }

    // fix for router
    shouldComponentUpdate() {
        return true;
    }
}
