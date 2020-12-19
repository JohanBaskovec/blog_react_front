import {useContext} from "react";
import {SessionContext} from "./SessionContext";
import {Redirect} from "react-router-dom";
import {DefaultApi, PermissionAuthorization, RoleAuthorization} from "./openapi";
import "./ProfilePage.scss";

export interface ProfilePageProps {
    api: DefaultApi;
}

export function ProfilePage(props: ProfilePageProps) {
    const session = useContext(SessionContext);
    if (session.user == null) {
        return <Redirect to="/" />
    }
    const roles: RoleAuthorization[] = [];
    const permissions: PermissionAuthorization[] = [];
    if (session.user.authorizations != null) {
        for (const auth of session.user.authorizations) {
            if (auth.type === 'role') {
                roles.push(auth);
            } else if (auth.type === 'permission') {
                permissions.push(auth);
            }
        }
    }
    let roleString = roles.length === 0 ? 'None' : roles.map(r => r.role).join(', ');
    //let permissionsString = permissions.length === 0 ? 'None' : permissions.map(r => r.permission).join(', ');

    return <div className="ProfilePage">
        <div className="ProfilePage__row">
            <div className="ProfilePage__label">Your username: </div>
            <div className="ProfilePage__value">{session.user.username}</div>
        </div>
        <div className="ProfilePage__row">
            <div className="ProfilePage__label">Your roles: </div>
            <div className="ProfilePage__value">{roleString}</div>
        </div>
{/*
        <div className="ProfilePage__row">
            <div className="ProfilePage__label">Your permissions: </div>
            <div className="ProfilePage__value">{permissionsString}</div>
        </div>
*/}
    </div>;
}
