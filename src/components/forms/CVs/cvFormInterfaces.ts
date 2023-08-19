import { Language, LanguageProficiencyInput, Skill, SkillMasteryInput } from '../../../apollo/types';

export interface InputValues {
  name: string;
  description: string;
  languages: LanguageProficiencyInput[];
  skills: SkillMasteryInput[];
}

export interface QueryResult {
  languages: Language[];
  skills: Skill[];
}
