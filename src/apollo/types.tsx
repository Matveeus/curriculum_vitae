export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Void: { input: any; output: any };
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthResult = {
  __typename?: 'AuthResult';
  access_token: Scalars['String']['output'];
  user: User;
};

export type AvatarInput = {
  base64: Scalars['String']['input'];
  size: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

export type CreateUserInput = {
  auth: AuthInput;
  cvsIds: Array<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  positionId?: InputMaybe<Scalars['ID']['input']>;
  profile: ProfileInput;
  role: Scalars['String']['input'];
};

export type Cv = {
  __typename?: 'Cv';
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_template: Scalars['Boolean']['output'];
  languages: Array<LanguageProficiency>;
  name: Scalars['String']['output'];
  projects?: Maybe<Array<Project>>;
  skills: Array<SkillMastery>;
  user?: Maybe<User>;
};

export type CvInput = {
  description: Scalars['String']['input'];
  is_template: Scalars['Boolean']['input'];
  languages: Array<LanguageProficiencyInput>;
  name: Scalars['String']['input'];
  projectsIds: Array<Scalars['ID']['input']>;
  skills: Array<SkillMasteryInput>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type DeleteResult = {
  __typename?: 'DeleteResult';
  affected: Scalars['Int']['output'];
};

export type Department = {
  __typename?: 'Department';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type DepartmentInput = {
  name: Scalars['String']['input'];
};

export type Language = {
  __typename?: 'Language';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  iso2: Scalars['String']['output'];
  name: Scalars['String']['output'];
  native_name?: Maybe<Scalars['String']['output']>;
};

export type LanguageInput = {
  iso2: Scalars['String']['input'];
  name: Scalars['String']['input'];
  native_name?: InputMaybe<Scalars['String']['input']>;
};

export type LanguageProficiency = {
  __typename?: 'LanguageProficiency';
  language_name: Scalars['String']['output'];
  proficiency: Scalars['String']['output'];
};

export type LanguageProficiencyInput = {
  language_name: Scalars['String']['input'];
  proficiency: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCv: Cv;
  createDepartment: Department;
  createLanguage: Language;
  createPosition: Position;
  createProject: Project;
  createSkill: Skill;
  createUser: User;
  deleteAvatar?: Maybe<Scalars['Void']['output']>;
  deleteCv: DeleteResult;
  deleteDepartment: DeleteResult;
  deleteLanguage: DeleteResult;
  deletePosition: DeleteResult;
  deleteProject: DeleteResult;
  deleteSkill: DeleteResult;
  deleteUser: DeleteResult;
  signup: AuthResult;
  unbindCv: Cv;
  updateCv: Cv;
  updateDepartment: Department;
  updateLanguage: Language;
  updatePosition: Position;
  updateProject: Project;
  updateSkill: Skill;
  updateUser: User;
  uploadAvatar: Scalars['String']['output'];
};

export type MutationCreateCvArgs = {
  cv: CvInput;
};

export type MutationCreateDepartmentArgs = {
  department: DepartmentInput;
};

export type MutationCreateLanguageArgs = {
  language: LanguageInput;
};

export type MutationCreatePositionArgs = {
  position: PositionInput;
};

export type MutationCreateProjectArgs = {
  project: ProjectInput;
};

export type MutationCreateSkillArgs = {
  skill: SkillInput;
};

export type MutationCreateUserArgs = {
  user: CreateUserInput;
};

export type MutationDeleteAvatarArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteCvArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteDepartmentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteLanguageArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeletePositionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteSkillArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSignupArgs = {
  auth: AuthInput;
};

export type MutationUnbindCvArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateCvArgs = {
  cv: CvInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateDepartmentArgs = {
  department: DepartmentInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateLanguageArgs = {
  id: Scalars['ID']['input'];
  language: LanguageInput;
};

export type MutationUpdatePositionArgs = {
  id: Scalars['ID']['input'];
  position: PositionInput;
};

export type MutationUpdateProjectArgs = {
  id: Scalars['ID']['input'];
  project: ProjectInput;
};

export type MutationUpdateSkillArgs = {
  id: Scalars['ID']['input'];
  skill: SkillInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  user: UpdateUserInput;
};

export type MutationUploadAvatarArgs = {
  avatar: AvatarInput;
  id: Scalars['ID']['input'];
};

export type Position = {
  __typename?: 'Position';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type PositionInput = {
  name: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  languages: Array<LanguageProficiency>;
  last_name?: Maybe<Scalars['String']['output']>;
  skills: Array<SkillMastery>;
};

export type ProfileInput = {
  first_name?: InputMaybe<Scalars['String']['input']>;
  languages?: InputMaybe<Array<LanguageProficiencyInput>>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<SkillMasteryInput>>;
};

export type Project = {
  __typename?: 'Project';
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  domain: Scalars['String']['output'];
  end_date?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  internal_name?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  start_date: Scalars['String']['output'];
  team_size: Scalars['Int']['output'];
  tech_stack?: Maybe<Array<Skill>>;
};

export type ProjectInput = {
  description: Scalars['String']['input'];
  domain: Scalars['String']['input'];
  end_date?: InputMaybe<Scalars['String']['input']>;
  internal_name?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  skillsIds: Array<Scalars['ID']['input']>;
  start_date: Scalars['String']['input'];
  team_size: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  cv: Cv;
  cvs: Array<Cv>;
  departments: Array<Department>;
  languages: Array<Maybe<Language>>;
  login: AuthResult;
  position: Position;
  positions: Array<Position>;
  project: Project;
  projects: Array<Project>;
  skills: Array<Skill>;
  user: User;
  users: Array<User>;
};

export type QueryCvArgs = {
  id: Scalars['ID']['input'];
};

export type QueryLoginArgs = {
  auth: AuthInput;
};

export type QueryPositionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};

export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Skill = {
  __typename?: 'Skill';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SkillInput = {
  name: Scalars['String']['input'];
};

export type SkillMastery = {
  __typename?: 'SkillMastery';
  mastery: Scalars['String']['output'];
  skill_name: Scalars['String']['output'];
};

export type SkillMasteryInput = {
  mastery: Scalars['String']['input'];
  skill_name: Scalars['String']['input'];
};

export type UpdateUserInput = {
  cvsIds?: InputMaybe<Array<Scalars['String']['input']>>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  positionId?: InputMaybe<Scalars['ID']['input']>;
  profile: ProfileInput;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String']['output'];
  cvs?: Maybe<Array<Cv>>;
  department?: Maybe<Department>;
  department_name?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_verified: Scalars['Boolean']['output'];
  position?: Maybe<Position>;
  position_name?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  role: Scalars['String']['output'];
};
