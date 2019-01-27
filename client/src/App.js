import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';

import SocketFetch from 'components/services/SocketFetch';
import Home from 'pages/Home';

import 'styles/canvas.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SocketFetch/>
        <Switch>
          <Route exact path="/"
            render={(props)=>
              <Home {...props} />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
