import { LanguageProficiency, SkillMastery } from '../../../apollo/types';

export interface InputValues {
  name: string;
  description: string;
  languages: LanguageProficiency[];
  skills: SkillMastery[];
}
