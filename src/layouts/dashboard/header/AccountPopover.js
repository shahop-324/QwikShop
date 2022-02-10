import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { useDispatch, useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { logout } from '../../../actions';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'My Profile',
    linkTo: '/',
  },
  {
    label: 'Store Profile',
    linkTo: '/',
  },
  {
    label: 'Facebook Group',
    linkTo: PATH_DASHBOARD.catalouge.category,
  },
  {
    label: 'Referral',
    linkTo: PATH_DASHBOARD.catalouge.category,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.user);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
