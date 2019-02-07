import React from 'react';
import {connect} from 'react-redux';
import TwitterObject from 'components/twitter/TwitterObject';
import Scrollbar from 'smooth-scrollbar';
import FontAwesome from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';
import PanelWrapper from 'components/PanelWrapper';

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

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){

    const {
      twitterValues,
    } = this.props;

    return(
      <PanelWrapper>
        <div id="twitter__wrapper">
          <div
            className="twitter_header"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
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
      </PanelWrapper>
    );
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