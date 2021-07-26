import { IconLiveStreaming } from '../../../base/icons';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

// To be changed

export default class AbstractPollButton<P: Props> extends AbstractButton<P, *> {

  // To be changed
  accessibilityLabel = 'dialog.accessibilityLabel.liveStreaming';
  icon = IconLiveStreaming;

    // label = 'dialog.startLiveStreaming';
    // toggledLabel = 'dialog.stopLiveStreaming';
}
