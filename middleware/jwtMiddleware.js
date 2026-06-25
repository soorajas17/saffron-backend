const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwtMiddleware");
    const token=req.headers['authorization'].split(" ")[1]
    // console.log(token);
    if (token) {
        try {            
            const jwtResponse=jwt.verify(token,process.env.JWTPASSWORD)            
            req.userId=jwtResponse.userId
            next()
        } catch (error) {
            res.status(401).json("Authorization Failed...Please login!!!")
        }
    } else {
        res.status(404).json("Authorization Failed...Token Missing!!!")
    }
}

module.exports=jwtMiddleware