/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from 'react';
import { Grid, Card, Stack, Typography, Box, Tab, Tabs, Button } from '@mui/material';
import * as ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AccountPolicies = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [terms, setTerms] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');

  return (
    <>
      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, position: 'relative' }}>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
              >
                <Tab label="Terms" {...a11yProps(0)} />
                <Tab label="Privacy Policy" {...a11yProps(1)} />
                <Tab label="Refund Policy" {...a11yProps(2)} />
                <Tab label="" {...a11yProps(3)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Box className="mb-3">
                  <Typography id="list-item-1" variant="subtitle1" className="my-2">
                    Terms of service
                  </Typography>
                  <ReactQuill
                    value={terms}
                    onChange={(html) => {
                      setTerms(html);
                    }}
                    modules={{
                      toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ size: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['link', 'image', 'video'],
                        ['clean'],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    formats={[
                      'header',
                      'font',
                      'size',
                      'bold',
                      'italic',
                      'underline',
                      'strike',
                      'blockquote',
                      'list',
                      'bullet',
                      'indent',
                      'link',
                      'image',
                      'video',
                    ]}
                    theme="snow"
                    style={{ marginBottom: '15px' }}
                  />
                  <Stack className='my-2' direction={"row"} justifyContent={"end"} spacing={3}> <Button variant="contained">Save</Button> <Button variant='outlined'>Publish</Button> </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box className="mb-3">
                  <Typography id="list-item-2" variant="subtitle1" className="my-2">
                    Privacy Policy
                  </Typography>
                  <ReactQuill
                    value={privacyPolicy}
                    onChange={(html) => {
                      setPrivacyPolicy(html);
                    }}
                    modules={{
                      toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ size: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['link', 'image', 'video'],
                        ['clean'],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    formats={[
                      'header',
                      'font',
                      'size',
                      'bold',
                      'italic',
                      'underline',
                      'strike',
                      'blockquote',
                      'list',
                      'bullet',
                      'indent',
                      'link',
                      'image',
                      'video',
                    ]}
                    theme="snow"
                    style={{ marginBottom: '15px' }}
                  />
                   <Stack className='my-2' direction={"row"} justifyContent={"end"} spacing={3}> <Button variant="contained">Save</Button> <Button variant='outlined'>Publish</Button> </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Box className="mb-3">
                  <Typography id="list-item-3" variant="subtitle1" className="my-2">
                    Refund Policy
                  </Typography>
                  <ReactQuill
                    value={refundPolicy}
                    onChange={(html) => {
                      setRefundPolicy(html);
                    }}
                    modules={{
                      toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ size: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                        ['link', 'image', 'video'],
                        ['clean'],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    formats={[
                      'header',
                      'font',
                      'size',
                      'bold',
                      'italic',
                      'underline',
                      'strike',
                      'blockquote',
                      'list',
                      'bullet',
                      'indent',
                      'link',
                      'image',
                      'video',
                    ]}
                    theme="snow"
                    style={{ marginBottom: '15px' }}
                  />
                   <Stack className='my-2' direction={"row"} justifyContent={"end"} spacing={3}> <Button variant="contained">Save</Button> <Button variant='outlined'>Publish</Button> </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={3}>
                {' '}
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountPolicies;