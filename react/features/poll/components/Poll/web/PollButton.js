// @flow
import type { Dispatch } from 'redux';

import { translate } from '../../../../base/i18n';
import { PollIcon } from '../../../../base/icons';
import { connect } from '../../../../base/redux';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../../base/toolbox/components';
import {
    close as closePollsPane,
    open as openPollsPane
} from '../../../actions';


type Props = AbstractButtonProps & {

  /**
   * The redux {@code dispatch} function.
   */
  dispatch: Dispatch<any>,

  isOpen: Boolean
};

/**
 * PollButton component.
 *
 * @returns {any} Arg.
 */
class PollButton extends AbstractButton<Props, *> {
  icon = PollIcon;
  label = 'Polls';

  /**
 * _handleClick.
 *
 * @returns {void} .
 */
  _handleClick() {
      const paneOpen = this.props.isOpen;

      if (paneOpen) {
          this.props.dispatch(closePollsPane());
      } else {
          this.props.dispatch(openPollsPane());
      }
  }

}

/**
 *_MapStateToProps.
 *
 * @param {Object} state - State.
 * @param {Object} ownProps - Props.
 * @returns {Object} State.
 */
function _mapStateToProps(state: Object): Object {
    const { isOpen } = state['features/poll'];

    return {
        isOpen
    };
}


export default translate(connect(_mapStateToProps)(PollButton));
