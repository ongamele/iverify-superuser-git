import React, { useState, useContext } from "react";
import { Nav, Tab } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ThemeContext } from "../../context/ThemeContext";
import demo1 from "../../images/demo/pic1.jpg";
import demo2 from "../../images/demo/pic2.jpg";
import demo3 from "../../images/demo/pic3.jpg";
import demo4 from "../../images/demo/pic4.jpg";
import demo5 from "../../images/demo/pic5.jpg";
import demo6 from "../../images/demo/pic6.jpg";

const Setting = () => {
  const [settingToggle, setSettingToggle] = useState(false);
  const [demoToggle, setDemoToggle] = useState(false);
  const {
    body,
    sideBarOption,
    layoutOption,
    backgroundOption,
    sidebarposition,
    headerPositions,
    containerPosition,
    fontFamily,
    changePrimaryColor,
    changeNavigationHader,
    sideBarStyle,
    changeSideBarStyle,
    changeSideBarPostion,
    sidebarpositions,
    changeHeaderPostion,
    headerposition,
    changeSideBarLayout,
    sidebarLayout,
    colors,
    chnageHaderColor,
    chnageSidebarColor,
    changeBackground,
    background,
    changeContainerPosition,
    containerPosition_,
    setDemoTheme,
  } = useContext(ThemeContext);
  return (
    <>
      <div className={`sidebar-right ${settingToggle ? "show" : ""}`}>
        <div
          className="bg-overlay"
          onClick={() => setSettingToggle(!settingToggle)}></div>
      </div>
    </>
  );
};

export default Setting;
