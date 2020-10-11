var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const token = require('../TokenVerification');
const survey_model = require('../models/survey_model');

router.get("/result/:id", verifyToken, function (req, res, next) {

    survey_model.result_survey(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows);
            console.log(rows.length);
            if (rows.length !== 0) {
                res.json(rows);
            }
            else {
                res.json({
                    message : "No data to show"
                })
            }


        }
    });
});



router.post("/submit", verifyToken, function (req, res, next) {

    survey_model.submit_survey(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            //console.log(rows);
            console.log(rows.length);
            res.json({
                message: "Response Recorded"
            });
        }
    });
});

router.get("/take/:id", verifyToken, function (req, res, next) {

    survey_model.take_survey(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows);
            console.log(rows.length);
            if (rows.length !== 0) {
                res.json({
                    rows,
                    message: "Survey questions visible on screen"
                });
            }
            else {
                res.json({
                    message: "No questions exist in the survey"
                });
            }

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
            res.json("Either already added or Please try to enter key value pair in body of request survey_id,question,option1,option2 format");
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