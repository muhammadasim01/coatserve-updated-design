import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Table,
  Button,
  Container,
  Modal,
  Tabs,
  Tab,
  CardGroup,
} from "react-bootstrap";
import Styled from "styled-components";
import { CONSTANTS, LINKS } from "../../../Utils";
import { GrUpdate } from "react-icons/gr";
import NavBar from "../../../Component/Global/Navbar";
import { useAlert } from "react-alert";
import { MdDelete } from "react-icons/md";
const Authorization = () => {
  const alert = useAlert();
  const axios = require("axios");
  //------------------------Styled Component-----------------------
  const StyledDiv = Styled.div`
width:12rem;
`;
  //------------------------------Hooks-----------------------------
  const [activeuserdropdown, setactiveuserdropdown] = useState();
  const [getuser, setgetuser] = useState();
  const [getdocumentname, setgetdocumentname] = useState();
  const [buttonname, setbuttonname] = useState("OK");
  const [getdefultuser, setgetdefultuser] = useState();
  const [getdocentry, setgetdocentry] = useState();
  const [update, setUpdate] = React.useState(1);
  const [documentsarray, setdocumentsarray] = useState();
  //   const [documentsarray, setdocumentsarray] = useState([{label:"Purchase Request",value:"OPRQ"},{label:"Purchase Quotations",value:"OPQT"},{label:"Purchase Orders",value:"OPOR"},
  //   {label:"Goods Receipt PO",value:"OPDN"},{label:"A/P Invoices",value:"OPCH"},{label:"Landed Costs",value:"OIPF"},
  //   {label:"Sale Quotations",value:"OQUT"},{label:"Sale Orders",value:"ORDR"},{label:"A/R Invoice",value:"OINV"},
  //   {label:"Incoming Payments",value:"ORCT"},{label:"Outgoing Payments",value:"OVPM"}
  // ])
  //-------------UseEffect Hook--------------
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    Delete: `${LINKS.api}/DeleteApi`,
  };
  useEffect(async () => {
    let cook = await localStorage.getItem("cookie");
    let username = await localStorage.getItem("userName");
    setgetdefultuser(username);
    documentsequence();
    today();
    ActiveUsers(cook);
  }, []);
  //+++++++++++++++++++++++++_____Functions_____+++++++++++++++++++++++++++

  //---------API get functions--------
  const documentsequence = async () => {
    let docline = [];
    let obj = [
      { label: "Purchase Request", value: "OPRQ" },
      { label: "Purchase Quotations", value: "OPQT" },
      { label: "Purchase Orders", value: "OPOR" },
      { label: "Goods Receipt PO", value: "OPDN" },
      { label: "A/P Invoices", value: "OPCH" },
      { label: "A/P Down Payment", value: "ODPO" },
      { label: "Landed Costs", value: "OIPF" },
      { label: "Goods Return", value: "ORPD" },
      { label: "Delivery", value: "ODLN" },
      ,
      { label: "Returns", value: "ORDN" },
      { label: "Sale Quotations", value: "OQUT" },
      { label: "Sale Orders", value: "ORDR" },
      { label: "A/R Invoice", value: "OINV" },
      { label: "Incoming Payments", value: "ORCT" },
      { label: "Outgoing Payments", value: "OVPM" },
      { label: "Business Partner", value: "OCRD" },
      { label: "Activities", value: "OCLG" },
      ,
      { label: "Items", value: "OITM" },
      { label: "Goods Receipt", value: "OIGN" },
      { label: "Goods Issue", value: "OIGE" },
      { label: "Inventory Transfer", value: "OWTR" },
      { label: "Inventory Transfer Request", value: "OWTQ" },
      { label: "Production Order", value: "OWOR" },
      { label: "Journal Entry", value: "OJDT" },
    ];
    obj.forEach((element) => {
      docline[element.value] = {
        label: element.label,
        value: element.value,
      };
    });
    setgetdocumentname(docline);
    console.log("docline", docline);
  };
  const getauthorization = async (username) => {
    const cook = await localStorage.getItem("cookie");
    let SAPapi = `OPRM?$filter=U_UserCode eq '${username}'`;
    await axios
      .post(`${LINKS.api}/GetApi`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(async function (res) {
        if (res.data.value) {
          console.log(res.data.value);
          setdocumentsarray(res.data.value[0].PRM1Collection);
          setgetdocentry(res.data.value[0].DocEntry);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const ActiveUsers = async (cook) => {
    let array = [];
    await axios
      .post(API_TYPES.GET, {
        // api:`Users?$filter=UserCode eq 'c1984291' &$select=UserCode,UserName,InternalKey`,
        api: LINKS.sap.MasterData.ActiveUsers,
        cookie: cook,
      })
      .then((res) => {
        console.log(res);
        res.data.value.forEach((ele) => {
          array.push({
            value: ele.UserCode,
            label: ele.UserCode + " : " + ele.UserName,
            item: ele,
          });
        });
        setactiveuserdropdown(array);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //---------API POST functions--------
  const Submit = async () => {
    let body = {};
    let tabledata = documentsarray;
    let DocLines = [];
    console.log("tabledata", tabledata);
    tabledata.forEach((element) => {
      DocLines.push({
        U_FormId: element.U_FormId,
        U_Authorization: element.U_Authorization,
      });
    });
    body["PRM1Collection"] = DocLines;
    body["U_UserCode"] = getuser.UserCode;
    body["U_InternalKey"] = getuser.InternalKey;
    console.log("Patch Data", getdocentry, JSON.stringify(body));
    Patch(getdocentry, body);
  };
  const dropdownchnager = (e, index, name) => {
    let obj = documentsarray;
    obj[index][name] = e.value;
    obj[index]["EffectiveAuth"] = e.label;
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setbuttonname("Update");
    setUpdate(update + 1);
    console.log(obj);
    setdocumentsarray(obj);
  };
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `OPRM(${id})`,
          cookie: cook,
        })
        .then(function (res) {
          console.log(res);
          if (res.statusText === "OK") {
            alert.success("Operation completed successfully");
          } else {
            alert.error("res.data.error.message.value");
          }
        })
        .catch(function (error) {});
    }
  };
  const auth = [
    { label: "Full Authorization", value: "F" },
    { label: "Read-Only", value: "R" },
    { label: "No Authorization", value: "N" },
  ];
  const today = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    console.log("(year + " - " + month + " - " + day)", month);
  };
  //---------------------------------Reutrn--------------------------------
  return (
    <>
      <NavBar />
      {getdefultuser === "manager" || "admin" ? (
        <Container fluid>
          <h1 className="text-center">Authorizations</h1>
          <br />
          <div
            class="form-check form-check-inline"
            style={{ marginTop: "0.5rem" }}
          >
            <input
              class="form-check-input"
              name="N"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            />
            <label class="form-check-label" for="inlineCheckbox1">
              Hide Locked Users
            </label>
          </div>
          <br />
          <br />
          <label>Users</label>
          <div style={{ width: "23rem" }}>
            <Select
              onChange={(e) => {
                getauthorization(e.value);
                setgetuser(e.item);
              }}
              options={activeuserdropdown}
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ObjectType</th>
                  <th>Subject</th>
                  <th>Authorization</th>
                  <th>Effective Authorization</th>
                </tr>
              </thead>
              <tbody>
                {documentsarray &&
                  documentsarray.map((item, index) => (
                    <tr key={`${index}`}>
                      <td>{item.U_FormId}</td>
                      <td>{getdocumentname[item.U_FormId].label}</td>
                      <td>
                        {" "}
                        <div style={{ width: "23rem" }}>
                          {auth && (
                            <Select
                              value={auth.filter(
                                (option) => option.value == item.U_Authorization
                              )}
                              menuPortalTarget={document.body}
                              onChange={(e) => {
                                dropdownchnager(e, index, "U_Authorization");
                              }}
                              options={auth}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        {item.U_Authorization === "F"
                          ? "Full Authorization"
                          : item.U_Authorization === "N"
                          ? "No Authorization"
                          : item.U_Authorization === "R"
                          ? "Read-Only"
                          : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <Button style={{ margin: "2rem" }} onClick={Submit}>
            {buttonname}
          </Button>
          <Button variant="secondary">Cancel</Button>
        </Container>
      ) : (
        <h1>You are not permited to perform this action</h1>
      )}
    </>
  );
};
export default Authorization;
