var Promise = require('bluebird');
var signatureInfoDB = require('../model/signatureInfo.js');

class SignatureInfoCtl {
    async getSignatrueInfo(){
        return signatureInfoDB.findAsync({},{},{lean:true});
    }
}

module.exports = new SignatureInfoCtl;