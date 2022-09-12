const mongoose = require('mongoose')

const { Schema } = mongoose

const deckSchema = new Schema(
  {
    deck_name: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Deck', deckSchema)
