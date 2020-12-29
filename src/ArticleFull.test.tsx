import React from "react";
import {DefaultApi, GetAllCommentsOfArticleRequest, GetArticleByIdRequest} from "./openapi/apis";
import {of, throwError} from "rxjs";
import {mockClass, mockDefaultApi} from "./mockClass";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {Article} from "./openapi/models";
import {AjaxError} from "rxjs/ajax";
import {ArticleFull} from "./ArticleFull";
import {MemoryRouter} from "react-router-dom";
import {Session, SessionContext} from "./SessionContext";
import {RandomService} from "./RandomService";

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
    const randomService = mockClass(RandomService);
    randomService.generateUuid = jest.fn(() => {
        return 'mock-uuid';
    });
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
        api.getAllCommentsOfArticle = jest.fn(({articleId: string}: GetAllCommentsOfArticleRequest) => {
            return of([]);
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
                        <ArticleFull api={api} randomService={randomService}/>
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
        api.getAllCommentsOfArticle = jest.fn(({articleId: string}: GetAllCommentsOfArticleRequest) => {
            return of([]);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/article/3']}>
                    <ArticleFull api={api} randomService={randomService}/>
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
        api.getAllCommentsOfArticle = jest.fn(({articleId: string}: GetAllCommentsOfArticleRequest) => {
            return of([]);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/article/3']}>
                    <ArticleFull api={api} randomService={randomService}/>
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
        api.getAllCommentsOfArticle = jest.fn(({articleId: string}: GetAllCommentsOfArticleRequest) => {
            return of([]);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/article/3']}>
                    <ArticleFull api={api} randomService={randomService}/>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
});
