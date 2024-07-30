import React, { useState } from "react";

const StepTwo = ({ sendDataToParent }) => {
  const [otp, setOtp] = useState("");

  const data = {
    otp,
  };
  sendDataToParent(data);

  return (
    <section>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
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
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
