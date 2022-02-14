import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton, Drawer, Stack, Grid, Box, Card, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { Link } from 'react-router-dom';
import {updateStore} from "../../../actions";

const WhatsAppBusinessChat = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const [whatsAppBusinessNumber, setWhatsAppBusinessNumber] = useState(store.WhatsAppNumber);

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">WhatsApp Chat</Typography>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseRounded />
              </IconButton>
            </Stack>
            <Box sx={{ my: 4 }}>
              <Box
                className="mb-3"
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  required
                  name="whatsAppBusinessNumber"
                  label="WhatsApp Business Number"
                  fullWidth
                  value={whatsAppBusinessNumber}
                  onChange={(e) => {
                    setWhatsAppBusinessNumber(e.target.value);
                  }}
                />
              </Box>

              <Button onClick={() => {
                dispatch(updateStore({WhatsAppNumber: whatsAppBusinessNumber}))
              }} sx={{ my: 2 }} variant="contained" fullWidth>
                Connect
              </Button>
              <Typography sx={{ my: 3 }} variant="subtitle2">
                Need Help?
              </Typography>
              <PlayCircleRoundedIcon sx={{ mr: 1 }} />
              <Link to="/">
                <Typography variant="caption">See How to WhatsApp Chat Works</Typography>
              </Link>
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default WhatsAppBusinessChat;
