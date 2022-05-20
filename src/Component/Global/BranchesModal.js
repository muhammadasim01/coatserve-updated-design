import React from 'react'
import Countdown from 'react-countdown'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Login from '../../Screens/LoginScreen'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from '../../Screens/HomeScreen'
import {CardGroup} from 'reactstrap'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import { Modal,Table,TableHead, Button } from 'react-bootstrap'
import { LINKS } from '../../Utils'
import './goals.css'
import { useAlert } from "react-alert";
import disableHomePage from '../../Screens/disableHomeScreen'

import {
  PurchaseOrder,
  PurchaseQuotation,
  PurchaseRequests
} from '../../Screens/PurchasingAP'



const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const axios = require('axios')
const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 5 
     
};

const renderTime = (dimension, time) => {
  return (
    <div  className="time-wrapper">
      <div className="time" style={{fontSize:'30px',textAlign:'center'}} ><b>{time}</b></div>
      <div  style={{textAlign:'center'}}>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function Module (props) {
  let history = useHistory()
  const alert = useAlert();
  const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())

  const [show, setShow] = React.useState(false)
  const [branch, setBranch] = React.useState(false)
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [InstalationNo, setInstalationNo] = React.useState()
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0020545074'
  )
  const [currentDate, setcurrentDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())

  const [show1, setShow1] = React.useState(false)
  const[getBranchesData,setgetBranchesData]=React.useState()

   //Difference Between Two Dates 
   const date1 = Date.now();
   const date2 = new Date('12/31/2022');
   const diffTime = Math.abs(date2 - date1) / (1000);
   
   const stratTime = Date.now() / 1000; //   use UNIX timestamp in seconds
   const endTime = stratTime + diffTime // use UNIX timestamp in seconds
   const remainingTime = endTime - stratTime;
   const days = Math.ceil(remainingTime / daySeconds);
   const daysDuration = days * daySeconds;

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(() => {
    setTestGetInstallationNumber('0020545074')
    setLiveGetInstallationNumber2('0020545074')
    // GetInstallationNumberFunc()
  })
  const handleClose = () => setShow(false)
  const handleClose1 = () => setShow1(false)

  const _onChange = e => {
    setBranch(e.target.value)
  }
  const setAsDefault = () => {
    alert(branch)
  }
  const notify = () => {
    toast('License will expire at !')
  }
  const compareDate = async () => {

    let cook = await localStorage.getItem('cookie')
    let SAPapi = `LicenseService_GetInstallationNumber`
    await axios
      .post(`${LINKS.api}/GetLicenseApi`, {
        api: SAPapi,
        cookie: cook
      })
      .then(function (res) {
        console.log(res)
     if (Date.parse(currentComDate) > getDate ) {
      alert.error("License Expired")
      window.location.href="/DisabledHomeScreen";
    } else  if (res.data !==  LiveGetInstallationNumber2 ) {
      alert.error("Provided Key Does not match")
      // window.location.href="/DisabledHomeScreen";
    }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const GetCompanyDB = async (cook) => {
    let SAPapi = `Banks?$select=Code&$top=1`
    await axios
      .post(`${LINKS.api}/PassValue`, {
        api: SAPapi,
        cookie: cook
      })
      .then(function (res) {
        console.log(res)
       localStorage.setItem('CompanyDB', res.data);
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  React.useEffect(async () => {
    // notify()
    let cook = await localStorage.getItem('cookie')
    GetCompanyDB(cook)
    const show = await localStorage.getItem('ShowBranches')
    if (show == 'true') {
      setShow(true)
      setShow1(true)
      compareDate()
      await localStorage.removeItem('ShowBranches')
    }
  }, [setShow])
  // const Branch = async (cookie) => {
  //   // -------------------------    Branch API GET DATA   ------------------------------------------------------
  //   let ItemsResponseResult = {}
  //   const api = `${LINKS.api}/GetApi`
  //   let SAPapi = `sml.svc/ACTIVEBRANCHUWISE?$orderby=BPLId`;
  //   console.log(SAPapi);

  //   await axios
  //     .post(API_TYPES.GET, {
  //       api: SAPapi,
  //       cookie: cookie
  //     })
  //     .then(function (res) {
  //       // setgetBranchesData(res.data.value)
  //       let ItemsDropDown = []
  //       let users = [];
  //       res.data.value.forEach(element => {
  //         console.log(element)
  //          ItemsDropDown.push({
  //              value: element.BPLId,
  //              name: element.BPLId +" : "+element.BPLName
  //          })
  //          users.push({
  //             value: element.BPLId,
  //              name: element.BPLId +" : "+element.BPLName
  //         })
  //      });
  //     const result = [];
  //     const map = new Map();
  //     for (const item of users) {
  //         if(!map.has(item.value)){
  //             map.set(item.value, true);    // set any value to Map
  //             result.push({
  //                 value: item.value,
  //                 name: item.name
  //             });
  //         }
  //     }
  //     setgetBranchesData(result)
  //     })

  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
  const getdefaultbranch =(BPL_id)=>{
    // localStorage.setItem('BPLID',BPL_id);
    setShow(false)
  }

  return (
    <>      
    
      <Modal contentClassName="log1" show={show1} onHide={handleClose1} style={{padding:'2rem'}}>
        <Modal.Header className="Modal_Log" closeButton>
          {/* <Modal.Title>Select Default Branch</Modal.Title> */}
        </Modal.Header>
    
    <br/>
  <CardGroup style={{justifyContent:'center'}} >
 
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#7E2E84"]]}
        // style={{fontWeight:'bold'}}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) =>
          renderTime("days", getTimeDays(daysDuration - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#D14081"]]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("hours", getTimeHours(daySeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#4287f5"]]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#218380"]]}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("seconds", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
      <br/>
      <br/>
      <br/>
	  </CardGroup><br/>
    <h5 style={{textAlign:'center'}}> <b>This software is licensed to Coat_Serve (0020545074) - Production system - Expires on December 31th, 2022</b> </h5> 
    <br/>
      <br/>
    </Modal>
    </>
  )
}
export default Module
