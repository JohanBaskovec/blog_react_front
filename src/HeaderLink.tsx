import React from "react";
import {AppLink} from "./AppLink";

interface HeaderLinkProps {
    to?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export function HeaderLink(props: HeaderLinkProps) {
    return <AppLink {...props} color="white" className={props.className}/>
}
