// @flow
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { openPollCreationPage } from '../../../actions';
import {
    PollCreateButton
} from '../../PollPanel/styled';

/**
 * CreatePollButton component.
 *
 * @returns {any} Arg.
 */
export function CreatePollButton() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const createPoll = useCallback(() => {
        dispatch(openPollCreationPage(), [ dispatch ]);
    });

    return (<PollCreateButton onClick = { createPoll }>
        Create New Poll
    </PollCreateButton>);
}

