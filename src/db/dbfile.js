const mongoose = require("mongoose")
const connectionUrl = 'mongodb+srv://minal:123Password@cluster1.tvrlt.mongodb.net/transfly-db?retryWrites=true&w=majority' 
const connectionUrl2 = 'mongodb+srv://minal:123Password@cluster1.tvrlt.mongodb.net/transfly-image?retryWrites=true&w=majority' 


mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})


mongoose.imagedb = mongoose.createConnection(connectionUrl2,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

module.exports = mongoose