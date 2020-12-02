import React from "react";
import "./Input.scss";
import {ValueChangeEvent, ValueChangeEventHandler} from "./ValueChangeEvent";

export interface InputProps {
    onValueChange?: ValueChangeEventHandler<string>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    style?: React.CSSProperties;
    name: string;
    value: string;
}

export function Input(props: InputProps): JSX.Element {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onValueChange) {
            props.onValueChange(new ValueChangeEvent<string>(props.name, event.target.value));
        }
        if (props.onChange) {
            props.onChange(event);
        }
    };
    return (<input name={props.name}
                   value={props.value}
                   onChange={onChange}
                   id={props.name}
                   style={props.style}
                   className="Input"/>);
}
