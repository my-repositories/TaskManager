import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { TasksTreeContainer } from './TasksTree';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse with-scrollbar'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Task Manager</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/task-add' } activeClassName='active'>
                                <span className='glyphicon glyphicon-plus'></span> Add Task
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/task-list' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Task List
                            </NavLink>
                        </li>
                        <li>
                            <hr />
                            <TasksTreeContainer />
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
