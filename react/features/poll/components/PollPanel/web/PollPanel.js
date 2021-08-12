// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { SYNC_POLL } from '../../../actionTypes';
import { close, setSyncToFalse } from '../../../actions';
import { classList, getPollsPaneOpen } from '../../../functions';
import theme from '../../../theme.json';
import { PollsList, PollCreation, PollDetail } from '../../PollsList/';
import {
    Close,
    Container,
    Footer,
    Header
} from '../styled';


const PollsPane = () => {
    const dispatch = useDispatch();
    const paneOpen = useSelector(getPollsPaneOpen);
    const { t } = useTranslation();

    const closePane = useCallback(() => dispatch(close(), [ dispatch ]));
    const turnSyncOff = useCallback(() => dispatch(setSyncToFalse(), [ dispatch ]));
    const pollPaneMode = useSelector(state => state['features/poll'].pollPaneMode);

    const closePaneKeyPress = useCallback(e => {
        if (closePane && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            closePane();
        }
    }, [ closePane ]);

    const sendSyncMsg = useSelector(state => state['features/poll'].sendSyncMsg);
    const conference = useSelector(state => state['features/base/conference'].conference);


    const sendSyncMessage = useCallback((polls, pollResponses, optionsList) => {

        const msg = { polls,
            pollResponses,
            optionsList,
            type: SYNC_POLL };

        if (conference) {
            conference.sendMessage(msg);
        }

    });

    const { polls, pollResponses, optionsList } = useSelector(state => state['features/poll']);

    if (sendSyncMsg) {
        sendSyncMessage(polls, pollResponses, optionsList);
        turnSyncOff();
    }

    const renderContent = () => {
        switch (pollPaneMode) {
        case 'PollDetail': return <PollDetail />;
        case 'PollCreate': return <PollCreation />;
        default: return <PollsList />;
        }
    };

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
                            aria-label = { t('participants_pane.close', 'Close') }
                            onClick = { closePane }
                            onKeyPress = { closePaneKeyPress }
                            role = 'button'
                            tabIndex = { 0 } />
                    </Header>
                    <Container>
                        {renderContent()}
                    </Container>
                    <Footer />
                </div >
            </div >
        </ThemeProvider >

    );
};

export default PollsPane;
