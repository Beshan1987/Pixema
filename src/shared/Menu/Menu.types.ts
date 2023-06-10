export const MenuStyleAppearance = {
  desktop: 'desktop',
  tablet: 'tablet'
};

export type MenuStyleAppearance =
  (typeof MenuStyleAppearance)[keyof typeof MenuStyleAppearance];
