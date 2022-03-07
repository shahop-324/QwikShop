/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Link } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  Button,
  Divider,
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
import dateFormat from 'dateformat';
import OrderReceipt from '../../../../Dialogs/Order/OrderReceipt';

// _mock

// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

import NoOrder from '../../../../assets/shopping-basket.png';
import { fetchProducts, fetchRecentOrder, fetchOrders } from '../../../../actions';

// ----------------------------------------------------------------------

export default function BankingRecentTransitions({ link, storeName }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isLight = theme.palette.mode === 'light';

  const { recentOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchRecentOrder());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, []);

  const [id, setId] = useState('');

  const [openReceipt, setOpenReceipt] = useState(false);

  const handleCloseReceipt = () => {
    setOpenReceipt(false);
  };

  const handleOpenReceipt = (id) => {
    setId(id);
    setOpenReceipt(true);
  };

  const findColor = (status) => {
    let color = 'info';
    switch (status) {
      case 'Pending':
        color = 'warning';
        break;
      case 'Cancelled':
        color = 'error';
        break;
      case 'Accepted':
        color = 'success';
        break;
      case 'Rejected':
        color = 'error';
        break;
      case 'Requested Return':
        color = 'info';
        break;
      case 'Requested Replacement':
        color = 'info';
        break;
      case 'Returned':
        color = 'error';
        break;
      case 'Replaced':
        color = 'info';
        break;

      default:
        break;
    }

    return color;
  }

  return (
    <>
      <Card>
        <CardHeader title="Recent Orders" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell>
                      <Typography variant="caption">{row?.ref}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">
                        {dateFormat(new Date(row?.createdAt || Date.now()), 'ddd mmm yy')}
                      </Typography>
                    </TableCell>

                    <TableCell>Rs.{row?.charges?.total}</TableCell>

                    <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={findColor(row?.status)}
                      >
                        {sentenceCase(row?.status)}
                      </Label>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          handleOpenReceipt(row._id);
                        }}
                      >
                        <ReceiptIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!(typeof recentOrders !== 'undefined' && recentOrders.length > 0) && (
            <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
              <Card sx={{ p: 3, my: 3 }}>
                <img style={{ height: '150px', width: '150px' }} src={NoOrder} alt="no active order" />
              </Card>
              <Typography sx={{ mb: 3 }} variant="subtitle2">
                Please share your store to get orders
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
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
            </Stack>
          )}
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Link to="/dashboard/order/list">
            <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
              View All
            </Button>
          </Link>
        </Box>
      </Card>
      {openReceipt && <OrderReceipt open={openReceipt} handleClose={handleCloseReceipt} id={id} />}
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


// ----------------------------------------------------------------------