import {DefaultApi} from "./openapi/apis";
import React, {useState} from "react";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {RegistrationForm} from "./openapi/models";
import {Form} from "./form/Form";
import {InputFormGroup} from "./form/InputFormGroup";
import {FormButtonsContainer} from "./form/FormButtonsContainer";
import {FormButton} from "./form/FormButton";
import {Redirect} from "react-router-dom";
import {ApiError} from "./ApiError";
import "./RegistrationPage.scss";

interface RegistrationPageProps {
    api: DefaultApi;
}

export function RegistrationPage(props: RegistrationPageProps) {
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    if (registered) {
        return <Redirect to="/login"/>;
    }
    return (
        <div className="RegistrationPage">
            {error != null ? <div>Error</div> : null}
            <Formik initialValues={{
                username: '',
                password: '',
            } as RegistrationForm}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Required'),
                        password: Yup.string().required('Required')
                    })}
                    onSubmit={(registrationForm: RegistrationForm, {setSubmitting}: FormikHelpers<RegistrationForm>) => {
                        props.api.register({registrationForm}).subscribe(() => {
                                setSubmitting(false);
                                setRegistered(true);
                            }, (err) => {
                                const apiError = ApiError.fromError(err);
                                setError(apiError);
                                setSubmitting(false);
                            },
                            () => {
                            });
                    }
                    }>
                <Form name="article-form">
                    <InputFormGroup inputName={'username'}
                                    inputLabel={'Username'}
                                    style={{marginBottom: "1rem"}}>
                    </InputFormGroup>
                    <InputFormGroup inputName="password"
                                    style={{marginBottom: "1rem"}}
                                    inputLabel="Password">
                    </InputFormGroup>
                    <FormButtonsContainer>
                        <FormButton type="submit">Submit</FormButton>
                    </FormButtonsContainer>
                </Form>
            </Formik>
        </div>);
}
