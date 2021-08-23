// @flow
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { openPollCreationPage } from '../../../actions';
import {
    PollCreateButton
} from '../../../styled';

/**
 * CreatePollButton component.
 *
 * @returns {any} Arg.
 */
export function CreatePollButton() {
    const dispatch = useDispatch();
    const createPoll = useCallback(() => {
        dispatch(openPollCreationPage(), [ dispatch ]);
    });

    return (<PollCreateButton onClick = { createPoll }>
        Create New Poll
    </PollCreateButton>);
}

