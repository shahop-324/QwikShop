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
  Tooltip,
} from '@mui/material';
//
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import EmailRounded from '@mui/icons-material/EmailRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import { useState } from 'react';
import DesignEmailCampaign from '../../../../Dialogs/Marketing/DesignEmailCampaign';
import SendEmailCampaign from '../../../../Dialogs/Marketing/SendEmailCampaign';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function MarketingCampaignDetails() {
  const { orders } = useSelector((state) => state.order);

  const { campaigns } = useSelector((state) => state.marketing);

  const [id, setId] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openSend, setOpenSend] = useState(false);

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseSend = () => {
    setOpenSend(false);
  };

  return (
    <>
      <Card>
        <CardHeader title="Marketing Campaigns" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 160 }}>Campaign Id</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Channel</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Charge</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>No. of customers</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Created At</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
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
                          <Typography variant="subtitle2">{row?.campaignId}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.channel}</TableCell>

                      <TableCell>
                        <Label
                          variant={'ghost'}
                          color={
                            (row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'
                          }
                        >
                          Rs.{row?.amount}
                        </Label>
                      </TableCell>

                      <TableCell sx={{ textTransform: 'capitalize' }}>{row?.customers?.length}</TableCell>

                      <TableCell align="center">
                        <Typography variant="caption">{dateFormat(row?.createdAt, 'ddd mmm dS')}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption">{row?.status}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title={'Edit Campaign'}>
                          <IconButton
                            onClick={() => {
                              setOpenEdit(true);
                              setId(row?._id);
                            }}
                          >
                            <EmailRounded style={{ fontSize: '20px', color: 'primary' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={'Send Campaign'}>
                          <IconButton
                            onClick={() => {
                              setOpenSend(true);
                              setId(row?._id);
                            }}
                          >
                            <SendRounded style={{ fontSize: '20px', color: '#4A7DCF' }} />
                          </IconButton>
                        </Tooltip>
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
      {openEdit && <DesignEmailCampaign open={openEdit} handleClose={handleCloseEdit} id={id} />}
      {openSend && <SendEmailCampaign open={openSend} handleClose={handleCloseSend} id={id} />}
    </>
  );
}
