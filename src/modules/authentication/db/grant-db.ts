import { Schema, model } from 'mongoose'

export type grantType = {
    _id?: Schema.Types.ObjectId | any
    grantName?: String
    description?: String
}

const grantSchema = new Schema(
    {
        grantName: String,
        description: String,
    },
    {
        timestamps: true,
    }
)

export default model('GrantDB', grantSchema)
