import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 4001;

app.use('*', cors({ origin: 'http://localhost:3000' }));

app.listen(port, () => {
  console.log(`Server's up on port: ${port}`);
});
