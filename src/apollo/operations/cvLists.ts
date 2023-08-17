import { gql } from '@apollo/client';

export const GET_CV_LISTS = gql`
  query GetCvLists {
    languages {
      id
      name
    }
    skills {
      id
      name
    }
  }
`;
