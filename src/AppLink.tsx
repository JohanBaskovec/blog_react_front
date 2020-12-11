import {Link} from "react-router-dom";
import React from "react";
import "./AppLink.scss";

export type AppLinkColor = "white" | "blue";

interface LinkProps {
    to?: string;
    children?: React.ReactNode;
    color?: AppLinkColor;
    onClick?: () => void;
}

export function AppLink(props: LinkProps): JSX.Element {
    const color = props.color || "blue";

    if (props.to) {
        return (<Link className={`AppLink AppLink--${color}`} to={props.to}>
            {props.children}
        </Link>)
    } else {
        return (<a className={`AppLink AppLink--${color}`} onClick={props.onClick}>
            {props.children}
        </a>)
    }
}
