import {
    DISABLE_CUSTOMIZED_ANSWER,
    NEW_POLL,
    NEW_POLL_RESPONSE,
    OPEN_POLL_CREATION_PAGE,
    OPEN_POLL_DETAIL_PAGE,
    OPEN_POLLSLIST_PAGE,
    POLLS_PANE_CLOSE,
    POLLS_PANE_OPEN,
    SYNC_POLL
} from './actionTypes';

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

/**
 * Action to add a new poll.
 *
 * @param {Object} poll - The new poll.
 * @returns {Object}
 */
export const newPoll = poll => {
    return {
        type: NEW_POLL,
        poll
    };
};

/**
 * Action to add a new poll response.
 *
 * @param {Object} response - The new poll response.
 * @returns {Object}
 */
export const newPollResponse = response => {
    return {
        type: NEW_POLL_RESPONSE,
        response
    };
};

/**
 * Action to switch to poll creation mode/page.
 *
 * @returns {Object}
 */
export const openPollCreationPage = () => {
    return {
        type: OPEN_POLL_CREATION_PAGE
    };
};

/**
 * Action to switch to poll detail mode/page.
 *
 * @param {Object} poll - The poll to be displayed on the detail page.
 * @returns {Object}
 */
export const openPollDetailPage = poll => {
    return {
        type: OPEN_POLL_DETAIL_PAGE,
        poll
    };
};

/**
 * Action to switch to poll list mode/page.
 *
 * @returns {Object}
 */
export const openPollsListPage = () => {
    return {
        type: OPEN_POLLSLIST_PAGE
    };
};

/**
 * Action to disable customized answer input.
 *
 * @param {Object} pollId - The poll id which customized answers will be disabled.
 * @returns {Object}
 */
export const disableCustomizedAnswer = pollId => {
    return {
        type: DISABLE_CUSTOMIZED_ANSWER,
        pollId
    };
};

/**
 * Action to sync poll data with newly joined participants.
 *
 * @param {Object} polls - Polls data.
 * @param {Object} pollResponses - Poll response data.
 * @param {Object} optionsList - Keep track of options of polls for sorting.
 *
 * @returns {Object}
 */
export const syncPoll = (polls, pollResponses, optionsList) => {
    return {
        type: SYNC_POLL,
        polls,
        pollResponses,
        optionsList
    };
};

