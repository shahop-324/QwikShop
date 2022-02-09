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

// ----------------------------------------------------------------------

export default function MarketingCampaignDetails() {
  const { orders } = useSelector((state) => state.order);

  const {campaigns} = useSelector((state) => state.marketing);

  return (
    <>
      <Card>
        <CardHeader title="Marketing Campaigns" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Campaign Id</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Type</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Sales</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Orders</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Created At</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Actions</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns?.length > 0 &&
                  campaigns?.map((row) => (
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
                        <IconButton onClick={() => {}}>
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
    </>
  );
}
