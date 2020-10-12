const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const surveyModel = require('../models/survey_model');

router.get("/result/:id", verifyToken, function (req, res, next) {

    surveyModel.resultSurvey(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            if (rows.length !== 0) {
                res.json(rows);
            }
            else {
                res.json({
                    message: "No data to show"
                })
            }
        }
    });
});

router.post("/submit", verifyToken, function (req, res, next) {

    surveyModel.submitSurvey(req.body, function (err, rows) {
        if (err) {
            res.json("Response Already recorderd or Invalid attempt");
        } else {
            res.json({
                message: "Response Recorded"
            });
        }
    });
});

router.get("/take/:id", verifyToken, function (req, res, next) {

    surveyModel.takeSurvey(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            if (rows.length !== 0) {
                res.json({
                    rows,
                    message: "Survey questions visible on screen"
                });
            }
            else {
                res.json({
                    message: "No questions exist in the survey or survey does not exist"
                });
            }
        }
    });
});


router.post("/create", verifyToken, function (req, res, next) {

    surveyModel.createSurvey(req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            console.log(rows);
            res.json({
                message: "Survey Created",
                id: "Use this " + rows.insertId + " id to add questions to survey"
            });
        }
    });
});

router.post("/addQuestion", verifyToken, function (req, res, next) {

    surveyModel.addQuestion(req.body, function (err, rows) {
        if (err) {
            res.json("Either already added or survey does not exist or Please try to enter key value pair in body of request survey_id,question,option1,option2 format");
        } else {
            res.json({
                message: "Question Added"
            });
        }
    });
});

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        //bearer <space> token so split 
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, "ToddleSecretKey", (err, authData) => {
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