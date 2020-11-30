import React, {useEffect, useState} from "react";
import {Article} from "./openapi/models";
import {DefaultApi} from "./openapi/apis";
import {ArticleSummary} from "./ArticleSummary";

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
    return (
        <div>
            {articles.map((article) => <ArticleSummary key={article.id} article={article}/>)}
        </div>
    )
}
