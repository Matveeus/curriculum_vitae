import { gql } from '@apollo/client';

const USER_DATA = gql`
  fragment UserData on User {
    department_name
    position_name
    department {
      id
    }
    position {
      id
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
      id
      created_at
      email
      role
      cvs {
        id
        name
      }
      profile {
        ...ProfileData
      }
    }
  }
`;

export const UPDATE_USER = gql`
  ${USER_DATA}
  ${PROFILE_DATA}
  mutation UpdateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      ...UserData
      profile {
        ...ProfileData
      }
    }
  }
`;
