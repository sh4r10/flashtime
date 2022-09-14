const mongoose = require('mongoose')
const { Schema } = mongoose

const deckCollectionSchema = new Schema(
  {
    deck: [{ type: Schema.Types.ObjectId, ref: 'Deck' }],
    name: { type: String, maxLength: 32 },
  },
  { timestamps: true }
)
module.exports = mongoose.model('DeckCollection', deckCollectionSchema)
