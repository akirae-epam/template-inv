import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import TogglePanelSideButton from 'components/TogglePanelSideButton';

import {
  selectTransitionStatus,
  selectTwitterValues,
  selectPanelSide,
} from 'reducers';

class PanelWrapper extends React.Component{
  render(){

    const {
      children,
      transitionStatus,
      panelSide,
    } = this.props;

    const wrapperName= classNames(
      'twitter__wrapper',
      {
        'twitter__wrapper--hidden': transitionStatus === 'start' || transitionStatus === 'end',
        'twitter__wrapper--right': panelSide,
        'twitter__wrapper--left': panelSide === false,
      }
    );

    return(
      <div className={wrapperName}>
        <TogglePanelSideButton/>
        {children}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    twitterValues: selectTwitterValues(state),
    transitionStatus: selectTransitionStatus(state),
    panelSide: selectPanelSide(state),
  }),
  dispatch => ({
  }),
)(PanelWrapper);