import React from "react";
import {DefaultApi, GetArticleByIdRequest} from "./openapi/apis";
import {of, throwError} from "rxjs";
import {mockDefaultApi} from "./mockClass";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {Article} from "./openapi/models";
import {AjaxError} from "rxjs/ajax";
import {ArticleFull} from "./ArticleFull";
import {MemoryRouter} from "react-router-dom";
import {Session, SessionContext} from "./SessionContext";

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
    it("renders the article when it exists and user is logged in", () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            const article: Article = {
                id: id,
                title: 'title',
                content: 'content',
                creationTime: 0,
                author: {
                    username: 'username',
                    version: 0,
                },
                version: 0,
            }
            return of(article);
        });
        const session: Session = {
            user: {
                password: "",
                username: "",
                version: 0,
            }
        };
        act(() => {
            render(
                <MemoryRouter initialEntries={['/article/3']}>
                    <SessionContext.Provider value={session}>
                        <ArticleFull api={api}/>
                    </SessionContext.Provider>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
    it("renders the article when it exists and user is not logged in", () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            const article: Article = {
                id: id,
                title: 'title',
                content: 'content',
                creationTime: 0,
                author: {
                    username: 'username',
                    version: 0,
                },
                version: 0,
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
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
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
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
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
