import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Typography, Dialog, Slide, Button, Box, Divider, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

import FilterFramesRoundedIcon from '@mui/icons-material/FilterFramesRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import MopedRoundedIcon from '@mui/icons-material/MopedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <FilterFramesRoundedIcon />,
    2: <LocalShippingRoundedIcon />,
    3: <AddRoadRoundedIcon />,
    4: <MopedRoundedIcon />,
    5: <CheckCircleRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Preparing for shipment', 'Shipped', 'In Transit', 'Out for delivery', 'Delivered'];

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const UpdateShipment = ({ open, handleClose, id }) => {
  const [trackingLink, setTrackingLink] = useState('');

  const { shipments } = useSelector((state) => state.shipment);

  const shipment = shipments.find((el) => el._id === id);

  return (
    <>
      <Dialog
        width="600px"
        maxWidth={'lg'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Card sx={{ width: '700px', p: 4 }}>
          <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Card sx={{ p: 3, mt: 3 }}>
            <Stack sx={{ mb: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="subtitle1">Shipped with</Typography>
              <Typography variant="subtitle2">Self Delivery</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mb: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="subtitle1">Order Id</Typography>
              <Typography variant="subtitle2">AUWJIU937KJHI992</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mb: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="subtitle1">Shippment Id</Typography>
              <Typography variant="subtitle2">UYUY9272782</Typography>
            </Stack>
          </Card>

          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="body2">
              <TextField
                className="mb-2"
                type="text"
                label={'Tracking Link'}
                name="trackingLink"
                fullWidth
                value={trackingLink}
                onChange={(e) => {
                  setTrackingLink(e.target.value);
                }}
              />
              
            </Typography>
            <Stack direction={"row"} alignItems="center" justifyContent={"end"}>
                <Button sx={{width: 'max-content'}} variant='contained'>Update</Button>
            </Stack>
          </Card>

          <Card sx={{ p: 3, mt: 3 }}>
            <Box
              className="mb-2"
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Button variant="contained">Mark as In Transit</Button>
              <Button variant="outlined">Close</Button>
            </Box>
          </Card>
        </Card>
      </Dialog>
    </>
  );
};

export default UpdateShipment;
