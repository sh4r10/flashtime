const mongoose = require('mongoose')
const { Schema } = mongoose

const cardSchema = new Schema(
  {
    deckID: { type: Schema.Types.ObjectId, ref: 'Deck' },
    front: { type: String, required: true },
    back: { type: String, required: true },
    lastRevision: { type: Date },
    nextRevision: { type: Date },
  },
  {
    timestamps: true,
  }
)

const Card = mongoose.models('Card', cardSchema)
module.exports = Card
