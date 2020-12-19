import {RoleAuthorization, User} from "./openapi";

export class UserService {
    static userHasRole(role: string, user?: User): boolean {
        if (user == null || user.authorizations == null) {
            return false;
        }
        return user.authorizations.find(auth => {
            if (auth.type === 'role') {
                const roleAuth = auth as RoleAuthorization;
                return roleAuth.role === role;
            } else {
                return false;
            }
        }) != null;
    }
}
