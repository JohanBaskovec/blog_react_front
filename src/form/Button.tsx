import React from "react";
import "./Button.scss";

export interface ButtonProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: 'submit' | 'button';
}

export function Button(props: ButtonProps) {
    return (
        <button type={props.type}
                className="Button"
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}
