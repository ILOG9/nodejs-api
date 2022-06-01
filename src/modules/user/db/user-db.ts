import { Schema, model } from 'mongoose'
import BcryptHash from '../../../lib/hash/bcrypt-hash/bcrypts-hash'

export type userType = {
    userName?: string
    rut?: string
    password: string
    email?: string
    phone?: string
    emailIsVerified?: Boolean
    phoneIsVerified?: Boolean
    verificationCode?: string
    profileId: [Schema.Types.ObjectId] | any
}
/**
 * Esquema de usuario para la base de datos.
 */
const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: false,
        },
        rut: {
            type: String,
            unique: true,
            indexes: true,
            required: false,
            trim: true,
            sparse: true,
        },
        password: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            indexes: true,
            lowercase: true,
            required: false,
            trim: true,
            sparse: true,
        },
        phone: { type: String, required: false },
        emailIsVerified: { type: Boolean, default: false },
        phoneIsVerified: { type: Boolean, default: false },
        verificationCode: {
            type: String,
            default: '',
        },
        profileId: {
            ref: 'Profile',
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.method('secureSave', async function (user: userType) {
    let newUser: userType = user
    user.password = await new BcryptHash().createHash(newUser.password)

    newUser = await new (model('UserDB'))(newUser)
        .save()
        .then((res) => {
            return process.env.APP_DEBUG == 'true'
                ? res
                : {
                      message: 'Usuario creado correctamente',
                  }
        })
        .catch((err) => {
            if (process.env.APP_DEBUG == 'true') {
                return err
            } else if ((err.code = 11000)) {
                return {
                    message: 'registro duplicado.',
                    keyValue: err.keyValue,
                }
            } else {
                return {
                    message: 'Error desconocido en la agregación de usuario',
                }
            }
        })
    return newUser
})

userSchema.method('secureUpdate', async function (user: userType) {
    let newUser: any

    if (user.hasOwnProperty('rut')) {
        newUser = await model('UserDB').findOne({ rut: user.rut })
    }
    if (user.hasOwnProperty('email')) {
        newUser = await model('UserDB').findOne({ email: user.email })
    }

    if (newUser) {
        let ifHaveChanges: boolean = false
        if (user.hasOwnProperty('userName')) {
            newUser.userName = user.userName
            ifHaveChanges = true
        }
        if (user.hasOwnProperty('password')) {
            newUser.password = await new BcryptHash().createHash(user.password)
            ifHaveChanges = true
        }
        if (user.hasOwnProperty('email')) {
            newUser.email = user.email
            ifHaveChanges = true
        }
        if (user.hasOwnProperty('phone')) {
            newUser.phone = user.phone
            ifHaveChanges = true
        }
        if (ifHaveChanges) {
            newUser.update()
            return {
                message: newUser,
            }
        }
        return {
            message: "user doesn't have changed",
        }
    } else {
        return {
            message: 'Identifier error',
        }
    }
})

userSchema.method('secureList', async function () {
    return await model('UserDB').find()
})

userSchema.method('secureShow', async function (id: string) {
    return await model('UserDB').findById(id)
})

userSchema.method('secureDelete', async function (id: string) {
    return await model('UserDB').deleteOne({ _id: id })
})

export default model('UserDB', userSchema)
