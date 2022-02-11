import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Grid,
  Card,
  Stack,
  TextField,
} from '@mui/material';

import { UploadAvatar } from '../../components/upload';
import { fData } from '../../utils/formatNumber';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{'My Profile'}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '600px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Change Password" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {/* Profile Form => Name, Email, Phone, Image */}
              <Grid className="pt-3" container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ py: 3, px: 3 }}>
                    <Typography className="mb-4 text-center" variant="h6">
                      Image
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <UploadAvatar
                        name="avatarUrl"
                        accept="image/*"
                        maxSize={3145728}
                        // onDrop={handleDrop}
                        // file={fileToPreview}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /> max size of {fData(3145728)}
                          </Typography>
                        }
                      />
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                      }}
                    >
                      <TextField required name="name" label="Full Name" fullWidth />
                      <TextField required name="email" label="Email" fullWidth />
                      <TextField required name="phone" label="Contact No." fullWidth />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* Change Password => Current Password, New Password, Confirm New password */}
              <Grid className="pt-3" container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                      }}
                    >
                      <TextField required name="currentPassword" label="Current Password" fullWidth />
                      <TextField required name="newPassword" label="New Password" fullWidth />
                      <TextField required name="confirmNewPassword" label="Confirm New Password" fullWidth />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
