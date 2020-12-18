import React from "react";
import "./Input.scss";
import {FieldHelperProps, FieldInputProps, FieldMetaProps, useField} from "formik";

export interface InputProps {
    style?: React.CSSProperties;
    name: string;
}

export function Input(props: InputProps): JSX.Element {
    const [field]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props.name);
    return (<input {...field}
                   id={props.name}
                   style={props.style}
                   className="Input"/>);
}
