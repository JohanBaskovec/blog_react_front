import {DefaultApi} from "./openapi/apis";
import {Article, ArticleComment, ArticleCommentCreationFormData} from "./openapi/models";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ApiError, ApiErrorType} from "./ApiError";
import {TitleLevel2} from "./TitleLevel2";
import {AppLink} from "./AppLink";
import {SessionContext} from "./SessionContext";
import "./ArticleFull.scss";
import {UserService} from "./UserService";
import {Form} from "./form/Form";
import {FormButtonsContainer} from "./form/FormButtonsContainer";
import {FormButton} from "./form/FormButton";
import * as Yup from 'yup';
import {Formik, FormikHelpers} from "formik";
import {TextAreaFormGroup} from "./form/TextAreaFormGroup";
import {RandomService} from "./RandomService";
import { useTranslation } from "react-i18next";
import {DateTime} from "luxon";

export interface ArticleFullProps {
    api: DefaultApi;
    randomService: RandomService;
}

export interface ArticleFullPathParams {
    id: string;
}

export function ArticleFull({api, randomService}: ArticleFullProps) {
    const {id}: ArticleFullPathParams = useParams<ArticleFullPathParams>();
    const [article, setArticle] = useState<Article | null>(null);
    const {t, i18n } = useTranslation();
    const [error, setError] = useState<ApiError | null>(null);
    const [comments, setComments] = useState<ArticleComment[]>([]);
    const [loading, setLoading] = useState(false);
    const session = useContext(SessionContext);
    const [persisted, setPersisted] = useState(false);
    useEffect(() => {
        setLoading(true);
        const getArticleById$ = api.getArticleById({id: id}).subscribe((article) => {
                setArticle(article);
                setLoading(false);
            },
            (error) => {
                setError(ApiError.fromError(error));
                setLoading(false);
            });
        const getComments$ = api.getAllCommentsOfArticle({articleId: id}).subscribe((comments: ArticleComment[]) => {
            setComments(comments);
        }, (error) => {
            setError(ApiError.fromError(error));
        });
        return () => {
            getArticleById$.unsubscribe();
            getComments$.unsubscribe();
        };
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
    } else if (article != null) {
        body = <>
            <TitleLevel2 className="ArticleFull__title">
                {article.title}
            </TitleLevel2>
            <div className="ArticleFull__author_name">
                by {article.author.username}
            </div>
            {UserService.userHasRole('admin', session.user) ?
                <div className="ArticleFull__editionLink">
                    <AppLink to={'/article/' + article.id + '/edit'}>Edit</AppLink>
                </div>
                : null
            }
            <div className="ArticleFull__content" dangerouslySetInnerHTML={{__html: article.content}}>
            </div>
            {session.user ?
                <div className="ArticleFull__commentInputContainer">
                    <Formik initialValues={{
                        articleId: article.id,
                        content: '',
                        id: randomService.generateUuid()
                    } as ArticleCommentCreationFormData}
                            validationSchema={Yup.object({
                            })}
                            onSubmit={(articleCommentCreationFormData: ArticleCommentCreationFormData,
                                       {setSubmitting, resetForm, setFieldValue}: FormikHelpers<ArticleCommentCreationFormData>) => {
                                setPersisted(false);
                                api.insertArticleComment({articleCommentCreationFormData}).subscribe(() => {
                                        setSubmitting(false);
                                        setPersisted(true);
                                        setComments(comments.concat([{
                                            author: session.user!,
                                            articleId: article.id,
                                            content: articleCommentCreationFormData.content,
                                            creationTime: +new Date(),
                                            id: articleCommentCreationFormData.id,
                                            version: 0,
                                        }]));
                                        resetForm();
                                        setFieldValue('id', randomService.generateUuid());

                                    },
                                    () => {
                                        setSubmitting(false);
                                    });
                            }
                            }>
                        <Form name="article-form">
                            <TextAreaFormGroup inputName={'content'}
                                               inputLabel={'Post a new comment'}>
                            </TextAreaFormGroup>
                            <FormButtonsContainer>
                                {persisted ? (<div className="saved-indicator">Saved</div>) : null}
                                <FormButton type="submit">Submit</FormButton>
                            </FormButtonsContainer>
                        </Form>
                    </Formik>
                </div>
                : <div>Login to leave a comment.</div>
            }
            <div className="ArticleFull__comments">
                <h3>Comments</h3>
                {
                    comments.map(c => <div>
                        <div className="ArticleFull__comment-author">{c.author.username}</div>
                        <div className="ArticleFull__publication_time">
                            {t('publication_date')}&nbsp;
                            { DateTime.fromMillis(c.creationTime).toLocal().setLocale(i18n.language).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS) }
                        </div>
                        <div className="ArticleFull__comment-content">{c.content}</div>
                    </div>)
                }
            </div>
        </>;
    }
    return (
        <article className="ArticleFull">
            {body}
        </article>
    )
}
