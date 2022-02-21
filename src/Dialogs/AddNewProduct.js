/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import DescriptionIcon from '@mui/icons-material/Description';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

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
  FormLabel,
  RadioGroup,
  Radio,
  FormControl,
  IconButton,
  Stack,
  Divider,
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
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../components/editor/index';
import { fetchCategory, fetchSubCategory, createNewProduct, fetchDivision } from '../actions';

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
    2: <DescriptionIcon />,
    3: <InsertPhotoRoundedIcon />,
    4: <FormatListBulletedRoundedIcon />,
    5: <InventoryRoundedIcon />,
    6: <CategoryRoundedIcon />,
    7: <AddShoppingCartRoundedIcon />,
    8: <LanguageRoundedIcon />,
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

const steps = [
  'Product information',
  'Description',
  'Product images',
  'Specifications',
  'Inventory',
  'Variants',
  'Add ons',
  'SEO',
];

// eslint-disable-next-line no-unused-vars
const AddNewProduct = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchSubCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchDivision());
  }, []);

  const { subCategories } = useSelector((state) => state.subCategory);
  const { products } = useSelector((state) => state.product);
  const { divisions } = useSelector((state) => state.division);
  const { categories } = useSelector((state) => state.category);
  const { isCreating } = useSelector((state) => state.product);

  const formik = useFormik({
    initialValues: {
      metaTitle: '',
      metaKeyword: '',
      metaDescription: '',
      weight: 100,
      productName: '',
      brand: '',
      price: '',
      discountedPrice: '',
      minQuantitySold: 1,
      quantityInStock: '',
      productSKU: '',
      wholesalePrice: '',
      minWholesaleQuantity: 1,
      coins: 0,
      length: 10,
      width: 10,
      height: 10,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      metaTitle: Yup.string().required('Meta Title is required'),
      metaKeyword: Yup.string().required('Meta Keywords is required'),
      metaDescription: Yup.string().required('Meta Description is required'),
      weight: Yup.number().required('Weight in grams is required'),
      productName: Yup.string().required('Product name is required'),
      brand: Yup.string(),
      price: Yup.string().required('Price is required'),
      discountedPrice: Yup.string().required('Discounted price is required (can also be same as price)'),
      minQuantitySold: Yup.number().required('Minimum number of quantity sold is required'),
      quantityInStock: Yup.string().required('Quantity in stock is required'),
      productSKU: Yup.string().required('Product SKU is required'),
      wholesalePrice: Yup.number(),
      minWholesaleQuantity: Yup.number(),
      coins: Yup.number(),
      length: Yup.string().required('Length is required'),
      width: Yup.string().required('Width is required'),
      height: Yup.string().required('Height is required'),
    }),
    onSubmit: (values) => {
      const formValues = {
        productName: values.productName,
        brand: values.brand,
        price: values.price,
        discountedPrice: values.discountedPrice,
        wholesalePrice: values.wholesalePrice,
        minWholesaleQuantity: values.minWholesaleQuantity,
        productSKU: values.productSKU,
        weight: values.weight,
        quantityInStock: values.quantityInStock,
        minQuantitySold: values.minQuantitySold,
        length: values.length,
        width: values.width,
        height: values.height,
        metaDescription: values.metaDescription,
        metaTitle: values.metaTitle,
        metaKeyword: values.metaKeyword,
        coins: values.coins,

        productType,
        category,
        description,
        subCategory,
        division,
        isFragile,
        isVeg,
        acceptCOD,
        specifications,
        productUnit,
        dimensionUnit,
        InTheBox,
        colorsList,
        customVariants,
        addOnList,
        priceDeterminingVariant,
        featured,
      };

      dispatch(createNewProduct(formValues, imageFiles, videoFiles, handleClose));
    },
  });

  const [colorsList, setColorsList] = useState([]);

  const [addOnList, setAddOnList] = useState([]);

  const [customVariants, setCustomVariants] = useState([]);

  const [specifications, setSpecifications] = useState([]);

  const addSpecificationRow = () => {
    setSpecifications((prev) => [...prev, { index: uuidv4(), property: '', value: '' }]);
  };

  const deleteSpecificationRow = (index) => {
    setSpecifications((prev) => prev.filter((el) => el.index !== index));
  };

  const updateSpecification = (index, value, field) => {
    setSpecifications((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const addCustomVariant = () => {
    setCustomVariants((prev) => [
      ...prev,
      {
        index: uuidv4(),
        title: '',
        options: [{ name: '', price: '', wholesalePrice: '', qtyInStock: 100, index: uuidv4() }],
      },
    ]);
  };

  const deleteCustomVariant = (index) => {
    setCustomVariants((prev) => prev.filter((el) => el.index !== index));
  };

  const updateCustomVariantTitle = (index, value) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.title = value;
        return el;
      })
    );
  };

  const updateCustomVariantOption = (index, optionIndex, field, value) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.options = el.options.map((elm) => {
          if (elm.index !== optionIndex) {
            return elm;
          }
          elm[field] = value;
          return elm;
        });
        return el;
      })
    );
  };

  const addCustomVariantOptionRow = (index) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.options = [...el.options, { name: '', price: '', discountedPrice: '', index: uuidv4() }];
        return el;
      })
    );
  };

  const deleteCustomVariantOptionRow = (index, optionsIndex) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.options = el.options.filter((elm) => elm.index !== optionsIndex);
        return el;
      })
    );
  };

  const addColorRow = () => {
    setColorsList((prev) => [...prev, { index: uuidv4(), color: '#538BF7' }]);
  };

  const deleteColorRow = (index) => {
    setColorsList((prev) => prev.filter((el) => el.index !== index));
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

  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [division, setDivision] = useState();
  const [productType, setProductType] = useState(null);
  const [productUnit, setProductUnit] = useState({
    label: 'piece',
  });

  const [activeStep, setActiveStep] = useState(0);
  const [dimensionUnit, setDimensionUnit] = useState({
    label: 'centimeter',
    value: 'cm',
  });

  const [isFragile, setIsFragile] = useState(false);
  const [isVeg, setIsVeg] = useState(productType?.label !== 'Meat & Fish');
  const [InTheBox, setInTheBox] = useState([{ index: uuidv4(), label: '' }]);
  const [acceptCOD, setAcceptCOD] = useState(false);

  const [videoFiles, setVideoFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [priceDeterminingVariant, setPriceDeterminingVariant] = useState(customVariants[0]?.index);

  const addInTheBox = () => {
    setInTheBox((prev) => [...prev, { index: uuidv4(), label: '' }]);
  };

  const deleteInTheBox = (index) => {
    setInTheBox((prev) => prev.filter((el) => el.index !== index));
  };

  const updateInTheBox = (index, value) => {
    setInTheBox((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.label = value;
        return el;
      })
    );
  };

  const onNext = () => {
    // eslint-disable-next-line consistent-return
    setActiveStep((prev) => {
      if (prev * 1 <= 6) {
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

      acceptedFiles.map((el) => {
        if (el.type === 'video/mp4') {
          // setVideoFiles
          setVideoFiles((prev) => {
            prev.push(el);
            return prev;
          });
        } else {
          // setImageFiles
          setImageFiles((prev) => {
            prev.push(el);
            return prev;
          });
        }
      });
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

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${category.image}`,
  }));

  const subCategoryOptions = subCategories
    .filter((el) => el.category?.value === category?.value)
    .map((subCategory) => ({
      label: subCategory.name,
      value: subCategory._id,
      image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${subCategory.image}`,
    }));

  const divisionOptions = divisions
    .filter((el) => el.subCategory?.value === subCategory?.value)
    .map((division) => ({
      label: division.name,
      value: division._id,
      image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${division.image}`,
    }));

  const addOnOptions = products.map((product) => ({
    label: product.productName,
    value: product._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${product.images[0]}`,
  }));

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open}>
        <div className="p-4">
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={formik.handleSubmit}>
            {(() => {
              switch (activeStep) {
                case 0:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Card sx={{ p: 3 }}>
                            <Autocomplete
                              required
                              sx={{ mb: 3 }}
                              value={productType}
                              onChange={(e, value) => {
                                setProductType(value);
                              }}
                              id=""
                              fullWidth
                              options={productTypeOptions}
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
                                  required
                                  {...params}
                                  label="Choose a Product Type"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: '', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
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
                                value={formik.values.productName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Product Name"
                                variant="outlined"
                                name="productName"
                                error={!!formik.touched.productName && !!formik.errors.productName}
                                helperText={formik.touched.productName && formik.errors.productName}
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
                              <Autocomplete
                                value={subCategory}
                                onChange={(e, value) => {
                                  setSubCategory(value);
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
                                    label="Choose a sub category"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                              <Autocomplete
                                value={division}
                                onChange={(e, value) => {
                                  setDivision(value);
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
                                    label="Choose a division"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                              <TextField
                                value={formik.values.brand}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Brand"
                                variant="outlined"
                                name="brand"
                                error={!!formik.touched.brand && !!formik.errors.brand}
                                helperText={formik.touched.brand && formik.errors.brand}
                              />
                              <TextField
                                value={formik.values.price}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Price"
                                variant="outlined"
                                name="price"
                                error={!!formik.touched.price && !!formik.errors.price}
                                helperText={formik.touched.price && formik.errors.price}
                                type="number"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment>
                                      <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                value={formik.values.discountedPrice}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Discounted Price"
                                variant="outlined"
                                name="discountedPrice"
                                error={!!formik.touched.discountedPrice && !!formik.errors.discountedPrice}
                                helperText={formik.touched.discountedPrice && formik.errors.discountedPrice}
                                type="number"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment>
                                      <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                value={formik.values.wholesalePrice}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Wholesale Price"
                                variant="outlined"
                                name="wholesalePrice"
                                error={!!formik.touched.wholesalePrice && !!formik.errors.wholesalePrice}
                                helperText={formik.touched.wholesalePrice && formik.errors.wholesalePrice}
                                type="number"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment>
                                      <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                value={formik.values.minWholesaleQuantity}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Minimum Wholesale Quantity"
                                variant="outlined"
                                name="minWholesaleQuantity"
                                error={!!formik.touched.minWholesaleQuantity && !!formik.errors.minWholesaleQuantity}
                                helperText={formik.touched.minWholesaleQuantity && formik.errors.minWholesaleQuantity}
                                type="number"
                              />
                              <TextField
                                value={formik.values.coins}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Coins"
                                variant="outlined"
                                name="coins"
                                error={!!formik.touched.coins && !!formik.errors.coins}
                                helperText={formik.touched.coins && formik.errors.coins}
                                type="number"
                              />
                            </Box>

                            <Box
                              sx={{
                                mt: 3,
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 2,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              {(productType?.label === 'Grocery' ||
                                productType?.label === 'Bakery Item' ||
                                productType?.label === 'Fast Food' ||
                                productType?.label === 'Indian Food' ||
                                productType?.label === 'Chocolate' ||
                                productType?.label === 'Medicine' ||
                                productType?.label === 'Pet supplies') && (
                                <FormControl className="mb-3">
                                  <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                                  <RadioGroup
                                    value={isVeg}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                  >
                                    <FormControlLabel
                                      value="true"
                                      control={
                                        <Radio
                                          onClick={() => {
                                            setIsVeg(true);
                                          }}
                                        />
                                      }
                                      label="Veg"
                                    />
                                    <FormControlLabel
                                      value="false"
                                      control={<Radio onClick={() => setIsVeg(false)} />}
                                      label="Non Veg"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              )}

                              <FormControl className="mb-3">
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                  Is Fragile (something which easily breaks or gets damaged) ?
                                </FormLabel>
                                <RadioGroup
                                  value={isFragile}
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value={true}
                                    control={
                                      <Radio
                                        onClick={() => {
                                          setIsFragile(true);
                                        }}
                                      />
                                    }
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={false}
                                    control={
                                      <Radio
                                        onClick={() => {
                                          setIsFragile(false);
                                        }}
                                      />
                                    }
                                    label="No"
                                  />
                                </RadioGroup>
                              </FormControl>
                              <FormGroup className="mt-3">
                                <FormControlLabel
                                  control={
                                    <Switch onClick={(e) => setAcceptCOD(e.target.checked)} checked={acceptCOD} />
                                  }
                                  label="Accept Cash on delivery"
                                />
                              </FormGroup>
                              <FormGroup className="mt-3">
                                <FormControlLabel
                                  control={<Switch onClick={(e) => setFeatured(e.target.checked)} checked={featured} />}
                                  label="Featured"
                                />
                              </FormGroup>
                            </Box>
                          </Card>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button onClick={handleClose}>Cancel</Button>
                      </DialogActions>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Card sx={{ p: 3 }}>
                            <Editor value={description} onChange={(value) => setDescription(value)} />
                          </Card>
                        </Grid>
                      </Grid>

                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button onClick={handleClose}>Cancel</Button>
                      </DialogActions>
                    </>
                  );

                case 2:
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
                                  accept="image/*, video/*"
                                  maxSize={50145728}
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
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
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
                          <Card sx={{ p: 3, mb: 3 }}>
                            {specifications.map((el) => (
                              <Stack key={el.index} spacing={2}>
                                <Box
                                  sx={{
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                  }}
                                >
                                  <TextField
                                    required
                                    type="text"
                                    name="propertyName"
                                    label="Property Name"
                                    fullWidth
                                    value={el.name}
                                    onChange={(e) => {
                                      updateSpecification(el.index, e.target.value, 'name');
                                    }}
                                  />

                                  <TextField
                                    required
                                    type="text"
                                    name="propertyValue"
                                    label="Property value"
                                    fullWidth
                                    value={el.value}
                                    onChange={(e) => {
                                      updateSpecification(el.index, e.target.value, 'value');
                                    }}
                                  />
                                </Box>
                                <Stack sx={{ px: 4 }} direction={'row'} alignItems={'center'} justifyContent={'end'}>
                                  <Button
                                    color="error"
                                    onClick={() => {
                                      deleteSpecificationRow(el.index);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Stack>
                              </Stack>
                            ))}
                            <Stack alignItems={'center'} justifyContent={'center'}>
                              {' '}
                              <Button onClick={addSpecificationRow} variant="outlined">
                                Add Specification
                              </Button>
                            </Stack>
                          </Card>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
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
                          <Card sx={{ p: 3, mb: 3 }}>
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <Autocomplete
                                required
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
                                    required
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
                                value={formik.values.minQuantitySold}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Minimum Quantity Sold"
                                variant="outlined"
                                name="minQuantitySold"
                                error={!!formik.touched.minQuantitySold && !!formik.errors.minQuantitySold}
                                helperText={formik.touched.minQuantitySold && formik.errors.minQuantitySold}
                                type="number"
                              />
                              <TextField
                                value={formik.values.productSKU}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Stock Keeping Unit"
                                variant="outlined"
                                name="productSKU"
                                error={!!formik.touched.productSKU && !!formik.errors.productSKU}
                                helperText={formik.touched.productSKU && formik.errors.productSKU}
                                type="text"
                              />
                              <TextField
                                value={formik.values.quantityInStock}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Quantity In Stock"
                                variant="outlined"
                                name="quantityInStock"
                                error={!!formik.touched.quantityInStock && !!formik.errors.quantityInStock}
                                helperText={formik.touched.quantityInStock && formik.errors.quantityInStock}
                                type="number"
                              />
                              <TextField
                                value={formik.values.weight}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Weight"
                                variant="outlined"
                                name="weight"
                                error={!!formik.touched.weight && !!formik.errors.weight}
                                helperText={formik.touched.weight && formik.errors.weight}
                                type="number"
                              />
                            </Box>
                          </Card>
                          <Card sx={{ p: 3, mb: 3 }}>
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <Autocomplete
                                required
                                value={dimensionUnit}
                                onChange={(e, value) => {
                                  setDimensionUnit(value);
                                }}
                                id=""
                                fullWidth
                                options={dimensionUnitOptions}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField
                                    required
                                    {...params}
                                    label="Dimension unit"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                              <TextField
                                value={formik.values.length}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Length"
                                variant="outlined"
                                name="length"
                                error={!!formik.touched.length && !!formik.errors.length}
                                helperText={formik.touched.length && formik.errors.length}
                                type="number"
                              />
                              <TextField
                                value={formik.values.width}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Width"
                                variant="outlined"
                                name="width"
                                error={!!formik.touched.width && !!formik.errors.width}
                                helperText={formik.touched.width && formik.errors.width}
                                type="number"
                              />
                              <TextField
                                value={formik.values.height}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Height"
                                variant="outlined"
                                name="height"
                                error={!!formik.touched.height && !!formik.errors.height}
                                helperText={formik.touched.height && formik.errors.height}
                                type="number"
                              />
                            </Box>
                          </Card>
                          <Card sx={{ p: 3, mb: 3 }}>
                            <Typography sx={{ mb: 3 }} variant="subtitle1">
                              What's included in Box
                            </Typography>
                            <Box
                              sx={{
                                mb: 3,
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              {InTheBox.map((el, index) => (
                                <TextField
                                  required
                                  key={el.index}
                                  name="item"
                                  label={`Item ${index + 1}`}
                                  fullWidth
                                  value={el.label}
                                  onChange={(e) => {
                                    updateInTheBox(el.index, e.target.value);
                                  }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment>
                                        <Button
                                          color="error"
                                          onClick={() => {
                                            deleteInTheBox(el.index);
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              ))}
                            </Box>

                            <Stack direction="row" alignItems="center" justifyContent="center">
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  addInTheBox();
                                }}
                              >
                                Add Item
                              </Button>
                            </Stack>
                          </Card>
                        </Grid>
                      </Grid>

                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
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
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Price Determining Variant</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              {customVariants.map((el) => (
                                <FormControlLabel
                                  key={el.index}
                                  value={el.index}
                                  control={
                                    <Radio
                                      onClick={() => {
                                        setPriceDeterminingVariant(el.index);
                                      }}
                                      checked={priceDeterminingVariant === el.index}
                                    />
                                  }
                                  label={el.title}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>

                          <Divider sx={{ my: 2 }} />
                          <div>
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
                                          required
                                          className="mb-2"
                                          defaultValue={'#ffffff'}
                                          type="color"
                                          label={`Color `}
                                          name="color"
                                          fullWidth
                                          value={el.color}
                                          onChange={(e) => {
                                            updateColor(e.target.value, el.index, 'color');
                                          }}
                                        />

                                        <TextField
                                          required
                                          type="text"
                                          label={`Color Name `}
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
                            {customVariants.map((el) => (
                              <Accordion key={el.index}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Stack direction="row" alignItems="center" spacing={3}>
                                    <TextField
                                      required
                                      className="mb-2"
                                      type="text"
                                      label={`Name of variant`}
                                      name="name"
                                      value={el.title}
                                      onChange={(e) => {
                                        updateCustomVariantTitle(el.index, e.target.value);
                                      }}
                                    />
                                    <IconButton
                                      onClick={() => {
                                        deleteCustomVariant(el.index);
                                      }}
                                    >
                                      <DeleteRounded />
                                    </IconButton>
                                  </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Card sx={{ p: 3 }}>
                                    {el.options.map((elm, index) => (
                                      <div className="d-flex flex-column mb-3" key={elm.index}>
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
                                            required
                                            className="mb-2"
                                            type="text"
                                            label={`Type`}
                                            name="name"
                                            fullWidth
                                            value={elm.name}
                                            onChange={(e) => {
                                              updateCustomVariantOption(el.index, elm.index, 'name', e.target.value);
                                            }}
                                          />
                                          <TextField
                                            required
                                            className="mb-2"
                                            type="number"
                                            label={`Price`}
                                            name="price"
                                            fullWidth
                                            value={elm.price}
                                            onChange={(e) => {
                                              updateCustomVariantOption(el.index, elm.index, 'price', e.target.value);
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
                                            required
                                            className="mb-2"
                                            type="number"
                                            label={`Wholsale price`}
                                            name="wholesalePrice"
                                            fullWidth
                                            value={elm.wholesalePrice}
                                            onChange={(e) => {
                                              updateCustomVariantOption(
                                                el.index,
                                                elm.index,
                                                'wholesalePrice',
                                                e.target.value
                                              );
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
                                            required
                                            className="mb-2"
                                            type="number"
                                            minValue={1}
                                            label={`Quantity In Stock`}
                                            name="qtyInStock"
                                            fullWidth
                                            value={elm.qtyInStock}
                                            onChange={(e) => {
                                              updateCustomVariantOption(
                                                el.index,
                                                elm.index,
                                                'qtyInStock',
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </Box>
                                        <div className="d-flex flex-row align-items-center justify-content-end">
                                          <Button
                                            onClick={() => {
                                              deleteCustomVariantOptionRow(el.index, elm.index);
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
                                          addCustomVariantOptionRow(el.index);
                                        }}
                                        variant="outlined"
                                      >
                                        Add variant row
                                      </Button>
                                    </div>
                                  </Card>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <Button
                                onClick={() => {
                                  addCustomVariant();
                                }}
                                variant="outlined"
                              >
                                Add variant
                              </Button>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
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

                case 6:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <div>
                            <Card sx={{ p: 3 }} className="mb-3">
                              <Autocomplete
                                multiple
                                sx={{ mb: 3 }}
                                value={addOnList}
                                onChange={(e, value) => {
                                  setAddOnList(value);
                                }}
                                id=""
                                fullWidth
                                options={addOnOptions}
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
                                    label="Choose Add ons"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                            </Card>
                          </div>
                        </Grid>
                      </Grid>

                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
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

                case 7:
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
                                value={formik.values.metaTitle}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Meta Title"
                                variant="outlined"
                                name="metaTitle"
                                error={!!formik.touched.metaTitle && !!formik.errors.metaTitle}
                                helperText={formik.touched.metaTitle && formik.errors.metaTitle}
                              />

                              <TextField
                                value={formik.values.metaKeyword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Meta Keyword"
                                variant="outlined"
                                name="metaKeyword"
                                error={!!formik.touched.metaKeyword && !!formik.errors.metaKeyword}
                                helperText={formik.touched.metaKeyword && formik.errors.metaKeyword}
                              />
                            </Box>

                            <TextField
                              value={formik.values.metaDescription}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              fullWidth
                              label="Meta Description"
                              variant="outlined"
                              name="metaDescription"
                              error={!!formik.touched.metaDescription && !!formik.errors.metaDescription}
                              helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                            />
                          </Card>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          disabled={!(formik.isValid && formik.dirty)}
                          type="submit"
                          variant="contained"
                          loading={isCreating}
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
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddNewProduct;

const dimensionUnitOptions = [
  {
    label: 'meter',
    value: 'm',
  },
  {
    label: 'centimeter',
    value: 'cm',
  },
  {
    label: 'miliimeter',
    value: 'mm',
  },
  {
    label: 'inch',
    value: 'in',
  },
  {
    label: 'foot',
    value: 'ft',
  },
  {
    label: 'kilometer',
    value: 'km',
  },
  {
    label: 'yard',
    value: 'yd',
  },
];

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

const productTypeOptions = [
  {
    label: 'Grocery',
    image:
      'https://media.istockphoto.com/photos/groceries-picture-id171302954?k=20&m=171302954&s=612x612&w=0&h=kDpFXA8IoG22Uxog3YUmWvzBRzwyibd6r4S2v5z-Mno=',
  },
  {
    label: 'Fruits & vegetables',
    image: 'https://www.eatrightontario.ca/EatRightOntario/media/Website-images-resized/Vegetables-resized.jpg',
  },
  {
    label: 'Meat & Fish',
    image: 'https://m.economictimes.com/thumb/msid-72861899,width-1200,height-900,resizemode-4,imgsize-113532/1.jpg',
  },
  { label: 'Bakery Item', image: 'https://www.saccosystem.com/public/imgCat3/big/127-570717010-prodotti-da-forno.jpg' },
  {
    label: 'Fast Food',
    image: 'https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/fast-food.jpg',
  },
  {
    label: 'Indian Food',
    image: 'https://www.thecoldwire.com/wp-content/uploads/2020/11/selection-of-indian-food.jpg',
  },
  {
    label: 'Drinks & Shakes',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpW34OFY9ciS23ldeLnWRIq35yWtE9h2NsffrJ3hsayhteF7rmWkx2pbMAewXT6LtZXRc&usqp=CAU',
  },
  { label: 'Indian Sweets', image: 'https://static.toiimg.com/photo/87304656.cms' },
  {
    label: 'Deserts',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYMQPQD0bMY1N_wuV9a3lCQX6-dB-BfytiJA&usqp=CAU',
  },
  {
    label: 'Chocolate',
    image:
      'https://m.economictimes.com/thumb/msid-70545996,width-1200,height-900,resizemode-4,imgsize-679342/chocolate2.jpg',
  },
  { label: 'Womens clothing', image: 'https://i.pinimg.com/736x/37/2c/6f/372c6f40eb0835eea3abd13a02a64cd0.jpg' },
  { label: 'Mens clothing', image: 'https://centralandme.com/wp-content/uploads/2017/09/sweat-shirt-thumb.jpg' },
  {
    label: 'Baby Clothing & Care',
    image: 'https://d1lhri34tovdcj.cloudfront.net/prod/mom365/featured-images/babycare.jpg',
  },
  {
    label: 'Cosmetics & Beauty',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beauty-decorative-cosmetics-makeup-brushes-set-and-royalty-free-image-930934354-1565213062.jpg?crop=1.00xw:0.752xh;0,0.106xh&resize=1200:*',
  },
  { label: 'Electronic Appliances', image: 'https://femina.wwmindia.com/content/2020/sep/home-appliances.jpg' },
  {
    label: 'Electronic Gadgets',
    image: 'https://5.imimg.com/data5/SELLER/Default/2021/4/US/FX/DC/119904249/electronic-gadgets-500x500.jpg',
  },
  { label: 'Sports & Fitness', image: 'https://sportsequipmentssite.files.wordpress.com/2016/03/sports-2-10-14.jpg' },
  {
    label: 'Furniture',
    image:
      'https://www.archiproducts.com/images/editor/gallery/desktop_260x260_1031d6ff-1ee8-4ae3-a14b-d26aaf38ca38.jpg',
  },
  {
    label: 'Home Decor',
    image: 'https://www.fnp.com/images/pr/l/v20210902185645/iron-ganesha-tlight-candle-stand_1.jpg',
  },
  {
    label: 'Medicine',
    image: 'https://sfenvironment.org/sites/default/files/styles/large/public/detail_th_medicine_0_0.jpg?itok=ynMwtFQd',
  },
  { label: 'Footwear', image: 'https://m.media-amazon.com/images/I/71D9ImsvEtL._UL1500_.jpg' },
  { label: 'Travel essentials', image: 'https://5.imimg.com/data5/GV/NI/MY-6348933/travel-bags-1-500x500.jpg' },
  {
    label: 'Fashion Accessories',
    image:
      'https://previews.123rf.com/images/lyulka12/lyulka121801/lyulka12180100083/94256371-collection-of-women-s-black-set-of-fashion-accessories-and-cosmetics-on-a-wooden-white-background-fl.jpg',
  },
  {
    label: 'Garments',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-bath-towels-1572897724.png?crop=1.00xw:0.724xh;0,0.215xh&resize=1200:*',
  },
  {
    label: 'Stationary',
    image: 'https://5.imimg.com/data5/YL/RI/OR/SELLER-95604177/stationeries-500x500-png-500x500.png',
  },
  {
    label: 'Personal Care',
    image: 'https://laxmimegamart.com/image/cache/catalog/picture/personal_care-600x315w.jpeg',
  },
  {
    label: 'Pet supplies',
    image:
      'https://media.istockphoto.com/photos/accessories-for-cat-and-dog-on-blue-background-pet-care-and-training-picture-id1248454290?k=20&m=1248454290&s=612x612&w=0&h=Ajti5uiVqrJ4Ll66-1JS3qfSwSwvSHBAK-dOyJDj8Ow=',
  },
  {
    label: 'Gifts',
    image: 'https://www.mensjournal.com/wp-content/uploads/mf/1280-under-50-gifts-main.jpg?w=900&quality=86&strip=all',
  },
  {
    label: 'Plants',
    image:
      'https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2014/6/25/0/CI_04-fbfd01d70004.jpg.rend.hgtvcom.966.725.suffix/1452664590074.jpeg',
  },
  {
    label: 'Watch',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/affordable-watches-1575670104.jpg?crop=1.00xw:0.752xh;0,0.00962xh&resize=1200:*',
  },
  { label: 'Car & Bike Accessories', image: 'https://autojosh.com/wp-content/uploads/2019/03/genuine-car-parts.jpg' },
  {
    label: 'Electronic items',
    image:
      'https://hips.hearstapps.com/amv-prod-gp.s3.amazonaws.com/gearpatrol/wp-content/uploads/2017/10/Calming-Light-Bulbs-M2W-Gear-Patrol-Lead-Full.jpg',
  },
  {
    label: 'Home Essentials',
    image: 'https://cairowestmag.com/wp-content/uploads/2020/07/SummerHomeEssentials_Indoor_numbers.jpg',
  },
  {
    label: 'Kitchen Essentials',
    image: 'https://torontocaribbean.com/wp-content/uploads/2019/11/Depositphotos_198562496_l-2015.jpg',
  },
  { label: 'Dairy Products', image: 'https://news.sanfordhealth.org/wp-content/uploads/2020/06/Dairy-products.jpg' },
  { label: 'Snacks', image: 'https://m.media-amazon.com/images/I/81FfpLMWNfL._SL1500_.jpg' },
];
