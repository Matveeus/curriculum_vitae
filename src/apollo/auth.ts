import { gql } from '@apollo/client';

export const SIGN_UP = gql(`
mutation SignUpMutation($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`);

export const LOGIN = gql(`
query LogInQuery($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
    }
  }
`);
