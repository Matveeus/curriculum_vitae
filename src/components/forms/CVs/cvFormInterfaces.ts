export interface InputValues {
  name: string;
  description: string;
}

export interface TextInputProps {
  name: 'name' | 'description';
  rows?: number;
}
