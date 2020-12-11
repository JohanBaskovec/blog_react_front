import {DefaultApi} from "./openapi/apis";
import React, {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import "./ArticleForm.scss";
import {Form} from "./form/Form";
import {InputFormGroup} from "./form/InputFormGroup";
import {TextAreaFormGroup} from "./form/TextAreaFormGroup";
import {Article} from "./openapi/models";
import {ApiError} from "./ApiError";
import {FormButton} from "./form/FormButton";
import {FormButtonsContainer} from "./form/FormButtonsContainer";
import {AppLink} from "./AppLink";
import {RandomService} from "./RandomService";
import {Formik, FormikHelpers} from "formik";
import * as Yup from 'yup';
import {SessionContext} from "./SessionContext";

export enum FormType {
    edition,
    creation,
}

export enum EditionFormState {
    edition,
    submitted,
}

interface ArticleFormProps {
    api: DefaultApi;
    randomService: RandomService;
    articleId?: string;
}

export function ArticleForm({api, randomService, articleId}: ArticleFormProps) {
    let type = FormType.edition;
    if (articleId == null) {
        type = FormType.creation;
    }
    const [article, setArticle] = useState<Article | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [persisted, setPersisted] = useState(false);
    const session = useContext(SessionContext);

    useEffect(() => {
        if (type === FormType.edition) {
            let subscription = api.getArticleById({id: articleId!}).subscribe((article) => {
                    setArticle(article);
                },
                (error) => {
                    setError(ApiError.fromError(error));
                });
            // we must cancel the request otherwise React will complain
            // about executing an update on an unmounted component
            // (which could be a memory leak)
            return () => {
                subscription.unsubscribe();
            }
        } else {
            setArticle({
                content: '',
                title: '',
                id: randomService.generateUuid(),
            });
        }
    }, [])

    if (session.user == null) {
        if (articleId) {
            return <Redirect to={`/article/${articleId}`}/>
        } else {
            return <Redirect to={`/`}/>
        }
    }

    if (article == null) {
        return (<div>Loading...</div>);
    }

    if (type === FormType.creation && persisted) {
        return <Redirect to={`/article/${article.id}`}/>
    }

    return (
        <div className="ArticleForm">
            <div className="ArticleForm__buttons-container">
                <AppLink to={type === FormType.edition ? `/article/${article.id}` : `/`}>
                    Retour
                </AppLink>
            </div>
            <Formik initialValues={article}
                    validationSchema={Yup.object({
                        title: Yup.string().required('Required'),
                        content: Yup.string().required('Required')
                    })}
                    onSubmit={(article: Article, {setSubmitting}: FormikHelpers<Article>) => {
                        setPersisted(false);
                        if (type === FormType.edition) {
                            api.updateArticle({article}).subscribe(() => {
                                    setSubmitting(false);
                                    setPersisted(true);
                                },
                                () => {
                                    setSubmitting(false);
                                });
                        } else {
                            api.insertArticle({article}).subscribe(() => {
                                    setSubmitting(false);
                                    setPersisted(true);
                                },
                                () => {
                                    setSubmitting(false);
                                });
                        }
                    }
                    }>
                <Form name="article-form">
                    <InputFormGroup inputName={'title'}
                                    inputLabel={'Title'}
                                    style={{marginBottom: "1rem"}}>
                    </InputFormGroup>
                    <TextAreaFormGroup inputName="content"
                                       style={{marginBottom: "1rem"}}
                                       inputLabel="Content">
                    </TextAreaFormGroup>
                    <FormButtonsContainer>
                        {persisted ? (<div className="saved-indicator">Saved</div>) : null}
                        <FormButton type="submit">Submit</FormButton>
                    </FormButtonsContainer>
                </Form>
            </Formik>
        </div>);
}
