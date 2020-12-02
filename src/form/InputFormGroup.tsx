import React from "react";
import "./InputFormGroup.scss";
import {Label} from "./Label";
import {Input} from "./Input";
import {ValueChangeEventHandler} from "./ValueChangeEvent";

interface InputFormGroupProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    inputName: string;
    inputLabel: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onValueChange?: ValueChangeEventHandler<string>;
}

export function InputFormGroup(props: InputFormGroupProps): JSX.Element {
    return (
        <div className="InputFormGroup"
             style={props.style}>
            <Label inputName={props.inputName}>{props.inputLabel}</Label>
            <Input value={props.value}
                   onValueChange={props.onValueChange}
                   onChange={props.onChange}
                   name={props.inputName}/>
        </div>
    );
}
