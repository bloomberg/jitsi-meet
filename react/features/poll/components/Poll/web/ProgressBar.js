// @flow

import React from 'react';

import {
    ProgressBarLiquid,
    Progress,
    ProgressBarComplete,
    ProgressBarConatainer,
    ProgressCount,
    ProgressText
} from '../../../styled';

type Props = {

    /**
     * True if the button needs to be disabled.
     */
     text: String,

    /**
     * Whether video is currently muted or not.
     */
     percentage: String,

    /**
     * The redux {@code dispatch} function.
     */
     count: String
};

export const ProgressBar = (props: Props) => {
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
