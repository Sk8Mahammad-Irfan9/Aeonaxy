import React from "react";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Img from "../Img";

const Register = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadImage] = useState("");

  const previewFiels = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(image);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiels(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          image: image,
          name,
          userName,
          password,
          email,
        }
      );
      if (result.data.success) {
        setAuth({
          ...auth,
          user: result.data.user,
          token: result.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(result.data));
        toast.success("Successfully Registered! ");
        const uploadedImage = result.data.public_id;
        setUploadImage(uploadedImage);
        navigate("/user/home");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="bg-gray-600 sm:h-screen flex justify-center items-center p-10">
        <div className="bg-black sm:h-fill p-5 rounded-lg">
          <div className="grid sm:grid-cols-2 gap-4 p-4">
            <div className="sm:h-full w-full object-cover">
              <img
                src="https://tse2.mm.bing.net/th/id/OIG2.xKbX.dl67F75d7aldDgQ?pid=ImgGn"
                alt="computer"
                className="rounded-lg sm:h-96 w-full object-cover"
              />
              <Img uploadedImage={uploadedImage} />
            </div>
            <div>
              <h2 className="text-white">Sign In</h2>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col object-cover"
              >
                <div className="h-24 w-16">
                  <img src={image} alt="" className="rounded-full" />
                </div>
                <label for="name" className="m-2 text-white">
                  Choose your avatar
                </label>
                <input
                  type="file"
                  name="name"
                  placeholder="Enter name"
                  className="rounded-xl border-none"
                  onChange={(e) => handleChange(e)}
                  required
                />

                <label for="name" className="m-2 text-white">
                  Enter Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="rounded-3xl border-none p-2"
                  required
                />
                <label for="name" className="m-2 text-white">
                  Enter Your username
                </label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter username"
                  className="rounded-3xl border-none p-2"
                  required
                />
                <label for="email" className="m-2 text-white">
                  Enter Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="rounded-3xl border-none p-2"
                  required
                />
                <label for="password" className="m-2 text-white">
                  Enter Your password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="rounded-3xl border-none p-2"
                  required
                />
                <button className="bg-blue-400 m-4 rounded-lg" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
