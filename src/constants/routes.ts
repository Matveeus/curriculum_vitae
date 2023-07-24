export default {
  root: () => '/',
  login: () => '/login',
  register: () => '/register',
  employees: () => '/employees',
  employee: (id: string) => `/employees/${id}/profile`,
  employeeCv: (id: string) => `/employees/${id}/cvs`,
  employeeLanguages: (id: string) => `/employees/${id}/languages`,
  employeeSkills: (id: string) => `/employees/${id}/skills`,
  projects: () => '/projects',
  project: (id: string) => `/projects/${id}`,
  cvs: () => '/cvs',
  cv: (id: string) => `/cvs/${id}/details`,
  cvProjects: (id: string) => `/cvs/${id}/projects`,
  departments: () => '/departments',
  positions: () => '/positions',
  skills: () => '/skills',
  languages: () => '/languages',
};
