import React, { Suspense, lazy } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

const Home = lazy(() => import("./Components/Homepage/Homepage"));
const Checkout = lazy(() => import("./Components/Checkout/Checkout"));

const Routing = (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routing;
