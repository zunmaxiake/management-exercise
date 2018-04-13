var express = require('express');
var router = express.Router();

router.get("/getting/getSignatureInfoTr", function (req, res, next) {
    res.render("template/getSignatureInfoTr", { layout: false });
})
module.exports = router;