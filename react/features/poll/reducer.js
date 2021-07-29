import { ReducerRegistry } from '../base/redux';

import {
    POLLS_PANE_CLOSE,
    POLLS_PANE_OPEN,
    NEW_POLL,
    NEW_POLL_RESPONSE,
    OPEN_POLL_CREATION_PAGE,
    OPEN_POLL_DETAIL_PAGE
} from './actionTypes';
import { REDUCER_KEY } from './constants';
import { poll_with_answers, new_poll2 } from './mock_data/mock_poll';

const DEFAULT_STATE = {
    isOpen: false,
    polls: { 123: poll_with_answers,
        2: new_poll2 },
    pollResponses: {},

    // PollsList, pollCreation, PollDetail
    pollPaneMode: 'PollsList',
    pollSelected: {}
};


ReducerRegistry.register(
    REDUCER_KEY, (state = DEFAULT_STATE, action) => {
        let pollId;

        switch (action.type) {
        case POLLS_PANE_CLOSE:
            return {
                ...state,
                isOpen: false
            };

        case POLLS_PANE_OPEN:
            return {
                ...state,
                isOpen: true
            };

        case NEW_POLL: {

            return { ...state,
                polls: { ...state.polls,
                    [action.poll.pollId]: action.poll }
            };
        }

        case NEW_POLL_RESPONSE: {
            pollId = action.response.pollId;
            const participantId = action.response.participantId;
            const newPollResponse = { ...action.response };

            if (pollId in state.pollResponses) {
                newPollResponse.pollId[participantId] = action.response;
            } else {
                newPollResponse[pollId] = {};
                newPollResponse[pollId][participantId] = action.response;
            }

            return {
                ...state,
                pollResponses: newPollResponse
            };
        }

        case OPEN_POLL_CREATION_PAGE: {
            return { ...state,
                pollPaneMode: 'PollCreate' };
        }

        case OPEN_POLL_DETAIL_PAGE: { return { ...state,
            pollPaneMode: 'PollDetail',
            pollSelected: action.poll }; }

        default:
            return state;
        }
    }
);
