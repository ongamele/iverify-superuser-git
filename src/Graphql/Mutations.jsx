import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation createApplication(
    $userId: String!
    $email: String!
    $name: String!
    $surname: String!
    $phoneNumber: String!
    $address: String!
    $postalCode: String
    $country: String!
    $municipalAcc: String
    $race: String!
    $houseHoldHead: Boolean
    $maritalStatus: String
    $dependents: Boolean
    $bankStatement: String
    $idBook: String
    $affidavid: String
    $gender: String!
    $companyName: String
    $companyPhoneNumber: String
    $companyEmail: String
    $occupation: String
    $income: Int
    $sourceOfIncome: String
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
        municipalAcc: $municipalAcc
        race: $race
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
        occupation: $occupation
        income: $income
        sourceOfIncome: $sourceOfIncome
      }
    ) {
      userId
      name
      surname
      phoneNumber
      address
      postalCode
      country
      municipalAcc
      race
      houseHoldHead
      maritalStatus
      dependents
      bankStatement
      idBook
      affidavid
    }
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
