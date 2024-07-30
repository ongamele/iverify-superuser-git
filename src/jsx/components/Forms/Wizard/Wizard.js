import React, { Fragment, useState } from "react";
//import Multistep from "react-multistep";
import { Stepper, Step } from "react-form-stepper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import PageTitle from "../../../layouts/PageTitle";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../../../../Graphql/Mutations.jsx";
import { Alert } from "react-bootstrap";

const Wizard = () => {
  const navigate = useNavigate();
  const [goSteps, setGoSteps] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [municipality, setMunicipality] = useState("");

  const receiveDataFromChild = (data) => {
    setEmail(data.email);
    setName(data.name);
    setSurname(data.surname);
    setPhoneNumber(data.phoneNumber);
    setIdNumber(data.idNumber);
    setMunicipality(data.municipality);
  };

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var newPassword = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newPassword += characters.charAt(randomIndex);
  }

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    update(_, result) {
      if (result) {
        alert("User Added!");

        const redirectToPage = () => {
          setTimeout(() => {
            navigate("/widget-basic");
          }, 3000);
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
      (email != "",
      name != "",
      surname != "",
      phoneNumber != null,
      idNumber != "",
      municipality != "")
    ) {
      if (validateEmail(email)) {
        createUser({
          variables: {
            email,
            name,
            surname,
            phoneNumber: parseInt(phoneNumber),
            idNumber,
            municipality,
            password: newPassword,
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

  return (
    <Fragment>
      <PageTitle activeMenu="Registration" motherMenu="New" />

      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Registration Form</h4>
            </div>
            <div className="card-body">
              <div className="form-wizard ">
                <Stepper
                  className="nav-wizard"
                  activeStep={goSteps}
                  label={false}>
                  <Step className="nav-link" onClick={() => setGoSteps(0)} />
                  <Step className="nav-link" onClick={() => setGoSteps(3)} />
                </Stepper>
                {goSteps === 0 && (
                  <>
                    <StepOne sendDataToParent={receiveDataFromChild} />
                    <div className="text-end toolbar toolbar-bottom p-2">
                      <button
                        className="btn btn-primary sw-btn-next"
                        onClick={() => setGoSteps(1)}>
                        Next
                      </button>
                    </div>
                  </>
                )}
                {goSteps === 1 && (
                  <>
                    <StepFour />
                    <div className="text-end toolbar toolbar-bottom p-2">
                      <button
                        className="btn btn-secondary sw-btn-prev me-1"
                        onClick={() => setGoSteps(0)}>
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
  );
};

export default Wizard;
