var mongoose = require("mongoose")
    , Schema = mongoose.Schema;

var schema = new Schema({
    sigNo:{type:String,default:""},
    secGrade:{type:String,default:""},
    yName:{type:String,default:""},
    buyNumber:{type:Number,default:0},
    buyDate:{type:Date,default:Date.now()}
})

module.exports = signatureInfo = global.db.model('signatureInfo',schema,'signatureInfo');