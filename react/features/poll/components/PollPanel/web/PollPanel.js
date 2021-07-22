// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { classList, getPollsPaneOpen } from '../../../functions';
import theme from '../../../theme.json';
import {
  AntiCollapse,
  Close,
  Container,
  Footer,
  FooterButton,
  Header
} from '../styled';
import { close } from '../../../actions';
import { NEW_POLL, NEW_POLL_RESPONSE } from '../../../actionTypes'
import { new_poll } from '../../../mock_data/mock_poll'
import { new_response } from '../../../mock_data/mock_pollResponse'

const PollsPane = () => {
  const dispatch = useDispatch();
  const paneOpen = useSelector(getPollsPaneOpen);
  const { t } = useTranslation();

  const closePane = useCallback(() => dispatch(close(), [dispatch]));

  const closePaneKeyPress = useCallback(e => {
    if (closePane && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      closePane();
    }
  }, [closePane]);

  const conference = useSelector(state => state['features/base/conference'].conference);

  const participant = useSelector(state => {
    return state['features/base/participants'].local
  });

  const sendPollMessage = useCallback(() => {
    conference.sendMessage({
      type: NEW_POLL,
      poll: { ...new_poll, creatorParticipantId: participant.id }
    })
  });

  const sendPollResponseMessage = useCallback(() => {
    const msg = {
      type: NEW_POLL_RESPONSE,
      response: new_response
    }
    console.log(msg)
    conference.sendMessage(msg)

  });


  return (
    <ThemeProvider theme={theme}>

      <div
        className={classList(
          'participants_pane',
          !paneOpen && 'participants_pane--closed'
        )}>

        <div className='participants_pane-content'>
          <Header>
            <Close
              aria-label={t('participants_pane.close', 'Close')}
              onClick={closePane}
              onKeyPress={closePaneKeyPress}
              role='button'
              tabIndex={0} />
          </Header>
          <Container>
            <button onClick={sendPollMessage}>New Poll</button>
            <button onClick={sendPollResponseMessage}>New Poll Response</button>
          </Container>

          <Footer>

          </Footer>
        </div>
      </div>
    </ThemeProvider >

  );
};

export default PollsPane
