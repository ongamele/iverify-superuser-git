import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const StepFour = () => {
  const [idFile, setIdFile] = useState("");
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaG9raXlxbnZjYWdwY2R6dmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2MDI5OTEsImV4cCI6MTk2MDE3ODk5MX0.-OBafJvE4CB6IGMNV3qesbrWna2oMoPPhb1Cxqq65Ao";
  const SUPABASE_URL = "https://lahokiyqnvcagpcdzvcx.supabase.co";

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const onUpload = async () => {
    var IdFileName = "";

    if (idFile != "") {
      let arr = idFile.name.split(".");
      let extension = arr.pop();

      IdFileName =
        "id_" + Math.floor(Math.random() * 10000000000 + 2) + "." + extension;
      //console.log(file);
      const { data, error } = supabase.storage
        .from("motorluv-bucket/iverify/ids")
        .upload(IdFileName, idFile);
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
      }
    } else {
      IdFileName = "";
    }
  };

  const consentListStyle = {
    textAlign: "center",
    listStyleType: "disc", // Add bullet points
    paddingLeft: "0px", // Add some space for the bullet points
  };

  const consentItemStyle = {
    textAlign: "left", // Align text within list items to the left
    marginBottom: "10px", // Add space after each item
  };

  return (
    <section>
      <div className="row">
        <div className="col-sm-4 mb-2">
          <h4>Declaration *</h4>
        </div>
        <div className="col-6 col-sm-6 mb-2">
          <div>
            <ul style={consentListStyle}>
              <li style={consentItemStyle}>
                I declare that the information provided in this application for
                indigent verification is to the best of my knowledge and it’s
                true and correct.
              </li>
              <li style={consentItemStyle}>
                I accept that should this application contain fraudulent
                information, the benefits will be suspended, and I cannot apply
                for indigent status, until the next financial year.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*<div className="row emial-setup">
        <div className="col-lg-4 col-sm-6 col-6">
          <div className="form-group mb-3">
            <label
              htmlFor="mailclient11"
              className="mailclinet mailclinet-gmail">
              <input
                type="file"
                className="redio-false"
                name="emailclient"
                id="mailclient11"
                onChange={(e) => {
                  setIdFile(e.target.files[0]);
                }}
              />

              <span className="mail-icon">
                <i className="mdi mdi-account-box" aria-hidden="true"></i>
              </span>
              <span className="mail-text">Upload ID</span>
            </label>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 col-6">
          <div className="form-group mb-3">
            <label
              htmlFor="mailclient11"
              className="mailclinet mailclinet-gmail">
              <input
                type="file"
                className="redio-false"
                name="emailclient"
                id="mailclient11"
              />

              <span className="mail-icon">
                <i className="mdi mdi-newspaper" aria-hidden="true"></i>
              </span>
              <span className="mail-text">Upload Bank Statement</span>
            </label>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 col-6">
          <div className="form-group mb-3">
            <label
              htmlFor="mailclient11"
              className="mailclinet mailclinet-gmail">
              <input
                type="file"
                className="redio-false"
                name="emailclient"
                id="mailclient11"
              />

              <span className="mail-icon">
                <i className="mdi mdi-clipboard-text" aria-hidden="true"></i>
              </span>
              <span className="mail-text">Upload Affidavid</span>
            </label>
          </div>
        </div>
        <button className="btn btn-primary sw-btn-next ms-1">Upload</button>
      </div>*/}
    </section>
  );
};

export default StepFour;
