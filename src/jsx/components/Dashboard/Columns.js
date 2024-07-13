import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "idNumber",
    Filter: ColumnFilter,
    //disableFilters: true,
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "name",
    Filter: ColumnFilter,
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "surname",
    Filter: ColumnFilter,
  },
  {
    Header: "Municipality",
    Footer: "Municipality",
    accessor: "municipality",
    Filter: ColumnFilter,
  },
  {
    Header: "Ward No",
    Footer: "Ward No",
    accessor: "wardNumber",

    Filter: ColumnFilter,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
    Filter: ColumnFilter,
  },
  {
    Header: "Date",
    Footer: "Date",
    accessor: "createdAt",
    Filter: ColumnFilter,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "idNumber",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "surname",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Address",
        Footer: "Address",
        accessor: "address",
      },
      {
        Header: "Status",
        Footer: "Status",
        accessor: "status",
      },
      {
        Header: "Reason",
        Footer: "Reason",
        accessor: "reason",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
