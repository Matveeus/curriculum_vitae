import { gql } from '@apollo/client';

export const GET_SELECT_LISTS = gql`
  query GetSelectLists {
    departments {
      id
      name
    }
    positions {
      id
      name
    }
  }
`;
