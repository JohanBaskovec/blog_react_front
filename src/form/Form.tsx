import React from "react";
import "./Form.scss";

interface FormProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    name?: string;
}

export function Form(props: FormProps): JSX.Element {
    return (<form name={props.name} style={props.style} className="Form">{props.children}</form>)
}
