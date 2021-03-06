import { COHORT_LIST as path } from "constants";

export default store => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure(
      [],
      require => {
        /*  Webpack - use require callback to define
          dependencies for bundling   */
        const Cohorts = require("./containers/CohortList").default;

        /*  Return getComponent   */
        cb(null, Cohorts);

        /* Webpack named bundle   */
      },
      "Cohorts"
    );
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], require => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Cohort = require("./routes/Cohort").default;

      /*  Return getComponent   */
      cb(null, [Cohort(store)]);
    });
  }
});
