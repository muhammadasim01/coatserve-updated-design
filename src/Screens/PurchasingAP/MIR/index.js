import React from "react";
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Row,
  Tab,
  Tabs,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import Select from "react-select";
import "./index.css";
import { useAlert } from "react-alert";
import { Navbar } from "../../../Component/Global";
import {
  Attachment,
  Logistics,
  Accounting,
} from "../../../Component/APDownPaymentRequest";
import { CONSTANTS, LINKS } from "../../../Utils";
import { useSelector } from "react-redux";

import { InputR, InputD, DIV3, DIV4, TD, TableHead } from "./Style";
const axios = require("axios");

export default function MIR() {
  const redux_response = useSelector((state) => state.colorReducer);

  const alert = useAlert();
  const [ChangeRuleCodeDisc, setChangeRuleCodeDisc] = React.useState();
  const [ChangeRuleCode, setChangeRuleCode] = React.useState();
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"));
  const [TestGetInstallationNumber, setTestGetInstallationNumber] =
    React.useState("0020545074");
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] =
    React.useState("0021105591");

  const [currentComDate, setcurrentComDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState();
  const [MIRtype, setMIRtype] = React.useState();
  const [bothbodies, setbothbodies] = React.useState(false);
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [RemarksValue, setRemarksValue] = React.useState();
  const [ResultValue, setResultValue] = React.useState();
  const [TableDiscription, setTableDiscription] = React.useState();
  const [getdocumenttype, setgetdocumenttype] = React.useState("22");
  const [getdocumentname, setgetdocumentname] = React.useState("MIR2");
  const [ModuleName, setModuleName] = React.useState("OMIR");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [RemainingQty, setRemainingQty] = React.useState();
  const [ApprovedQty, setApprovedQty] = React.useState(0);
  const [ButtonName, setButtonName] = React.useState("Add");
  const [RejectQty, setRejectQty] = React.useState(0);
  const [MIRDocumentLines, setMIRDocumentLines] = React.useState([]);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [Code, setCode] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [Bra, setBra] = React.useState();
  const [CheckindRuleCodeDropDoen, setCheckindRuleCodeDropDoen] =
    React.useState();
  const [PrVendor, setPrVendor] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [PQHeaderData, setPQHeaderData] = React.useState();
  const [show, setShow] = React.useState(false);
  const [showA, setShowA] = React.useState(false);

  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [SelectedItems, setSelectedItems] = React.useState();
  const [prList, setPrList] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [ReqType, setReqType] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState("0");
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [Grpo, setGrPo] = React.useState();
  const [Pq, setPq] = React.useState();

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  };
  React.useEffect(() => {
    setTestGetInstallationNumber("0020545074");
    setLiveGetInstallationNumber2("0021105591");
    // GetInstallationNumberFunc()
  });
  React.useEffect(async () => {
    today();
    compareDate();
    await setgetdocumentname("MIR2");
    await setModuleName("OMIR");
    await setgetdocumenttype("OMIR");
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    if (showA == "true") {
      setShowA(true);
      // setShow1(true)
      compareDate();
      await localStorage.removeItem("ShowBranches");
    }
    if (cook) {
      GetItems(cook);
      BusinessPartners(cook);
      CheckingCode(cook);
    }
  }, []);
  const Home = () => {
    const alert = useAlert();
  };
  const selectPR = async (item) => {
    setShow(false);
    setSelectedPRDocEntry(item);
    setMIRDocumentLines(item);
  };

  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `OMIR(${id})`,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success("Operation completed successfully");
            window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const compareDate = async () => {
    let cook = await localStorage.getItem("cookie");
    let SAPapi = `LicenseService_GetInstallationNumber`;
    await axios
      .post(`${LINKS.api}/GetLicenseApi`, {
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        if (Date.parse(currentComDate) > getDate) {
          alert.error("License Expired");
          window.location.href = "/DisabledHomeScreen";
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const today = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    setcurrentDate(year + "-" + month + "-" + day);
    // console.log("Today",currentDate)
  };

  const submitPatchMIR = async () => {
    let body = {};
    let DocLines = [];
    // PQDocumentLines.forEach(element => {
    DocLines.push({
      U_RuleCode: ChangeRuleCode,
      U_RuleDesc: ChangeRuleCodeDisc,
      U_Result: ResultValue,
      U_Comments: RemarksValue,
      // })
    });
    body["MIR1Collection"] = DocLines;
    body["U_Attachment"] = attachmentresponse;
    Patch(PQHeaderData.DocEntry, body);
  };

  const handleShow = async () => {
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `OIGP?$filter=Status eq 'O' and U_CardCode eq '${PrVendor}'`;
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie,
      })
      .then(function (res) {
        setPrRe(res.data.value[0].IGP1Collection);
      })
      .catch({});

    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const VendorChange = (e) => {
    setPrVendor(e.value);
  };
  const CheckingCode = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.OMIR.CheckingRule,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Code + " : " + element.Name,
            });
          });
          setCheckindRuleCodeDropDoen(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetItems = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseQuotation.purchaseItems,
        cookie: cookie,
      })
      .then(function (ItemsResponse) {
        ItemsResponseResult = ItemsResponse;
      })
      .catch(function (error) {
        console.log(error);
      });
    let res = apiProcessing(ItemsResponseResult);
    if (res) {
      let ItemsDropDown = [];
      let ItemsDetails = [];

      res.forEach((element) => {
        ItemsDetails[element.ItemCode] = {
          ItemCode: element.ItemCode,
          ItemName: element.ItemName,
          PurchaseUnit: element.PurchaseUnit,
          Quantity: 1,
        };
        ItemsDropDown.push({
          id: element.ItemCode,
          name: element.ItemCode + " : " + element.ItemName,
        });
      });
      await setItemsDropDown(ItemsDropDown);
      await setItemsDetails(ItemsDetails);
    }
  };

  const BusinessPartners = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveVendor, cookie: cookie }
      )
      .then(function (res) {
        setGrPo(res.data.value);
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardCode + " : " + element.CardName,
            });
          });
          setVendorCodeDropdown(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GetRequesterDetail = async (cookie, api) => {
    let response = {};

    // -------------------------    Items API GET DATA   -----------------------------------------------------------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (res) {
        response = res;
      })
      .catch(function (error) {
        console.log(error);
      });
    let res = apiProcessing(response);
    if (res) {
      let dropdown = [];
      res.forEach((element) => {
        if (element.UserCode) {
          dropdown.push({ id: element.UserCode, name: element.UserName });
        } else {
          dropdown.push({
            id: element.EmployeeID,
            name:
              element.FirstName +
              "  " +
              element.MiddleName +
              "  " +
              element.LastName,
          });
        }
      });
      await setRequesterCodeDropdown(dropdown);
      await setItemsDetails(ItemsDetails);
    }
  };

  const apiProcessing = (res) => {
    if (res) {
      if (res.data.value) {
        return res.data.value;
      } else {
        alert.error(
          `Items Details Response Error : <-- ${res.data.error.message.value} -->`
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        return null;
      }
    }
  };

  const ItemsDropDownfunc = async (selectedList, selectedItem) => {
    let list = [];
    selectedList.forEach((element) => {
      list.push(element.data.value);
    });
    await setSelectedItems(list);
  };
  const requesterDropDownfunc = async (selectedList, selectedItem) => {
    let prBody = PRBody;
    prBody["ReqType"] = `${selectedList[0].id}`;
    setPRBody(prBody);

    let api = "";
    if (selectedList[0].id === 109) {
      api = LINKS.sap.PurchaseQuotation.Vendor;
    } else {
      api = LINKS.sap.PurchaseQuotation.users;
    }
    let cook = await localStorage.getItem("cookie");
    if (cook) GetRequesterDetail(cook, api);
  };
  const RequesterCodeDropdownfunc = async (selectedList, selectedItem) => {
    let prBody = PRBody;
    prBody["Vendor"] = `${selectedList[0].id}`;
    setPRBody(prBody);
  };

  const RequiredQuantity = (e, item) => {
    let reqQuantity = ItemsDetails;
    reqQuantity[item][e.target.name] = parseInt(e.target.value);

    setItemsDetails(reqQuantity);
  };

  const MIR = async () => {
    let DocLines = [];
    let body = PRBody;
    PQDocumentLines.forEach((element) => {
      DocLines.push({
        DocEntry: element.DocEntry,
        LineId: element.LineId,
        U_RuleCode: element.RuleCode,
        U_RuleDesc: element.RuleDesc,
        U_Result: element.Result,
        U_Comments: element.Comment,
      });
    });
    body["U_Type"] = MIRtype;
    body["Remark"] = SelectedPRDocEntry.Remark;
    body["U_BaseEntry"] = MIRDocumentLines.DocEntry;
    body["U_BaseRef"] = SelectedPRDocEntry.DocNum;
    body["U_ItemCode"] = MIRDocumentLines.U_ItemCode;
    body["U_PONum"] = MIRDocumentLines.U_BaseNum;
    body["U_POLineNum"] = MIRDocumentLines.U_BaseLine;
    body["U_Dscription"] = MIRDocumentLines.U_Dscription;
    body["U_unitMsr"] = MIRDocumentLines.U_unitMsr;
    body["U_Quantity"] = MIRDocumentLines.U_Quantity;
    body["U_BaseLine"] = MIRDocumentLines.LineId;
    body["MIR1Collection"] = DocLines;
    body["U_AQuantity"] = ApprovedQty;
    body["U_BaseType"] = "IGP";
    // body['Series'] = getseriesvalue
    body["U_RQuantity"] = RejectQty;
    // body['U_Attachment'] = SelectedPRDocEntry.DocDate
    body["U_IGPQuantity"] = MIRDocumentLines.U_Quantity;
    body["U_Attachment"] = attachmentresponse;
    // body['U_PONum'] = SelectedPRDocEntry.DocDate
    if (bothbodies) {
      PostInSecondDB(body);
    } else {
      PostInFirstDB(body);
    }
  };
  const PostInFirstDB = async (body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.OMIR.MaterialInspection,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success("Operation completed successfully");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            alert.error(JSON.stringify(res.data.error.message));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const PostInSecondDB = async (body) => {
    let cook = await localStorage.getItem("secondcookie");
    if (cook) {
      await axios
        .post(API_TYPES.SECONDPOST, {
          body: JSON.stringify(body),
          api: LINKS.sap.OMIR.MaterialInspection,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            PostInFirstDB(body);
            // alert.success('Operation completed successfully')
            // setTimeout(() => {
            //   // window.location.reload();
            // }, 3000);
          } else {
            alert.error(JSON.stringify(res.data.error.message));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset();
    Dropdown.reset();
  };
  const DropDownValue = (e) => {
    setResultValue(e.value);
  };

  const TableTextChangeFun = (e) => {
    setTableDiscription(e.target.value);
  };
  const TextChangeFun = (e) => {};
  const ontextItemChanged = (e) => {
    setTextItemChangedObject(e.target.value);
  };
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === "0") {
      SearchPRNumberAll();
    } else {
      SearchPRNumberFilter();
    }
  };
  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `OMIR`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setModalHeaderData(res.data.value);
        if (ModalHeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});

    setShow1(true);
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `OMIR?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setPQDocumentLines(res.data.value[0].MIR1Collection);
        setPQHeaderData(res.data.value[0]);
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        if (PQHeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});
  };
  const ApprovedQtyFun = (e) => {
    if (e.target.value > MIRDocumentLines.U_Quantity) {
      alert.error("Enter Value Equal to IGP_Quantity");
    } else if (e.target.value < MIRDocumentLines.U_Quantity) {
      alert.error("Enter Value Equal to IGP_Quantity");
    } else if (e.target.value == MIRDocumentLines.U_Quantity) {
      alert.success("Value added Suucessfully");
    }
  };
  const verifyvalue = (e) => {
    if (
      Number(e.target.value) + Number(RejectQty) >
      MIRDocumentLines.U_Quantity
    ) {
      alert.error("Enter Value Equal to IGP_Quantity");
    } else if (
      Number(e.target.value) + Number(RejectQty) <
      MIRDocumentLines.U_Quantity
    ) {
      alert.error("Enter Value Equal to IGP_Quantity");
    } else if (
      Number(e.target.value) + Number(RejectQty) ==
      MIRDocumentLines.U_Quantity
    ) {
      alert.success("Value added Suucessfully");
    }
  };
  const verifyvalue2 = (e) => {
    if (
      Number(e.target.value) + Number(ApprovedQty) >
      MIRDocumentLines.U_Quantity
    ) {
      alert.error("Enter Value Equal to IGP_Quantity");
    } else if (
      Number(e.target.value) + Number(ApprovedQty) <
      MIRDocumentLines.U_Quantity
    ) {
      alert.error("Enter Value Equal to IGP_Quantity");
    } else if (
      Number(e.target.value) + Number(ApprovedQty) ==
      MIRDocumentLines.U_Quantity
    ) {
      alert.success("Value added Suucessfully");
    }
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      MIR();
    } else if (ButtonName != "Add") {
      submitPatchMIR();
    }
  };
  const gettabledata = (e, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[name] = e.value;
    setPQDocumentLines(itemDetail);
  };
  const getinputtabledata = (e) => {
    let itemDetail = PQDocumentLines;
    itemDetail[e.target.name] = e.target.value;
    setPQDocumentLines(itemDetail);
  };
  const getseriesvaluefunction = async (e) => {
    if (e.item.Name == "2") {
      setbothbodies(false);
      setgetseriesvalue(e.item.Series);
      setgetnextnumber(e.item.NextNumber);
    } else if (e.item.Name == "1") {
      setbothbodies(true);
      setgetseriesvalue(e.item.Series);
      setgetnextnumber(e.item.NextNumber);
    }
  };
  return (
    <>
      <style>{`
            .nav-tabs .nav-link{
              color: white !important;
              background-color: ${
                redux_response.color ? redux_response.color : "rgb(69 70 73)"
              } !important;  
              width: 12rem  !important;
              height: 24px !important;
              padding: 0 !important;
              text-align: center !important;
            }
           
               
          `}</style>
      <Navbar
        setgetserviceseries={setgetserviceseries}
        getdocumentname={getdocumentname}
        getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
      />
      <h1 style={{ textAlign: "center" }}>Material Inspection Report </h1>
      {/* Upper Side++++++++ */}

      <div className="main_container">
        <div className="left">
          <div className="header_items_container">
            <label>Vendor</label>
            <Select
              placeholder={
                (SelectedPRDocEntry && SelectedPRDocEntry.CardCode) ||
                (PQHeaderData && PQHeaderData.CardCode)
              }
              options={VendorCodeDropdown} // Options to display in the dropdown
              onChange={(e) => {
                VendorChange(e);
              }} // Function will trigger on select event
              // onRemove={BusinessPartners} Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            className="Modal-big"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Open Inward Gate Pass List
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {PrRe && (
                <Table responsive>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>DocNum</th>
                      <th>Item Name</th>
                      <th>Item Discription</th>
                      <th>Base Type</th>
                      <th>Unit Of Measure</th>
                      <th>IGP Quantity</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {PrRe.map((item, index) => (
                      <tr
                        key={`${index}`}
                        onClick={(e) => {
                          selectPR(item);
                          handleClose();
                        }}
                      >
                        <TD>{index + 1}</TD>
                        <TD>{item.U_BaseEntry}</TD>
                        <TD>{item.U_ItemCode}</TD>
                        <TD>{item.U_Dscription}</TD>
                        <TD>{item.U_BaseType}</TD>
                        <TD>{item.U_unitMsr}</TD>
                        <TD>{item.U_OpenQty}</TD>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={show1} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Open GRPO List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {ModalHeaderData && (
                <Table responsive>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Document Status</th>
                      <th>DocNum</th>
                      <th>DocEntry</th>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Posting Date</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {ModalHeaderData.map((item, index) => (
                      <tr key={`${index}`}>
                        <TD>
                          {index + 1}
                          <Button
                            onClick={(e) => {
                              selectPR(item);
                              handleClose2();
                            }}
                          >
                            Select
                          </Button>
                        </TD>
                        <TD>
                          {item.DocumentStatus === "bost_Open" ? (
                            <p style={{ background: "gray", color: "white" }}>
                              Open
                            </p>
                          ) : item.DocumentStatus === "bost_Close" ? (
                            <p style={{ background: "red", color: "white" }}>
                              Closed
                            </p>
                          ) : null}
                        </TD>

                        <TD>{item.DocNum}</TD>
                        <TD>{item.DocEntry}</TD>
                        <TD>{item.CardCode}</TD>
                        <TD>{item.CardName}</TD>
                        <TD>{item.DocDate}</TD>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose2}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="header_items_container">
            <label>IGP No.</label>
            <input
              defaultValue={
                (SelectedPRDocEntry && SelectedPRDocEntry.DocEntry) ||
                (PQHeaderData && PQHeaderData.DocEntry)
              }
              type="number"
              class="input"
              id="vendor"
              aria-describedby="emailHelp"
              readOnly
            ></input>
          </div>

          <div className="header_items_container">
            <label>PO Number</label>
            <input
              defaultValue={
                (MIRDocumentLines && MIRDocumentLines.U_BaseEntry) ||
                (PQHeaderData && PQHeaderData.U_BaseEntry)
              }
              type="number"
              class="input"
              readOnly
              id="RefNum"
              aria-describedby="emailHelp"
              // onChange={e => {
              //     TextChangeFun(e)
              //   }}
            ></input>
          </div>
          <div className="header_items_container">
            <label>Unit Of Measure</label>
            <input
              value={
                (MIRDocumentLines && MIRDocumentLines.U_unitMsr) ||
                (PQHeaderData && PQHeaderData.U_unitMsr)
              }
              type="text"
              class="input"
              id="UoM"
              aria-describedby="emailHelp"
              readOnly
            ></input>
          </div>
          <div className="header_items_container">
            <label>Inspected Quantity</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="number"
              class="input"
              id="InspectedQty"
              aria-describedby="emailHelp"
              // placeholder={PQHeaderData && PQHeaderData.U_AQuantity}
              //value={InspectedQty}
              onChange={(e) => {
                ApprovedQtyFun(e);
              }}
            ></input>
          </div>
          <div className="header_items_container">
            <label>Approved Quantity</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="number"
              class="input"
              id="TimeOut"
              aria-describedby="emailHelp"
              value={ApprovedQty}
              defaultValue={
                (MIRDocumentLines && MIRDocumentLines.U_AQuantity) ||
                (PQHeaderData && PQHeaderData.U_AQuantity)
              }
              onChange={(e) => {
                setApprovedQty(e.target.value);
                verifyvalue(e);
              }}
            ></input>
          </div>
        </div>

        <div className="right">
          <div className="header_items_container">
            <label>No.</label>
            <div className="innerpart">
              <select
                className="select_inner"
                name=""
                id=""
                onChange={(e) => {
                  getseriesvaluefunction(e);
                  // Whse(e.item.Name);
                }}
                displayValue="name"
              >
                {getserviceseries
                  ? getserviceseries.map((e) => (
                      <option value={e.value}>{e.label}</option>
                    ))
                  : ""}
              </select>
              <div className="number_inner">
                <input
                  type="number"
                  name="Discount"
                  readOnly
                  value={getnextnumber}
                  placeholder=""
                  class=""
                />
              </div>
            </div>
          </div>
          <div className=" MIR header_items_container">
            <a
              onClick={(e) => {
                SearchAll_Filter_Data();
              }}
              style={{ cursor: "pointer" }}
            >
              {" "}
              <svg class="svg-icon16" viewBox="0 0 20 20">
                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
              </svg>
            </a>
            <input
              name={"SearchPRNumber"}
              type="Number"
              placeholder="Number"
              class="input"
              onChange={(e) => {
                setSearchNumber(e.target.value);
              }}
            />
          </div>
          {/* <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
              <label>Document No</label>
              <input
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocNum?PQHeaderData && PQHeaderData.DocNum:null}
                type='number'
                readOnly
                class='form-control'
                id='vendorCode'
                aria-describedby='emailHelp'
                placeholder=''
                onChange={e => {
                  TextChangeFun(e)
                }}
              ></input>
            </div> */}
          <div className="header_items_container">
            <label>MIR Type</label>
            <div>
              <Select
                placeholder={PQHeaderData && PQHeaderData.U_Type}
                options={[
                  { label: "0 - Out Source Material", value: 0 },
                  { label: "1 - In House Material", value: 1 },
                ]}
                onChange={(e) => {
                  setMIRtype(e.value);
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="header_items_container">
            <label>IGP Row #</label>
            <input
              defaultValue={
                (MIRDocumentLines && MIRDocumentLines.LineId) ||
                (PQHeaderData && PQHeaderData.LineId)
              }
              type="number"
              class="input"
              id="IGPRowNo"
              aria-describedby="emailHelp"
              readOnly
            ></input>
          </div>
          <div className="header_items_container">
            <label>Item</label>
            <input
              defaultValue={
                (MIRDocumentLines &&
                  MIRDocumentLines.U_ItemCode + " : " + MIRDocumentLines &&
                  MIRDocumentLines.U_Dscription) ||
                (PQHeaderData &&
                  PQHeaderData.U_ItemCode + " : " + PQHeaderData &&
                  PQHeaderData.U_Dscription)
              }
              type="text"
              class="input"
              id="IGPRowNo"
              aria-describedby="emailHelp"
            ></input>
          </div>
          <div className="header_items_container">
            <label>IGP Quantity</label>
            <input
              // value={}
              type="text"
              class="input"
              id="VehicleNum"
              aria-describedby="emailHelp"
              readOnly
              defaultValue={
                (PQHeaderData && PQHeaderData.U_IGPQuantity) ||
                (MIRDocumentLines && MIRDocumentLines.U_Quantity)
              }
              // onClick={e => {
              //     ApprovedQtyFun()
              //   }}
            ></input>
          </div>
          <div className="header_items_container">
            <label>Rejected Quantity</label>
            <input
              type="number"
              class="input"
              id="RejectedQty"
              aria-describedby="emailHelp"
              defaultValue={
                (PQHeaderData && PQHeaderData.U_RQuantity) ||
                (MIRDocumentLines && MIRDocumentLines.U_RQuantity)
              }
              placeholder=""
              onChange={(e) => {
                setRejectQty(e.target.value);
                verifyvalue2(e);
              }}
            ></input>
          </div>
          {/* <button onClick={ApprovedQtyFun}>..</button> */}
          {/* <br/>
            <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e => setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
        </div>
      </div>
      {/* Table+++++++++ */}
      <Tabs
        defaultActiveKey="Contents"
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="Contents" title="Contents">
          {/* {MIRDocumentLines && ( */}
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Checking Rule Code</th>
                <th>Checking Rule Discription</th>
                <th>Result</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {/* {MIRDocumentLines.map((item, index) => ( */}
              <tr>
                <td> 1</td>
                <td>
                  <div style={{ width: "20rem", height: "3rem" }}>
                    <Select
                      // placeholder={item.U_RuleCode}
                      options={CheckindRuleCodeDropDoen} // Options to display in the dropdown
                      onChange={(e) => {
                        gettabledata(e, "RuleCode");
                      }} // Function will trigger on select event
                      // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                </td>
                <td>
                  <input
                    style={{ width: "20rem", height: "3rem" }}
                    type="text"
                    class="form-control"
                    onChange={(e) => {
                      gettabledata(e, "RuleDesc");
                    }}
                    name="U_RuleDesc"
                    // defaultValue={item.U_RuleDesc}
                  ></input>
                </td>
                <td>
                  <div style={{ width: "20rem", height: "3rem" }}>
                    <Select
                      // defaultValue={item.U_Result}
                      options={[
                        { label: "0 - No", value: 0 },
                        { label: "1 - Yes", value: 1 },
                      ]}
                      onChange={(e) => {
                        gettabledata(e, "Result");
                      }} // Function will trigger on select event
                      // onRemove={BusinessPartners} Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                </td>
                <td>
                  <input
                    class="form-control"
                    style={{ width: "20rem", height: "3rem" }}
                    type="text"
                    // value={TotalGross}
                    name="Comment"
                    // defaultValue={item.U_Comments}
                    onChange={(e) => {
                      getinputtabledata(e);
                    }}
                  />
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </Table>
          {/* )} */}
        </Tab>
        {/* <Tab eventKey="Logistics" title="Logistics">
        <Logistics/>
      </Tab>
      <Tab eventKey="Accounting" title="Accounting">
        <Accounting/>
      </Tab>
      <Tab eventKey="Attachment" title="Attachment">
        <Attachment
      setattachmentresponse={setattachmentresponse}
        />
      </Tab> */}
      </Tabs>

      {/* Bottom Side+++++++++ */}
      <div className="main_container">
        <div className="left">
          <div className="header_items_container">
            <label>Remarks</label>

            <textarea
              defaultValue={
                (SelectedPRDocEntry && SelectedPRDocEntry.Remark) ||
                (PQHeaderData && PQHeaderData.Remark)
              }
              type="text"
              class="textArea"
              id="TimeOut"
              aria-describedby="emailHelp"
              onChange={(e) => {
                TextChangeFun(e);
              }}
            ></textarea>
          </div>
        </div>
      </div>
      {localStorage.getItem("documentcontroller") === "R" ? (
        <div className="button_main_container">
          <div className="button_container">
            <button
              onClick={() => {
                window.location.href = "/Home";
              }}
              className="form_button"
              style={{ backgroundColor: `${redux_response.color}` }}
            >
              OK
            </button>
            <button
              variant="secondary"
              onClick={() => {
                window.location.href = "/Home";
              }}
              className="form_button"
              style={{ backgroundColor: `${redux_response.color}` }}
            >
              Cancel
            </button>
          </div>
          <div className="button_container">
            <button
              style={{ backgroundColor: `${redux_response.color}` }}
              className="form_button"
              onClick={handleShow}
            >
              Copy From
            </button>{" "}
            <button
              style={{ backgroundColor: `${redux_response.color}` }}
              className="form_button"
            >
              Copy To
            </button>
          </div>
        </div>
      ) : (
        <div className="button_main_container">
          <div className="button_container">
            <button
              onClick={() => {
                Submit_PatchFunc();
              }}
              className="form_button"
              style={{ backgroundColor: `${redux_response.color}` }}
            >
              {ButtonName}
            </button>
            <button
              variant="secondary"
              onClick={() => {
                window.location.href = "/Home";
              }}
              className="form_button"
              style={{ backgroundColor: `${redux_response.color}` }}
            >
              Cancel
            </button>
          </div>
          <div className="button_container">
            <button
              style={{ backgroundColor: `${redux_response.color}` }}
              className="form_button"
              onClick={handleShow}
            >
              Copy From
            </button>
            <button
              style={{ backgroundColor: `${redux_response.color}` }}
              className="form_button"
            >
              Copy To
            </button>
          </div>
        </div>
      )}
    </>
  );
}
