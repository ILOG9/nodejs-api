import { Schema, model } from 'mongoose'

export type profileType = {
    _id?: Schema.Types.ObjectId | any
    profileName?: String
    description?: String
    roleId?: [Schema.Types.ObjectId] | any
}

const profileSchema = new Schema(
    {
        profileName: String,
        description: String,
        roleId: {
            ref: 'RoleDB',
            type: [Schema.Types.ObjectId],
        },
    },
    {
        timestamps: true,
    }
)

export default model('ProfileDB', profileSchema)
