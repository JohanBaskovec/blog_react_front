import React from "react";
import "./TextArea.scss";
import {ValueChangeEvent, ValueChangeEventHandler} from "./ValueChangeEvent";

export interface TextAreaProps {
    style?: React.CSSProperties;
    name: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onValueChange?: ValueChangeEventHandler<string>;
}

export function TextArea(props: TextAreaProps) {
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onValueChange) {
            props.onValueChange(new ValueChangeEvent<string>(props.name, event.target.value));
        }
        if (props.onChange) {
            props.onChange(event);
        }
    };
    // noinspection CheckTagEmptyBody
    return <textarea id={props.name}
                     onChange={onChange}
                     className="TextArea"
                     value={props.value}
                     style={props.style}></textarea>
}
