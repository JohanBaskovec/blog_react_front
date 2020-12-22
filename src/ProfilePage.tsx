import {useContext, useEffect, useState} from "react";
import {SessionContext} from "./SessionContext";
import {Redirect, useParams} from "react-router-dom";
import {Article, DefaultApi, PermissionAuthorization, RoleAuthorization, User} from "./openapi";
import "./ProfilePage.scss";
import {ApiError} from "./ApiError";
import {ArticleList} from "./ArticleList";

export interface ProfilePageProps {
    api: DefaultApi;
}

export interface ProfilePageParams {
    username: string;
}

export function ProfilePage(props: ProfilePageProps) {
    const session = useContext(SessionContext);
    const params: ProfilePageParams = useParams<ProfilePageParams>();
    const [user, setUser] = useState<User | null>();
    const [unauthorized, setUnauthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    useEffect(() => {
        const loadArticles = (user: User) => {
            props.api.getAllArticlesOfUser({username: user.username})
                .subscribe((articles: Article[]) => {
                    setArticles(articles.map(a => ({...a, author: user})));
                });
        }
        if (params.username == null && user == null) {
            if (session.user == null) {
                setUnauthorized(true);
                return;
            }
            setUser(session.user);
            loadArticles(session.user);
        } else {
            setLoading(true);
            props.api.getUserByUsername({username: params.username}).subscribe((user) => {
                    setLoading(false);
                    setUser(user);
                    loadArticles(user);
                },
                (err) => {
                    setLoading(false);
                    setError(ApiError.fromError(err));
                })
        }
    }, []);

    if (unauthorized) {
        return <Redirect to="/"/>;
    }
    if (loading) {
        return <div>Loading</div>;
    }
    if (error) {
        return <div>Error</div>;
    }

    if (user == null) {
        return <div>Loading</div>;
    }
    const roles: RoleAuthorization[] = [];
    const permissions: PermissionAuthorization[] = [];
    if (user.authorizations != null) {
        for (const auth of user.authorizations) {
            if (auth.type === 'role') {
                roles.push(auth);
            } else if (auth.type === 'permission') {
                permissions.push(auth);
            }
        }
    }
    let roleString = roles.length === 0 ? 'None' : roles.map(r => r.role).join(', ');
    //let permissionsString = permissions.length === 0 ? 'None' : permissions.map(r => r.permission).join(', ');
    const isOwnProfile = session.user != null && session.user.username === user.username;
    let usernameLabel = isOwnProfile ? 'Your username' : 'Username';
    let roleLabel = isOwnProfile ? 'Your roles' : 'Role';

    return <div className="ProfilePage">
        <h2>{user.username}'s profile</h2>
        <div className="ProfilePage__row">
            <div className="ProfilePage__label">{usernameLabel}:</div>
            <div className="ProfilePage__value">{user.username}</div>
        </div>
        <div className="ProfilePage__row">
            <div className="ProfilePage__label">{roleLabel}:</div>
            <div className="ProfilePage__value">{roleString}</div>
        </div>
        {/*
        <div className="ProfilePage__row">
            <div className="ProfilePage__label">Your permissions: </div>
            <div className="ProfilePage__value">{permissionsString}</div>
        </div>
*/}
        <div className="ProfilePage__Article">
            <h3>{user.username}'s articles:</h3>
            <ArticleList articles={articles}/>
        </div>
    </div>;
}
