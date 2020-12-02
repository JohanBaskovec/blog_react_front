import React from "react";
import TestRenderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect'
import {Label} from "./Label";

describe('Label', () => {
    it("is rendered properly", () => {
        const onClick = () => {
        }
        const tree = TestRenderer
            .create(<Label inputName="inputName">Hello</Label>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
