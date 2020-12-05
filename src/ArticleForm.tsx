import {DefaultApi} from "./openapi/apis";
import React, {FormEvent, useEffect, useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import "./ArticleForm.scss";
import {Form} from "./form/Form";
import {InputFormGroup} from "./form/InputFormGroup";
import {TextAreaFormGroup} from "./form/TextAreaFormGroup";
import {Article} from "./openapi/models";
import {ApiError} from "./ApiError";
import {ValueChangeEvent} from "./form/ValueChangeEvent";
import {Button} from "./form/Button";
import {FormButtonsContainer} from "./form/FormButtonsContainer";
import {AppLink} from "./AppLink";
import {RandomService} from "./RandomService";

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

    useEffect(() => {
        if (type === FormType.edition) {
            api.getArticleById({id: articleId}).subscribe((article) => {
                    setArticle(article);
                },
                (error) => {
                    setError(ApiError.fromError(error));
                });
        } else {
            setArticle({
                content: '',
                title: '',
                id: randomService.generateUuid(),
            });
        }
    }, [])

    if (article == null) {
        return (<div>Loading...</div>);
    }

    const handleChange = (e: ValueChangeEvent<string>) => {
        setArticle({...article, [e.name]: e.value});
    }

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (type === FormType.edition) {
            api.updateArticle({article}).subscribe(() => {
            });
        } else {
            api.insertArticle({article}).subscribe(() => {
                setPersisted(true);
            });
        }
    }
    if (persisted) {
        return <Redirect to={`/article/${article.id}`}/>
    }

    return (
        <div className="ArticleForm">
            <div className="ArticleForm__buttons-container">
                <AppLink to={type === FormType.edition ? `/article/${article.id}` : `/`}>
                    Retour
                </AppLink>
            </div>
            <Form name="article-form">
                <InputFormGroup inputName={'title'}
                                inputLabel={'Title'}
                                onValueChange={handleChange}
                                value={article.title}
                                style={{marginBottom: "1rem"}}>
                </InputFormGroup>
                <TextAreaFormGroup value={article.content}
                                   onValueChange={handleChange}
                                   inputName="content"
                                   style={{marginBottom: "1rem"}}
                                   inputLabel="Content">
                </TextAreaFormGroup>
                <FormButtonsContainer>
                    <Button onClick={submit}>Submit</Button>
                </FormButtonsContainer>
            </Form>
        </div>);
}
