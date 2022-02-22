import { connect } from "react-redux";
import { setnotice, setFrame } from "../../../store/actions/dialog";
import CopyForm from "../../CopyForm";
import { saveEmail } from "../../../store/actions/copyForm";

const mapStateToProps = (state) => {
    return {
        link: state.button.cartlink,
    };
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const mapDispatchToProps = (dispatch, props) => ({
    onBack: () => {
        dispatch(setnotice({ message: null }));
        dispatch(setFrame("CLUSTER"));
    },

    submitForm: (values, formikBag) => {
        if (!validateEmail(values.emailTo)) {
            formikBag.setSubmitting(false);
            dispatch(setnotice({ message: "Please give a valid email address", classname: "error" }));
            return;
        }

        dispatch(saveEmail(values, formikBag));
    },
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    onSubmit: (values, formikBag) => {
        dispatchProps.submitForm({ ...values, link: stateProps.link }, formikBag);
    },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CopyForm);
