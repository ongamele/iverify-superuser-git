import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation createApplication(
    $userId: String
    $email: String
    $name: String
    $surname: String
    $phoneNumber: Int
    $address: String
    $postalCode: String
    $country: String
    $race: String
    $idNumber: String
    $houseHoldHead: Boolean
    $maritalStatus: String
    $dependents: Boolean
    $bankStatement: String
    $idBook: String
    $affidavid: String
    $gender: String
    $companyName: String
    $companyPhoneNumber: Int
    $companyEmail: String
    $income: String
    $sourceOfIncome: String
    $standType: String
    $suburb: String
    $wardNumber: String
    $municipality: String
    $municipalAccountNumber: String
    $companyRegNumber: String
    $companyType: String
    $applicantIdNumber: String
    $applicantName: String
    $applicantSurname: String
    $applicantPhoneNumber: Int
    $applicantRelationship: String
    $spauseIdNumber: String
    $spauseName: String
    $spauseSurname: String
    $sassaNumber: String
    $ageRange: String
    $status: String
    $applicationDate: String
  ) {
    createApplication(
      applicationInput: {
        userId: $userId
        name: $name
        surname: $surname
        email: $email
        phoneNumber: $phoneNumber
        address: $address
        postalCode: $postalCode
        country: $country
        race: $race
        idNumber: $idNumber
        houseHoldHead: $houseHoldHead
        maritalStatus: $maritalStatus
        dependents: $dependents
        bankStatement: $bankStatement
        idBook: $idBook
        affidavid: $affidavid
        gender: $gender
        companyName: $companyName
        companyPhoneNumber: $companyPhoneNumber
        companyEmail: $companyEmail
        income: $income
        sourceOfIncome: $sourceOfIncome
        standType: $standType
        suburb: $suburb
        wardNumber: $wardNumber
        municipality: $municipality
        municipalAccountNumber: $municipalAccountNumber
        companyRegNumber: $companyRegNumber
        companyType: $companyType
        applicantIdNumber: $applicantIdNumber
        applicantName: $applicantName
        applicantSurname: $applicantSurname
        applicantPhoneNumber: $applicantPhoneNumber
        applicantRelationship: $applicantRelationship
        spauseIdNumber: $spauseIdNumber
        spauseName: $spauseName
        spauseSurname: $spauseSurname
        sassaNumber: $sassaNumber
        ageRange: $ageRange
        status: $status
        applicationDate: $applicationDate
      }
    )
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $surname: String!
    $phoneNumber: String!
    $email: String!
    $idNumber: String!
  ) {
    createUser(
      registerInput: {
        name: $name
        surname: $surnaame
        phoneNumber: $phoneNumber
        email: $email
        idNumber: $idNumber
      }
    ) {
      id
      name
      surname
      phoneNumber
      email
      idNumber
      token
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      surname
      phoneNumber
      email
      idNumber
      token
      createdAt
    }
  }
`;

export const GET_SELECTED_APPLICATION = gql`
  mutation getSelectedApplication($id: String!) {
    getSelectedApplication(id: $id) {
      id
      userId
      name
      surname
      email
      phoneNumber
      idNumber
      address
      postalCode
      country
      municipality
      municipalAccountNumber
      race
      gender
      houseHoldHead
      maritalStatus
      wardNumber
      dependents
      bankStatement
      idBook
      affidavid
      status
      reason
      createdAt
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($id: String!, $password: String!) {
    updatePassword(id: $id, password: $password)
  }
`;
