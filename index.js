require("dotenv").config()

const express = require('express')
const cors = require('cors')
const route = require('./router')
require('./connection')


const saffronServer = express()
saffronServer.use(cors())
saffronServer.use(express.json())
saffronServer.use(route)


const PORT = 4000 || process.env.PORT

saffronServer.listen(PORT, () => {
    console.log(`Server running successfully at port no:${PORT}`);
})