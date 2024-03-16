import React from 'react'
import { useAppSelector } from '../store/store'
import { selectAuth } from '../store/reducers/authSlice';
import { useHourlyHistoryQuery, useWeklyHistoryQuery } from '../service/user';
import styles from "./History.module.css"
import ReactLoading from 'react-loading';
const WeeklyHistory = () => {
  const { _id } = useAppSelector(selectAuth);
  const responseInfo = useWeklyHistoryQuery(_id);
  // console.log(responseInfo);


  if (responseInfo.isLoading) {
    return <ReactLoading type={"spokes"} color={"white"} height={"7rem"} width={"7rem"} className={styles.loader}/>
  }
  if (responseInfo.isError) {
    return <div>Error fetching user data!</div>
  }
  if (responseInfo.isSuccess) {
    return (
      <>
      <div>
        <ul className={styles.historyBar}>
          <li>Status</li>
          <li>Amount</li>
          <li>Now Money</li>
          <li>Date & Time</li>
        </ul>
      </div>
      <ul>
        {responseInfo.data.map((item:any) => {
          // return <li key = {item}>{item.amount} {item.timestamp}</li>
          return (
        <div className={styles.historyResult}>
          <li key = {item}>{item.status}</li>
          <li key = {item}>&#8377; {item.amount}</li>
          <li key = {item}>&#8377; {item.wallet}</li>
          <li key = {item}>{item.timestamp}</li>
        </div>
          
          )
        })}
       
  
      </ul>
      </>
    )

  }
  return (
    // <ul>
    //   {responseInfo.data.map((item: { amount: number | string, timestamp: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    //     {console.log("my", item.amount)}
    //     return <h2>{item.amount}{item.timestamp}</h2>
    //   })}

    // </ul>
    <></>
  )
}

export default WeeklyHistory;