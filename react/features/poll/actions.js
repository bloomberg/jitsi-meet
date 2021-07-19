import { POLLS_PANE_CLOSE, POLLS_PANE_OPEN, CREATE_NEW_POLL, CREATE_NEW_POLLRESPONSE } from './actionTypes'
import { PollResponse, Poll } from './models';

/**
 * Action to close the participants pane.
 *
 * @returns {Object}
 */
export const close = () => {
  return {
    type: POLLS_PANE_CLOSE
  };
};
/**
* Action to open the participants pane.
*
* @returns {Object}
*/
export const open = () => {
  return {
    type: POLLS_PANE_OPEN
  };
};

export const receive_new_poll = (poll) => {
  return {
    type: CREATE_NEW_POLL,
    poll
  };
};

export const receive_new_pollResponse = (response) => {
  return {
    type: RECEIVE_NEW_POLLRESPONSE,
    response
  };
};
