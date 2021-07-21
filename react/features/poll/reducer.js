import { ReducerRegistry } from '../base/redux';

import {
  POLLS_PANE_CLOSE,
  POLLS_PANE_OPEN,
  NEW_POLL,
  NEW_POLL_RESPONSE
} from './actionTypes';

import { REDUCER_KEY } from './constants';

const DEFAULT_STATE = {
  isOpen: false,
  polls: [],
  pollResponses: []
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

      case NEW_POLL:
        return {
          ...state,
          polls: [...state.polls, action.poll]
        };

      case NEW_POLL_RESPONSE:
        return {
          ...state,
          pollResponses: [...state.pollResponses, action.response]
        };

      default:
        return state;
    }
  },
);
