import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import TabWelcome from './TabWelcome';
import TabUpload from './TabUpload';
import { NAME, VERSION } from '../settings';

const userStyles = makeStyles({
  appBar: {
    padding: 3
  },
  appName: {
    color: 'white',
    marginLeft: 10,
  },
  appVersion: {
    color: 'white',
    marginRight: 10,
  },
  rightNavBtn: {
    color: 'white'
  }
});

const StepPanel = props => {
  const { activePanelId, panelId, children, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={activePanelId !== panelId}
      id={`wrapped-tabpanel-${panelId}`}
      aria-labelledby={`wrapped-tab-${panelId}`}
      style={{ flexGrow: 1 }}
      {...other}
    >
      {activePanelId === panelId && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const RootElem = (props) => {
  const appManager = props.appManager;
  const classes = userStyles();
  const [activePanelId, setActivePanelId] = React.useState(0);
  const [rightNavState, setRightNavState] = React.useState(false);

  const appBar = (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar variant='dense' disableGutters>
        <Typography variant='h6' className={classes.appName}>
          {NAME}
        </Typography>
        <Box flexGrow={1}/>
        <Typography variant='subtitle1' className={classes.appVersion}>
          Mode: {appManager.mode} | Shiny state: {appManager.shinyState} | Version {VERSION}
        </Typography>
        <IconButton onClick={() => setRightNavState(!rightNavState)} className={classes.rightNavBtn}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box display='flex' flexGrow={1} flexDirection='column'>
      <RightNav open={rightNavState} onClose={() => setRightNavState(false)}/>
      {appBar}
      <Box display='flex' flexGrow={1} flexDirection='row'>
        <LeftNav steps={appManager.steps} onStepChange={setActivePanelId} />
        <StepPanel panelId={0} activePanelId={activePanelId} >
          <TabWelcome appManager={appManager}/>
        </StepPanel>
        <StepPanel panelId={1} activePanelId={activePanelId}>
          <TabUpload appManager={appManager} />
        </StepPanel>
        <StepPanel panelId={2} activePanelId={activePanelId}>
          Item Three
        </StepPanel>
        <StepPanel panelId={3} activePanelId={activePanelId}>
          Item Four
        </StepPanel>
      </Box>
    </Box>
  );
};

export default inject('appManager')(observer(RootElem));
