
const path = require("path");
import express from 'express'
const app = express()

import routes from './app/routes';
const PORT = 5000;

routes(app);
app.use(express.static(path.join(__dirname, "..", "public")));
// app.use(express.static("public"));
// start express server on port 5000
app.listen(PORT, () => {
  console.log("server started on port ", PORT);
});
