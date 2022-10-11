const router = require('express').Router()
const DeckCollection = require('../models/deckCollection.schema')
const Deck = require('../models/deck.schema')
const User = require('../models/user.schema')
const verifyToken = require('../middlewares/verifyToken')
const { collection } = require('../models/deck.schema')

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
  const newdeckCollection = new DeckCollection({
    name: deckCollectionName,
  })
  newdeckCollection
    .save()
    .then((deckCollection) => {
      User.findById(req.user._id, (err, user) => {
        if (err) res.sendStatus(403)
        user.deckCollections.push(deckCollection)
        user.save().then(() => {
          res.status(201).json(deckCollection)
        })
      })
    })
    .catch((err) => res.status(404).json('error, ID not found'))
})

router.get('/:id/decks', verifyToken, async (req, res) => {
  if (!req.user.deckCollections.some((c) => c._id == req.params.id))
    return res.sendStatus(403)
  try {
    const collectionId = req.params.id
    const collection = await DeckCollection.findById(collectionId).populate(
      'deck'
    )
    res.json(collection.deck)
  } catch (err) {
    res.sendStatus(500)
  }
})

router.put('/:id/decks/', verifyToken, async (req, res) => {
  const deckId = req.body.deckId
  try {
    const collection = await DeckCollection.findById(req.params.id)
    const deck = await Deck.findById(deckId)
    if (
      req.user.decks.some((d) => d._id == deckId) &&
      deck.collection !== collection._id &&
      !collection.deck.some((d) => d._id == deckId)
    ) {
      collection.deck.push(deckId)
      deck.deckCollection = collection._id
      await deck.save()
      await collection.save()
      res.json(collection)
    } else {
      res.status(400).json('error, deck already in collection')
    }
  } catch (err) {
    res.status(500).json({ message: err })
  }
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

router.delete('/:collectionId/decks/:deckId', verifyToken, async (req, res) => {
  try {
    const collectionId = req.params.collectionId
    const deckId = req.params.deckId
    const collection = await DeckCollection.findById(collectionId)
    if (
      req.user.deckCollections.some((c) => c._id == collectionId) &&
      req.user.decks.some((d) => d._id == deckId) &&
      collection.deck.some((d) => d._id == deckId)
    ) {
      collection.deck = collection.deck.filter((d) => d._id != deckId)
      await Deck.findByIdAndUpdate(
        deckId,
        { deckCollection: null },
        { useFindAndModify: false }
      )
      await collection.save()
      res.sendStatus(204)
    } else {
      res.sendStatus(400)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
