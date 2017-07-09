import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './database_knex/db';
import routes from './routes';

//console.log('db', db);

const app = express();
const port = process.env.PORT || 4001;

app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server's up on port: ${port}`);
});

module.exports = app;
