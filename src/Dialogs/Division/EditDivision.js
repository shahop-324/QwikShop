/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider } from '../../components/hook-form';
import { UploadAvatar } from '../../components/upload';

// utils
import { fData } from '../../utils/formatNumber';
import { fetchCategory, fetchSubCategory, updateDivision, updateSubCategory } from '../../actions';

const EditDivision = ({ open, handleClose, id }) => {
  useEffect(() => {
    dispatch(fetchSubCategory());
  }, []);
  const { divisions, isUpdating } = useSelector((state) => state.division);
  const { subCategories } = useSelector((state) => state.subCategory);

  const division = divisions.find((el) => el._id === id);

  const { name, image } = division;

  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.division);
  const [file, setFile] = useState({ error: false, message: 'Sub Category Image is required', value: '' });
  const [fileToPreview, setFileToPreview] = useState(`https://qwikshop.s3.ap-south-1.amazonaws.com/${image}`);
  const [divisionName, setDivisionName] = useState(name);
  const [subCategory, setSubCategory] = useState(division.subCategory);

  const NewSubCategorySchema = Yup.object().shape({
    avatarUrl: Yup.mixed().test('required', 'Sub Category image is required', (value) => value !== ''),
  });

  const defaultValues = () => ({
    avatarUrl: '',
  });

  const methods = useForm({
    resolver: yupResolver(NewSubCategorySchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    console.log(file);
    setFile((prev) => {
      prev.value = file;
      return prev;
    });
    setFileToPreview(URL.createObjectURL(file));
  };

  const onSubmit = () => {
    console.log(file.value, divisionName);
    dispatch(updateDivision(file.value, divisionName, subCategory, id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Edit Division</DialogTitle>
        <div className="p-4">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid className="px-4 pt-3" container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <UploadAvatar
                    required
                    name="avatarUrl"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    file={fileToPreview}
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
                  <Autocomplete
                    sx={{ mt: 3 }}
                    value={subCategory}
                    onChange={(e, value) => {
                      setSubCategory(value);
                    }}
                    id=""
                    fullWidth
                    options={subCategories.map((el) => ({
                      label: el.name,
                      image: el.image,
                      value: el._id,
                    }))}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${option.image}`}
                          srcSet={`https://qwikshop.s3.ap-south-1.amazonaws.com/${option.image} 2x`}
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
                  <TextField
                    className="mt-4"
                    name="divisionName"
                    label="Division Name"
                    fullWidth
                    value={divisionName}
                    onChange={(e) => {
                      setDivisionName(e.target.value);
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </div>
        <DialogActions>
          <LoadingButton
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
            loading={isUpdating}
          >
            Update Division
          </LoadingButton>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDivision;
