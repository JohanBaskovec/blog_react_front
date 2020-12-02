import React from "react";
import {DefaultApi, GetArticleByIdRequest} from "./openapi/apis";
import {of} from "rxjs";
import {mockClass} from "./mockClass";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {Article} from "./openapi/models";
import {MemoryRouter} from "react-router-dom";
import {ArticleForm} from "./ArticleForm";

let container: HTMLDivElement;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    if (container != null) {
        unmountComponentAtNode(container);
        container.remove();
    }
});

describe('ArticleForm', () => {
    it("renders the article form when it exists", () => {
        const api: DefaultApi = mockClass(new DefaultApi());
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            const article: Article = {
                id: id,
                title: 'title',
                content: 'content',
            }
            return of(article);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/article/3']}>
                    <ArticleForm api={api}/>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
});
