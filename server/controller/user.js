const router = require('express').Router()

router.get('/', (req, res) => {
  res.send(`User id ${req.param.id}`)
})

router.post('/', (req, res) => {
  res.send(`User has been resived`)
})

router.put('/', (req, res) => {
  res.send(`User to update here`)
})

router.delete('/', (req, res) => {
  res.send(`User to delete here!`)
})

module.exports = router
