import React from "react";
import "./Button.scss";
import {useFormikContext} from "formik";

export interface ButtonProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type: 'submit' | 'button';
}

export function FormButton(props: ButtonProps) {
    const formikContext = useFormikContext();
    return (
        <button type={props.type}
                disabled={formikContext.isSubmitting}
                className={`Button ${formikContext.isSubmitting ? 'Button--disabled' : ''}`}
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}
