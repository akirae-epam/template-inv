import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import PublicRoutesWrapper from 'routes/PublicRoutesWrapper';
import SocketFetch from 'components/services/SocketFetch';

import 'styles/canvas.css';
import 'styles/twitter.css';
import 'styles/navbar.css';
import 'styles/links.css';
import 'styles/twitchVods.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SocketFetch/>
        <Switch>
          <Route path="/" component={PublicRoutesWrapper}/>
        </Switch>
      </div>
    );
  }
}

export default App;
