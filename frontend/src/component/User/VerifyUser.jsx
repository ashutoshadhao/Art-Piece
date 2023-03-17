import React, { Fragment, useState, useEffect } from "react";
import "./VerifyUser.css"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, sendOtpEmail, verifyOTP } from "../../actions/userAction";
import { useAlert } from "react-alert";
import LoadingBar from "../layout/Loader/LoadingBar";

const VerifyUser = () => {
    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    const { error, message, loading } = useSelector(
        (state) => state.otp
    );
    const myForm = new FormData();
    if (user) {
        myForm.set("email", user.email);
        myForm.set("id", user._id);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
            if (message === "Verified") {
                window.location.reload();
            }
        }
    }, [dispatch, error, alert, message]);

    const resendOTP = () => {
        dispatch(sendOtpEmail(myForm));
        alert.success(" Resend OTP Successfully");
    }
    const verifySendOTP = (e) => {
        e.preventDefault();
        console.log("verify fucntion on click check")
        myForm.set("otp", otp);
        dispatch(verifyOTP(myForm));
    }

    return (
        <Fragment>
            {
                loading ? (
                    <LoadingBar />
                ) : (
                    <Fragment>
                        < div className=' container verify-otp-main-me d-flex align-items-center justify-content-center ' >
                            <form onSubmit={verifySendOTP} >
                                <div className="mb-3 text-center fs-3">
                                    <label htmlFor="exampleInputEmail" className="form-label fw-bold  ">
                                        OTP
                                    </label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        value={otp}
                                        onChange={(e) => { setOtp(e.target.value) }}
                                    />
                                    <div className="form-text">
                                        Don't Share OTP With Someone else
                                    </div>
                                </div>

                                <div className='text-left '>
                                    <div className="  resend-it-me" onClick={resendOTP}>
                                        Resend it ?
                                    </div>
                                </div>
                               
                                <div className='text-center d-grid gap-2'>

                                    <button type="submit" className="btn btn-primary ">
                                        Verify
                                    </button>


                                </div>

                            </form>

                        </div >
                    </Fragment>
                )
            }
        </Fragment>

    )
}


export default VerifyUser