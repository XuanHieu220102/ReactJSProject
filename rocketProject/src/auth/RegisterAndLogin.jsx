import React, { useState } from "react";
import '../component/login/LoginForm.css';
import { UserOutlined, GoogleOutlined } from '@ant-design/icons';
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from './../main';
import { database } from './../firebaseConfig';
import { provider } from './../firebaseConfig';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
const RegisterAndLogin = () => {
  let authStore = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage("");
  };
  const [tmp, setTmp] = useState("Đăng nhập");
  const toggleRegister = () => {
    setFormData({ username: "", password: "", confirmPassword: "" })
    setErrorMessage("")
    setIsRegistering(!isRegistering);
    setIsPasswordForgotten(false);
    if ((!isRegistering && !isPasswordForgotten) || (!isRegistering && isPasswordForgotten)) {
      setTmp("Đăng ký")
    } else {
      setTmp("Đăng nhập")
    }
    console.log("Res:", isRegistering);
    console.log("Pass:", isPasswordForgotten);
  };

  const toggleForgotPassword = () => {
    setIsRegistering(false);
    setIsPasswordForgotten(true);
    if ((!isRegistering && !isPasswordForgotten) || (isRegistering && !isPasswordForgotten)) {
      setTmp("Quên mật khẩu")
    }
    console.log("Toggle res: ", isRegistering);
    console.log("Togle pass: ", isPasswordForgotten);
  };
  // const [token, setToken] = useState(null);

  const signInG = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user, 'user');
        const data = {
          email: user.email,
          token: token
        }
        authStore.signin(data, navigate("/DashBoard"));
        authStore.callbackUrl(navigate("/DashBoard"));

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).then(res => {
        navigate("/DashBoard");
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('err', errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (tmp === "Đăng nhập") {
        console.log("DN", isRegistering);
        setErrorMessage("")
        if (formData.password.length < 6) {
          setErrorMessage("Thông tin tài khoản mật khẩu không chính xác");
          console.log(errorMessage);
          return;
        }
        try {
          const response = await axios.post("http://localhost:8080/api/v1/login", formData)
          // console.log(formData);
          console.log(response.data);
          const arr = response.data.split("/");
          const userId = arr[0];
          const token = arr[1];
          const data = {
            userId: userId,
            token: token,
            username: formData.username
          }
          await authStore.signin(data, navigate)

          // let email = formData.username;
          // let password = formData.password;
          // signInWithEmailAndPassword(database, email, password)
          //   .then((data) => {
          //     console.log(data, "authData");
          //     // dispath
          //     authStore.signin(data, navigate("/", { replace: true }));
          //     console.log("DNTC");
          //   })
          //   .catch((err) => {
          //     console.log(err, "==========")
          //   });
        }
        catch (err) {
          setErrorMessage("Thông tin tài khoản mật khẩu không chính xác");
        }
      } else if (tmp === "Đăng ký") {
        // console.log("DK", isRegistering, isPasswordForgotten);
        // console.log(formData);
        // if (formData.password !== formData.confirmPassword || formData.password.length < 6) {
        //   setErrorMessage("Mật khẩu không hợp lệ");
        //   console.log(errorMessage);
        //   return;
        // }
        // let email = formData.username;
        // let password = formData.password;
        // createUserWithEmailAndPassword(database, email, password)
        //   .then(data => {
        //     console.log(data, "authData");
        //     // auth.signin()
        //     //   history("/data");
        //     alert('dang ki thanh cong!');
        //   }).catch((err) => {
        //     console.log(err, "==========")
        //   });
        try {
          const response = await axios.post("http://localhost:8080/api/v1/register", formData)
          alert(response.data);
          window.location.replace("http://localhost:5173/login")
          // navigate("/login", { replace: true })
        } catch (err) {
          setErrorMessage(err.response.data);
        }
      } else {
        console.log(formData);
        try {
          const response = await axios.post("http://localhost:8080/api/v1/forgetPassword", formData)
          alert(response.data);
        } catch (err) {
          setErrorMessage(err.response.data);
        }
      }

    };

    return (
      <div className="login-form">
        <div className="login-form1">
          <div className="i-per"><UserOutlined className="icon-person" /></div>
          {/* <h1>{isRegistering ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}</h1> */}
          <h1>{tmp}</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label htmlFor="username">Tên Đăng Nhập:</label> */}
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username.trim()}
                onChange={handleInputChange}
                required
              />
            </div>
            {!isPasswordForgotten && (
              <div className="form-group">
                {/* <label htmlFor="password">Mật Khẩu:</label> */}
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password.trim()}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {isRegistering && (
              <div className="form-group">
                {/* <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu:</label> */}
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword.trim()}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div className="form-actions">
              <div className="actions1">
                <p className="error-message">{errorMessage}</p>
                <button type="submit">{tmp}</button>
              </div>
              <button className="login-gg" onClick={() => {signInG()}}><GoogleOutlined /> Google</button>
              <div className="actions2">
                <button type="button" onClick={toggleRegister}>
                  {isRegistering ? "Đã Có Tài Khoản?" : "Chưa Có Tài Khoản?"}
                </button>
                <button type="button" onClick={toggleForgotPassword}>
                  Quên Mật Khẩu?
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="login-form2">

        </div>
      </div>
    );
  };

  export default RegisterAndLogin;