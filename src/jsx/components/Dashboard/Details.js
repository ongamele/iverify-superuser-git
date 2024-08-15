import React, { useMemo, useState, useEffect, Fragment } from "react";
import { useQuery } from "@apollo/client";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";

import {
  GET_ACTIVE_INDIGENTS,
  GET_ALL_MUNICIPALITY_APPLICATIONS,
} from "../../../Graphql/Queries";

import SelectedMunicipalDetails from "./SelectedMunicipalDetails";

//Import Components
const Details = ({ municipality }) => {
  const [showCard, setShowCard] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const { data: allMunicipalityApplications } = useQuery(
    GET_ALL_MUNICIPALITY_APPLICATIONS,
    {
      variables: {
        municipality: municipality,
      },
    }
  );

  const { loading, data } = useQuery(GET_ACTIVE_INDIGENTS, {
    pollInterval: 2000,
  });

  const allApplicationsCount =
    allMunicipalityApplications?.getAllMunicipalityApplications.length;
  const passedApplications =
    allMunicipalityApplications?.getAllMunicipalityApplications.filter(
      (record) => record.status === "Passed - Indigent Application Successful"
    ).length;
  const failedApplications =
    allMunicipalityApplications?.getAllMunicipalityApplications.filter(
      (record) => record.status === "Failed - Indigent Application Unsuccessful"
    ).length;
  const deceasedApplications =
    allMunicipalityApplications?.getAllMunicipalityApplications.filter(
      (record) => record.status === "deceased"
    ).length;
  const invalidApplications =
    allMunicipalityApplications?.getAllMunicipalityApplications.filter(
      (record) => record.status === "invalid"
    ).length;

  const excelData =
    allMunicipalityApplications?.getAllMunicipalityApplications || [];

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "applications" + ".xlsx");
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

  function handleDetails(type) {
    setDataType(type);
    setShowCard(true);
  }

  return (
    <>
      <Modal
        show={showCard}
        fullscreen={true}
        onHide={() => setShowCard(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectedMunicipalDetails
            dataType={dataType}
            municipality={municipality}
          />
        </Modal.Body>
      </Modal>
      <div className="row" style={{ background: "#F8F8F8", height: "100%" }}>
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card booking"
                    style={{ cursor: "pointer", backgroundColor: "#A2A6F6" }}
                    onClick={() => handleDetails("all")}>
                    >
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
                            {allApplicationsCount}
                          </h4>
                          <p className="mb-0 text-nowrap">Total Applications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card booking"
                    style={{ cursor: "pointer", backgroundColor: "#FF5271" }}
                    onClick={() =>
                      handleDetails("Passed - Indigent Application Successful")
                    }>
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
                            {passedApplications}
                          </h4>
                          <p className="mb-0 text-nowrap">Total Approved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card booking"
                    style={{ cursor: "pointer", backgroundColor: "#FFEB66" }}
                    onClick={() =>
                      handleDetails(
                        "Failed - Indigent Application Unsuccessful"
                      )
                    }>
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
                  <div
                    className="card booking"
                    style={{ cursor: "pointer", backgroundColor: "#76F4B9" }}
                    onClick={() => handleDetails("deceased")}>
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
                            {deceasedApplications}
                          </h4>
                          <p className="mb-0">Total Deceased</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card booking"
                    style={{ cursor: "pointer", backgroundColor: "#F4BA76" }}
                    onClick={() => handleDetails("invalid")}>
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
                            {invalidApplications}
                          </h4>
                          <p className="mb-0">Total Invalid</p>
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
                        {/*<div className="col-lg-3 mb-2">
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
                        </div>*/}
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
