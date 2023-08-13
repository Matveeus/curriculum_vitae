import { gql } from '@apollo/client';

const CV_DATA = gql`
  fragment CVData on Cv {
    id
    name
    description
    user {
      email
    }
    projects {
      id
      name
    }
  }
`;

export const GET_CVS = gql`
  ${CV_DATA}
  query GetCvs {
    cvs {
      ...CVData
    }
  }
`;

export const DELETE_CV = gql`
  mutation DeleteCv($id: ID!) {
    deleteCv(id: $id) {
      affected
    }
  }
`;
