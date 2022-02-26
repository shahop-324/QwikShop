import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Card,
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  IconButton,
  DialogContent,
  DialogActions,
  DialogTitle,
  Slide,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Chip,
  Autocomplete,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { assignSelfShipping, showSnackbar, updateShipment } from '../../actions';
import ConfirmCarrier from './ConfirmCarrier';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AssignCarrier = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const [carrier, setCarrier] = useState('shiprocket');

  const { pickupPoints } = useSelector((state) => state.delivery);
  const { shipments } = useSelector((state) => state.shipment);

  const shipment = shipments.find((el) => el._id === id);

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [pickupPoint, setPickupPoint] = useState(null);

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{'Choose Carrier'}</DialogTitle>
        <DialogContent>
          <Autocomplete
            sx={{ mb: 3 }}
            value={pickupPoint}
            onChange={(e, value) => {
              setPickupPoint(value);
            }}
            id=""
            fullWidth
            options={pickupPoints
              .filter((el) => el.operational)
              .map((el) => ({ label: el.pickupPointName, value: el._id }))}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Pickup Point"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: '', // disable autocomplete and autofill
                }}
              />
            )}
          />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={carrier}
              name="radio-buttons-group"
            >
              <Card sx={{ p: 3, width: '600px' }}>
                <Stack direction={'row'} alignItems="center" spacing={1}>
                  <FormControlLabel
                    value="shiprocket"
                    control={
                      <Radio
                        checked={carrier === 'shiprocket'}
                        onClick={() => {
                          setCarrier('shiprocket');
                        }}
                      />
                    }
                    label=""
                  />
                  <Stack direction={'row'} alignItems="center" spacing={2}>
                    <img
                      src={'https://d2kh7o38xye1vj.cloudfront.net/wp-content/uploads/2019/01/Shiprocket.jpg'}
                      style={{ height: '120px' }}
                      alt="delivery"
                    />
                    <Typography variant="subtitle2">(Shiprocket)</Typography>
                  </Stack>
                </Stack>
              </Card>

              <Card sx={{ p: 3, width: '600px' }}>
                <Stack direction={'row'} alignItems="center" spacing={1}>
                  <FormControlLabel
                    value="self"
                    control={
                      <Radio
                        checked={carrier === 'self'}
                        onClick={() => {
                          setCarrier('self');
                        }}
                      />
                    }
                    label=""
                  />
                  <Stack direction={'row'} alignItems="center" spacing={2}>
                    <img
                      src={'http://www.jubileerestaurant.in/img/deliverybike.png'}
                      style={{ height: '120px' }}
                      alt="delivery"
                    />
                    <Typography variant="subtitle2">(Self Delivery)</Typography>
                  </Stack>
                </Stack>
              </Card>
            </RadioGroup>
          </FormControl>{' '}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (pickupPoint) {
                if (carrier === 'shiprocket') {
                  handleOpenConfirmation();
                } else {
                  dispatch(updateShipment({ carrier: 'self' }, id, handleClose));
                }
              } else {
                dispatch(showSnackbar('info', 'Please select a pickup point.'));
              }
            }}
          >
            {(() => {
              switch (carrier) {
                case 'self':
                  return 'Choose Self Delivery';

                case 'shiprocket':
                  return 'Deliver via Shiprocket';

                default:
                  return '';
              }
            })()}
          </Button>
        </DialogActions>
      </Dialog>
      {openConfirmation && (
        <ConfirmCarrier
          open={openConfirmation}
          handleClose={handleCloseConfirmation}
          id={id}
          pickupPoint={pickupPoint}
        />
      )}
    </>
  );
};

export default AssignCarrier;
