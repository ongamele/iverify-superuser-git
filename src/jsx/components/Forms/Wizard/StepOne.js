import React, { useState, useEffect } from "react";
import axios from "axios";

const StepTwo = ({ sendDataToParent }) => {
  const [isConsent, setIsConsent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState();

  const data = {
    phoneNumber,
    otp,
    sentOtp,
    isConsent,
  };
  sendDataToParent(data);

  const consentListStyle = {
    textAlign: "center",
    listStyleType: "disc",
    paddingLeft: "0px",
  };

  const consentItemStyle = {
    textAlign: "left",
    marginBottom: "10px",
  };

  const sendSMS = async () => {
    try {
      const min = 10000; // Minimum 5-digit number
      const max = 99999; // Maximum 5-digit number
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

      setSentOtp(randomNum);
      const apiKey =
        "2319f2b218dfee20edf691f73ccba12f-73d582c6-316c-4b53-a90c-1c0c1fa1c94f";
      const message = `Hello, Your Iverify OTP is ${randomNum}`;

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

  useEffect(() => {
    if (isConsent) {
      sendSMS();
    }
  }, [isConsent]);

  return (
    <section>
      <div className="row" style={{ marginBottom: 10 }}>
        <div className="col-sm-4 mb-2">
          <h4>Consent *</h4>
        </div>
        <div className="col-6 col-sm-6 mb-2">
          <div>
            <ul style={consentListStyle}>
              <li style={consentItemStyle}>
                I consent to and accept that Vhembe District Municipality may
                use a third party (i.e. Credit Bureaus) to conduct verification
                and access my personal credit information to verify my indigent
                status.
              </li>
              <li style={consentItemStyle}>
                I give consent to Vhembe District Municipality to utilize my
                personal information for Indigent verification analysis and
                other activities such as economic and financial feasibility
                studies.
              </li>
              <li style={consentItemStyle}>
                Further, it is specifically agreed that the service provider
                will use its best endeavors and take all reasonable precautions
                to ensure that any information provided is only used for the
                purposes it has been provided.
              </li>
            </ul>
          </div>
          <div className="form-group mb-3">
            <label className="text-label">Phone Number*</label>
            <input
              type="number"
              name="phoneNumber"
              className="form-control"
              placeholder="(+27) 408-657-907"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <label className="text-label">Accept to continue</label>
          <select
            defaultValue={"option"}
            className="form-control form-control-md"
            onChange={(e) => setIsConsent(e.target.value)}>
            <option value="false">Disagree</option>
            <option vlaue="true">Agree</option>
          </select>
          {isConsent && (
            <div className="form-group mb-3" style={{ marginTop: 8 }}>
              <label className="text-label">Enter OTP*</label>
              <input
                type="number"
                className="form-control"
                id="emial1"
                placeholder="0000"
                required
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
