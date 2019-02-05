import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import PublicRoutesWrapper from 'routes/PublicRoutesWrapper';
import SocketFetch from 'components/services/SocketFetch';
import SiteIcon from 'components/services/SiteIcon';
import GetSchedule from 'components/services/GetSchedule';

import CheckLogin from 'routes/CheckLogin';

import 'styles/canvas.css';
import 'styles/twitter.css';
import 'styles/navbar.css';
import 'styles/links.css';
import 'styles/twitchVods.css';
import 'styles/bigscreen.css';

import 'styles/admin.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SiteIcon/>
        <GetSchedule/>
        <SocketFetch/>
        <Switch>
          <Route path="/shodyra/admin" render={(props) => <CheckLogin {...props}/>}/>
          <Route path="/" component={PublicRoutesWrapper}/>
        </Switch>
      </div>
    );
  }
}

export default App;
