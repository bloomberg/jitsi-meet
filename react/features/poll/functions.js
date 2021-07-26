import { REDUCER_KEY } from './constants';
const getState = state => state[REDUCER_KEY];


export const getPollsPaneOpen = state => Boolean(getState(state)?.isOpen);
export const classList = (...args) => args.filter(Boolean).join(' ');

