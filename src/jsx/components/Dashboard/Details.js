import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";

import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "./Columns";
import { GET_APPROVED_MUNICIPALITY_APPLICATIONS_COUNT } from "../../../Graphql/Queries";
import { GET_DECLINED_MUNICIPALITY_APPLICATIONS_COUNT } from "../../../Graphql/Queries";
import { GET_PENDING_MUNICIPALITY_APPLICATIONS_COUNT } from "../../../Graphql/Queries";
import { GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT } from "../../../Graphql/Queries";
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

  const { data: approvedApplications } = useQuery(
    GET_APPROVED_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: municipality,
      },
    }
  );

  const { data: declinedApplications } = useQuery(
    GET_DECLINED_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: municipality,
      },
    }
  );

  const { data: pendingApplications } = useQuery(
    GET_PENDING_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: municipality,
      },
    }
  );

  const { data: totalApplications } = useQuery(
    GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: municipality,
      },
    }
  );

  var newData = [];
  if (allMunicipalityApplications) {
    console.log(
      JSON.stringify(allMunicipalityApplications.getAllMunicipalityApplications)
    );
    newData = allMunicipalityApplications.getAllMunicipalityApplications;
  } else {
    console.log("No Data");
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
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

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
                              totalApplications.getTotalMunicipalityApplicationsCount}
                          </h2>
                          <p className="mb-0 text-nowrap">Total Applications</p>
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
                            {pendingApplications &&
                              pendingApplications.getPendingMunicipalityApplicationsCount}
                          </h2>
                          <p className="mb-0 text-nowrap ">
                            Pending Applications
                          </p>
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
                            {approvedApplications &&
                              approvedApplications.getApprovedMunicipalityApplicationsCount}
                          </h2>
                          <p className="mb-0">Approved Applications</p>
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
                            {declinedApplications &&
                              declinedApplications.getDeclinedMunicipalityApplicationsCount}
                          </h2>
                          <p className="mb-0">Declined Applications</p>
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
      <div className="row">
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
                            <>
                              <td {...cell.getCellProps()}>
                                {" "}
                                {cell.render("Cell")}{" "}
                              </td>
                            </>
                          );
                        })}
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
      </div>
    </>
  );
};
export default Details;
