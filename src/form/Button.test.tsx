import React from "react";
import TestRenderer from 'react-test-renderer';
import {FormButton} from "./FormButton";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Formik} from "formik";

describe('Button', () => {
    it("can be clicked", () => {
        let called = false;
        const onClick = () => {
            called = true;
        }
        const element = (
            <Formik initialValues={{}} onSubmit={() => {
            }}>
                <FormButton type="button" onClick={onClick}>Submit</FormButton>
            </Formik>
        );
        render(element);
        expect(screen.getByRole('button', {name: 'Submit'})).not.toBeNull();
        fireEvent.click(screen.getByText('Submit'));
        expect(called).toBe(true);
    });

    it("is rendered properly", () => {
        const onClick = () => {
        }
        const tree = TestRenderer
            .create(
                <Formik initialValues={{}} onSubmit={() => {
                }}>
                    <FormButton type="button" onClick={onClick}>Submit</FormButton>
                </Formik>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
