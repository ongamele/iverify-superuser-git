import React, { Fragment, useState } from "react";
// BS
import { Dropdown, Nav, Tab } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { GET_USERS } from "../../Graphql/Queries";
// Page titie
import PageTitle from "../layouts/PageTitle";
import Details from "./Details";
import { useQuery } from "@apollo/react-hooks";

const Widget = () => {
  const [show, setShow] = useState(false);
  const [currentUserName, setCurrentUserName] = useState();
  const [id, setId] = useState();

  const { loading, data } = useQuery(GET_USERS, {
    pollInterval: 2000,
  });
  function handleDetails(name, id) {
    setCurrentUserName(name);
    setId(id);
    setShow(true);
  }

  {
    data && console.log(JSON.stringify("data"));
  }

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUserName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Details id={id} />
        </Modal.Body>
      </Modal>
      <Fragment>
        {/* <Ext /> */}
        <PageTitle
          activeMenu="Users"
          motherMenu="Users"
          pageContent="Approved"
        />
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
                        <th scope="col">ID No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <h1>Loading rusers..</h1>
                      ) : (
                        data &&
                        data.getUsers.map((user, index) => (
                          <tr key={index}>
                            <td>{user.idNumber}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                              <span className="badge badge-rounded badge-primary">
                                {user.status}
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
                                      <rect
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="5"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="12"
                                        r="2"
                                      />
                                      <circle
                                        fill="#000000"
                                        cx="12"
                                        cy="19"
                                        r="2"
                                      />
                                    </g>
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                                  <Dropdown.Item
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleDetails(user.name, user.id)
                                    }>
                                    Details
                                  </Dropdown.Item>
                                  <Dropdown.Item className="dropdown-item text-danger">
                                    Cancel
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Widget;
