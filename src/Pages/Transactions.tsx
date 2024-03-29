import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation, useSendMoneyMutation } from "../service/user";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { selectAuth, setUser } from "../store/reducers/authSlice";
import Header from "../components/Header";
import styles from "../styles/TransferMoney.module.css"
import Header2 from "../components/Header2";
import ReactLoading from 'react-loading';

interface IFormInput {
  email: string,
  amount: string,
  pin: string
}

const schema = yup.object().shape({
  email: yup.string().required("Email is a required field").matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    "Invalid email format"
  ),
  amount: yup.string().required("Name is a required field"),
  pin: yup
    .string()
    .required("Pin is a required field"),

});

export default function Transactions() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const { _id } = useAppSelector(selectAuth);
  const [sendMoney, responsInfo] = useSendMoneyMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmitHandler: SubmitHandler<IFormInput> = async (formData) => {
    const { email, amount, pin } = formData;
    const result = await sendMoney({ _id: _id, receiverMail: email, amount: amount, pin: pin });
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

    <div className={styles.transfer}>
      <Header2 />
      <div className={styles.main3}>
        <form className={styles.form3} onSubmit={handleSubmit(onSubmitHandler)}>
          <h2>Transfer Money</h2>
          <label className={styles.lable3}>Email</label>
          <input className={styles.input3} {...register("email")} placeholder="Enter the receciver's email" />
          {errors.email && <p>{errors.email.message}</p>}

          <label className={styles.lable3}>Amount</label>
          <input className={styles.input3} {...register("amount")} placeholder="Enter the amount you want to send" />
          {errors.amount && <p>{errors.amount.message}</p>}
          <label className={styles.lable2}>Pin Number</label>
          <input className={styles.input2} {...register("pin")} type="password" placeholder="Enter your pin number" />
          {errors.pin && <p>{errors.pin.message}</p>}

          <input className={styles.input3} type="submit" value="Send Money" />
          {responsInfo.isLoading &&   <ReactLoading type={"spokes"} color={"white"} height={"7rem"} width={"7rem"} className={styles.loader}/>}
        </form>
      </div>
    </div>
  )
}