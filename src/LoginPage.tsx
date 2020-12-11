import {DefaultApi} from "./openapi/apis";
import React, {Dispatch, SetStateAction, useContext} from "react";
import {Session, SessionContext} from "./SessionContext";
import {Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {LoginForm, User} from "./openapi/models";
import {Form} from "./form/Form";
import {InputFormGroup} from "./form/InputFormGroup";
import {FormButtonsContainer} from "./form/FormButtonsContainer";
import {Button} from "./form/Button";

interface LoginPageProps {
    api: DefaultApi;
    setSession: (session: Session) => void;
}

export function LoginPage(props: LoginPageProps) {
    const context = useContext(SessionContext);
    return (
        <div className="LoginForm">
            <Formik initialValues={{
                username: '',
                password: '',
            } as LoginForm}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Required'),
                        password: Yup.string().required('Required')
                    })}
                    onSubmit={(loginForm: LoginForm, {setSubmitting}: FormikHelpers<LoginForm>) => {
                        props.api.login({loginForm}).subscribe((user: User) => {
                                props.setSession({user});
                            }, () => {

                            },
                            () => {
                                setSubmitting(false);
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
                        <Button type="submit">Submit</Button>
                    </FormButtonsContainer>
                </Form>
            </Formik>
        </div>);
}
