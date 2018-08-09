import {Item} from '../Item'
import { Document, Schema, Model, model} from "mongoose"

interface ItemModel extends Item, Document {}

export const ItemSchema: Schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    value: Number,
    attackDamage: {
        type: Number
    },
    blockPercentage: {
        type: Number
    }
})

export const DbItem: Model<ItemModel> = model<ItemModel>("Item", ItemSchema)