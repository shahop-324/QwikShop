/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

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
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import TextFormatRoundedIcon from '@mui/icons-material/TextFormatRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const CustomDropdownOptions = ({
  open,
  handleClose,
  options,
  handleAddOption,
  handleUpdateOption,
  handleDeleteOption,
}) => {
  const [openFieldTypes, setOpenFieldTypes] = useState(false);

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <Stack className="pe-4 pt-2" direction="row" alignItems={'center'} justifyContent={'space-between'}>
          <DialogTitle>Dropdown options</DialogTitle>
          <IconButton onClick={handleClose}>
            <CancelRoundedIcon />
          </IconButton>
        </Stack>

        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, position: 'relative' }}>
              {options.map((el, index) => (
                <>
                  <TextField
                    key={el.index}
                    sx={{ mb: 2 }}
                    name={`option${index}`}
                    label={`Option ${index * 1 + 1}`}
                    fullWidth
                    value={el.value}
                    onChange={(e) => {
                      handleUpdateOption(el.index, e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          {el.extra && (
                            <Button
                              onClick={() => {
                                handleDeleteOption(el.index);
                              }}
                              color={'error'}
                            >
                              Remove
                            </Button>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              ))}
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  handleAddOption();
                }}
              >
                Add Option
              </Button>
              <Stack sx={{ pt: 3 }} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Button variant="contained">Save Options</Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default CustomDropdownOptions;
