import { ReducerRegistry } from '../base/redux';
import { newPollResponse } from './actions';

import {
  POLLS_PANE_CLOSE,
  POLLS_PANE_OPEN,
  NEW_POLL,
  NEW_POLL_RESPONSE
} from './actionTypes';

import { REDUCER_KEY } from './constants';

const DEFAULT_STATE = {
  isOpen: false,
  polls: {},
  pollResponses: {}
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

      case NEW_POLL:
        pollId = action.poll.pollId;
        let newState = { ...state };
        state['polls'][pollId] = action.poll;
        return newState;

      case NEW_POLL_RESPONSE:
        pollId = action.response.pollId;
        const participantId = action.response.participantId;
        let newPollResponse = { ...action.response };
        if (pollId in state.pollResponses) {
          newPollResponse.pollId[participantId] = action.response;
        }
        else {
          newPollResponse[pollId] = {};
          newPollResponse[pollId][participantId] = action.response;
        }
        return {
          ...state,
          pollResponses: newPollResponse
        };

      default:
        return state;
    }
  },
);
