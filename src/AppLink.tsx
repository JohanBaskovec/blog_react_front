import {Link} from "react-router-dom";
import React from "react";
import "./AppLink.scss";

export type AppLinkColor = "white" | "blue";

interface LinkProps {
    to: string;
    children?: React.ReactNode;
    color?: AppLinkColor;
}

export function AppLink(props: LinkProps): JSX.Element {
    const color = props.color || "blue";

    return (<Link className={`AppLink AppLink--${color}`}
                  to={props.to}>
        {props.children}
    </Link>)
}
