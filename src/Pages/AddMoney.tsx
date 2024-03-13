import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from '../styles/AddMoney.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddMoneyMutation } from "../service/user";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { selectAuth, setUser } from "../store/reducers/authSlice";
import Header from "../components/Header";
import Header2 from "../components/Header2";

interface IFormInput {
  amount: string,
  pin: string
}

const schema = yup.object().shape({
  amount: yup.string().required("Name is a required field"),
  pin: yup
    .string()
    .required("Pin is a required field"),

});

export default function AddMoney() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const { _id } = useAppSelector(selectAuth);
  const [addMoney, { data, isSuccess, isLoading, isError }] = useAddMoneyMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmitHandler: SubmitHandler<IFormInput> = async (formData) => {
    const { amount, pin } = formData;
    const result = await addMoney({ _id: _id, amount: amount, pin: pin });
    console.log(result);

    if ("error" in result) {
      //@ts-ignore
      navigate('/paymentfailed', { state: { message: result.error.data.message } });
    }
    if ("data" in result) {
      let transitionId = result.data.transitionId;
      navigate('/payment', { state: { transitionId: transitionId } });
    }

  };
  return (

    <div className={styles.addMoney}>
      <Header2 />
      <div className={styles.main4}>
        <form className={styles.form4} onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>Add Money</h2>

          <label className={styles.lable4}>Amount</label>
          <input className={styles.input4} {...register("amount")} placeholder="Enter the amount you want to add" />
          {errors.amount && <p>{errors.amount.message}</p>}
          <label className={styles.lable2}>Pin Number</label>
          <input className={styles.input2} {...register("pin")} type="password" placeholder="Enter your pin number"/>
          {errors.pin && <p>{errors.pin.message}</p>}

          <input className={styles.input4} type="submit" value="Add Money" />
        </form>
      </div>
    </div>
  )
}