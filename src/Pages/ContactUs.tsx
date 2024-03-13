import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/Register.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContactUsMutation} from "../service/user";
import Header from "../components/Header";
import { useEffect } from "react";
import Header2 from "../components/Header2";

interface IFormInput {
  name: string,
  email: string,
  subject: string,
  message: string
}

const schema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup.string().required("Email is a required field").matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    "Invalid email format"
  ),
  subject: yup.string().required("Subject is a required field"),
  message: yup.string().required("Message is a required field"),
  
});

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const [contactUs, { isSuccess, isLoading, isError, error }] = useContactUsMutation();

  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<IFormInput> = async (formData) => {
    const { name, email, subject, message } = formData;
    const result = await contactUs({ name: name, email: email, subject: subject, message: message});
    // navigate("/");
    console.log(result);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  })
  return (

    <div className={styles.register}>
      <Header2 />
      <div className={styles.main2}>
        <form className={styles.form2} onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>Contact US</h2>

          <label className={styles.lable2}>Name</label>
          <input className={styles.input2} {...register("name")} placeholder="Enter your name" />
          {errors.name && <p>{errors.name.message}</p>}

          <label className={styles.lable2}>Email</label>
          <input className={styles.input2} {...register("email")} placeholder="Enter your email" />
          {errors.email && <p>{errors.email.message}</p>}
          <label className={styles.lable2}>Subject</label>
          <input className={styles.input2} {...register("subject")} placeholder="Enter the Subject of your message" />
          {errors.subject && <p>{errors.subject.message}</p>}

          <label className={styles.lable2}>Message</label>
          <input className={styles.input2} {...register("message")} placeholder="Enter your message" />
          {errors.message && <p>{errors.message.message}</p>}
          <input className={styles.input2} type="submit" value="Send message" />
          {isError ? <p className={styles.errorClass}>{
            //@ts-ignore
            error.data.message
          }</p> : ""}
        </form>
      </div>
    </div>
  )
}