import React, {useContext, useEffect, useState} from "react";
import {Article} from "./openapi/models";
import {DefaultApi} from "./openapi/apis";
import "./ArticleListPage.scss";
import {AppLink} from "./AppLink";
import {SessionContext} from "./SessionContext";
import {UserService} from "./UserService";
import {ArticleList} from "./ArticleList";

export interface ArticleListPageProps {
    api: DefaultApi;
}

export function ArticleListPage({api}: ArticleListPageProps) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        setLoading(true);
        const getAllArticles$ = api.getAllArticles()
            .subscribe(articles => {
                    setArticles(articles);
                    setLoading(false);
                },
                (err) => {
                    setLoading(false);
                    setError(err);
                });
        return () => {
            getAllArticles$.unsubscribe();
        }
    }, []);
    const session = useContext(SessionContext);
    let body = null;

    if (loading) {
        body = <>Loading articles...</>;
    } else if (error) {
        const errorResponse = error.response ? error.response.message : "Unknown error.";
        body = <>An error happened: {errorResponse}</>;
    } else {
        body = <ArticleList articles={articles} />
    }
    return (
        <div className="ArticleListPage">
            {UserService.userHasRole('admin', session.user) ?
                <div>
                    <AppLink to="/article/new">New article</AppLink>
                </div> :
                null
            }
            {body}
        </div>
    )
}
