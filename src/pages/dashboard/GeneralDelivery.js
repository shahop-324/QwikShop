import { useParams, useLocation } from 'react-router-dom';
import { paramCase } from 'change-case';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// _mock_
import { _userList } from '../../_mock';

// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { DeliveryOverview, DeliveryFeatured } from '../../sections/@dashboard/general/delivery/index';
// sections
import UserNewForm from '../../sections/@dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {

  let user;

  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="General: Analytics">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Setup QwikShop Delivery
        </Typography>

        <Grid container spacing={3}>
          
          <Grid item xs={12} md={8}>
            <DeliveryOverview displayName={user?.displayName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DeliveryFeatured />
          </Grid>
          
          
          <div className='mt-5 px-4'>
          <UserNewForm isEdit={isEdit} currentUser={currentUser} />
          </div>
         
           
         
        </Grid>

        
      </Container>
    </Page>
  );
}
