import React from "react";
import { Button, Label } from "reactstrap";
import {Title, Wrapper} from "./style";
import { Typography ,Link } from '@material-ui/core';
import {
  useHistory,
} from "react-router-dom";
import { Logo, TextInput, Alert } from "../../Component/Global";
import { LINKS, CONSTANTS } from "../../Utils";
require('dotenv').config()

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https:aiotpl.com">
       AIoT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const axios = require("axios");
export default function Login() {
  const [loginData, setLoginData] = React.useState({});
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("Error Message");
  const [selectedOption, setselectedOption] = React.useState("SAP_UI");
  let history = useHistory();
  const Port =  process.env.PORT;
  const login =async () => {
    if (!loginData.userName && !loginData.password) {
      setAlertMessage(CONSTANTS.LoginScreen.Alert.EmptyData);
      setAlertShow(true);
      return;
    };
    if (!loginData.userName) {
      setAlertMessage("Username is required * ");
      setAlertShow(true);
      return;
    };
    if (!loginData.password) {
      setAlertMessage("Password is required * ");
      setAlertShow(true);
      return;
    };
   await loginApiCall(loginData.userName, loginData.password);
   await loginApiCall2(loginData.userName, loginData.password);
   await loginApiCall3(loginData.userName, loginData.password);
  };
  const loginApiCall3 = async (UserName, Password) => {
    const body = { UserName, Password };
    const api = `${LINKS.api}/SecondDBLogin`;
    await axios
      .post(api, body)
      .then(async function (response) {
        if (!response) return;
        if (response.data.body.SessionId) {
          var resp = response.data.headers["set-cookie"];
          var cook = "";
          resp.forEach((element) => {
            cook = cook + element.replace("HttpOnly;", "");
          });
          if (cook) {
            await localStorage.setItem('secondcookie', cook);
            await localStorage.setItem('userName', UserName);
            await localStorage.setItem('ShowBranches', true);
            history.replace("/Home");
            // window.location.href="/Home";
          }
        } else {
          setAlertMessage(response.data.body.error.message);
          setAlertShow(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const loginApiCall2 = async (UserName, Password) => {
    const body = { UserName, Password };
    const api = `${LINKS.api}/PreviewLogin`;
    await axios
      .post(api, body)
      .then(async function (response) {
        if (!response) return;
        if (response.data.body.SessionTimeout) {
          var resp = response.data.headers["set-cookie"];
          var cook2 = "";
          resp.forEach((element) => {
            cook2 = cook2 + element.replace("Path=/; Secure; HttpOnly; SameSite=Lax", "");
          });
          if (cook2) {
            await localStorage.setItem('cookiee', cook2);
            await localStorage.setItem('userName', UserName);
            // window.location.href="/Home";
          }
        } else {
          setAlertMessage(response.data.body.message.value);
          setAlertShow(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const loginApiCall = async (UserName, Password) => {
    const body = { UserName, Password };
    const api = `${LINKS.api}/Login`;
    await axios
      .post(api, body)
      .then(async function (response) {
        console.log(response)
        if (!response) return;
        if (response.data.body.SessionId) {
          var resp = response.data.headers["set-cookie"];
          var cook = "";
          resp.forEach((element) => {
            cook = cook + element.replace("HttpOnly;", "");
          });
          if (cook) {
            await localStorage.setItem('cookie', cook);
            await localStorage.setItem('userName', UserName);
            await localStorage.setItem('ShowBranches', true);
            history.replace("/Home");
            // window.location.href="/Home";
          }
        } else {
          setAlertMessage(response.data.body.error.message);
          setAlertShow(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const inputChange = (e) => {
    let data = loginData;
    data[e.target.name] = e.target.value;
    setLoginData(data);
  };
  const onValueChange = (e) =>{
    setselectedOption(e.target.value)
    if(e.target.value === "CRM"){
      window.location.href="http://localhost:3002/#/"
    }else{
      // window.location.href="http://localhost:3000"
    }
  }
  return (
    <Wrapper>
      <Logo />
      <>
        <Title>{CONSTANTS.LoginScreen.TextBox.UserName}</Title>
        <TextInput
          onChange={(e) => {
            inputChange(e);
          }}
          type="text"
          name={CONSTANTS.LoginScreen.InputFields.userName}
          placeholder={CONSTANTS.LoginScreen.InputFields.userNamePlaceholder}
        />
        <Title>{CONSTANTS.LoginScreen.TextBox.Password}</Title>
        <TextInput
          onChange={(e) => {
            inputChange(e);
          }}
          onKeyPress={(e) => {
            if(e.key === 'Enter'|| e.key === 'NumpadEnter'){
              login();
            }
          }}
          type="password"
          name={CONSTANTS.LoginScreen.InputFields.password}
          placeholder={CONSTANTS.LoginScreen.InputFields.passwordPlaceholder}
        />
      <div  class="form-check form-check-inline" style={{marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='N'  type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Logon with Windows Account</label>
              </div>
        <Button
         style={{marginTop:'8%'}}
         className="btn btn-primary btn-block"
          onClick={() => {
            login();
          }}
        >
          {CONSTANTS.LoginScreen.Buttons.Login}
        </Button> 
        <Copyright style={{marginTop:'4rem',color:'gray'}} />
        <>
          <Alert
            show={alertShow}
            onHide={() => setAlertShow(false)}
            alertMessage={alertMessage}
          />
        </>
      </>
    </Wrapper>
  );
}
