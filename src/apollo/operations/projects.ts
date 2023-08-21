import { gql } from '@apollo/client';

const PROJECT_DATA = gql`
  fragment ProjectData on Project {
    id
    name
    internal_name
    description
    start_date
    end_date
    domain
    team_size
    tech_stack {
      id
    }
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
  ${PROJECT_DATA}
  mutation createProject($project: ProjectInput!) {
    createProject(project: $project) {
      ...ProjectData
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      affected
    }
  }
`;
