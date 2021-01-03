const jwt = require ('jsonwebtoken');
const auth = require ('../config/auth.json');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader){
        return response.status(401).send({ error: 'User is not authenticated'});
    }

    const splitToken = authHeader.split(' ');

    if(!splitToken.length ==2){
        return response.status(401).send({ error: 'Malformed token'});
    }

    const [bearer, token] = splitToken;
    if(!/^Bearer$/i.test(bearer)){
        return response.status(401).send({error: 'Malformed token'});
    }

    jwt.verify(token, auth.secret, (err, decoded) => {
        if (err){
            return response.status(401).send({error: 'Invalid token'});
        }
        request.UserId = decoded.id;
        return next();
    })
};