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
    useEffect(() => {
        api.getAllArticles().subscribe(articles => {
            setArticles(articles);
        });
    }, []);
    const articleSummaryMargin = "8px";
    const articleSummaryStyle = {
        marginTop: articleSummaryMargin,
        marginBottom: articleSummaryMargin
    };
    const session = useContext(SessionContext);
    return (
        <div className="ArticleList">
            {session.user ?
                <div>
                    <AppLink to="/article/new">New article</AppLink>
                </div> :
                null
            }
            <div>
                {articles.map((article) => <ArticleSummary key={article.id}
                                                           article={article}
                                                           style={articleSummaryStyle}/>)}
            </div>
        </div>
    )
}
