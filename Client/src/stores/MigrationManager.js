import { observable, action, computed, makeObservable, autorun, toJS } from 'mobx';
import IsNull from '../utilities/IsNull';
import RemoveValuesFromArray from '../utilities/RemoveValuesFromArray';

export default class MigrationManager {
  rootMgr = null;

  runProgress = null;

  runLog = null;

  inputStats = null;

  outputStats = null;

  outputPlots = null;

  confBounds = null;

  dataCompatibleFlag = null;

  yodRegion = 'ALL';

  tableRegion = 'ALL';

  propTableStrat = [];

  constructor(mgr) {
    this.rootMgr = mgr;
    makeObservable(this, {
      runProgress: observable,
      runLog: observable,
      inputStats: observable,
      outputStats: observable,
      outputPlots: observable,
      confBounds: observable,
      yodRegion: observable,
      tableRegion: observable,
      propTableStrat: observable,
      dataCompatibleFlag: observable,
      runInProgress: computed,
      missingness: computed,
      regionDistr: computed,
      yodDistr: computed,
      tableDistr: computed,
      arrivalPlotData: computed,
      diagnosisPlotData: computed,
      setRunProgress: action,
      setRunLog: action,
      setInputStats: action,
      setOutputStats: action,
      setOutputPlots: action,
      setConfBounds: action,
      setYodRegion: action,
      setTableRegion: action,
      setDataCompatibleFlag: action,
      setPropTableStrat: action,
      run: action,
      cancel: action
    });

    autorun(
      () => this.rootMgr.inputValueSet('propTableStrat', toJS(this.propTableStrat)),
      { delay: 1000 }
    );

    autorun(
      () => this.rootMgr.inputValueSet('migrRegion', toJS(this.tableRegion)),
      { delay: 1000 }
    );
  };

  get runInProgress() {
    return this.runProgress !== null;
  };

  get missingness() {
    let res = null;
    if (!IsNull(this.inputStats) && !IsNull(this.inputStats.Missingness)) {
      res = this.inputStats.Missingness;
    }
    return res;
  };

  get regionDistr() {
    let res = null;
    if (!IsNull(this.inputStats) && !IsNull(this.inputStats.RegionDistr)) {
      res = this.inputStats.RegionDistr;
    }
    return res;
  };

  get yodDistr() {
    let res = null;
    if (this.yodRegion != '' && !IsNull(this.inputStats) && !IsNull(this.inputStats.YODDistr)) {
      res = this.inputStats.YODDistr[this.yodRegion];
    }
    return res;
  };

  get tableDistr() {
    let res = null;
    if (
      this.tableRegion != '' &&
      !IsNull(this.outputStats) &&
      !IsNull(this.outputStats.TableDistr) &&
      !IsNull(this.outputStats.TableDistr[this.tableRegion])
    ) {
      res = this.outputStats.TableDistr[this.tableRegion];
    }
    return res;
  };

  get arrivalPlotData() {
    let res = null;
    if (!IsNull(this.outputPlots) && !IsNull(this.outputPlots.ArrivalPlotData)) {
      res = this.outputPlots.ArrivalPlotData.map(
        el => ({
          values: el.PlotData.YearOfArrival.map((year, i) => [
            year,
            el.PlotData.PostPropLB[i],
            el.PlotData.PostProp[i],
            el.PlotData.PostPropUB[i]
          ]),
          name: el.GroupedRegionOfOrigin
        })
      );
    }
    return res;
  };

  get diagnosisPlotData() {
    let res = null;
    if (!IsNull(this.outputPlots) && !IsNull(this.outputPlots.DiagnosisPlotData)) {
      res = this.outputPlots.DiagnosisPlotData.map(
        el => ({
          value: el.PlotData.YearOfHIVDiagnosis.map((year, i) => [year, el.PlotData.PostProp[i]]),
          name: el.GroupedRegionOfOrigin
        })
      );

    }
    return res;
  };

  setRunProgress = progress => this.runProgress = progress;

  setRunLog = runLog => this.runLog = runLog;

  setInputStats = inputStats => this.inputStats = inputStats;

  setOutputStats = outputStats => this.outputStats = outputStats;

  setOutputPlots = outputPlots => this.outputPlots = outputPlots;

  setConfBounds = confBounds => this.confBounds = confBounds;

  setYodRegion = yodRegion => this.yodRegion = yodRegion;

  setTableRegion = tableRegion => this.tableRegion = tableRegion;

  setDataCompatibleFlag = flag => this.dataCompatibleFlag = flag;

  setPropTableStrat = (strat) => {
    this.propTableStrat = strat;
  };

  run = () => this.rootMgr.btnClicked('runMigrantBtn');

  cancel = () => this.rootMgr.btnClicked('cancelMigrantBtn');
}
