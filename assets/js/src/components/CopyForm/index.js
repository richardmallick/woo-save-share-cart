import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Loader from "../../media/loader.svg";

const { __ } = window.wp.i18n;

export default function CopyForm(props) {
    const { onBack, onSubmit } = props;

    return (
        <>
            <h3> {__("Your Information", "wcssc")} </h3>
            <Formik
                initialValues={{
                    emailTo: "",
                }}
                validationSchema={Yup.object({
                    emailTo: Yup.string().max(50, __("Must be 50 characters or less", "wcssc")).required(__("Required", "wcssc")),
                })}
                onSubmit={onSubmit}
            >
                {(props) => {
                    const { isSubmitting } = props;

                    return (
                        <Form>
                            <div className="wcssc-form-row">
                                <label htmlFor="emailTo"> {__("Email address", "wcssc")} </label>
                                <Field name="emailTo" type="text" autoComplete="off" placeholder={__("", "wcssc")} />
                            </div>

                            <div className="wcssc-form-row">
                                <button onClick={onBack}>{__("Back", "wcssc")}</button>
                                <button type="submit"> {__("Submit", "wcssc")} </button>
                                {isSubmitting && (
                                    <span className="form-spinner">
                                        <Loader />
                                    </span>
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
}
