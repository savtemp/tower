import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const TowerEventSchema = new Schema({
    // id: {type: String, required: true},
    creatorId: {type: ObjectId, required: true, ref: 'Account'},
    name: {type: String, required: true, minlength: 1},
    description: {type: String, required: true},
    coverImg: {type: String, required: true},
    location: {type: String, required: true, minlength: 3},
    capacity: {type: Number, required: true},
    startDate: {type: Date, required: true},
    isCanceled: {type: Boolean, default: false},
    type: {type: String, enum: ['concert', 'convention', 'sport', 'digital', 'misc'], required: true, default: 'misc', lowercase: true},
    },
    {timestamps: true, toJSON: {virtuals: true}}
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})