import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { PulseLoader } from "react-spinners";
import LoadingOverlay from 'react-loading-overlay'

export default function Spinner({children}){
  const { promiseInProgress } = usePromiseTracker();
  console.log("promise")

  return (
    // promiseInProgress && (
    //   <div className="spinner">
    //     <PacmanLoader color="#0d4d63"/>
    //   </div>
    // )
    <LoadingOverlay
      active={promiseInProgress}
      spinner={
        <PulseLoader
          color="lightcyan"
          size={60}
        />}
      styles={{
        wrapper: {
          width: '100vw',
          height: '100vw',
          overflow: promiseInProgress ? 'hidden' : 'scroll'
        }
      }}
    >
        {children}
    </LoadingOverlay>
  );
};