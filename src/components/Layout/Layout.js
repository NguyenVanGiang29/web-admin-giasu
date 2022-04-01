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
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer/Footer";

// pages
import Dashboard from "../../pages/dashboard";

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
