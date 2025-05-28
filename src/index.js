const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./db');
const path = require('path');

const app = express();
connectDB();

const corsOptions = {
  origin: 'https://www.aboelyazed.com',
};

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  validate: {
    xForwardedForHeader: false,
    default: true,
  },
});

app.use(limiter);
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('combined'));
// app.use((req, res, next) => {
//   global.activeRequests = (global.activeRequests || 0) + 1;
//   res.on('finish', () => {
//     setImmediate(() => global.activeRequests--);
//   });
//   next();
// });
app.use(express.static(path.join(__dirname, '..', 'public')));

const Routes = require('./Routes');

app.use('/', Routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
