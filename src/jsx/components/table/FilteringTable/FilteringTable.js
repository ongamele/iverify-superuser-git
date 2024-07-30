import React, { useMemo, useContext, useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import PageTitle from "../../../layouts/PageTitle";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import Modal from "react-bootstrap/Modal";
import { COLUMNS } from "./Columns";
import "./filtering.css";
import { AuthContext } from "../../context-auth/auth";
import { GET_APPLICATIONS } from "../../../../Graphql/Queries";
import { GET_SELECTED_APPLICATION } from "../../../../Graphql/Mutations";

export const FilteringTable = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [excelId, setExcelId] = useState("");
  const { user } = useContext(AuthContext);

  const {
    loading: userLoading,
    data: userApplications,
    refetch,
  } = useQuery(GET_APPLICATIONS, {
    variables: {
      userId: user.id,
    },
  });

  const [getSelectedApplication, { loading }] = useMutation(
    GET_SELECTED_APPLICATION,
    {
      update(_, result) {
        var rowsData1 = [];
        var rowsData2 = [];

        rowsData1.push({
          name: result.data.getSelectedApplication.name,
          surname: result.data.getSelectedApplication.surname,
          idNumber: result.data.getSelectedApplication.idNumber,
          gender: result.data.getSelectedApplication.gender,
          phoneNumber: result.data.getSelectedApplication.phoneNumber,
          municipality: result.data.getSelectedApplication.municipality,
          wardNumber: result.data.getSelectedApplication.wardNumber,
        });

        rowsData2.push({
          status: result.data.getSelectedApplication.status,
          reason: result.data.getSelectedApplication.reason,
          createdAt: result.data.getSelectedApplication.createdAt,
        });
        let left = 15;
        let top = 8;
        const imgWidth = 30;
        const imgHeight = 30;

        const doc = new jsPDF();
        var img = new Image();
        img.src = require("../../../../images/logo-full.png");
        doc.addImage(img, "png", left, top, imgWidth, imgHeight);
        doc.setFontSize(8);
        doc.text("Valid for 3 months", 166, 12);
        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        doc.text("Application Report", 80, 44);

        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        doc
          .text("CANDIDATE PERSONAL INFORMATION", 15, 64)
          .text(
            `Ward Number: ${result.data.getSelectedApplication.wardNumber}`,
            15,
            70
          )
          .text(
            `Municipal Acc Number: ${result.data.getSelectedApplication.municipalAccountNumber}`,
            15,
            76
          )
          .setFont(undefined, "bold");
        doc.autoTable({
          startY: 80,
          startX: 10,
          headStyles: { fillColor: [0, 129, 199] },
          columns: [
            { dataKey: "name", header: "Name" },
            { dataKey: "surname", header: "Surname" },
            { dataKey: "idNumber", header: "Id Number" },
            { dataKey: "gender", header: "Gender" },
            { dataKey: "phoneNumber", header: "Phone No" },
            { dataKey: "municipality", header: "Municipality" },
            { dataKey: "wardNumber", header: "Ward No" },
          ],
          body: rowsData1,
        });

        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        doc.text("SYSTEM DECISION", 15, 104).setFont(undefined, "bold");

        doc.autoTable({
          startY: 110,
          startX: 10,
          headStyles: { fillColor: [0, 129, 199] },
          columns: [
            { dataKey: "status", header: "Decision" },
            { dataKey: "reason", header: "Reason" },
            { dataKey: "createdAt", header: "Date" },
          ],
          body: rowsData2,
        });

        doc.save("report.pdf");
      },
      onError(err) {
        console.log("Application Not Found! " + err);
      },

      variables: {
        id,
      },
    }
  );

  const [getSelectedApplicationExcel, { loading: excelLoading }] = useMutation(
    GET_SELECTED_APPLICATION,
    {
      update(_, result) {
        var rowsData = [];

        rowsData.push({
          name: result.data.getSelectedApplication.name,
          surname: result.data.getSelectedApplication.surname,
          idNumber: result.data.getSelectedApplication.idNumber,
          status: result.data.getSelectedApplication.status,
          reason: result.data.getSelectedApplication.reason,
        });
      },
      onError(err) {
        console.log("Application Not Found! " + err);
      },

      variables: {
        id: excelId,
      },
    }
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch(); // Call the refetch function to execute the query again
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [refetch]);

  //Assign Data
  var newData = [];
  if (userApplications) {
    newData = userApplications.getApplications;
  }

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => newData, []);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = tableInstance;

  const { pageIndex } = state;

  function handleButtonClick(row) {
    const rowData = row.original;
    setShow(true);
  }

  useEffect(() => {
    getSelectedApplication();
  }, [id]);

  useEffect(() => {
    getSelectedApplicationExcel();
  }, [excelId]);

  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Documents</Modal.Title>
        </Modal.Header>
        <section className="upload-section">
          <div className="row emial-setup">
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="form-group mb-3">
                <label
                  htmlFor="mailclient14"
                  className="mailclinet mailclinet-another">
                  <input
                    type="file"
                    className="redio-false"
                    name="emailclient"
                    id="mailclient14"
                  />
                  <span className="mail-icon">
                    <i
                      className="mdi mdi-account-box-outline"
                      aria-hidden="true"
                      style={{ color: "#DB3227" }}></i>
                  </span>
                  <span className="mail-text">ID</span>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="form-group mb-3">
                <label
                  htmlFor="mailclient13"
                  className="mailclinet mailclinet-drive">
                  <input
                    type="file"
                    className="redio-false"
                    name="emailclient"
                    id="mailclient13"
                  />
                  <span className="mail-icon">
                    <i
                      className="mdi mdi-content-copy"
                      aria-hidden="true"
                      style={{ color: "#DB3227" }}></i>
                  </span>
                  <span className="mail-text">Affidavid</span>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="form-group mb-3">
                <label
                  htmlFor="mailclient13"
                  className="mailclinet mailclinet-drive">
                  <input
                    type="file"
                    className="redio-false"
                    name="emailclient"
                    id="mailclient13"
                  />
                  <span className="mail-icon">
                    <i
                      className="mdi mdi-checkbox-multiple-blank-outline"
                      aria-hidden="true"
                      style={{ color: "#DB3227" }}></i>
                  </span>
                  <span className="mail-text">3 Months Bank Statement</span>
                </label>
              </div>
            </div>
          </div>
        </section>
        <div className="upload-div">
          <button
            className="btn btn-primary btn-sm sw-btn-next ms-1 upload-button"
            onClick={() => setShow(false)}>
            Upload Documentss
          </button>
        </div>
      </Modal>
      <PageTitle activeMenu="Applications" motherMenu="Latest" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Applications</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table {...getTableProps()} className="table dataTable display">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {column.canFilter ? column.render("Filter") : null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {" "}
                            {cell.render("Cell")}{" "}
                          </td>
                        );
                      })}
                      <td>
                        {row.original.status == "Approved" ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleButtonClick(row)}>
                            DOCS
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary-dissabled btn-sm"
                            onClick={() =>
                              console.log("Cannot upload document")
                            }>
                            DOCS
                          </button>
                        )}
                      </td>

                      <td
                        onClick={() => setId(row.original.id)}
                        style={{ cursor: "pointer" }}>
                        PDF
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
                {""}
              </span>
              <span className="table-index">
                Go to page :{" "}
                <input
                  type="number"
                  className="ml-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
            </div>
            <div className="text-center mb-3">
              <div className="filter-pagination  mt-3">
                <button
                  className=" previous-button"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}>
                  {"<<"}
                </button>

                <button
                  className="previous-button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}>
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}>
                  Next
                </button>
                <button
                  className=" next-button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}>
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilteringTable;
