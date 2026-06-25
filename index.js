require("dotenv").config()

const express = require('express')
const cors = require('cors')
const router = require('./router')
require('./connection')


const saffronServer = express()
saffronServer.use(cors())
saffronServer.use(express.json())
saffronServer.use(router)


const PORT = 4000 || process.env.PORT

saffronServer.listen(PORT, () => {
    console.log(`Server running successfully at port no:${PORT}`);
})

saffronServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:green;"> Server started at port: ${PORT}</h1>`)
})