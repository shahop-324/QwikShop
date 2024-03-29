/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Dialog, DialogTitle, Button, Typography, Stack } from '@mui/material';
import readXlsxFile from 'read-excel-file';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { v4 as uuidv4 } from 'uuid';
import { UploadRounded } from '@mui/icons-material';

import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// components
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, RHFUploadSingleFile } from '../../components/hook-form';
import { bulkUploadCustomers, resetIsBulkImportingCustomer } from '../../actions';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    description: 'Customer name',
    width: 150,
    editable: true,
    sortable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'Customer mobile number',
    width: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    description: 'Customer email address',
    width: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'pincode',
    headerName: 'Pincode',
    description: 'Customer pincode',
    width: 120,
    editable: true,
    sortable: true,
  },
  {
    field: 'city',
    headerName: 'City',
    description: 'Customer city',
    width: 120,
    editable: true,
    sortable: true,
  },
];

const schema = {
  name: {
    prop: 'name',
    type: String,
    required: true,
  },
  phone: {
    prop: 'phone',
    type: String,
    required: true,
  },
  email: {
    prop: 'email',
    type: String,
    required: true,
  },
  pincode: {
    prop: 'pincode',
    type: Number,
  },
  city: {
    prop: 'city',
    type: String,
  },
};

const BulkUploadCustomer = ({ open, handleClose }) => {
  const [rows, setRows] = useState([]);
  const [invalidFormat, setInvalidFormat] = useState(false);
  const dispatch = useDispatch();

  const { isBulkImporting } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(resetIsBulkImportingCustomer());
  }, []);

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

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    readXlsxFile(file, { schema }).then(({ rows, errors }) => {
      if (errors !== undefined && errors.length > 0) {
        setInvalidFormat(true);
      } else {
        setInvalidFormat(false);
        const newRows = rows.map((e) => {
          e.id = uuidv4();
          return e;
        });

        console.log(rows);
        setRows(newRows);
      }
    });
  };
  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Bulk Upload Customer</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <div>
                  <Stack sx={{ mb: 3 }} direction={'row'} alignItems="center" justifyContent={'space-between'}>
                    <LabelStyle>Import Customers via Excel / CSV</LabelStyle>
                    <div className="d-flex flex-row align-items-center justify-content-end">
                      <LoadingButton
                        loading={isBulkImporting}
                        disabled={!(rows !== undefined && rows.length > 0)}
                        onClick={() => {
                          dispatch(bulkUploadCustomers(rows, handleClose));
                        }}
                        startIcon={<UploadRounded />}
                        type="button"
                        variant="contained"
                      >
                        Upload customers
                      </LoadingButton>
                      <Button
                        onClick={() => {
                          handleClose();
                        }}
                        className="ms-3"
                      >
                        Close
                      </Button>
                    </div>
                  </Stack>

                  <RHFUploadSingleFile
                    name="cover"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    maxSize={314572800}
                    onDrop={handleDrop}
                  />
                  <div className="my-3">
                    <Typography variant="caption">
                      Note: Download File format ({' '}
                      <a
                        style={{ textDecoration: 'none' }}
                        target={'_blank'}
                        rel="noreferrer"
                        href="https://qwikshop-in.s3.ap-south-1.amazonaws.com/excel_template/customer_sample_import_template.xlsx"
                        download="qwikshop_customer_upload_format"
                      >
                        Click here
                      </a>
                      )
                    </Typography>
                  </div>

                  {!invalidFormat ? (
                    rows !== undefined &&
                    rows.length > 0 && (
                      <div style={{ width: '100%' }}>
                        <DataGrid
                          onCellFocusOut={(params) => {
                            console.log(params);
                          }}
                          onCellEditCommit={(params) => {
                            console.log(params, 'from the commit');
                            const mRows = rows.map((el) => {
                              if (el.id.toString() === params.id.toString()) {
                                el[`${params.field}`] = params.value;
                                return el;
                              }
                              return el;
                            });
                            setRows(mRows);
                          }}
                          autoHeight
                          rows={rows}
                          columns={columns}
                          pageSize={25}
                          rowsPerPageOptions={[25, 50, 100, 200, 500]}
                          disableSelectionOnClick
                        />
                      </div>
                    )
                  ) : (
                    <Card sx={{ p: 4 }}>
                      <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={3}>
                        <Typography variant="subtitle2" color={'error'} fontWeight="500">
                          Invalid format, Please upload file in below format
                        </Typography>
                        <Typography variant="body2" color={'#538bF7'}>
                          NOTE: Only name, phone & email fields are required
                        </Typography>
                        <a
                          style={{ textDecoration: 'none' }}
                          target={'_blank'}
                          rel="noreferrer"
                          href="https://qwikshop-in.s3.ap-south-1.amazonaws.com/excel_template/customer_sample_import_template.xlsx"
                          download="qwikshop_customer_upload_format"
                        >
                          <Button startIcon={<FileDownloadRoundedIcon />} variant="outlined" size="large">
                            Download Excel format
                          </Button>
                        </a>
                      </Stack>
                    </Card>
                  )}
                </div>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default BulkUploadCustomer;
