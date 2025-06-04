const jwt = require('jsonwebtoken');
const SECRET = ''; 

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token invalide' });

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token invalide ou expiré' });
    }
}

module.exports = auth;
