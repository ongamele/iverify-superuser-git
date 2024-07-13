export const MenuList = [
  //Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i className="fas fa-home" />,
    to: "dashboard",
  },

  //Widget
  {
    title: "Users",
    //classsChange: 'mm-collapse',
    iconStyle: <i className="fas fa-users"></i>,
    to: "widget-basic",
  },

  //Widget
  {
    title: "Active Indigents",
    iconStyle: <i className="fas fa-user-check"></i>,
    to: "active-applications",
  },
  //Forms
  {
    title: "New User",
    classsChange: "mm-collapse",
    iconStyle: <i className="fas fa-file-alt"></i>,
    to: "form-wizard",
  },
];
