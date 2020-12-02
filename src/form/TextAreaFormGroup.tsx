import React from "react";
import "./TextAreaFormGroup.scss";
import {Label} from "./Label";
import {TextArea} from "./TextArea";
import {ValueChangeEventHandler} from "./ValueChangeEvent";

interface TextAreaFormGroupProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    inputName: string;
    inputLabel: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onValueChange?: ValueChangeEventHandler<string>;
}

export function TextAreaFormGroup(props: TextAreaFormGroupProps): JSX.Element {
    return (
        <div className="TextAreaFormGroup"
             style={props.style}>
            <Label inputName={props.inputName}>
                {props.inputLabel}
            </Label>
            <TextArea value={props.value}
                      onValueChange={props.onValueChange}
                      onChange={props.onChange}
                      name={props.inputName}/>
        </div>
    );
}
