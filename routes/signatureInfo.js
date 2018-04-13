var express = require('express');
var router = express.Router();
var signatureInfoCtl = require('../controllers/signatrueInfo.js');

/* GET signature listing. */
router.get('/', function(req, res, next) {
    res.render('signatureInfo', { title: 'Express'});
});
router.get('/data', function(req, res, next) {
    signatureInfoCtl.getSignatrueInfo()
    .then(function(doc){
        return res.json(doc);
    })["catch"](function(err){
        return res.json({
            "status":"fail",
            "failMessage":err.message
        })
    })
});     
    
module.exports = router;