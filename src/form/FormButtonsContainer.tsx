import "./FormButtonsContainer.scss";
import React from "react";

export interface FormButtonsContainerProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export function FormButtonsContainer(props: FormButtonsContainerProps) {
    return (
        <div style={props.style}
             className="FormButtonsContainer">
            {props.children}
        </div>
    )
}
