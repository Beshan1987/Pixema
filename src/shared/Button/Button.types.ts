export const ButtonStyleAppearance = {
  button: 'button',
  filter: 'filter',
  user: 'user',
  chevron: 'chevron',
  burger: 'burger',
  pagination: 'pagination'
};

export type ButtonStyleAppearances =
  (typeof ButtonStyleAppearance)[keyof typeof ButtonStyleAppearance];
