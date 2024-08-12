import React, { useMemo, useState, useEffect, Fragment } from "react";
import { useQuery } from "@apollo/client";
import * as XLSX from "xlsx";

import {
  GET_ACTIVE_INDIGENTS,
  GET_ALL_MUNICIPALITY_APPLICATIONS,
} from "../../../Graphql/Queries";

//Import Components
const Details = ({ municipality }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const { data: allMunicipalityApplications } = useQuery(
    GET_ALL_MUNICIPALITY_APPLICATIONS,
    {
      pollInterval: 4000,
      variables: {
        municipality: municipality,
      },
    }
  );

  const { loading, data } = useQuery(GET_ACTIVE_INDIGENTS, {
    pollInterval: 2000,
  });

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

  function successPercentage(success, fail) {
    var tot = fail + success;
    return (success * 100) / tot;
  }

  function failurePercentage(success, fail) {
    var tot = fail + success;
    return (fail * 100) / tot;
  }

  const convertToDate = (dateString) => {
    // Extract the year, month, and day from the string
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6) - 1; // Months are 0-indexed in JavaScript Date
    const day = dateString.substring(6, 8);

    // Create a new Date object
    const date = new Date(year, month, day);

    // Format the date as a string (YYYY-MM-DD)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  };
  const [filters, setFilters] = useState({
    combinedStatus: "",
    municipality: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (data) {
      let filtered = data.getActiveIndigents;

      if (filters.combinedStatus) {
        filtered = filtered.filter(
          (item) =>
            item.deceased === filters.combinedStatus ||
            item.status === filters.combinedStatus
        );
      }

      if (filters.municipality) {
        filtered = filtered.filter(
          (item) => item.municipality === filters.municipality
        );
      }

      if (filters.fromDate && filters.toDate) {
        const from = new Date(filters.fromDate);
        const to = new Date(filters.toDate);
        filtered = filtered.filter((item) => {
          const applicationDate = new Date(item.applicationDate);
          return applicationDate >= from && applicationDate <= to;
        });
      }

      setFilteredData(filtered);
      setActiveFilters(Object.keys(filters).filter((key) => filters[key]));
    }
  }, [data, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Helper functions to get label and icon for each filter
  const getLabelForFilter = (filter) => {
    switch (filter) {
      case "deceased":
        return "Deceased";
      case "municipality":
        return "Municipality";
      case "fromDate":
        return "From Date";
      case "toDate":
        return "To Date";
      case "status":
        return "Status";
      default:
        return "";
    }
  };

  const getIconForFilter = (filter) => {
    switch (filter) {
      case "deceased":
        return "book";
      case "municipality":
        return "clipboard";
      case "fromDate":
        return "calendar-alt";
      case "toDate":
        return "calendar-alt";
      case "status":
        return "users";
      default:
        return "filter";
    }
  };

  return (
    <>
      <div className="row" style={{ background: "#F8F8F8", height: "100%" }}>
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
                          <h4 className="mb-0 font-w600">
                            {totalApplications}
                          </h4>
                          <p className="mb-0 text-nowrap">Total Applications</p>
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
                            {successfulApplications}
                          </h4>
                          <p className="mb-0 text-nowrap">Total Approved</p>
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
                            {failedApplications}
                          </h4>
                          <p className="mb-0">Total Declined</p>
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
                          <h4 className="mb-0 font-w600">4</h4>
                          <p className="mb-0">Total Deceased</p>
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
                          <h4 className="mb-0 font-w600">4</h4>
                          <p className="mb-0">Total Invalid</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6">
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
                          {successfulApplications}
                        </span>
                      </div>
                      <div className="progress default-progress h-auto">
                        <div
                          className="progress-bar bg-white progress-animated"
                          style={{
                            width: `${successPercentage(
                              successfulApplications,
                              failedApplications
                            )}%`,
                            height: "13px",
                          }}>
                          <span className="sr-only">
                            {successPercentage(
                              successfulApplications,
                              failedApplications
                            )}
                            % Complete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card"
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
                          {failedApplications}
                        </span>
                      </div>
                      <div className="progress default-progress h-auto">
                        <div
                          className="progress-bar bg-white progress-animated"
                          style={{
                            width: `${failurePercentage(
                              successfulApplications,
                              failedApplications
                            )}%`,
                            height: "13px",
                          }}>
                          <span className="sr-only">
                            {failurePercentage(
                              successfulApplications,
                              failedApplications
                            )}
                            % Complete
                          </span>
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

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-xxl-12 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div>
                    <div className="card-body">
                      <h4 className="card-title">Filters</h4>
                      <div className="row">
                        <div className="col-lg-3 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">Filter by</label>
                            <select
                              name="combinedStatus"
                              value={filters.combinedStatus}
                              onChange={handleFilterChange}
                              className="form-control form-control-md">
                              <option value=""></option>
                              <option value="Y">Deceased</option>
                              <option value="Passed - Indigent Application Successful">
                                Approved
                              </option>
                              <option value="Failed - Indigent Application Unsuccessful">
                                Declined
                              </option>
                              <option value="Invalid">Invalid</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 mb-2">
                          <div className="form-group mb-3">
                            <label className="text-label">Municipality</label>
                            <select
                              name="municipality"
                              value={filters.municipality}
                              onChange={handleFilterChange}
                              className="form-control form-control-md">
                              <option value=""></option>
                              <option value="Thulamela2">Thulamela</option>
                              <option value="Musina">Musina</option>
                              <option value="Collins Chabane">
                                Collins Chabane
                              </option>
                              <option value="Makhado">Makhado</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="fromDate-filter">From Date:</label>
                          <input
                            type="date"
                            id="fromDate-filter"
                            name="fromDate"
                            className="form-control"
                            value={filters.fromDate}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="toDate-filter">To Date:</label>
                          <input
                            type="date"
                            id="toDate-filter"
                            name="toDate"
                            className="form-control"
                            value={filters.toDate}
                            onChange={handleFilterChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-12">
                        <div className="row">
                          <div className="col-xl-3 col-sm-6">
                            <div
                              className="card booking"
                              style={{ cursor: "pointer" }}>
                              <div className="card-body">
                                <div className="booking-status d-flex align-items-center">
                                  <span>
                                    <i
                                      className="fas fa-clipboard"
                                      style={{
                                        fontSize: "22px",
                                        color: "#009BD7",
                                      }}
                                    />
                                  </span>
                                  <div className="ms-4">
                                    <h2 className="mb-0 font-w600">
                                      {filteredData.length}
                                    </h2>
                                    <p className="mb-0 text-nowrap">
                                      Applicants
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Details;
