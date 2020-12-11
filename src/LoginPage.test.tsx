import React from "react";
import {DefaultApi, LoginRequest} from "./openapi/apis";
import {of} from "rxjs";
import {mockDefaultApi} from "./mockClass";
import {User} from "./openapi/models";
import {MemoryRouter, Route, RouteComponentProps} from "react-router-dom";
import {act} from 'react-test-renderer';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {History, Location, LocationState} from "history";
import {LoginPage} from "./LoginPage";
import {Session} from "./SessionContext";

describe('LoginPage', () => {
    it("successful login", async () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());

        const user: User = {
            username: 'username',
            password: 'password'
        }
        api.login = jest.fn(({loginForm}: LoginRequest) => {
            return of(user);
        });
        let testHistory: History<LocationState>;
        let testLocation: Location<LocationState>;
        let session: Session = {};
        const setSession = (newSession: Session) => {
            session = newSession;
        };
        const node = <MemoryRouter initialEntries={['/login']}>
            <LoginPage api={api} setSession={setSession}/>
            <Route
                path="*"
                render={(routeComponentProps: RouteComponentProps<any>) => {
                    testHistory = routeComponentProps.history;
                    testLocation = routeComponentProps.location;
                    return null;
                }}
            />
        </MemoryRouter>;

        act(() => {
            render(node);
        });

        const form = await waitFor(() => {
            screen.getByRole("form");
        });
        const usernameInput = screen.getByLabelText("Username");
        expect(usernameInput).toHaveValue('');
        const passwordInput = screen.getByLabelText("Password");
        expect(passwordInput).toHaveValue('');

        fireEvent.input(usernameInput, {target: {value: user.username}});
        expect(usernameInput).toHaveValue(user.username);
        fireEvent.input(passwordInput, {target: {value: user.password}});
        expect(passwordInput).toHaveValue(user.password);

        const submitButton = screen.getByRole('button', {name: 'Submit'});
        act(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(session.user).toBe(user);
        });
    });

});
