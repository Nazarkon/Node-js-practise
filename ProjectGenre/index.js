const express = require('express')
const app = express()
const movieRouter = require('./router/MovieRouter');

require('dotenv').config();

app.use(express.json());


const port = process.env.SERVER_PORT;
const apiURL = process.env.RESOURCE_URL;

app.use(movieRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })