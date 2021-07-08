// import type { Dispatch } from 'redux';
import { translate } from '../../../../base/i18n';
import { connect } from '../../../../base/redux';
import { AbstractButton } from '../../../../base/toolbox/components';
import { IconSecurityOff, IconSecurityOn } from '../../../../base/icons';
import React, { Component } from 'react'


class PollButton extends AbstractButton {

  accessibilityLabel = 'toolbar.accessibilityLabel.security';
  icon = IconSecurityOff;
  label = 'toolbar.security';


  // render = () => {
  //   return (
  //     <h1>Test</h1>
  //   )
  // }
}

function _mapStateToProps(state: Object, ownProps: Props): Object {
  return {};
}


export default translate(connect(_mapStateToProps)(PollButton));;
