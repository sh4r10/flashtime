const mongoose = require('mongoose');
const {Schema} = mongoose;

const flashCards = new Schema({
    decks_ID: {type: Schema.Types.ObjectId, ref:'User'},
    frontSide: {type: String , req: true },
    backSide: {type: String , req: true },
    lastRevise:  { type: Date },
    nextRevision: { type: Date } 

},
{
    timestamps : true,
});
const flashCardsSchema = mongoose.models('FlashCards',flashCards);