import { gql } from '@apollo/client';

const USER_DATA = gql`
  fragment UserData on User {
    id
    created_at
    email
    department_name
    position_name
    role
  }
`;

const PROFILE_DATA = gql`
  fragment ProfileData on Profile {
    id
    first_name
    last_name
    full_name
    avatar
  }
`;

export const GET_USERS = gql`
  ${USER_DATA}
  ${PROFILE_DATA}
  query GetUsers {
    users {
      ...UserData
      is_verified
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
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
      }
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
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
    }
  }
`;
