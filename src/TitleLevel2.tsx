import "./TitleLevel2.scss";
import React from "react";

interface TitleLevel2Props {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export function TitleLevel2(props: TitleLevel2Props) {
    return <h2 className="TitleLevel2" style={props.style}>{props.children}</h2>
}
