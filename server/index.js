const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/manager', require('./routes/manager'));
app.use('/api/associate', require('./routes/associate'));


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
