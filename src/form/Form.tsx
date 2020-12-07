import React from "react";
import "./Form.scss";
import * as Formik from "formik";

interface FormProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    name?: string;
}

export function Form(props: FormProps): JSX.Element {
    return (<Formik.Form name={props.name}
                         style={props.style}
                         className="Form">{props.children}</Formik.Form>)
}
