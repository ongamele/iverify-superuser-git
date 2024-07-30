import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
  query getApplications($userId: String!) {
    getApplications(userId: $userId) {
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

export const GET_ALL_APPROVED_APPLICATIONS = gql`
  query getAllApprovedApplications($userId: String!) {
    getAllApprovedApplications(userId: $userId) {
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

export const GET_ALL_DECLINED_APPLICATIONS = gql`
  query getAllDeclinedApplications($userId: String!) {
    getAllDeclinedApplications(userId: $userId) {
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

export const GET_SUCCESSFUL_APPLICATIONS_COUNT = gql`
  query getSuccessfulApplicationsCount($userId: String!) {
    getSuccessfulApplicationsCount(userId: $userId)
  }
`;

export const GET_FAILED_APPLICATIONS_COUNT = gql`
  query getFailedApplicationsCount($userId: String!) {
    getFailedApplicationsCount(userId: $userId)
  }
`;

export const GET_ALL_APPLICATIONS_COUNT = gql`
  query getAllApplicationsCount($userId: String!) {
    getAllApplicationsCount(userId: $userId)
  }
`;

export const GET_LATEST_APPLICATIONS_COUNT = gql`
  query getLatestApplicationsCount($userId: String!) {
    getLatestApplicationsCount(userId: $userId)
  }
`;
