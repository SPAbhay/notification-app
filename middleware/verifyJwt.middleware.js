const Jwt = require("jsonwebtoken");


const verifyJwt = async(req,res,next)=>{
    try{
        Jwt.verify(req.headers.jwt, '1234', async function(err, decoded) {
        if (err) res.send({data:{}, msg:"Invalid jwt", err:"Invalid jwt"})
        if(decoded){
        req.user = decoded;
        next();
        }
    });
    }catch(err){
        console.log(err);
        if (err) res.send({data:{}, msg:"something went wrong", err:"something went wrong"});
    }
}

module.exports = {verifyJwt};
