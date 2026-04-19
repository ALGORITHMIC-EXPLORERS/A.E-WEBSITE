import { useState, useEffect, type ChangeEvent, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";
import { FaArrowRight } from "react-icons/fa6";
import { FaFacebook, FaGoogle, FaMicrosoft } from "react-icons/fa";
import loginImg from "/login_mage.png";
import Button from "../components/ui/login/Button";

type LoginData = {
  username: string;
  password: string;
};

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginData>({
    username: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e?: React.FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    
    if (data.username.trim() === "" || data.password.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.username, // mapping username field to email for backend
          password: data.password,
        }),
      });

      // Use centralized login from AuthContext
      console.log("Login successful, updating context state...");
      login(result.user, result.accessToken);

      console.log("Navigating to dashboard...");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login attempt failed:", error);
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginData) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <div className="S_wrap px-4 lg:px-0 lg:pl-20 py-8 lg:py-0 w-full bg-[#050020]">
      <div className="grid grid-cols-1 gap-5 md:gap-40 items-center lg:grid-cols-2">
        <div className="S_img w-full order-1 lg:order-2">
          <img
            src={loginImg}
            alt="Class"
            className="w-full h-65 sm:h-90 lg:h-screen object-cover"
          />
        </div>
        <div className="S_form w-full text-[#EFE1E1] order-2 lg:order-1">
          <h1 className="text-2xl text-[#EFE1E1] text-center font-bold mb-6">
            Sign in to your account
          </h1>
          <form className="flex flex-col gap-7" onSubmit={handleLogin}>
            <div className="userName">
              <label htmlFor="username ">Username</label>
              <input
                className="text-[#94A3B8] mt-5 w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                type="text"
                id="username"
                placeholder="Username or Email ID"
                value={data.username}
                onChange={handleInputChange("username")}
              />
            </div>
            <div className="Password">
              <label htmlFor="password">Password</label>
              <input
                className="text-[#94A3B8] mt-5 w-full border bg-[#E2E8F0] border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F00FF] focus:border-transparent"
                type="password"
                id="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={handleInputChange("password")}
              />
            </div>
            <div className="button cursor-pointer text-white ">
              <Button
                type="submit"
                color="#5F00FF"
                text={loading ? "Signing in..." : "Sign In"}
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

export default Login;
