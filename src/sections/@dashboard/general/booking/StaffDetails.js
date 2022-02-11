import { useState } from 'react';
import {
  Box,
  Card,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  Button,
  Chip,
  TableContainer,
} from '@mui/material';
//
import { useSelector } from 'react-redux';
import Scrollbar from '../../../../components/Scrollbar';
import AddStaffMember from '../../../../Dialogs/AddStaffMember';
import UpdateStaffMember from '../../../../Dialogs/Staff/updateStaff';
import RemoveStaff from '../../../../Dialogs/Staff/removeStaff';
import { ProductMoreMenu } from '../../e-commerce/product-list';

// ----------------------------------------------------------------------

export default function StaffDetails() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [id, setId] = useState('');

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const { store } = useSelector((state) => state.store);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack sx={{ mb: 3 }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <div>{''}</div>
        <Stack direction={'row'} spacing={3} alignItems={'center'}>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
            }}
          >
            Add Staff Member
          </Button>
        </Stack>
      </Stack>
      <Card>
        <CardHeader title="Staff" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Mobile</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Permissions</TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {store.team?.length > 0 &&
                  store.team?.map((row) => (
                    <TableRow key={row?.email}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{row?.name}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{row?.phone}</TableCell>
                      <TableCell>{row?.email}</TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                          }}
                        >
                          {row?.permissions?.map((el) => (
                            <Chip key={el.label} label={el?.label || el} color="primary" variant="outlined" />
                          ))}
                        </Box>
                      </TableCell>

                      <TableCell align="right">
                        <ProductMoreMenu
                          onDelete={() => {
                            console.log(row.email);
                            setId(row.email);
                            handleOpenRemove();
                          }}
                          onEdit={() => {
                            setId(row.email);
                            handleOpenUpdate();
                          }}
                          productName=""
                        />
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
      {open && <AddStaffMember open={open} handleClose={handleClose} />}
      {openUpdate && <UpdateStaffMember open={openUpdate} handleClose={handleCloseUpdate} id={id} />}
      {openRemove && <RemoveStaff open={openRemove} handleClose={handleCloseRemove} id={id} />}
    </>
  );
}
