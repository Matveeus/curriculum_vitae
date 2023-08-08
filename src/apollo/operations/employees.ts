import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      created_at
      email
      department_name
      position_name
      role
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
      profile {
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
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      profile {
        first_name
        last_name
        full_name
      }
      department {
        id
      }
      position {
        id
      }
    }
  }
`;
