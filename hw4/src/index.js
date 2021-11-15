const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouters = require('./routes/user-routes');
const groupRoutes = require('./routes/groups-routes');
const port = 3000;

app.use(bodyParser.json());
app.use(userRouters);
app.use(groupRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
