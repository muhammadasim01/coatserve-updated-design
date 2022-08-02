import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Tabs,
  Tab,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";

import { Attachment } from "../../../Component/APDownPaymentRequest";
import { CONSTANTS, LINKS } from "../../../Utils";
import { Logo, TextInput, Alert, Navbar } from "../../../Component/Global";
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAlert } from "react-alert";
import "./index.css";
import Select from "react-select";
import Switch from "react-switch";
import { useSelector } from "react-redux";

const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function OIGP() {
  const redux_response = useSelector((state) => state.colorReducer);

  const alert = useAlert();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [LineRemarks, setLineRemarks] = React.useState([]);
  const [SearchNumber, setSearchNumber] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [showA, setShowA] = React.useState(false);

  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [Quantity, setQuantity] = React.useState([]);
  const [Textchange, setTextchange] = React.useState([]);
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState([]);
  const [CustomerDropDown, setCustomerDropDown] = React.useState([]);
  const [TimeOutChange, setTimeOutChange] = React.useState([]);
  const [TimeChange, setTimeChange] = React.useState([]);
  const [ContactNo, setContactNo] = React.useState([]);
  const [CNIC, setCNIC] = React.useState([]);
  const [currentDate, setcurrentDate] = React.useState();
  const [DriverName, setDriverName] = React.useState([]);
  const [VahicalNo, setVahicalNo] = React.useState([]);
  const [RefNo, setRefNo] = React.useState([]);
  const [DropDown, setDropDown] = React.useState([]);
  const [BaseNum, setBaseNum] = React.useState([]);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [getStatus, setgetStatus] = React.useState();
  const [PrVendorValue, setPrVendorValue] = React.useState();
  const [PrVendorName, setPrVendorName] = React.useState();
  const [SelectShow, setSelectShow] = React.useState();
  const [show, setShow] = React.useState(false);
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [SelectedItems, setSelectedItems] = React.useState();
  const [prList, setPrList] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [ButtonName, setButtonName] = React.useState();
  const [getdocumenttype, setgetdocumenttype] = React.useState("22");
  const [getdocumentname, setgetdocumentname] = React.useState("IGP2");
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"));
  const [TestGetInstallationNumber, setTestGetInstallationNumber] =
    React.useState("0020545074");
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] =
    React.useState("0021105591");
  const [bothbodies, setbothbodies] = React.useState(false);

  const [currentComDate, setcurrentComDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [ModuleName, setModuleName] = React.useState("OIGP");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [HeaderData, setHeaderData] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [getDocDate, setgetDocDate] = React.useState();
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();

  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [Grpo, setGrpo] = React.useState();
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
    await setgetdocumentname("POR2");
    await setModuleName("OIGP");
    await setgetdocumenttype("OIGP");
    setButtonName("Add");
    setSearchNumber("0");
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
      GRpo(cook);
    }
  }, []);
  const Home = () => {
    const alert = useAlert();
  };
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `OIGP(${id})`,
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

  const submitPatchOIGP = async () => {
    let DocLines = [];
    let body = PRBody;
    PQDocumentLines.forEach((element) => {
      DocLines.push({
        // U_BaseEntry: element.DocEntry,
        // U_BaseType: 22,
        // U_BaseLine: element.LineNum,
        //  U_BaseNum: SelectedPRDocEntry.DocNum,
        U_ItemCode: "RM0002",
        U_Dscription: "element.ItemDescription",
        // U_unitMsr: element.UoMCode,
        // U_Quantity: Quantity,
        // U_OpenQty: Quantity,
        // U_BaseOpnQty: element.RemainingOpenQuantity,
        U_LineComments: "LineRemarks",
      });
    });

    // body['U_DriverName'] = DriverName
    // body['U_ContactNo'] = ContactNo
    // body['U_CNIC'] = CNIC
    // body['U_VehicleNo'] = VahicalNo
    // body['U_TimeIn'] = TimeChange
    // body['U_TimeOut'] = TimeOutChange
    // body['U_Returnable'] = DropDown
    // body['Remark'] = Textchange
    // body['U_NumAtCard'] = RefNo
    // body['U_CustomerProperty'] = CustomerDropDown
    body["IGP1Collection"] = DocLines;

    body["AttachmentEntry"] = attachmentresponse;
    // body['U_CardName'] = SelectedPRDocEntry.CardName
    // body['U_DocDate'] = SelectedPRDocEntry.DocDate
    Patch(HeaderData.DocEntry, body);
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
  const BusinessPartners = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveVendor, cookie: cookie }
      )
      .then(function (res) {
        setPq(res.data.value);
        if (res.data.value) {
          let ItemsDropDown = [];

          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardCode + " : " + element.CardName,
              item: element.CardName,
            });
          });
          setVendorCodeDropdown(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const selectPR = async (item) => {
    setShow(false);
    setHeaderData(item);
    localStorage.setItem("getDocEntry", item.DocEntry);
    if (item.DocumentStatus == "bost_Open") {
      setgetStatus("Open");
    } else {
      setgetStatus("Close");
    }
    setSearchDocumentLines(item.DocumentLines);
  };
  const handleShow = async () => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;

    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `PurchaseOrders?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${PrVendorValue}'`;

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie,
      })
      .then(function (res) {
        setPrRe(res.data.value);
      })
      .catch({});

    setShow(true);
  };
  const VendorChange = (e) => {
    setPrVendorValue(e.value);
    setPrVendorName(e.item);
  };

  const handleClose = () => {
    setShow(false);
  };
  const GetItems = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseQuotation.purchaseItems,
        cookie: cookie,
      })
      .then(function (ItemsResponse) {
        ItemsResponseResult = ItemsResponse;
        // setLoading(false)
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
  const GRpo = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActivePurchaseItems,
        cookie: cookie,
      })
      .then(function (res) {
        setGrpo(res.data.value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset();
    Dropdown.reset();
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

  const RequiredQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const LineRemarksFun = (e, index, PrReIndex) => {
    let doclines = PQDocumentLines;
    doclines[PrReIndex].DocumentLines[index][e.target.name] = e.target.value;
    setPQDocumentLines(doclines);
  };
  const InwardGatePass = async () => {
    let DocLines = [];
    let body = PRBody;
    PQDocumentLines.forEach((element) => {
      if (element.isSelected) {
        element.DocumentLines.forEach((item) => {
          if (item.isSelected && item.LineStatus === "bost_Open") {
            DocLines.push({
              U_BaseEntry: item.DocEntry,
              U_BaseType: 22,
              U_BaseLine: item.LineNum,
              // U_BaseNum: SelectedPRDocEntry.DocNum,
              U_ItemCode: item.ItemCode,
              U_Dscription: item.ItemDescription,
              U_unitMsr: item.UoMCode,
              // U_LineComments: item.LineRemarks,
              U_Quantity: item.Quantity,
              U_OpenQty: item.RemainingOpenQuantity,
              U_BaseOpnQty: item.BaseOpenQuantity,
              U_LineComments: item.LineRemarks,
            });

            body["U_DriverName"] = DriverName;
            body["U_ContactNo"] = ContactNo;
            body["U_CNIC"] = CNIC;
            body["U_VehicleNo"] = VahicalNo;
            body["U_TimeIn"] = TimeChange;
            body["U_DocDate"] = getDocDate;
            body["Series"] = getseriesvalue;
            body["AttachmentEntry"] = attachmentresponse;
            body["U_TimeOut"] = TimeOutChange;
            body["U_Returnable"] = DropDown;
            body["Remark"] = Textchange;
            body["U_NumAtCard"] = RefNo;
            body["U_Property"] = CustomerDropDown;
            body["IGP1Collection"] = DocLines;
            body["U_CardCode"] = PrVendorValue;
            body["U_CardName"] = PrVendorName;
            // body['U_DocDate'] = SelectedPRDocEntry.DocDate
          }
        });
      }
    });
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
          api: LINKS.sap.OIGP.InwardGatePass,
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
          api: LINKS.sap.OIGP.InwardGatePass,
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
  const CustomerDropDownFun = (e) => {
    setCustomerDropDown(e.value);
  };
  const DropDownValue = (e) => {
    setDropDown(e.value);
  };
  const BaseNumberFun = (e) => {
    setBaseNum(e.target.value);
  };

  const TimeOutChangeFun = (e) => {
    setTimeOutChange(e.target.value);
  };
  const TimeChaneFun = (e) => {
    setTimeChange(e.target.value);
  };
  const CNICFun = (e) => {
    setCNIC(e.target.value);
  };
  const ContactNoFun = (e) => {
    setContactNo(e.target.value);
  };
  const DriverNameFun = (e) => {
    setDriverName(e.target.value);
  };
  const RefNoFun = (e) => {
    setRefNo(e.target.value);
  };
  const VehicalNoFun = (e) => {
    setVahicalNo(e.target.value);
  };
  const TextChangeFun = (e) => {
    setTextchange(e.target.value);
  };
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
        // else  if (res.data !==  LiveGetInstallationNumber2 ) {
        //   if(res.data !== TestGetInstallationNumber){
        //   alert("Provided Key Does not match")
        //   window.location.href="/DisabledHomeScreen";
        //   }
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `OIGP?$orderby=DocNum asc`;
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
    let sapAPi = `OIGP?$filter=DocNum eq ${SearchNumber} &$orderby=DocNum asc`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0]);
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        if (res.data.value[0].DocumentStatus == "bost_Open") {
          setgetStatus("Open");
        } else {
          setgetStatus("Close");
        }
        setSearchDocumentLines(res.data.value[0].IGP1Collection);
        if (HeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      InwardGatePass();
    } else if (ButtonName != "Add") {
      submitPatchOIGP();
    }
  };
  const [modalOne, setModalOne] = React.useState();
  const [modalTwo, setModalTwo] = React.useState();

  //   const [modalThree,setModalThree]=React.useState();
  //   const [modalFour,setModalFour]=React.useState();
  const handleClosee = () => setModalOne(false);
  const handleCloseee = () => setModalTwo(false);

  function handleShowModalOne() {
    setModalOne("modal-one");
  }

  const handleShowModalTwo = () => {
    setModalTwo("modal-two");
  };

  const checkboxSelect = (item, index) => {
    let checkboxValue = null;
    if (item.isSelected) {
      checkboxValue = false;
    } else {
      checkboxValue = true;
    }
    let prData = PrRe;
    prData[index]["isSelected"] = checkboxValue;
    setPQDocumentLines(prData);
  };
  const docLineSelectedSwitch = (PrReIndex, item, index) => {
    let checkboxValue = null;
    if (item.isSelected) {
      checkboxValue = false;
    } else {
      checkboxValue = true;
    }
    let prData = PQDocumentLines;
    prData[PrReIndex].DocumentLines[index]["isSelected"] = checkboxValue;
    setPQDocumentLines(prData);
  };

  const selectrow = async (items) => {
    PQDocumentLines.forEach((element) => {
      element.PQDocumentLines.forEach((docElement) => {
        if (docElement.isSelected) {
          setSelectShow(docElement);
        }
      });
    });
  };
  return (
    <>
      {" "}
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
      {loading && (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <h1 style={{ textAlign: "center" }}>Inward Gate Pass</h1>
      {/* Upper Side++++++++ */}
      <div className="main_container">
        <div className="left">
          <div className="header_items_container">
            <label>Vendor</label>
            <div>
              <Select
                placeholder={HeaderData && HeaderData.CardCode}
                options={VendorCodeDropdown} // Options to display in the dropdown
                onChange={(e) => {
                  VendorChange(e);
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            className="Modal-big"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Open Purchase Orders List
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {PrRe && (
                <Table responsive>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Document No.</th>
                      <th>Vendor Code</th>
                      <th>Vendor Name</th>
                      <th>Posting Date</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {PrRe.map((item, index) => (
                      <tr key={`${index}`}>
                        <TD>
                          {index + 1}
                          <input
                            type="checkbox"
                            onChange={() => {
                              checkboxSelect(item, index);
                            }}
                            checked={item.isSelected}
                          />
                        </TD>
                        <TD>{item.DocNum}</TD>
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
              <Button
                variant="secondary"
                onClick={() => {
                  handleShowModalTwo();
                  handleClose();
                }}
              >
                Select
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={modalTwo === "modal-two"}
            className="Modal-big"
            size="lg"
          >
            <Modal.Title id="example-modal-sizes-title-lg">
              Open Purchase Orders List
            </Modal.Title>
            <Modal.Body>
              {PQDocumentLines && (
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item No.</th>
                      <th>Descripction</th>
                      <th>UoM</th>
                      <th>Quantity</th>
                      <th>Open Quantity</th>
                      <th>Base Open Quantity</th>
                      <th>Project</th>
                      <th>Line Remarks</th>
                      <th>Base No.</th>
                      <th>Base Line</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PQDocumentLines.map(
                      (PrReItem, PrReIndex) =>
                        PrReItem.isSelected &&
                        PrReItem.DocumentLines.map((item, index) => (
                          // item.LineStatus === "bost_Open" &&
                          <tr key={`${index}`}>
                            <td>
                              {index + 1}
                              <input
                                type="checkbox"
                                onChange={() => {
                                  docLineSelectedSwitch(PrReIndex, item, index);
                                }}
                                checked={item.isSelected}
                              />
                            </td>
                            <td>{item.ItemCode || item.U_ItemCode}</td>
                            <td>{item.ItemDescription || item.U_Dscription}</td>
                            <td>{item.MeasureUnit || item.U_unitMsr}</td>
                            <td>
                              {
                                <TextInput
                                  onChange={(e) => {
                                    LineRemarksFun(e, index, PrReIndex);
                                  }}
                                  name="Quantity"
                                  type="number"
                                  defaultValue={
                                    item.Quantity || item.U_Quantity
                                  }
                                  class="form-control"
                                />
                              }
                            </td>
                            <td>
                              {item.RemainingOpenQuantity || item.U_OpenQty}
                            </td>
                            <td>
                              {item.BaseOpenQuantity || item.U_BaseOpnQty}
                            </td>
                            <td>{item.ProjectCode || item.U_Project}</td>
                            <td>
                              <input
                                type="text"
                                readOnly
                                class="form-control"
                                defaultValue={
                                  item.U_LineComments || item.U_LineComments
                                }
                                name="LineRemarks"
                                onChange={(e) => {
                                  LineRemarksFun(e, index, PrReIndex);
                                }}
                              />
                            </td>
                            <td>{PrReItem.DocNum}</td>
                            <td>{item.BaseLine || item.U_BaseLine}</td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </Table>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseee}>
                Choose
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
                            Choose
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
            <label>Property</label>
            <div>
              <Select
                // placeholder={SelectedPRDocEntry && SelectedPRDocEntry.CardCode}
                options={[
                  { label: "1 - Company", value: 1 },
                  { label: "2 - Customer", value: 2 },
                  { label: "3 - Vendor", value: 3 },
                ]}
                onChange={(e) => {
                  CustomerDropDownFun(e);
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="header_items_container">
            <label>Base Type</label>
            <div>
              <Select
                // placeholder={SelectedPRDocEntry && SelectedPRDocEntry.CardCode}
                options={[
                  { label: "General", value: 0 },
                  { label: "OWGP", value: 1 },
                  { label: "OPOR", value: 2 },
                ]}
                // onChange={e => {
                //   BaseDropDownFun(e)
                // }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>

          <div className="header_items_container">
            <label>DC Ref. No.</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="text"
              class="input"
              name="RefNum"
              aria-describedby="emailHelp"
              placeholder=" "
              onChange={(e) => {
                RefNoFun(e);
              }}
            ></input>
          </div>

          <div className="header_items_container">
            <label>Vehicle No.</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.U_VehicleNo}
              type="text"
              class="input"
              name="VehicleNo"
              aria-describedby="emailHelp"
              defaultValue={HeaderData && HeaderData.U_VehicleNo}
              onChange={(e) => {
                VehicalNoFun(e);
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
          <div className="OIGP header_items_container">
            <a
              onClick={(e) => {
                SearchAll_Filter_Data();
              }}
              style={{ cursor: "pointer" }}
            >
              {" "}
              <svg class="svg-icon14" viewBox="0 0 20 20">
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
          <div className="header_items_container">
            <label>Posting Date</label>
            <input
              defaultValue={
                HeaderData && HeaderData.DocDate
                  ? HeaderData && HeaderData.DocDate
                  : currentDate
              }
              type="date"
              class="input"
              name="postingdate"
              aria-describedby="emailHelp"
              placeholder=" "
              onChange={(e) => {
                setgetDocDate(e.target.value);
              }}
            ></input>
          </div>
          <div className="header_items_container">
            <label>Returnable</label>

            <Select
              // placeholder={SelectedPRDocEntry && SelectedPRDocEntry.CardCode}
              options={[
                { label: "0 - No", value: 0 },
                { label: "1 - Yes", value: 1 },
              ]}
              onChange={(e) => {
                DropDownValue(e);
              }} // Function will trigger on select event
              // onRemove={BusinessPartners} Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
          <div className="header_items_container">
            <label>DriverName</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="text"
              class="input"
              name="DriverName"
              aria-describedby="emailHelp"
              defaultValue={HeaderData && HeaderData.U_DriverName}
              onChange={(e) => {
                DriverNameFun(e);
              }}
            ></input>
          </div>

          <div className="header_items_container">
            <label>Contact No.</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="number"
              class="input"
              name="ContactNum"
              aria-describedby="emailHelp"
              defaultValue={HeaderData && HeaderData.U_ContactNo}
              onChange={(e) => {
                ContactNoFun(e);
              }}
            ></input>
          </div>

          <div className="header_items_container">
            <label>CNIC No.</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="text"
              pattern="[A-Za-z]{3}"
              class="input"
              name="ContactNum"
              aria-describedby="emailHelp"
              defaultValue={HeaderData && HeaderData.U_CNIC}
              onChange={(e) => {
                CNICFun(e);
              }}
            ></input>
          </div>

          <div className="header_items_container">
            <label>Time In</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="time"
              class="input"
              name="timein"
              aria-describedby="emailHelp"
              defaultValue={HeaderData && HeaderData.U_TimeIn}
              onChange={(e) => {
                TimeChaneFun(e);
              }}
            ></input>
          </div>

          <div className="header_items_container">
            <label>Time Out</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
              type="time"
              class="input"
              name="TimeOut"
              aria-describedby="emailHelp"
              defaultValue={HeaderData && HeaderData.U_TimeOut}
              onChange={(e) => {
                TimeOutChangeFun(e);
              }}
            ></input>
          </div>
          {/* <br/>
            <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e => setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
        </div>
      </div>
      <Tabs
        defaultActiveKey="Inward Gate Pass Row"
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="Inward Gate Pass Row" title="Inward Gate Pass Row">
          {PQDocumentLines && (
            <Table responsive striped bordered hover>
              {Array.isArray(PQDocumentLines) && PQDocumentLines.length > 0 ? (
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item No.</th>
                    <th>Descripction</th>
                    <th>UoM</th>
                    <th>Quantity</th>
                    <th>Open Quantity</th>
                    <th>Base Open Quantity</th>
                    <th>Project</th>
                    <th>Line Remarks</th>
                    <th>Base No.</th>
                    <th>Base Line</th>
                  </tr>
                </thead>
              ) : null}
              <tbody>
                {PQDocumentLines.map(
                  (PrReItem, PrReIndex) =>
                    PrReItem.isSelected &&
                    PrReItem.DocumentLines.map(
                      (item, index) =>
                        item.isSelected && (
                          <tr key={`${index}`}>
                            <td>{index + 1}</td>
                            <td>{item.ItemCode || item.U_ItemCode}</td>
                            <td>{item.ItemDescription || item.U_Dscription}</td>
                            <td>{item.MeasureUnit || item.U_unitMsr}</td>
                            <td>
                              {
                                <TextInput
                                  onChange={(e) => {
                                    LineRemarksFun(e, index, PrReIndex);
                                  }}
                                  name="Quantity"
                                  type="number"
                                  defaultValue={
                                    item.Quantity || item.U_Quantity
                                  }
                                  class="form-control"
                                />
                              }
                            </td>
                            <td>
                              {item.RemainingOpenQuantity || item.U_OpenQty}
                            </td>
                            <td>
                              {item.BaseOpenQuantity || item.U_BaseOpnQty}
                            </td>
                            <td>{item.ProjectCode || item.U_Project}</td>
                            <td>
                              <input
                                type="text"
                                class="form-control"
                                value={
                                  item.U_LineComments || item.U_LineComments
                                }
                                name="LineRemarks"
                                onChange={(e) => {
                                  LineRemarksFun(e, index, PrReIndex);
                                }}
                              />
                            </td>
                            <td>{PrReItem.DocNum}</td>
                            <td>{item.BaseLine || item.U_BaseLine}</td>
                          </tr>
                        )
                    )
                )}
              </tbody>
            </Table>
          )}
          {SearchDocumentLines && (
            <Table responsive striped bordered hover>
              {Array.isArray(SearchDocumentLines) &&
              SearchDocumentLines.length > 0 ? (
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item No.</th>
                    <th>Descripction</th>
                    <th>UoM</th>
                    <th>Quantity</th>
                    <th>Open Quantity</th>
                    <th>Base Open Quantity</th>
                    <th>Project</th>
                    <th>Line Remarks</th>
                    <th>Base No.</th>
                    <th>Base Line</th>
                  </tr>
                </thead>
              ) : null}
              <tbody>
                {SearchDocumentLines.map((item, index) => (
                  <tr key={`${index}`}>
                    <td>{index + 1}</td>
                    <td>{item.ItemCode || item.U_ItemCode}</td>
                    <td>{item.ItemDescription || item.U_Dscription}</td>
                    <td>{item.MeasureUnit || item.U_unitMsr}</td>
                    <td>
                      {
                        <TextInput
                          // onChange={e => {
                          //   LineRemarksFun(e, index, PrReIndex)
                          // }}
                          name="Quantity"
                          type="number"
                          defaultValue={item.Quantity || item.U_Quantity}
                          class="form-control"
                        />
                      }
                    </td>
                    <td>{item.RemainingOpenQuantity || item.U_OpenQty}</td>
                    <td>{item.BaseOpenQuantity || item.U_BaseOpnQty}</td>
                    <td>{item.ProjectCode || item.U_Project}</td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        defaultValue={
                          item.U_LineComments || item.U_LineComments
                        }
                        name="LineRemarks"
                        // onChange={e => {
                        //   LineRemarksFun(e, index, PrReIndex)
                        // }}
                      />
                    </td>
                    <td>{item.BaseEntry || item.U_BaseEntry}</td>
                    <td>{item.BaseLine || item.U_BaseLine}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        <Tab eventKey="Attachment" title="Attachment">
          <Attachment setattachmentresponse={setattachmentresponse} />
        </Tab>
      </Tabs>
      {/* Bottom Side+++++++++ */}
      <div className="main_container">
        <div className="left">
          <div className="header_items_container">
            <label>Remark</label>
            <textarea
              defaultValue={HeaderData && HeaderData.Remark}
              type="text"
              class="textArea"
              id="TimeOut"
              aria-describedby="emailHelp"
              placeholder=" "
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
