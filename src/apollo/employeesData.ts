import { gql } from '@apollo/client';

export const GET_USERS_DATA = gql`
  query GetAllUsers {
    users {
      id
      created_at
      email
      is_verified
      profile {
        id
        first_name
        last_name
        full_name
        avatar
      }
      department_name
      position_name
      role
    }
  }
`;
