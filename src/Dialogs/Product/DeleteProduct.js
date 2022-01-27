/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../actions';

const DeleteProduct = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { products, isDeleting } = useSelector((state) => state.product);

  const product = products.find((el) => el._id === id);

  let name;
  let image;

  if(product) {
    name = product.productName;
    image = product.images[0];
  }
   
  const onSubmit = () => {
    dispatch(deleteProduct(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete product</DialogTitle>

        <Typography className='px-4 mt-2'>Are you sure you want to delete {name}?</Typography>

        <DialogActions>
          <LoadingButton
            color={'error'}
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
            loading={isDeleting}
          >
            Delete
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

export default DeleteProduct;