/* eslint-disable no-constant-condition */
// utils
import { useSelector } from 'react-redux';
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useSelector((state) => state.user);

  return (
    <Avatar
      src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${user?.image}`}
      alt={`${user?.firstName} ${user?.lastName}`}
      color={
        `https://qwikshop.s3.ap-south-1.amazonaws.com/${user?.image}`
          ? 'default'
          : createAvatar(`${user?.firstName} ${user?.lastName}`).color
      }
      {...other}
    >
      {createAvatar(`${user?.firstName} ${user?.lastName}`).name}
    </Avatar>
  );
}
