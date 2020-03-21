import { hot } from 'react-hot-loader';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RootElem from './components/RootElem';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#69b023',
    },
  },
  overrides: {
    MuiStepLabel: {
      label: {
        color: 'black'
      },
      completed: {
        fontWeight: 'bold !important'
      },
      active: {
        fontStyle: 'italic !important'
      },
    },
    MuiStepIcon: {
      text: {
        fill: 'white !important'
      }
    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <RootElem />
    </React.Fragment>
  </MuiThemeProvider>
);

export default hot(module)(App);
