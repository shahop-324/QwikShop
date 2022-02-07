/* eslint-disable react/jsx-key */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-boolean-value */
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
  Tooltip,
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
import MUIStyled from 'styled-components';
import DoNotDisturbOnRoundedIcon from '@mui/icons-material/DoNotDisturbOnRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Editor from '../../components/editor/index';
import { fetchCategory, fetchSubCategory, fetchDivision, updateProduct } from '../../actions';

import { RHFUploadMultiFile, FormProvider } from '../../components/hook-form';

// create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const ImagePreview = MUIStyled.img`

border: 1px solid #cecece;
border-radius: 10px;
height: 78px;
width: 78px;
object-fit: contain;

`;

const VideoPreview = MUIStyled.video`

border: 1px solid #cecece;
border-radius: 10px;
height: 78px;
width: 78px;
object-fit: contain;

`;

const Container = MUIStyled.div`
height: 78px;
width: 78px;
`;

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
const EditProduct = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  // call your hook here
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchSubCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchDivision());
  }, []);

  const { products, isUpdating } = useSelector((state) => state.product);

  const product = products.find((el) => el._id === id);

  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { divisions } = useSelector((state) => state.division);

  const [metaTitle, setMetaTitle] = useState(product.metaTitle);

  const [metaKeyword, setMetaKeyword] = useState(product.metaKeyword);

  const [metaDescription, setMetaDescription] = useState(product.metaDescription);

  const [colorsList, setColorsList] = useState(product.colorsList);

  const [addOnList, setAddOnList] = useState(product.addOnList);

  const [customVariants, setCustomVariants] = useState(product.customVariants);

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

  const addAddOnRow = () => {
    setAddOnList((prev) => [...prev, { index: uuidv4(), name: '', price: '', qtyInStock: 100, discountedPrice: '' }]);
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

  const [featured, setFeatured] = useState(false);
  const [weight, setWeight] = useState(product.weight);
  const [productName, setProductName] = useState(product.productName);
  const [description, setDescription] = useState(product.description.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
  const [category, setCategory] = useState(product.category);
  const [subCategory, setSubCategory] = useState(product.subCategory);
  const [division, setDivision] = useState(product.division);
  const [brand, setBrand] = useState(product.brand);
  const [productType, setProductType] = useState(product.productType);
  const [price, setPrice] = useState(product.price);
  const [discountedPrice, setDiscountedPrice] = useState(product.discountedPrice);

  const [minQuantitySold, setMinQuantitySold] = useState(product.minQuantitySold);
  const [productUnit, setProductUnit] = useState(product.productUnit);

  const [quantityInStock, setQuantityInStock] = useState(product.quantityInStock);
  const [productSKU, setProductSKU] = useState(product.productSKU);

  const [wholesalePrice, setWholesalePrice] = useState(product.wholesalePrice);

  const [minWholesaleQuantity, setMinWholesalePrice] = useState(product.minWholesaleQuantity);

  const [coins, setCoins] = useState(product.coins);
  const [activeStep, setActiveStep] = useState(0);
  const [length, setLength] = useState(product.length);
  const [width, setWidth] = useState(product.width);
  const [height, setHeight] = useState(product.height);
  const [dimensionUnit, setDimensionUnit] = useState(product.dimensionUnit);

  const [isFragile, setIsFragile] = useState(product.isFragile);
  const [isVeg, setIsVeg] = useState(productType?.label !== 'Meat & Fish');
  const [InTheBox, setInTheBox] = useState(product.InTheBox);
  const [acceptCOD, setAcceptCOD] = useState(product.acceptCOD);

  const [videoFiles, setVideoFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [excludedImages, setExcludedImages] = useState([]);
  const [excludedVideos, setExcludedVideos] = useState([]);

  const [priceDeterminingVariant, setPriceDeterminingVariant] = useState(customVariants[0]?.index);

  const excludeImage = (img) => {
    setExcludedImages((prev) => {
      prev.push(img);
      return prev;
    });
    forceUpdate();
  };

  const includeImage = (img) => {
    setExcludedImages((prev) => {
      prev = prev.filter((el) => el !== img);
      return prev;
    });
    forceUpdate();
  };

  const excludeVideo = (img) => {
    setExcludedVideos((prev) => {
      prev.push(img);
      return prev;
    });
    forceUpdate();
  };

  const includeVideo = (img) => {
    setExcludedVideos((prev) => {
      prev = prev.filter((el) => el !== img);
      return prev;
    });
    forceUpdate();
  };

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

  const [specifications, setSpecifications] = useState(product.specifications);

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
            const newArray = prev.map((item) => ({
              ...item,
              selected: false,
            }));

            newArray.push(el);
            return newArray;
          });
        } else {
          // setImageFiles

          setImageFiles((prev) => {
            const newArray = prev.map((item) => ({
              ...item,
              selected: false,
            }));

            newArray.push(el);
            return newArray;
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

  const onSubmit = () => {
    const formValues = {
      productType,
      productName,
      category,
      subCategory,
      division,
      brand,
      price,
      discountedPrice,
      wholesalePrice,
      minWholesaleQuantity,
      coins,
      isFragile,
      isVeg,
      acceptCOD,
      description,
      specifications,
      productUnit,
      productSKU,
      weight,
      quantityInStock,
      minQuantitySold,
      dimensionUnit,
      length,
      width,
      height,
      InTheBox,
      colorsList,
      customVariants,
      metaDescription,
      metaTitle,
      metaKeyword,
      addOnList,
      priceDeterminingVariant,
      featured,
    };

    dispatch(updateProduct(id, formValues, imageFiles, videoFiles, excludedImages, excludedVideos, handleClose));
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

  const addOnOptions = products
    .filter((el) => el._id !== product._id)
    .map((product) => ({
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

          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <>
                    <Grid className="px-4 pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Autocomplete
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
                              name="brand"
                              label="Brand"
                              fullWidth
                              value={brand}
                              onChange={(e) => {
                                setBrand(e.target.value);
                              }}
                            />
                            <TextField
                              type="number"
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
                              type="number"
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
                            <TextField
                              type="number"
                              name="wholesalePrice"
                              label="Wholesale Price"
                              fullWidth
                              value={wholesalePrice}
                              onChange={(e) => {
                                setWholesalePrice(e.target.value);
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
                              type="number"
                              name="minimumWholesaleQuantity"
                              label="Minimum Wholesale Quantity"
                              fullWidth
                              value={minWholesaleQuantity}
                              onChange={(e) => {
                                setMinWholesalePrice(e.target.value);
                              }}
                            />
                            <TextField
                              type="number"
                              name="coins"
                              label="Coins"
                              fullWidth
                              value={coins}
                              onChange={(e) => {
                                setCoins(e.target.value);
                              }}
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
                                control={<Switch onClick={(e) => setAcceptCOD(e.target.checked)} checked={acceptCOD} />}
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
                        type="submit"
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
                            <div
                              className="d-flex flex-row align-items-center my-3"
                              direction={'row'}
                              alignItems={'center'}
                              style={{ flexWrap: 'nowrap' }}
                            >
                              {product.images.map((el) => {
                                const isExcluded = excludedImages.includes(el);

                                return (
                                  <Container
                                    className="me-3 mb-3"
                                    style={{ height: '78px !important', width: '78px !important' }}
                                  >
                                    <ImagePreview src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el}`} />

                                    {excludedImages.includes(el) ? (
                                      <Tooltip title="Include Image">
                                        <IconButton
                                          onClick={() => {
                                            includeImage(el);
                                          }}
                                        >
                                          <AddCircleRoundedIcon color="success" />
                                        </IconButton>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Exclude Image">
                                        <IconButton
                                          onClick={() => {
                                            excludeImage(el);
                                          }}
                                        >
                                          <DoNotDisturbOnRoundedIcon color="error" />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  </Container>
                                );
                              })}
                              {product.videos.map((el) => {
                                const isExcluded = excludedVideos.includes(el);

                                return (
                                  <Container
                                    className="me-3 mb-3"
                                    style={{ height: '78px !important', width: '78px !important' }}
                                  >
                                    <VideoPreview src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el}`} />

                                    {excludedVideos.includes(el) ? (
                                      <Tooltip title="Include video">
                                        <IconButton
                                          onClick={() => {
                                            includeVideo(el);
                                          }}
                                        >
                                          <AddCircleRoundedIcon color="success" />
                                        </IconButton>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Exclude video">
                                        <IconButton
                                          onClick={() => {
                                            excludeVideo(el);
                                          }}
                                        >
                                          <DoNotDisturbOnRoundedIcon color="error" />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  </Container>
                                );
                              })}
                            </div>
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
                              type="text"
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
                              type="number"
                              name="length"
                              label="Length"
                              fullWidth
                              value={length}
                              onChange={(e) => {
                                setLength(e.target.value);
                              }}
                            />
                            <TextField
                              type="number"
                              name="width"
                              label="Width"
                              fullWidth
                              value={width}
                              onChange={(e) => {
                                setWidth(e.target.value);
                              }}
                            />
                            <TextField
                              type="number"
                              name="height"
                              label="Height"
                              fullWidth
                              value={height}
                              onChange={(e) => {
                                setHeight(e.target.value);
                              }}
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
                          {customVariants.map((el) => (
                            <Accordion key={el.index}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Stack direction="row" alignItems="center" spacing={3}>
                                  <TextField
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
                                          gridTemplateColumns: {
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(3, 1fr)',
                                            md: 'repeat(4, 1fr)',
                                          },
                                        }}
                                      >
                                        <TextField
                                          className="mb-2"
                                          type="text"
                                          label={`Type ${index + 1}`}
                                          name="name"
                                          fullWidth
                                          value={elm.name}
                                          onChange={(e) => {
                                            updateCustomVariantOption(el.index, elm.index, 'name', e.target.value);
                                          }}
                                        />
                                        <TextField
                                          className="mb-2"
                                          type="number"
                                          label={`Price ${index + 1}`}
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
                                          className="mb-2"
                                          type="number"
                                          label={`Wholesale price ${index + 1}`}
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
                          onSubmit();
                        }}
                        type="submit"
                        variant="contained"
                        loading={isUpdating}
                      >
                        Update <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
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

export default EditProduct;

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

// const productTypeOptions = [
//   {
//     label: 'Kirana store, Grocery & FMCG',
//     image: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-12/211213-wee-groceries-se-405p-a36212.jpg',
//   },
//   {
//     label: 'Restaurants & Hotels',
//     image: 'https://media-cdn.tripadvisor.com/media/photo-s/09/37/8b/94/metro-lounge.jpg',
//   },
//   {
//     label: 'Fashion, Apparel, Shoes & Accessories',
//     image: 'https://mms-images.out.customink.com/mms/images/catalog/categories/13_large.jpg',
//   },
//   {
//     label: 'Fruits & vegetables',
//     image: 'https://static.scientificamerican.com/sciam/cache/file/528E0B49-CDD0-42D4-B5BAA3EBAEC01AE6_source.jpg',
//   },
//   {
//     label: 'Mobile, Computers & Other Accessories',
//     image:
//       'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629842709000',
//   },
//   {
//     label: 'Books & Stationary products',
//     image: 'https://m.media-amazon.com/images/I/717EIB64t7L._SL1500_.jpg',
//   },
//   {
//     label: 'Beauty & Cosmetics',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmncqVXZMJkFNp6-OOjCKUl_kxiuWm4AjvG_lKKqzAq956scFZERXWq56fXUEWYqC0WM&usqp=CAU',
//   },
//   {
//     label: 'Electronic appliances',
//     image:
//       'https://cdn.vox-cdn.com/thumbor/Atvpj5tUuIgLq55pPrG2-A-MHF8=/0x389:8426x7181/1200x800/filters:focal(3671x2467:5117x3913)/cdn.vox-cdn.com/uploads/chorus_image/image/62795169/samsung_fridge.0.jpg',
//   },
//   {
//     label: 'Home decoration',
//     image: 'https://www.mymove.com/wp-content/uploads/2021/03/Home-decorating_Followtheflow_Shutterstock.jpg',
//   },
//   {
//     label: 'Furniture',
//     image: 'https://www.ikea.com/in/en/images/products/ektorp-2-seat-sofa__0818550_pe774481_s5.jpg?f=s',
//   },
//   {
//     label: 'Pharmacy & Medical Care',
//     image:
//       'https://i.guim.co.uk/img/media/65d68c03a1e035d0670711a642f7a272d3e660eb/0_1216_3063_1838/master/3063.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3056330a3a98cf23d2dfcbe60ba711ad',
//   },
//   {
//     label: 'Bakery & Cake shops',
//     image: 'https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg',
//   },
//   {
//     label: 'Fresh chicken, Fish & Meat',
//     image:
//       'https://static.freshtohome.com/media/catalog/product/cache/1/image/600x400/18ae109e34f485bd0b0c075abec96b2e/c/h/chicken-breast.jpg',
//   },
//   {
//     label: 'Local & Online services',
//     image:
//       'https://www.schroederplumbing.com/wp-content/uploads/2020/10/Modern-Plumbing-Technology-Old-School-Experience-And-Integrity-From-Your-Plumber-_-Mesa-AZ.jpg',
//   },
//   {
//     label: 'Jwellery, Gold and Gems',
//     image:
//       'https://www.candere.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/n/m/nmne3517-a.jpg',
//   },
//   {
//     label: 'Insurance & Financial services',
//     image:
//       'https://m.economictimes.com/thumb/msid-72304068,width-1200,height-900,resizemode-4,imgsize-191408/money10-getty.jpg',
//   },
//   {
//     label: 'Paan shop',
//     image: 'http://www.ugaoo.com/knowledge-center/wp-content/uploads/2017/10/shutterstock_613072169.jpg',
//   },
//   {
//     label: 'Gym & Sports equipment',
//     image: 'https://content.presspage.com/uploads/2110/1920_gym-covid-19-mask-risk-gettyimages.jpg?10000',
//   },
//   {
//     label: 'Educational institute, Schools & teachers',
//     image:
//       'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F60cb2948d2b1ff3c9b86dc9c%2FBlack-teacher-wearing-face-mask-while-explaining-math-lesson-in-the-classroom-%2F960x0.jpg%3Ffit%3Dscale',
//   },
//   {
//     label: 'Hardware & Construction tools',
//     image: 'https://laysantechnologies.com/CKeditor/Images/hardwares.png',
//   },
//   {
//     label: 'Transportation, Taxi, Travel & Tourism',
//     image:
//       'https://media.wired.com/photos/5cf832279c2a7cd3975976ca/2:1/w_2000,h_1000,c_limit/Transpo_XcelsiorChargeCharging_TA.jpg',
//   },
//   {
//     label: 'Car, bike, Tractor & vehicle accessories',
//     image:
//       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg?crop=1xw:0.9997727789138833xh;center,top&resize=480:*',
//   },
// ];
