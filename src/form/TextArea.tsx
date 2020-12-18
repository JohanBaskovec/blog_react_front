import React from "react";
import "./TextArea.scss";
import {FieldHelperProps, FieldInputProps, FieldMetaProps, useField} from "formik";

export interface TextAreaProps {
    style?: React.CSSProperties;
    name: string;
}

export function TextArea(props: TextAreaProps) {
    const [field]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props.name);
    // noinspection CheckTagEmptyBody
    return <textarea id={props.name}
                     className="TextArea"
                     {...field}
                     style={props.style}></textarea>
}
