import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";
export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
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
    Header: "Email Id",
    Footer: "Email Id",
    accessor: "email",
    Filter: ColumnFilter,
  },
  {
    Header: "Address",
    Footer: "Address",
    accessor: "address",

    Filter: ColumnFilter,
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "status",
    Filter: ColumnFilter,
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phoneNumber",
    Filter: ColumnFilter,
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
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
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
