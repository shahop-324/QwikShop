/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Autocomplete,
  Typography,
  Button,
} from '@mui/material';
import { FormProvider } from '../components/hook-form';
import { UploadAvatar } from '../components/upload';
// utils
import { fData } from '../utils/formatNumber';

const SEOSettings = ({ open, handleClose }) => {
  const SEOSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    metaDescription: Yup.string().required('Meta description is required'),
    image: Yup.string().required('Image is required'),
  });

  const [title, setTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [file, setFile] = useState('');
  const [fileToPreview, setFileToPreview] = useState();

  const methods = useForm({
    resolver: yupResolver(SEOSchema),
  });

  const { handleSubmit } = methods;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    setFile(file);
    setFileToPreview(URL.createObjectURL(file));
  };

  const onSubmit = async () => {
    const formValues = {
      title,
      metaDescription,
      file,
    };

    console.log(formValues);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Store SEO</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid className="px-4 pt-3" container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                  }}
                >
                  <TextField
                    name="title"
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <TextField
                    name="metaDescription"
                    label="Meta Description"
                    fullWidth
                    value={metaDescription}
                    onChange={(e) => {
                      setMetaDescription(e.target.value);
                    }}
                  />
                  <Typography>Social sharing image preview</Typography>

                  <Box sx={{ mb: 5 }}>
                    <UploadAvatar
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
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
          <div className='d-flex flex-row align-items-center justify-content-end py-3 px-4'>
              <Button variant="contained">Save</Button>
              <Button onClick={handleClose} className="ms-3">Close</Button>
          </div>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default SEOSettings;
