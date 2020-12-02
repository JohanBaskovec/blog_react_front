import {DefaultApi} from "./openapi/apis";
import React, {FormEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./ArticleForm.scss";
import {Form} from "./form/Form";
import {InputFormGroup} from "./form/InputFormGroup";
import {TextAreaFormGroup} from "./form/TextAreaFormGroup";
import {Article} from "./openapi/models";
import {ApiError} from "./ApiError";
import {ValueChangeEvent} from "./form/ValueChangeEvent";
import {Button} from "./form/Button";
import {FormButtonsContainer} from "./form/FormButtonsContainer";

interface ArticleFormParams {
    id: string;
}

interface ArticleFormProps {
    api: DefaultApi;
}

export function ArticleForm({api}: ArticleFormProps) {
    const {id}: ArticleFormParams = useParams<ArticleFormParams>();
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

    if (article == null) {
        return (<div>Loading...</div>);
    }

    const handleChange = (e: ValueChangeEvent<string>) => {
        setArticle({...article, [e.name]: e.value});
    }

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        api.updateArticle({article}).subscribe(() => {

        });
    }
    return (
        <div className="ArticleForm">
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
