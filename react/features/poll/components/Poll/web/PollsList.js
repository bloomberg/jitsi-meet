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
    const { t } = useTranslation();
    const polls = useSelector(getPolls);
    const sorted: Array<Object> = Object.values(polls).sort();

    return (
        <>
            <Heading>
                {t('Polls')}
            </Heading>
            <CreatePollButton />
            <div>
                {sorted.map(p => (<PollsListItem
                    key = { p.pollId }
                    poll = { p } />))}
            </div>
        </>
    );
}
