import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';

import { NavMenu } from './NavMenu';
import NotificationService from '../shared/services/NotificationService';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    componentDidMount() {
        NotificationService.initialize((this.refs.notificationSystem as NotificationSystem.System));
    }

    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
            <NotificationSystem ref="notificationSystem" />
        </div>;
    }
}
