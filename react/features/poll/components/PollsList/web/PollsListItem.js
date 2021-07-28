// @flow
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

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
        dispatch(openPollDetailPage(), [ dispatch ]);
    };

    return (<ParticipantContainer>
        <ParticipantContent onClick = { () => toggleDetailView(p) }>
            <ParticipantNameContainer>
                <ParticipantName>
                    { t(p.title) }
                </ParticipantName>
            </ParticipantNameContainer>
            {/* <ParticipantStates>
                { raisedHand && <RaisedHandIndicator /> }
                { VideoStateIcons[videoMuteState] }
                { AudioStateIcons[audioMediaState] }
            </ParticipantStates> */}
        </ParticipantContent>
    </ParticipantContainer>);
};

