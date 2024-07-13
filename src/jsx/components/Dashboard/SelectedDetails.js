import React, { useMemo, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { GET_ALL_APPROVED_APPLICATIONS_SUPERUSER } from "../../../Graphql/Queries";
import { GET_ALL_DECLINED_APPLICATIONS_SUPERUSER } from "../../../Graphql/Queries";
import { GET_APPLICATIONS_SUPERUSER } from "../../../Graphql/Queries";
import { COLUMNS } from "../table/FilteringTable/Columns";

//Import Components
const SelectedDetails = ({ dataType }) => {
  const { loading: approvedLoading, data: approvedApplicationsData } = useQuery(
    GET_ALL_APPROVED_APPLICATIONS_SUPERUSER
  );

  const { loading: declinedLoading, data: declinedApplicationsData } = useQuery(
    GET_ALL_DECLINED_APPLICATIONS_SUPERUSER
  );

  const { loading: allApplicationsLoading, data: allApplicationsData } =
    useQuery(GET_APPLICATIONS_SUPERUSER);

  var newData = [];

  if (allApplicationsData && dataType == "all") {
    newData = allApplicationsData.getApplicationsSuperuser;
  }

  if (declinedApplicationsData && dataType == "declined") {
    newData = declinedApplicationsData.getAllDeclinedApplicationsSuperuser;
  }

  if (approvedApplicationsData && dataType == "approved") {
    newData = approvedApplicationsData.getAllApprovedApplicationsSuperuser;
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
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
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
      </div>
    </>
  );
};
export default SelectedDetails;
