import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      name
      surname
      idNumber
      email
      phoneNumber
      municipality
      status
      createdAt
    }
  }
`;

export const GET_APPLICATIONS = gql`
  query getApplications($userId: String!) {
    getApplications(userId: $userId) {
      id
      userId
      name
      surname
      email
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
      status
      createdAt
    }
  }
`;

export const GET_APPLICATIONS_SUPERUSER = gql`
  query getApplicationsSuperuser {
    getApplicationsSuperuser {
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
      houseHoldHead
      maritalStatus
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

export const GET_ALL_APPROVED_APPLICATIONS_SUPERUSER = gql`
  query getAllApprovedApplicationsSuperuser {
    getAllApprovedApplicationsSuperuser {
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
      houseHoldHead
      maritalStatus
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

export const GET_ALL_DECLINED_APPLICATIONS_SUPERUSER = gql`
  query getAllDeclinedApplicationsSuperuser {
    getAllDeclinedApplicationsSuperuser {
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
      houseHoldHead
      maritalStatus
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

export const GET_SUCCESSFUL_APPLICATIONS = gql`
  query getSuccessfulApplicationsCount($userId: String!) {
    getSuccessfulApplicationsCount(userId: $userId)
  }
`;

export const GET_FAILED_APPLICATIONS = gql`
  query getFailedApplicationsCount($userId: String!) {
    getFailedApplicationsCount(userId: $userId)
  }
`;

export const GET_ALL_APPLICATIONS = gql`
  query getAllApplicationsCount($userId: String!) {
    getAllApplicationsCount(userId: $userId)
  }
`;

export const GET_LATEST_APPLICATIONS = gql`
  query getLatestApplicationsCount($userId: String!) {
    getLatestApplicationsCount(userId: $userId)
  }
`;

export const GET_ALL_USER_APPLICATIONS = gql`
  query getAllUserApplicationsCount {
    getAllUserApplicationsCount
  }
`;

export const GET_ALL_APPROVED = gql`
  query getAllApprovedCount {
    getAllApprovedCount
  }
`;

export const GET_ALL_DECLINED = gql`
  query getAllDeclinedCount {
    getAllDeclinedCount
  }
`;

export const GET_APPROVED_MUNICIPALITY_APPLICATIONS_COUNT = gql`
  query getApprovedMunicipalityApplicationsCount($municipality: String!) {
    getApprovedMunicipalityApplicationsCount(municipality: $municipality)
  }
`;

export const GET_DECLINED_MUNICIPALITY_APPLICATIONS_COUNT = gql`
  query getDeclinedMunicipalityApplicationsCount($municipality: String!) {
    getDeclinedMunicipalityApplicationsCount(municipality: $municipality)
  }
`;

export const GET_PENDING_MUNICIPALITY_APPLICATIONS_COUNT = gql`
  query getPendingMunicipalityApplicationsCount($municipality: String!) {
    getPendingMunicipalityApplicationsCount(municipality: $municipality)
  }
`;

export const GET_TOTAL_MUNICIPALITY_APPLICATIONS_COUNT = gql`
  query getTotalMunicipalityApplicationsCount($municipality: String!) {
    getTotalMunicipalityApplicationsCount(municipality: $municipality)
  }
`;

export const GET_ALL_MUNICIPALITY_APPLICATIONS = gql`
  query getAllMunicipalityApplications($municipality: String!) {
    getAllMunicipalityApplications(municipality: $municipality) {
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
      houseHoldHead
      maritalStatus
      dependents
      bankStatement
      idBook
      wardNumber
      affidavid
      status
      reason
      createdAt
    }
  }
`;

export const GET_ALL_EXCEL_APPLICATIONS = gql`
  query getAllAxcelApplications {
    getAllExcelApplications {
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
      houseHoldHead
      maritalStatus
      dependents
      bankStatement
      idBook
      wardNumber
      affidavid
      status
      reason
      createdAt
    }
  }
`;

export const GET_ACTIVE_INDIGENTS = gql`
  query getActiveIndigents {
    getActiveIndigents {
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
      houseHoldHead
      maritalStatus
      dependents
      bankStatement
      idBook
      wardNumber
      affidavid
      status
      reason
      createdAt
    }
  }
`;
