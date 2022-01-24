import React, { useState } from 'react';
import { Dialog, DialogTitle, Button, Stack, Grid, Card, Typography, TextField } from '@mui/material';
import Editor from '../../../../components/editor';

const QuillPageBuilder = ({ open, handleClose }) => {
  const [templateName, setTemplateName] = useState({ error: false, message: 'Template Name is required', value: '' });
  const [html, setHtml] = useState({ error: false, message: 'Page content is required', value: '' });

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Create Page</DialogTitle>
        <Grid className="px-4 pt-3" container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography className="mb-3" variant="subtitle1">
                Page Name
              </Typography>
              <TextField
                error={templateName.error}
                helperText={templateName.error ? 'Template Name is required' : ''}
                name="templateName"
                label="Template name"
                fullWidth
                value={templateName.value}
                onChange={(e) => {
                  if (!e.target.value) {
                    setTemplateName((prev) => {
                      prev.error = true;
                      return prev;
                    });
                  } else {
                    setTemplateName((prev) => {
                      prev.error = false;
                      return prev;
                    });
                  }
                  setTemplateName((prev) => {
                    prev.value = e.target.value;
                    return prev;
                  });
                }}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid className="px-4 pt-3" container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography className="mb-3" variant="subtitle1">
                Page Content
              </Typography>
              <Editor
                error={html.error}
                helperText={html.error ? 'Page content is required' : ""}
                value={html.value}
                onChange={(value) => {
                  if (!value) {
                    setHtml((prev) => {
                      prev.error = true;
                      return prev;
                    });
                  } else {
                    setHtml((prev) => {
                      prev.error = false;
                      return prev;
                    });
                  }
                  setHtml((prev) => {
                    prev.value = value;
                    return prev;
                  });
                }}
              />
            </Card>
          </Grid>
        </Grid>

        <Stack spacing={3} direction="row" alignItems="center" justifyContent="end" sx={{ px: 4, py: 3 }}>
          <Button variant="contained">Save & Publish</Button>
          <Button variant="outlined">Save as draft</Button>
          <Button onClick={handleClose}>Close</Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default QuillPageBuilder;
