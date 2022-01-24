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
import { FormProvider } from '../components/hook-form';
import { UploadAvatar } from '../components/upload';

// utils
import { fData } from '../utils/formatNumber';

const AddNewCategory = ({ open, handleClose }) => {
  const [file, setFile] = useState({ error: false, message: 'Category Image is required', value: '' });
  const [fileToPreview, setFileToPreview] = useState();
  const [categoryName, setCategoryName] = useState({ error: false, message: 'category name is required', value: '' });

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

  const onSubmit = () => {};

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
                    error={categoryName.error}
                    required
                    helperText={categoryName.error ? "Category name is required" : ""}
                    className="mt-4"
                    name="categoryName"
                    label="Category Name"
                    fullWidth
                    value={categoryName.value}
                    onChange={(e) => {
                      if (!e.target.value) {
                        setCategoryName((prev) => {
                          prev.error = true;
                          return prev;
                        });
                      } else {
                        setCategoryName((prev) => {
                          prev.error = false;
                          return prev;
                        });
                      }
                      setCategoryName((prev) => {
                        prev.value = e.target.value;
                        return prev;
                      });
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
              //   onNext();
            }}
            type="submit"
            variant="contained"
            loading={false}
          >
            Create category
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

export default AddNewCategory;
