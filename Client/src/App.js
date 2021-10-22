import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import RootElem from './components/RootElem';

const theme = createTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    primary: {
      main: '#69b023',
    },
    secondary: {
      main: '#bedfe1',
    },
  },
  overrides: {
    MuiStepLabel: {
      label: {
        color: 'black',
        '&$active': {
          fontWeight: 'bold'
        },
        '&$completed': {
          fontWeight: 'bold'
        },
      },
      root: {
        '&$disabled': {
          '& .MuiStepLabel-label': {
            color: 'rgba(0, 0, 0, 0.5)',
          }
        },
      },
    },
    MuiStepIcon: {
      root: {
        '& text': {
          fill: 'white'
        }
      }
    },
    MuiStepConnector: {
      vertical: {
        marginLeft: 10
      }
    },
    MuiStepContent: {
      root: {
        marginLeft: 10,
        '& .MuiTreeItem-label': {
          padding: 6,
        },
      }
    },
  //   MuiTreeItem: {
  //     label: {
  //       fontSize: '0.75rem'
  //     }
  //   },
  //   MuiTableRow: {
  //     root: {
  //       "&:last-child td": {
  //         borderBottom: 0,
  //       },
  //     }
  //   },
  //   MuiTableCell: {
  //     head: {
  //       fontWeight: 'bold !important'
  //     }
  //   },
  //   MuiSlider: {
  //     marked: {
  //       marginBottom: 0
  //     }
  //   },
  //   MuiSelect: {
  //     root: {
  //       paddingLeft: 16,
  //       paddingBottom: 5
  //     }
  //   },
  //   // MuiChip: {
  //   //   label: {
  //   //     color: 'white'
  //   //   }
  //   // }
  }
});

const App = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <RootElem />
      </React.Fragment>
    </ThemeProvider>
  </StyledEngineProvider>
);

export default App;
