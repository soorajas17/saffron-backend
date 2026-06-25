const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(() => {
    console.log(`Mongo DB connected successfully`);
}).catch((err) => {
    console.log(`Mongo DB connection failed:${err}`);
})