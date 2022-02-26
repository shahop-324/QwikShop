/* eslint-disable react/prop-types */
import React from 'react';
import {
  
  Card,
  Grid,
  Dialog,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';

import { ExcelRenderer } from 'react-excel-renderer';

import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui

import { styled } from '@mui/material/styles';

// components
import { FormProvider, RHFUploadSingleFile } from '../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const BulkUploadCategory = ({ open, handleClose }) => {
  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
   
   
   
    handleSubmit,
   
  } = methods;

  
  const onSubmit = async () => {};

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    ExcelRenderer(file, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.rows);
      }
    });
  };
  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Bulk Upload Category</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <div>
                  <LabelStyle>Import Categories via Excel / CSV</LabelStyle>
                  <RHFUploadSingleFile
                    name="cover"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    maxSize={314572800}
                    onDrop={handleDrop}
                  />
                  <div className="my-3">
                    <Typography variant="caption">
                      Note: Download File format (<a href="#">Click here</a>)
                    </Typography>
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-end">
                    <Button type="submit" variant="contained">
                      Add categories
                    </Button>
                    <Button
                      onClick={() => {
                        handleClose();
                      }}
                      className="ms-3"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default BulkUploadCategory;
