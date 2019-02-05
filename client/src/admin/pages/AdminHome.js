import React from 'react';
import { connect } from 'react-redux';

class AdminHome extends React.Component {
  render(){
    return (
      <div className="admin_container">
        Home
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
  }),
)(AdminHome);
