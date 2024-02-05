import React from 'react'
import { useAppSelector } from '../store/store'
import { selectAuth } from '../store/reducers/authSlice';
import { useHourlyHistoryQuery, useWeklyHistoryQuery, useYearlyHistoryQuery } from '../service/user';

const YearlyHistory = () => {
  const { _id } = useAppSelector(selectAuth);
  const responseInfo = useYearlyHistoryQuery(_id);
  // console.log(responseInfo);


  if (responseInfo.isLoading) {
    return <div>Loading user info...</div>
  }
  if (responseInfo.isError) {
    return <div>Error fetching user data!</div>
  }
  if (responseInfo.isSuccess) {
    return (
      <ul>
        {responseInfo.data.map((item:any) => {
          // return <li key = {item}>{item.amount} {item.timestamp}</li>
          return (
        <div>
          <li key = {item}>Amount - {item.amount}</li>
          <li key = {item}>Time - {item.timestamp}</li>
        </div>
          
          )
        })}
       
  
      </ul>
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

export default YearlyHistory;