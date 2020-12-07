import React, {useState} from "react";
import "./Input.scss";
import {ValueChangeEvent, ValueChangeEventHandler} from "./ValueChangeEvent";
import {FieldHelperProps, FieldInputProps, FieldMetaProps, useField} from "formik";

export interface InputProps {
    style?: React.CSSProperties;
    name: string;
}

export function Input(props: InputProps): JSX.Element {
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props.name);
    const [dirty, setDirty] = useState(false);
    return (<input {...field}
                   id={props.name}
                   style={props.style}
                   className="Input"/>);
}
