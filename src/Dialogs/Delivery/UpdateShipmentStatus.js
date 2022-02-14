import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Typography,
  Dialog,
  Slide,
  Button,
  Box,
  Divider,
  Chip,
  TextField,
  DialogActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import FilterFramesRoundedIcon from '@mui/icons-material/FilterFramesRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import MopedRoundedIcon from '@mui/icons-material/MopedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { updateShipment } from '../../actions';

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
  const dispatch = useDispatch();

  const { shipments } = useSelector((state) => state.shipment);

  const shipment = shipments.find((el) => el._id === id);

  const [AWBNumber, setAWBNumber] = useState(shipment.AWB);

  const [carrier, setCarrier] = useState(shipment.carrier || shipment.partner);

  let activeStep = 1;

  switch (shipment.status) {
    case 'Preparing for shipment':
      activeStep = 0;
      break;
    case 'Shipped':
      activeStep = 1;
      break;
    case 'In Transit':
      activeStep = 2;
      break;
    case 'Out for delivery':
      activeStep = 3;
      break;
    case 'Delivered':
      activeStep = 4;
      break;
    case 'Cancelled':
      activeStep = 5;
      break;
    default:
      break;
  }

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
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography variant="caption" sx={{ my: 4 }}>
            Note: Customers will be notified via SMS and email for shipment update
          </Typography>

          <Card sx={{ p: 3, mt: 3 }}>
            <Stack sx={{ mb: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="subtitle1">Shipped with</Typography>
              <Typography variant="subtitle2">{shipment.carrier}</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mb: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="subtitle1">Order Id</Typography>
              <Typography variant="subtitle2">{shipment.order.ref}</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mb: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="subtitle1">Shippment Id</Typography>
              <Typography variant="subtitle2">{shipment._id.toUpperCase()}</Typography>
            </Stack>
          </Card>

          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="body2">
              <TextField
                disabled={shipment.carrier !== 'self'}
                sx={{ mb: 3 }}
                type="text"
                label={'AWB Number'}
                name="awbNumber"
                fullWidth
                value={AWBNumber}
                onChange={(e) => {
                  setAWBNumber(e.target.value);
                }}
              />
              <TextField
                disabled={shipment.carrier !== 'self'}
                className="mb-2"
                type="text"
                label={'Shipping Partner'}
                name="carrier"
                fullWidth
                value={shipment.carrier !== 'self' ? carrier : shipment.carrier}
                onChange={(e) => {
                  setCarrier(e.target.value);
                }}
              />
            </Typography>
            <Stack direction={'row'} alignItems="center" justifyContent={'end'}>
              <Button
                disabled={shipment.carrier !== 'self'}
                onClick={() => {
                  dispatch(updateShipment({ AWB: AWBNumber, carrier }));
                }}
                sx={{ width: 'max-content' }}
                variant="contained"
              >
                Update
              </Button>
            </Stack>
          </Card>
        </Card>
        <DialogActions>
          <Box
            className="mb-2"
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            {(() => {
              switch (shipment.status) {
                case 'Preparing for shipment':
                  return (
                    <Button
                      onClick={() => {
                        dispatch(updateShipment({ status: 'Shipped' }, id));
                      }}
                      variant="contained"
                    >
                      Mark as Shipped
                    </Button>
                  );

                case 'Shipped':
                  return (
                    <Button
                      onClick={() => {
                        dispatch(updateShipment({ status: 'In Transit' }, id));
                      }}
                      variant="contained"
                    >
                      Mark as In Transit
                    </Button>
                  );

                case 'In Transit':
                  return (
                    <Button
                      onClick={() => {
                        dispatch(updateShipment({ status: 'Out for delivery' }, id));
                      }}
                      variant="contained"
                    >
                      Mark as Out for delivery
                    </Button>
                  );

                case 'Out for delivery':
                  return (
                    <Button
                      onClick={() => {
                        dispatch(updateShipment({ status: 'Delivered' }, id));
                      }}
                      variant="contained"
                    >
                      Mark as Delivered
                    </Button>
                  );

                case 'Delivered':
                  return (
                    <Chip label="This Shipment has been delivered successfully!" color="success" variant="outlined" />
                  );

                case 'Cancelled':
                  return <Chip label="This Shipment has been cancelled" color="error" variant="contained" />;

                default:
                  break;
              }
            })()}

            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateShipment;
