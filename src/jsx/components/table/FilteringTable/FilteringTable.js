import React, { useMemo, useContext, useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import PageTitle from "../../../layouts/PageTitle";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import Modal from "react-bootstrap/Modal";
import { COLUMNS } from "./Columns";
import { GlobalFilter } from "./GlobalFilter";
//import './table.css';
import "./filtering.css";
import { AuthContext } from "../../context-auth/auth";
import { GET_USERS } from "../../../../Graphql/Queries";

export const FilteringTable = () => {
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);

  const { loading: userLoading, data: userApplications } = useQuery(GET_USERS, {
    variables: {
      userId: user.id,
    },
  });
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
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <PageTitle activeMenu="Applications" motherMenu="Latest" />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Applications</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                      <td>
                        <button
                          className="btn btn-primary btn-sm sw-btn-next ms-1"
                          onClick={() =>
                            alert("Can.t upload to pending results!")
                          }>
                          Docs
                        </button>
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
