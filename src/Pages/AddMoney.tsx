import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Page.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddMoneyMutation } from "../service/user";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { selectAuth, setUser } from "../store/reducers/authSlice";
import Header from "../components/Header";
  
interface IFormInput {
    amount: string
  }
  
const schema = yup.object().shape({
    amount: yup.string().required("Name is a required field"),
    
});
  
  export default function AddMoney() {
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });

    const {_id} = useAppSelector(selectAuth);
  const [addMoney, {data, isSuccess,isLoading,isError}] = useAddMoneyMutation();
  
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmitHandler: SubmitHandler<IFormInput> = async(formData)=>{
      const {amount} = formData;
      const result = await addMoney({_id: _id, amount:amount});
      window.alert('Your money is added successfully');
      console.log(result);
      navigate('/payment');
      
    };
    return (
      
      <><Header/>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Add Money</h2>

 <label className={styles.lable}>Amount</label>
 <input className={styles.input} {...register("amount")}/>
 {errors.amount && <p>{errors.amount.message}</p>}

 <input className={styles.input2} type="submit" value="Add Money" />
   </form>
      </>
    )
  }