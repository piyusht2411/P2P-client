import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation, useSendMoneyMutation } from "../service/user";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { selectAuth, setUser } from "../store/reducers/authSlice";
import Header from "../components/Header";
  
  interface IFormInput {
    email: string,
    amount: string
  }
  
  const schema = yup.object().shape({
    email: yup.string().required("Email is a required field").matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email format"
    ),
    amount: yup.string().required("Name is a required field"),
    
  });
  
  export default function Transactions() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });

    const {_id} = useAppSelector(selectAuth);
  const [sendMoney, {data, isSuccess,isLoading,isError}] = useSendMoneyMutation();
  
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmitHandler: SubmitHandler<IFormInput> = async(formData)=>{
      const {email, amount} = formData;
      const result = await sendMoney({_id: _id,receiverMail:email, amount:amount});

      // window.alert('Money is transfered successfully');
      console.log(result);
      navigate('/payment');
      
    };
    return (
      
      <><Header/>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Transfer Money</h2>
 <label className={styles.lable}>Email</label>
 <input className={styles.input} {...register("email")}/>
 {errors.email && <p>{errors.email.message}</p>}

 <label className={styles.lable}>Amount</label>
 <input className={styles.input} {...register("amount")}/>
 {errors.amount && <p>{errors.amount.message}</p>}

 <input className={styles.input2} type="submit" value="Send Money" />
   </form>
      </>
    )
  }