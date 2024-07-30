import React, { useState } from "react";

const StepOne = ({ sendDataToParent }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [municipality, setMunicipality] = useState("");

  const data = {
    email,
    name,
    surname,
    phoneNumber,
    idNumber,
    municipality,
  };
  sendDataToParent(data);

  return (
    <section>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">First Name*</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Florence"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Last Name*</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Ngwenya"
              required
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Email Address*</label>
            <input
              type="email"
              className="form-control"
              id="inputGroupPrepend2"
              aria-describedby="inputGroupPrepend2"
              placeholder="example@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
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
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">ID Number*</label>
            <input
              type="number"
              name="lastName"
              className="form-control"
              placeholder="9109182848484"
              required
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Municipality*</label>
            <input
              type="text"
              name="Midupa Municipality"
              className="form-control"
              required
              onChange={(e) => setMunicipality(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
