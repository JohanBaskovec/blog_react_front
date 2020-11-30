import {DefaultApi} from "./openapi/apis";
import React from "react";
import {useParams} from "react-router-dom";

interface ArticleFormParams {
    id: string;
}

interface ArticleFormProps {
    api: DefaultApi;
}

export function ArticleForm({api}: ArticleFormProps) {
    const {id}: ArticleFormParams = useParams<ArticleFormParams>();
    return (<div>
        <form>
            <label htmlFor="title">Title</label>
            <input id="title"/>
            <label htmlFor="content">Content</label>
            <textarea id="content"></textarea>
        </form>
    </div>);
}
