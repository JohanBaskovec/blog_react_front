import {Article} from "./openapi/models";
import React from "react";
import {Link} from "react-router-dom";
import "./ArticleSummary.scss";

export function ArticleSummary(props: { article: Article }) {
    return (<div className="ArticleSummary">
        <div><Link to={'/article/' + props.article.id}>{props.article.title}</Link></div>
        <div>{props.article.content}</div>
    </div>);
}
