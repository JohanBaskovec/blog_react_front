import {Article} from "./openapi/models";
import React from "react";
import {Link} from "react-router-dom";
import "./ArticleSummary.scss";

export interface ArticleSummaryProps {
    article: Article;
    style: any;
}

export function ArticleSummary(props: ArticleSummaryProps) {
    return (<div className="ArticleSummary" style={props.style}>
        <div><Link to={'/article/' + props.article.id}>{props.article.title}</Link></div>
        <div>{props.article.content}</div>
    </div>);
}
