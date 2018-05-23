// var mongoose = require("mongoose")
//     , Schema = mongoose.Schema;

// var schema = new Schema({
//     sigNo:{type:String,default:""},
//     secGrade:{type:String,default:""},
//     yName:{type:String,default:""},
//     buyNumber:{type:Number,default:0},
//     buyDate:{type:Date,default:Date.now()}
// })

// module.exports = signatureInfo = global.db.model('signatureInfo',schema,'signatureInfo');
var Sequelize = require('sequelize');
var userModel = {
    id: {        
        type: Sequelize.INTEGER,
        autoIncrement:true,
        initialAutoIncrement:1,
        primaryKey: true        
    },
    firstName: Sequelize.STRING(50),
    lastName: Sequelize.STRING(50),
    age: Sequelize.INTEGER(10),
    grade: Sequelize.STRING(50),
    mmoney: Sequelize.DECIMAL(10,2), 
    regDate: Sequelize.DATE(20)
}
// module.exports = user = global.sequelize.define('user',userModel);
module.exports = user = global.sequelize.define('user',userModel,{timestamps: false});