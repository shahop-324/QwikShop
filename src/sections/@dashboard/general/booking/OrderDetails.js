import { useState } from 'react';
import { sentenceCase } from 'change-case';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
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
import CloudDownloadRounded from '@mui/icons-material/CloudDownloadRounded';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import EditCustomer from '../../../../Dialogs/Customer/EditCustomer';
import DeleteCustomer from '../../../../Dialogs/Customer/DeleteCustomer';
import SMSCustomer from '../../../../Dialogs/Customer/SMSCustomer';
import PreviewCustomer from '../../../../Dialogs/Customer/PreviewCustomer';
import OrderReceipt from '../../../../Dialogs/Order/OrderReceipt';

// ----------------------------------------------------------------------

export default function OrderDetails() {
  const { orders } = useSelector((state) => state.order);

  const [id, setId] = useState('');

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSMS, setOpenSMS] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

  const [openReceipt, setOpenReceipt] = useState(false);

  const handleCloseReceipt = () => {
    setOpenReceipt(false);
  };

  const handleOpenReceipt = (id) => {
    setId(id);
    setOpenReceipt(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseSMS = () => {
    setOpenSMS(false);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleOpenDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  };

  const handleOpenEdit = (id) => {
    setId(id);
    setOpenEdit(true);
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
                        <IconButton
                          onClick={() => {
                            handleOpenReceipt(row._id);
                          }}
                        >
                          <ReceiptIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                        </IconButton>
                      </TableCell>

                      <TableCell align="right">
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                          <IconButton
                            onClick={() => {
                              handleOpenEdit(row._id);
                            }}
                          >
                            <ModeEditIcon style={{ fontSize: '20px', color: '#A94ACF' }} />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleOpenDelete(row._id);
                            }}
                          >
                            <CloudDownloadRounded style={{ fontSize: '20px', color: '#25C092' }} />
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
      {openEdit && <EditCustomer open={openEdit} handleClose={handleCloseEdit} id={id} />}
      {openDelete && <DeleteCustomer open={openDelete} handleClose={handleCloseDelete} id={id} />}
      {openSMS && <SMSCustomer open={openSMS} handleClose={handleCloseSMS} id={id} />}
      {openPreview && <PreviewCustomer open={openPreview} handleClose={handleClosePreview} id={id} />}
      {openReceipt && <OrderReceipt open={openReceipt} handleClose={handleCloseReceipt} id={id} />}
    </>
  );
}
