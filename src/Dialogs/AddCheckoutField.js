import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Autocomplete,
  Stack,
  Typography,
  FormControlLabel,
  IconButton,
  Button,
  Switch,
} from '@mui/material';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import TextFormatRoundedIcon from '@mui/icons-material/TextFormatRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { v4 as uuidv4 } from 'uuid';
import CustomDropdownOptions from './CustomDropdownOptions';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const AddCheckoutField = ({ open, handleClose }) => {
  const [openOptions, setOpenOptions] = useState(false);

  const [fieldName, setFieldName] = useState('');

  const [type, setType] = useState('');

  const [required, setRequired] = useState(true);

  const [options, setOptions] = useState([
    { index: '111', value: '' },
    { index: '222', value: '' },
  ]);

  const handleOpenOptions = () => {
    setOpenOptions(true);
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, { index: uuidv4(), value: '', extra: true }]);
  };

  const handleDeleteOption = (index) => {
    setOptions((prev) => prev.filter((el) => el.index !== index));
  };

  const handleUpdateOption = (index, value) => {
    setOptions((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }

        el.value = value;
        return el;
      })
    );
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <Stack className="pe-4 pt-2" direction="row" alignItems={'center'} justifyContent={'space-between'}>
          <DialogTitle>Add Custom field</DialogTitle>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon />
          </IconButton>
        </Stack>

        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, mb: 2 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                  name="fieldName"
                  label="Field Name"
                  fullWidth
                  value={fieldName}
                  onChange={(e) => {
                    setFieldName(e.target.value);
                  }}
                />

                <Autocomplete
                  value={type || null}
                  onChange={(e, value) => {
                    setType(value);
                  }}
                  id=""
                  fullWidth
                  options={fieldTypes}
                  autoHighlight
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        {option.icon}
                        <Stack direction={'column'} spacing={1}>
                          <Typography variant="subtitle1">{option.title}</Typography>
                          <Typography variant="caption">{option.description}</Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Field Type"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Box>
              <Button className="mt-2" onClick={handleOpenOptions}>
                Edit Dropdown option
              </Button>
            </Card>

            <Card sx={{ p: 3, position: 'relative' }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant="subtitle1">Required?</Typography>
                  <Typography variant="caption">
                    This will make this field mandatory and customers will be forced to fill this field.
                  </Typography>
                </Stack>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={required}
                      onChange={(e, value) => setRequired(value)}
                      sx={{ m: 1 }}
                      defaultChecked
                    />
                  }
                  label=""
                />
              </Stack>
            </Card>

            <Stack sx={{ px: 4, py: 3 }} direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={3}>
              <Button variant="contained">Add Field</Button>
              <Button>Close</Button>
            </Stack>
          </Grid>
        </Grid>
      </Dialog>
      {openOptions && (
        <CustomDropdownOptions
          open={openOptions}
          handleClose={handleCloseOptions}
          options={options}
          handleAddOption={handleAddOption}
          handleDeleteOption={handleDeleteOption}
          handleUpdateOption={handleUpdateOption}
        />
      )}
    </>
  );
};

export default AddCheckoutField;

const fieldTypes = [
  {
    index: 123,
    icon: <EmailRoundedIcon style={{ fontSize: '24' }} />,
    title: 'Email',
    description: 'Tickets, Invoices, Digital Services etc.',
  },
  {
    index: 1223923,
    icon: <EventRoundedIcon style={{ fontSize: '24' }} />,
    title: 'Date Picker',
    description: 'Appointment, Scheduling, Start date, End date, etc.',
  },
  {
    index: 123373,
    icon: <AccessTimeRoundedIcon style={{ fontSize: '24' }} />,
    title: 'Time Picker',
    description: 'Delivery time, Pickup time, Start time, end Time',
  },
  {
    index: 12829,
    icon: <PhotoRoundedIcon style={{ fontSize: '24' }} />,
    title: 'Image Picker',
    description: 'Medical prescription, image, screenshot, etc.',
  },
  {
    index: 30032,
    icon: <TextFormatRoundedIcon style={{ fontSize: '24' }} />,
    title: 'Text Field',
    description: 'Additional requirements, cooking instructions, landmark, etc.',
  },
  {
    index: 392782,
    icon: <ArrowDropDownCircleRoundedIcon style={{ fontSize: '24' }} />,
    title: 'Custom Dropdown',
    description: 'For adding multiple options regarding delivery, order, etc.',
  },
];
