import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';

import {
  selectTwitchIsLive,
} from 'reducers';

class StreamOnline extends React.Component{

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){
    const {
      isLive,
    } = this.props;

    return(
      <Link to={siteRoutes.twitchScreen}>
        {isLive ?
          <div
            className="text_block"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
            Stream is online
          </div>
          :
          <div
            className="text_block"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
          Stream is offline
          </div>
        }
      </Link>
    );
  }
}

export default connect(
  (state) => ({
    isLive: selectTwitchIsLive(state),
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(StreamOnline);