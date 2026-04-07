import { useState, type ChangeEvent, type ReactElement } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaFacebook, FaGoogle, FaMicrosoft } from "react-icons/fa";
import classImg from "/class.png";
import Button from "../components/ui/login/Button";

type SignupData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = (): ReactElement => {
  const [data, setData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const create_acct = (): void => {
    if (
      data.firstName.trim() === "" ||
      data.lastName.trim() === "" ||
      data.username.trim() === "" ||
      data.email.trim() === "" ||
      data.password.trim() === "" ||
      data.confirmPassword.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (data.email.indexOf("@") === -1 || data.email.indexOf(".") === -1) {
      alert("Please enter a valid email address");
      return;
    }
    // Proceed with account creation logic (e.g., API cal)
    alert("Account created successfully!");
    setData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (field: keyof SignupData) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <div className="S_wrap px-4 lg:px-0 lg:pr-20 py-8 lg:py-0 w-full bg-[#050020]">
      <div className="grid grid-cols-1 gap-5 items-center lg:grid-cols-2">
        <div className="S_img w-full order-1 min-h-screen lg:order-1">
          <img
            src={classImg}
            alt="Class"
            className="w-full h-screen object-cover"
          />
        </div>
        <div className="S_form w-full text-[#CFB3B3] order-2 lg:order-2 ">
          <h1 className="text-2xl text-center font-bold mb-6">
            Create Your Account
          </h1>
          <form className="flex flex-col gap-4 md:gap-7">
            <div className="full_name">
              <label htmlFor="Name">Full Name</label>
              <div className="flex flex-col gap-4 md:gap-5 mt-5 sm:flex-row">
                <input
                  className=" w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={handleInputChange("firstName")}
                />
                <input
                  className="w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={handleInputChange("lastName")}
                />
              </div>
            </div>
            <div className="userName">
              <label htmlFor="username ">Username</label>
              <input
                className="mt-3 w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                type="text"
                id="username"
                placeholder="Username"
                value={data.username}
                onChange={handleInputChange("username")}
              />
            </div>
            <div className="Email">
              <label htmlFor="email">Email</label>
              <input
                className="mt-3 w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                type="email"
                id="email"
                placeholder="Email"
                value={data.email}
                onChange={handleInputChange("email")}
              />
            </div>
            <div className="Password">
              <div className="flex flex-col gap-4 md:gap-5 mt-3 sm:flex-row">
                <div className="pass w-full">
                  <label htmlFor="password">Password</label>
                  <input
                    className="mt-5 w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleInputChange("password")}
                  />
                </div>
                <div className="confirm_pass w-full">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    className="mt-5 w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                    type="password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                  />
                </div>
              </div>
            </div>
            <div className="button cursor-pointer " onClick={create_acct}>
              <Button
                color="#5F00FF"
                text="Create Account"
                icon={<FaArrowRight />}
                size="inherit"
                iconPosition="right"
              />
            </div>
            <div className="sign flex items-center gap-5">
              <hr className="flex-1 border-gray-300" />
              <p className="text-center text-sm text-[#CFB3B3] whitespace-nowrap">
                Sign up with
              </p>
              <hr className="flex-1 border-gray-300" />
            </div>
            <div className="social_media flex flex-col gap-4 sm:flex-row">
              <a href="https://www.facebook.com/login/" className="w-full text-xl text-[#0866FF]">
                <Button
                  color="#FFFFFF"
                  text="Facebook"
                  img="/facebook.png"
                  size="inherit"
                  iconPosition="left"
                  icon={<FaFacebook />}
                />
              </a>
              <a href="https://accounts.google.com/signin" className="w-full text-xl text-[#EA4335]">
                <Button
                  color="#FFFFFF"
                  text="Google"
                  img="/google.png"
                  size="inherit"
                  iconPosition="left"
                  icon={<FaGoogle />}
                />
              </a>
              <a href="https://login.microsoftonline.com/" className="w-full text-xl text-[#000000]">
                <Button
                  color="#FFFFFF"
                  text="Microsoft"
                  img="/microsoft.png"
                  size="inherit"
                  iconPosition="left"
                  icon={<FaMicrosoft />}
                />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
