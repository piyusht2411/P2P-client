import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../service/user";
import { useAppDispatch } from "../store/store";
import { useEffect } from "react";
import { setUser } from "../store/reducers/authSlice";
  
  interface IFormInput {
    email: string,
    password: string
  }
  
  const schema = yup.object().shape({
    email: yup.string().required("Email is a required field").matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email format"
    ),
    password: yup.string().required("Email is a required field").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Invalid email format"
    ),
  });
  
  export default function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const [loginUser, {data, isSuccess,isLoading,isError}] = useLoginUserMutation();
  
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
        navigate("/user/userinfo");
      }
    })
    return (
      
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
             <h2>Login User</h2>
        <label className={styles.lable}>Email</label>
        <input className={styles.input} {...register("email")}/>
        {errors.email && <p>{errors.email.message}</p>}
  
        <label className={styles.lable}>Password</label>
        <input className={styles.input} {...register("password")} type="password" />
        {errors.password && <p>{errors.password.message}</p>}
  
        <input className={styles.input2} type="submit" value="Login" />
      </form>
    )
  }