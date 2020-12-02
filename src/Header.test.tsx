import React from "react";
import TestRenderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect'
import {Header} from "./Header";
import { MemoryRouter } from "react-router-dom";

describe('Header', () => {
    it("is rendered properly", () => {
        // noinspection CheckTagEmptyBody
        const tree = TestRenderer
            .create(
                <MemoryRouter>
                    <Header contentWidth="79%" style={{height: "4px"}}></Header>
                </MemoryRouter>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
