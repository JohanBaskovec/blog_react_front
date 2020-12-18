import React from "react";
import {DefaultApi, LoginRequest, RegisterRequest} from "./openapi/apis";
import {of} from "rxjs";
import {mockDefaultApi} from "./mockClass";
import {User} from "./openapi/models";
import {MemoryRouter, Route, RouteComponentProps} from "react-router-dom";
import {act} from 'react-test-renderer';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {History, Location, LocationState} from "history";
import {RegistrationPage} from "./RegistrationPage";
import {Session} from "./SessionContext";

describe('RegistrationPage', () => {
    it("successful registration", async () => {
        const api: DefaultApi = mockDefaultApi(new DefaultApi());

        api.register = jest.fn(({registrationForm}: RegisterRequest) => {
            return of();
        });
        let testHistory: History<LocationState>;
        let testLocation: Location<LocationState>;
        let session: Session = {};
        const setSession = (newSession: Session) => {
            session = newSession;
        };
        const node = <MemoryRouter initialEntries={['/login']}>
            <RegistrationPage api={api} />
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
        const passwordInput = screen.getByLabelText("Password");

        fireEvent.input(usernameInput, {target: {value: 'username'}});
        fireEvent.input(passwordInput, {target: {value: 'password'}});

        const submitButton = screen.getByRole('button', {name: 'Submit'});
        act(() => {
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(testLocation.pathname).toBe('/login');
        });
    });

});
