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

export default function Walletetails() {
  const { store } = useSelector((state) => state.store);

  return (
    <>
      <Card>
        <CardHeader title="Wallet Transactions" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Transaction Id</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Type</TableCell> {/* Type can be credit of debit  */}
                  <TableCell sx={{ minWidth: 160 }}>Amount</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Reason</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Timestamp</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {store.team?.length > 0 &&
                  store.team?.map((row) => (
                    <TableRow key={row?.email}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{/* {row?.name} */}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{/* {row?.phone} */}</TableCell>
                      <TableCell>{/* {row?.email} */}</TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                          }}
                        >
                          {/* {row?.permissions?.map((el) => (
                            <Chip key={el.label} label={el?.label || el} color="primary" variant="outlined" />
                          ))} */}
                        </Box>
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
    </>
  );
}
