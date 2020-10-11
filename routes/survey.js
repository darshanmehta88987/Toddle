var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const token = require('../TokenVerification');

router.get("/create", verifyToken ,function(req, res, next) {
   

    jwt.verify(req.token,"secretkey",(err,authData) => {
        if(err){
            console.log(err);
            res.json("JWT Invalid");
        }
        else{

            res.json({
                message : "Survey Created",
                authData
            });
        }
    });

});

function verifyToken(req,res,next){
    
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //bearer <space> token so split 
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log(req.token);
        next();
    }else{
        //reject
        res.json("Please Authenticate before using service");
    }

}

module.exports = router;