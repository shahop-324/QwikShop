import React, { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  IconButton,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material';
// redux
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { useDispatch, useSelector } from '../../redux/store';
// hooks
// components
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
// sections
import {
  TransactionListHead,
  TransactionListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';
import { fetchTransactions } from '../../actions';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'transactionId', label: 'Transaction Id', alignRight: false },
  { id: 'orderId', label: 'Order Id', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  
  { id: 'destination', label: 'Destination', alignRight: true  },
];

// ----------------------------------------------------------------------

export default function GeneralTransaction() {
  
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchTransactions(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const [IdToEdit, setIdToEdit] = useState();

  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenUpdate = (id) => {
    setIdToEdit(id);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const { transactions } = useSelector((state) => state.transaction);

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
      const selected = transactions.map((n) => n._id);
      setSelected(selected);
    } else {
      setSelected([]);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  const filteredTransactions = applySortFilter(transactions, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredTransactions.length && Boolean(filterName);

  const processTransactionsData = () => {
    const processedArray = [];

    transactions.map((transaction) => {
      const array = Object.entries(transaction);

      const filtered = array.filter(([key, value]) => key === 'name' || key === 'totalSales' || key === 'outOfStock');

      const asObject = Object.fromEntries(filtered);

      return processedArray.push(asObject);
    });

    const finalArray = processedArray.map((obj) => Object.values(obj));

    return finalArray;
  };

  const CreateAndDownloadCSV = (data) => {
    let csv = 'name, out_of_stock, total_sales, \n';
    data.forEach((row) => {
      csv += row.join(',');
      csv += '\n';
    });

    console.log(csv);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'transactions.csv';
    hiddenElement.click();
  };

  const handleExportTransactions = () => {
    CreateAndDownloadCSV(processTransactionsData());
  };

  const [filter, setFilter] = React.useState('all');

  const handleFilter = (event, newValue) => {
    if (newValue !== null) {
      setFilter(newValue);
    }
  };

  return (
    <>
      <Card sx={{ px: 0 }}>
        <TransactionListToolbar
          setTerm={setTerm}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleExportTransactions={handleExportTransactions}
        />

        <div className="px-3 mb-3">
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: 'wrap',
            }}
          >
            <StyledToggleButtonGroup size="small" value={filter} exclusive onChange={handleFilter} aria-label="filter">
              <ToggleButton value="all" aria-label="left aligned">
                <Typography sx={{ mx: 2 }} variant="subtitle2">
                  All
                </Typography>
              </ToggleButton>
              <ToggleButton value="failed" aria-label="centered">
                <Typography sx={{ mx: 2 }} variant="subtitle2">
                  Failed
                </Typography>
              </ToggleButton>
              <ToggleButton value="settled" aria-label="right aligned">
                <Typography sx={{ mx: 2 }} variant="subtitle2">
                  Settled
                </Typography>
              </ToggleButton>
              <ToggleButton value="refunded" aria-label="right aligned">
                <Typography sx={{ mx: 2 }} variant="subtitle2">
                  Refunded
                </Typography>
              </ToggleButton>
              <ToggleButton value="payout" aria-label="justified">
                <Typography sx={{ mx: 2 }} variant="subtitle2">
                  Payout
                </Typography>
              </ToggleButton>
              <ToggleButton value="orderTransaction" aria-label="justified">
                <Typography sx={{ mx: 2 }} variant="subtitle2">
                  Order Transaction
                </Typography>
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </div>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TransactionListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={transactions.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

              <TableBody>
                {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const { _id, name, image, products, outOfStock, hidden, totalSales } = row;

                  const isItemSelected = selected.indexOf(_id) !== -1;

                  return (
                    <TableRow key={_id} hover tabIndex={-1} role="checkbox" aria-checked={isItemSelected}>
                      <TableCell>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Typography variant="subtitle2" noWrap>
                            {/* {name} */}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell style={{ minWidth: 160 }}>{/*  */}</TableCell>
                      <TableCell style={{ minWidth: 160 }}>{/*  */}</TableCell>
                      <TableCell align="left">{/*  */}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            handleOpenUpdate(_id);
                          }}
                          className="me-2"
                        >
                          <ModeEditOutlineRoundedIcon style={{ fontSize: '20px' }} />
                        </IconButton>
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
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, value) => setPage(value)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

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
