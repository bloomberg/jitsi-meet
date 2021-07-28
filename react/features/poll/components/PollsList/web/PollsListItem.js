// @flow
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { openPollDetailPage } from '../../../actions';
import {
    ParticipantContainer,
    ParticipantContent,
    ParticipantName,
    ParticipantNameContainer,
    ParticipantStates
} from '../../PollPanel/styled';
type Props = {

    /**
     * Participant reference
     */
    poll: Object
};


export const PollsListItem = ({ poll: p }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleDetailView = p => {
        dispatch(openPollDetailPage(p), [ dispatch ]);
    };
    const test = useSelector(state => console.log(state));

    return (<ParticipantContainer>
        <ParticipantContent onClick = { () => toggleDetailView(p) }>
            <ParticipantNameContainer>
                <ParticipantName>
                    { t(p.title) }
                </ParticipantName>
            </ParticipantNameContainer>
        </ParticipantContent>
    </ParticipantContainer>);
};

