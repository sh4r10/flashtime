const mongoose = require('mongoose');
const {Schema} = mongoose;

const flashCards = new Schema({
    deckID: {type: Schema.Types.ObjectId, ref:'User'},
    front: {type: String , req: true },
    back: {type: String , req: true },
    lastRevision:  { type: Date },
    nextRevision: { type: Date } 

},
{
    timestamps : true,
});
const flashCardsSchema = mongoose.models('FlashCards', flashCards);