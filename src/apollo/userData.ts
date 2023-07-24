import { gql } from '@apollo/client';

export const AUTH = gql(`
query userData($id: ID!) {
    user(id: $id) {
    id
    created_at
    email
    is_verified
    profile {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        skill_name
        mastery
      }
      languages {
        language_name
        proficiency
      } 
    }
    cvs {
      id
      created_at
      name
      description
    }
    department {
      id
      created_at
      name
    }
    department_name
    position {
      id
      created_at
      name
    }
    position_name
    role
    }
  }
`);
