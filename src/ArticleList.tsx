import React, {useEffect, useState} from "react";
import {Article} from "./openapi/models";
import {DefaultApi} from "./openapi/apis";
import {ArticleSummary} from "./ArticleSummary";
import "./ArticleList.scss";

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
        "margin-top": articleSummaryMargin,
        "margin-bottom": articleSummaryMargin
    };
    return (
        <div className="ArticleList">
            {articles.map((article) => <ArticleSummary key={article.id}
                                                       article={article}
                                                       style={articleSummaryStyle}/>)}
        </div>
    )
}
