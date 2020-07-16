const mongoose= require('mongoose');
mongoose.connect(process.env.mongodb_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
});