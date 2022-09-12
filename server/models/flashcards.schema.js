const mongoose = require('mongoose');
const {Schema} = mongoose;

const flashCards = new Schema({
    decks_ID: {type: Schema.Types.ObjectId, ref:'User'},
    front: {type: String , req: true },
    back: {type: String , req: true },
    lastRevise:  { type: Date },
    nextRevision: { type: Date } 

},
{
    timestamps : true,
});
const flashCardsSchema = mongoose.models('FlashCards',flashCards);