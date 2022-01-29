import React, { useState, useEffect } from 'react';
import '../../index.css';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PercentIcon from '@mui/icons-material/Percent';

import { MobileDateTimePicker } from '@mui/lab';

// @mui
import { Grid, Typography, Button, Box, Autocomplete, Dialog, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createNewDiscount, fetchCategory, fetchProducts, fetchSubCategory } from '../../actions';

// ----------------------------------------------------------------------

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function AddNewDiscount({ open, handleClose }) {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { products } = useSelector((state) => state.product);

  // Fetch all categories
  // Fetch all subcategories
  // Fetch all products

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchSubCategory());
    dispatch(fetchProducts());
  }, []);

  const [discountType, setDiscountType] = useState('percentage');
  const [type, setType] = useState('regular');
  const [buyX, setBuyX] = useState();
  const [getY, setGetY] = useState();
  const [applicableOn, setApplicableOn] = useState('allProducts');
  const [applicableFromDateTime, setApplicableFromDateTime] = React.useState(new Date());
  const [applicableTillDateTime, setApplicableTillDateTime] = React.useState(new Date());
  const [applicableCategories, setApplicableCategoories] = useState([]);
  const [applicableSubCategories, setApplicableSubCategories] = useState([]);
  const [applicableProducts, setApplicableProducts] = useState([]);
  const [boughtProduct, setBoughtProduct] = useState(null);
  const [givenProduct, setGivenProduct] = useState(null);
  const [numberOfCoupons, setNumberOfCoupons] = useState();
  const [discountCode, setDiscountCode] = useState();
  const [usesPerCustomer, setUsesPerCustomer] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [discountAmount, setDiscountAmount] = useState();
  const [minOrderValue, setMinOrderValue] = useState();
  const [maxDiscount, setMaxDiscount] = useState();
  const [showToCustomer, setShowToCustomer] = useState();

  const onSubmit = () => {
    const formValues = {
      discountType,
      applicableOn,
      type,
      applicableFromDateTime,
      applicableTillDateTime,
      buyX,
      getY,
      boughtProduct,
      givenProduct,
      applicableCategories,
      applicableSubCategories,
      applicableProducts,
      numberOfCoupons,
      discountCode,
      usesPerCustomer,
      discountPercentage,
      discountAmount,
      minOrderValue,
      maxDiscount,
      showToCustomer,
    };

    dispatch(createNewDiscount(formValues));
  };

  const categoryOptions = categories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const productOptions = products.map((el) => ({
    label: el.productName,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.images[0]}`,
  }));

  const subCategoryOptions = subCategories
    .filter((el) => applicableCategories.map((el) => el.value).includes(el.category.value))
    .map((subCategory) => ({
      label: subCategory.name,
      value: subCategory._id,
      image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${subCategory.image}`,
    }));

  return (
    <Dialog fullWidth maxWidth="md" open={open}>
      <DialogTitle>Add New Discount</DialogTitle>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <div className="mt-5 px-4">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              defaultValue={type}
              className="mb-4"
              row
              aria-label="Discount type"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="regular"
                control={<Radio onClick={() => setType('regular')} />}
                label="Regular Discount"
              />
              <FormControlLabel
                value="buyXGetYFree"
                control={<Radio onClick={() => setType('buyXGetYFree')} />}
                label="Buy X get Y free"
              />
              <FormControlLabel
                value="firstPurchase"
                control={<Radio onClick={() => setType('firstPurchase')} />}
                label="First Purchase"
              />
            </RadioGroup>
            <FormLabel component="legend">Applicable on</FormLabel>
            <RadioGroup
              defaultValue={applicableOn}
              className="mb-4"
              row
              aria-label="Discount type"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="allProducts"
                control={<Radio onClick={() => setApplicableOn('regular')} />}
                label="All Products"
              />
              <FormControlLabel
                value="selectedCategory"
                control={<Radio onClick={() => setApplicableOn('selectedCategory')} />}
                label="Selected category"
              />
              <FormControlLabel
                value="selectedProducts"
                control={<Radio onClick={() => setApplicableOn('selectedProducts')} />}
                label="Selected products"
              />
            </RadioGroup>
            {type !== 'buyXGetYFree' && (
              <Stack>
                <FormLabel component="legend">Discount type</FormLabel>
                <RadioGroup
                  defaultValue={discountType}
                  className="mb-4"
                  row
                  aria-label="Discount type"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="percentage"
                    control={<Radio onClick={() => setDiscountType('percentage')} />}
                    label="Percentage"
                  />
                  <FormControlLabel
                    value="flat"
                    control={<Radio onClick={() => setDiscountType('flat')} />}
                    label="Flat"
                  />
                </RadioGroup>
              </Stack>
            )}

            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <MobileDateTimePicker
                value={applicableFromDateTime}
                onChange={(newValue) => {
                  setApplicableFromDateTime(newValue);
                }}
                label="Applicable from Date & Time"
                minDate={new Date('2018-01-01T00:00')}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(params) => <TextField {...params} />}
              />
              <MobileDateTimePicker
                value={applicableTillDateTime}
                onChange={(newValue) => {
                  setApplicableTillDateTime(newValue);
                }}
                label="Applicable till Date & Time"
                minDate={new Date('2018-01-01T00:00')}
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(params) => <TextField {...params} />}
              />

              {type === 'buyXGetYFree' && (
                <TextField
                  value={buyX}
                  onChange={(e) => {
                    setBuyX(e.target.value);
                  }}
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Buy X"
                  variant="outlined"
                />
              )}

              {type === 'buyXGetYFree' && (
                <TextField
                  value={getY}
                  onChange={(e) => {
                    setGetY(e.target.value);
                  }}
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Get Y"
                  variant="outlined"
                />
              )}

              {type === 'buyXGetYFree' && (
                <Autocomplete
                  required
                  value={boughtProduct}
                  onChange={(e, value) => {
                    setBoughtProduct(value);
                  }}
                  fullWidth
                  disablePortal
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  options={productOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Bought Product" fullWidth name="boughtProduct" />
                  )}
                />
              )}

              {type === 'buyXGetYFree' && (
                <Autocomplete
                  required
                  value={givenProduct}
                  onChange={(e, value) => {
                    setGivenProduct(value);
                  }}
                  fullWidth
                  disablePortal
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  options={productOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Given Product" fullWidth name="givenProduct" />
                  )}
                />
              )}

              {applicableOn === 'selectedCategory' && (
                <Autocomplete
                  multiple
                  required
                  value={applicableCategories}
                  onChange={(e, value) => {
                    setApplicableCategoories(value);
                  }}
                  fullWidth
                  disablePortal
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  options={categoryOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Applicable categories" fullWidth name="applicableCategories" />
                  )}
                />
              )}

              {applicableOn === 'selectedCategory' && (
                <Autocomplete
                  multiple
                  required
                  value={applicableSubCategories}
                  onChange={(e, value) => {
                    setApplicableSubCategories(value);
                  }}
                  fullWidth
                  disablePortal
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  options={subCategoryOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Applicable Sub Categories" fullWidth name="applicableSubCategories" />
                  )}
                />
              )}

              {applicableOn === 'selectedProducts' && (
                <Autocomplete
                  multiple
                  required
                  value={applicableProducts}
                  onChange={(e, value) => {
                    setApplicableProducts(value);
                  }}
                  fullWidth
                  disablePortal
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  options={productOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Applicable Products" fullWidth name="applicableProducts" />
                  )}
                />
              )}

              <TextField
                value={numberOfCoupons}
                onChange={(e) => {
                  setNumberOfCoupons(e.target.value);
                }}
                className="mb-4"
                fullWidth
                id="outlined-basic"
                label="Number of coupons"
                variant="outlined"
              />
              <TextField
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                }}
                className="mb-4"
                fullWidth
                id="outlined-basic"
                label="Discount code"
                variant="outlined"
              />

              <TextField
                value={usesPerCustomer}
                onChange={(e) => {
                  setUsesPerCustomer(e.target.value);
                }}
                type="number"
                className="mb-4"
                fullWidth
                id="outlined-basic"
                label="Uses per customer"
                variant="outlined"
              />
              {discountType !== 'flat' && type !== 'buyXGetYFree' && (
                <TextField
                  value={discountPercentage}
                  onChange={(e) => {
                    setDiscountPercentage(e.target.value);
                  }}
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Discount Percentage"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <PercentIcon style={{ fontSize: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {discountType === 'flat' && type !== 'buyXGetYFree' && (
                <TextField
                  value={discountAmount}
                  onChange={(e) => {
                    setDiscountAmount(e.target.value);
                  }}
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Discount amount"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeIcon style={{ fontSize: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {type !== 'buyXGetYFree' && (
                <TextField
                  value={minOrderValue}
                  onChange={(e) => {
                    setMinOrderValue(e.target.value);
                  }}
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Minimum order value"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeIcon style={{ fontSize: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {discountType !== 'flat' && type !== 'buyXGetYFree' && (
                <TextField
                  value={maxDiscount}
                  onChange={(e) => {
                    setMaxDiscount(e.target.value);
                  }}
                  className="mb-4"
                  fullWidth
                  id="outlined-basic"
                  label="Maximum discount"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeIcon style={{ fontSize: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>

            <Stack direction="row" spacing={4} alignItems="center">
              <Typography>Show discount coupon on shop to customers?</Typography>
              <AntSwitch
                checked={showToCustomer}
                onChange={(e) => {
                  setShowToCustomer(e.target.checked);
                }}
                inputProps={{ 'aria-label': 'ant design' }}
              />
            </Stack>

            <div className="d-flex flex-row align-items-center justify-content-end my-3 mx-4">
              <Button onClick={onSubmit} type="submit" variant="contained" className="me-3">
                Create discount
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}
