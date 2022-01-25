import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
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
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
// redux
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
// sections
import {
  ProductMoreMenu,
  ProductListHead,
  CategoryListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';
import AddNewCategory from '../../Dialogs/AddNewCategory';
import { fetchCatgory } from '../../actions';

import EditCategory from '../../Dialogs/Category/EditCategory';
import DeleteCategory from '../../Dialogs/Category/DeleteCategory';
import ShareCategory from '../../Dialogs/Category/ShareCategory';
import AlterCategoryStock from '../../Dialogs/Category/AlterCategoryStock';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'products', label: 'Products', alignRight: false },
  { id: 'stock', label: 'Stock', alignRight: false },
  { id: 'totalSale', label: 'Total Sale', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true },
];

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

// ----------------------------------------------------------------------

export default function GeneralCategory() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openAddCategory, setOpenAddcategory] = useState(false);

  const [IdToEdit, setIdToEdit] = useState();

  const [IdToDelete, setIdToDelete] = useState();

  const [IdToShare, setIdToShare] = useState();

  const [stockId, setStockId] = useState();

  const [openUpdate, setOpenUpdate] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [openShare, setOpenShare] = useState(false);

  const [openStock, setOpenStock] = useState(false);

  const handleOpenStock = (id) => {
    setStockId(id);
    setOpenStock(true);
  };

  const handleCloseStock = () => {
    setOpenStock(false);
  };

  const handleOpenUpdate = (id) => {
    setIdToEdit(id);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleOpenDelete = (id) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAddCategory = () => {
    setOpenAddcategory(false);
  };

  const handleOpenAddcategory = () => {
    setOpenAddcategory(true);
  };

  const { categories } = useSelector((state) => state.category);

  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(fetchCatgory());
  }, [dispatch]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = productList.map((n) => n.name);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleOpenShare = (id) => {
    setIdToShare(id);
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleDeleteProduct = (productId) => {
    const deleteProduct = productList.filter((product) => product.id !== productId);
    setSelected([]);
    setProductList(deleteProduct);
  };

  const handleDeleteProducts = (selected) => {
    const deleteProducts = productList.filter((product) => !selected.includes(product.name));
    setSelected([]);
    setProductList(deleteProducts);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredProducts.length && Boolean(filterName);

  return (
    <>
      <Page title="Category">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card>
            <CategoryListToolbar
              openAddCategory={handleOpenAddcategory}
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              onDeleteProducts={() => handleDeleteProducts(selected)}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <ProductListHead
                    sx={{ zIndex: 10 }}
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={productList.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />

                  <TableBody>
                    {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { _id, name, image, products, outOfStock, hidden, totalSales } = row;

                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <>
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
                            </TableCell>
                            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                              <Image
                                disabledEffect
                                alt={name}
                                src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${image}`}
                                sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 160 }}>{products.length}</TableCell>
                            <TableCell style={{ minWidth: 160 }}>
                              <FormControlLabel
                                control={
                                  <IOSSwitch
                                    sx={{ m: 1 }}
                                    checked={!outOfStock}
                                    onClick={(e) => {
                                      handleOpenStock(_id);
                                    }}
                                  />
                                }
                                label=""
                              />
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={(outOfStock && 'error') || 'success'}
                              >
                                {!outOfStock ? 'In stock' : 'Out of stock'}
                              </Label>
                            </TableCell>
                            <TableCell align="left">{`Rs. ${totalSales}`}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => {
                                  handleOpenShare(_id);
                                }}
                                className="me-2"
                              >
                                <ShareRoundedIcon style={{ fontSize: '20px' }} />
                              </IconButton>
                              <ProductMoreMenu
                                productName={name}
                                onDelete={() => handleOpenDelete(_id)}
                                onEdit={() => {
                                  handleOpenUpdate(_id);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          {openStock && (
                            <AlterCategoryStock open={openStock} handleClose={handleCloseStock} id={stockId} />
                          )}
                          {openShare && (
                            <ShareCategory open={openShare} handleClose={handleCloseShare} id={IdToShare} />
                          )}
                          {openDelete && (
                            <DeleteCategory open={openDelete} handleClose={handleCloseDelete} id={IdToDelete} />
                          )}
                          {openUpdate && (
                            <EditCategory open={openUpdate} handleClose={handleCloseUpdate} id={IdToEdit} />
                          )}
                        </>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

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
              count={productList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, value) => setPage(value)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>

      {openAddCategory && <AddNewCategory open={openAddCategory} handleClose={handleCloseAddCategory} />}
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

// Edit, delete, update stock, share,

// show all products of this category when clicked (This will be done after adding products)

// Search, Bulk upload, & Export
