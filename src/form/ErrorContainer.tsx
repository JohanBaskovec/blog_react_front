import React from "react";
import {useField} from "formik";
import "./ErrorContainer.scss";

export interface ErrorContainerProps {
    inputName: string;
    style?: React.CSSProperties;
}

export function ErrorContainer(props: ErrorContainerProps) {
    const [field, meta] = useField(props.inputName);
    return (<>
        {meta.touched && meta.error? (
            <div style={props.style}
                 className="ErrorContainer">{meta.error}</div>
        ) : null}
    </>);
}
