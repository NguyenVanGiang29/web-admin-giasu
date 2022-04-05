import React, { Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";

// context
import { useLayoutState } from "../../context/LayoutContext";

//
import { routers } from "../../routers/router";

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
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/app/dashboard" component={Dashboard}/> 
              {
                routers.map((router, i) => 
                  <Route key={i} path={router.path} component={router.component} />
                )
              }
            </Switch>
          </Suspense>
          <Footer />
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
