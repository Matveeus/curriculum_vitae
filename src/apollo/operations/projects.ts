import { gql } from '@apollo/client';

const PROJECT_DATA = gql`
  fragment ProjectData on Project {
    id
    name
    internal_name
    start_date
    end_date
    domain
    team_size
  }
`;

export const GET_PROJECTS = gql`
  ${PROJECT_DATA}
  query GetProjects {
    projects {
      ...ProjectData
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

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, $project: ProjectInput!) {
    updateProject(id: $id, project: $project) {
      id
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($project: ProjectInput!) {
    createProject(project: $project) {
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
      }
    }
  }
`;
