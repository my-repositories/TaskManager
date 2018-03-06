import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import TaskStore from '../shared/stores/TaskStore';
import { Task, TaskWithChildren } from '../shared/models/Task';

interface TasksTreeProps {
    root: TaskWithChildren;
    isFolded: boolean;
}

class TasksTree extends React.Component<TasksTreeProps, {}> {
    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
    }
    
    public toggle(event: any) {
        (event.target as any).parentNode.nextSibling.classList.toggle("folded");
        event.target.className = event.target.className === 'text-success glyphicon glyphicon-chevron-down'
            ? 'text-success glyphicon glyphicon-chevron-right'
            : 'text-success glyphicon glyphicon-chevron-down'
    }
    
    public render(): JSX.Element {
        const { root, isFolded } = this.props;

        if (root.children.length === 0) {
            return <div />;
        }

        return <ul className={'tree' + (isFolded ? '' : ' folded')}>
            { root.children.map(tree => [
                <li key={tree.id}>
                    {tree.children.length > 0 &&
                        <span
                            title='Toggle tree'
                            className='text-success glyphicon glyphicon-chevron-right'
                            onClick={this.toggle}
                        ></span>
                    }
                    &nbsp; <NavLink to={'/task/' + tree.id}>{ tree.title }</NavLink>
                </li>,
                <TasksTree root={tree} isFolded={false} />
            ])}
        </ul>;
    }
}

@observer
export class TasksTreeContainer extends React.Component<{}, {}> {
    public render() {
        return <TasksTree root={TaskStore.tree} isFolded={true} />;
    }

    // fix for router
    shouldComponentUpdate() {
        return true;
    }
}