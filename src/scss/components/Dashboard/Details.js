import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import * as XLSX from "xlsx";

import { GET_ALL_MUNICIPALITY_APPLICATIONS } from "../../../Graphql/Queries";

//Import Components
const Details = ({ municipality }) => {
  const { data: allMunicipalityApplications } = useQuery(
    GET_ALL_MUNICIPALITY_APPLICATIONS,
    {
      pollInterval: 4000,
      variables: {
        municipality: municipality,
      },
    }
  );

  const totalApplications =
    allMunicipalityApplications?.getAllMunicipalityApplications.length;
  const successfulApplications =
    allMunicipalityApplications?.getAllMunicipalityApplications.filter(
      (app) => app.status === "Passed - Indigent Application Successful"
    ).length;
  const failedApplications =
    allMunicipalityApplications?.getAllMunicipalityApplications.filter(
      (app) => app.status === "Failed - Indigent Application Unsuccessful"
    ).length;

  const excelData =
    allMunicipalityApplications?.getAllMunicipalityApplications || [];

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "applications" + ".xlsx");
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-3 col-sm-6">
                  <div className="card booking" style={{ cursor: "pointer" }}>
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-book"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h4 className="mb-0 font-w600">Total Applications</h4>
                          <p className="mb-0 text-nowrap">
                            Total Requests: {totalApplications}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="card booking" style={{ cursor: "pointer" }}>
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-clipboard"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h4 className="mb-0 font-w600">
                            Indigent Application Successful
                          </h4>
                          <p className="mb-0 text-nowrap">
                            Total Approved: {successfulApplications}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="card booking" style={{ cursor: "pointer" }}>
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-users"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h4 className="mb-0 font-w600">
                            Failed - Indigent Application Unsuccessful
                          </h4>
                          <p className="mb-0">
                            Total Declined: {failedApplications}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card booking"
                    style={{ backgroundColor: "#EEF5FC", cursor: "pointer" }}
                    onClick={() => downloadExcel()}>
                    <div className="card-body">
                      <div className="booking-status d-flex align-items-center">
                        <span>
                          <i
                            className="fas fa-file-excel"
                            style={{ fontSize: "22px", color: "#009BD7" }}
                          />
                        </span>
                        <div className="ms-4">
                          <h2 className="mb-0 font-w600"></h2>
                          <p className="mb-0" style={{ color: "#03BA27" }}>
                            Download
                          </p>
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
