import {Article} from "./openapi/models";
import React from "react";
import "./ArticleSummary.scss";
import {AppLink} from "./AppLink";
import {DateTime} from "luxon";
import {useTranslation} from 'react-i18next';

export interface ArticleSummaryProps {
    article: Article;
}

export function ArticleSummary(props: ArticleSummaryProps) {
    const article = props.article;
    const creationTime = DateTime.fromMillis(article.creationTime);
    const {t} = useTranslation();

    let lastModificationTimeDiv;
    if (article.lastModificationTime != null) {
        const lastModificationTime = DateTime.fromMillis(article.lastModificationTime);
        lastModificationTimeDiv = <div className="ArticleSummary__last_modification_time">
            {t('last_modification_on')} {lastModificationTime.toLocal().toLocaleString(DateTime.DATETIME_MED)}
        </div>;
    }
    return (
        <div className="ArticleSummary">
            <div className="ArticleSummary__title">
                <AppLink to={'/article/' + article.id}>{article.title}</AppLink>
            </div>
            <div className="ArticleSummary__publication_time">
                {t('publication_date')} {creationTime.toLocal().toLocaleString(DateTime.DATETIME_MED)}
            </div>
            {lastModificationTimeDiv}
            <div className="ArticleSummary__author">
                {t('published_by')} <AppLink
                to={'/profile/' + article.author.username}>{article.author.username}</AppLink>
            </div>
            <div className="ArticleSummary__content"
                 dangerouslySetInnerHTML={{__html: props.article.content}}>
            </div>
        </div>);
}
