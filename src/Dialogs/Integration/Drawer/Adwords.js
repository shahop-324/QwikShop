import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton, Drawer, Stack, Grid, Box, Card, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import { Link } from 'react-router-dom';
import { updateStore } from '../../../actions';

const Adwords = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const [propertyId, setPropertyId] = useState();

  const [conversionId, setConversionId] = useState(store.adWordsConversionId);
  const [conversionLabel, setConversionLabel] = useState(store.adWordsConversionLabel);

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Adwords</Typography>

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
                  name="conversionId"
                  label="Conversion ID"
                  fullWidth
                  value={conversionId}
                  onChange={(e) => {
                    setConversionId(e.target.value);
                  }}
                />
                <TextField
                  required
                  name="conversionLabel"
                  label="Conversion Label"
                  fullWidth
                  value={conversionLabel}
                  onChange={(e) => {
                    setConversionLabel(e.target.value);
                  }}
                />
              </Box>

              <Button
                onClick={() => {
                  dispatch(updateStore({ adWordsConversionId: conversionId, adWordsConversionLabel: conversionLabel }));
                }}
                sx={{ my: 2 }}
                variant="contained"
                fullWidth
              >
                Connect
              </Button>
              <Typography sx={{ my: 3 }} variant="subtitle2">
                Need Help?
              </Typography>
              <PlayCircleRoundedIcon sx={{ mr: 1 }} />
              <Link to="/">
                <Typography variant="caption">See How to obtain Conversion ID and Label</Typography>
              </Link>
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default Adwords;
