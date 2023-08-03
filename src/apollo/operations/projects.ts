import { gql } from '@apollo/client';

const PROJECT_DATA = gql`
  fragment ProjectData on Project {
    id
    name
    internal_name
    start_date
    end_date
    domain
  }
`;

export const GET_PROJECTS = gql`
  ${PROJECT_DATA}
  query GetProjects {
    projects {
      ...ProjectData
      team_size
    }
  }
`;

export const GET_PROJECT = gql`
  ${PROJECT_DATA}
  query GetProject($id: ID!) {
    project(id: $id) {
      ...ProjectData
      description
    }
  }
`;
