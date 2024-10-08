import React, { useMemo, useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

import { GET_ALL_MUNICIPALITY_APPLICATIONS } from "../../../Graphql/Queries";
import { COLUMNS } from "../table/FilteringTable/Columns";

//Import Components
const SelectedDetails = ({ dataType, municipality }) => {
  const { data: allMunicipalityApplications } = useQuery(
    GET_ALL_MUNICIPALITY_APPLICATIONS,
    {
      variables: {
        municipality: municipality,
      },
    }
  );

  var newData = [];

  if (dataType === "all") {
    newData = allMunicipalityApplications?.getAllMunicipalityApplications;
  }

  if (dataType === "Failed - Indigent Application Unsuccessful") {
    newData =
      allMunicipalityApplications?.getAllMunicipalityApplications.filter(
        (record) =>
          record.status === "Failed - Indigent Application Unsuccessful"
      );
  }

  if (dataType === "Passed - Indigent Application Successful") {
    newData =
      allMunicipalityApplications?.getAllMunicipalityApplications.filter(
        (record) => record.status === "Passed - Indigent Application Successful"
      );
  }

  if (dataType === "deceased") {
    newData =
      allMunicipalityApplications?.getAllMunicipalityApplications.filter(
        (record) => record.status === "deceased"
      );
  }

  if (dataType === "invalid") {
    newData =
      allMunicipalityApplications?.getAllMunicipalityApplications.filter(
        (record) => record.status === "invalid"
      );
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
