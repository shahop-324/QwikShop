/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';
// eslint-disable-next-line react/prop-types

// Phone Input
import 'react-phone-number-input/style.css';

// @mui
import { Box, Card, Grid, Dialog, TextField, Autocomplete, Button, Divider, Typography } from '@mui/material';

import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

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

const steps = ['Enter Campaign Name', 'Write Message', 'Select Audience', 'Pay and launch'];

const CreateSMSCampaign = ({ open, handleClose }) => {
  const [campaignName, setCampaignName] = useState('');

  const [discountCode, setDiscountCode] = useState('');

  const [activeStep, setActiveStep] = useState(0);

  const [customerCategory, setCustomerCategory] = useState();

  const [campaignMessage, setCampaignMessage] = useState();

  const handleNext = () => {
    setActiveStep((prev) => {
      if (prev * 1 <= 3) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevious = () => {
    setActiveStep((prev) => {
      if (prev * 1 >= 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className="pt-4 pb-5">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {(() => {
          switch (activeStep * 1) {
            case 0:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <TextField
                        name="campaignName"
                        label="Campaign Name"
                        fullWidth
                        value={campaignName}
                        onChange={(e) => {
                          setCampaignName(e.target.value);
                        }}
                      />
                    </Card>
                  </Grid>
                </Grid>
              );

            case 1:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <FormLabel className="mb-4" id="demo-radio-buttons-group-label">
                        Write Message
                      </FormLabel>

                      <TextField
                        name="campaignMessage"
                        label="Campaign Message"
                        fullWidth
                        value={campaignMessage}
                        onChange={(e) => {
                          setCampaignMessage(e.target.value);
                        }}
                      />
                    </Card>
                  </Grid>
                </Grid>
              );

            case 2:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                        }}
                      >
                        <Autocomplete
                          value={customerCategory}
                          onChange={(e, value) => {
                            setCustomerCategory(value);
                          }}
                          id=""
                          fullWidth
                          options={customerOptions}
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose customers"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              );

            case 3:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="body2">Campaign Charges:</Typography>
                        <Typography variant="subtitle1">Rs. 435 /-</Typography>
                      </Stack>
                      <Divider className="my-4" />
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="body2">Discount:</Typography>
                        <Typography variant="subtitle1">Rs. 45 /-</Typography>
                      </Stack>

                      <div
                        style={{ width: '100%', height: '10px', borderBottom: '1px dashed #212121' }}
                        className="my-4"
                      >
                        {' '}
                      </div>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="h6">Total Payable</Typography>
                        <Typography variant="subtitle1">Rs. 390 /-</Typography>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              );

            default:
              break;
          }
        })()}

        <Stack direction="row" spacing={3} justifyContent={'end'} alignItems={'center'} className="px-4 py-4">
          {activeStep * 1 !== 0 && (
            <Button
              onClick={() => {
                handlePrevious();
              }}
              variant="outlined"
            >
              Previous
            </Button>
          )}
          {activeStep * 1 !== 4 && (
            <Button
              onClick={() => {
                handleNext();
              }}
              variant="contained"
            >
              Next
            </Button>
          )}

          {activeStep * 1 === 4 && <Button variant="contained">Pay and Launch</Button>}

          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default CreateSMSCampaign;

const customerOptions = [{ label: 'All customers' }, { label: 'New customers' }, { label: 'Returning Customers' }];
