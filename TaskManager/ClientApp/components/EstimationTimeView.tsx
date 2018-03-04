import * as React from 'react';

interface EstimationTimeViewProps {
    time: number;
}

const jobTime = {
    years: 60 * 8 * 5 * 4 * 12,
    months: 60 * 8 * 5 * 4,
    weeks: 60 * 8 * 5,
    days: 60 * 8,
    hours: 60,
};

const convertTime = (time: number) => (count: number) => {
    const result = Math.floor(time / count);
    time -= result * count;
    return result;
};

export const EstimationTimeView = (props: EstimationTimeViewProps) => {
    const estimation = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0
    };

    const getValue = convertTime(props.time);
    estimation.years = getValue(jobTime.years);
    estimation.months = getValue(jobTime.months);
    estimation.weeks = getValue(jobTime.weeks);
    estimation.days = getValue(jobTime.days);
    estimation.hours = getValue(jobTime.hours);

    return <span>
        {estimation.years === 0 ? '' : estimation.years + 'Y '}
        {estimation.months === 0 ? '' : estimation.months + 'M '}
        {estimation.weeks === 0 ? '' : estimation.weeks + 'W '}
        {estimation.days === 0 ? '' : estimation.days + 'd '}
        {estimation.hours === 0 ? '' : estimation.hours + 'h '}
        {estimation.minutes === 0 ? '' : estimation.minutes + 'min'}
    </span>;
};
