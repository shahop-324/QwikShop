// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  
  let user;

  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
