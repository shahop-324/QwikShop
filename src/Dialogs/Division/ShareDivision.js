/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, IconButton, Stack, Button, DialogActions, Tooltip } from '@mui/material';

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { showSnackbar } from '../../actions';

const ShareDivision = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const { divisions } = useSelector((state) => state.division);

  const division = divisions.find((el) => el._id === id);

  const { name } = division;

  const { store } = useSelector((state) => state.store);

  const link = `qwikshop.online/${store.subName}/product/search/category/division?div=${name}`;

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Share Division</DialogTitle>

        <Stack direction={'row'} alignItems="center" justifyContent="center" spacing={2}>
          <Tooltip title="WhatsApp">
            <IconButton>
              <WhatsappShareButton url={link} title={name} separator=":">
                {' '}
                <WhatsappIcon round size={35} />{' '}
              </WhatsappShareButton>
            </IconButton>
          </Tooltip>
          <Tooltip title="Facebook">
            <IconButton>
              <FacebookShareButton url={link} quote={name}>
                <FacebookIcon round size={35} />
              </FacebookShareButton>
            </IconButton>
          </Tooltip>
          <Tooltip title="Telegram">
            <IconButton>
              <TelegramShareButton url={link} title={name}>
                <TelegramIcon round size={35} />
              </TelegramShareButton>
            </IconButton>
          </Tooltip>
          <Tooltip title="Twitter">
            <IconButton>
              <TwitterShareButton url={link} title={name}>
                <TwitterIcon round size={35} />
              </TwitterShareButton>
            </IconButton>
          </Tooltip>
          <Tooltip title="Copy Link">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(link).then(
                  () => {
                    console.log('Async: Copying to clipboard was successful!');
                    dispatch(showSnackbar('success', 'Copied to clipboard!'));
                  },
                  (err) => {
                    console.error('Async: Could not copy text: ', err);
                    dispatch(showSnackbar('error', 'Failed to copy to clipboard!'));
                  }
                );
              }}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Stack>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareDivision;