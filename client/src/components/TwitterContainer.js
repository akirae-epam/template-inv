import React from 'react';
import {connect} from 'react-redux';
import TwitterObject from 'components/TwitterObject';
import Scrollbar from 'smooth-scrollbar';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';
import SocialLogo from 'social-logos';

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
  setSmiling = () => {
    this.props.lionActions.setSmile(true);
  }
  stopSmiling = () => {
    this.props.lionActions.setSmile(false);
  }

  render(){

    const {
      isVisible,
    } = this.props;

    const { twitterValues } = this.props;

    return(
      <div
        className="twitter__wrapper"
        id="twitter__wrapper"
        onMouseEnter={()=>this.setSmiling()}
        onMouseLeave={()=>this.stopSmiling()}
      >
        <div className="twitter_header">
          <a
            href={'https://twitter.com/'+twitterName}
            target='_blank'
            rel='noopener noreferrer'
          >
          <SocialLogo className="twitter_header__icon" icon="twitter" size={48}/>
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
    )
  }
}

export default connect(
  (state, ownProps) => ({
    twitterValues: state.twitter.twitterValues,
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(TwitterContainer);