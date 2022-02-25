import React, { useEffect, useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
// @mui
import {
  Grid,
  Card,
  Container,
  Stack,
  Button,
  Typography,
  Paper,
  Grow,
  ClickAwayListener,
  ButtonGroup,
  Popper,
  Portal,
  MenuItem,
  MenuList,
} from '@mui/material';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import NoCustomer from '../../assets/business-person-enjoying-break-time.png';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { BookingDetails } from '../../sections/@dashboard/general/booking';

import AddNewCustomer from '../../Dialogs/AddNewCustomer';
import ImportCustomers from '../../Dialogs/ImportCustomers';
import { fetchCustomers } from '../../actions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#9C9C9C', 0.15),
  '&:hover': {
    backgroundColor: alpha('#9C9C9C', 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const options = ['Add Customer', 'Export to excel'];

export default function GeneralCustomer() {
  const [openAddCustomer, setOpenAddCustomer] = useState(false);
  const [openImportCustomers, setOpenImportCustomers] = useState(false);

  const { customers } = useSelector((state) => state.customer);

  const [term, setTerm] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchCustomers(term));
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const handleCloseAddCustomer = () => {
    setOpenAddCustomer(false);
  };

  const handleOpenAddCustomer = () => {
    setOpenAddCustomer(true);
  };

  const handleCloseImportCustomers = () => {
    setOpenImportCustomers(false);
  };

  const { themeStretch } = useSettings();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
    switch (selectedIndex * 1) {
      case 0:
        handleOpenAddCustomer();
        break;

      case 1:
        // Run logic to export all categories to excel
        handleExportCustomers();
        break;

      default:
        break;
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const processCustomersData = () => {
    const processedArray = [];

    customers.map((category) => {
      const array = Object.entries(category);

      const filtered = array.filter(
        ([key, value]) => key === 'name' || key === 'pincode' || key === 'phone' || key === 'email' || key === 'city'
      );

      const asObject = Object.fromEntries(filtered);

      return processedArray.push(asObject);
    });

    const finalArray = processedArray.map((obj) => Object.values(obj));

    return finalArray;
  };

  const CreateAndDownloadCSV = (data) => {
    let csv = 'name, phone, email, pincode, city, \n';
    data.forEach((row) => {
      csv += row.join(',');
      csv += '\n';
    });

    console.log(csv);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'customers.csv';
    hiddenElement.click();
  };

  const handleExportCustomers = () => {
    CreateAndDownloadCSV(processCustomersData());
  };

  return (
    <>
      <Page title="Customers">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={(e) => {
                      setTerm(e.target.value);
                    }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>

                <div className="d-flex flex-row align-items-center justify-content-end">
                  <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <Button
                      size="small"
                      aria-controls={open ? 'split-button-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-label="add product category"
                      aria-haspopup="menu"
                      onClick={handleToggle}
                    >
                      <ArrowDropDownRoundedIcon />
                    </Button>
                  </ButtonGroup>
                  <Portal>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu">
                                {options.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                  >
                                    <Typography variant="subtitle2">{option}</Typography>
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Portal>
                </div>
              </Stack>
            </Grid>

            <Grid item xs={12}>
            {!(typeof customers !== 'undefined' && customers.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoCustomer} alt="no customer" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  Oh no, you haven't got any customers, please market your store and earn more
                </Typography>
              </Stack>
            ) : (
              <BookingDetails customers={customers} />
            )}
            </Grid>
          </Grid>
        </Container>
      </Page>

      {openAddCustomer && <AddNewCustomer open={openAddCustomer} handleClose={handleCloseAddCustomer} />}
      {openImportCustomers && <ImportCustomers open={openImportCustomers} handleClose={handleCloseImportCustomers} />}
    </>
  );
}
