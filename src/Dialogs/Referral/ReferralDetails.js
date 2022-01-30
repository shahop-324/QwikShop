import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  Stack,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import dateFormat from 'dateformat';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { ReferralListHead } from '../../sections/@dashboard/e-commerce/product-list';
import useSettings from '../../hooks/useSettings';

const TABLE_HEAD = [
  { id: 'orderRef', label: 'Order Id', alignRight: false },
  { id: 'orderAmount', label: 'OrderAmount', alignRight: false },
  { id: 'earning', label: 'Earning', alignRight: false },
  { id: 'paymentStatus', label: 'Payment Status', alignRight: false },
  { id: 'date&Time', label: 'Date & Time', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true },
];

const ReferralDetails = ({ open, handleClose }) => {
  const { themeStretch } = useSettings();

  const [state, setState] = useState('');

  const earnings = [
    {
      _id: '826uhs=-202oi2hgwgy72892',
      orderRef: '#AS2761',
      timestamp: Date.now(),
      orderAmount: 2355,
      amount: 245,
      status: 'Not paid',
    },
  ];

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = earnings.map((n) => n._id);
      setSelected(selected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - earnings.length) : 0;

  const filteredEarnings = applySortFilter(earnings, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredEarnings.length && Boolean(filterName);

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="my-3 pe-4">
          <DialogTitle>Referrer Details (Omprakash shah)</DialogTitle>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Stack>

        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <ReferralListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={earnings.length}
                    onRequestSort={handleRequestSort}
                    hideCheckbox
                  />

                  <TableBody>
                    {earnings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { _id, orderRef, timestamp, orderAmount, amount, status } = row;

                      return (
                        <TableRow key={_id} hover tabIndex={-1} role="checkbox">
                          <TableCell>
                            <Stack direction={'row'} alignItems={'center'}>
                              <Typography variant="subtitle2" noWrap>
                                {orderRef}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}> {`Rs.${orderAmount}`} </TableCell>
                          <TableCell style={{ minWidth: 160 }}> {`Rs.${amount}%`} </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            {' '}
                            {status === 'Not Paid' ? (
                              <Chip label="Not paid" color="error" />
                            ) : (
                              <Chip label="Paid" color="success" />
                            )}{' '}
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            {dateFormat(new Date(timestamp), 'ddd, mmm dS, yy, hh:MM TT')}{' '}
                          </TableCell>
                          <TableCell align="right">
                            <Button variant="outlined" onClick={() => {}}>
                              Send Payout
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          <Box sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={earnings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, value) => setPage(value)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Dialog>
    </>
  );
};

export default ReferralDetails;

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return array.filter((_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}
