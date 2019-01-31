import React from 'react';
import {connect} from 'react-redux';
import TwitterObject from 'components/twitter/TwitterObject';
import Scrollbar from 'smooth-scrollbar';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

let twitterName = '';
let json = require('config.json');
twitterName = json.twitterName;

class TwitterContainer extends React.Component{

  componentDidMount() {
    const scrollbar = Scrollbar.init(document.querySelector('#twitter__wrapper'), {
      alwaysShowTracks: true,
    });
    this.scrollbar = scrollbar;
  }

  render(){

    const {
      twitterValues,
      transitionStatus,
    } = this.props;

    const wrapperName= classNames(
      'twitter__wrapper',
      {
        'twitter__wrapper--hidden': transitionStatus === 'start' || transitionStatus === 'end',
      }
    );

    return(
      <div
        className={wrapperName}
        id="twitter__wrapper"
      >
        <div className="twitter_header">
          <a
            href={'https://twitter.com/'+twitterName}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesome name="twitter" className="twitter_icon"/>
          &nbsp;@{twitterName}
          </a>
        </div>
        <div className="twitter__container">
          {twitterValues.length >= 4 ? twitterValues.map((value, index)=>(
            <div key={index} onLoad={()=>this.scrollbar.update()}>
              <TwitterObject
                timestamp = {value.created_at}
                text={value.full_text}
                extendedEntities = {value.extended_entities}
                twitterId = {value.id_str}
              />
            </div>
          )):null}
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    transitionStatus: state.transition.transitionStatus,
    twitterValues: state.twitter.twitterValues,
  }),
  dispatch => ({
  }),
)(TwitterContainer);