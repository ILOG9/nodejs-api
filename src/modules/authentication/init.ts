import { Express } from 'express'
import Routes from './routes'
import RouteController from './controller/route_controller'
import GrantDB, { grantType } from './db/grant-db'
import RoleDB, { roleType } from './db/role-db'
import ProfileDB, { profileType } from './db/profile-db'
import UserDB, { userType } from '../user/db/user-db'
import BcryptHash from '../../lib/hash/bcrypt-hash/bcrypts-hash'

export default class AuthenticationModule {
    public routes: Routes

    constructor(app: Express) {
        this.onLoad()
        this.routes = new Routes(app, new RouteController())
    }

    async onLoad() {
        const sysAdminGrant: grantType = {
            grantName: 'SYSADMIN',
            description: 'SYSADMIN GRANT',
        }
        const grantDB: any = await GrantDB.find(sysAdminGrant)
        if (grantDB == 0) {
            await new GrantDB(sysAdminGrant).save()
        }

        const sysAdminRole: roleType = {
            roleName: 'SYSADMIN',
            description: 'SYSADMIN ROLE',
            grantId: [(await GrantDB.find(sysAdminGrant))[0]._id],
        }
        const roleDB: any = await RoleDB.find(sysAdminRole)
        if (roleDB == 0) {
            await new RoleDB(sysAdminRole).save()
        }

        const sysAdminProfile: profileType = {
            profileName: 'SYSADMIN',
            description: 'SYSADMIN PROFILE',
            roleId: [(await RoleDB.find(sysAdminRole))[0]._id],
        }

        const profileDB: any = await ProfileDB.find(sysAdminProfile)
        if (profileDB == 0) {
            await new ProfileDB(sysAdminProfile).save()
        }

        const sysAdminUser: userType = {
            userName: process.env.SYS_ADMIN_USER!,
            rut: process.env.SYS_ADMIN_RUT!,
            password: await new BcryptHash().createHash(
                process.env.SYS_ADMIN_PASSWORD!
            ),
            email: process.env.SYS_ADMIN_EMAIL!,
            phone: process.env.SYS_ADMIN_PHONE!,
            profileId: [(await ProfileDB.find(sysAdminProfile))[0]._id],
        }
        const userDB: any = await UserDB.find({ rut: sysAdminUser.rut })
        if (userDB == 0) {
            await new UserDB(sysAdminUser).save()
        }
    }
}
