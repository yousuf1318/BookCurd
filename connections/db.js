var mongoose = require('mongoose');
require('dotenv').config()

console.log('connecting to db..............')
mongoose.connect(
    process.env.DB_CONNECTION,
    // "mongodb://localhost:27017/CURD",
    {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err)=>{
        if(err){
            console.log('DB Error!', err)
        }else{
            console.log('DB connected!')
        }
    }
)