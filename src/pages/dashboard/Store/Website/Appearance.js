import React, { useState } from 'react';
import { Stack, Button, Typography, Card, Box, CardActionArea } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const StoreAppearance = () => {
  const [state, setState] = useState('');

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="end">
        <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
          Preview
        </Button>
      </Stack>

      <Typography variant="h6" className="mb-3">
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
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://ecommerce-platforms.com/wp-content/uploads/2018/01/ecommerce-webstite-design_opt.png'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/186306482/original/15f5165c9d7964f0157db3059f2123bb02d67559/make-an-ecommerce-website-using-html-css-and-javascript.png'
              }
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://cloudstorysolution.com/wp-content/uploads/2021/08/grocery-1.png'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://i.pinimg.com/originals/01/75/aa/0175aacd9c65791fb01d17606ebbd6b8.jpg'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://buildify.cc/wp-content/uploads/2017/04/Sweet4you-Sweet-Shop-PrestaShop-Theme_w34.jpg'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                'https://smartcookie-design.co.uk/img/posts/25-watch-brands-with-great-ecommerce-stores-fossil.jpg'
              }
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://cdn.dribbble.com/users/3181877/screenshots/14310306/custom___1_4x.jpg'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://assets.materialup.com/uploads/10f8caa2-0fb1-4d75-88a5-87b5b255bb0d/preview.png'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://i.pinimg.com/originals/60/18/c9/6018c9bdb33524e6a6c9e2dcdada0f03.png'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                'https://cdn.dribbble.com/users/1581557/screenshots/10677580/media/6d00ad86eac84d492ceb861d473b7eb2.png?compress=1&resize=400x300'
              }
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={'https://www.smartsites.com/media/web-design-pant-supply-responsive-687x419.png'}
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                'https://cdn.dribbble.com/users/2153376/screenshots/14866773/media/539af43ecb8f0324f720859c306b0902.jpg?compress=1&resize=1600x1200&vertical=top'
              }
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                'https://cdn.dribbble.com/users/1049586/screenshots/14127055/media/5e295ea88b9e84e60cddaf937ded2efd.jpg?compress=1&resize=800x600&vertical=top'
              }
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                'https://cdn.dribbble.com/users/4376642/screenshots/16688455/media/8c8a656e7b1a967e326a30b6d953012a.jpg?compress=1&resize=1600x1200&vertical=top'
              }
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          onClick={() => {
            //   handleClick(el.label);
          }}
          sx={{ width: '100%' }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={
                'https://cdn.dribbble.com/users/282315/screenshots/16279204/media/d37d6c7cf0f971675d23c18251377dda.png?compress=1&resize=1600x1200&vertical=top'
              }
              alt={'Lite theme'}
            />
            <CardContent>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography gutterBottom variant="h5" component="div">
                  {'Lite'}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Button variant="outlined">Preview</Button>
                  <Button variant="contained">Apply</Button>
                </Stack>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </div>
  );
};

export default StoreAppearance;
