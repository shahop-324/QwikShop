import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSelector } from 'react-redux';
import { FormProvider } from '../../../../components/hook-form';

AccountSocialLinks.propTypes = {
  myProfile: PropTypes.shape({
    facebookLink: PropTypes.string,
    instagramLink: PropTypes.string,
    linkedinLink: PropTypes.string,
    twitterLink: PropTypes.string,
  }),
};

export default function AccountSocialLinks() {
  const { user } = useSelector((state) => state.user);

  const defaultValues = {
    facebookLink: user.facebookLink,
    instagramLink: user.instagramLink,
    twitterLink: user.twitterLink,
  };

  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(facebookLink, instagramLink, twitterLink);
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <TextField
            name="facebook"
            label="Facebook"
            fullWidth
            value={facebookLink}
            onChange={(e) => {
              setFacebookLink(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <FacebookOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="instagram"
            label="Instagram"
            fullWidth
            value={instagramLink}
            onChange={(e) => {
              setInstagramLink(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <InstagramIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="twitter"
            label="Twitter"
            fullWidth
            value={twitterLink}
            onChange={(e) => {
              setTwitterLink(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <TwitterIcon />
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
