// @mui
import { Stack, Button, Typography } from '@mui/material';
// routes
import { PATH_DOCS } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  return (
    <Stack spacing={3} sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}>
      <img
        src="https://media.istockphoto.com/photos/shopping-cart-with-different-food-products-picture-id1306977522?b=1&k=20&m=1306977522&s=170667a&w=0&h=aCpJcpOWb3U3O6Vh5algE6PNNbgGZUocUo4tRJ3iOKQ="
        alt="cart"
        style={{ height: '200px' }}
      />

      <div>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Upgrade at Just
          <br /> Rs. 10 Per Day
        </Typography>
      </div>

      <Button href={PATH_DOCS} target="_blank" rel="noopener" variant="contained">
        Get Premium
      </Button>
    </Stack>
  );
}
