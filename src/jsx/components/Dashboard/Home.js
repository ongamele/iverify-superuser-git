import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Chart from "react-apexcharts";
import * as XLSX from "xlsx";
import Modal from "react-bootstrap/Modal";
//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import Details from "./Details";
import SelectedDetails from "./SelectedDetails";
import { GET_ACTIVE_INDIGENTS } from "../../../Graphql/Queries";
const Home = () => {
  const [show, setShow] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [id, setId] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [municipality, setMunicipality] = useState();
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);

  const { data: allApplications } = useQuery(GET_ACTIVE_INDIGENTS, {
    variables: {
      municipality: municipality,
    },
  });

  const allApplicationsCount = allApplications?.getActiveIndigents.length;
  const passedApplications = allApplications?.getActiveIndigents.filter(
    (record) => record.status === "Passed - Indigent Application Successful"
  ).length;
  const failedApplications = allApplications?.getActiveIndigents.filter(
    (record) => record.status === "Failed - Indigent Application Unsuccessful"
  ).length;
  const deceasedApplications = allApplications?.getActiveIndigents.filter(
    (record) => record.status === "deceased"
  ).length;
  const invalidApplications = allApplications?.getActiveIndigents.filter(
    (record) => record.status === "invalid"
  ).length;

  const makhadoCount = allApplications?.getActiveIndigents.filter(
    (record) => record.municipality === "Makhado"
  ).length;
  const thulamelaCount = allApplications?.getActiveIndigents.filter(
    (record) => record.municipality === "Thulamela2"
  ).length;
  const collinsChabaneCount = allApplications?.getActiveIndigents.filter(
    (record) => record.municipality === "Collins Chabane"
  ).length;
  const musinaCount = allApplications?.getActiveIndigents.filter(
    (record) => record.municipality === "Musina"
  ).length;

  function handleMunicipalDetails(municipality) {
    setMunicipality(municipality);
    setShow(true);
  }

  const originalData = allApplications?.getActiveIndigents || [];
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
      count: makhadoCount || 0,
    },
    {
      name: "Thulamela",
      count: thulamelaCount || 0,
    },
    {
      name: "Collins Chabane",
      count: collinsChabaneCount || 0,
    },
    {
      name: "Musina",
      count: musinaCount || 0,
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
                            {allApplicationsCount}
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
                    onClick={() =>
                      handleDetails("Passed - Indigent Application Successful")
                    }>
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
                            {passedApplications}
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
                    onClick={() =>
                      handleDetails(
                        "Failed - Indigent Application Unsuccessful"
                      )
                    }>
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
                            {failedApplications}
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
                          <h2 className="mb-0 font-w600">
                            {deceasedApplications}
                          </h2>
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
                          <h2 className="mb-0 font-w600">
                            {invalidApplications}
                          </h2>
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
                      <h3 className="fs-28 font-w600">{makhadoCount}</h3>
                      <span className="fs-16">Makhado Local Municipality</span>
                    </div>
                  </div>
                  <div
                    className="col-xl-3 col-sm-3 col-6 mb-4 col-xxl-6"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMunicipalDetails("Thulamela2")}>
                    <div className="text-center">
                      <h3 className="fs-28 font-w600">{thulamelaCount}</h3>
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
                      <h3 className="fs-28 font-w600">{collinsChabaneCount}</h3>
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
                      <h3 className="fs-28 font-w600">{musinaCount}</h3>
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
