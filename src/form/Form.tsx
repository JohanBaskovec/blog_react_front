import React from "react";
import "./Form.scss";

interface FormProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export function Form(props: FormProps): JSX.Element {
    return (<form style={props.style} className="Form">{props.children}</form>)
}
