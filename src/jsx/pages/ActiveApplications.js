import React, { Fragment, useState, useEffect } from "react";

import { GET_ACTIVE_INDIGENTS } from "../../Graphql/Queries";
// Page titie
import PageTitle from "../layouts/PageTitle";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Badge, Modal } from "react-bootstrap";
import Papa from "papaparse";
import * as XLSX from "xlsx";

import { CREATE_APPLICATION } from "../../Graphql/Mutations.jsx";

const ActiveApplications = () => {
  const [show, setShow] = useState(false);
  const { loading, data } = useQuery(GET_ACTIVE_INDIGENTS, {
    pollInterval: 2000,
  });

  const [filteredData, setFilteredData] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const [createApplication, { loading: uploadLoading }] = useMutation(
    CREATE_APPLICATION,
    {
      update(_, result) {},
      onError(err) {
        alert(err.message);
      },
    }
  );

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

  const handleFileChange = (event) => {
    let file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        // Loop through each sheet and process its content
        for (const sheetName of workbook.SheetNames) {
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          if (sheetName === "Collins Chabane") {
            for (let i = 1; i < data.length; i++) {
              await createApplication({
                variables: {
                  name: data[i][2] ? data[i][2] : "",
                  userId: "",
                  surname: "",
                  idNumber: data[i][3] ? data[i][3].toString() : "",
                  email: "",
                  gender: "",
                  phoneNumber: null,
                  country: "South Africa",
                  race: "",
                  address: "",
                  postalCode: "",
                  householdHead: false,
                  maritalStatus: "",
                  dependents: false,
                  idBook: "",
                  bankStatement: "",
                  affidavid: "",
                  companyName: "",
                  companyPhoneNumber: null,
                  companyEmail: "",
                  income: data[i][5] ? data[i][5].toString() : "",
                  sourceOfIncome: "",
                  standType: "",
                  suburb: "",
                  wardNumber: "",
                  municipality: "Collins Chabane",
                  municipalAccountNumber: data[i][0]
                    ? data[i][0].toString()
                    : "",
                  companyRegNumber: "",
                  companyType: "",
                  applicantIdNumber: data[i][3] ? data[i][3].toString() : "",
                  applicantName: data[i][2] || "",
                  applicantSurname: "",
                  applicantPhoneNumber: null,
                  applicantRelationship: "",
                  spauseIdNumber: "",
                  spauseName: "",
                  spauseSurname: "",
                  sassaNumber: "",
                  ageRange: "",
                  status: data[i][9] ? data[i][9] : "",
                  deceased: data[i][6] ? data[i][6] : "",
                  applicationDate: data[i][1]
                    ? convertToDate(data[i][1].toString())
                    : "",
                },
              });
            }
          }

          if (sheetName === "Makhado") {
            for (let i = 1; i < data.length; i++) {
              await createApplication({
                variables: {
                  name: data[i][2] || "",
                  userId: "",
                  surname: "",
                  idNumber: data[i][3].toString() || "",
                  email: "",
                  gender: "",
                  phoneNumber: null,
                  country: "South Africa",
                  race: "",
                  address: "",
                  postalCode: "",
                  householdHead: false,
                  maritalStatus: "",
                  dependents: false,
                  idBook: "",
                  bankStatement: "",
                  affidavid: "",
                  companyName: "",
                  companyPhoneNumber: null,
                  companyEmail: "",
                  income: data[i][5].toString(),
                  sourceOfIncome: "",
                  standType: "",
                  suburb: "",
                  wardNumber: "",
                  municipality: "Makhado",
                  municipalAccountNumber: data[i][0].toString() || "",
                  companyRegNumber: "",
                  companyType: "",
                  applicantIdNumber: data[i][3].toString() || "",
                  applicantName: data[i][2] || "",
                  applicantSurname: "",
                  applicantPhoneNumber: null,
                  applicantRelationship: "",
                  spauseIdNumber: "",
                  spauseName: "",
                  spauseSurname: "",
                  sassaNumber: "",
                  ageRange: "",
                  status: data[i][9] || "",
                  deceased: data[i][6] || "",
                  applicationDate: data[i][1]
                    ? convertToDate(data[i][1].toString())
                    : "",
                },
              });
            }
          }

          if (sheetName === "Thulamela2") {
            for (let i = 1; i < data.length; i++) {
              console.log(typeof convertToDate(data[i][1].toString()));
              await createApplication({
                variables: {
                  name: data[i][2] || "",
                  userId: "",
                  surname: "",
                  idNumber: data[i][3].toString() || "",
                  email: "",
                  gender: "",
                  phoneNumber: null,
                  country: "South Africa",
                  race: "",
                  address: "",
                  postalCode: "",
                  householdHead: false,
                  maritalStatus: "",
                  dependents: false,
                  idBook: "",
                  bankStatement: "",
                  affidavid: "",
                  companyName: "",
                  companyPhoneNumber: null,
                  companyEmail: "",
                  income: data[i][5].toString(),
                  sourceOfIncome: "",
                  standType: "",
                  suburb: "",
                  wardNumber: "",
                  municipality: "Thulamela2",
                  municipalAccountNumber: data[i][0].toString() || "",
                  companyRegNumber: "",
                  companyType: "",
                  applicantIdNumber: data[i][3].toString() || "",
                  applicantName: data[i][2] || "",
                  applicantSurname: "",
                  applicantPhoneNumber: null,
                  applicantRelationship: "",
                  spauseIdNumber: "",
                  spauseName: "",
                  spauseSurname: "",
                  sassaNumber: "",
                  ageRange: "",
                  status: data[i][9] || "",
                  deceased: data[i][6] || "",
                  applicationDate: data[i][1]
                    ? convertToDate(data[i][1].toString())
                    : "",
                },
              });
            }
          }

          if (sheetName === "Musina") {
            for (let i = 1; i < data.length; i++) {
              console.log(typeof convertToDate(data[i][1].toString()));
              await createApplication({
                variables: {
                  name: data[i][2] || "",
                  userId: "",
                  surname: "",
                  idNumber: data[i][3].toString() || "",
                  email: "",
                  gender: "",
                  phoneNumber: null,
                  country: "South Africa",
                  race: "",
                  address: "",
                  postalCode: "",
                  householdHead: false,
                  maritalStatus: "",
                  dependents: false,
                  idBook: "",
                  bankStatement: "",
                  affidavid: "",
                  companyName: "",
                  companyPhoneNumber: null,
                  companyEmail: "",
                  income: data[i][5].toString(),
                  sourceOfIncome: "",
                  standType: "",
                  suburb: "",
                  wardNumber: "",
                  municipality: "Musina",
                  municipalAccountNumber: data[i][0].toString() || "",
                  companyRegNumber: "",
                  companyType: "",
                  applicantIdNumber: data[i][3].toString() || "",
                  applicantName: data[i][2] || "",
                  applicantSurname: "",
                  applicantPhoneNumber: null,
                  applicantRelationship: "",
                  spauseIdNumber: "",
                  spauseName: "",
                  spauseSurname: "",
                  sassaNumber: "",
                  ageRange: "",
                  status: data[i][9] || "",
                  deceased: data[i][6] || "",
                  applicationDate: data[i][1]
                    ? convertToDate(data[i][1].toString())
                    : "",
                },
              });
            }
          }
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsBinaryString(file);
  };

  const [filters, setFilters] = useState({
    combinedStatus: "",
    municipality: "",
    fromDate: "",
    toDate: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

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
  const downloadCSV = () => {
    const csv = Papa.unparse(filteredData, {
      headers: true,
      delimiter: ",",
      skipEmptyLines: true,
      quotes: true,
      quoteChar: '"',
      escapeChar: '"',
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "filtered_indigents.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-4 col-sm-6 col-6">
            <div className="form-group mb-3">
              <label
                htmlFor="mailclient11"
                className="mailclinet mailclinet-gmail">
                <input
                  type="file"
                  className="redio-false"
                  name="emailclient"
                  id="mailclient11"
                  onChange={handleFileChange}
                />

                <span className="mail-icon">
                  <i className="mdi mdi-clipboard-text" aria-hidden="true"></i>
                </span>
                <span className="mail-text">
                  {uploadLoading ? "uploading.." : "Upload"}
                </span>
              </label>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title"> INDIGENTS</h4>
                <div>
                  <button
                    className="btn btn-primary sw-btn-next me-2"
                    onClick={() => setShow(true)}>
                    Upload indigents
                  </button>
                  <button className="btn btn-secondary" onClick={downloadCSV}>
                    Download CSV
                  </button>
                </div>
              </div>

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

                      {/*<div className="col-lg-2 mb-2">
                        <div className="form-group mb-3">
                          <label className="text-label">Status</label>
                          <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="form-control form-control-md">
                            <option value=""></option>
                            <option value="Passed - Indigent Application Successful">
                              Approved
                            </option>
                            <option value="Failed - Indigent Application Unsuccessful">
                              Declined
                            </option>
                          </select>
                        </div>
                      </div>*/}
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
                                  <p className="mb-0 text-nowrap">Applicants</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*} <div className="table-responsive recentOrderTable">
                  <table className="table verticle-middle table-responsive-md">
                    <thead>
                      <tr>
                        <th scope="col">ID No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Alive</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6">Loading...</td>
                        </tr>
                      ) : filteredData.length > 0 ? (
                        filteredData.map((indigent, index) => (
                          <tr key={index}>
                            <td>{indigent.idNumber}</td>
                            <td>
                              {indigent.name} {indigent.surname}
                            </td>
                            <td>{indigent.phoneNumber}</td>
                            <td>
                              <Badge bg={`${getBadgeClass(indigent.status)}`}>
                                {indigent.status}
                              </Badge>
                            </td>
                            <td>{indigent.deceased}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ActiveApplications;
