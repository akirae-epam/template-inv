import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from 'actions/authentication';

class SetUser extends React.Component{
  componentDidMount(){
    this.props.authActions.getCurrentUser();
  }
  render(){
    return null;
  }
}
export default connect(
  (state, ownProps) => ({
  }),
  dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)}),
)(SetUser);