// @flow
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { openPollCreationPage } from '../../../actions';
import {
    FooterButton
} from '../../PollPanel/styled';

/**
 * CreatePollButton component.
 *
 * @returns {any} Arg.
 */
export function CreatePollButton() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pollPaneMode = useSelector(state => state['features/poll'].pollPaneMode);
    const createPoll = useCallback(() => {
        console.log('CREATE NEW POLL');
        dispatch(openPollCreationPage(), [ dispatch ]);
    });

    if (pollPaneMode !== 'PollsList') {
        return <div />;
    }

    return (<FooterButton onClick = { createPoll }>
        {t('Create New Poll')}
    </FooterButton>);
}

