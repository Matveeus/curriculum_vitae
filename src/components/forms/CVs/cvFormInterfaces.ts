import { LanguageProficiencyInput, SkillMasteryInput } from '../../../apollo/types';

export interface InputValues {
  name: string;
  description: string;
  languages: LanguageProficiencyInput[];
  skills: SkillMasteryInput[];
}
