import { ReducerRegistry } from '../base/redux';

import {
  POLLS_PANE_CLOSE,
  POLLS_PANE_OPEN,
  CREATE_NEW_POLL,
  CREATE_NEW_POLLRESPONSE
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
        console.log(POLLS_PANE_CLOSE)
        return {
          ...state,
          isOpen: false
        };

      case POLLS_PANE_OPEN:
        console.log(POLLS_PANE_OPEN)
        return {
          ...state,
          isOpen: true
        };

      case CREATE_NEW_POLL:
        console.log(CREATE_NEW_POLL)
        return {
          ...state,
          polls: [...polls, action.poll]
        };

      case CREATE_NEW_POLLRESPONSE:
        console.log(CREATE_NEW_POLLRESPONSE)
        return {
          ...state,
          pollResponses: [...pollResponses, action.response]
        };

      default:
        return state;
    }
  },
);
