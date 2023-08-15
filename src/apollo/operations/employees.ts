import { gql } from '@apollo/client';

const USER_DATA = gql`
  fragment UserData on User {
    id
    created_at
    email
    role
    department_name
    position_name
    department {
      id
    }
    position {
      id
    }
    cvs {
      id
      name
    }
  }
`;

const PROFILE_DATA = gql`
  fragment ProfileData on Profile {
    id
    first_name
    last_name
    full_name
    avatar
    skills {
      skill_name
      mastery
    }
    languages {
      language_name
      proficiency
    }
  }
`;

export const GET_USERS = gql`
  ${USER_DATA}
  ${PROFILE_DATA}
  query GetUsers {
    users {
      ...UserData
      profile {
        ...ProfileData
      }
    }
  }
`;

export const GET_USER = gql`
  ${USER_DATA}
  ${PROFILE_DATA}
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserData
      profile {
        ...ProfileData
      }
    }
  }
`;

export const UPDATE_USER = gql`
  ${PROFILE_DATA}
  mutation UpdateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      department_name
      position_name
      department {
        id
      }
      position {
        id
      }
      profile {
        ...ProfileData
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      affected
    }
  }
`;
