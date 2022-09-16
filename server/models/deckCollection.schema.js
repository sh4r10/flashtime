const mongoose = require('mongoose')
const { Schema } = mongoose

const deckCollectionSchema = new Schema(
  {
    deck: [{ type: Schema.Types.ObjectId, ref: 'Deck', required: true }],
    name: { type: String, maxLength: 32, required: true },
  },
  { timestamps: true }
)
module.exports = mongoose.model('DeckCollection', deckCollectionSchema)
