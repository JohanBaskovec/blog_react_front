import React from "react";
import {DefaultApi} from "./openapi/apis";
import {of} from "rxjs";
import {mockDefaultApi} from "./mockClass";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {ArticleList} from "./ArticleList";
import {Article} from "./openapi/models";
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

describe('ArticleList', () => {
    it("renders the article list when there are no articles and user is logged in", () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
        const session: Session = mockLoggedInSession();
        api.getAllArticles = jest.fn(() => {
            const articles: Array<Article> = [];
            return of(articles);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/']}>
                    <SessionContext.Provider value={session}>
                        <ArticleList api={api}/>
                    </SessionContext.Provider>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it("renders the article list when there is 1 article and user is logged in", () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
        const session: Session = mockLoggedInSession();
        api.getAllArticles = jest.fn(() => {
            const articles: Array<Article> = [
                {
                    id: "id",
                    title: "title",
                    content: "content",
                    author: {
                        username: 'username',
                    },
                    version: 0,
                },
            ];
            return of(articles);
        });
        act(() => {
            render(
                <MemoryRouter initialEntries={['/']}>
                    <SessionContext.Provider value={session}>
                        <ArticleList api={api}/>
                    </SessionContext.Provider>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it("renders the article list when there are 3 articles and user in logged in", () => {
        const api: DefaultApi = mockApiWith3Articles();
        const session: Session = mockLoggedInSession();
        act(() => {
            render(
                <MemoryRouter initialEntries={['/']}>
                    <SessionContext.Provider value={session}>
                        <ArticleList api={api}/>
                    </SessionContext.Provider>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it("renders the article list when there are 3 articles and user in logged out", () => {
        const api = mockApiWith3Articles();
        act(() => {
            render(
                <MemoryRouter initialEntries={['/']}>
                    <ArticleList api={api}/>
                </MemoryRouter>
                , container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    function mockApiWith3Articles() {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
        api.getAllArticles = jest.fn(() => {
            const articles: Array<Article> = [
                {
                    id: "id0",
                    title: "title0",
                    content: "content0",
                    author: {
                        username: 'username',
                    },
                    version: 0,
                },
                {
                    id: "id1",
                    title: "title1",
                    content: "content1",
                    author: {
                        username: 'username',
                    },
                    version: 0,
                },
                {
                    id: "id2",
                    title: "title2",
                    content: "content2",
                    author: {
                        username: 'username',
                    },
                    version: 0,
                },
            ];
            return of(articles);
        });
        return api;
    }

    function mockLoggedInSession(): Session {
        return {
            user: {
                password: "",
                username: "",
            }
        };
    }
});
