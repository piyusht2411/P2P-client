import React from 'react'
import { useAppSelector } from '../store/store'
import { selectAuth } from '../store/reducers/authSlice';
import { useDailyHistoryQuery} from '../service/user';
import styles from "./History.module.css"
import ReactLoading from 'react-loading';
import { notifyError } from '../toast';

const DailyHistory = () => {
  const { _id } = useAppSelector(selectAuth);
  const responseInfo = useDailyHistoryQuery(_id);
  // console.log(responseInfo);


  if (responseInfo.isLoading) {
    return <ReactLoading type={"spokes"} color={"white"} height={"7rem"} width={"7rem"} className={styles.loader}/>
  }
  if (responseInfo.isError) {
    notifyError("Error Fetching Transaction!");
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
          let [date, time] = item.timestamp.split(', ');
          let [month, day, year] = date.split('/');
          month = month.length < 2 ? '0' + month : month;
          day = day.length < 2 ? '0' + day : day;
      
          // Split the time into hours, minutes, and seconds
          let [hours, minutes, seconds] = time.split(':');
          // Add leading zero if hours, minutes, or seconds are single digit
          hours = hours.length < 2 ? '0' + hours : hours;
          minutes = minutes.length < 2 ? '0' + minutes : minutes;
          seconds = seconds.split(' ')[0].length < 2 ? '0' + seconds.split(' ')[0] : seconds.split(' ')[0];
          // Reconstruct the formatted time with AM/PM
          let amPm = time.split(' ')[1];
          let formattedTime = `${hours}:${minutes}:${seconds} ${amPm}`;
      
          let formattedTimestamp = `${month}/${day}/${year}, ${formattedTime}`;

          let formatedAmount = item.amount;
          formatedAmount = formatedAmount.padStart(2,"0");


          return (
        <div className={styles.historyResult}>
          <li key = {item}>{item.status}</li>
          <li key = {item}>&#8377; {formatedAmount}</li>
          <li key = {item}>&#8377; {item.wallet}</li>
          <li key={item}>{formattedTimestamp}</li>
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

export default DailyHistory;