const mongoose = require("mongoose")
const connectionUrl = 'mongodb+srv://minal:123Password@cluster0.tvrlt.mongodb.net/transfly-db?retryWrites=true&w=majority' 

mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})