import * as React from 'react';
import { Route } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';
import { TaskAddPage } from './pages/TaskAddPage';
import { TaskListPage } from './pages/TaskListPage';
import { TaskViewPage } from './pages/TaskViewPage';

export const routes = <Layout>
    <Route exact path='/' component={ HomePage } />
    <Route path='/task-add' component={ TaskAddPage } />
    <Route path='/task-list' component={ TaskListPage } />
    <Route path='/task/:id' component={ TaskViewPage } />
</Layout>;
