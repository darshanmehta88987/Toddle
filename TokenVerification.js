function verifyToken(req,res,next){
    
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //bearer <space> token so split 
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        //reject
        res.json("Please Authenticate before using service");
    }

}

module.exports.verifyToken = verifyToken;

