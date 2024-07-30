import React, { lazy, Suspense, useEffect, useContext } from "react";

/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/context-auth/auth";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";
//Authentication pages
import Login from "./pages/Login";
/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";
/// Dashboard
import Home from "./components/Dashboard/Home";

/// Widget
import Widget from "./pages/Widget";

/// Active Applications
import ActiveApplications from "./pages/ActiveApplications";

/// Table
import FilteringTable from "./components/table/FilteringTable/FilteringTable";

/// Form
import Wizard from "./components/Forms/Wizard/Wizard";

import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";

const Markup = () => {
  // const { menuToggle } = useContext(ThemeContext);
  const allroutes = [
    /// Dashboard
    // { url: "/", component: <Home /> },
    { url: "dashboard", component: <Home /> },

    /// Widget
    { url: "widget-basic", component: <Widget /> },

    //Active Applications
    { url: "active-applications", component: <ActiveApplications /> },

    /// Form
    { url: "form-wizard", component: <Wizard /> },

    /// table
    { url: "table-filtering", component: <FilteringTable /> },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<MainLayout />}>
            {allroutes.map((data, i) => (
              <Route
                key={i}
                exact
                path={`${data.url}`}
                element={data.component}
              />
            ))}
          </Route>
        </Routes>
      </AuthProvider>
      <Setting />
      <ScrollToTop />
    </>
  );
};

function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div
      id="main-wrapper"
      className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${
        menuToggle ? "menu-toggle" : ""
      }`}>
      <Nav />
      <div
        className="content-body"
        style={{ minHeight: window.screen.height - 45 }}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Markup;
