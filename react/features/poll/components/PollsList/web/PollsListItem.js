// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { openPollDetailPage } from '../../../actions';
import {
    ParticipantContainer,
    ParticipantContent,
    ParticipantName,
    ParticipantNameContainer
} from '../../PollPanel/styled';
type Props = {

    /**
     * Poll reference
     */
    poll: Object
};


export const PollsListItem = ({ poll: p }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleDetailView = p => {
        dispatch(openPollDetailPage(p), [ dispatch ]);
    };

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

