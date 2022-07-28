import { Schema, model } from 'mongoose'

export type roleType = {
    _id?: Schema.Types.ObjectId | any
    roleName?: String
    description?: String
    grantId?: [Schema.Types.ObjectId] | any
}

const roleSchema = new Schema(
    {
        roleName: String,
        description: String,
        grantId: {
            ref: 'GrantDB',
            type: [Schema.Types.ObjectId],
        },
    },
    {
        timestamps: true,
    }
)

export default model('RoleDB', roleSchema)
