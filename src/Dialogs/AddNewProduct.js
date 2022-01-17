/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
  InputAdornment,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import Editor from '../components/editor/index';

import { RHFUploadMultiFile, FormProvider } from '../components/hook-form';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingBasketIcon />,
    2: <InsertPhotoRoundedIcon />,
    3: <InventoryRoundedIcon />,
    4: <CategoryRoundedIcon />,
    5: <AddShoppingCartRoundedIcon />,
    6: <LanguageRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Product information', 'Product images', 'Inventory', 'Variants', 'Add ons', 'SEO'];

// eslint-disable-next-line no-unused-vars
const AddNewProduct = ({ open, handleClose }) => {
  useEffect(() => {}, []);

  const [metaTitle, setMetaTitle] = useState('');

  const [metaKeyword, setMetaKeyword] = useState('');

  const [metaDescription, setMetaDescription] = useState('');

  const [variantList, setVariantList] = useState([{ index: '', name: '', price: '', discountedPrice: '' }]);

  const [colorsList, setColorsList] = useState([{ index: '', color: '', name: '' }]);

  const [addOnList, setAddOnList] = useState([{ index: '', name: '', price: '', discountedPrice: '' }]);

  const addAddOnRow = () => {
    setAddOnList((prev) => [...prev, { index: uuidv4(), name: '', price: '', discountedPrice: '' }]);
  };

  const deleteAddOnRow = (index) => {
    setAddOnList((prev) => prev.filter((el) => el.index !== index));
  };

  const addColorRow = () => {
    setColorsList((prev) => [...prev, { index: uuidv4(), color: '#538BF7' }]);
  };

  const deleteColorRow = (index) => {
    setColorsList((prev) => prev.filter((el) => el.index !== index));
  };

  const addVariantRow = () => {
    setVariantList((prev) => [...prev, { index: uuidv4(), name: '', price: '', discountedPrice: '' }]);
  };

  const deleteVariantRow = (index) => {
    setVariantList((prev) => prev.filter((el) => el.index !== index));
  };

  const updateVariant = (value, index, field) => {
    setVariantList((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const updateColor = (value, index, field) => {
    setColorsList((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const updateAddOn = (value, index, field) => {
    setAddOnList((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const [weight, setWeight] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [discountedPrice, setDiscountedPrice] = useState();

  const [minQuantitySold, setMinQuantitySold] = useState();
  const [productUnit, setProductUnit] = useState();

  const [quantityInStock, setQuantityInStock] = useState();
  const [productSKU, setProductSKU] = useState();

  const [activeStep, setActiveStep] = useState(0);

  const onNext = () => {
    // eslint-disable-next-line consistent-return
    setActiveStep((prev) => {
      if (prev * 1 <= 4) {
        return (prev += 1);
      }
    });
  };

  const onPrev = () => {
    setActiveStep((prev) => (prev -= 1));
  };

  const NewProductSchema = Yup.object().shape({
    images: Yup.array().min(1, 'Images is required'),
  });

  const defaultValues = {
    images: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { watch, setValue, handleSubmit } = methods;

  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <div className="p-4">
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            className="mb-4"
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                          >
                            <TextField
                              name="productName"
                              label="Product Name"
                              fullWidth
                              value={productName}
                              onChange={(e) => {
                                setProductName(e.target.value);
                              }}
                            />

                            <Autocomplete
                              value={category}
                              onChange={(e, value) => {
                                setCategory(value);
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
                                  label="Choose a category"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                            <TextField
                              name="price"
                              label="Price"
                              fullWidth
                              value={price}
                              onChange={(e) => {
                                setPrice(e.target.value);
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment>
                                    <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <TextField
                              name="discountedPrice"
                              label="Discounted price"
                              fullWidth
                              value={discountedPrice}
                              onChange={(e) => {
                                setDiscountedPrice(e.target.value);
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment>
                                    <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>

                          <Editor />
                          <FormGroup className="mt-3">
                            <FormControlLabel control={<Switch defaultChecked />} label="Accept Cash on delivery" />
                          </FormGroup>
                        </Card>
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <LoadingButton
                        onClick={() => {
                          onNext();
                        }}
                        type="submit"
                        variant="contained"
                        loading={false}
                      >
                        Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                      </LoadingButton>
                      <Button>Cancel</Button>
                    </DialogActions>
                  </>
                );

              case 1:
                return (
                  <>
                    <div className="mt-3">
                      <FormProvider methods={methods} onSubmit={handleSubmit(onNext)}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={12}>
                            <Card sx={{ p: 3 }}>
                              <RHFUploadMultiFile
                                name="images"
                                showPreview
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                onRemove={handleRemove}
                                onRemoveAll={handleRemoveAll}
                              />
                            </Card>
                          </Grid>
                        </Grid>
                      </FormProvider>
                    </div>
                    <DialogActions>
                      <LoadingButton
                        onClick={() => {
                          onPrev();
                        }}
                        type="submit"
                        variant="outlined"
                        loading={false}
                      >
                        Previous
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => {
                          onNext();
                        }}
                        type="submit"
                        variant="contained"
                        loading={false}
                      >
                        Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                      </LoadingButton>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </>
                );

              case 2:
                return (
                  <>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                          >
                            <Autocomplete
                              value={productUnit}
                              onChange={(e, value) => {
                                setProductUnit(value);
                              }}
                              id=""
                              fullWidth
                              options={productUnitOptions}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Product unit"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />

                            <TextField
                              type="number"
                              name="minQuantitySold"
                              label="Minimum quantity sold"
                              fullWidth
                              value={minQuantitySold}
                              onChange={(e) => {
                                setMinQuantitySold(e.target.value);
                              }}
                            />
                            <TextField
                              type="number"
                              name="productSKU"
                              label="Stock keeping unit"
                              fullWidth
                              value={productSKU}
                              onChange={(e) => {
                                setProductSKU(e.target.value);
                              }}
                            />
                            <TextField
                              type="number"
                              name="quantityInStock"
                              label="Quantity in stock"
                              fullWidth
                              value={quantityInStock}
                              onChange={(e) => {
                                setQuantityInStock(e.target.value);
                              }}
                            />
                            <TextField
                              type="number"
                              name="weight"
                              label="Weight (in grams)"
                              fullWidth
                              value={weight}
                              onChange={(e) => {
                                setWeight(e.target.value);
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>

                    <DialogActions>
                      <LoadingButton
                        onClick={() => {
                          onPrev();
                        }}
                        type="submit"
                        variant="outlined"
                        loading={false}
                      >
                        Previous
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => {
                          onNext();
                        }}
                        type="submit"
                        variant="contained"
                        loading={false}
                      >
                        Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                      </LoadingButton>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </>
                );

              case 3:
                return (
                  <>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <div>
                          <Accordion className="mb-3">
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography variant="h6">Sizes</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Card sx={{ p: 3 }} className="mb-3">
                                {variantList.map((el, index) => (
                                  <div className="d-flex flex-column mb-3" key={el.index}>
                                    <Box
                                      className="mb-2"
                                      sx={{
                                        display: 'grid',
                                        columnGap: 2,
                                        rowGap: 3,
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                      }}
                                    >
                                      <TextField
                                        className="mb-2"
                                        type="text"
                                        label={`Name ${index + 1}`}
                                        name="color"
                                        fullWidth
                                        value={el.name}
                                        onChange={(e) => {
                                          updateVariant(e.target.value, el.index, 'name');
                                        }}
                                      />
                                      <TextField
                                        className="mb-2"
                                        type="text"
                                        label={`Price ${index + 1}`}
                                        name="color"
                                        fullWidth
                                        value={el.price}
                                        onChange={(e) => {
                                          updateVariant(e.target.value, el.index, 'price');
                                        }}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment>
                                              <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                      <TextField
                                        className="mb-2"
                                        type="text"
                                        label={`Discounted price ${index + 1}`}
                                        name="color"
                                        fullWidth
                                        value={el.discountedPrice}
                                        onChange={(e) => {
                                          updateVariant(e.target.value, el.index, 'discountedPrice');
                                        }}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment>
                                              <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    </Box>
                                    <div className="d-flex flex-row align-items-center justify-content-end">
                                      <Button
                                        onClick={() => {
                                          deleteVariantRow(el.index);
                                        }}
                                        size="small"
                                        color="error"
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                <div className="d-flex flex-row align-items-center justify-content-center">
                                  <Button
                                    onClick={() => {
                                      addVariantRow();
                                    }}
                                    variant="outlined"
                                  >
                                    Add Variant
                                  </Button>
                                </div>
                              </Card>
                            </AccordionDetails>
                          </Accordion>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <Typography variant="h6">Color</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Card sx={{ p: 3 }}>
                                {colorsList.map((el, index) => (
                                  <div key={el.index} className="d-flex flex-column">
                                    <Box
                                      className="mb-3"
                                      sx={{
                                        display: 'grid',
                                        columnGap: 2,
                                        rowGap: 3,
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                      }}
                                    >
                                      <TextField
                                        className="mb-2"
                                        defaultValue={'#ffffff'}
                                        type="color"
                                        label={`Color ${index + 1}`}
                                        name="color"
                                        fullWidth
                                        value={el.color}
                                        onChange={(e) => {
                                          updateColor(e.target.value, el.index, 'color');
                                        }}
                                      />

                                      <TextField
                                        type="text"
                                        label={`Color Name ${index + 1}`}
                                        name="name"
                                        fullWidth
                                        value={el.name}
                                        onChange={(e) => {
                                          updateColor(e.target.value, el.index, 'name');
                                        }}
                                      />
                                    </Box>
                                    <div className="d-flex flex-row align-items-center justify-content-end">
                                      <Button
                                        color="error"
                                        size="small"
                                        onClick={() => {
                                          deleteColorRow(el.index);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  </div>
                                ))}

                                <div className="d-flex flex-row align-items-center justify-content-center">
                                  <Button
                                    onClick={() => {
                                      addColorRow();
                                    }}
                                    variant="outlined"
                                  >
                                    Add color
                                  </Button>
                                </div>
                              </Card>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <LoadingButton
                        onClick={() => {
                          onPrev();
                        }}
                        type="submit"
                        variant="outlined"
                        loading={false}
                      >
                        Previous
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => {
                          onNext();
                        }}
                        type="submit"
                        variant="contained"
                        loading={false}
                      >
                        Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                      </LoadingButton>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </>
                );

              case 4:
                return (
                  <>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <div>
                          <Card sx={{ p: 3 }} className="mb-3">
                            <FormGroup className="mb-4">
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Make AddOn compulsory on this product"
                              />
                            </FormGroup>
                            {addOnList.map((el, index) => (
                              <div className="d-flex flex-column mb-3" key={el.index}>
                                <Box
                                  className="mb-2"
                                  sx={{
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                  }}
                                >
                                  <TextField
                                    className="mb-2"
                                    type="text"
                                    label={`Name ${index + 1}`}
                                    name="name"
                                    fullWidth
                                    value={el.name}
                                    onChange={(e) => {
                                      updateAddOn(e.target.value, el.index, 'name');
                                    }}
                                  />
                                  <TextField
                                    className="mb-2"
                                    type="text"
                                    label={`Price ${index + 1}`}
                                    name="price"
                                    fullWidth
                                    value={el.price}
                                    onChange={(e) => {
                                      updateVariant(e.target.value, el.index, 'price');
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment>
                                          <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  <TextField
                                    className="mb-2"
                                    type="text"
                                    label={`Discounted price ${index + 1}`}
                                    name="discountedPrice"
                                    fullWidth
                                    value={el.discountedPrice}
                                    onChange={(e) => {
                                      updateVariant(e.target.value, el.index, 'discountedPrice');
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment>
                                          <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Box>
                                <div className="d-flex flex-row align-items-center justify-content-end">
                                  <Button
                                    onClick={() => {
                                      deleteAddOnRow(el.index);
                                    }}
                                    size="small"
                                    color="error"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <Button
                                onClick={() => {
                                  addAddOnRow();
                                }}
                                variant="outlined"
                              >
                                Add AddOn
                              </Button>
                            </div>
                          </Card>
                        </div>
                      </Grid>
                    </Grid>

                    <DialogActions>
                      <LoadingButton
                        onClick={() => {
                          onPrev();
                        }}
                        type="submit"
                        variant="outlined"
                        loading={false}
                      >
                        Previous
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => {
                          onNext();
                        }}
                        type="submit"
                        variant="contained"
                        loading={false}
                      >
                        Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                      </LoadingButton>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </>
                );

              case 5:
                return (
                  <>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            className="mb-3"
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                          >
                            <TextField
                              name="metaTitle"
                              label="Meta Title"
                              fullWidth
                              value={metaTitle}
                              onChange={(e) => {
                                setMetaTitle(e.target.value);
                              }}
                            />

                            <TextField
                              name="metaKeyword"
                              label="Meta Keyword"
                              fullWidth
                              value={metaKeyword}
                              onChange={(e) => {
                                setMetaKeyword(e.target.value);
                              }}
                            />
                          </Box>

                          <TextField
                            name="metaDescription"
                            label="Meta Description"
                            fullWidth
                            value={metaDescription}
                            onChange={(e) => {
                              setMetaDescription(e.target.value);
                            }}
                          />
                        </Card>
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <LoadingButton
                        onClick={() => {
                          onPrev();
                        }}
                        type="submit"
                        variant="outlined"
                        loading={false}
                      >
                        Previous
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => {
                          // onNext();
                        }}
                        type="submit"
                        variant="contained"
                        loading={false}
                      >
                        Finish <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                      </LoadingButton>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </>
                );

              default:
                break;
            }
          })()}
        </div>
      </Dialog>
    </>
  );
};

export default AddNewProduct;

const productUnitOptions = [
  {
    label: 'piece',
  },
  {
    label: 'kg',
  },
  {
    label: 'gm',
  },
  {
    label: 'ml',
  },
  {
    label: 'litre',
  },
  {
    label: 'mm',
  },
  {
    label: 'ft',
  },
  {
    label: 'meter',
  },
  {
    label: 'sq. ft.',
  },
  {
    label: 'sq. meter',
  },
  {
    label: 'km',
  },
  {
    label: 'set',
  },
  {
    label: 'hour',
  },
  {
    label: 'day',
  },
  {
    label: 'bunch',
  },
  {
    label: 'bundle',
  },
  {
    label: 'month',
  },
  {
    label: 'year',
  },
  {
    label: 'service',
  },
  {
    label: 'work',
  },
  {
    label: 'packet',
  },
  {
    label: 'box',
  },
  {
    label: 'pound',
  },
  {
    label: 'dozen',
  },
  {
    label: 'gunta',
  },
  {
    label: 'pair',
  },
  {
    label: 'minute',
  },
  {
    label: 'qunital',
  },
  {
    label: 'ton',
  },
  {
    label: 'capsule',
  },
  {
    label: 'tablet',
  },
  {
    label: 'plate',
  },
  {
    label: 'inch',
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
