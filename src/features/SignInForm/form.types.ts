export interface FormState {
  email: string;
  password: string;
}

export type FormErrors = Partial<Record<keyof FormState, string>>;
