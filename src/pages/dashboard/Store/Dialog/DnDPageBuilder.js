import React, { useState, useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { Dialog, AppBar, Toolbar, Typography, Slide, Button, TextField, Stack } from '@mui/material';
import template from '../../../../design.json';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DnDPageBuilder = ({ open, handleClose }) => {
  const emailEditorRef = useRef(null);

  const [templateName, setTemplateName] = useState('');

  const [state, setState] = useState('');

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    let design;
    const templateJson = template;
    if (design) {
      emailEditorRef.current.editor.loadDesign(design);
    } else {
      emailEditorRef.current.editor.loadDesign(templateJson);
    }
  };

  const onReady = () => {
    // editor is ready
    console.log('onReady');
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: '#212121' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Page
            </Typography>

            <Stack direction="row" alignItems="center" spacing={3}>
              <TextField
                name="templateName"
                label="Template Name"
                sx={{ width: '250px' }}
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value);
                }}
              />

              <Button variant='contained'
                onClick={() => {
                  exportHtml();
                  handleClose();
                }}
                className="btn btn-light btn-outline-text me-3"
              >
                <span> Save & close </span>
              </Button>
              <Button onClick={handleClose} variant='outlined' color="primary">Save as draft</Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <div style={{ height: '80vh' }}>
          <EmailEditor
            projectId="47137"
            style={{ height: '93.2vh' }}
            ref={emailEditorRef}
            onLoad={onLoad}
            onReady={onReady}
          />
        </div>
      </Dialog>
    </>
  );
};

export default DnDPageBuilder;
