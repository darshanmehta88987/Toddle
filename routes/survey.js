var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const token = require('../TokenVerification');
const survey_model = require('../models/survey_model');


router.get("/take/:id", verifyToken, function (req, res, next) {

    survey_model.create_survey(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows);
            res.json({
                message: "Survey Created",
                id: "Use this " + rows.insertId + " to add questions to survey"
            });
        }
    });
});


router.post("/create", verifyToken, function (req, res, next) {

    survey_model.create_survey(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows);
            res.json({
                message: "Survey Created",
                id: "Use this " + rows.insertId + " to add questions to survey"
            });
        }
    });
});

router.post("/addQuestion", verifyToken, function (req, res, next) {

    survey_model.add_question(req.body, function (err, rows) {
        if (err) {
            res.json("Either already added or Please try enter key value pair in body survey_id,question,option1,option2 format");
        } else {
            res.json({
                message: "Question Added"
            });
        }
    });
});

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        //bearer <space> token so split 
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, "secretkey", (err, authData) => {
            if (err) {
                console.log(err);
                res.json("JWT Invalid");
            }
            else {
                next();
            }
        });

    } else {
        //reject
        res.json("Please Authenticate before using service");
    }

}

module.exports = router;