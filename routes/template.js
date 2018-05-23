var express = require('express');
var router = express.Router();

router.get("/getting/getUserTr", function (req, res, next) {
    res.render("template/getUserTr", { layout: false });
});

router.get("/getting/getFrameTemplate", function (req, res, next) {
    res.render("template/frameTemplate", { layout: false });
})
module.exports = router;