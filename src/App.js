import React from 'react';
// routes
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import {snackbarActions} from "./reducers/snackbarSlice";
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';


const vertical = 'top';
const horizontal = 'center';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const { severity, message, open } = useSelector((state) => state.snackbar);

  return (
    <>
      <ThemeProvider>
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <MotionLazyContainer>
                  <ProgressBarStyle />
                  <ChartStyle />
                  <Settings />
                  <ScrollToTop />
                  <Router />
                </MotionLazyContainer>
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </ThemeProvider>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            console.log("This is clicked");
            dispatch(snackbarActions.closeSnackBar());

          }}
        >
          <Alert
            onClose={() => {
              console.log("This is clicked");
              dispatch(snackbarActions.closeSnackBar());
            }}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}
