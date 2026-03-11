const auth = require('./auth');

const admin = [auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}];

module.exports = admin;
