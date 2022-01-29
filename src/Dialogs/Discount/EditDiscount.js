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
import { updateDiscount, fetchCategory, fetchSubCategory, fetchProducts } from '../../actions';

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

export default function EditDiscount({ open, handleClose, id }) {

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { products } = useSelector((state) => state.product);

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
  const [applicableCategories, setApplicableCategoories] = useState();
  const [applicableSubCategories, setApplicableSubCategories] = useState();
  const [applicableProducts, setApplicableProducts] = useState();
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

    dispatchEvent(updateDiscount(formValues, id, handleClose));
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
    .filter((el) => applicableCategories.includes(el.category))
    .map((subCategory) => ({
      label: subCategory.name,
      value: subCategory._id,
      image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${subCategory.image}`,
    }));

  return (
    <Dialog fullWidth maxWidth="md" open={open}>
      <DialogTitle>Edit Discount</DialogTitle>
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
              {discountType !== 'flat' && (
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

              {discountType === 'flat' && (
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
              {discountType !== 'flat' && (
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

            <div className="d-flex flex-row align-items-center justify-content-end px-4 py-3">
              <Button onClick={onSubmit} type="submit" variant="contained" className="me-3">
                Update Discount
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Dialog>
  );
}

const productOptions = [
  {
    label: 'Aloo paratha',
    id: '123',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/08/aloo-paratha-recipe.jpg',
  },
  { label: 'Masala Dosa', id: '1234', image: 'https://i.ytimg.com/vi/CCab5oh0ZOc/maxresdefault.jpg' },
  {
    label: 'Chole Bhature',
    id: '12345678',
    image: 'https://bigoven-res.cloudinary.com/image/upload/t_recipe-1280/chana-bhatura-0ee3ab7d0f229c6b0bd89cdc.jpg',
  },
];

const subCategoryOptions = [
  {
    label: 'Kirana store, Grocery & FMCG',
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-12/211213-wee-groceries-se-405p-a36212.jpg',
  },
  {
    label: 'Restaurants & Hotels',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/09/37/8b/94/metro-lounge.jpg',
  },
  {
    label: 'Fashion, Apparel, Shoes & Accessories',
    image: 'https://mms-images.out.customink.com/mms/images/catalog/categories/13_large.jpg',
  },
  {
    label: 'Fruits & vegetables',
    image: 'https://static.scientificamerican.com/sciam/cache/file/528E0B49-CDD0-42D4-B5BAA3EBAEC01AE6_source.jpg',
  },
  {
    label: 'Mobile, Computers & Other Accessories',
    image:
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000',
  },
  {
    label: 'Books & Stationary products',
    image: 'https://m.media-amazon.com/images/I/717EIB64t7L._SL1500_.jpg',
  },
  {
    label: 'Beauty & Cosmetics',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmncqVXZMJkFNp6-OOjCKUl_kxiuWm4AjvG_lKKqzAq956scFZERXWq56fXUEWYqC0WM&usqp=CAU',
  },
  {
    label: 'Electronic appliances',
    image:
      'https://cdn.vox-cdn.com/thumbor/Atvpj5tUuIgLq55pPrG2-A-MHF8=/0x389:8426x7181/1200x800/filters:focal(3671x2467:5117x3913)/cdn.vox-cdn.com/uploads/chorus_image/image/62795169/samsung_fridge.0.jpg',
  },
  {
    label: 'Home decoration',
    image: 'https://www.mymove.com/wp-content/uploads/2021/03/Home-decorating_Followtheflow_Shutterstock.jpg',
  },
  {
    label: 'Furniture',
    image: 'https://www.ikea.com/in/en/images/products/ektorp-2-seat-sofa__0818550_pe774481_s5.jpg?f=s',
  },
  {
    label: 'Pharmacy & Medical Care',
    image:
      'https://i.guim.co.uk/img/media/65d68c03a1e035d0670711a642f7a272d3e660eb/0_1216_3063_1838/master/3063.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3056330a3a98cf23d2dfcbe60ba711ad',
  },
  {
    label: 'Bakery & Cake shops',
    image: 'https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg',
  },
  {
    label: 'Fresh chicken, Fish & Meat',
    image:
      'https://static.freshtohome.com/media/catalog/product/cache/1/image/600x400/18ae109e34f485bd0b0c075abec96b2e/c/h/chicken-breast.jpg',
  },
  {
    label: 'Local & Online services',
    image:
      'https://www.schroederplumbing.com/wp-content/uploads/2020/10/Modern-Plumbing-Technology-Old-School-Experience-And-Integrity-From-Your-Plumber-_-Mesa-AZ.jpg',
  },
  {
    label: 'Jwellery, Gold and Gems',
    image:
      'https://www.candere.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/n/m/nmne3517-a.jpg',
  },
  {
    label: 'Insurance & Financial services',
    image:
      'https://m.economictimes.com/thumb/msid-72304068,width-1200,height-900,resizemode-4,imgsize-191408/money10-getty.jpg',
  },
  {
    label: 'Paan shop',
    image: 'http://www.ugaoo.com/knowledge-center/wp-content/uploads/2017/10/shutterstock_613072169.jpg',
  },
  {
    label: 'Gym & Sports equipment',
    image: 'https://content.presspage.com/uploads/2110/1920_gym-covid-19-mask-risk-gettyimages.jpg?10000',
  },
  {
    label: 'Educational institute, Schools & teachers',
    image:
      'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F60cb2948d2b1ff3c9b86dc9c%2FBlack-teacher-wearing-face-mask-while-explaining-math-lesson-in-the-classroom-%2F960x0.jpg%3Ffit%3Dscale',
  },
  {
    label: 'Hardware & Construction tools',
    image: 'https://laysantechnologies.com/CKeditor/Images/hardwares.png',
  },
  {
    label: 'Transportation, Taxi, Travel & Tourism',
    image:
      'https://media.wired.com/photos/5cf832279c2a7cd3975976ca/2:1/w_2000,h_1000,c_limit/Transpo_XcelsiorChargeCharging_TA.jpg',
  },
  {
    label: 'Car, bike, Tractor & vehicle accessories',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg?crop=1xw:0.9997727789138833xh;center,top&resize=480:*',
  },
];

const categoryOptions = [
  {
    label: 'Kirana store, Grocery & FMCG',
    image: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-12/211213-wee-groceries-se-405p-a36212.jpg',
  },
  {
    label: 'Restaurants & Hotels',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/09/37/8b/94/metro-lounge.jpg',
  },
  {
    label: 'Fashion, Apparel, Shoes & Accessories',
    image: 'https://mms-images.out.customink.com/mms/images/catalog/categories/13_large.jpg',
  },
  {
    label: 'Fruits & vegetables',
    image: 'https://static.scientificamerican.com/sciam/cache/file/528E0B49-CDD0-42D4-B5BAA3EBAEC01AE6_source.jpg',
  },
  {
    label: 'Mobile, Computers & Other Accessories',
    image:
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000',
  },
  {
    label: 'Books & Stationary products',
    image: 'https://m.media-amazon.com/images/I/717EIB64t7L._SL1500_.jpg',
  },
  {
    label: 'Beauty & Cosmetics',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmncqVXZMJkFNp6-OOjCKUl_kxiuWm4AjvG_lKKqzAq956scFZERXWq56fXUEWYqC0WM&usqp=CAU',
  },
  {
    label: 'Electronic appliances',
    image:
      'https://cdn.vox-cdn.com/thumbor/Atvpj5tUuIgLq55pPrG2-A-MHF8=/0x389:8426x7181/1200x800/filters:focal(3671x2467:5117x3913)/cdn.vox-cdn.com/uploads/chorus_image/image/62795169/samsung_fridge.0.jpg',
  },
  {
    label: 'Home decoration',
    image: 'https://www.mymove.com/wp-content/uploads/2021/03/Home-decorating_Followtheflow_Shutterstock.jpg',
  },
  {
    label: 'Furniture',
    image: 'https://www.ikea.com/in/en/images/products/ektorp-2-seat-sofa__0818550_pe774481_s5.jpg?f=s',
  },
  {
    label: 'Pharmacy & Medical Care',
    image:
      'https://i.guim.co.uk/img/media/65d68c03a1e035d0670711a642f7a272d3e660eb/0_1216_3063_1838/master/3063.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3056330a3a98cf23d2dfcbe60ba711ad',
  },
  {
    label: 'Bakery & Cake shops',
    image: 'https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg',
  },
  {
    label: 'Fresh chicken, Fish & Meat',
    image:
      'https://static.freshtohome.com/media/catalog/product/cache/1/image/600x400/18ae109e34f485bd0b0c075abec96b2e/c/h/chicken-breast.jpg',
  },
  {
    label: 'Local & Online services',
    image:
      'https://www.schroederplumbing.com/wp-content/uploads/2020/10/Modern-Plumbing-Technology-Old-School-Experience-And-Integrity-From-Your-Plumber-_-Mesa-AZ.jpg',
  },
  {
    label: 'Jwellery, Gold and Gems',
    image:
      'https://www.candere.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/n/m/nmne3517-a.jpg',
  },
  {
    label: 'Insurance & Financial services',
    image:
      'https://m.economictimes.com/thumb/msid-72304068,width-1200,height-900,resizemode-4,imgsize-191408/money10-getty.jpg',
  },
  {
    label: 'Paan shop',
    image: 'http://www.ugaoo.com/knowledge-center/wp-content/uploads/2017/10/shutterstock_613072169.jpg',
  },
  {
    label: 'Gym & Sports equipment',
    image: 'https://content.presspage.com/uploads/2110/1920_gym-covid-19-mask-risk-gettyimages.jpg?10000',
  },
  {
    label: 'Educational institute, Schools & teachers',
    image:
      'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F60cb2948d2b1ff3c9b86dc9c%2FBlack-teacher-wearing-face-mask-while-explaining-math-lesson-in-the-classroom-%2F960x0.jpg%3Ffit%3Dscale',
  },
  {
    label: 'Hardware & Construction tools',
    image: 'https://laysantechnologies.com/CKeditor/Images/hardwares.png',
  },
  {
    label: 'Transportation, Taxi, Travel & Tourism',
    image:
      'https://media.wired.com/photos/5cf832279c2a7cd3975976ca/2:1/w_2000,h_1000,c_limit/Transpo_XcelsiorChargeCharging_TA.jpg',
  },
  {
    label: 'Car, bike, Tractor & vehicle accessories',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg?crop=1xw:0.9997727789138833xh;center,top&resize=480:*',
  },
];
