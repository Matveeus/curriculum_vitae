import { gql } from '@apollo/client';

const CV_DATA = gql`
  fragment CVData on Cv {
    id
    name
    description
    user {
      id
      email
    }
    projects {
      id
      name
    }
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

export const GET_CVS = gql`
  ${CV_DATA}
  query GetCvs {
    cvs {
      ...CVData
    }
  }
`;

export const GET_CV = gql`
  ${CV_DATA}
  query GetCv($id: ID!) {
    cv(id: $id) {
      ...CVData
    }
  }
`;

export const UPDATE_CV = gql`
  mutation updateCv($id: ID!, $cv: CvInput!) {
    updateCv(id: $id, cv: $cv) {
      id
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
