import React from "react";
import { Route } from "react-router";
import { Layout } from "../Layout";
import { Home } from "../Home";
import { FetchData } from "../components/FetchData";
import { Counter } from "../components/Counter";
import { Widgets } from "../Widgets";

import "./App.css";

export const App = () => {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path="/fetch-data" component={FetchData} />
      <Route path="/widgets" component={Widgets} />
    </Layout>
  );
};
