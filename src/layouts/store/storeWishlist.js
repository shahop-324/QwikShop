import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Box, Typography, IconButton, Stack, Link, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { RHFSelect, FormProvider } from '../../components/hook-form';
import { ColorSinglePicker } from '../../components/color-utils';

import Iconify from '../../components/Iconify';
// form

const Card = styled.div`
  min-height: 200px;
  width: 100%;
  border: 1px solid #21212167;
  border-radius: 10px;
`;

const WishlistCard = ({ image, discountedPrice }) => {
  const { product } = useSelector((state) => state.product);

  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    colors,
    available,
    priceSale,
    totalRating,
    totalReview,
    inventoryType,
  } = product;

  const defaultValues = {
    id,
    name,
    cover,
    available,
    price,
    color: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = () => {};

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Stack direction="row" spacing={2} className="p-3">
            <img
              style={{ height: '160px', width: '160px', objectFit: 'contain' }}
              src={
                'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/18a5494e-0f14-422c-9fce-4b469db7c936/air-max-pre-day-shoes-hlv9tD.png'
              }
              alt={'shoes'}
            />
            <Stack spacing={2} sx={{ width: '100%', padding: '10px' }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h6">Nike Air Force 1</Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Typography variant="subtitle2" style={{ textDecoration: 'line-through' }}>
                    Rs. 12999
                  </Typography>
                  <Typography variant="subtitle1">Rs. 7999</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Color
                </Typography>

                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <ColorSinglePicker
                      colors={colors}
                      value={field.value}
                      onChange={field.onChange}
                      sx={{
                        ...(colors.length > 4 && {
                          maxWidth: 144,
                          justifyContent: 'flex-end',
                        }),
                      }}
                    />
                  )}
                />
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Size
                </Typography>

                <RHFSelect
                  name="size"
                  size="small"
                  fullWidth={false}
                  FormHelperTextProps={{
                    sx: { textAlign: 'right', margin: 0, mt: 1 },
                  }}
                  helperText={
                    <Link underline="always" color="text.secondary">
                      Size Chart
                    </Link>
                  }
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Quantity
                </Typography>

                <div>
                  <Incrementer
                    name="quantity"
                    quantity={values.quantity}
                    available={available}
                    onIncrementQuantity={() => setValue('quantity', values.quantity + 1)}
                    onDecrementQuantity={() => setValue('quantity', values.quantity - 1)}
                  />
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}
                  >
                    Available: {available}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={3} alignItems={'center'}>
                <Button variant="contained">Add to Bag</Button>
                <Button variant="outlined">Share</Button>
                <Button>Remove</Button>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </FormProvider>
    </>
  );
};

const StoreWishlist = () => {
  const [state, setState] = useState();

  return (
    <div className="container mt-5">
      <div className="mb-4 d-flex flex-row align-items-center">
        <IconButton>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Typography variant="h5" className="ms-3">
          Wishlist
        </Typography>
      </div>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
        }}
      >
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
      </Box>
    </div>
  );
};

export default StoreWishlist;

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
