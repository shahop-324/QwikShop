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
//
import { useSelector } from 'react-redux';
import ReceiptIcon from '@mui/icons-material/Receipt';
import dateFormat from 'dateformat';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import OrderReceipt from '../../../../Dialogs/Order/OrderReceipt';

// ----------------------------------------------------------------------

export default function OrderDetails() {
  const { orders } = useSelector((state) => state.order);

  const [id, setId] = useState('');

  const [openReceipt, setOpenReceipt] = useState(false);

  const handleCloseReceipt = () => {
    setOpenReceipt(false);
  };

  const handleOpenReceipt = (id) => {
    setId(id);
    setOpenReceipt(true);
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
                      <TableCell>{row?.status}</TableCell>

                      <TableCell>
                        <Label
                          variant={'ghost'}
                          color={
                            (row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'
                          }
                        >
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
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}> </Box>
      </Card>
      {openReceipt && <OrderReceipt open={openReceipt} handleClose={handleCloseReceipt} id={id} />}
    </>
  );
}