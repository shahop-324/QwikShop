import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { fDateTime } from '../../utils/formatTime';
import { fetchQuestions } from '../../actions';

// ----------------------------------------------------------------------

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

const GeneralQuestions = () => {
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');

  useEffect(() => {
    dispatch(fetchQuestions(term));
  }, [term]);

  const { questions } = useSelector((state) => state.question);

  return (
    <>
      <Stack sx={{ px: 4 }} direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
        <Typography variant="h6">Customer Questions</Typography>
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
      </Stack>

      <Stack direction="row" sx={{ px: 4 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {questions.map((item) => (
            <QuestionItem key={item.id} item={item} />
          ))}
        </Box>
      </Stack>
    </>
  );
};

export default GeneralQuestions;

function QuestionItem({ item }) {
  const { avatar, name, description, rating, postedAt, tags } = item;

  return (
    <Stack spacing={2} sx={{ minHeight: 402, position: 'relative', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={name} src={avatar} />
        <div>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Posted {fDateTime(postedAt)}
          </Typography>
        </div>
      </Stack>

      <Typography variant="body2">{description}</Typography>
    </Stack>
  );
}
