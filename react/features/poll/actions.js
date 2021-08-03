import { POLLS_PANE_CLOSE, POLLS_PANE_OPEN, NEW_POLL, NEW_POLL_RESPONSE, OPEN_POLL_CREATION_PAGE, OPEN_POLL_DETAIL_PAGE, OPEN_POLLSLIST_PAGE } from './actionTypes';

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

export const newPoll = poll => {
    return {
        type: NEW_POLL,
        poll
    };
};

export const newPollResponse = response => {
    return {
        type: NEW_POLL_RESPONSE,
        response
    };
};

export const openPollCreationPage = () => {
    return {
        type: OPEN_POLL_CREATION_PAGE
    };
};
export const openPollDetailPage = poll => {
    return {
        type: OPEN_POLL_DETAIL_PAGE,
        poll
    };
};

export const openPollsListPage = poll => {
    return {
        type: OPEN_POLLSLIST_PAGE,
        poll
    };
};
