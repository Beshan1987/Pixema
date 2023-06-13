export const CardStyleAppearance = {
  default: 'default',
  ['long title']: 'long title',
  favourites: 'favourites',
  trend: 'trend'
};

export type CardStyleAppearances =
  (typeof CardStyleAppearance)[keyof typeof CardStyleAppearance];
