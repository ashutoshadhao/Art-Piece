import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import LoadingBar from "../layout/Loader/LoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { RESET_PASSWORD_SUCCESS } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const params = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Reset Password Successfully");

      history("/login");

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
    }
  }, [dispatch, error, alert, success]);

  return (
    <Fragment>
      {loading ? (
        <LoadingBar />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Reset Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
