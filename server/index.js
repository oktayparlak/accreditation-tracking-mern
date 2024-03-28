const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./src/configs/database');
const initAssociations = require('./src/models/index');
const routes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

/** Middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
  })
);

/** Initalize Relations */
initAssociations();

/** Routes */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

routes(app);

/** Error Handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: { message: err?.message } });
});

/** Database Connection and Starting Server */
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected!');
  /** Server */
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
});
