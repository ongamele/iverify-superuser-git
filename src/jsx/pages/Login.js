import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import "./style.css";

// image
import logo from "../../images/logo-full.png";
import { AuthContext } from "../components/context-auth/auth";
import { LOGIN_SUPERUSER } from "../../Graphql/Mutations";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  //const { user } = useContext(AuthContext);

  const [loginSuperUser, { loading }] = useMutation(LOGIN_SUPERUSER, {
    update(_, result) {
      if (result.data.loginSuperuser == "Success") {
        navigate("/dashboard");
      } else {
        alert(result.data.loginSuperuser);
      }
    },
    onError(err) {
      alert("User Not Foundss! " + err);
    },

    variables: {
      email,
      password,
    },
  });

  function login() {
    loginSuperUser();
  }

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <img src={logo} alt="" className="login-logo" />
          </div>
          <h3 className="mb-2">Welcome!</h3>
          <h4>
            Administration
            <br />
          </h4>
        </div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto login-right-container">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props.errorMessage && (
                    <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                      {props.successMessage}
                    </div>
                  )}
                  <h3 className="text-center mb-4 text-black">
                    Sign in your account
                  </h3>
                  <div className="form-group mb-3">
                    <label className="mb-1" htmlFor="val-email">
                      <strong>Email</strong>
                    </label>
                    <div>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Type Your Email Address"
                      />
                    </div>
                    {errors.email && (
                      <div className="text-danger fs-12">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label className="mb-1">
                      <strong>Password</strong>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      placeholder="Type Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="text-danger fs-12">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-row d-flex justify-content-between mt-4 mb-2">
                    <div className="form-group mb-3">
                      <div className="custom-control custom-checkbox ml-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="basic_checkbox_1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="basic_checkbox_1">
                          Remember my preference
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="text-center form-group mb-3">
                    <button
                      type="button"
                      className="btn btn-primary btn-block login-button"
                      onClick={login}>
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
