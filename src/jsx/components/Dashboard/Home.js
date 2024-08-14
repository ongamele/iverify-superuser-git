import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { AuthContext } from "../context-auth/auth";
import Details from "./Details";
import SelectedDetails from "./SelectedDetails";
import { GET_ALL_USER_APPLICATIONS } from "../../../Graphql/Queries";
import { GET_ALL_APPROVED } from "../../../Graphql/Queries";
import { GET_ALL_DECLINED } from "../../../Graphql/Queries";
import { GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT } from "../../../Graphql/Queries";
import { GET_ALL_EXCEL_APPLICATIONS } from "../../../Graphql/Queries";
const Home = () => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [id, setId] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [municipality, setMunicipality] = useState();
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);

  const { data: totalApplications } = useQuery(GET_ALL_USER_APPLICATIONS);
  const { data: allApproved } = useQuery(GET_ALL_APPROVED);
  const { data: allDeclined } = useQuery(GET_ALL_DECLINED);

  var successCount = 0;
  var failureCount = 0;

  if (allDeclined && allDeclined.getAllDeclinedCount) {
    failureCount = allDeclined.getAllDeclinedCount;
  }

  if (allApproved && allApproved.getAllApprovedCount) {
    successCount = allApproved.getAllApprovedCount;
  }

  function successPercentage(success, fail) {
    var tot = fail + success;
    return (success * 100) / tot;
  }

  function failurePercentage(success, fail) {
    var tot = fail + success;
    return (fail * 100) / tot;
  }

  function handleMunicipalDetails(municipality) {
    setMunicipality(municipality);
    setShow(true);
  }

  const { data: totalMusinaMunicipalityApplications } = useQuery(
    GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: "Musina",
      },
    }
  );

  const { data: totalMakhadoMunicipalityApplications } = useQuery(
    GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: "Makhado",
      },
    }
  );

  const { data: totalColinsChabaneMunicipalityApplications } = useQuery(
    GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: "Collins Chabane",
      },
    }
  );

  const { data: totalThulamelaMunicipalityApplications } = useQuery(
    GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT,
    {
      pollInterval: 4000,
      variables: {
        municipality: "Thulamela2",
      },
    }
  );

  const { data, loading, error } = useQuery(GET_ALL_EXCEL_APPLICATIONS);

  const originalData = data?.getAllExcelApplications || [];
  const excelData = originalData.map((item) => ({
    ID_NUMBER: item.idNumber,
    "MUNICILAP NAME": item.municipality,
    APPROVED_YN: item.status,
    INCOME: item.income,
    APPLICACATION_DATE_YYYYMMDD: item.applicationDate,
  }));

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "applications" + ".xlsx");
  };

  function handleDetails(type) {
    setDataType(type);
    setShowCard(true);
  }

  const MunicipalityChart = ({ data, title }) => {
    const chartOptions = {
      chart: {
        type: "bar",
        height: 350,
        distributed: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: data.map((item) => item.name),
      },
      yaxis: {
        title: {
          text: "Applications Count",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => val,
        },
      },
      title: {
        text: title,
        align: "center",
      },
    };

    const chartSeries = [
      {
        name: "Applications",
        data: data.map((item) => item.count),
      },
    ];

    return (
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    );
  };

  const municipalitiesData = [
    {
      name: "Makhado",
      count:
        totalMakhadoMunicipalityApplications?.getTotalMunicipalityApplicationsCount ||
        0,
    },
    {
      name: "Thulamela",
      count:
        totalThulamelaMunicipalityApplications?.getTotalMunicipalityApplicationsCount ||
        0,
    },
    {
      name: "Collins Chabane",
      count:
        totalColinsChabaneMunicipalityApplications?.getTotalMunicipalityApplicationsCount ||
        0,
    },
    {
      name: "Musina",
      count:
        totalMusinaMunicipalityApplications?.getTotalMunicipalityApplicationsCount ||
        0,
    },
  ];
  return (
    <>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{municipality}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Details municipality={municipality} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showCard}
        fullscreen={true}
        onHide={() => setShowCard(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectedDetails dataType={dataType} id={id} />
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-xl-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card booking"
                    style={{ cursor: "pointer", backgroundColor: "#A2A6F6" }}
                    onClick={() => handleDetails("all")}>
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
                              totalApplications.getAllUserApplicationsCount}
                          </h2>
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
                    onClick={() => handleDetails("approved")}>
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
                            {allApproved && allApproved.getAllApprovedCount}
                          </h2>
                          <p className="mb-0 text-nowrap ">Total Approved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div
                    className="card booking"
                    style={{ cursor: "pointer", backgroundColor: "#FFEB66" }}
                    onClick={() => handleDetails("declined")}>
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
                            {allDeclined && allDeclined.getAllDeclinedCount}
                          </h2>
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
                          <h2 className="mb-0 font-w600">4</h2>
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
                          <h2 className="mb-0 font-w600">44</h2>
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
                            Download{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-6">
                  <div className="row"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header border-0 pb-0">
                <h4 className="fs-20">Municipalities</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div
                    className="col-xl-3 col-sm-3 col-6 mb-4 col-xxl-6"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMunicipalDetails("Makhado")}>
                    <div className="text-center">
                      <h3 className="fs-28 font-w600">
                        {totalMakhadoMunicipalityApplications &&
                          totalMakhadoMunicipalityApplications.getTotalMunicipalityApplicationsCount}
                      </h3>
                      <span className="fs-16">Makhado Local Municipality</span>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-sm-3 col-6 mb-4 col-xxl-6"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMunicipalDetails("Thulamela2")}>
                    <div className="text-center">
                      <h3 className="fs-28 font-w600">
                        {totalThulamelaMunicipalityApplications &&
                          totalThulamelaMunicipalityApplications.getTotalMunicipalityApplicationsCount}
                      </h3>
                      <span className="fs-16">
                        Thulamela Local Municipality
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-sm-3 col-6 mb-4 col-xxl-6"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMunicipalDetails("Collins Chabane")}>
                    <div className="text-center">
                      <h3 className="fs-28 font-w600">
                        {totalColinsChabaneMunicipalityApplications &&
                          totalColinsChabaneMunicipalityApplications.getTotalMunicipalityApplicationsCount}
                      </h3>
                      <span className="fs-16">
                        Collins Chabane Local Municipality
                      </span>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-sm-3 col-6 mb-4 col-xxl-6"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMunicipalDetails("Musina")}>
                    <div className="text-center">
                      <h3 className="fs-28 font-w600">
                        {totalMusinaMunicipalityApplications &&
                          totalMusinaMunicipalityApplications.getTotalMunicipalityApplicationsCount}
                      </h3>
                      <span className="fs-16 wspace-no">
                        Musina Local Municipality
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="fs-20">Municipalities</h4>
            </div>
            <div className="card-body pt-0">
              <MunicipalityChart
                data={municipalitiesData}
                title="Municipalities Applications Count"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
