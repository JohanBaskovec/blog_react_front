import {DefaultApi} from "./openapi/apis";
import {Article} from "./openapi/models";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ApiError, ApiErrorType} from "./ApiError";
import {TitleLevel2} from "./TitleLevel2";
import {AppLink} from "./AppLink";
import {SessionContext} from "./SessionContext";
import "./ArticleFull.scss";

export interface ArticleFullProps {
    api: DefaultApi;
}

export interface ArticleFullPathParams {
    id: string;
}

export function ArticleFull({api}: ArticleFullProps) {
    const {id}: ArticleFullPathParams = useParams<ArticleFullPathParams>();
    const [article, setArticle] = useState<Article | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState(false);
    const session = useContext(SessionContext);
    useEffect(() => {
        setLoading(true);
        api.getArticleById({id: id}).subscribe((article) => {
                setArticle(article);
                setLoading(false);
            },
            (error) => {
                setError(ApiError.fromError(error));
                setLoading(false);
            });
    }, [])

    let body = null;
    if (loading) {
        body = <>Loading article...</>
    } else if (error) {
        if (error.type === ApiErrorType.notFound) {
            body = <>This article doesn't exist.</>
        } else {
            body = <>An error happened, please try again later.</>
        }
    } else {
        body = <>
            <TitleLevel2 className="ArticleFull__title">
                {article?.title}
            </TitleLevel2>
            <div className="ArticleFull__author_name">
                by {article?.author.username}
            </div>
            {session.user ?
                <div className="ArticleFull__editionLink">
                    <AppLink to={'/article/' + article?.id + '/edit'}>Edit</AppLink>
                </div>
                : null
            }
            <div className="ArticleFull__content">
                {article?.content}
            </div>
        </>;
    }
    return (
        <article className="ArticleFull">
            {body}
        </article>
    )
}
