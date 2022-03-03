import React, { useState } from 'react';
import { Stack, Button, Typography, Card, Box, CardActionArea, Chip } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useSelector } from 'react-redux';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LockIcon from '@mui/icons-material/Lock';
import CustomiseSuperstore from '../../../../Dialogs/StoreTheme/CustomiseSuperstore';

const StoreAppearance = () => {
  const { store } = useSelector((state) => state.store);
  

  const [superstore, setSuperstore] = useState(false);

  const handleCloseSuperstore = () => {
    setSuperstore(false);
  };



  return (
    <div>
      <div style={{ width: '100%' }} className="d-flex flex-row align-items-center justify-content-end mb-3">
        <a style={{textDecoration: "none"}} href={`https://qwikshop.online/${store.subName}`} target="_blank" rel="noreferrer">
          <Button variant="outlined" startIcon={<RemoveRedEyeIcon />}>
            Preview
          </Button>
        </a>
      </div>

      <Stack sx={{mb: 3, mt: 2}} direction={"row"} alignItems="center" justifyContent={"space-between"}>
      <Typography variant="subtitle1" className="mb-3">
        Theme
      </Typography>

      {/* <Button
        onClick={() => {
          handleOpen();
        }}
        variant="contained"
        startIcon={<SettingsIcon />}
      >
        Customise
      </Button> */}
      </Stack>

      

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
                      {/* <Button size={'small'} variant="outlined">
                        Preview
                      </Button> */}
                      {/* {store.theme === el.label ? (
                        <Chip label="Applied" color="primary" variant="conatined" />
                        
                      ) : (
                        <Button
                          onClick={() => {
                            dispatch(updateStoreTheme(el.label));
                          }}
                          size={'small'}
                          variant="contained"
                        >
                          Apply
                        </Button>
                      )} */}

<Chip color="primary" variant="outlined" icon={<LockIcon />} label="Coming in 1 week" />

                    </Stack>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ))}
      </Box>
      {superstore && <CustomiseSuperstore open={superstore} handleClose={handleCloseSuperstore} />}
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
