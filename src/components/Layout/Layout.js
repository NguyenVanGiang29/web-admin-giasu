import React from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";

//pages/parent
import ParentList from "../../pages/parent/List";
import ParentAdd from "../../pages/parent/Add";
import ParentEdit from "../../pages/parent/Edit";
import ParentView from "../../pages/parent/View";

//account
import AccountList from "../../pages/account/List";
import AccountAdd from "../../pages/account/Add";
import AccountEdit from "../../pages/account/Edit";
import AccountView from "../../pages/account/View";

//pages/tutor
import TutorList from "../../pages/tutor/List";
import TutorAdd from "../../pages/tutor/Add";
import TutorEdit from "../../pages/tutor/Edit";
import TutorView from "../../pages/tutor/View";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/parents/add" component={ParentAdd} />
              <Route path="/app/parents/edit/:id" component={ParentEdit} />
              <Route path="/app/parents/view/:id" component={ParentView} />
              <Route path="/app/parents" component={ParentList} />
              <Route path="/app/accounts/add" component={AccountAdd} />
              <Route path="/app/accounts/edit/:id" component={AccountEdit} />
              <Route path="/app/accounts/view/:id" component={AccountView} />
              <Route path="/app/accounts" component={AccountList} />
              <Route path="/app/tutors/add" component={TutorAdd} />
              <Route path="/app/tutors/edit/:id" component={TutorEdit} />
              <Route path="/app/tutors/view/:id" component={TutorView} />
              <Route path="/app/tutors" component={TutorList} />
            </Switch>
            <Footer />
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
