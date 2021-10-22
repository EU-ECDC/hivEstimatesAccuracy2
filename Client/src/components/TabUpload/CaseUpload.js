import React from 'react';
import { observer } from 'mobx-react';
import makeStyles from '@mui/styles/makeStyles';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import PeopleIcon from '@mui/icons-material/People';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Btn from '../Btn';
import UploadProgressBar from '../UploadProgressBar';
import MessageAlert from '../MessageAlert';
import FormatBytes from '../../utilities/FormatBytes';

const userStyles = makeStyles({
  header: {
    width: 142,
    fontWeight: 'bold'
  },
  content: {
    maxWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
});

const CaseUpload = (props) => {
  const { appMgr } = props;
  const classes = userStyles();

  const handleUploadBtnClick = e => appMgr.caseBasedDataMgr.uploadData(e.target);
  const handleNextPageBtnClick = () => appMgr.uiStateMgr.setActivePageId(2);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            size='small'
            color='primary'
            disabled={!appMgr.uiStateMgr.summaryPageEnabled}
            onClick={handleNextPageBtnClick}
          >
            Next step
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6'>
          Upload case-based data
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <input
          style={{ display: 'none' }}
          id='caseUploadBtn'
          className='uploadBtn'
          type='file'
          onChange={handleUploadBtnClick}
        />
        <Tooltip title='Select case-based data file'>
          <label htmlFor='caseUploadBtn'>
            <Btn style={{ marginBottom: 6 }} ><CloudUploadIcon />&nbsp;Upload data</Btn>
          </label>
        </Tooltip>
        <Tooltip title='Remove case-based data from analysis'>
          <Button
            style={{ marginBottom: 6, marginLeft: 20 }}
            color='primary'
            // disabled={!appMgr.uiStateMgr.caseBasedDataUnloadEnabled}
            disabled={true}
          >
            Unload data
          </Button>
        </Tooltip>
        <Typography variant='body2' color='textSecondary'>
          Maximum file size: 100MB<br />
          Supported files types: rds, txt, csv, xls, xlsx (uncompressed and zip archives)
        </Typography>
        <UploadProgressBar progress={appMgr.caseBasedDataMgr.uploadProgress} />
        <MessageAlert
          valid={appMgr.caseBasedDataMgr.actionValid}
          msg={appMgr.caseBasedDataMgr.actionMessage}
        />
      </Grid>
      <Grid item xs={10}>
        {!appMgr.caseBasedDataMgr.actionValid &&
          <PeopleIcon style={{ color: '#eee', fontSize: 600 }}/>
        }
        {appMgr.caseBasedDataMgr.actionValid &&
          <Paper style={{ padding: 10 }}>
            <Typography variant='overline'>Uploaded file details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Table>
                  <TableBody>
                    <TableRow hover>
                      <TableCell className={classes.header}>File name</TableCell>
                      <TableCell className={classes.content}>{appMgr.caseBasedDataMgr.fileName}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell className={classes.header}>File size</TableCell>
                      <TableCell className={classes.content}>{FormatBytes(appMgr.caseBasedDataMgr.fileSize)}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell className={classes.header}>File type</TableCell>
                      <TableCell className={classes.content}>{appMgr.caseBasedDataMgr.fileType}</TableCell>
                    </TableRow>
                    <TableRow hover>
                      <TableCell className={classes.header}>Number of records</TableCell>
                      <TableCell className={classes.content}>{appMgr.caseBasedDataMgr.recordCount}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={6}>
                <Table>
                  <TableBody>
                    <TableRow hover><TableCell className={classes.header}>Column names</TableCell></TableRow>
                    <TableRow hover><TableCell style={{ whiteSpace: 'normal' }} className={classes.content}>
                      <div style={{ overflow: 'auto', maxHeight: 164 }}>
                        {appMgr.caseBasedDataMgr.columnNamesString}
                      </div>
                    </TableCell></TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Paper>
        }
      </Grid>
    </Grid>
  );
};

export default observer(CaseUpload);
