import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './database_knex/db';
import routes from './routes';

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server's up on port: ${port}`);
});

module.exports = app;
