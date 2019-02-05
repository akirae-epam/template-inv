import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Scrollbar from 'smooth-scrollbar';

import AdminMenu from 'admin/menu/AdminMenu';

import {siteRoutes} from 'data/siteRoutes';

import Admin from 'admin/pages/AdminHome';
import ScheduleAdd from 'admin/pages/ScheduleAdd';
import GetSchedule from 'components/services/GetSchedule';
import ScheduleEdit from 'admin/pages/ScheduleEdit';
import ScheduleView from 'admin/pages/ScheduleView';

class RoutesAdmin extends Component {

  componentDidMount() {
    Scrollbar.init(document.querySelector('#admin_panel'), {
      alwaysShowTracks: true,
      syncCallbacks: true,
    });
  }

  render() {
    return (
      <div className="admin_panel" id="admin_panel">
        <GetSchedule/>
        <div className="admin_nav__left">
          <AdminMenu/>
        </div>

        <div className = "admin_right">
          <Switch>
            <Route exact path={siteRoutes.adminHome} render={(props)=> <Admin {...props} />}/>
            <Route exact path={siteRoutes.adminSchedule} render={(props)=><ScheduleAdd {...props} />}/>
            <Route exact path={siteRoutes.adminSchedule+'/:id'} render={(props)=><ScheduleEdit {...props} />}/>
            <Route exact path={siteRoutes.adminScheduleView} render={(props)=><ScheduleView {...props} />}/>
          </Switch>
        </div>

        <div className="admin_nav__right"/>
      </div>
    );
  }
}

export default RoutesAdmin;
