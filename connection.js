const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(() => {
    console.log(`Mongo DB connected successfully`);
}).catch((err) => {
    console.log(`Mongo DB connection failed:${err}`);
})