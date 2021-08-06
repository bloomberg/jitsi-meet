// @flow
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { withPixelLineHeight } from '../../../../base/styles/functions.web';
import { getPolls } from '../../../functions';
import { Heading, PollCreateButton } from '../../PollPanel/styled';

import { CreatePollButton } from './CreatePollButton';
import { PollsListItem } from './PollsListItem';


const useStyles = makeStyles(theme => {
    return {
        headingContainer: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
        },
        heading: {
            ...withPixelLineHeight(theme.typography.heading7),
            color: theme.palette.text02
        },
        link: {
            ...withPixelLineHeight(theme.typography.labelBold),
            color: theme.palette.link01,
            cursor: 'pointer'
        }
    };
});


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

    console.log(sorted);
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
