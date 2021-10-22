import React from 'react';
import { observer } from 'mobx-react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import QuarterToString from '../../utilities/QuarterToString';
import HistChart from '../Charts/HistChart';

const userStyles = makeStyles({
  valueLabel: {
    '& *': {
      fontSize: 8
    }
  }
});

const TabSummaryNotifQuarter = (props) => {
  const { appMgr } = props;
  const classes = userStyles();

  const handleNotifQuarterFilterSwitchChange = e =>
    appMgr.summaryDataMgr.setNotifQuarterFilterApply(e.target.checked);

  const handleNotifQuarterFilterYearChange = (e, value) => {
    appMgr.summaryDataMgr.setNotifQuarterFilterMinYear(value[0]);
    appMgr.summaryDataMgr.setNotifQuarterFilterMaxYear(value[1]);
  };

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <FormControlLabel
          control={
            <Switch
              value={appMgr.summaryDataMgr.notifQuarterPlotData.filter.applyInAdjustments}
              onChange={handleNotifQuarterFilterSwitchChange}
              color='primary'
              size='small'
            />
          }
          label='Apply this data selection in adjustments'
        />
      </Grid>
      <Grid item xs={10}>
        <Paper style={{ padding: 10 }}>
          <Typography variant='overline'>Notification quarter</Typography>
          <div style={{ padding: '40px 105px 0 65px' }}>
            <Slider
              min={appMgr.summaryDataMgr.notifQuarterPlotData.filter.scaleMinYear}
              max={appMgr.summaryDataMgr.notifQuarterPlotData.filter.scaleMaxYear}
              // step={0.25}s
              step={null}
              marks={appMgr.summaryDataMgr.notifQuarterSliderMarks}
              value={[
                appMgr.summaryDataMgr.notifQuarterPlotData.filter.valueMinYear,
                appMgr.summaryDataMgr.notifQuarterPlotData.filter.valueMaxYear
              ]}
              onChange={handleNotifQuarterFilterYearChange}
              valueLabelDisplay='on'
              valueLabelFormat={value => QuarterToString(value)}
              classes={{
                valueLabel: classes.valueLabel
              }}
              aria-labelledby='range-slider'
              color='secondary'
            />
          </div>
          <HistChart
            xAxisLabel='Notification quarter'
            xCategories={appMgr.summaryDataMgr.notifQuarterChartCategories}
            maleData={appMgr.summaryDataMgr.notifQuarterPlotData.chartData[0].data}
            femaleData={appMgr.summaryDataMgr.notifQuarterPlotData.chartData[1].data}
          />
        </Paper>
      </Grid>
    </React.Fragment>
  )
};

export default observer(TabSummaryNotifQuarter);
