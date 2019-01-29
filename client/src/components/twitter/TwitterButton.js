import React from 'react';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as twitterActions from 'actions/twitter';
import * as lionActions from 'actions/lion';

class MenuButton extends React.Component{
  toggleTwitter = () => {
    this.props.twitterActions.toggleTwitter(!this.props.twitterDisplay);
  }
  setSmiling = () => {
    this.props.lionActions.setSmile(true);
  }
  stopSmiling = () => {
    this.props.lionActions.setSmile(false);
  }
  render(){
    const {
      twitterDisplay,
    } = this.props;

    const menuLine1Names= classNames(
      'twitter_line1',
      {
        'twitter_line1--display':twitterDisplay,
      }
    );
    const menuLine2Names= classNames(
      'twitter_line2',
      {
        'twitter_line2--display':twitterDisplay,
      }
    );
    const wrapperName= classNames(
      'twitter_btn__wrapper',
      {
        'twitter_btn__wrapper--display': twitterDisplay,
      }
    );

    return(
      <div className={wrapperName}>
        <div className="twitter_btn__container">
          <div
            onClick = {()=>this.toggleTwitter()}
            className = "twitter_btn"
            onMouseEnter={()=>this.setSmiling()}
            onMouseLeave={()=>this.stopSmiling()}
          >
            <div
              className = "twitter_btn__container"
            >
              <div className="twitter_btn__lines">
                <span
                  className = {menuLine1Names}
                >
                </span>
                <span
                  className = {menuLine2Names}
                >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    twitterDisplay:state.twitter.twitterDisplay,
  }),
  dispatch => ({
    twitterActions: bindActionCreators(twitterActions, dispatch),
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(MenuButton);