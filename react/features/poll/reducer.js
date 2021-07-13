import { ReducerRegistry } from '../base/redux';

import {
  POLLS_PANE_CLOSE,
  POLLS_PANE_OPEN
} from './actionTypes';

import { REDUCER_KEY } from './constants';

const DEFAULT_STATE = {
  isOpen: false
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

      default:
        return state;
    }
  },
);
