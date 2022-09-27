const router = require('express').Router()
const DeckCollection = require('../models/deckCollection.schema')
const Deck = require('../models/deck.schema')
const User = require('../models/user.schema')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, async (req, res) => {
  res.json(req.user.deckCollections)
})

router.get('/:id', verifyToken, (req, res) => {
  const collectionId = req.params.id
  DeckCollection.findById(collectionId)
    .then((collection) => {
      if (req.user.deckCollections.some((c) => c._id == collectionId)) {
        res.json(collection)
      } else {
        res.sendStatus(403)
      }
    })
    .catch((err) => {
      res.json({ message: err })
      res.sendStatus(404)
    })
})

router.post('/', verifyToken, async (req, res) => {
  const deckCollectionName = req.body.name
  const deck = req.body.deck
  if (req.user.decks.some((d) => d._id == deck)) {
    const newdeckCollection = new DeckCollection({
      name: deckCollectionName,
      deck: [req.body.deck],
    })
    newdeckCollection
      .save()
      .then((deckCollection) => {
        User.findById(req.user._id, (err, user) => {
          if (err) res.sendStatus(403)
          user.deckCollections.push(deckCollection)
          user.save().then(() => {
            res.json({ message: 'New deckCollection has been created' })
            res.status(201).json(deckCollection)
          })
        })
      })
      .catch((err) => res.status(404).json('error, ID not found'))
  } else {
    res.json('your deckID is not valid, hence you cannot create deckCollection')
  }
})

router.put('/:id/add/', verifyToken, async (req, res) => {
  const deckId = req.body.deckId
  DeckCollection.findById(req.params.id).then((collection) => {
    if (req.user.decks.some((d) => d._id == deckId)) {
      collection.deck.push(deckId)
      return collection
        .save()
        .then((result) => {
          res.json({ message: result })
        })
        .catch((err) => res.json({ message: err }))
    } else {
      res.sendStatus(403)
    }
  })
})

router.put('/:id', verifyToken, async (req, res) => {
  const collectionNameUpdate = req.body.name
  DeckCollection.findById(req.params.id).then((collection) => {
    if (req.user.deckCollection.some((c) => c._id == req.params.id)) {
      collection.name = collectionNameUpdate
      return collection
        .save()
        .then((result) => {
          res.json({ result: result })
        })
        .catch((err) => res.json({ message: err }))
    } else {
      res.sendStatus(403)
    }
  })
})

router.delete('/:id', verifyToken, async (req, res) => {
  const collectionID = req.params.id
  DeckCollection.findById(collectionID)
    .then((collection) => {
      if (req.user.deckCollection.some((c) => c._id == collectionID)) {
        collection.delete().then(() => {
          res.status(204).json(`Deck  has been deleted`)
        })
      } else {
        res.json('you are not allowd to delete this deck')
      }
    })
    .catch((err) => {
      res.json({ message: err })
    })
})

module.exports = router
