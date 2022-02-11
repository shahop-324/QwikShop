import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Stack,
  Card,
  Typography,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  FormLabel,
  Chip,
  Divider,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateMenuItem, deleteMenuItem } from '../../../actions';

const UpdateStoreMenu = ({
  _id,
  levelA,
  parentA,
  menuTypeA,
  itemNameA,
  productA,
  categoryA,
  subCategoryA,
  divisionA,
  pageA,
}) => {
  const dispatch = useDispatch();

  const [menuType, setMenuType] = useState(menuTypeA);
  const [product, setProduct] = useState(productA);
  const [category, setCategory] = useState(categoryA);
  const [subCategory, setSubCategory] = useState(subCategoryA);
  const [division, setDivision] = useState(divisionA);
  const [page, setPage] = useState(pageA);
  const [itemName, setItemName] = useState(itemNameA);

  const [level, setLevel] = useState();
  const [parent, setParent] = useState();

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { divisions } = useSelector((state) => state.division);
  const { pages } = useSelector((state) => state.page);
  const { menus } = useSelector((state) => state.menu);

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

  const levelOneParentOptions = menus
    .filter((el) => el.level === 'One')
    .map((el) => ({
      label: el.itemName,
      value: el._id,
    }));

  const levelTwoParentOptions = menus
    .filter((el) => el.level === 'Two')
    .map((el) => ({
      label: el.itemName,
      value: el._id,
    }));

  const onUpdate = () => {
    dispatch(
      updateMenuItem({ level, parent, menuType, itemName, product, category, subCategory, division, page }, _id)
    );
  };

  const onDelete = () => {
    dispatch(deleteMenuItem(_id));
  };

  return (
    <div key={_id}>
      <FormControl sx={{ mb: 2 }}>
        <FormLabel id="demo-row-radio-buttons-group-label">Level</FormLabel>
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
          <FormControlLabel
            value="one"
            control={
              <Radio
                checked={level === 'One'}
                onClick={() => {
                  setLevel('One');
                }}
              />
            }
            label="One"
          />
          <FormControlLabel
            value="two"
            control={
              <Radio
                checked={level === 'Two'}
                onClick={() => {
                  setLevel('Two');
                }}
              />
            }
            label="Two"
          />
          <FormControlLabel
            value="three"
            control={
              <Radio
                checked={level === 'Three'}
                onClick={() => {
                  setLevel('Three');
                }}
              />
            }
            label="Three"
          />
        </RadioGroup>
      </FormControl>

      {(() => {
        switch (level) {
          case 'Two':
            return (
              <Autocomplete
                sx={{ mb: 3 }}
                value={parent}
                onChange={(e, value) => {
                  setParent(value);
                }}
                id=""
                fullWidth
                options={levelOneParentOptions}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose Parent"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            );

          case 'Three':
            // To be done
            return (
              <Autocomplete
                sx={{ mb: 3 }}
                value={parent}
                onChange={(e, value) => {
                  setParent(value);
                }}
                id=""
                fullWidth
                options={levelTwoParentOptions}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose Parent"
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

      <Autocomplete
        sx={{ mb: 3 }}
        value={menuType}
        onChange={(e, value) => {
          setMenuType(value);
        }}
        id=""
        fullWidth
        options={menuTypeOptions}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Type"
            inputProps={{
              ...params.inputProps,
              autoComplete: '', // disable autocomplete and autofill
            }}
          />
        )}
      />
      <TextField
        name="itemName"
        label="Name"
        fullWidth
        value={itemName}
        onChange={(e) => {
          setItemName(e.target.value);
        }}
      />
      <Box sx={{ mt: 2 }}>
        {(() => {
          switch (menuType?.label) {
            case 'Product':
              return (
                <Autocomplete
                  sx={{ mb: 3 }}
                  value={product}
                  onChange={(e, value) => {
                    setProduct(value);
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
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
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
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
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
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
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
                  value={page}
                  onChange={(e, value) => {
                    setPage(value);
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
      </Box>

      <Stack spacing={2} justifyContent="end" direction={'row'} alignItems="center">
        <Button onClick={onUpdate} variant="contained">Update</Button>
        <Button onClick={onDelete} variant="outlined">Remove</Button>
      </Stack>

      <Divider sx={{ my: 2 }} />
    </div>
  );
};

export default UpdateStoreMenu;

const menuTypeOptions = [
  {
    label: 'Product',
  },
  {
    label: 'Category',
  },
  {
    label: 'Sub category',
  },
  {
    label: 'Division',
  },
  {
    label: 'Pages',
  },
];
