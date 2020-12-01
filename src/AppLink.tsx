import {Link} from "react-router-dom";
import React from "react";
import "./AppLink.scss";

interface LinkProps {
    to: string;
    children?: React.ReactNode;
}

export function AppLink(props: LinkProps): JSX.Element {
    return (<Link className="AppLink" to={props.to}>
        {props.children}
    </Link>)
}
