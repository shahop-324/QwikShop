import '../../index.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PercentIcon from '@mui/icons-material/Percent';

// @mui
import { Grid, Container, Typography, Button, Divider } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import { DiscountWelcome, DiscountLessons } from '../../sections/@dashboard/general/discount/index';

// ----------------------------------------------------------------------

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function GeneralDiscount() {
  const { user } = useAuth();

  const { themeStretch } = useSettings();

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Setup QwikShop Delivery
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <DiscountWelcome displayName={user?.displayName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DiscountLessons />
          </Grid>

          <Grid item xs={12} md={8}>
            <div className="mt-5 px-4">
              <form>
                <TextField className="mb-4" fullWidth id="outlined-basic" label="Discount code" variant="outlined" />
                <FormLabel component="legend">Discount type</FormLabel>
                <RadioGroup className="mb-4" row aria-label="Discount type" name="row-radio-buttons-group">
                  <FormControlLabel value="Percentage" control={<Radio />} label="Percentage" />
                  <FormControlLabel value="Flat" control={<Radio />} label="Flat" />
                </RadioGroup>

                <TextField
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Discount Percentage"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Minimum order value"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Maximum discount"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Stack direction="row" spacing={4} alignItems="center">
                  <Typography>Show discount coupon on shop to customers?</Typography>
                  <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                </Stack>

                <div className="d-flex flex-row align-items-center justify-content-end">
                  <Button variant="outlined"> Create discount </Button>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="ticket">
              <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                <Typography variant="h5">HAPPY60</Typography>
                <Button>Share</Button>
              </div>
              <div style={{fontWeight: "500", fontSize: "0.9rem",textTransform: "capitalize"}} className='mb-2'>90% Off on all orders above Rs.80 upto Rs.30</div>
              <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                <div style={{fontWeight: "500", fontSize: "1.1rem",textTransform: "capitalize"}}>Times Used</div>
                <div style={{fontWeight: "500", fontSize: "1.1rem",textTransform: "capitalize"}}>Total Sales</div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                <div style={{fontWeight: "700", fontSize: "1.2rem",textTransform: "capitalize"}}>0</div>
                <div style={{fontWeight: "700", fontSize: "1.2rem",textTransform: "capitalize"}}>Rs. 0</div>
              </div>

              <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                <div style={{fontWeight: "500", fontSize: "1rem",textTransform: "capitalize"}}>Total Discounted</div> <div style={{fontWeight: "700", fontSize: "1.1rem",textTransform: "capitalize"}}>Rs. 0</div>
              </div>

              <Divider className='mb-3'/>
              <Stack
                direction="row"
                spacing={4}
                alignItems="center"
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <Typography>Status</Typography>
                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
