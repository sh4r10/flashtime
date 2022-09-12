const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    decks: { type: [Schema.Types.ObjectId], ref: 'Deck' },
    deckCollections: { type: [Schema.Types.ObjectId], ref: 'deckCollection' },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models('User', userSchema)
module.exports = User
