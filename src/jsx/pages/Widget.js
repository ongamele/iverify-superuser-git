import React, { Fragment } from "react";
// BS
import { Dropdown, Nav, Tab } from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
// images
import avatar1 from "../../images/avatar/1.jpg";
import avatar2 from "../../images/avatar/2.jpg";
import avatar3 from "../../images/avatar/3.jpg";
import avatar4 from "../../images/avatar/4.jpg";
import bg1 from "../../images/big/img1.jpg";
import bg5 from "../../images/big/img5.jpg";
import profile from "../../images/profile/profile.png";
import ActiveUser from "./WidgetBasic/ActiveUser";
import AllSell1 from "./WidgetBasic/AllSell1";
import AllSell2 from "./WidgetBasic/AllSell2";
import BloodPressur from "./WidgetBasic/BloodPressure";
import Clolesterol from "./WidgetBasic/Clolesterol";
import FeeCollection from "./WidgetBasic/FeeCollection";
import GlucoseRate from "./WidgetBasic/GlucoseRate";
import HeartRate from "./WidgetBasic/HeartRate";
import LifeTimeEarning from "./WidgetBasic/LifeTimeEarning";
import MarketNow from "./WidgetBasic/MarketNow";
import NewStudent from "./WidgetBasic/NewStudent";
import PowerBar from "./WidgetBasic/PowerBar";
import PowerLine from "./WidgetBasic/PowerLine";
import SalesAnalysis from "./WidgetBasic/SalesAnalysis";
import TopProducts1 from "./WidgetBasic/TopProducts1";
import TopProducts2 from "./WidgetBasic/TopProducts2";
import TotalCourse from "./WidgetBasic/TotalCourse";
import TotalStudent from "./WidgetBasic/TotalStudent";
import ViewProject from "./WidgetBasic/ViewProject";
import VisitorActivity from "./WidgetBasic/VisitorActivity";
import WeeklySales1 from "./WidgetBasic/WeeklySales1";
import WeeklySales2 from "./WidgetBasic/WeeklySales2";
import Widget1 from "./WidgetBasic/Widget1";
import Widget2 from "./WidgetBasic/Widget2";
// Page titie
import PageTitle from "../layouts/PageTitle";

const Widget = () => {
  return (
    <Fragment>
      {/* <Ext /> */}
      <PageTitle activeMenu="Users" motherMenu="Users" pageContent="Approved" />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-xxl-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Users List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive recentOrderTable">
                <table className="table verticle-middle table-responsive-md">
                  <thead>
                    <tr>
                      <th scope="col">Ward No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Surnamee</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12</td>
                      <td>Ongamele</td>
                      <td>Gebhuza</td>
                      <td>01 08 2022</td>
                      <td>
                        <span className="badge badge-rounded badge-primary">
                          Canceled
                        </span>
                      </td>
                      <td>
                        <Dropdown className="dropdown custom-dropdown mb-0">
                          <Dropdown.Toggle
                            className="btn sharp btn-primary tp-btn i-false"
                            data-toggle="dropdown">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="18px"
                              height="18px"
                              viewBox="0 0 24 24"
                              version="1.1">
                              <g
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#000000" cx="12" cy="5" r="2" />
                                <circle fill="#000000" cx="12" cy="12" r="2" />
                                <circle fill="#000000" cx="12" cy="19" r="2" />
                              </g>
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                            <Dropdown.Item className="dropdown-item">
                              Details
                            </Dropdown.Item>
                            <Dropdown.Item className="dropdown-item text-danger">
                              Cancel
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Widget;
