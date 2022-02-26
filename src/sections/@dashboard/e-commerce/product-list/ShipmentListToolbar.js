/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import { alpha, useTheme, styled } from '@mui/material/styles';
import { Toolbar, Typography } from '@mui/material';
// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

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

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

ShipmentListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function ShipmentListToolbar({ numSelected,  setTerm, }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Search>
      )}

      <div className="d-flex flex-row align-items-center justify-content-end">
        {/* <Button variant="contained" onClick={() => {handleExportShipments();}} startIcon={<FileDownloadRoundedIcon />}>
          Export
        </Button> */}
      </div>
    </RootStyle>
  );
}