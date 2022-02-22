import { connect } from "react-redux";
import ClipIcon from "../../../ShareIcons/Clipboard";
import { setFrame, setnotice } from "../../../../store/actions/dialog";
import copy from "copy-to-clipboard";

const { __ } = window.wp.i18n;

const mapStateToProps = (state) => ({
    link: state.button.cartlink,
});

const mapDispatchToProps = (dispatch) => ({
    // copyLink: (link) => {
    // copy(link);
    //     dispatch(
    //         setnotice({
    //             classname: "success",
    //             message: __("Cart link copied to clipboard", "wcssc"),
    //         })
    //     );
    // },
    showForm: (link) => {
        dispatch(setFrame("COPY_FORM"));
    },
});

const mergeProps = (stateprops, dispatchprops) => ({
    ...stateprops,
    ...dispatchprops,
    onClick: (e) => {
        e.preventDefault();
        // dispatchprops.copyLink(stateprops.link);
        dispatchprops.showForm(stateprops.link);
    },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClipIcon);
