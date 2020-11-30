import React from "react";
import {DefaultApi} from "./openapi/apis";
import {of} from "rxjs";
import {mockClass} from "./mockClass";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import pretty from "pretty";
import {ArticleList} from "./ArticleList";
import {Article} from "./openapi/models";

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
    it("renders the article list when there are no articles", () => {
        const api: DefaultApi = mockClass(new DefaultApi());
        api.getAllArticles = jest.fn(() => {
            const articles: Array<Article> = [];
            return of(articles);
        });
        act(() => {
            render(<ArticleList api={api}/>, container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it("renders the article list when there is 1 article", () => {
        const api: DefaultApi = mockClass(new DefaultApi());
        api.getAllArticles = jest.fn(() => {
            const articles: Array<Article> = [
                {
                    id: "id",
                    title: "title",
                    content: "content",
                },
            ];
            return of(articles);
        });
        act(() => {
            render(<ArticleList api={api}/>, container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it("renders the article list when there are 3 articles", () => {
        const api: DefaultApi = mockClass(new DefaultApi());
        api.getAllArticles = jest.fn(() => {
            const articles: Array<Article> = [
                {
                    id: "id0",
                    title: "title0",
                    content: "content0",
                },
                {
                    id: "id1",
                    title: "title1",
                    content: "content1",
                },
                {
                    id: "id2",
                    title: "title2",
                    content: "content2",
                },
            ];
            return of(articles);
        });
        act(() => {
            render(<ArticleList api={api}/>, container);
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });
});
