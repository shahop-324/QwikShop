import React, { useState } from 'react';
import {
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Divider,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import CalendarViewDayRoundedIcon from '@mui/icons-material/CalendarViewDayRounded';

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

const StorePreferences = () => {
  const dispatch = useDispatch();

  const { store, isUpdatingPreference } = useSelector((state) => state.store);

  const [mobileView, setMobileView] = useState('grid');

  const [enableHeaderSocialIcons, setEnableHeaderSocialIcons] = useState(false);
  const [enableEstimatedDeliveryTime, setEnableEstimatedDeliveryTime] = useState(false);

  return (
    <div>
      <div style={{ width: '100%' }} className="d-flex flex-row align-items-center justify-content-end mb-3">
        <a
          style={{ textDecoration: 'none' }}
          href={`https://qwikshop.online/${store.subName}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
            Preview
          </Button>
        </a>
      </div>

      <Stack direction="row" alignItems="center" justifyContent="start">
        <Typography sx={{ mr: 17, fontSize: '18px' }} variant="subtitle2">
          Show Social Icons in header
        </Typography>

        <FormControlLabel
          control={
            <IOSSwitch
              checked={enableHeaderSocialIcons}
              onChange={(e) => {
                setEnableHeaderSocialIcons(e.target.checked);
              }}
            />
          }
          label=""
        />
      </Stack>
      <Divider sx={{ my: 3 }} />

      <Stack direction="row" alignItems="center" justifyContent="start">
        <Typography sx={{ mr: 15, fontSize: '18px' }} variant="subtitle2">
          Show Estimated delivery time
        </Typography>

        <FormControlLabel
          control={
            <IOSSwitch
              checked={enableEstimatedDeliveryTime}
              onChange={(e) => {
                setEnableEstimatedDeliveryTime(e.target.checked);
              }}
            />
          }
          label=""
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      <FormControl sx={{ mb: 3 }}>
        <FormLabel sx={{ mb: 2 }} id="demo-row-radio-buttons-group-label">
          Type of mobile view
        </FormLabel>
        <RadioGroup
          value={mobileView}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value={'grid'}
            control={
              <Radio
                onClick={() => {
                  setMobileView('grid');
                }}
              />
            }
            label={
              <Stack direction={'row'} alignItem="center" spacing={2}>
                <GridViewRoundedIcon />
                <Typography variant="subtitle1">Grid</Typography>
              </Stack>
            }
          />
          <FormControlLabel
            sx={{ mx: 3 }}
            value={'list'}
            control={
              <Radio
                onClick={() => {
                  setMobileView('list');
                }}
              />
            }
            label={
              <Stack direction={'row'} alignItems="center" spacing={2}>
                <TableRowsRoundedIcon />
                <Typography variant="subtitle1">List</Typography>
              </Stack>
            }
          />
          <FormControlLabel
            value={'focus'}
            control={
              <Radio
                onClick={() => {
                  setMobileView('focus');
                }}
              />
            }
            label={
              <Stack direction={'row'} alignItems="center" spacing={2}>
                <CalendarViewDayRoundedIcon />
                <Typography variant="subtitle1">Focus</Typography>
              </Stack>
            }
          />
        </RadioGroup>
      </FormControl>
      <Divider sx={{ my: 3 }} />
      <Stack direction={'row'} alignItems="center" justifyContent={'end'}>
        <Button variant="contained" sx={{ maxWidth: 'max-content' }}>
          Update Preference
        </Button>
      </Stack>
    </div>
  );
};

export default StorePreferences;
