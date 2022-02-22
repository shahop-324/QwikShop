import { useState } from 'react';
import { sentenceCase } from 'change-case';
import {
  Box,
  Card,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
//
import { useSelector } from 'react-redux';
import ReceiptIcon from '@mui/icons-material/Receipt';
import dateFormat from 'dateformat';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import OrderReceipt from '../../../../Dialogs/Order/OrderReceipt';
import OrderTimeline from '../../../../Dialogs/Order/Timeline';

// ----------------------------------------------------------------------

export default function OrderDetails() {
  const { orders } = useSelector((state) => state.order);

  const [id, setId] = useState('');
  const [shipmentId, setShipmentId] = useState();
  const [scans, setScans] = useState();

  const [openReceipt, setOpenReceipt] = useState(false);
  const [openTimeline, setOpenTimeline] = useState(false);

  const handleCloseTimeline = () => {
    setOpenTimeline(false);
  };

  const handleOpenTimeline = (orderId, shipmentId, scans) => {
    setId(orderId);
    setShipmentId(shipmentId);
    setScans(scans);
    setOpenTimeline(true);
  };

  const handleCloseReceipt = () => {
    setOpenReceipt(false);
  };

  const handleOpenReceipt = (id) => {
    setId(id);
    setOpenReceipt(true);
  };

  let statusColor = 'info';
  let deliveryStatusColor = 'info';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        statusColor = 'warning';
        break;
      case 'Cancelled':
        statusColor = 'error';
        break;
      case 'Accepted':
        statusColor = 'success';
        break;
      case 'Rejected':
        statusColor = 'error';
        break;
      case 'Returned':
        statusColor = 'error';
        break;
      case 'Replaced':
        statusColor = 'info';
        break;
      case 'Requested Return':
        statusColor = 'warning';
        break;
      case 'Requested Replacement':
        statusColor = 'warning';
        break;

      default:
        break;
    }

    return statusColor;
  };

  const getDeliveryStatusColor = (deliveryStatus) => {
    switch (deliveryStatus) {
      case 'Preparing for shipment':
        deliveryStatusColor = 'info';
        break;
      case 'Shipped':
        deliveryStatusColor = 'info';
        break;
      case 'In Transit':
        deliveryStatusColor = 'info';
        break;
      case 'Out for delivery':
        deliveryStatusColor = 'warning';
        break;
      case 'Delivered':
        deliveryStatusColor = 'success';
        break;
      case 'Cancelled':
        deliveryStatusColor = 'error';
        break;

      default:
        break;
    }

    return deliveryStatusColor;
  };

  return (
    <>
      <Card>
        <CardHeader title="Orders" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Order Id</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Customer</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Delivery Status</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Total</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Timestamp</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Receipt</TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.length > 0 &&
                  orders?.map((row) => (
                    <TableRow key={row?._id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{row?.ref}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{row?.customer?.name}</TableCell>
                      <TableCell>
                        <Label variant={'ghost'} color={getStatusColor(row.status)}>
                          {row?.status}
                        </Label>
                      </TableCell>

                      <TableCell>
                        <Label variant={'ghost'} color={getDeliveryStatusColor(row.shipment.status)}>
                          {sentenceCase(row?.orderStatus)}
                        </Label>
                      </TableCell>

                      <TableCell sx={{ textTransform: 'capitalize' }}>Rs.{row?.charges?.total}</TableCell>

                      <TableCell align="center">
                        <Typography variant="caption">
                          {dateFormat(row?.createdAt, 'ddd mmm dS, yy hh:mm TT')}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Stack spacing={1} direction={'row'} alignItems="center">
                          <IconButton
                            onClick={() => {
                              handleOpenReceipt(row._id);
                            }}
                          >
                            <ReceiptIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                          </IconButton>
                          
                          <IconButton
                            onClick={() => {
                              handleOpenTimeline(row._id, row.shipment, row.scans);
                            }}
                          >
                            <TimelineIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}> </Box>
      </Card>
      {openReceipt && <OrderReceipt open={openReceipt} handleClose={handleCloseReceipt} id={id} />}
      {openTimeline && (
        <OrderTimeline
          open={openTimeline}
          handleClose={handleCloseTimeline}
          shipmentId={shipmentId}
          scans={scans}
          orderId={id}
        />
      )}
    </>
  );
}
