import React from "react";
import {DefaultApi, GetArticleByIdRequest, UpdateArticleRequest} from "./openapi/apis";
import {of} from "rxjs";
import {mockClass} from "./mockClass";
import {Article} from "./openapi/models";
import {MemoryRouter} from "react-router-dom";
import {ArticleForm} from "./ArticleForm";
import {act} from 'react-test-renderer';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('ArticleForm', () => {
    it("renders the article form when it exists", async () => {
        const api: DefaultApi = mockClass(new DefaultApi());
        const article: Article = {
            id: 'id',
            title: 'title',
            content: 'content',
        }
        api.getArticleById = jest.fn(({id}: GetArticleByIdRequest) => {
            return of(article);
        });
        let formSubmitted = false;
        api.updateArticle = jest.fn(({ article }: UpdateArticleRequest) => {
            formSubmitted = true;
            return of();
        })
        const node =
            <MemoryRouter initialEntries={['/article/3']}>
                <ArticleForm api={api}/>
            </MemoryRouter>;

        act(() => {
            render(node);
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
        expect(formSubmitted).toBeTruthy();
    });
});
