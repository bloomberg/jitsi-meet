// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getPolls } from '../../../functions';
import { Heading } from '../../../styled';

import { CreatePollButton } from './CreatePollButton';
import { PollsListItem } from './PollsListItem';

/**
 * PollList component.
 *
 * @returns {any} Arg.
 */
export function PollsList() {
    const pollPaneMode = useSelector(state => state['features/poll'].pollPaneMode);
    const { t } = useTranslation();
    const polls = useSelector(getPolls);
    const sorted = Object.values(polls).sort();

    if (pollPaneMode !== 'PollsList') {
        return <div />;
    }

    return (
        <>
            <Heading>
                {t('Polls')}
            </Heading>
            <CreatePollButton />
            <div>
                {sorted.map(p => (<PollsListItem
                    key = { p.id }
                    poll = { p } />))}
            </div>
        </>
    );
}
