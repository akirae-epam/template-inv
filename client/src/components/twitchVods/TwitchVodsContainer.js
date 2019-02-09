import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Scrollbar from 'smooth-scrollbar';
import TwitchVodsObject from 'components/twitchVods/TwitchVodsObject';
import FontAwesome from 'react-fontawesome';
import * as lionActions from 'actions/lion';
import PanelWrapper from 'components/PanelWrapper';

import {
  selectTwitchVodValues,
} from 'reducers';

let twitchName = '';
let json = require('config.json');
twitchName = json.twitchName;

class TwitchVodsContainer extends React.Component{

  componentDidMount() {
    const scrollbar = Scrollbar.init(document.querySelector('#twitch__wrapper'), {
      alwaysShowTracks: true,
    });
    this.scrollbar = scrollbar;
  }

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){

    const {
      twitchVodValues,
    } = this.props;

    return(
      <PanelWrapper>
        <div id="twitch__wrapper">
          <div
            className="twitch_header"
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
            <a
              href={'https://twitch.tv/'+twitchName}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FontAwesome name="twitch"/>
            &nbsp;{twitchName}
            </a>
          </div>
          <div className="twitter__container">
            {twitchVodValues.length >= 4 ? twitchVodValues.map((value, index)=>(
              <div key={index} onLoad={()=>this.scrollbar.update()}>
                <TwitchVodsObject
                  title = {value.title}
                  url = {value.url}
                  views = {value.views}
                  preview = {value.preview}
                  created_at = {value.created_at}
                  length = {value.length}
                  game = {value.game}
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
  (state) => ({
    twitchVodValues: selectTwitchVodValues(state),
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(TwitchVodsContainer);