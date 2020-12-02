import React from "react";
import TestRenderer from 'react-test-renderer';
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {ValueChangeEvent} from "./ValueChangeEvent";
import {TextArea} from "./TextArea";

describe('TextArea', () => {
    it("works", () => {
        let onChangeWorks = false;
        const onChange = (e: React.ChangeEvent) => {
            onChangeWorks = true;
        }
        let value = '';
        let onValueChangeEvent: ValueChangeEvent<string> | null = null;
        const onValueChange = (e: ValueChangeEvent<string>) => {
            value = e.value;
            onValueChangeEvent = e;
        }
        const name = 'inputName';
        const element = <TextArea name={name} value={value} onChange={onChange} onValueChange={onValueChange}/>;
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
            .create(<TextArea value='read-only' name='name'/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
