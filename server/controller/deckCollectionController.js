const router = require('express').Router()
const DeckCollection = require('../models/deckCollection.schema')
const Deck = require('../models/deck.schema')
const User = require('../models/user.schema')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = User.find().array.forEach((user) => {
      user.findById(User.params.id).then((user) => res.json(user))
    })
    // const deckCollection = await DeckCollection.find()
    // if (deckCollection.length === 0) res.json('No decks here')
    // res.json(deckCollection)
  } catch (err) {
    console.log(err)
    res.sendStatus(404)
  }
  DeckCollection.find()
    .then((deckCollection) => {
      if (deckCollection.length === 0) res.json('No desks here')
      if (deckCollection) res.json(deckCollection)
    })
    .catch((err) => {
      console.log(err)
      console.log('No decks here')
      res.sendStatus(404)
    })
})

router.get('/:id', verifyToken, (req, res) => {
  const collectionId = req.params.id
  DeckCollection.findById(collectionId)
    .then((collection) => res.json(collection))
    .catch((err) => {
      console.log('no collection here')
      console.log(err)
      res.sendStatus(404)
    })
})

router.post('/', verifyToken, async (req, res) => {
  const deckCollectionName = req.body.name
  //const deckArray = req.body.deck
  const deckId = req.body.deckId
  const d = await Deck.findById(deckId)
  if (!d) res.status(404).json('error, ID not found')
  const newdeckCollection = new DeckCollection({
    name: deckCollectionName,
    deck: [d],
  })
  newdeckCollection
    .save()
    .then((nc) => {
      console.log('new deck Collection been created!')
      //newdeckCollection.push(deckID)
      res.json('new deck Collection been created!')
      // redirect
    })
    .catch((err) => {
      console.log(err)
      res.json('Something wrong has happend')
    })
})

router.put('/:id/add', verifyToken, async (req, res) => {
  //const collectionNameUpdate = req.body.name
  const deckId = req.body.deckId
  const d = await Deck.findById(deckId)
  if (d === null) res.status(404).json('error')
  DeckCollection.findById(req.params.id)
    .then((collection) => {
      //collection.name = collectionNameUpdate
      collection.deck.push(d)
      return collection.save()
    })
    .then((result) => {
      res.json('New Deck has been added to the collection')
      console.log(result)
    })
    .catch((err) => console.log(err))
  console.log(deckId, d)
  // DeckCollection.findById(req.params.id)
  //   .then((collection) => {
  //     collection.name = collectionNameUpdate

  //     return collection.save()
  //   })
  //   .then((result) => {
  //     console.log(result)
  //     res.json('Decks name has been updated')
  //     //res.redirect('')
  //   })
  //   .catch((err) => {
  //     res.sendStatus(404)
  //     console.log(err)
  //   })
})

router.put('/:id', verifyToken, async (req, res) => {
  const collectionNameUpdate = req.body.name
  // const deckId = req.body.deckId
  // const d = await Deck.findById(deckId)
  // if (d === null) res.status(404).json('error')
  DeckCollection.findById(req.params.id)
    .then((collection) => {
      collection.name = collectionNameUpdate
      //collection.deck.push(d)
      return collection.save()
    })
    .then((result) => {
      res.json('Decks name has been updated')
      console.log(result)
    })
    .catch((err) => console.log(err, 'no update for name'))
})

router.delete('/:id', verifyToken, async (req, res) => {
  const collectionID = req.params.id
  //const deleteCollection = await DeckCollection.findByIdAndDelete(collectionID)
  await DeckCollection.findByIdAndDelete(collectionID)
  res.json(`Collection of name: ${req.body.name} has been deleted`)

  res.sendStatus(404)
  console.log(err)
  console.log(deleteCollection)
  res.sendStatus(200)
})

module.exports = router
