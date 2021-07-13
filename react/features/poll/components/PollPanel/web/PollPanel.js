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
  console.log(paneOpen)
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
            <h1>Poll</h1>
          </Container>

          <Footer>

          </Footer>
        </div>
      </div>
    </ThemeProvider >

  );
};

export default PollsPane
