import React from "react";
import "./InputFormGroup.scss";
import {Label} from "./Label";
import {Input} from "./Input";
import {FieldHelperProps, FieldInputProps, FieldMetaProps, useField} from "formik";
import {ErrorContainer} from "./ErrorContainer";

interface InputFormGroupProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    inputName: string;
    inputLabel: string;
}

export function InputFormGroup(props: InputFormGroupProps): JSX.Element {
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props.inputName);
    return (
        <div className="InputFormGroup"
             style={props.style}>
            <Label inputName={props.inputName}>{props.inputLabel}</Label>
            <Input name={props.inputName}/>
            <ErrorContainer style={{margin: "0.5rem 0"}}
                            inputName={props.inputName} />
        </div>
    );
}
