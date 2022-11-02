const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const cors = require("cors");
let app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
const corsOptions = {
  origin: 'https://farmec.herokuapp.com',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.options('*', cors());

app.listen(port);