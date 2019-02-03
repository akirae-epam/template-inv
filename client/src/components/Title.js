import React from 'react';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';

let title = '';
let json = require('config.json');
title = json.title;

class Title extends React.Component{

  toggleSmile = (bool) => {
    this.props.lionActions.setSmile(bool);
  }

  render(){
    return(
      <div className="title">
        <div
          className="title_title"
          onMouseEnter={()=>this.toggleSmile(true)}
          onMouseLeave={()=>this.toggleSmile(false)}
        >
          <Link to={siteRoutes.twitchScreen}>
            {title}
          </Link>
        </div>

        <div className="title_body">
          Effervescent [ef-er-ves-uh nt]:
          <br/><br/>
          (of a liquid) giving off bubbles; fizzy.
          <br/>
          synonyms: fizzy, sparkling, carbonated, aerated, gassy, bubbly, bubbling, fizzing
          <br/><br/>
          vivacious and enthusiastic.
          <br/>
          "effervescent young people together in a blanket fort"
          <br/>
          synonyms: vivacious, lively, animated, full of life, spirited, high-spirited, bubbling, bubbly, ebullient, buoyant, sparkling, scintillating, lighthearted, carefree, happy-go-lucky, jaunty, merry, happy, jolly, joyful, full of fun, full of the joys of spring, cheery, cheerful, perky, sunny, airy, breezy, bright, enthusiastic, irrepressible, vibrant, vivid, vital, zestful, energetic, dynamic, vigorous, full of vim and vigor, lusty.
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(Title);

