import _ from 'lodash';

import { ReducerRegistry } from '../base/redux';

import {
    POLLS_PANE_CLOSE,
    POLLS_PANE_OPEN,
    NEW_POLL,
    NEW_POLL_RESPONSE,
    OPEN_POLL_CREATION_PAGE,
    OPEN_POLL_DETAIL_PAGE,
    OPEN_POLLSLIST_PAGE,
    CREATED_CUSTOMIZED_ANSWER,
    SYNC_POLL
} from './actionTypes';
import { REDUCER_KEY } from './constants';

const DEFAULT_STATE = {
    isOpen: false,
    polls: {},
    pollResponses: {},
    pollPaneMode: 'PollsList',
    pollSelected: {},
    createdCustomizedAnswer: {},
    optionsList: {}
};


ReducerRegistry.register(
    REDUCER_KEY, (state = DEFAULT_STATE, action) => {

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
                    [action.poll.pollId]: action.poll
                },
                createdCustomizedAnswer: { ...state.createdCustomizedAnswer,
                    [action.poll.pollId]: true },
                optionsList: { ...state.optionsList,
                    [action.poll.pollId]: Object.keys(action.poll.options) }
            };
        }

        case NEW_POLL_RESPONSE: {
            const oldResponse = _.get(state.pollResponses, action.response.pollId);
            const pollResponses = { ...state.pollResponses,
                [action.response.pollId]: { ...oldResponse,
                    [action.response.participantId]: action.response } };
            const options = {};

            Object.keys(state.polls[action.response.pollId].options).forEach(option => {
                options[option] = 0;

                return;
            });
            const optionsList = { ...state.optionsList };

            if (!(action.response.answer[0] in state.polls[action.response.pollId].options)) {
                optionsList[action.response.pollId].push(action.response.answer[0]);

            }
            Object.values(pollResponses[action.response.pollId]).forEach(pollResponse => {
                const vote = pollResponse.answer[0];

                if (options[vote]) {
                    options[vote] += 1;
                } else {
                    options[vote] = 1;
                }


                return;
            });

            return { ...state,
                pollResponses,
                polls: { ...state.polls,
                    [action.response.pollId]: { ...state.polls[action.response.pollId],
                        options } },
                pollSelected: { ...state.pollSelected,
                    options },
                optionsList
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

        case CREATED_CUSTOMIZED_ANSWER: { return { ...state,
            createdCustomizedAnswer: { ...state.createdCustomizedAnswer,
                [action.pollId]: false } }; }

        case SYNC_POLL: {
            return { ...state,
                polls: action.polls,
                pollResponses: action.pollResponses,
                optionsList: action.optionsList };
        }


        default:
            return state;
        }
    }
);
