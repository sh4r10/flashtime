const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.schema')
const verifyToken = require('../middlewares/verifyToken')

// consts
const SALT_ROUNDS = 10

router.get('/', verifyToken, (req, res) => {
  res.send(`User id ${req.param.id}`)
})

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body
    const password = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    })
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.put('/', (req, res) => {
  res.send(`User to update here`)
})

router.delete('/', (req, res) => {
  res.send(`User to delete here!`)
})

module.exports = router
