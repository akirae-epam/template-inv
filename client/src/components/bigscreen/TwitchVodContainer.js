import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import * as streamActions from 'actions/stream';
import FontAwesome from 'react-fontawesome';

let json = require('config.json');
const twitchName = json.twitchName;

class BigScreenContainer extends React.Component{
  chatReorder = (chatPosition) => {
    this.props.streamActions.chatReorder(!chatPosition);
  }
  chatResize = (chatSize) => {
    this.props.streamActions.chatResize(!chatSize);
  }

  render(){
    const {
      transitionStatus,
      chatPosition,
      chatSize,
      currentVod,
    } = this.props;

    const wrapperName= classNames(
      'stream_wrapper',
      {
        'stream_wrapper--hidden': transitionStatus === 'start' || transitionStatus === 'end',
        'stream_wrapper--reverse': chatPosition === false,
        'stream_wrapper--resize': chatSize === false,
      }
    );

    return(
      <div className={wrapperName}>
        <div className="stream_bigscreen">
          <iframe
            src={'https://player.twitch.tv/?video='+currentVod}
            height="100%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            allowFullScreen={true}
            title="stream"
          >
          </iframe>
        </div>
        <div className="stream_chat">
          <div
            className="stream_chat__top"
          >
            <div
              className="stream_chat__icon"
              onClick={()=>this.chatReorder(chatPosition)}
            >
              {chatPosition ?
                <FontAwesome name="arrow-left"/>
                :
                <FontAwesome name="arrow-right"/>
              }
            </div>

            <div
              className="stream_chat__icon"
              onClick={()=>this.chatResize(chatSize)}
            >
              <FontAwesome name="arrows"/>
            </div>

          </div>
          <div className="stream_chat__bottom">
            <iframe frameBorder="0"
              scrolling="no"
              id="chat_embed"
              src={'https://www.twitch.tv/embed/'+twitchName+'/chat'}
              height="100%"
              width="100%"
              title="chat"
            >
            </iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    transitionStatus: state.transition.transitionStatus,
    chatPosition: state.stream.chatPosition,
    chatSize: state.stream.chatSize,
    currentVod: state.twitch.currentVod,
  }),
  dispatch => ({
    streamActions: bindActionCreators(streamActions, dispatch),
  }),
)(BigScreenContainer);

