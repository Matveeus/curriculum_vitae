import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    email
    is_verified
    profile {
      id
      full_name
      avatar
    }
    role
  }
`;

export const SIGN_UP = gql`
  ${USER_FRAGMENT}
  mutation SignUpMutation($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        ...UserFragment
      }
      access_token
    }
  }
`;

export const LOGIN = gql`
  ${USER_FRAGMENT}
  query LogInQuery($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        ...UserFragment
      }
      access_token
    }
  }
`;
