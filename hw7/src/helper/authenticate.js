const jwt = require('jsonwebtoken');

const checkTokenEquality = (req,res, next) => {
    const token = req.headers['x-access-token'];

    if(!token) {
        return res.status(401).send({ 
            success: false,
            message: 'No token provided'
         })
    }

    return jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if(err) {
            return res.status(401).send({
                success: false,
                message: "Failed to authenticate token."
            });
        }

        return next();
    })
    
}

module.exports = checkTokenEquality