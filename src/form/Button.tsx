import React from "react";
import "./Button.scss";

export interface ButtonProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button(props: ButtonProps) {
    return (
        <button type="button"
                className="Button"
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}
