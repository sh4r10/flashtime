const mongoose = require('mongoose')
const { Schema } = mongoose

const cardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deck: { type: Schema.Types.ObjectId, ref: 'Deck', required: true },
    front: { type: String, required: true },
    back: { type: String, required: true },
    lastRevision: { type: Date },
    nextRevision: { type: Date },
  },
  {
    timestamps: true,
  }
)

const Card = mongoose.model('Card', cardSchema)
module.exports = Card
