import axios from "axios";
import { setnotice } from "../actions/dialog";
import copy from "copy-to-clipboard";

export function saveEmail(values, formikBag) {
    return (dispatch) => {
        // dispatch({ type: SAVING_CART });

        const params = new URLSearchParams();
        params.append("emailTo", values.emailTo);
        params.append("link", values.link);
        params.append("nonce", window.wcssc_settings.wcssc_nonce);

        axios
            .post(window.wcssc_settings.api_path.copy_link, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((res) => {
                formikBag.setSubmitting(false);
                if (res && res.status === 200) {
                    copy(values.link);
                    // Display success notice.
                    dispatch(
                        setnotice({
                            message: res.data.message,
                            classname: res.data.success ? "success" : "error",
                        })
                    );

                    // Reset the form on success.
                    if (res.data.success) {
                        formikBag.resetForm();
                    }
                }
            })
            .catch((error) => {
                formikBag.setSubmitting(false);
                if (error && error.response) {
                    console.log(JSON.stringify(error.response));
                }
            });
    };
}
