import React from "react";
import "./Label.scss";

interface LabelProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    inputName: string;
}

export function Label(props: LabelProps): JSX.Element {
    return (<label className="Label" style={props.style} htmlFor={props.inputName}>
        {props.children}
    </label>)
}
