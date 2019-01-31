import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import * as lionActions from 'actions/lion';
import * as twitterActions from 'actions/twitter';
import {bindActionCreators} from 'redux';

let twitterName = '';
let json = require('config.json');
twitterName = json.twitterName;

const ImageDisplay = ({extendedEntities,toggleSmile, openImage}) => {
  if (extendedEntities){
    if (extendedEntities.media[0]){
      return (
        <div className="twitter_object__image_container">
          <img
            src={extendedEntities.media[0].media_url}
            alt="twitter extended media"
            className="twitter_object__image"
            onMouseEnter={()=>toggleSmile(true)}
            onMouseLeave={()=>toggleSmile(false)}
            onClick={()=>openImage(extendedEntities.media[0].media_url)}
          />
        </div>
      );
    }
    else {
      return null;
    }
  }
  else {
    return null;
  }
};

class TwitterObject extends React.Component{

  createMarkup = (textValue) => { return {__html: textValue}; };

  replaceMentionWithLink = (text) => {
    return text.replace( // replace
      /[@#]\w+/g,     // any mention/hashtag
      function(
        b, // the matched mention/hashtag
        c  // placeholder
      ){
        let a = 'search';       // reuse for 'search'
        c = 'twitter.com/'; // the core twitter url
        return b.link(      // put the match in a link to
          '//' + (          // the '//' protocol, +
            b[a]('#')       // if the match starts with '#'
              ? c             // twitter.com/, or otherwise
              : a + '.' + c + // search.twitter.com/ +
                a + '?q='     // search?q=
          ) +               // and then finally, +
          b                 // the mention/hashtag.
        );
      }
    );
  }

  replaceURLWithHTMLLinks = (text) => {
    var re = /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@/#%?=~_()|!:,.;]*[-a-z0-9+&@#%=~_()|])/ig;
    return text.replace(re, function(match, lParens, url) {
      var rParens = '';
      lParens = lParens || '';

      // Try to strip the same number of right parens from url
      // as there are left parens.  Here, lParenCounter must be
      // a RegExp object.  You cannot use a literal
      //     while (/\(/g.exec(lParens)) { ... }
      // because an object is needed to store the lastIndex state.
      var lParenCounter = /\(/g;
      while (lParenCounter.exec(lParens)) {
        var m;
        // We want m[1] to be greedy, unless a period precedes the
        // right parenthesis.  These tests cannot be simplified as
        //     /(.*)(\.?\).*)/.exec(url)
        // because if (.*) is greedy then \.? never gets a chance.
        if (m === /(.*)(\.\).*)/.exec(url) ||
                /(.*)(\).*)/.exec(url)) {
          url = m[1];
          rParens = m[2] + rParens;
        }
      }
      return lParens + '<a href=' + url + '>' + url + '</a>' + rParens;
    });
  };

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  openImage = (url) => {
    this.props.twitterActions.selectTwitterImage(url);
  }

  render(){
    const {
      timestamp,
      extendedEntities,
      text,
      twitterId,
    } = this.props;

    //let twitterUrl = text.split(" ").splice(-1);

    //var lastIndex = text.lastIndexOf(" ");
    //let fullText = text.substring(0, lastIndex)
    const TWITTER_BASE = 'https://twitter.com/'+twitterName+'/status/';
    let twitterText = this.replaceMentionWithLink(this.replaceURLWithHTMLLinks(text));
    let timeText = moment(timestamp, 'ddd MMM DD HH:mm:ss ZZ YYYY').fromNow();


    return(
      <div className="twitter_object">
        <div className="twitter_text">
          <a
            href={TWITTER_BASE+twitterId}
            target='_blank'
            rel='noopener noreferrer'
            onMouseEnter={()=>this.toggleSmile(true)}
            onMouseLeave={()=>this.toggleSmile(false)}
          >
            <FontAwesome name="twitter" className="twitter_icon"/> &nbsp;
          </a>

          <span dangerouslySetInnerHTML={this.createMarkup(twitterText)}/>
        </div>

        <ImageDisplay
          extendedEntities = {extendedEntities}
          toggleSmile = {this.toggleSmile}
          openImage = {this.openImage}
        />

        <div className="twitter_time">
          {timeText}
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
    twitterActions: bindActionCreators(twitterActions, dispatch),
  }),
)(TwitterObject);

