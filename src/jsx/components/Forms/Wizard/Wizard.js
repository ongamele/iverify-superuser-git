import React, { Fragment, useState, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

import { Stepper, Step } from "react-form-stepper";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import PageTitle from "../../../layouts/PageTitle";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_APPLICATION } from "../../../../Graphql/Mutations.jsx";
import { AuthContext } from "../../context-auth/auth";

const Wizard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user.id;
  const [toastShow, setToastShow] = useState(false);
  const [goSteps, setGoSteps] = useState(0);
  const [email, setEmail] = useState("");
  //const [userId, setUserId] = useState("2343934932");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [gender, setGender] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idNumberCount, setIdnumberCount] = useState();
  const [country, setCountry] = useState("");
  const [race, setRace] = useState("");
  const [address, setAddress] = useState("");
  const [isConsent, setIsConsent] = useState(false);

  const [idBook, setIdBook] = useState("");
  const [affidavid, setAffidavid] = useState("");
  const [bankStatement, setBankStatement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [standType, setStandType] = useState("");
  const [suburb, setSuburb] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [municipalAccountNumber, setMunicipalAccountNumber] = useState("");

  //Step Two
  const [otp, setOtp] = useState();
  const [sentOtp, setSentOtp] = useState();

  const [phoneNumber, setPhoneNumber] = useState("");

  //Step three
  const [income, setIncome] = useState();
  const [sourceOfIncome, setSourceOfIncome] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState();
  const [companyRegNumber, setCompanyRegNumber] = useState("");
  const [companyType, setCompanyType] = useState();

  const [applicantIdNumber, setApplicantIdNumber] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantSurname, setApplicantSurname] = useState("");
  const [applicantPhoneNumber, setApplicantPhoneNumber] = useState();
  const [applicantRelationship, setApplicantRelationship] = useState("");

  const [householdHead, setHouseholdHead] = useState("");
  const [dependents, setDependants] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [spauseIdNumber, setSpauseIdNumber] = useState("");
  const [spauseName, setSpauseName] = useState("");
  const [spauseSurname, setSpauseSurname] = useState("");

  const [sassaNumber, setSassaNumber] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const [redirecting, setRedirecting] = useState(false);

  const [applicationResults, setApplicationResults] = useState("");

  const receiveDataFromChild = (data) => {
    setEmail(data.email);
    setGender(data.gender);
    setName(data.name);
    setSurname(data.surname);

    setGender(data.gender);
    setIdNumber(data.idNumber);
    setIdnumberCount(data.idNumberCount);
    setCountry(data.country);
    setRace(data.race);
    setAddress(data.address);
    setStandType(data.standType);
    setSuburb(data.suburb);
    setWardNumber(data.wardNumber);
    setMunicipality(data.municipality);
    setMunicipalAccountNumber(data.municipalAccountNumber);
  };

  const receiveDataFromStep3Child = (data) => {
    setPostalCode(data.postalCode);
    setCompanyName(data.companyName);
    setCompanyEmail(data.companyEmail);
    setIncome(data.income);
    setSourceOfIncome(data.sourceOfIncome);
    setHouseholdHead(data.householdHead);
    setDependants(data.dependents);
    setCompanyPhoneNumber(data.companyPhoneNumber);
    setAgeRange(data.ageRange);
    setCompanyRegNumber(data.companyRegNumber);
    setCompanyType(data.companyType);
    setApplicantIdNumber(data.applicantIdNumber);
    setApplicantName(data.applicantName);
    setApplicantSurname(data.applicantSurname);
    setApplicantPhoneNumber(data.applicantPhoneNumber);
    setApplicantRelationship(data.applicantRelationship);
    setMaritalStatus(data.maritalStatus);
    setSpauseIdNumber(data.setSpauseIdNumber);
    setSpauseName(data.spauseName);
    setSpauseSurname(data.setSpauseSurname);
    setSassaNumber(data.sassaNumber);
  };

  const receiveDataFromStep2Child = (data) => {
    setPhoneNumber(data.phoneNumber);
    setOtp(data.otp);
    setSentOtp(data.sentOtp);
    setIsConsent(data.isConsent);
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [createApplication, { loading }] = useMutation(CREATE_APPLICATION, {
    update(_, result) {
      if (result) {
        setApplicationResults(result.data.createApplication);
        setMessage(result);
        setToastShow(true);

        const sendSMS = async () => {
          try {
            const apiKey =
              "2319f2b218dfee20edf691f73ccba12f-73d582c6-316c-4b53-a90c-1c0c1fa1c94f";
            const message = `Hello, ${result.data.createApplication}`;

            const response = await axios.post(
              "https://api.infobip.com/sms/1/text/single",
              {
                from: "27872406515",
                to: "27" + phoneNumber.toString(),
                text: message,
              },
              {
                headers: {
                  Authorization: `App ${apiKey}`,
                },
              }
            );

            console.log("SMS sent successfully:", response.data);
          } catch (error) {
            console.error("Error sending SMS:", error);
          }
        };

        sendSMS();

        const redirectToPage = () => {
          setTimeout(() => {
            setRedirecting(true);
            navigate("/table-filtering");
          }, 10000);
        };

        redirectToPage();
      }
    },
    onError(err) {
      alert(err.message);
    },
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const onSubmit = async () => {
    if (
      name != ""
      /*surname != "" &&
      idNumber != "" &&
      phoneNumber != "" &&
      email != "" &&
      gender != "" &&
      country != "" &&
      race != "" &&
      address != "" &&
      phoneNumber != null &&
      country != "" &&
      race != "" &&
      address != "" &&
      postalCode != "" &&
      householdHead != null &&
      maritalStatus != "" &&
      dependents != null &&
      dependents != null &&
      income != null &&
      sourceOfIncome != ""*/
    ) {
      if (validateEmail(email)) {
        createApplication({
          variables: {
            name,
            userId,
            surname,
            idNumber,
            email,
            gender,
            phoneNumber: parseInt(phoneNumber),
            country,
            race,
            address,
            postalCode,
            householdHead,
            maritalStatus,
            dependents,
            idBook,
            bankStatement,
            affidavid,
            companyName,
            companyPhoneNumber: parseInt(companyPhoneNumber),
            companyEmail,
            income: parseInt(income),
            sourceOfIncome,
            standType,
            suburb,
            wardNumber,
            municipality,
            municipalAccountNumber,
            companyRegNumber,
            companyType,
            applicantIdNumber,
            applicantName,
            applicantSurname,
            applicantPhoneNumber: parseInt(applicantPhoneNumber),
            applicantRelationship,
            spauseIdNumber,
            spauseName,
            spauseSurname,
            sassaNumber,
            ageRange,
          },
        });
      } else {
        setErrorMessage("Enter a valid email address!");
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  function submitFunction() {
    onSubmit();
    if (errorMessage == "") {
      // setGoSteps(num);
    } else {
      alert(errorMessage);
    }
  }

  const handleStepOne = () => {
    var message = "";
    if (isConsent && sentOtp == otp) {
      setGoSteps(1);
    } else {
      if (!isConsent) {
        message += "Please agree to our terms to proceed! ";
      }
      if (sentOtp !== otp || otp == "") {
        message += "Please check your OTP or restart the form!";
      }
      if (message !== "") {
        alert(message);
      }
    }
  };

  //setGoSteps(1)
  return (
    <>
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => setToastShow(false)}
            show={toastShow}
            delay={10000}
            autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">IVERIFY</strong>
            </Toast.Header>
            <Toast.Body>{applicationResults}!</Toast.Body>
          </Toast>
        </Col>
      </Row>
      <Fragment>
        <PageTitle activeMenu="Application" motherMenu="New" />

        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Application Form</h4>
              </div>
              <div className="card-body">
                <div className="form-wizard ">
                  <Stepper
                    className="nav-wizard"
                    activeStep={goSteps}
                    label={false}>
                    <Step className="nav-link" onClick={() => setGoSteps(0)} />
                    <Step className="nav-link" onClick={() => setGoSteps(1)} />
                    <Step className="nav-link" onClick={() => setGoSteps(2)} />
                    <Step className="nav-link" onClick={() => setGoSteps(3)} />
                  </Stepper>
                  {goSteps === 0 && (
                    <>
                      <StepOne sendDataToParent={receiveDataFromStep2Child} />
                      <div className="text-end toolbar toolbar-bottom p-2">
                        <button
                          className="btn btn-primary sw-btn-next"
                          onClick={() => handleStepOne()}>
                          Next
                        </button>
                      </div>
                    </>
                  )}
                  {goSteps === 1 && (
                    <>
                      <StepTwo sendDataToParent={receiveDataFromChild} />
                      <div className="text-end toolbar toolbar-bottom p-2">
                        <button
                          className="btn btn-secondary sw-btn-prev me-1"
                          onClick={() => setGoSteps(0)}>
                          Prev
                        </button>
                        <button
                          className="btn btn-primary sw-btn-next ms-1"
                          onClick={() => setGoSteps(2)}>
                          Next
                        </button>
                      </div>
                    </>
                  )}
                  {goSteps === 2 && (
                    <>
                      <StepThree sendDataToParent={receiveDataFromStep3Child} />
                      <div className="text-end toolbar toolbar-bottom p-2">
                        <button
                          className="btn btn-secondary sw-btn-prev me-1"
                          onClick={() => setGoSteps(1)}>
                          Prev
                        </button>
                        <button
                          className="btn btn-primary sw-btn-next ms-1"
                          onClick={() => setGoSteps(3)}>
                          Next
                        </button>
                      </div>
                    </>
                  )}
                  {goSteps === 3 && (
                    <>
                      <StepFour />
                      <div className="text-end toolbar toolbar-bottom p-2">
                        <button
                          className="btn btn-secondary sw-btn-prev me-1"
                          onClick={() => setGoSteps(2)}>
                          Prev
                        </button>
                        <button
                          className="btn btn-primary sw-btn-next ms-1"
                          onClick={() => submitFunction()}>
                          Submit
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Wizard;
