import { LanguageProficiency } from '../../../apollo/types';

export interface InputValues {
  name: string;
  description: string;
  languages: LanguageProficiency[];
}
