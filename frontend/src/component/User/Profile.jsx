import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser
} from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import LoadingBar from "../layout/Loader/LoadingBar";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import profileImage from "../../images/Profile.png";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  // console.log(user.avatar);
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      history("/login");
    }
  }, [history, isAuthenticated]);

  const updateUserHandler = () => {

    const myForm = new FormData();
    const role = user.role === "user" ? "seller" : "user";
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("role", role);
    dispatch(updateUser(user._id, myForm));
    window.location.reload();
  };
  return (
    <Fragment>
      {loading ? (
        <LoadingBar />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profile_heading">
            <h1>My Profile</h1>
          </div>
          <hr className="hr_profile" />
          <div className="profileContainer">
            <div>
              <img
                src={user.avatar ? user.avatar.url : profileImage}
                alt="profile_Image"
              />

              <Link to="/me/update">Edit Profile</Link>



            </div>
            <div>
              <div>
                <h3>Full Name</h3>
                <h4>{user.name}</h4>
              </div>
              <div>
                <h3>Email</h3>
                <h4>{user.email}</h4>
              </div>
              <div>
                <h3>Phone Number </h3>
                <h4>{user.phone}</h4>
              </div>
              <div>
                <h3>Joined On</h3>
                <h4>{String(user.createdAt).substr(0, 10)}</h4>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
                {
                  user.role === "user" ?
                    <Link to="/account" onClick={updateUserHandler}> Be a Seller ?? </Link>
                    :
                    <Link to="/account" onClick={updateUserHandler}> Be a Normal User ?? </Link>
                }
                {
                  user.verified === false ?
                    <Link to="/verify/user" onClick={updateUserHandler}> Please Verify Now  </Link>
                    :
                    <Link to="/account" > Verified User  </Link>
                }

              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
