import {Article} from "./openapi/models";
import React from "react";
import "./ArticleSummary.scss";
import {AppLink} from "./AppLink";

export interface ArticleSummaryProps {
    article: Article;
    style: React.CSSProperties;
}

export function ArticleSummary(props: ArticleSummaryProps) {
    const article = props.article;
    return (<div className="ArticleSummary" style={props.style}>
        <div className="ArticleSummary__title">
            <AppLink to={'/article/' + article.id}>{article.title}</AppLink>
        </div>
        <div className="ArticleSummary__author">
            by {article.author.username}
        </div>
        <div>{props.article.content}</div>
    </div>);
}
