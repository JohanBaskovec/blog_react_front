import {Link} from "react-router-dom";
import React from "react";
import "./AppLink.scss";

export type AppLinkColor = "white" | "blue";

interface LinkProps {
    to?: string;
    children?: React.ReactNode;
    color?: AppLinkColor;
    onClick?: () => void;
    className?: string;
}

export function AppLink(props: LinkProps): JSX.Element {
    const color = props.color || "blue";

    if (props.to) {
        return (<Link className={`AppLink AppLink--${color} ${props.className}`} to={props.to}>
            {props.children}
        </Link>);
    } else {
        return (<a className={`AppLink AppLink--${color} ${props.className}`}
                   role="button"
                   tabIndex={0}
                   onClick={props.onClick}>
            {props.children}
        </a>);
    }
}
