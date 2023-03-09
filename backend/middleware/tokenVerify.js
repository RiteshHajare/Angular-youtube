var jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, process.env.Private_Key)
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.email = payload.email
    next()
}
