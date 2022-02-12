import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SmsIcon from '@mui/icons-material/Sms';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Divider,
  MenuItem,
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
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import MenuPopover from '../../../../components/MenuPopover';
import EditCustomer from '../../../../Dialogs/Customer/EditCustomer';
import DeleteCustomer from '../../../../Dialogs/Customer/DeleteCustomer';
import SMSCustomer from '../../../../Dialogs/Customer/SMSCustomer';
import PreviewCustomer from '../../../../Dialogs/Customer/PreviewCustomer';

// ----------------------------------------------------------------------

export default function BookingDetails({ customers }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [id, setId] = useState('');

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSMS, setOpenSMS] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);

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
  }

  const handleOpenDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  };

  const handleOpenEdit = (id) => {
    setId(id);
    setOpenEdit(true);
  };

  const handleOpenSMS = (id) => {
    setId(id);
    setOpenSMS(true);
  };

  const handleOpenPreview = (id) => {
    setId(id);
    setOpenPreview(true);
  }

  return (
    <>
      <Card>
        <CardHeader title="Customers" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Customer</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Phone</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Pincode</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>City</TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {customers?.length > 0 && customers?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>

                    <TableCell>
                      {row?.pincode ?  <Label
                        variant={'ghost'}
                        color={
                          (row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'
                        }
                      >
                        {(row?.pincode)}
                      </Label> : "---" }
                     
                    </TableCell>

                    <TableCell sx={{ textTransform: 'capitalize' }}>{row.city}</TableCell>

                    <TableCell align="right">
                      <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <IconButton
                          onClick={() => {
                            handleOpenSMS(row._id);
                          }}
                        >
                          <SmsIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                        </IconButton>
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
                          <DeleteIcon style={{ fontSize: '20px', color: '#C03725' }} />
                        </IconButton>
                        <IconButton onClick={() => {
                            handleOpenPreview(row._id);
                          }}>
                          <VisibilityIcon style={{ fontSize: '20px', color: '#4ACF9C' }} />
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
    </>
  );
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
