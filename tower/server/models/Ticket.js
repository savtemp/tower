import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId



export const TicketSchema = new Schema({
    // id: {type: String, required: true},
    eventId:{type: ObjectId, required: true, ref: 'Event'},
    accountId:{type: ObjectId, required: true, ref: 'Account'}
},{
    timestamps: true, toJSON: {virtuals: true}
})

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true
})

