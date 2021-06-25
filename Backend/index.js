const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const EntranceRouters = require('./src/Routers/Entrance');
const EntryRouters = require('./src/Routers/Entry');
const keys = require('./src/Config/Keys');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))

app.use(passport.initialize());
require('./src/Middleware/passport')(passport);

app.use(express.json());
app.use(cors());
app.use('/entrance', EntranceRouters)
app.use('/entry', EntryRouters)

app.listen(7000, () => console.log('START SERVER'));