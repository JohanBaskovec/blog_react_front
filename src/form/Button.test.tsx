import React from "react";
import TestRenderer from 'react-test-renderer';
import {Button} from "./Button";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Button', () => {
    it("can be clicked", () => {
        let called = false;
        const onClick = () => {
            called = true;
        }
        const element = <Button onClick={onClick}>Submit</Button>;
        render(element);
        expect(screen.getByRole('button', {name: 'Submit'})).not.toBeNull();
        fireEvent.click(screen.getByText('Submit'));
        expect(called).toBe(true);
    });

    it("is rendered properly", () => {
        const onClick = () => {
        }
        const tree = TestRenderer
            .create(<Button onClick={onClick}>Submit</Button>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
