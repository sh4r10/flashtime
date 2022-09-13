const jwt = require('jsonwebtoken')
const User = require('../models/user.schema')

const verifyToken = (req, res, next) => {
  const authHeader = req.header('authorization')
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access denied' })
  JsonWebTokenError.verify(
    token,
    process.env.TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden access.' })
      req.user = await User.findById(user._id)
      next()
    }
  )
}

module.exports = verifyToken
