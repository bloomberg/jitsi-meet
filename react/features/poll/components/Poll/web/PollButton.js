import { Dispatch } from 'redux';
import { translate } from '../../../../base/i18n';
import { connect } from '../../../../base/redux';
import { AbstractButton } from '../../../../base/toolbox/components';
import { PollIcon } from '../../../../base/icons';
import {
  close as closePollsPane,
  open as openPollsPane
} from '../../../actions';

type Props = AbstractButtonProps & {
  /**
   * The redux {@code dispatch} function.
   */
  dispatch: Dispatch<any>
};


class PollButton extends AbstractButton<Props, *> {
  icon = PollIcon;
  label = 'Polls';

  _handleClick() {
    let paneOpen = this.props.isOpen
    if (paneOpen) {
      this.props.dispatch(closePollsPane())
    }
    else {
      this.props.dispatch(openPollsPane())
    }
  }

}

function _mapStateToProps(state: Object, ownProps: Props): Object {
  const { isOpen } = state['features/poll']
  return {
    isOpen
  }
}


export default translate(connect(_mapStateToProps)(PollButton));;
