const mongoose = require('mongoose')

function RunServer() {
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('mongoDB connected');
    }catch(err) {
        console.log("not connceted");
    }
    }
module.exports = RunServer;