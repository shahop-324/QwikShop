/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Button,
  DialogContent,
  Typography,
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import {
  fetchProducts,
  fetchCategory,
  fetchSubCategory,
  fetchDivision,
  getStorePages,
  updateStore,
  updateHeroBanners,
  updateCustomBanners,
  updateImageBanners,
  updateCustomSections,
} from '../../actions';
import { UploadAvatar } from '../../components/upload';
// utils
import { fData } from '../../utils/formatNumber';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const CustomiseSuperstore = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.store);

  const [flashDeals, setFlashDeals] = useState(store.flashDeals);
  const [featuredProducts, setFeaturedProducts] = useState(store.featuredProducts);
  const [topCategories, setTopCategories] = useState(store.topCategories);
  const [bigDiscounts, setBigDiscounts] = useState(store.bigDiscounts);
  const [dealOfTheDay, setDealOfTheDay] = useState(store.dealOfTheDay);
  const [dealOfTheWeek, setDealOfTheWeek] = useState(store.dealOfTheWeek);
  const [dealOfTheMonth, setDealOfTheMonth] = useState(store.dealOfTheMonth);

  const writeableCustomSections = store?.customSections.map((el) => ({ ...el }));
  const [customSections, setCustomSections] = useState(
    store && store.customSections !== undefined ? writeableCustomSections : []
  );
  const writeableImageBanners = store?.imageBanners?.map((el) => ({ ...el }));
  const [imageBanners, setImageBanners] = useState(
    store && store.imageBanners !== undefined ? writeableImageBanners : []
  );

  const writeableHeroBanners = store.heroBanners.map((el) => ({ ...el }));

  const [heroBanners, setHeroBanners] = useState(store ? writeableHeroBanners : []);

  const writeableCustomBanners = store?.customBanners?.map((el) => ({ ...el }));

  const [customBanners, setCustomBanners] = useState(
    store && store.customBanners !== undefined ? writeableCustomBanners : []
  );

  const addCustomBanner = () => {
    setCustomBanners((prev) => [
      ...prev,
      {
        index: uuidv4(),
        file: null,
        preview: null,
        heading: null,
        caption: null,
        CTALabel: null,
        product: null,
        destination: null,
        category: null,
        subCategory: null,
        division: null,
        page: null,
      },
    ]);
  };

  const addHeroBanner = () => {
    setHeroBanners((prev) => [
      ...prev,
      {
        index: uuidv4(),
        file: null,
        preview: null,
        heading: null,
        caption: null,
        CTALabel: null,
        product: null,
        destination: null,
        category: null,
        subCategory: null,
        division: null,
        page: null,
      },
    ]);
  };

  const removeCustomBanner = (index) => {
    setCustomBanners((prev) => prev.filter((el) => el.index !== index));
  };

  const removeHeroBanner = (index) => {
    setHeroBanners((prev) => prev.filter((el) => el.index !== index));
  };

  const updateCustomBanner = (index, value, field) => {
    setCustomBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const updateHeroBanner = (index, value, field) => {
    setHeroBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const addCustomSection = () => {
    setCustomSections((prev) => [...prev, { index: uuidv4(), name: '', products: [] }]);
  };

  const addImageBanner = () => {
    setImageBanners((prev) => [
      ...prev,
      {
        index: uuidv4(),
        file: null,
        preview: null,
        product: null,
        destination: null,
        category: null,
        subCategory: null,
        division: null,
        page: null,
      },
    ]);
  };

  const removeImageBanner = (index) => {
    setImageBanners((prev) => prev.filter((el) => el.index !== index));
  };

  const removeCustomSection = (index) => {
    setCustomSections((prev) => prev.filter((el) => el.index !== index));
  };

  const updateImageBanner = (index, value, field) => {
    setImageBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }

        el[field] = value;
        return el;
      })
    );
  };

  const updateCustomSection = (index, value, field) => {
    setCustomSections((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }

        el[field] = value;
        return el;
      })
    );
  };

  const handleDropHeroBanner = (acceptedFiles, index) => {
    const file = acceptedFiles[0];

    console.log(file);

    setHeroBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.file = file;
        el.preview = URL.createObjectURL(file);
        return el;
      })
    );
  };

  const handleDropCustomBanner = (acceptedFiles, index) => {
    const file = acceptedFiles[0];

    console.log(file);

    setCustomBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.file = file;
        el.preview = URL.createObjectURL(file);
        return el;
      })
    );
  };

  const handleDropImageBanner = (acceptedFiles, index) => {
    const file = acceptedFiles[0];

    console.log(file);

    setImageBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.file = file;
        el.preview = URL.createObjectURL(file);
        return el;
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    dispatch(fetchSubCategory());
    dispatch(fetchDivision());
    dispatch(getStorePages());
  }, []);

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { divisions } = useSelector((state) => state.division);
  const { pages } = useSelector((state) => state.page);

  const productOptions = products.map((el) => ({
    label: el.productName,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.images[0]}`,
  }));

  const categoryOptions = categories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const subCategoryOptions = subCategories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const divisionOptions = divisions.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const pageOptions = pages.map((el) => ({
    label: el.name,
    value: el._id,
  }));

  return (
    <>
      <Dialog
        maxWidth={'lg'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 3 }}>{'Customise Your Store'}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '900px' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Hero Banners</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {heroBanners.map((el) => (
                  <div key={el.index}>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3, mb: 2 }}>
                          <UploadAvatar
                            required
                            name="avatarUrl"
                            accept="image/*"
                            maxSize={3145728}
                            onDrop={(files) => {
                              handleDropHeroBanner(files, el.index);
                            }}
                            file={el.preview}
                            helperText={
                              <Typography
                                variant="caption"
                                sx={{
                                  mt: 2,
                                  mx: 'auto',
                                  display: 'block',
                                  textAlign: 'center',
                                  color: 'text.secondary',
                                }}
                              >
                                Allowed *.jpeg, *.jpg, *.png, *.gif
                                <br /> max size of {fData(3145728)}
                              </Typography>
                            }
                          />
                        </Card>
                      </Grid>
                    </Grid>
                    <TextField
                      sx={{ mb: 2 }}
                      name="heroHeading"
                      label="Heading"
                      fullWidth
                      value={el.heading}
                      onChange={(e) => {
                        updateHeroBanner(el.index, e.target.value, 'heading');
                      }}
                    />
                    <TextField
                      sx={{ mb: 2 }}
                      multiline
                      name="heroDescription"
                      label="Caption"
                      fullWidth
                      value={el.caption}
                      onChange={(e) => {
                        updateHeroBanner(el.index, e.target.value, 'caption');
                      }}
                    />
                    <TextField
                      sx={{ mb: 2 }}
                      multiline
                      name="actionButton"
                      label="Action Button Label"
                      fullWidth
                      value={el.CTALabel}
                      onChange={(e) => {
                        updateHeroBanner(el.index, e.target.value, 'CTALabel');
                      }}
                    />

                    <Autocomplete
                      sx={{ mb: 2 }}
                      value={el.destination}
                      onChange={(e, value) => {
                        updateHeroBanner(el.index, value, 'destination');
                      }}
                      id=""
                      fullWidth
                      options={CTATypeOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose Destination"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {(() => {
                      switch (el.destination?.label) {
                        case 'Product':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.product}
                              onChange={(e, value) => {
                                updateHeroBanner(el.index, value, 'product');
                              }}
                              id=""
                              fullWidth
                              options={productOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Product"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Category':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.category}
                              onChange={(e, value) => {
                                updateHeroBanner(el.index, value, 'category');
                              }}
                              id=""
                              fullWidth
                              options={categoryOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Category"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Sub Category':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.subCategory}
                              onChange={(e, value) => {
                                updateHeroBanner(el.index, value, 'subCategory');
                              }}
                              id=""
                              fullWidth
                              options={subCategoryOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Sub Category"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Division':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.division}
                              onChange={(e, value) => {
                                updateHeroBanner(el.index, value, 'division');
                              }}
                              id=""
                              fullWidth
                              options={divisionOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Division"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Pages':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.page}
                              onChange={(e, value) => {
                                updateHeroBanner(el.index, value, 'page');
                              }}
                              id=""
                              fullWidth
                              options={pageOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Page"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        default:
                          break;
                      }
                    })()}
                    <Stack sx={{ px: 4 }} direction={'row'} alignItems="center" justifyContent={'end'}>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          removeHeroBanner(el.index);
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </div>
                ))}
              </AccordionDetails>
              <Stack sx={{ mb: 3, mt: 2 }} direction={'row'} alignItems="center" justifyContent={'center'}>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => {
                    addHeroBanner();
                  }}
                >
                  Add Hero Banner
                </Button>
              </Stack>
              <Stack direction={'row'} sx={{ mb: 3 }} alignItems="center" justifyContent={'center'}>
                <Button
                  sx={{ width: 'max-content' }}
                  variant="contained"
                  onClick={() => {
                    dispatch(updateHeroBanners(heroBanners));
                  }}
                >
                  Update Hero Banners
                </Button>
              </Stack>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Flash Deals</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ mb: 2 }}>
                  <Typography variant="caption">
                    These are products on which you are offering discounts for a limited time.
                  </Typography>
                </Stack>

                <Autocomplete
                  multiple
                  sx={{ mb: 2 }}
                  value={flashDeals}
                  onChange={(e, value) => {
                    setFlashDeals(value);
                  }}
                  id=""
                  fullWidth
                  options={productOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Products"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </AccordionDetails>
              <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                <Button
                  onClick={() => {
                    dispatch(updateStore({ flashDeals }));
                  }}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Top Categories</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ mb: 2 }}>
                  <Typography variant="caption">These are categories you want to promote on your store.</Typography>
                </Stack>
                <Autocomplete
                  multiple
                  sx={{ mb: 3 }}
                  value={topCategories}
                  onChange={(e, value) => {
                    setTopCategories(value);
                  }}
                  id=""
                  fullWidth
                  options={categoryOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Categories"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </AccordionDetails>
              <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                <Button
                  onClick={() => {
                    dispatch(updateStore({ topCategories }));
                  }}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Featured Products</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ mb: 2 }}>
                  <Typography variant="caption">
                    These are products you want to highlight and will be presented to your store visitors at top.
                  </Typography>
                </Stack>
                <Autocomplete
                  multiple
                  sx={{ mb: 3 }}
                  value={featuredProducts}
                  onChange={(e, value) => {
                    setFeaturedProducts(value);
                  }}
                  id=""
                  fullWidth
                  options={productOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Products"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </AccordionDetails>
              <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                <Button
                  onClick={() => {
                    dispatch(updateStore({ featuredProducts }));
                  }}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Big Discounts</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ mb: 2 }}>
                  <Typography variant="caption">
                    Here you can select products with Huge Discount which can attract and retain more customers at your
                    store.
                  </Typography>
                </Stack>
                <Autocomplete
                  multiple
                  sx={{ mb: 3 }}
                  value={bigDiscounts}
                  onChange={(e, value) => {
                    setBigDiscounts(value);
                  }}
                  id=""
                  fullWidth
                  options={productOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Products"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </AccordionDetails>
              <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                <Button
                  onClick={() => {
                    dispatch(updateStore({ bigDiscounts }));
                  }}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Deal of the week</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ mb: 2 }}>
                  <Typography variant="caption">
                    These are products on which you are offering Weekly Discounts or Products with Max sale or
                    retention.
                  </Typography>
                </Stack>
                <Autocomplete
                  multiple
                  sx={{ mb: 3 }}
                  value={dealOfTheWeek}
                  onChange={(e, value) => {
                    setDealOfTheWeek(value);
                  }}
                  id=""
                  fullWidth
                  options={productOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Products"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </AccordionDetails>
              <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                <Button
                  onClick={() => {
                    dispatch(updateStore({ dealOfTheWeek }));
                  }}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Deal of the month</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ mb: 2 }}>
                  <Typography variant="caption">
                    These are products on which you are offering Monthly Discounts or Products with Max sale or
                    retention in this month.
                  </Typography>
                </Stack>
                <Autocomplete
                  multiple
                  sx={{ mb: 3 }}
                  value={dealOfTheMonth}
                  onChange={(e, value) => {
                    setDealOfTheMonth(value);
                  }}
                  id=""
                  fullWidth
                  options={productOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Products"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </AccordionDetails>
              <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                <Button
                  onClick={() => {
                    dispatch(updateStore({ dealOfTheMonth }));
                  }}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Deal of the day</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack sx={{ mb: 2 }}>
                  <Typography variant="caption">
                    These are products on which you are offering Discounts for single day or products with maximum
                    retention or sale
                  </Typography>
                </Stack>
                <Autocomplete
                  multiple
                  sx={{ mb: 3 }}
                  value={dealOfTheDay}
                  onChange={(e, value) => {
                    setDealOfTheDay(value);
                  }}
                  id=""
                  fullWidth
                  options={productOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Products"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </AccordionDetails>
              <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                <Button
                  onClick={() => {
                    dispatch(updateStore({ dealOfTheDay }));
                  }}
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Custom Sections</Typography>
              </AccordionSummary>
              {customSections.map((el) => (
                <div>
                  <AccordionDetails key={el.index}>
                    <TextField
                      sx={{ mb: 2 }}
                      name="sectionName"
                      label="Section Name"
                      fullWidth
                      value={el.name}
                      onChange={(e) => {
                        updateCustomSection(el.index, e.target.value, 'name');
                      }}
                    />
                    <Autocomplete
                      multiple
                      sx={{ mb: 2 }}
                      value={el.products}
                      onChange={(e, value) => {
                        updateCustomSection(el.index, value, 'products');
                      }}
                      id=""
                      fullWidth
                      options={productOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                          {option.label}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose Products"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </AccordionDetails>

                  <Stack sx={{ px: 4 }} direction={'row'} alignItems="center" justifyContent={'end'}>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {
                        removeCustomSection(el.index);
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </div>
              ))}

              <Stack sx={{ mb: 3, mt: 2 }} direction={'row'} alignItems="center" justifyContent={'center'}>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => {
                    addCustomSection();
                  }}
                >
                  Add Section
                </Button>
              </Stack>
              <Stack direction={'row'} sx={{ mb: 3 }} alignItems="center" justifyContent={'center'}>
                <Button
                  sx={{ width: 'max-content' }}
                  variant="contained"
                  onClick={() => {
                    dispatch(updateCustomSections(customSections));
                  }}
                >
                  Update Custom Sections
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Custom Banners</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {customBanners.map((el) => (
                  <div key={el.index}>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3, mb: 2 }}>
                          <UploadAvatar
                            required
                            name="avatarUrl"
                            accept="image/*"
                            maxSize={3145728}
                            onDrop={(files) => {
                              handleDropCustomBanner(files, el.index);
                            }}
                            file={el.preview}
                            helperText={
                              <Typography
                                variant="caption"
                                sx={{
                                  mt: 2,
                                  mx: 'auto',
                                  display: 'block',
                                  textAlign: 'center',
                                  color: 'text.secondary',
                                }}
                              >
                                Allowed *.jpeg, *.jpg, *.png, *.gif
                                <br /> max size of {fData(3145728)}
                              </Typography>
                            }
                          />
                        </Card>
                      </Grid>
                    </Grid>
                    <TextField
                      sx={{ mb: 2 }}
                      name="heroHeading"
                      label="Heading"
                      fullWidth
                      value={el.heading}
                      onChange={(e) => {
                        updateCustomBanner(el.index, e.target.value, 'heading');
                      }}
                    />
                    <TextField
                      sx={{ mb: 2 }}
                      multiline
                      name="heroDescription"
                      label="Caption"
                      fullWidth
                      value={el.caption}
                      onChange={(e) => {
                        updateCustomBanner(el.index, e.target.value, 'caption');
                      }}
                    />
                    <TextField
                      sx={{ mb: 2 }}
                      multiline
                      name="actionButton"
                      label="Action Button Label"
                      fullWidth
                      value={el.CTALabel}
                      onChange={(e) => {
                        updateCustomBanner(el.index, e.target.value, 'CTALabel');
                      }}
                    />

                    <Autocomplete
                      sx={{ mb: 2 }}
                      value={el.destination}
                      onChange={(e, value) => {
                        updateCustomBanner(el.index, value, 'destination');
                      }}
                      id=""
                      fullWidth
                      options={CTATypeOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose Destination"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {(() => {
                      switch (el.destination?.label) {
                        case 'Product':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.product}
                              onChange={(e, value) => {
                                updateCustomBanner(el.index, value, 'product');
                              }}
                              id=""
                              fullWidth
                              options={productOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Product"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Category':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.category}
                              onChange={(e, value) => {
                                updateCustomBanner(el.index, value, 'category');
                              }}
                              id=""
                              fullWidth
                              options={categoryOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Category"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Sub Category':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.subCategory}
                              onChange={(e, value) => {
                                updateCustomBanner(el.index, value, 'subCategory');
                              }}
                              id=""
                              fullWidth
                              options={subCategoryOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Sub Category"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Division':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.division}
                              onChange={(e, value) => {
                                updateCustomBanner(el.index, value, 'division');
                              }}
                              id=""
                              fullWidth
                              options={divisionOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Division"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Pages':
                          return (
                            <Autocomplete
                              sx={{ mb: 2 }}
                              value={el.page}
                              onChange={(e, value) => {
                                updateCustomBanner(el.index, value, 'page');
                              }}
                              id=""
                              fullWidth
                              options={pageOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Page"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        default:
                          break;
                      }
                    })()}
                    <Stack sx={{ px: 4 }} direction={'row'} alignItems="center" justifyContent={'end'}>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          removeCustomBanner(el.index);
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </div>
                ))}
              </AccordionDetails>
              <Stack sx={{ mb: 3, mt: 2 }} direction={'row'} alignItems="center" justifyContent={'center'}>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => {
                    addCustomBanner();
                  }}
                >
                  Add Custom Banner
                </Button>
              </Stack>
              <Stack direction={'row'} sx={{ mb: 3 }} alignItems="center" justifyContent={'center'}>
                <Button
                  sx={{ width: 'max-content' }}
                  variant="contained"
                  onClick={() => {
                    dispatch(updateCustomBanners(customBanners));
                  }}
                >
                  Update Custom Banners
                </Button>
              </Stack>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Image Banners</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {imageBanners.map((el) => (
                  <div key={el.index}>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3, mb: 2 }}>
                          <UploadAvatar
                            required
                            name="avatarUrl"
                            accept="image/*"
                            maxSize={3145728}
                            onDrop={(files) => {
                              handleDropImageBanner(files, el.index);
                            }}
                            file={el.preview}
                            helperText={
                              <Typography
                                variant="caption"
                                sx={{
                                  mt: 2,
                                  mx: 'auto',
                                  display: 'block',
                                  textAlign: 'center',
                                  color: 'text.secondary',
                                }}
                              >
                                Allowed *.jpeg, *.jpg, *.png, *.gif
                                <br /> max size of {fData(3145728)}
                              </Typography>
                            }
                          />
                        </Card>
                      </Grid>
                    </Grid>

                    <Autocomplete
                      sx={{ mb: 3 }}
                      value={el.destination}
                      onChange={(e, value) => {
                        updateImageBanner(el.index, value, 'destination');
                      }}
                      id=""
                      fullWidth
                      options={CTATypeOptions}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose Destination"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: '', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                    {(() => {
                      switch (el.destination?.label) {
                        case 'Product':
                          return (
                            <Autocomplete
                              sx={{ mb: 3 }}
                              value={el.product}
                              onChange={(e, value) => {
                                updateImageBanner(el.index, value, 'product');
                              }}
                              id=""
                              fullWidth
                              options={productOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Product"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Category':
                          return (
                            <Autocomplete
                              sx={{ mb: 3 }}
                              value={el.category}
                              onChange={(e, value) => {
                                updateImageBanner(el.index, value, 'category');
                              }}
                              id=""
                              fullWidth
                              options={categoryOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Category"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Sub Category':
                          return (
                            <Autocomplete
                              sx={{ mb: 3 }}
                              value={el.subCategory}
                              onChange={(e, value) => {
                                updateImageBanner(el.index, value, 'subCategory');
                              }}
                              id=""
                              fullWidth
                              options={subCategoryOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Sub Category"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Division':
                          return (
                            <Autocomplete
                              sx={{ mb: 3 }}
                              value={el.division}
                              onChange={(e, value) => {
                                updateImageBanner(el.index, value, 'division');
                              }}
                              id=""
                              fullWidth
                              options={divisionOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`${option.image}`}
                                    srcSet={`${option.image} 2x`}
                                    alt=""
                                  />
                                  {option.label}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Division"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        case 'Pages':
                          return (
                            <Autocomplete
                              sx={{ mb: 3 }}
                              value={el.page}
                              onChange={(e, value) => {
                                updateImageBanner(el.index, value, 'page');
                              }}
                              id=""
                              fullWidth
                              options={pageOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a Page"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                          );

                        default:
                          break;
                      }
                    })()}
                    <Stack sx={{ px: 4 }} direction={'row'} alignItems="center" justifyContent={'end'}>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          removeImageBanner(el.index);
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </div>
                ))}
              </AccordionDetails>

              <Stack sx={{ mb: 3, mt: 2 }} direction={'row'} alignItems="center" justifyContent={'center'}>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => {
                    addImageBanner();
                  }}
                >
                  Add Image Banner
                </Button>
              </Stack>
              <Stack direction={'row'} sx={{ mb: 3 }} alignItems="center" justifyContent={'center'}>
                <Button
                  sx={{ width: 'max-content' }}
                  variant="contained"
                  onClick={() => {
                    dispatch(updateImageBanners(imageBanners));
                  }}
                >
                  Update Image Banners
                </Button>
              </Stack>
            </Accordion>
            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Show Top Rated Products</Typography>
              <Switch
                {...label}
                checked={store.showTopRatedProducts}
                onChange={(e) => {
                  dispatch(updateStore({ showTopRatedProducts: e.target.checked }));
                }}
              />
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Show New Arrivals</Typography>
              <Switch
                {...label}
                checked={store.showNewArrivals}
                onChange={(e) => {
                  dispatch(updateStore({ showNewArrivals: e.target.checked }));
                }}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Shop By category</Typography>
              <Switch
                {...label}
                checked={store.showShopByCategory}
                onChange={(e) => {
                  dispatch(updateStore({ showShopByCategory: e.target.checked }));
                }}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Show Recommendations</Typography>
              <Switch
                {...label}
                checked={store.showRecommendations}
                onChange={(e) => {
                  dispatch(updateStore({ showRecommendations: e.target.checked }));
                }}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Customer Reviews</Typography>
              <Switch
                {...label}
                checked={store.showCustomerReviews}
                onChange={(e) => {
                  dispatch(updateStore({ showCustomerReviews: e.target.checked }));
                }}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Best Seller</Typography>
              <Switch
                {...label}
                checked={store.showBestSeller}
                onChange={(e) => {
                  dispatch(updateStore({ showBestSeller: e.target.checked }));
                }}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Top Picks</Typography>
              <Switch
                {...label}
                checked={store.showTopPicks}
                onChange={(e) => {
                  dispatch(updateStore({ showTopPicks: e.target.checked }));
                }}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack sx={{ mx: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography>Trending Products</Typography>
              <Switch
                checked={store.showTrendingProducts}
                onChange={(e) => {
                  dispatch(updateStore({ showTrendingProducts: e.target.checked }));
                }}
                {...label}
              />
            </Stack>
          </Box>

          {/* // ! Superstore */}
          {/* // * DONE Hero image, Hero text, Button link  */}
          {/* // * DONE Flash deals Product */}
          {/* // * DONE Top categories */}
          {/* // * DONE Top Ratings */}
          {/* // * DONE New Arrivals */}
          {/* // * DONE Big Discounts */}
          {/* // * DONE Products By category */}

          {/* // * DONE Products By category */}
          {/* // * DONE categories */}
          {/* // * DONE More for you */}

          {/* // * DONE Top Picks */}
          {/* // * DONE Best Seller */}
          {/* // * DONE Customer reviews */}
          {/* // * DONE Trending Items */}
          {/* // * DONE Custom section with heading and products */}

          {/* // * DONE Customisable Banners */}
          {/* // * DONE Image Banners */}

          {/* // * DONE Deal of the week */}
          {/* // * DONE Deal of the day */}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomiseSuperstore;

const CTATypeOptions = [
  { label: 'Product' },
  { label: 'Category' },
  { label: 'Sub Category' },
  { label: 'Division' },
  { label: 'Page' },
];
