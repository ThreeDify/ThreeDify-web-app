require('dotenv').config();

const path = require('path');
const morgan = require('morgan');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get(/.*?/, (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

console.log('Starting server...');
app.listen(port, () => {
  console.log('Server running...');
  console.log(`Server listening at PORT ${port}...`);
});
