import React, {useContext, useEffect, useState} from "react";
import {Article} from "./openapi/models";
import {DefaultApi} from "./openapi/apis";
import {ArticleSummary} from "./ArticleSummary";
import "./ArticleList.scss";
import {AppLink} from "./AppLink";
import {SessionContext} from "./SessionContext";

export interface ArticleListProps {
    api: DefaultApi;
}

export function ArticleList({api}: ArticleListProps) {
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
    const articleSummaryMargin = "1rem 0";
    const articleSummaryStyle = {
        margin: articleSummaryMargin,
    };
    const session = useContext(SessionContext);
    let body = null;

    if (loading) {
        body = <>Loading articles...</>;
    } else if (error) {
        const errorResponse = error.response ? error.response.message : "Unknown error.";
        body = <>An error happened: {errorResponse}</>;
    } else {
        body = articles.map((article) => <ArticleSummary key={article.id}
                                                         article={article}
                                                         style={articleSummaryStyle}/>);
    }
    return (
        <div className="ArticleList">
            {session.user ?
                <div>
                    <AppLink to="/article/new">New article</AppLink>
                </div> :
                null
            }
            {body}
        </div>
    )
}
