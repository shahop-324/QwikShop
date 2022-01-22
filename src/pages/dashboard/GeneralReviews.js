/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Typography, Stack, Box, Card, Grid, Avatar, Button, Rating, Chip } from '@mui/material';
import { fDateTime } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';
import { _bookingReview } from '../../_mock';

const GeneralReviews = () => {
  const [state, setState] = useState('');

  return (
    <>
      <Stack direction="row" sx={{ px: 4 }}>
        {' '}
        <Typography variant="h6">Reviews</Typography>
      </Stack>

      <Stack direction="row" sx={{ px: 4 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {_bookingReview.map((item) => (
            <ReviewItem key={item.id} item={item} />
          ))}
        </Box>
      </Stack>
    </>
  );
};

export default GeneralReviews;

function ReviewItem({ item }) {
  const { avatar, name, description, rating, postedAt, tags } = item;

  return (
    <Stack spacing={2} sx={{ minHeight: 402, position: 'relative', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={name} src={avatar} />
        <div>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Posted {fDateTime(postedAt)}
          </Typography>
        </div>
      </Stack>

      <Rating value={rating} size="small" readOnly precision={0.5} />
      <Typography variant="body2">{description}</Typography>

      <Stack direction="row" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip size="small" key={tag} label={tag} sx={{ mr: 1, mb: 1, color: 'text.secondary' }} />
        ))}
      </Stack>

      <Typography color={"primary"} variant='subtitle2'>Nike Airforce 1 Black</Typography>

      <Stack direction={"row"} flexWrap={"wrap"}>
          <img className='me-1 mb-1' src={"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fadf06db-4d9d-4e7f-b3a8-818bcd4066bb/air-max-plus-mens-shoes-x9G2xF.png"} style={{height: "70px"}} alt="product"/>
          <img className='me-1 mb-1' src={"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5615d24c-d429-4f6f-9457-daa083e99dcc/air-max-genome-shoes-nxMDJ2.png"} style={{height: "70px"}} alt="product"/>
          <img className='me-1 mb-1' src={"https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/dd9aaed3-2fca-4588-8205-3430d4418bbc/mc-trainer-mens-training-shoes-B1ZQ2g.png"} style={{height: "70px"}} alt="product"/>
          <img className='me-1 mb-1' src={"https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/921a7b3f-0f99-47a9-ba27-408624cf5e92/wildhorse-7-trail-running-shoes-XdK82N.png"} style={{height: "70px"}} alt="product"/>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
        <Button fullWidth variant="contained" endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}>
          Accept
        </Button>
        <Button fullWidth variant="contained" color="error" endIcon={<Iconify icon={'eva:close-circle-fill'} />}>
          Reject
        </Button>
      </Stack>
    </Stack>
  );
}
