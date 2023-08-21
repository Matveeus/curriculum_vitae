import { Dayjs } from 'dayjs';

export interface InputValues {
  name: string;
  internalName: string;
  description: string;
  domain: string;
  teamSize: number;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface TextInputProps {
  name: 'name' | 'internalName' | 'description' | 'domain';
  isRequired: boolean;
  rows?: number;
}

export interface NumberInputProps {
  name: 'teamSize';
}

export interface DateInputProps {
  name: 'startDate' | 'endDate';
}
