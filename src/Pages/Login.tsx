import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../service/user";
import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { setUser } from "../store/reducers/authSlice";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import ReactLoading from 'react-loading';
import { notifyError, notifySuccess } from "../toast";
import { log } from "console";
  interface IFormInput {
    email: string,
    password: string
  }
  
  const schema = yup.object().shape({
    email: yup.string().required("Email is a required field").matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email format"
    ),
    password: yup.string().required("Password is a required field").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Invalid password format"
    ),
  });
  
  export default function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const [loginUser, {data, isSuccess,isLoading,isError, error}] = useLoginUserMutation();
  
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmitHandler: SubmitHandler<IFormInput> = async(formData)=>{
      const {email, password} = formData;
      const result = await loginUser({email:email, password:password});
      console.log(result);
      
    };
    useEffect(()=>{
      if(isSuccess){
        dispatch(setUser({name:data.user.name, _id:data.user._id, authToken:data.authToken, refreshToken:data.refreshToken}));
        console.log("auth token", data.authToken);
        console.log("referesh token", data.refreshToken);
        notifySuccess("Login Successful");
        navigate("/user/userinfo");
      }
      if(isError){
        //@ts-ignore
        notifyError(error.data.message);
      }
    })
    return (
      <div className={styles.login}>
      <Header2 />
      <div className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
             <h2>Login</h2>
        <label className={styles.lable}>Email</label>
        <input className={styles.input} {...register("email")} placeholder="Enter your email"/>
        {errors.email && <p>{errors.email.message}</p>}
  
        <label className={styles.lable}>Password</label>
        <input className={styles.input} {...register("password")} type="password" placeholder="Enter your password" />
        {errors.password && <p>{errors.password.message}</p>}
  <Link to = '/register'><p>Don't have an account?</p></Link>
        <input className={styles.input2} type="submit" value="Login" />
{isLoading &&   <ReactLoading type={"spokes"} color={"white"} height={"7rem"} width={"7rem"} className={styles.loader}/>}
        {/* {isError&& <p className={styles.errorClass}>{
          //@ts-ignore
        error.data.message
        }</p>} */}
      </form>
      </div>
      </div>
    )
  }