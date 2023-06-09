const Razorpay = require("razorpay");
const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaugth Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server Due To Uncaught Exception`);
  process.exit(1);
});

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "Backend/config/config.env" });
// }

// connecting to DataBase
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  RazorPay Payment Gateway
exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

const PORT = process.env.PORT || 5000;
// const PORT = process.env.PORT ;
const server = app.listen(PORT, () => {
  console.log(`Server is Started on Port -- ${PORT}`);
});

//  Uhandled  Promise  Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server Due To Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});

