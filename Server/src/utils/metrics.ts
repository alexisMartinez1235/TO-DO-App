import express from 'express';
import client from 'prom-client';

//
// Prometheus methods
//

const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'Rest api response in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response in seconds',
  labelNames: ['operation', 'success'],
});

const app = express();

function startMetricsServer() {
  const { collectDefaultMetrics } = client;

  collectDefaultMetrics();

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.log('Metrics server started at http:/localhost:9100');
  });
}

function startTimer(
  req: any,
  _res: any,
  next: any,
) {
  req.app.locals.Timer = databaseResponseTimeHistogram.startTimer();
  req.app.locals.metricsLabels = {
    operation: `${req.method} = ${req.baseUrl}`,
  };
  req.app.locals.success = false; // default false
  next();
}

function stopTimer(
  req: any,
  // res: any,
  // next: any,
) {
  const { success, metricsLabels } = req.app.locals;
  // const time = req.app.locals.timer({ ...metricsLabels, success });
  req.app.locals.Timer({ ...metricsLabels, success });
}

export {
  stopTimer,
  startTimer,
  startMetricsServer,
  restResponseTimeHistogram,
  databaseResponseTimeHistogram,
};
