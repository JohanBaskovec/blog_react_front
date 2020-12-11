import React from "react";
import {DefaultApi, GetArticleByIdRequest, UpdateArticleRequest} from "./openapi/apis";
import {of} from "rxjs";
import {mockClass, mockDefaultApi} from "./mockClass";
import {Article} from "./openapi/models";
import {MemoryRouter, Route, RouteComponentProps} from "react-router-dom";
import {ArticleForm} from "./ArticleForm";
import {act} from 'react-test-renderer';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {RandomService} from "./RandomService";
import {Location, History, LocationState} from "history";
import {Session, SessionContext} from "./SessionContext";

describe('ArticleForm', () => {
    it("new article form when user is logged in", async () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());

        const article: Article = {
            id: 'id',
            title: 'title',
            content: 'content',
        }
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            return of(article);
        });
        api.insertArticle = jest.fn(({article}: UpdateArticleRequest) => {
            return of(undefined);
        });
        const randomService = mockClass(RandomService);
        randomService.generateUuid = jest.fn(() => {
            return article.id;
        });
        let testHistory: History<LocationState>;
        let testLocation: Location<LocationState>;
        const session: Session = {
            user: {
                password: "",
                username: "",
            }
        };
        const node = <MemoryRouter initialEntries={['/article/new']}>
            <SessionContext.Provider value={session}>
                <ArticleForm api={api} randomService={randomService} articleId={undefined}/>
                <Route
                    path="*"
                    render={(routeComponentProps: RouteComponentProps<any>) => {
                        testHistory = routeComponentProps.history;
                        testLocation = routeComponentProps.location;
                        return null;
                    }}
                />
            </SessionContext.Provider>
        </MemoryRouter>;


        act(() => {
            render(node);
        });

        const form = await waitFor(() => {
            screen.getByRole("form");
        });
        const titleInput = screen.getByLabelText("Title");
        expect(titleInput).toHaveValue('');
        const contentInput = screen.getByLabelText("Content");
        expect(contentInput).toHaveValue('');

        fireEvent.input(titleInput, {target: {value: article.title}});
        expect(titleInput).toHaveValue(article.title);
        fireEvent.input(contentInput, {target: {value: article.content}});
        expect(contentInput).toHaveValue(article.content);

        const submitButton = screen.getByRole('button', {name: 'Submit'});
        act(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(testLocation!.pathname).toBe(`/article/${article.id}`);
        });
    });
    it("existing article form when user is logged in", async () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
        const article: Article = {
            id: 'id',
            title: 'title',
            content: 'content',
        }
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            return of(article);
        });
        let formSubmitted = false;
        api.updateArticle = jest.fn(({article}: UpdateArticleRequest) => {
            formSubmitted = true;
            return of(undefined);
        })
        const randomService: RandomService = mockClass(RandomService);

        const session: Session = {
            user: {
                password: "",
                username: "",
            }
        };
        act(() => {
            render(<MemoryRouter initialEntries={['/article/3']}>
                <SessionContext.Provider value={session}>
                    <ArticleForm api={api}
                                 randomService={randomService}
                                 articleId={article.id}/>
                </SessionContext.Provider>
            </MemoryRouter>);
        });

        const form = await waitFor(() => {
            screen.getByRole("form");
        });
        const titleInput = screen.getByLabelText("Title");
        expect(titleInput).toHaveValue(article.title);
        const contentInput = screen.getByLabelText("Content");
        expect(contentInput).toHaveValue(article.content);

        const newTitle = 'newTitle';
        fireEvent.input(titleInput, {target: {value: newTitle}});
        expect(titleInput).toHaveValue(newTitle);
        const newContent = 'newContent';
        fireEvent.input(contentInput, {target: {value: newContent}});
        expect(contentInput).toHaveValue(newContent);

        const submitButton = screen.getByRole('button', {name: 'Submit'});
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(formSubmitted).toBeTruthy();
        });
    });
    it("existing article form redirects to article when user is not logged in", async () => {
        const randomService: RandomService = mockClass(RandomService);
        const api: DefaultApi = mockDefaultApi(new DefaultApi());
        const article: Article = {
            id: 'id',
            title: 'title',
            content: 'content',
        }
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            return of(article);
        });

        const session: Session = {};

        let testHistory: History<LocationState>;
        let testLocation: Location<LocationState>;
        const articleId = 'toto';
        act(() => {
            render(<MemoryRouter initialEntries={['/article/3']}>
                <SessionContext.Provider value={session}>
                    <ArticleForm api={api}
                                 randomService={randomService}
                                 articleId={articleId}/>
                    <Route
                        path="*"
                        render={(routeComponentProps: RouteComponentProps<any>) => {
                            testHistory = routeComponentProps.history;
                            testLocation = routeComponentProps.location;
                            return null;
                        }}
                    />
                </SessionContext.Provider>
            </MemoryRouter>);
        });

        await waitFor(() => {
            expect(testLocation!.pathname).toBe(`/article/${articleId}`);
        });
    });
    it("new article form redirects to article when user is not logged in", async () => {
        const randomService: RandomService = mockClass(RandomService);
        const api: DefaultApi = mockDefaultApi(new DefaultApi());

        const session: Session = {};

        let testHistory: History<LocationState>;
        let testLocation: Location<LocationState>;
        act(() => {
            render(<MemoryRouter initialEntries={['/article/3']}>
                <SessionContext.Provider value={session}>
                    <ArticleForm api={api}
                                 randomService={randomService}
                                 />
                    <Route
                        path="*"
                        render={(routeComponentProps: RouteComponentProps<any>) => {
                            testHistory = routeComponentProps.history;
                            testLocation = routeComponentProps.location;
                            return null;
                        }}
                    />
                </SessionContext.Provider>
            </MemoryRouter>);
        });

        await waitFor(() => {
            expect(testLocation!.pathname).toBe(`/`);
        });
    });
});
