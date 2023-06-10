import { type User } from '~/entities/User';

const user: User = {
  username: 'Beshan Andrey',
  email: 'dqqq@gmail.com',
  id: 11
};
export const UserName = () => {
  return <div>{user ? user.username.slice(0, 1) : null}</div>;
};
