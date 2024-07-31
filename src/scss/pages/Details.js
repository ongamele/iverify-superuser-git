import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPLICATIONS } from "../../Graphql/Queries";
import { GET_SUCCESSFUL_APPLICATIONS } from "../../Graphql/Queries";
import { GET_FAILED_APPLICATIONS } from "../../Graphql/Queries";
import { GET_LATEST_APPLICATIONS } from "../../Graphql/Queries";

//Import Components
const Details = ({ id }) => {
  const { data: totalApplications } = useQuery(GET_ALL_APPLICATIONS, {
    pollInterval: 4000,
    variables: {
      userId: id,
    },
  });

  const { data: successfulApplications } = useQuery(
    GET_SUCCESSFUL_APPLICATIONS,
    {
      pollInterval: 4000,
      variables: {
        userId: id,
      },
    }
  );

  const { data: failedApplications } = useQuery(GET_FAILED_APPLICATIONS, {
    pollInterval: 4000,
    variables: {
      userId: id,
    },
  });

  const { data: latestApplications } = useQuery(GET_LATEST_APPLICATIONS, {
    pollInterval: 4000,
    variables: {
      userId: id,
    },
  });
  var successCount = 0;
  var failureCount = 0;

  if (failedApplications && failedApplications.getFailedApplicationsCount) {
    failureCount = failedApplications.getFailedApplicationsCount;
  }

  if (
    successfulApplications &&
    successfulApplications.getSuccessfulApplicationsCount
  ) {
    successCount = successfulApplications.getSuccessfulApplicationsCount;
  }

  function successPercentage(success, fail) {
    var tot = fail + success;
    return (success * 100) / tot;
  }

  function failurePercentage(success, fail) {
    var tot = fail + success;
    return (fail * 100) / tot;
  }
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-3 col-sm-6">
                  <div className="card booking">
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-book"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {totalApplications &&
                              totalApplications.getAllApplicationsCount}
                          </h2>
                          <p className="mb-0 text-nowrap">Total Requests</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="card booking">
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-clipboard"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {" "}
                            {latestApplications &&
                              latestApplications.getLatestApplicationsCount}
                          </h2>
                          <p className="mb-0 text-nowrap ">New Requests</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="card booking">
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-users"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {successfulApplications &&
                              successfulApplications.getSuccessfulApplicationsCount}
                          </h2>
                          <p className="mb-0">Approved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="card booking">
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-exclamation"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600">
                            {failedApplications &&
                              failedApplications.getFailedApplicationsCount}
                          </h2>
                          <p className="mb-0">Rejected</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-6">
                  <div className="row">
                    <div className="col-xl-6 col-sm-6">
                      <div
                        className="card"
                        style={{
                          backgroundColor: "#2AD45E",
                          cursor: "pointer",
                        }}>
                        <div className="card-body">
                          <div className="d-flex align-items-end pb-4 justify-content-between">
                            <span className="fs-14 font-w500 text-white">
                              Total Approvals
                            </span>
                            <span className="fs-20 font-w600 text-white">
                              <span className="pe-2"></span>
                              {successfulApplications &&
                                successfulApplications.getSuccessfulApplicationsCount}
                            </span>
                          </div>
                          <div className="progress default-progress h-auto">
                            <div
                              className="progress-bar bg-white progress-animated"
                              style={{
                                width: `${successPercentage(
                                  successCount,
                                  failureCount
                                )}0%`,
                                height: "13px",
                              }}>
                              <span className="sr-only">
                                {successPercentage(successCount, failureCount)}%
                                Complete
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                      <div
                        className="card "
                        style={{
                          backgroundColor: "#AD0900",
                          cursor: "pointer",
                        }}>
                        <div className="card-body">
                          <div className="d-flex align-items-end pb-4 justify-content-between">
                            <span className="fs-14 font-w500 text-white">
                              Declined
                            </span>
                            <span className="fs-20 font-w600 text-white">
                              <span className="pe-2"></span>
                              {failedApplications &&
                                failedApplications.getFailedApplicationsCount}
                            </span>
                          </div>
                          <div className="progress default-progress h-auto">
                            <div
                              className="progress-bar bg-white progress-animated"
                              style={{
                                width: `${failurePercentage(
                                  successCount,
                                  failureCount
                                )}%`,
                                height: "13px",
                              }}>
                              <span className="sr-only">
                                {failurePercentage(successCount, failureCount)}%
                                Complete
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;
