import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterUserMutation } from "../service/user";
  
  interface IFormInput {
    name: string,
    email: string,
    phone:string,
    password: string
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
    password: yup.string().required("Email is a required field").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Invalid email format"
    ),
  });
  
  export default function Register() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });
    const [registerUser, {isSuccess,isLoading,isError}] = useRegisterUserMutation();
  
    const navigate = useNavigate();

    const onSubmitHandler: SubmitHandler<IFormInput> = async(formData)=>{
      const{name, email,phone, password} = formData;
      const result = await registerUser({name:name, email:email,phone:phone, password:password});
      navigate("/");
      console.log(result);
    };
    return (
      
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
             <h2>Registration Form</h2>

        <label className={styles.lable}>Name</label>
        <input className={styles.input} {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
  
        <label className={styles.lable}>Email</label>
        <input className={styles.input} {...register("email")}/>
        {errors.email && <p>{errors.email.message}</p>}
        <label className={styles.lable}>Phone no.</label>
        <input className={styles.input} {...register("phone")}/>
        {errors.phone && <p>{errors.phone.message}</p>}
  
        <label className={styles.lable}>Password</label>
        <input className={styles.input} {...register("password")} type="password" />
        {errors.password && <p>{errors.password.message}</p>}
  
        <input className={styles.input2} type="submit" value="Register" />
      </form>
    )
  }