import React from 'react';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as twitterActions from 'actions/twitter';
import FontAwesome from 'react-fontawesome';

class TwitterImage extends React.Component{

  closeImage = () => {
    this.props.twitterActions.selectTwitterImage('');
  }

  render(){
    const {
      twitterImage,
      twitterImageExists = twitterImage.length > 3,
    } = this.props;

    const wrapperName= classNames(
      'twitter_lightbox__wrapper',
      {
        'twitter_lightbox__wrapper--display': twitterImageExists,
      }
    );

    return(
      <div className={wrapperName} onClick={()=>this.closeImage()}>
        <img src={twitterImage} alt="twitter full" className="twitter_lightbox__image"/>
        <FontAwesome name="times" className="twitter_lightbox__close"/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    twitterImage: state.twitter.twitterImage,
  }),
  dispatch => ({
    twitterActions: bindActionCreators(twitterActions, dispatch),
  }),
)(TwitterImage);