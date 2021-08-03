import _ from 'lodash';

import { ReducerRegistry } from '../base/redux';

import {
    POLLS_PANE_CLOSE,
    POLLS_PANE_OPEN,
    NEW_POLL,
    NEW_POLL_RESPONSE,
    OPEN_POLL_CREATION_PAGE,
    OPEN_POLL_DETAIL_PAGE,
    OPEN_POLLSLIST_PAGE
} from './actionTypes';
import { REDUCER_KEY } from './constants';

const DEFAULT_STATE = {
    isOpen: false,
    polls: {},
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
            const oldResponse = _.get(state.pollResponses, action.response.pollId);

            console.log(oldResponse);
            const pollResponses = { ...state.pollResponses,
                [action.response.pollId]: { ...oldResponse,
                    [action.response.participantId]: action.response } };
            const options = {};

            Object.keys(state.polls[action.response.pollId].options).forEach(option => {
                options[option] = 0;

                return;
            });


            Object.values(pollResponses[action.response.pollId]).forEach(pollResponse => {
                const vote = pollResponse.answer[0];

                options[vote] += 1;

                return;
            });
            console.log(options);

            return { ...state,
                pollResponses,
                polls: { ...state.polls,
                    [action.response.pollId]: { ...state.polls[action.response.pollId],
                        options } },
                pollSelected: { ...state.pollSelected,
                    options }
            };

        }

        case OPEN_POLL_CREATION_PAGE: {
            return { ...state,
                pollPaneMode: 'PollCreate' };
        }

        case OPEN_POLL_DETAIL_PAGE: { return { ...state,
            pollPaneMode: 'PollDetail',
            pollSelected: action.poll }; }

        case OPEN_POLLSLIST_PAGE: { return { ...state,
            pollPaneMode: 'PollsList',
            pollSelected: {} }; }

        default:
            return state;
        }
    }
);
