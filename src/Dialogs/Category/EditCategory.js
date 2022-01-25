/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
import { updateCategory } from '../../actions';

const EditCategory = ({ open, handleClose, id }) => {
  const { categories, isUpdating } = useSelector((state) => state.category);

  const category = categories.find((el) => el._id === id);

  const { name, image } = category;

  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.category);
  const [file, setFile] = useState({ error: false, message: 'Category Image is required', value: '' });
  const [fileToPreview, setFileToPreview] = useState(`https://qwikshop.s3.ap-south-1.amazonaws.com/${image}`);
  const [categoryName, setCategoryName] = useState(name);

  const NewCategorySchema = Yup.object().shape({
    avatarUrl: Yup.mixed().test('required', 'Category image is required', (value) => value !== ''),
  });

  const defaultValues = () => ({
    avatarUrl: '',
  });

  const methods = useForm({
    resolver: yupResolver(NewCategorySchema),
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
    console.log(file.value, categoryName);
    dispatch(updateCategory(file.value, categoryName, id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Add Category</DialogTitle>
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
                  <TextField
                    className="mt-4"
                    name="categoryName"
                    label="Category Name"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
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
            Update Category
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

export default EditCategory;
