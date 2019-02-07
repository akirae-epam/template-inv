import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import * as transitionActions from 'actions/transition';
import FontAwesome from 'react-fontawesome';

import {
  selectPanelSide,
} from 'reducers';

class BigScreenContainer extends React.Component{
  togglePanelSide = (panelSide) => {
    this.props.transitionActions.togglePanelSide(!panelSide);
  }

  render(){
    const {
      panelSide,
    } = this.props;

    const buttonName= classNames(
      'panel_toggle',
      {
        'panel_toggle--left': panelSide === false,
      }
    );

    return(
      <div
        className={buttonName}
        onClick={()=>this.togglePanelSide(panelSide)}
      >
        {panelSide ?
          <FontAwesome name="arrow-left"/>
          :
          <FontAwesome name="arrow-right"/>
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    panelSide: selectPanelSide(state),
  }),
  dispatch => ({
    transitionActions: bindActionCreators(transitionActions, dispatch),
  }),
)(BigScreenContainer);

