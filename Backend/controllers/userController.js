const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtTokens");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const sharp = require("sharp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const verification = require("../models/verificationModel");
const { DEFAULT_PROFILE_AVATAR } = require("../constant/otherConstant");
const { resolve } = require("path");
const ContactModel = require("../models/ContactModel");
// const { DEFAULT_PROFILE_AVATAR } = require("../constant/otherConstant");

//Register A User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("registerUser");
  const { name, email, phone, password } = req.body;
  // console.log(req.body.avatar);
  let avatar =
    req.body.avatar !== "" ? req.body.avatar : DEFAULT_PROFILE_AVATAR;
  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "User",
    width: 650,
    crop: "scale",
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });

  const dataToVerify = { email: email, id: undefined };
  const otpProcess = await sendVerificationEmail(dataToVerify, res);
  if (otpProcess) {
    const user = await User.create({
      name,
      email,
      phone,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
    const verificationUser = await verification.findById(otpProcess);
    verificationUser.user = user._id;
    await verificationUser.save();
    sendToken(user, 201, res);
  } else {
    res.status(400).json({
      success: false,
      message: "Not Able to Register . Try Again Later ",
    });
  }
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }
  // console.log(user.name);
  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User Not Found ", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ vallidateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;
  const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;

  const message = `Your Password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it `;
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} Successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;

    await user.save({ vallidateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

//Reset  Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Creating Token hash
  // console.log(req.params.token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    // console.log("Expired");
    return next(
      new ErrorHander(
        "Reset Password Token Is Invalid Or Has Been Expired",
        401
      )
    );
  }
  if (req.body.password != req.body.confirmPassword) {
    // console.log("Password Does Not Match" , req.body.password ,req.body.confirmPassword);
    return next(new ErrorHander("Password Does Not Match ", 401));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old Password Is Incorrect", 400));
  }
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHander("Password Does Not Match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});
// Update User Profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "User",
      width: 650,
      crop: "scale",
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get All User ( Admin )
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get All contact ( Admin )
exports.getAllContact = catchAsyncErrors(async (req, res, next) => {
  const contacts = await ContactModel.find();
  res.status(200).json({
    success: true,
    contacts,
  });
});

// Get Single User ( Admin )
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHander(`User Does Not Exist With Id : ${req.params.id} `)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role -- Admin  --> to Seller or to Admin / User --> to Seller
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// Delete User  -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHander(`User Does Not Exist With Id : ${req.params.id} `, 400)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

//  Send OTP Verification Email Address
const sendVerificationEmail = async ({ email, id }, res) => {
  try {
    let otpCreated = Math.floor(1000 + Math.random() * 9000);
    const message = `Verification Code : ${otpCreated}`;

    await sendEmail({
      email: email,
      subject: `Verify Your OTP`,
      message,
    });

    //  Hash the OTP Message
    const verificationUser = await verification.findOne({ email: email });
    if (verificationUser !== null) {
      verificationUser.otp = otpCreated;
      verificationUser.save();
      return Promise.resolve(verificationUser._id);
    } else {
      const newOTPVerification = await new verification({
        email: email,
        user: id,
        otp: otpCreated,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });
      await newOTPVerification.save();
      return Promise.resolve(newOTPVerification._id);
    }
  } catch (error) {
    // console.log("send email me ");
    // console.log(error.message);
    return Promise.reject(false);
  }
};

//   OTP Verification
exports.optVerification = catchAsyncErrors(async (req, res) => {
  try {
    const id = req.body.id;
    const otp = req.body.otp;
    const user = await User.findById(id);
    const verificationUser = await verification.findOne({ user: id });

    if (verificationUser.expiresAt < Date.now())
      res.status(400).json({ success: false, message: "OTP Expires" });

    if (verificationUser.otp == otp) {
      user.verified = true;
      await user.save();
      await verification.deleteOne({ user: id });
      res.status(200).json({ success: true, message: "Verified" });
    } else {
      res.status(400).json({ success: false, message: "OTP NOT MATCHED" });
    }
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

exports.sendOTP = catchAsyncErrors(async (req, res) => {
  const dataToVerify = { email: req.body.email, id: req.body.id };
  try {
    const otpProcess = await sendVerificationEmail(dataToVerify, res);
    if (otpProcess) {
      res.status(200).json({
        success: true,
        message: "Send verification OTP successfully",
      });
    } else throw new Error("Unable to send verification email");
  } catch (error) {
    // console.log("send OTP me ");
    res.status(400).json({ error: error.message });
  }
});

exports.contactFrom = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, message, user, role } = req.body;
  const createdAt = Date.now();
  // const user = req.body.user ? 0 : ;
  console.log(req.body);
  try {
    if (name === "" || email === "" || phone === "" || message === "") {
      return next(new ErrorHander("Please Enter ALL Details", 400));
    }
    if (user === "0") {
      await ContactModel.create({
        name,
        email,
        phone,
        message,
        role,
        createdAt,
      });
    } else {
      await ContactModel.create({
        name,
        email,
        user,
        phone,
        message,
        role,
        createdAt,
      });
    }
    res.status(200).json({
      success: true,
      message: "Submitted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});
