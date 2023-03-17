import React, { useState, useEffect } from "react";
import "./Contact.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { contact, clearErrors } from "../../../actions/userAction";

const Contact = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading, success } = useSelector(
    (state) => state.otp
  );
  const { user } = useSelector((state) => state.user);
  const [comment, setMessage] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState();
  const [name, setname] = useState("");

  const submitForm = () => {
    const myForm = new FormData();

    if (user) {
      myForm.set("name", user.name);
      myForm.set("email", user.email);
      myForm.set("phone", user.phone);
      myForm.set("user", user._id);
      myForm.set("role", user.role);
    }
    else {
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("phone", phone);
      myForm.set("user", 0);
      myForm.set("role", "user");
    }
    myForm.set("message", comment);
    // console.log(myForm)
    dispatch(contact(myForm))
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success(message)
    }
  }, [dispatch, error, alert, message, success]);
  return (
    <>
      <div className="container-fluid m-5 ">
        <div className="row ">
          <div className="col-10 mx-auto shadow border ">
            <h1 className="text-center m-3 contact-heading-me ">Contact Us </h1>
            <hr className="mb-4" />
            <div class="container m-5">
              <div class="row">
                <div class="col">
                  <div className="row g-3">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        aria-label="First name"
                        value={user ? user.name : name}
                        onChange={(e) => {
                          setname(e.target.value)
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="Phone"
                        className="form-control"
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        value={user ? user.phone : phone}
                        onChange={(e) => {
                          setphone(e.target.value)
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        value={user ? user.email : email}
                        onChange={(e) => {
                          setemail(e.target.value)
                        }}
                      />
                    </div>
                    <div class="form-floating">
                      <textarea
                        class="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        value={comment}
                        onChange={(e) => {
                          setMessage(e.target.value)
                        }}
                      ></textarea>
                      <label for="floatingTextarea2">Message</label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn mt-3 col-4 border border-dark shadow"
                        onClick={() => {
                          submitForm();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col contact_image ">
                  <img
                    src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-12860.jpg?w=900&t=st=1656855592~exp=1656856192~hmac=7aac4173fbd7c17ed344211a4a4007df0e93b32c662ef45c3776f26e1962fdfb "
                    width={"400px"}
                    height={"300px"}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
