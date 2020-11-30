import React from "react";
import {DefaultApi, GetArticleByIdRequest} from "./openapi/apis";
import {of, throwError} from "rxjs";
import {mockClass} from "./mockClass";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {Article} from "./openapi/models";
import {AjaxError} from "rxjs/ajax";
import {ArticleFull} from "./ArticleFull";
import {MemoryRouter} from "react-router-dom";

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

describe('ArticleFull', () => {
    it("renders the article when it exists", () => {
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
                    <ArticleFull api={api}/>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
    it("renders a 'not found' error when the article doesn't exist", () => {
        const api: DefaultApi = mockClass(new DefaultApi());
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            return throwError({
                status: 404,
            } as AjaxError);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/article/3']}>
                    <ArticleFull api={api}/>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
    it("renders a 'error' message when an error happen during load", () => {
        const api: DefaultApi = mockClass(new DefaultApi());
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            return throwError({
                status: 500,
            } as AjaxError);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/article/3']}>
                    <ArticleFull api={api}/>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
});
