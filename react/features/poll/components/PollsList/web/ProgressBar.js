import React from 'react';

import {
    ProgressBarLiquid,
    Progress,
    ProgressBarComplete,
    ProgressBarConatainer,
    ProgressCount,
    ProgressText
} from '../../PollPanel/styled';


export const ProgressBar = props => {
    const { text, percentage, count } = props;

    return (
        <ProgressBarConatainer>
            <Progress>
                <ProgressText>{text}</ProgressText>
                <ProgressCount>{count}</ProgressCount>
            </Progress>
            <ProgressBarComplete
                style = {{ width: `${percentage}%` }}>
                <ProgressBarLiquid />
            </ProgressBarComplete>

        </ProgressBarConatainer>);
};
