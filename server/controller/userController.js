const router = require('express').Router()

router.get('/', (req, res) => {
  res.send(`User id ${req.param.id}`)
})

router.post('/', (res, req) => {
  res.send(`User has been resived`)
})

router.put('/', (res, req) => {
  res.send(`User to update here`)
})

router.delete('/', (res, req) => {
  res.send(`User to delete here!`)
})

module.exports = router
