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
    $deceased: String
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
        deceased: $deceased
        applicationDate: $applicationDate
      }
    )
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $surname: String!
    $phoneNumber: Int!
    $email: String!
    $idNumber: String!
    $municipality: String!
    $password: String!
  ) {
    createUser(
      registerInput: {
        name: $name
        surname: $surname
        phoneNumber: $phoneNumber
        email: $email
        idNumber: $idNumber
        municipality: $municipality
        password: $password
      }
    ) {
      id
      name
      surname
      phoneNumber
      email
      idNumber
      createdAt
    }
  }
`;

export const LOGIN_SUPERUSER = gql`
  mutation loginSuperuser($email: String!, $password: String!) {
    loginSuperuser(email: $email, password: $password)
  }
`;
