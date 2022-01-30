import React, { useState } from 'react';
import { Card, Grid, TextField, Dialog, DialogTitle, Button, Stack, Autocomplete, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { creatEmailCampaign } from '../actions';

const CreateEmailCampaign = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { isCreating } = useSelector((state) => state.marketing);

  const [campaignName, setCampaignName] = useState('');
  const [customerCategory, setCustomerCategory] = useState();

  const onSubmit = () => {
    const formValues = { name: campaignName, customer: customerCategory };

    dispatch(creatEmailCampaign(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Create Email campaign</DialogTitle>

        <Grid className="px-4 py-3" container spacing={3}>
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
                <TextField
                  name="campaignName"
                  label="Campaign Name"
                  fullWidth
                  value={campaignName}
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                  }}
                />
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

        <Stack direction="row" spacing={3} justifyContent={'end'} alignItems={'center'} className="px-4 py-4">
          <LoadingButton
            loading={isCreating}
            onClick={() => {
              onSubmit();
            }}
            variant="contained"
          >
            Create campaign
          </LoadingButton>

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

export default CreateEmailCampaign;

const customerOptions = [
  { label: 'All customers' },
  { label: 'New customers' },
  { label: 'Returning Customers' },
  { label: 'Abondened customers' },
  { label: 'No sales customers' },
  { label: 'Imported customers' },
  { label: 'Custom customers' },
];