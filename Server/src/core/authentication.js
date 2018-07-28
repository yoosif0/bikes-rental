const jwt = require('jsonwebtoken');
const errorMessageWrapper = require('services/utility').errorMessageWrapper

function getToken(_id, role) {
    return jwt.sign({
        _id: _id,
        role: role
    }, process.env.secret, {
            expiresIn: 60 * 60 * 24 * 7
        });
}

 function verifyUser (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { 
        const token = req.headers.authorization.split(' ')[1] 
        jwt.verify(token, process.env.secret, function (err, decoded) {
            if (err) return res.status(401).json({msg:'Failed to authenticate. Please sign in', code:3});
            req.decoded = decoded;
            next();
        });
    }
    else return res.status(401).json(errorMessageWrapper({msg:'No token provided.', code: 4})); 
}




module.exports = {getToken, verifyUser}