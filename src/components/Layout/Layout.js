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

//account
import AccountList from "../../pages/account/List";
import AccountAdd from "../../pages/account/Add";
import AccountEdit from "../../pages/account/Edit";
import AccountView from "../../pages/account/View";

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
              <Route path="/app/accounts/add" component={AccountAdd} />
              <Route path="/app/accounts/edit/:id" component={AccountEdit} />
              <Route path="/app/accounts/view/:id" component={AccountView} />
              <Route path="/app/accounts" component={AccountList} />
            </Switch>
            <Footer />
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
