import {Article} from "./openapi/models";
import React from "react";
import "./ArticleSummary.scss";
import {AppLink} from "./AppLink";

export interface ArticleSummaryProps {
    article: Article;
    style: React.CSSProperties;
}

export function ArticleSummary(props: ArticleSummaryProps) {
    return (<div className="ArticleSummary" style={props.style}>
        <div><AppLink to={'/article/' + props.article.id}>{props.article.title}</AppLink></div>
        <div>{props.article.content}</div>
    </div>);
}
