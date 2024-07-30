import React, { useState } from "react";

const StepTwo = ({ sendDataToParent }) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [gender, setGender] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [country, setCountry] = useState("");
  const [race, setRace] = useState("");
  const [address, setAddress] = useState("");
  const [standType, setStandType] = useState("");
  const [suburb, setSuburb] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [municipalAccountNumber, setMunicipalAccountNumber] = useState("");
  const [idNumberCount, setIdnumberCount] = useState(0);

  const data = {
    email,
    userId,
    name,
    surname,

    gender,
    idNumber,
    country,
    race,
    address,
    standType,
    suburb,
    wardNumber,
    municipality,
    municipalAccountNumber,
    idNumberCount,
  };
  sendDataToParent(data);

  const handleIdNumberChange = (e) => {
    const input = e.target.value;
    // Remove any non-numeric characters
    const numericInput = input.replace(/[^0-9]/g, "");

    setIdNumber(numericInput);
    setIdnumberCount(numericInput.length);
  };

  return (
    <section>
      <>
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
                placeholder="florence@eiverify.co.za"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Gender*</label>
              <select
                defaultValue={"option"}
                className="form-control form-control-md"
                onChange={(e) => setGender(e.target.value)}>
                <option></option>
                <option vlaue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
                onChange={handleIdNumberChange}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Nationality*</label>
              <select
                defaultValue={"option"}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control form-control-md">
                <option></option>
                <option vlaue="Residential">South African</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Race*</label>
              <select
                defaultValue={"option"}
                onChange={(e) => setRace(e.target.value)}
                className="form-control form-control-md">
                <option></option>
                <option vlaue="African">African</option>
                <option value="White">White</option>
                <option value="Colourd">Colourd</option>
                <option value="Indian">Indian</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Stand Type*</label>
              <select
                defaultValue={"option"}
                onChange={(e) => setStandType(e.target.value)}
                className="form-control form-control-md">
                <option></option>
                <option vlaue="Residential">Residential</option>
                <option value="Business">Business</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
          </div>

          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Ward Number*</label>
              <input
                type="number"
                className="form-control"
                id="inputGroupPrepend2"
                aria-describedby="inputGroupPrepend2"
                placeholder="13"
                required
                onChange={(e) => setWardNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Suburb*</label>
              <input
                type="text"
                className="form-control"
                id="inputGroupPrepend2"
                aria-describedby="inputGroupPrepend2"
                placeholder="Alberton"
                required
                onChange={(e) => setSuburb(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">
                Municipal Account Number(optional)
              </label>
              <input
                type="text"
                name="000000"
                className="form-control"
                onChange={(e) => setMunicipalAccountNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Address*</label>
              <input
                type="text"
                name="90 Lever Road, Noordwyk, Midrand"
                className="form-control"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-2">
            <div className="form-group mb-3">
              <label className="text-label">Municipality*</label>
              <select
                defaultValue={"option"}
                onChange={(e) => setMunicipality(e.target.value)}
                className="form-control form-control-md">
                <option></option>
                <option vlaue="Makhado Local Municipality">
                  Makhado Local Municipality
                </option>
                <option value="Thulamela Local Municipality">
                  Thulamela Local Municipality
                </option>
                <option value="Collins Chabane Local Municipality">
                  Collins Chabane Local Municipality
                </option>
                <option value="Musina Local Municipality">
                  Musina Local Municipality
                </option>
              </select>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default StepTwo;
