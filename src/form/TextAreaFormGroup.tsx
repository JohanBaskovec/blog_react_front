import React from "react";
import "./TextAreaFormGroup.scss";
import {Label} from "./Label";
import {TextArea} from "./TextArea";
import {ErrorContainer} from "./ErrorContainer";

interface TextAreaFormGroupProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    inputName: string;
    inputLabel: string;
}

export function TextAreaFormGroup(props: TextAreaFormGroupProps): JSX.Element {
    return (
        <div className="TextAreaFormGroup"
             style={props.style}>
            <Label inputName={props.inputName}>
                {props.inputLabel}
            </Label>
            <TextArea name={props.inputName}/>
            <ErrorContainer style={{margin: "0.5rem 0"}}
                            inputName={props.inputName} />
        </div>
    );
}
