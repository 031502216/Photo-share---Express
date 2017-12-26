var mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost:27017/photo',{useMongoClient: true}, function(err){
    if(err){
        console.log('数据库连接失败');
    }
    else{
        console.log('连接成功');
    }
})

var schema = new mongoose.Schema({
    name : String,
    path : String
})

module.exports = mongoose.model('Photo', schema);