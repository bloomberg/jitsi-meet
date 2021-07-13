import { POLLS_PANE_CLOSE, POLLS_PANE_OPEN } from './actionTypes'

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
