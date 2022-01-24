import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
  Stack,
} from '@mui/material';
// utils
import { useSelector, useDispatch } from 'react-redux';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { fCurrency } from '../../../../utils/formatNumber';
// _mock
import { _bankingRecentTransitions } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';

import NoOrder from "../../../../assets/shopping-basket.png";
import {fetchRecentOrder} from "../../../../actions";

// ----------------------------------------------------------------------

export default function BankingRecentTransitions({link, storeName}) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLight = theme.palette.mode === 'light';

  const { recentOrders } = useSelector((state) => state.order);

  useEffect(() => {
dispatch(fetchRecentOrder());
  }, []);

  return (
    <>
      <Card>
        <CardHeader title="Recent Orders" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ position: 'relative' }}>
                          {renderAvatar(row.category, row.avatar)}
                          <Box
                            sx={{
                              right: 0,
                              bottom: 0,
                              width: 18,
                              height: 18,
                              display: 'flex',
                              borderRadius: '50%',
                              position: 'absolute',
                              alignItems: 'center',
                              color: 'common.white',
                              bgcolor: 'error.main',
                              justifyContent: 'center',
                              ...(row.type === 'Income' && {
                                bgcolor: 'success.main',
                              }),
                            }}
                          >
                            <Iconify
                              icon={
                                row.type === 'Income'
                                  ? 'eva:diagonal-arrow-left-down-fill'
                                  : 'eva:diagonal-arrow-right-up-fill'
                              }
                              width={16}
                              height={16}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.message}
                          </Typography>
                          <Typography variant="subtitle2"> {row.category}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{format(new Date(row.date), 'dd MMM yyyy')}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {format(new Date(row.date), 'p')}
                      </Typography>
                    </TableCell>

                    <TableCell>{fCurrency(row.amount)}</TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.status === 'completed' && 'success') ||
                          (row.status === 'in_progress' && 'warning') ||
                          'error'
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>

                    <TableCell align="right">
                      <MoreMenuButton />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!(typeof recentOrders !== 'undefined' && recentOrders.length > 0) &&  <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
            <Card sx={{p:3, my: 3}}>
              <img style={{height: "150px", width: "150px"}} src={NoOrder} alt="no active order"/>
            </Card>
            <Typography sx={{mb: 3}} variant="subtitle2">Please share your store to get orders</Typography>
            <Stack direction="row" spacing={2} sx={{mb: 3}}>
          <IconButton>
            <WhatsappShareButton url={link} title={storeName} separator=":">
              {' '}
              <WhatsappIcon round size={35} />{' '}
            </WhatsappShareButton>
          </IconButton>
          <IconButton>
            <FacebookShareButton url={link} quote={storeName}>
              <FacebookIcon round size={35} />
            </FacebookShareButton>
          </IconButton>
          <IconButton>
            <TelegramShareButton url={link} title={storeName}>
              <TelegramIcon round size={35} />
            </TelegramShareButton>
          </IconButton>
          <IconButton>
            <TwitterShareButton url={link} title={storeName}>
              <TwitterIcon round size={35} />
            </TwitterShareButton>
          </IconButton>
        </Stack>
          </Stack>}
          
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

AvatarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

function AvatarIcon({ icon }) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(category, avatar) {
  if (category === 'Books') {
    return <AvatarIcon icon={'eva:book-fill'} />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon={'eva:heart-fill'} />;
  }
  return avatar ? (
    <Avatar alt={category} src={avatar} sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }} />
  ) : null;
}

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
