import {DefaultApi} from "./openapi/apis";
import {Article} from "./openapi/models";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ApiError, ApiErrorType} from "./ApiError";

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
        <div>
            <div>
                {article?.title}
            </div>
            <div>
                {article?.content}
            </div>
        </div>
    )
}
