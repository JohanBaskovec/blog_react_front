import React from "react";
import TestRenderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect'
import {InputFormGroup} from "./InputFormGroup";

describe('InputFormGroup', () => {
    it("is rendered properly", () => {
        const tree = TestRenderer
            .create(<InputFormGroup style={{width: '100%'}}
                                    value='read-only'
                                    inputLabel='input label'
                                    inputName='input-name'>children</InputFormGroup>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
