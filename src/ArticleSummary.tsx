import {Article} from "./openapi/models";
import React from "react";

export function ArticleSummary(props: { article: Article }) {
    return (<div>
        <div>{props.article.title}</div>
        <div>{props.article.content}</div>
    </div>);
}
