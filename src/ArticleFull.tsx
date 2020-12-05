import {DefaultApi} from "./openapi/apis";
import {Article} from "./openapi/models";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ApiError, ApiErrorType} from "./ApiError";
import {TitleLevel2} from "./TitleLevel2";
import {AppLink} from "./AppLink";

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
    useEffect(() => {
        api.getArticleById({id: id}).subscribe((article) => {
                setArticle(article);
            },
            (error) => {
                setError(ApiError.fromError(error));
            });
    }, [])

    if (error) {
        if (error.type === ApiErrorType.notFound) {
            return <div>This article doesn't exist.</div>
        } else {
            return <div>An error happened, please try again later.</div>
        }
    }
    return (
        <article className="ArticleFull">
            <TitleLevel2 style={{marginBottom: "1rem"}}>
                {article?.title}
            </TitleLevel2>
            <div className="ArticleFull__editionLink">
                <AppLink to={'/article/' + article?.id + '/edit'}>Edit</AppLink>
            </div>
            <div className="ArticleFull__content">
                {article?.content}
            </div>
        </article>
    )
}
