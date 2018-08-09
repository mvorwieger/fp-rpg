import {PlayerState} from '../Player'
import { Document, Schema, Model, model} from "mongoose";

export interface PlayerModel extends PlayerState, Document {}

export const PlayerSchema: Schema = new Schema({
    health: Number,
    name: {
        type: String,
        unique: true,
        required: true
    },
    level: {
        level: Number,
        progress: Number
    },
    weapon: { type: Schema.Types.ObjectId, ref: 'Item'},
    shield: { type: Schema.Types.ObjectId, ref: 'Item'},
    inventory: {
        items: [{ type: Schema.Types.ObjectId, ref: 'Item'}]
    },
    cash: Number
})

export const DbPlayer: Model<PlayerModel> = model<PlayerModel>('Player', PlayerSchema)

