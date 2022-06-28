import React from "react";
import Countdown from "react-countdown";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Login from "../../Screens/LoginScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "../../Screens/HomeScreen";
import { CardGroup } from "reactstrap";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { Modal, Table, TableHead, Button } from "react-bootstrap";
import { LINKS } from "../../Utils";
import "./goals.css";
import { useAlert } from "react-alert";
import disableHomePage from "../../Screens/disableHomeScreen";

import {
  PurchaseOrder,
  PurchaseQuotation,
  PurchaseRequests,
} from "../../Screens/PurchasingAP";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const axios = require("axios");
const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 5,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time" style={{ fontSize: "30px", textAlign: "center" }}>
        <b>{time}</b>
      </div>
      <div style={{ textAlign: "center" }}>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function Module(props) {
  let history = useHistory();
  const [currentComDate, setcurrentComDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );

  const [show, setShow] = React.useState(false);
  const [branch, setBranch] = React.useState(false);
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"));
  const [InstalationNo, setInstalationNo] = React.useState();
  const [TestGetInstallationNumber, setTestGetInstallationNumber] =
    React.useState("0020545074");
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] =
    React.useState("0020545074");
  const [currentDate, setcurrentDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const alert = useAlert();

  const [show1, setShow1] = React.useState(false);
  const [getBranchesData, setgetBranchesData] = React.useState();

  //Difference Between Two Dates
  const date1 = Date.now();
  const date2 = new Date("12/31/2022");
  const diffTime = Math.abs(date2 - date1) / 1000;
  const stratTime = Date.now() / 1000; //   use UNIX timestamp in seconds
  const endTime = stratTime + diffTime; // use UNIX timestamp in seconds
  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
  };
  // React.useEffect(async () => {
  //   // await localStorage.removeItem("AuthData");
  //   // await localStorage.removeItem("autobranches");
  //   setTestGetInstallationNumber("0020545074");
  //   setLiveGetInstallationNumber2("0020545074");
  //   // GetInstallationNumberFunc()
  // });
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const compareDate = async () => {
    let cook = await localStorage.getItem("cookie");
    let SAPapi = `LicenseService_GetInstallationNumber`;
    await axios
      .post(`${LINKS.api}/GetLicenseApi`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        if (Date.parse(currentComDate) > getDate) {
          alert.error("License Expired");
          window.location.href = "/DisabledHomeScreen";
        } else if (res.data !== LiveGetInstallationNumber2) {
          alert.error("Provided Key Does not match");
          // window.location.href="/DisabledHomeScreen";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const GetCompanyDB = async (cook) => {
    let SAPapi = `Banks?$select=Code&$top=1`;
    await axios
      .post(`${LINKS.api}/PassValue`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        localStorage.setItem("CompanyDB", res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(async () => {
    // notify()

    await localStorage.removeItem("AuthData");
    await localStorage.removeItem("autobranches");
    setTestGetInstallationNumber("0020545074");
    setLiveGetInstallationNumber2("0020545074");
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await localStorage.setItem("documentcontroller", "F");
      // checkoprm(cook);
      checkbranch(cook);
      GetCompanyDB(cook);
    }
    const show = await localStorage.getItem("ShowBranches");
    if (show == "true") {
      setShow(true);
      setShow1(true);
      compareDate();
      await localStorage.removeItem("ShowBranches");
    }
  }, [setShow]);
  const getauthorization = async (cook) => {
    const username = await localStorage.getItem("userName");
    let SAPapi = `OPRM?$filter=U_UserCode eq '${username}'`;
    await axios
      .post(`${LINKS.api}/GetApi`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(async function (res) {
        if (res.data.value) {
          console.log("abc", res.data.value);
          await localStorage.setItem(
            "AuthData",
            JSON.stringify(res.data.value[0].PRM1Collection)
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const checkoprm = async (cook) => {
    let SAPapi = `OPRM`;
    await axios
      .post(`${LINKS.api}/GetApi`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(async function (res) {
        console.log(res);
        if (res.data.value) {
          await getauthorization(cook);
        } else {
          await UserdefinedTable(cook);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const checkbranch = async (cook) => {
    let lines = [];
    let SAPapi = `BusinessPlaces?$select=BPLID,BPLName&$filter=Disabled eq 'tNO'&$orderby=BPLID`;
    await axios
      .post(`${LINKS.api}/GetApi`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(async function (res) {
        console.log(res);
        if (res.data.value) {
          res.data.value.forEach(async (element) => {
            lines.push({
              label: element.BPLID + " : " + element.BPLName,
              value: element.BPLID,
              item: element,
            });
          });
          console.log(lines);
          console.log(
            "branches set item",
            localStorage.getItem("autobranches")
          );
          await localStorage.setItem("autobranches", JSON.stringify(lines));
        } else {
          console.log("WithOut branches");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserdefinedTable = async (cook) => {
    let body = {
      TableName: "OPRM",
      TableDescription: "Authorization",
      TableType: "bott_Document",
    };

    let SAPapi = `UserTablesMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        // if(res.data.value){
        //   console.log(res.data.value)
        UserFieldsMDofheader(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserFieldsMDofheader = async (cook) => {
    let body = {
      Name: "UserCode",
      Type: "db_Alpha",
      Size: 10,
      Description: "UserCode",
      SubType: "st_None",
      TableName: "@OPRM",
    };
    let SAPapi = `UserFieldsMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        // if(res.data.value){
        //   console.log(res.data.value)
        UserFieldsMDofheader2(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserFieldsMDofheader2 = async (cook) => {
    let body = {
      Name: "UserName",
      Type: "db_Alpha",
      Size: 26,
      Description: "UserName",
      SubType: "st_None",
      TableName: "@OPRM",
    };
    let SAPapi = `UserFieldsMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        // if(res.data.value){
        //   console.log(res.data.value)
        UserFieldsMDofheader3(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserFieldsMDofheader3 = async (cook) => {
    let body = {
      Name: "InternalKey",
      Type: "db_Alpha",
      Size: 10,
      Description: "InternalKey",
      SubType: "st_None",
      TableName: "@OPRM",
    };
    let SAPapi = `UserFieldsMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        // if(res.data.value){
        //   console.log(res.data.value)
        UserTablesMDLines(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserTablesMDLines = async (cook) => {
    let body = {
      TableName: "PRM1",
      TableDescription: "AuthorizationLines",
      TableType: "bott_DocumentLines",
    };
    let SAPapi = `UserTablesMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        // if(res.data.value){
        //   console.log(res.data.value)
        UserFieldsMDLines(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserFieldsMDLines = async (cook) => {
    let body = {
      Name: "FormId",
      Type: "db_Alpha",
      Size: 10,
      Description: "FormId",
      SubType: "st_None",
      TableName: "@PRM1",
    };
    let SAPapi = `UserFieldsMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        // if(res.data.value){
        //   console.log(res.data.value)
        UserFieldsMDLines2(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserFieldsMDLines2 = async (cook) => {
    let body = {
      Name: "Authorization",
      Type: "db_Alpha",
      Size: 10,
      Description: "Authorization",
      SubType: "st_None",
      TableName: "@PRM1",
    };
    let SAPapi = `UserFieldsMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        // if(res.data.value){
        //   console.log(res.data.value)
        UserObjectsMD(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserObjectsMD = async (cook) => {
    let body = {
      Code: "OPRM",
      Name: "Authorization",
      TableName: "OPRM",
      ObjectType: "boud_Document",
      UserObjectMD_ChildTables: [
        {
          TableName: "PRM1",
          ObjectName: "PRM1",
        },
      ],
    };
    let SAPapi = `UserObjectsMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        // if(res.data.value){
        //   console.log(res.data.value)
        UserKeysMD(cook);
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UserKeysMD = async (cook) => {
    let body = {
      TableName: "@OPRM",
      KeyIndex: "1",
      KeyName: "IX_0",
      Unique: "tYES",
      UserKeysMD_Elements: [
        {
          ColumnAlias: "UserCode",
        },
      ],
    };

    let SAPapi = `UserKeysMD`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        // if(res.data.value){
        //   console.log(res.data.value)
        getusersdata(cook);
        // PostdatainOPRM(cook)
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getusersdata = async (cook) => {
    let SAPapi = `Users?$select=InternalKey,UserCode,UserName&$filter=Locked eq 'tNO' &$orderby=UserCode`;
    await axios
      .post(`${LINKS.api}/GetApi`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res.data.value);
        if (res.data.value) {
          res.data.value.forEach(async (element) => {
            await PostdatainOPRM(cook, element);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const PostdatainOPRM = async (cook, userdata) => {
    let body = {
      U_UserCode: userdata.UserCode,
      U_UserName: userdata.UserName,
      U_InternalKey: userdata.InternalKey,
      PRM1Collection: [
        {
          U_FormId: "OPRQ",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OPQT",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OPOR",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OPDN",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OPCH",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OIPF",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OQUT",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "ORDR",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OINV",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "ORCT",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OVPM",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "ODPO",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "ORPD",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "ODLN",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "ORDN",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OCRD",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OCLG",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OITM",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OIGN",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OIGE",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OWTR	",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OWTQ",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OWOR",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        {
          U_FormId: "OJDT",
          U_Authorization: userdata.UserCode === "manager" ? "F" : "N",
        },
        // { "U_FormId": "ORDN","U_Authorization":userdata.UserCode ==="manager" ? "F" : "N"},{ "U_FormId": "OCRD","U_Authorization":userdata.UserCode ==="manager" ? "F" : "N"}
      ],
    };
    console.log("body", body);
    let SAPapi = `OPRM`;
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res);
        // if(res.data.value){
        //   console.log(res.data.value)
        // }else{
        //   console.log(res.data.error.message)
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Modal
        contentClassName="log1"
        show={show1}
        onHide={handleClose1}
        style={{ padding: "2rem" }}
      >
        <Modal.Header className="Modal_Log" closeButton>
          {/* <Modal.Title>Select Default Branch</Modal.Title> */}
        </Modal.Header>

        <br />
        <CardGroup style={{ justifyContent: "center" }}>
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
              remainingTime - totalElapsedTime > hourSeconds,
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
              remainingTime - totalElapsedTime > minuteSeconds,
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
              remainingTime - totalElapsedTime > 0,
            ]}
          >
            {({ elapsedTime }) =>
              renderTime("seconds", getTimeSeconds(elapsedTime))
            }
          </CountdownCircleTimer>
          <br />
          <br />
          <br />
        </CardGroup>
        <br />
        <h5 style={{ textAlign: "center" }}>
          {" "}
          <b>
            This software is licensed to Coat_Serve (0020545074) - Production
            system - Expires on December 31th, 2022
          </b>{" "}
        </h5>
        <br />
        <br />
      </Modal>
    </>
  );
}
export default Module;
