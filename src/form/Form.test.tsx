import React from "react";
import TestRenderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect'
import {Form} from "./Form";

describe('Form', () => {
    it("is rendered properly", () => {
        const tree = TestRenderer
            .create(<Form style={{width: '100%'}}>children</Form>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
