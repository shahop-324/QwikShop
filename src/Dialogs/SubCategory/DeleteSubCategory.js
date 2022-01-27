/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubCategory } from '../../actions';

const DeleteSubCategory = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { subCategories, isDeleting } = useSelector((state) => state.subCategory);

  const category = subCategories.find((el) => el._id === id);

  let name;
  let image;

  if(category) {
    name = category.name;
    image = category.image;
  }
   
  const onSubmit = () => {
    dispatch(deleteSubCategory(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete sub category</DialogTitle>

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

export default DeleteSubCategory;
