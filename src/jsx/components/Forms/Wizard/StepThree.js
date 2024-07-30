import React, { useState } from "react";

const StepThree = ({ sendDataToParent }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState();
  const [companyRegNumber, setCompanyRegNumber] = useState("");
  const [companyType, setCompanyType] = useState();

  const [householdHead, setHouseholdHead] = useState(false);
  const [dependent, setDependents] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  const [income, setIncome] = useState();
  const [sourceOfIncome, setSourceOfIncome] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [applicantIdNumber, setApplicantIdNumber] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantSurname, setApplicantSurname] = useState("");
  const [applicantPhoneNumber, setApplicantPhoneNumber] = useState();
  const [applicantRelationship, setApplicantRelationship] = useState("");

  const [spauseIdNumber, setSpauseIdNumber] = useState("");
  const [spauseName, setSpauseName] = useState("");
  const [spauseSurname, setSpauseSurname] = useState("");

  const [sassaNo, setSassaNo] = useState("");

  const data = {
    postalCode,
    companyName,
    companyEmail,
    householdHead,
    maritalStatus,
    dependent,
    companyPhoneNumber,
    income,
    sourceOfIncome,
  };
  sendDataToParent(data);

  const Source2 = () => (
    <section>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Company Name*</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Iverify"
              required
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Registration Number*</label>
            <input
              type="text"
              className="form-control"
              id="emial1"
              placeholder="example@example.com"
              required
              onChange={(e) => setCompanyRegNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Type Of Business*</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="(+27)408-657-907"
              required
              onChange={(e) => setCompanyType(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Company Phone Number*</label>
            <input
              type="number"
              name="phoneNumber"
              className="form-control"
              placeholder="(+27)408-657-907"
              required
              onChange={(e) => setCompanyPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );

  const Source3 = () => (
    <section>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Sassa Number*</label>
            <input
              type="text"
              name="sassaNo"
              className="form-control"
              placeholder="3544563"
              required
              onChange={(e) => setSassaNo(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );

  const Source1 = () => (
    <section>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Company Name*</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Iverify"
              required
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Company Email Address*</label>
            <input
              type="email"
              className="form-control"
              id="emial1"
              placeholder="example@example.com"
              required
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Company Phone Number*</label>
            <input
              type="number"
              name="phoneNumber"
              className="form-control"
              placeholder="(+27)408-657-907"
              required
              onChange={(e) => setCompanyPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section>
      <div className="row">
        <div className="col-lg-12 mb-3">
          <div className="form-group mb-3">
            <label className="text-label">Postal Code*</label>
            <input
              type="text"
              name="place"
              className="form-control"
              placeholder="1800"
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Household Head?*</label>
            <select
              defaultValue={"option"}
              onChange={(e) => setHouseholdHead(e.target.value)}
              className="form-control form-control-md">
              <option></option>
              <option vlaue="True">Yes</option>
              <option value="False">No</option>
            </select>
          </div>
        </div>
        {householdHead && (
          <section>
            <div className="row">
              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Applicant ID Number*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emial1"
                    placeholder="8358474832227"
                    required
                    onChange={(e) => setApplicantIdNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Applicant Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emial1"
                    placeholder="Noami Rampele"
                    required
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Applicant Surname*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emial1"
                    placeholder="Noami Rampele"
                    required
                    onChange={(e) => setApplicantSurname(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Applicant Cell Number*</label>
                  <input
                    type="number"
                    className="form-control"
                    id="emial1"
                    placeholder="083 465 7484"
                    required
                    onChange={(e) => setApplicantPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Relationship*</label>
                  <select
                    defaultValue={"option"}
                    onChange={(e) => setApplicantRelationship(e.target.value)}
                    className="form-control form-control-md">
                    <option></option>
                    <option vlaue="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Spause">Spause</option>
                    <option value="Relative">Relative</option>
                    <option value="Parent">Parent</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Household Dependants*</label>
            <select
              defaultValue={"option"}
              onChange={(e) => setDependents(e.target.value)}
              className="form-control form-control-md">
              <option></option>
              <option vlaue="True">Yes</option>
              <option value="False">No</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Income*</label>
            <input
              type="number"
              name="lastName"
              className="form-control"
              placeholder="R34 000"
              required
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Source Of Income*</label>
            <select
              defaultValue={"option"}
              onChange={(e) => setSourceOfIncome(e.target.value)}
              className="form-control form-control-md">
              <option></option>
              <option vlaue="Employed">Employed</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Sassa Beneficiary">Sassa Beneficiary</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        {sourceOfIncome === "Employed" && <Source1 />}
        {sourceOfIncome === "Self Employed" && <Source2 />}
        {sourceOfIncome === "Sassa Beneficiary" && <Source3 />}
        <div className="col-lg-6 mb-2">
          <div className="form-group mb-3">
            <label className="text-label">Marital Satus*</label>
            <select
              defaultValue={"option"}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="form-control form-control-md">
              <option></option>
              <option vlaue="Married">Married</option>
              <option value="Single">Single</option>
            </select>
          </div>
        </div>
        {maritalStatus == "Married" && (
          <section>
            <div className="row">
              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Spause ID Number*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emial1"
                    placeholder="8358474832227"
                    required
                    onChange={(e) => setSpauseIdNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Spause Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emial1"
                    placeholder="Noami "
                    required
                    onChange={(e) => setSpauseName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div className="form-group mb-3">
                  <label className="text-label">Spause Surname*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emial1"
                    placeholder="Rampele"
                    required
                    onChange={(e) => setSpauseSurname(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default StepThree;
