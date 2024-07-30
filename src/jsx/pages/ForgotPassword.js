import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PASSWORD } from "../../Graphql/Mutations.jsx";
// image
import logo from "../../images/logo.png";
import "./style.css";
const ForgotPassword = ({ history }) => {
  const navigate = useNavigate();
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const param = useParams();

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD, {
    update(_, result) {
      if (result) {
        navigate("/");
      }
    },
    onError(err) {
      console.log(err);
      alert("Something went wrong.");
    },

    variables: {
      id: param.id,
      password: password,
    },
  });

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        //updateToken();
        const url = `http://locatlhost:3000/api/users/${param.id}/reset/$reset/${param.token}`;
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  function onSubmit() {
    if (!param.id) {
      alert("Something went wrong!");
    }
    if (!password) {
      alert("Enter new password");
    }
    if (param.id && password) {
      updatePassword();
    }
  }
  return (
    <div className="authincation h-100 p-meddle" style={{ marginTop: "20%" }}>
      <div className="container h-100">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/dashboard">
                        <img src={logo} alt="" className="login-logo" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Forgot Password</h4>
                    <form>
                      <div className="form-group">
                        <label className="">
                          <strong>New Password</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="text-center" style={{ marginTop: 10 }}>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={onSubmit}>
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
