export const ButtonStyleAppearance = {
  button: 'button',
  filter: 'filter',
  user: 'user'
};

export type ButtonStyleAppearances =
  (typeof ButtonStyleAppearance)[keyof typeof ButtonStyleAppearance];
