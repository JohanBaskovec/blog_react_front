import {Article} from "./openapi/models";
import React from "react";
import "./ArticleSummary.scss";
import {AppLink} from "./AppLink";
import {DateTime} from "luxon";

export interface ArticleSummaryProps {
    article: Article;
    style: React.CSSProperties;
}

export function ArticleSummary(props: ArticleSummaryProps) {
    const article = props.article;
    const creationTime = DateTime.fromMillis(article.creationTime);

    let lastModificationTimeDiv;
    if (article.lastModificationTime != null) {
        const lastModificationTime = DateTime.fromMillis(article.lastModificationTime);
        lastModificationTimeDiv = <div className="ArticleSummary__last_modification_time">
                Last modified on {lastModificationTime.toLocal().toLocaleString(DateTime.DATETIME_MED)}
            </div>;
    }
    return (
        <div className="ArticleSummary" style={props.style}>
                <div className="ArticleSummary__title">
                    <AppLink to={'/article/' + article.id}>{article.title}</AppLink>
                </div>
                <div className="ArticleSummary__publication_time">
                    Published on {creationTime.toLocal().toLocaleString(DateTime.DATETIME_MED)}
                </div>
                {lastModificationTimeDiv}
                <div className="ArticleSummary__author">
                    by {article.author.username}
                </div>
                <div className="ArticleSummary__content">
                    {props.article.content}
                </div>
        </div>);
}
