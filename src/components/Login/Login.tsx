import styles from "./login.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/api";


const LOGIN_URL = "token/";

export const Login = () => {
  const { setAuth }: any = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onChangeUsername(
    event: React.ChangeEvent<HTMLInputElement> & { target: HTMLFormElement }
  ) {
    setUsername(event.target.value);
  }

  function onChangePassword(
    event: React.ChangeEvent<HTMLInputElement> & { target: HTMLFormElement }
  ) {
    setPassword(event.target.value);
  }

  let navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        JSON.stringify({ username: username, password: password })
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.access;
      localStorage.setItem("accessToken", accessToken);
      setAuth({ username, password, accessToken });
      setUsername("");
      setPassword("");
      localStorage.clear();
      localStorage.setItem("access", accessToken);
      setTimeout(() => {
        navigate("/todo");
      }, 500);
      console.log("login successful");
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (!error?.response) {
        console.log("No Server Response");
      } else if (error.response?.status === 400) {
        console.log("Missing Username or Password");
      } else if (error.response?.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg_image_container}>
        <img
          className={styles.bg_image}
          src="https://wallpaperaccess.com/full/1630412.jpg"
          alt=""
        />
      </div>
      <header className={styles.loginContainer}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Login</div>
          <form onSubmit={handleSubmit} className={styles.formLogin}>
            <div className={styles.field}>
              <input
                className={styles.loginInput}
                type="text"
                name="username"
                onChange={onChangeUsername}
                value={username}
                required
              />
              <label>Username</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.loginInput}
                type="password"
                name="password"
                onChange={onChangePassword}
                value={password}
                required
              />
              <label>Password</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.loginInput}
                type="submit"
                value="Login"
              />
            </div>
            <ToastContainer />
            <div className={styles.signup_link}>
              Not a user?{" "}
              <a className={styles.anchorlogin} href="/register">
                Signup now
              </a>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};
