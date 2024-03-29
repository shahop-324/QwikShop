// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function TermsOfService() {
  return (
    <Page title="Terms of service">
      <RootStyle>
        <Container>
          <Typography sx={{ mb: 5, pb: 5 }} variant="h3" align="center" paragraph>
            Terms of Service
          </Typography>

          <Grid container spacing={3}>
            {/*  */}

            <h2 style={{ marginBottom: '30px' }}>1. Terms</h2>

            <p>
              By accessing this Website, accessible from www.qwikshop.online, you are agreeing to be bound by these
              Website Terms and Conditions of Use and agree that you are responsible for the agreement with any
              applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this
              site. The materials contained in this Website are protected by copyright and trade mark law.
            </p>

            <h2 style={{ marginBottom: '30px' }}>2. Use License</h2>

            <p>
              Permission is granted to temporarily download one copy of the materials on BLUEMEET PRIVATE LIMITED's
              Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>

            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose or for any public display;</li>
              <li>attempt to reverse engineer any software contained on BLUEMEET PRIVATE LIMITED's Website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
            </ul>

            <p>
              This will let BLUEMEET PRIVATE LIMITED to terminate upon violations of any of these restrictions. Upon
              termination, your viewing right will also be terminated and you should destroy any downloaded materials in
              your possession whether it is printed or electronic format.
            </p>

            <h2 style={{ marginBottom: '30px' }}>3. Disclaimer</h2>

            <p>
              All the materials on BLUEMEET PRIVATE LIMITED’s Website are provided "as is". BLUEMEET PRIVATE LIMITED
              makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore,
              BLUEMEET PRIVATE LIMITED does not make any representations concerning the accuracy or reliability of the
              use of the materials on its Website or otherwise relating to such materials or any sites linked to this
              Website.
            </p>

            <h2 style={{ marginBottom: '30px' }}>4. Limitations</h2>

            <p>
              BLUEMEET PRIVATE LIMITED or its suppliers will not be hold accountable for any damages that will arise
              with the use or inability to use the materials on BLUEMEET PRIVATE LIMITED’s Website, even if BLUEMEET
              PRIVATE LIMITED or an authorize representative of this Website has been notified, orally or written, of
              the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or
              limitations of liability for incidental damages, these limitations may not apply to you.
            </p>

            <h2 style={{ marginBottom: '30px' }}>5. Revisions and Errata</h2>

            <p>
              The materials appearing on BLUEMEET PRIVATE LIMITED’s Website may include technical, typographical, or
              photographic errors. BLUEMEET PRIVATE LIMITED will not promise that any of the materials in this Website
              are accurate, complete, or current. BLUEMEET PRIVATE LIMITED may change the materials contained on its
              Website at any time without notice. BLUEMEET PRIVATE LIMITED does not make any commitment to update the
              materials.
            </p>

            <h2 style={{ marginBottom: '30px' }}>6. Links</h2>

            <p>
              BLUEMEET PRIVATE LIMITED has not reviewed all of the sites linked to its Website and is not responsible
              for the contents of any such linked site. The presence of any link does not imply endorsement by BLUEMEET
              PRIVATE LIMITED of the site. The use of any linked website is at the user’s own risk.
            </p>

            <h2 style={{ marginBottom: '30px' }}>7. Site Terms of Use Modifications</h2>

            <p>
              BLUEMEET PRIVATE LIMITED may revise these Terms of Use for its Website at any time without prior notice.
              By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions
              of Use.
            </p>

            <h2 style={{ marginBottom: '30px' }}>8. Governing Law</h2>

            <p>
              Any claim related to BLUEMEET PRIVATE LIMITED's Website shall be governed by the laws of in without
              regards to its conflict of law provisions.
            </p>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
