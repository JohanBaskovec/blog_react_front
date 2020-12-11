// tslint:disable
/**
 * Blog
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * Contact: johan@johanbaskovec.fr
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Observable } from 'rxjs';
import { BaseAPI, HttpHeaders, throwIfNullOrUndefined, encodeURI } from '../runtime';
import {
    Article,
    LoginForm,
    RegistrationForm,
    User,
} from '../models';

export interface GetArticleByIdRequest {
    id: string;
}

export interface InsertArticleRequest {
    article: Article;
}

export interface LoginRequest {
    loginForm: LoginForm;
}

export interface RegisterRequest {
    registrationForm: RegistrationForm;
}

export interface UpdateArticleRequest {
    article: Article;
}

/**
 * no description
 */
export class DefaultApi extends BaseAPI {

    /**
     * Get all the articles
     */
    getAllArticles = (): Observable<Array<Article>> => {
        return this.request<Array<Article>>({
            path: '/article',
            method: 'GET',
        });
    };

    /**
     * Get an article
     */
    getArticleById = ({ id }: GetArticleByIdRequest): Observable<Article> => {
        throwIfNullOrUndefined(id, 'getArticleById');

        return this.request<Article>({
            path: '/article/{id}'.replace('{id}', encodeURI(id)),
            method: 'GET',
        });
    };

    /**
     * Get the current session
     */
    getCurrentAuthenticatedUser = (): Observable<User> => {
        const headers: HttpHeaders = {
        };

        return this.request<User>({
            path: '/me',
            method: 'GET',
            headers,
        });
    };

    /**
     * Insert an article
     */
    insertArticle = ({ article }: InsertArticleRequest): Observable<void> => {
        throwIfNullOrUndefined(article, 'insertArticle');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            path: '/article',
            method: 'POST',
            headers,
            body: article,
        });
    };

    /**
     * Create a new HTTP session
     */
    login = ({ loginForm }: LoginRequest): Observable<User> => {
        throwIfNullOrUndefined(loginForm, 'login');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<User>({
            path: '/login',
            method: 'POST',
            headers,
            body: loginForm,
        });
    };

    /**
     * Logout
     */
    logout = (): Observable<void> => {
        const headers: HttpHeaders = {
        };

        return this.request<void>({
            path: '/logout',
            method: 'POST',
            headers,
        });
    };

    /**
     * Register
     */
    register = ({ registrationForm }: RegisterRequest): Observable<void> => {
        throwIfNullOrUndefined(registrationForm, 'register');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            path: '/register',
            method: 'POST',
            headers,
            body: registrationForm,
        });
    };

    /**
     * Update an article
     */
    updateArticle = ({ article }: UpdateArticleRequest): Observable<void> => {
        throwIfNullOrUndefined(article, 'updateArticle');

        const headers: HttpHeaders = {
            'Content-Type': 'application/json',
        };

        return this.request<void>({
            path: '/article',
            method: 'PUT',
            headers,
            body: article,
        });
    };

}
