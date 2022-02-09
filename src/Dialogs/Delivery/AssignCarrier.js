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
import { useSelector } from 'react-redux';
import ConfirmCarrier from './ConfirmCarrier';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AssignCarrier = ({ open, handleClose, id }) => {
  const [carrier, setCarrier] = useState('delhivery');

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
            options={pickupPoints.map((el) => ({ label: el.pickupPointName, value: el._id }))}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                {option.label}
              </Box>
            )}
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
                        disabled
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
                    <Chip label="coming soon" color="primary" />
                  </Stack>
                </Stack>
              </Card>
              <Card sx={{ p: 3, my: 3, width: '600px' }}>
                <Stack direction={'row'} alignItems="center" spacing={1}>
                  <FormControlLabel
                    value="delhivery"
                    control={
                      <Radio
                        checked={carrier === 'delhivery'}
                        onClick={() => {
                          setCarrier('delhivery');
                        }}
                      />
                    }
                    label=""
                  />
                  <Stack direction={'row'} alignItems="center" spacing={2}>
                    <img
                      src={
                        'https://multiplesequity.com/public/images/portfolio/delhivery-owler-20190909-132150-original-1578292717.png'
                      }
                      style={{ height: '120px' }}
                      alt="delivery"
                    />
                    <Typography variant="subtitle2">(Delhivery)</Typography>
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
          <Button variant="contained" onClick={handleOpenConfirmation}>
            {(() => {
              switch (carrier) {
                case 'self':
                  return 'Choose Self Delivery';

                case 'delhivery':
                  return 'Ship using Delhivery';

                default:
                  return '';
              }
            })()}
          </Button>
        </DialogActions>
      </Dialog>
      {openConfirmation && <ConfirmCarrier open={openConfirmation} handleClose={handleCloseConfirmation} id={id} />}
    </>
  );
};

export default AssignCarrier;
