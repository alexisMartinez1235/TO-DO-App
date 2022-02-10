import express from 'express';
import client from 'prom-client';

const restResponseTimeHistorgram= new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'Rest api response in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const databaseResponseTimeHistorgram= new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response in seconds',
  labelNames: ['operation', 'success']
});

const app = express();

function startMetricsServer(){
  const collectDefaultMetrics = client.collectDefaultMetrics;
  
  collectDefaultMetrics();

  app.get('/metrics', async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    console.log('Metrics server started at http:/localhost:9100');
  });
  
}


export {
   startMetricsServer,
   restResponseTimeHistorgram,
   databaseResponseTimeHistorgram
};
