import { useState } from "react";
import styles from "./signup.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/api";

const REGISTER_URL = "register/";
export const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> & { target: HTMLFormElement }
  ) => {
    event.preventDefault();
    if (password === password1) {
      try {
        const response = await axiosPrivate.post(
          REGISTER_URL,
          JSON.stringify({ username: username, password: password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);
        console.log(response?.data);
        console.log(JSON.stringify(response));
        setUsername("");
        setPassword("");
        setPassword1("");
        console.log("Registed successfully, Login to continue.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err: unknown) {
        const error = err as AxiosError;
        if (!error?.response) {
          console.log("No Server Response");
          console.log("No Server Response");
        } else {
          console.log("Registration Failed");
          console.log(error.response);
          console.log("Username already exists, try another one.");
        }
      }
    } else {
      
      console.log("Passwords don't match");
    }
  };

  function onChangeUsername(
    event: React.ChangeEvent<HTMLInputElement> & {
      target: HTMLFormElement;
    }
  ) {
    setUsername(event.target.value);
  }

  function onChangePassword(
    event: React.ChangeEvent<HTMLInputElement> & {
      target: HTMLFormElement;
    }
  ) {
    setPassword(event.target.value);
  }
  function onChangePassword1(
    event: React.ChangeEvent<HTMLInputElement> & { target: HTMLFormElement }
  ) {
    setPassword1(event.target.value);
  }

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
          <div className={styles.title}>Register</div>
          <form onSubmit={handleSubmit} className={styles.formLogin}>
            <div className={styles.field}>
              <input
                className={styles.loginInput}
                type="text"
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
                onChange={onChangePassword}
                value={password}
                required
              />
              <label>Password</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.loginInput}
                type="password"
                onChange={onChangePassword1}
                value={password1}
                required
              />
              <label>Confirm Password</label>
            </div>
            <div className={styles.field}>
              <input
                className={styles.loginInput}
                type="submit"
                value="Register"
              />
            </div>
            <div className={styles.signup_link}>
              Already a user?{" "}
              <a className={styles.anchorlogin} href="/login">
                Login here
              </a>
            </div>
            <ToastContainer />
          </form>
        </div>
      </header>
    </div>
  );
};
