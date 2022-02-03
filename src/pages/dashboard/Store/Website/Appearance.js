import React from 'react';
import { Stack, Button, Typography, Card, Box, CardActionArea, IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useSelector } from 'react-redux';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SettingsIcon from '@mui/icons-material/Settings';

const StoreAppearance = () => {
  const { store } = useSelector((state) => state.store);

  return (
    <div>
      <div style={{ width: '100%' }} className="d-flex flex-row align-items-center justify-content-end mb-3">
        <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
          Preview
        </Button>
      </div>

      <Typography variant="subtitle1" className="mb-3">
        Theme
      </Typography>

      <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {themes.map((el) => (
          <>
            <Card
              onClick={() => {
                //   handleClick(el.label);
              }}
              sx={{ width: '100%' }}
            >
              <CardActionArea>
                <CardMedia component="img" height="240" image={el.image} alt={el.label} />
                <CardContent>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <Typography gutterBottom variant="subtitle1" component="div">
                      {el.label}
                    </Typography>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                      <Button size={'small'} variant="outlined">
                        Preview
                      </Button>
                      {store.theme === el.label ? (
                        <IconButton>
                          <SettingsIcon />
                        </IconButton>
                      ) : (
                        <Button size={'small'} variant="contained">
                          Apply
                        </Button>
                      )}
                    </Stack>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ))}
      </Box>
    </div>
  );
};

export default StoreAppearance;

const themes = [
  { label: 'Grocery Beta', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/GroceryBeta.png', index: '01' },
  { label: 'Electronics', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Gadgets.png', index: '02' },
  { label: 'Superstore', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Superstore.png', index: '03' },
  { label: 'Fashion', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Fashion.png', index: '04' },
  { label: 'Grocery', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Grocery.png', index: '05' },
  { label: 'Furniture', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Furniture.png', index: '06' },
  {
    label: 'Health & Beauty',
    image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Health%26Beauty.png',
    index: '07',
  },
  {
    label: 'Grocery Alpha',
    image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/GroceryAlpha.png',
    index: '08',
  },
  { label: 'Gift', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Gift.png', index: '09' },
  { label: 'Lite', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Lite.png', index: '10' },
  { label: 'Eureka', image: 'https://qwikshop.s3.ap-south-1.amazonaws.com/themes/Eureka.png', index: '11' },
];