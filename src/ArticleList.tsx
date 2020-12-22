import {Article} from "./openapi";
import {ArticleSummary} from "./ArticleSummary";
import React from "react";

interface ArticleListProps {
    articles: Article[];
}

export function ArticleList(props: ArticleListProps) {
    return <div className="ArticleListPage">{
        props.articles.map((article) => <ArticleSummary key={article.id}
                                                        article={article}/>)
    }
    </div>;
}
