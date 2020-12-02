import React from "react";
import TestRenderer from 'react-test-renderer';
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Input} from "./Input";
import {ValueChangeEvent} from "./ValueChangeEvent";

describe('Input', () => {
    it("works", () => {
        let onChangeWorks = false;
        const onChange = (e: React.ChangeEvent) => {
            onChangeWorks = true;
        }
        let value = '';
        let onValueChangeEvent: ValueChangeEvent<string> | null = null;
        const onValueChange = (e: ValueChangeEvent<string>) => {
            value = e.newValue;
            onValueChangeEvent = e;
        }
        const name = 'inputName';
        const element = <Input name={name} value={value} onChange={onChange} onValueChange={onValueChange}/>;
        render(element);
        const input: HTMLElement = screen.getByRole('textbox');
        const text = 'test';
        fireEvent.input(input, {target: {value: text}});

        expect(onChangeWorks).toBe(true);
        expect(value).toBe(text);
        expect(onValueChangeEvent).not.toBeNull();
        expect(onValueChangeEvent!.name).toBe(name);
    });
    it("is rendered properly", () => {
        const tree = TestRenderer
            .create(<Input value='read-only' name='name'/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
