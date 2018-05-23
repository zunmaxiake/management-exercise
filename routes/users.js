var express = require('express');
var router = express.Router();
var usersCtl = require('../controllers/users.js');

/* GET signature listing. */
router.get('/', function(req, res, next) {
    res.render('users', { title: 'Express'});
});

router.get('/data', function(req, res, next) {
    var reqQuery = req.query;
    usersCtl.getUsers(reqQuery)
    .then(function(doc){
        return res.json(doc);
    })["catch"](function(err){
        return res.json({
            "status":"fail",
            "failMessage":err.message
        })
    })
}); 

router.post('/create', function(req,res,next){
    let firstName = req.body.firstName;
    let regDate = req.body.regDate;
    let mmoney=req.body.mmoney;
    var data = {firstName:firstName,lastName:"jun",age:170,grade:"最高级",mmoney:mmoney,regDate:regDate};
    usersCtl.createUser(data)
    .then(function(result){
        return res.json({status:"success","failMessage":"",result:result});
    })["catch"](function(err){
        return res.json({
            "status":"fail",
            "failMessage":err.message,
            "result":""
        })
    })
});

router.delete('/:id',function(req,res){
    var userId = req.params.id;
    return usersCtl.deleteUserById(userId)
    .then(function(data){
        return res.json({'status': 'success', 'result': data});
    })["catch"](function(err){
        return res.json({'status': 'fail', 'result': JSON.stringify(err)});
    })
});

module.exports = router;