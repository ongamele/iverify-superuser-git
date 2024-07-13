import React, { Fragment, useState } from "react";

import { GET_ACTIVE_INDIGENTS } from "../../Graphql/Queries";
// Page titie
import PageTitle from "../layouts/PageTitle";
import { useQuery } from "@apollo/react-hooks";

const ActiveApplications = () => {
  const { loading, data } = useQuery(GET_ACTIVE_INDIGENTS, {
    pollInterval: 2000,
  });

  return (
    <>
      <Fragment>
        {/* <Ext /> */}
        <PageTitle
          activeMenu="Indigents"
          motherMenu=""
          pageContent="Approved"
        />
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-xxl-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Active Indigents</h4>
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
                        data.getActiveIndigents.map((indigent, index) => (
                          <tr key={index}>
                            <td>{indigent.idNumber}</td>
                            <td>{indigent.name}</td>
                            <td>{indigent.surname}</td>
                            <td>{indigent.phoneNumber}</td>
                            <td>
                              <span className="badge badge-rounded badge-primary">
                                {indigent.status}
                              </span>
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

export default ActiveApplications;
