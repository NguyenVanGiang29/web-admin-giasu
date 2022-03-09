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

//pages/parent
import ParentList from "../../pages/parent/List";
import ParentAdd from "../../pages/parent/Add";
import ParentEdit from "../../pages/parent/Edit";
import ParentView from "../../pages/parent/View";

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
            </Switch>
            <Footer />
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
