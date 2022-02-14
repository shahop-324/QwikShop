import React from 'react';
import { Card, Container, Box, Typography } from '@mui/material';

const HomeTagLine = () => (
  <>
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          mt: 10,
        }}
      >
        <Card sx={{ p: 4 }}>
          {/*  */}
          <Typography variant="h4" sx={{ mb: 4 }}>
            Truly Digital, Truly Indian
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Ecommerce Platform to run your Dream Online Business Seamlessly, Start Selling Online Today with QwikShop
          </Typography>
        </Card>
      </Box>
    </Container>
  </>
);

export default HomeTagLine;
