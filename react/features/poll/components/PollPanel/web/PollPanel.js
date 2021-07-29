// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { NEW_POLL, NEW_POLL_RESPONSE } from '../../../actionTypes';
import { close } from '../../../actions';
import { classList, getPollsPaneOpen } from '../../../functions';
import { new_poll } from '../../../mock_data/mock_poll';
import { new_response } from '../../../mock_data/mock_pollResponse';
import theme from '../../../theme.json';

// import { CreatePollButton, PollsList } from '../../PollsList';
import { PollsList, CreatePollButton, PollCreation, PollDetail } from '../../PollsList/';

// TO BE FIXED
// import { CreatePollButton } from '../../PollsList/web/CreatePollButton';
import {
    AntiCollapse,
    Close,
    Container,
    Footer,
    FooterButton,
    Header
} from '../styled';

const PollsPane = () => {
    const dispatch = useDispatch();
    const paneOpen = useSelector(getPollsPaneOpen);
    const { t } = useTranslation();

    const closePane = useCallback(() => dispatch(close(), [ dispatch ]));

    const closePaneKeyPress = useCallback(e => {
        if (closePane && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            closePane();
        }
    }, [ closePane ]);

    const conference = useSelector(state => state['features/base/conference'].conference);

    const participant = useSelector(state => state['features/base/participants'].local);
    const sendPollMessage = useCallback(() => {
        conference.sendMessage({
            type: NEW_POLL,
            poll: {
                ...new_poll,
                creatorParticipantId: participant.id
            }
        });
    });

    const sendPollResponseMessage = useCallback(() => {
        const msg = {
            type: NEW_POLL_RESPONSE,
            response: {
                ...new_response,
                participantId: participant.id
            }
        };

        conference.sendMessage(msg);

    });


    return (
        <ThemeProvider theme = { theme }>

            <div
                className = { classList(
                    'participants_pane',
                    !paneOpen && 'participants_pane--closed'
                ) }>

                <div className = 'participants_pane-content'>
                    <Header>
                        <Close
                            aria-label = { t('participants_pane.close', 'Clos e') }
                            onClick = { closePane }
                            onKeyPress = { closePaneKeyPress }
                            role = 'button'
                            tabIndex = { 0 } />
                    </Header>
                    <Container>
                        <PollsList />
                        <PollDetail />
                        <PollCreation />
                        {/* <button onClick = { sendPollMessage }>New Poll</button>
                        <button onClick = { sendPollResponseMessage }>New Poll Response</button> */}
                    </Container>
                    <Footer>
                        <CreatePollButton />
                    </Footer>
                </div >
            </div >
        </ThemeProvider >

    );
};

export default PollsPane;
