import * as React from 'react';

interface DateTimeViewProps {
    date: number;
}

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export const DateTimeView = (props: DateTimeViewProps) => (
    <span className="date-time-view">
        {new Date(props.date * 1000).toLocaleDateString("en-US", options)}
    </span>
);
