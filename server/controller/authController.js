const { hashPassword, comparePassword } = require("../authPass/authUser");
const userModel = require("../model/userModel");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const cloudinary = require("../cloudinary/cloudinary");

exports.authRegisterController = async (req, res) => {
  try {
    const { name, email, password, userName, image } = req.body;
    if (!name || !email || !password || !userName) {
      return res.status(400).send({
        success: false,
        message: "Please fill all field",
      });
    }

    const exisitingUserEmail = await userModel.findOne({ email });
    const exisitingUserName = await userModel.findOne({ userName });

    if (exisitingUserName) {
      return res.status(401).send({
        success: false,
        message: "username already exisits",
      });
    }
    if (exisitingUserEmail) {
      return res.status(401).send({
        success: false,
        message: "email already exisits",
      });
    }

    if (
      email.length > 30 ||
      userName.length > 20 ||
      name.length > 30 ||
      password.length > 20
    ) {
      return res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }

    const hashedPassword = await hashPassword(password);

    // Send Email to User
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_GMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_GMAIL,
      to: email,
      subject: "Welcome - MERN Stack",
      text: "Thank You ! For Register To Our Application ! ",
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.log(error);
      }
    };

    sendMail(transporter, mailOptions);

    // Save user Image
    const uploadImage = await cloudinary.uploader.upload(
      image,
      {
        upload_preset: `unsigned_upload`,
        allowed_formats: ["png", "jpg", "svg", "jfif", "webp"],
      },
      async function (error, result) {
        if (error) {
          console.log(error);
        }
        try {
          await new userModel({
            name,
            userName,
            email,
            password: hashedPassword,
            imagePath: result.url,
          }).save();
        } catch (error) {
          res.status(400).send({
            success: false,
            message: "Unable to save data",
          });
        }
      }
    );

    // Save user token
    const usertoken = await userModel.findOne({ email });
    const token = await JWT.sign(
      { _id: usertoken._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).send({
      success: true,
      message: "User Registered",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to register",
      error,
    });
  }
};

// Test user authenticated or not
exports.testController = (req, res) => {
  res.send("Hello protected");
};
