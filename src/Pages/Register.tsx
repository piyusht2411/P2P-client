import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/Register.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterUserMutation } from "../service/user";
import Header from "../components/Header";
import { useEffect } from "react";

interface IFormInput {
  name: string,
  email: string,
  phone: string,
  password: string,
  pin: string
}

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().required("Email is a required field").matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    "Invalid email format"
  ),
  phone: yup
    .string()
    .required("Phone is a required field")
    .matches(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number format"
    ),
  password: yup.string().required("Password is a required field").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
    "Invalid password format"
  ),
  pin: yup
    .string()
    .required("Pin is a required field")
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const [registerUser, { isSuccess, isLoading, isError, error }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<IFormInput> = async (formData) => {
    const { name, email, phone, password, pin } = formData;
    const result = await registerUser({ name: name, email: email, phone: phone, password: password, pin: pin });
    // navigate("/");
    console.log(result);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  })
  return (

    <div className={styles.register}>
      <Header />
      <div className={styles.main2}>
        <form className={styles.form2} onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>Registration Form</h2>

          <label className={styles.lable2}>Name</label>
          <input className={styles.input2} {...register("name")} placeholder="Enter your name" />
          {errors.name && <p>{errors.name.message}</p>}

          <label className={styles.lable2}>Email</label>
          <input className={styles.input2} {...register("email")} placeholder="Enter your email" />
          {errors.email && <p>{errors.email.message}</p>}
          <label className={styles.lable2}>Phone no.</label>
          <input className={styles.input2} {...register("phone")} placeholder="Enter your phone no." />
          {errors.phone && <p>{errors.phone.message}</p>}

          <label className={styles.lable2}>Password</label>
          <input className={styles.input2} {...register("password")} type="password" placeholder="Enter your password" />
          {errors.password && <p>{errors.password.message}</p>}
          <label className={styles.lable2}>Pin Number</label>
          <input className={styles.input2} {...register("pin")} type="password" placeholder="Enter your pin number" />
          {errors.pin && <p>{errors.pin.message}</p>}
          <Link to='/login'><p>Already have an account?</p></Link>
          <input className={styles.input2} type="submit" value="Register" />
          {isError ? <p className={styles.errorClass}>{
            //@ts-ignore
            error.data.message
          }</p> : ""}
        </form>
      </div>
    </div>
  )
}