import React from "react";
import {
  Button,
  CardGroup,
  Table,
  Container,
  Modal,
  Tab,
  Card,
  Tabs,
  Form,
} from "react-bootstrap";
import Select from "react-select";
import { useAlert } from "react-alert";
import { LINKS } from "../../../Utils";
import { Logo, TextInput, Alert, Navbar } from "../../../Component/Global";
import Switch from "react-switch";
import { input, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import { Logistics, Accounting } from "../../../Component/PurchaseQuotation";

import { Attachment } from "../../../Component/APDownPaymentRequest";
import "./index.css";
const axios = require("axios");

export default function PurchaseDeliveryNotes() {
  const [show, setShow] = React.useState(false);
  const alert = useAlert();
  const [getpurchaseordersdocentry, setgetpurchaseordersdocentry] =
    React.useState();
  const [SelectShow, setSelectShow] = React.useState();
  const [getbatchnumbers, setgetbatchnumbers] = React.useState();
  const [valuechacker, setvaluechacker] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [showA, setShowA] = React.useState(false);

  const [show3, setShow3] = React.useState(false);
  const [bothbodies, setbothbodies] = React.useState(false);
  const [getdocumenttype, setgetdocumenttype] = React.useState("20");
  const [getdocumentname, setgetdocumentname] = React.useState("PDN2");
  const [ModuleName, setModuleName] = React.useState("PurchaseDeliveryNotes");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [gettaxtotal, setgettaxtotal] = React.useState();
  const [getvaluefromtable, setgetvaluefromtable] = React.useState();
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [getnetTotal, setgetnetTotal] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [ButtonDropdown, setButtonDropdown] = React.useState();
  const [getStatus, setgetStatus] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [selectedPRVender, setselectedPRVender] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [DocDate, setDocDate] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [DiscountTotal, setDiscountTotal] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [OwnerPrRe, setOwnerPrRe] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [Disply, setDisply] = React.useState(false);
  const [currentDate, setcurrentDate] = React.useState();
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [Pq, setPq] = React.useState();
  const [CP, setCP] = React.useState();
  const [MIR, setMIR] = React.useState();
  const [ButtonName, setButtonName] = React.useState();
  const [IGP, setIGP] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState();
  const [Remarks, setRemarks] = React.useState();
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
  //Component Hooks---

  const [getAddress, setgetAddress] = React.useState();
  const [getAddress2, setgetAddress2] = React.useState();
  const [getTransportationCode, setgetTransportationCode] = React.useState();
  const [getGroupNumber, setgetGroupNumber] = React.useState();
  const [getJournalMemo, setgetJournalMemo] = React.useState();
  const [getProject, setgetProject] = React.useState();
  const [getCancelDate, setgetCancelDate] = React.useState();
  const [disc, setdisc] = React.useState();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [getseriesnumbring, setgetseriesnumbring] = React.useState();

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  };
  const Home = () => {
    const alert = useAlert();
  };
  const [isfocused, setIsFocused] = React.useState(false);
  const searchRef = React.useRef(null);
  React.useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
        e.preventDefault();
        searchRef.current.focus();
        setIsFocused(!isfocused);
      }
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
          e.preventDefault();
          setIsFocused(!isfocused);
        }
      });
    };
  }, []);
  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      SearchAll_Filter_Data();
      setIsFocused(false);
    }
  };
  React.useEffect(async () => {
    setTestGetInstallationNumber("0020545074");
    setLiveGetInstallationNumber2("0021105591");
    today();
    compareDate();
    await setgetdocumentname("PDN2");
    await setModuleName("PurchaseDeliveryNotes");
    await setgetdocumenttype("20");
    setButtonName("Add");
    setSearchNumber("0");
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    // let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    // if (formcontroller) {
    //   formcontroller.forEach(async (element) => {
    //     if (element.U_FormId === "OPDN") {
    //       await localStorage.setItem(
    //         "documentcontroller",
    //         element.U_Authorization
    //       );
    //     }
    //   });
    // }
    if (showA == "true") {
      setShowA(true);
      compareDate();
      await localStorage.removeItem("ShowBranches");
    }
    let cook2 = await localStorage.getItem("secondcookie");
    getpurchaseorders(cook2);
    if (cook) GetItems(cook);
    Project(cook);
    CostCentre(cook);
    Buyer(cook);
    Owner(cook);
    defaultWhse(cook);
    PurchaseQuotation(cook);
    OwnerPurchaseRequest(cook);
    BusinessPartners(cook);
    // ContactP(cook)
    Frieght1(cook);
    TableTaxCode(cook);
    MaterialInspectionReport(cook);
    InwardGatePass(cook);
  }, []);
  const defaultWhse = async (cook) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let SAPApi = `Warehouses?$select=WarehouseCode,GlobalLocationNumber,WarehouseName &$orderby=WarehouseCode `;
    await axios
      .post(API_TYPES.GET, {
        api: SAPApi,
        cookie: cook,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.WarehouseCode,
              label: element.WarehouseCode + " : " + element.WarehouseName,
            });
          });
          setPrWhse(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `PurchaseDeliveryNotes(${id})`,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data === "Updated") {
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

  const submitPatchGRPO = async () => {
    let body = [];
    // // PQDocumentLines.forEach(element => {
    // body.push({
    //   Remark:"Zeeshan"

    // })
    body["Remark"] = Remarks;
    body["AttachmentEntry"] = attachmentresponse;
    Patch(HeaderData.DocEntry, body);
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
            });
          });
          setVendorCodeDropdown(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // -------------------------    Items API GET DATA   ------------------------------------------------------
  const OwnerhandleClose = () => setDisply(false);
  const OwnerhandleShow = () => setDisply(true);

  const GetItems = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActivePurchaseItems,
        cookie: cookie,
      })
      .then(function (ItemsResponse) {
        ItemsResponseResult = ItemsResponse;
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
            value: element.EmployeeID,
            label:
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
  // const handleSubmitted = ({ res, fields,Dropdown, form }) => {

  //   form.reset()
  //   Dropdown.reset()
  // }
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
  {
    /* Table API's Call++++++++ */
  }
  const Project = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveProjects,
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
          setPrProject(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const MaterialInspectionReport = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseDeliveryNotes.MaterialInspection,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.DocEntry,
              label: element.DocEntry,
            });
          });
          setMIR(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getpurchaseorders = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: `PurchaseOrders?$select=DocEntry,DocNum`,
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
      let ItemsDetails = [];
      res.forEach((element) => {
        ItemsDetails[element.DocNum] = {
          DocEntry: element.DocEntry,
        };
      });
      console.log(ItemsDetails);
      await setgetpurchaseordersdocentry(ItemsDetails);
    }
  };
  const InwardGatePass = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseDeliveryNotes.InwardGatePass,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.U_BaseEntry,
              label: element.U_BaseEntry,
            });
          });
          setIGP(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const CostCentre = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveCostingCode,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.CenterCode,
              label: element.CenterCode + " : " + element.CenterName,
            });
          });
          setPrCost(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Frieght1 = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.Freight,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.Name,
              label: element.ExpensCode + " : " + element.Name,
            });
          });
          setFrieght(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const TableTaxCode = async (cook) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------

    let SAPApi = `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcInputTax'`;
    await axios
      .post(API_TYPES.GET, {
        api: SAPApi,
        cookie: cook,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name + " : " + element.Code,
              item: element,
            });
          });
          setTaxCode(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Buyer = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveSalesEmployee,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.SalesEmployeeCode,
              label:
                element.SalesEmployeeCode + " : " + element.SalesEmployeeName,
            });
          });
          setPrBuyer(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Owner = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveEmplyeeInfo,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.EmployeeID,
              label:
                element.EmployeeID +
                " : " +
                element.FirstName +
                " : " +
                element.LastName,
            });
          });
          setPrOwner(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const OwnerPurchaseRequest = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveEmplyeeInfo,
        cookie: cookie,
      })
      .then(function (res) {
        setOwnerPrRe(res.data.value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Whse = async (name) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let cook = await localStorage.getItem("cookie");
    let SAPApi = `Warehouses?$select=WarehouseCode,GlobalLocationNumber,WarehouseName&$filter=(GlobalLocationNumber eq '${name}' or GlobalLocationNumber eq null) &$orderby=WarehouseCode `;
    await axios
      .post(API_TYPES.GET, {
        api: SAPApi,
        cookie: cook,
      })
      .then(function (res) {
        console.log(res.data.value);
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.WarehouseCode,
              label: element.WarehouseCode + " : " + element.WarehouseName,
            });
          });
          setPrWhse(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const dateChange = (e) => {
    let prBody = PRBody;
    prBody[e.target.name] = e.target.value;
    setPRBody(prBody);
  };
  const DocDateChange = async (e) => {
    setDocDate(e.target.value);
  };
  const PurchaseQuotation = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseDeliveryNotes.PurchaseOrder,
        cookie: cookie,
      })
      .then(function (res) {
        setPrRe(res.data.value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const ontextChanged = (e, index, PrReIndex) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value;
    setPQDocumentLines(itemDetail);
  };
  const SearchontextChanged = (e, index) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index][e.target.name] = e.target.value;
    setSearchDocumentLines(itemDetail);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `PurchaseOrders?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${selectedPRVender}' and startswith(DocNum,'${getseriesnumbring}')`;

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
  const selectPR = async (item) => {
    setShow(false);
    setHeaderData(item);
    localStorage.setItem("getDocEntry", item.DocEntry);
    if (item.DocumentStatus == "bost_Open") {
      setgetStatus("Open");
      setButtonName("Update");
    } else {
      setgetStatus("Close");
      setButtonName("Update");
    }
    let sum = 0;
    item.DocumentLines.forEach((item) => {
      sum = sum + item.LineTotal;
    });
    setTotalbforeDiscount(sum);
    setSearchDocumentLines(item.DocumentLines);
  };
  const ontextItemChanged = (e) => {
    let obj = TextItemChangedObject;
    obj[e.target.name] = e.target.value;
    setTextItemChangedObject(obj);
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
    let cook = await localStorage.getItem("cookie");
    if (getdocumentstatus) {
      let sapAPi = `PurchaseDeliveryNotes?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `PurchaseDeliveryNotes?$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    }
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  const handleClose3 = () => {
    setShow3(false);
  };
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `PurchaseDeliveryNotes?$filter=DocNum eq ${SearchNumber} &$orderby=DocNum asc`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        if (res.data.value[0].DocumentStatus == "bost_Open") {
          setgetStatus("Open");
        } else {
          setgetStatus("Close");
        }
        setHeaderData(res.data.value[0]);
        let sum = 0;
        res.data.value[0].DocumentLines.forEach((item) => {
          sum = sum + item.LineTotal;
        });
        setTotalbforeDiscount(sum);
        setSearchDocumentLines(res.data.value[0].DocumentLines);
        if (HeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitPurchaseDeliveryNotes();
    } else if (ButtonName != "Add") {
      submitPatchGRPO();
    }
  };
  const DocLinesDropDownOnChange = (selectedItem, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value;
    setPQDocumentLines(itemDetail);
  };
  const SearchDocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    setSearchDocumentLines(itemDetail);
  };

  const VendorChange = (e) => {
    setselectedPRVender(e.value);
  };
  const submitPurchaseDeliveryNotes = async () => {
    let DocLines = [];
    let secondDB = [];
    let document = PQDocumentLines;
    let document2 = PQDocumentLines;
    let body = PRBody;
    let body2 = {};
    console.log("PQDocumentLines", PQDocumentLines);
    if (valuechacker) {
      document.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 22,
                BaseLine: item.LineNum,
                FreeText: item.FreeText,
                // U_IGPEntry: item.U_BaseEntry,
                // U_MIREntry: item.DocEntry,
                // U_IGPQuantity: item.U_IGPQuantity,
                // U_AQuantity: item.U_AQuantity,
                // U_RQuantity: item.U_RQuantity,
                Quantity: item.RemainingOpenQuantity,
                Warehouse: item.Warehouse,
                // DistributeExpense: "tYES",
                // DocumentLineAdditionalExpenses: [
                //     {
                //         "ExpenseCode": 1,
                //         "LineTotal": item.FreightCharges
                //     }
                // ],
                BatchNumbers: [
                  {
                    BatchNumber: item.BatchNumber,
                    ExpiryDate: item.ExpiryDate,
                    ManufacturingDate: item.ManufacturingDate,
                    Location: item.ItemCode,
                    Quantity: item.Quantity,
                    BaseLineNumber: item.LineNum,
                  },
                ],
              });
              body["DocumentLines"] = DocLines;
              body["CardCode"] = selectedPRVender;
              body["U_CreatedBy"] = "Web UI";
              body["DocDate"] = DocDate ? DocDate : currentDate;
              body["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body["Address"] = getAddress;
              body["Address2"] = getAddress2;
              body["Series"] = getseriesvalue;
              body["Remark"] = Remarks;
              body["TransportationCode"] = getTransportationCode;
              body["JournalMemo"] = getJournalMemo;
              body["GroupNumber"] = getGroupNumber;
              body["Project"] = getProject;
              body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              // body['Indicator'] = IndicatorAccounting
            }
          });
        }
      });
    } else {
      document.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 22,
                BaseLine: item.LineNum,
                FreeText: item.FreeText,
                // U_IGPEntry: item.U_BaseEntry,
                // U_MIREntry: item.DocEntry,
                // U_IGPQuantity: item.U_IGPQuantity,
                // U_AQuantity: item.U_AQuantity,
                // U_RQuantity: item.U_RQuantity,
                Quantity: item.RemainingOpenQuantity,
                Warehouse: item.Warehouse,
                // DistributeExpense: "tYES",
                // DocumentLineAdditionalExpenses: [
                //     {
                //         "ExpenseCode": 1,
                //         "LineTotal": item.FreightCharges
                //     }
                // ],
              });
              body["DocumentLines"] = DocLines;
              body["CardCode"] = selectedPRVender;
              body["U_CreatedBy"] = "Web UI";
              body["DocDate"] = DocDate ? DocDate : currentDate;
              body["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body["Address"] = getAddress;
              body["Address2"] = getAddress2;
              body["Series"] = getseriesvalue;
              body["Remark"] = Remarks;
              body["TransportationCode"] = getTransportationCode;
              body["JournalMemo"] = getJournalMemo;
              body["GroupNumber"] = getGroupNumber;
              body["Project"] = getProject;
              body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              // body['Indicator'] = IndicatorAccounting
            }
          });
        }
      });
    }
    if (valuechacker) {
      document2.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              secondDB.push({
                BaseEntry: getpurchaseordersdocentry[element.DocNum].DocEntry,
                BaseType: 22,
                BaseLine: item.LineNum,
                FreeText: item.FreeText,
                // U_IGPEntry: item.U_BaseEntry,
                // U_MIREntry: item.DocEntry,
                // U_IGPQuantity: item.U_IGPQuantity,
                // U_AQuantity: item.U_AQuantity,
                // U_RQuantity: item.U_RQuantity,
                Quantity: item.RemainingOpenQuantity,
                Warehouse: item.Warehouse,
                // DistributeExpense: "tYES",
                // DocumentLineAdditionalExpenses: [
                //     {
                //         "ExpenseCode": 1,
                //         "LineTotal": item.FreightCharges
                //     }
                // ],
                BatchNumbers: [
                  {
                    BatchNumber: item.BatchNumber,
                    ExpiryDate: item.ExpiryDate,
                    ManufacturingDate: item.ManufacturingDate,
                    Location: item.ItemCode,
                    Quantity: item.Quantity,
                    BaseLineNumber: item.LineNum,
                  },
                ],
              });
              body2["DocumentLines"] = secondDB;
              body2["CardCode"] = selectedPRVender;
              body["U_CreatedBy"] = "Web UI";
              body2["DocDate"] = DocDate ? DocDate : currentDate;
              body2["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body2["Address"] = getAddress;
              body2["Address2"] = getAddress2;
              body2["Series"] = getseriesvalue;
              body2["Remark"] = Remarks;
              body2["TransportationCode"] = getTransportationCode;
              body2["JournalMemo"] = getJournalMemo;
              body2["GroupNumber"] = getGroupNumber;
              body2["Project"] = getProject;
              body2["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              // body['Indicator'] = IndicatorAccounting
            }
          });
        }
      });
    } else {
      document2.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              secondDB.push({
                BaseEntry: getpurchaseordersdocentry[element.DocNum].DocEntry,
                BaseType: 22,
                BaseLine: item.LineNum,
                FreeText: item.FreeText,
                // U_IGPEntry: item.U_BaseEntry,
                // U_MIREntry: item.DocEntry,
                // U_IGPQuantity: item.U_IGPQuantity,
                // U_AQuantity: item.U_AQuantity,
                // U_RQuantity: item.U_RQuantity,
                Quantity: item.RemainingOpenQuantity,
                Warehouse: item.Warehouse,
                // DistributeExpense: "tYES",
                // DocumentLineAdditionalExpenses: [
                //     {
                //         "ExpenseCode": 1,
                //         "LineTotal": item.FreightCharges
                //     }
                // ],
              });
              body2["DocumentLines"] = secondDB;
              body2["CardCode"] = selectedPRVender;
              body["U_CreatedBy"] = "Web UI";
              body2["DocDate"] = DocDate ? DocDate : currentDate;
              body2["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body2["Address"] = getAddress;
              body2["Address2"] = getAddress2;
              body2["Series"] = getseriesvalue;
              body2["Remark"] = Remarks;
              body2["TransportationCode"] = getTransportationCode;
              body2["JournalMemo"] = getJournalMemo;
              body2["GroupNumber"] = getGroupNumber;
              body2["Project"] = getProject;
              body2["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
            }
          });
        }
      });
    }
    console.log("JSON.stringify(body)", JSON.stringify(body));
    console.log("JSON.stringify(body2)", JSON.stringify(body2));

    if (bothbodies) {
      PostInSecondDB(body2, body);
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
          api: LINKS.sap.PurchaseDeliveryNotes.PurchaseDeliveryNotes,
          cookie: cook,
        })
        .then(function (res) {
          console.log("res", res);
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
  const PostInSecondDB = async (body2, body) => {
    let cook = await localStorage.getItem("secondcookie");
    if (cook) {
      await axios
        .post(API_TYPES.SECONDPOST, {
          body: JSON.stringify(body2),
          api: LINKS.sap.PurchaseDeliveryNotes.PurchaseDeliveryNotes,
          cookie: cook,
        })
        .then(async function (res) {
          console.log("res", res);
          if (res.data.DocNum) {
            await PostInFirstDB(body);
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
  const [modalOne, setModalOne] = React.useState();
  const [modalTwo, setModalTwo] = React.useState();
  //   const [modalThree,setModalThree]=React.useState();
  //   const [modalFour,setModalFour]=React.useState();
  const handleClosee = () => setModalOne(false);
  const handleCloseee = () => setModalTwo(false);
  const getvaluesformula = () => {
    let sum = 0;
    let sum1 = 0;
    PQDocumentLines.forEach((element) => {
      if (element.isSelected) {
        element.DocumentLines.forEach((item) => {
          if (item.isSelected && item.LineStatus === "bost_Open") {
            sum = sum + item.LineTotal;
            sum1 = sum1 + item.TaxTotal;
          }
          setgetnetTotal(sum);
          setgettaxtotal(sum1);
        });
      }
    });
  };

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
    getbatchnumberdata(item);
    let checkboxValue = null;
    if (item.isSelected) {
      checkboxValue = false;
    } else {
      checkboxValue = true;
    }
    let prData = PQDocumentLines;
    prData[PrReIndex].DocumentLines[index]["isSelected"] = checkboxValue;
    console.log("prData", prData);
    setPQDocumentLines(prData);
  };
  const getvaluefrombatchtable = (e, index, PrReIndex) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value;
    setPQDocumentLines(itemDetail);
    setvaluechacker(itemDetail);
  };
  const modalshow = (item) => {
    setgetvaluefromtable(item.ItemCode);
    setShow3(true);
  };
  const getbatchnumberdata = async (item) => {
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `Items?$filter=ItemCode eq '${item.ItemCode}' and ManageBatchNumbers eq 'tYES'`;
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie,
      })
      .then(function (res) {
        setgetbatchnumbers(res.data.value);
        // setShow3(true)
      })
      .catch(function (error) {
        console.log(error);
      });
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
  const ContactPerson = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    // let SAPapi = `sml.svc/ACTIVECONTACTPERSON?$filter=CardCode eq '${SelectedVendor}' &$orderby=CntctCode`
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq '${selectedPRVender}'`;
    // const api = `${LINKS.api}/GetApi`
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie,
      })
      .then(function (res) {
        setCP(res.data.value);
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.ContactPerson,
              label: element.ContactPerson,
            });
          });
          setContactPersonDropdown(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getseriesvaluefunction = async (e) => {
    setgetseriesnumbring(e.item.Name);
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
      <Navbar
        setgetserviceseries={setgetserviceseries}
        getdocumentname={getdocumentname}
        getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
      />
      {localStorage.getItem("documentcontroller") === "N" ? (
        <h1>You are not permited to perform this action</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Goods Receipt PO</h1>
          {/* Upper Side++++++++ */}
          <Form>
            <CardGroup>
              <DIV3>
                <Container fluid>
                  <div style={{ width: "23.5rem" }}>
                    <label>Vendor</label>
                    <Select
                      placeholder={HeaderData && HeaderData.CardName}
                      options={VendorCodeDropdown} // Options to display in the dropdown
                      onChange={(e) => {
                        VendorChange(e);
                      }} // Function will trigger on select event
                      // onRemove={BusinessPartners} Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <br />
                  <label>Contact Person</label>
                  <div
                    style={{ width: "23.5rem", height: "auto" }}
                    variant="primary"
                    onClick={ContactPerson}
                  >
                    <Select
                      placeholder={HeaderData && HeaderData.ContactPersonCode}
                      options={ContactPersonDropdown} // Options to display in the dropdown
                      // onSelect={GroupNo} // Function will trigger on select event
                      // onRemove={GroupNo} Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <br />
                  {getseriesvalue ? (
                    <Button variant="primary" onClick={handleShow}>
                      Copy From
                    </Button>
                  ) : null}
                  <br />
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
                        Choose
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
                          <TableHead>
                            <tr>
                              <th>#</th>
                              <th>Bar Code</th>
                              <th>Item</th>
                              <th>UoM Name</th>
                              <th>Quantity</th>
                              <th>Open Qty</th>
                              <th>Free Text</th>
                              <th>Whse</th>
                              <th>Project</th>
                              <th>Cost Centre</th>
                              <th>IGP No</th>
                              <th>IGP Quantity</th>
                              <th>MIR No</th>
                              <th>Approved Quantity</th>
                              <th>Rejected Quantity</th>
                            </tr>
                          </TableHead>
                          <tbody>
                            {PQDocumentLines.map(
                              (PrReItem, PrReIndex) =>
                                PrReItem.isSelected &&
                                PrReItem.DocumentLines.map(
                                  (item, index) =>
                                    item.LineStatus === "bost_Open" && (
                                      <tr key={`${index}`}>
                                        <TD>
                                          {index + 1}
                                          <input
                                            type="checkbox"
                                            onChange={() => {
                                              docLineSelectedSwitch(
                                                PrReIndex,
                                                item,
                                                index
                                              );
                                            }}
                                            checked={item.isSelected}
                                          />
                                        </TD>
                                        <TD></TD>
                                        <TD>{item.ItemCode}</TD>
                                        <TD>{item.MeasureUnit}</TD>
                                        <TD>
                                          <div style={{ width: "11rem" }}>
                                            <input
                                              class="form-control"
                                              type="number"
                                              name="Quantity"
                                              defaultValue={item.Quantity}
                                              // onChange={e => {
                                              //   ontextChanged(e, index)
                                              // }}
                                            />
                                          </div>
                                        </TD>
                                        <TD>
                                          <div style={{ width: "11rem" }}>
                                            <input
                                              class="form-control"
                                              type="number"
                                              readOnly="readOnly"
                                              name="OpenQty"
                                              defaultValue={
                                                item.RemainingOpenQuantity
                                              }
                                              // onChange={e => {
                                              //   ontextChanged(e, index)
                                              // }}
                                            />
                                          </div>
                                        </TD>
                                        <TD>
                                          <div style={{ width: "11rem" }}>
                                            <input
                                              class="form-control"
                                              type="text"
                                              name="FreeText"
                                              defaultValue={item.FreeText}
                                              onChange={(e) => {
                                                ontextChanged(e, index);
                                              }}
                                            />
                                          </div>
                                        </TD>
                                        <TD>
                                          <div style={{ width: "11rem" }}>
                                            {PrWhse && (
                                              <Select
                                                menuPortalTarget={document.body}
                                                value={PrWhse.filter(
                                                  (option) =>
                                                    option.value ===
                                                    item.WarehouseCode
                                                )}
                                                placeholder="Select.."
                                                options={PrWhse} // Options to display in the dropdown
                                                onChange={(e) => {
                                                  DocLinesDropDownOnChange(
                                                    e,
                                                    index,
                                                    "WarehouseCode"
                                                  );
                                                }}
                                                // onSelect={CostCentre} // Function will trigger on select event
                                                // onRemove={CostCentre} //Function will trigger on remove event
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            )}
                                          </div>
                                        </TD>
                                        <TD>
                                          <div style={{ width: "11rem" }}>
                                            {PrProject && (
                                              <Select
                                                menuPortalTarget={document.body}
                                                value={PrProject.filter(
                                                  (option) =>
                                                    option.value ===
                                                    item.ProjectCode
                                                )}
                                                placeholder="Select.."
                                                options={PrProject} // Options to display in the dropdown
                                                onChange={(e) => {
                                                  DocLinesDropDownOnChange(
                                                    e,
                                                    index,
                                                    "ProjectCode"
                                                  );
                                                }}
                                                // onSelect={Project} // Function will trigger on select event
                                                // onRemove={Project} //Function will trigger on remove event
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            )}
                                          </div>
                                        </TD>
                                        <TD>
                                          <div style={{ width: "11rem" }}>
                                            {PrCost && (
                                              <Select
                                                menuPortalTarget={document.body}
                                                value={PrCost.filter(
                                                  (option) =>
                                                    option.value ===
                                                    item.CostingCode
                                                )}
                                                placeholder="Select.."
                                                options={PrCost} // Options to display in the dropdown
                                                onChange={(e) => {
                                                  DocLinesDropDownOnChange(
                                                    e,
                                                    index,
                                                    "CostingCode"
                                                  );
                                                }}
                                                // onSelect={CostCentre} // Function will trigger on select event
                                                // onRemove={CostCentre} //Function will trigger on remove event
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            )}
                                          </div>
                                        </TD>
                                        <TD>{item.U_IGPEntry}</TD>
                                        <TD> {item.U_IGPQuantity}</TD>
                                        <TD>{item.U_MIREntry}</TD>
                                        <TD> {item.U_AQuantity}</TD>
                                        <TD> {item.U_RQuantity}</TD>
                                      </tr>
                                    )
                                )
                            )}
                          </tbody>
                        </Table>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          getvaluesformula();
                          handleCloseee();
                        }}
                      >
                        Choose
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal show={show1} onHide={handleClose2}>
                    <Modal.Header closeButton>
                      <Modal.Title>GRPO List</Modal.Title>
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
                              <tr
                                key={`${index}`}
                                onClick={(e) => {
                                  selectPR(item);
                                  handleClose2();
                                }}
                              >
                                <TD>{index + 1}</TD>
                                <TD>
                                  {item.DocumentStatus === "bost_Open" ? (
                                    <p
                                      style={{
                                        background: "gray",
                                        color: "white",
                                      }}
                                    >
                                      Open
                                    </p>
                                  ) : item.DocumentStatus === "bost_Close" ? (
                                    <p
                                      style={{
                                        background: "red",
                                        color: "white",
                                      }}
                                    >
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
                      {/* <Button variant='primary' onClick={handleClose2}>
            Cancel
          </Button> */}
                    </Modal.Footer>
                  </Modal>
                  <div style={{ width: "23.5rem", height: "auto" }}>
                    <label>Vendor Ref.No</label>
                    <input
                      defaultValue={HeaderData && HeaderData.NumAtCard}
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    ></input>
                  </div>
                </Container>
              </DIV3>
              <DIV4></DIV4>
              <DIV3>
                <Container>
                  <div style={{ marginLeft: "3rem" }}>
                    <label>No.</label>
                    <CardGroup>
                      <br />
                      <div style={{ width: "11.5rem", height: "auto" }}>
                        <Select
                          // placeholder={HeaderData && HeaderData.RequesterName}
                          options={getserviceseries} // Options to display in the dropdown
                          onChange={(e) => {
                            getseriesvaluefunction(e);
                            // TableTaxCode(e.item.Name)
                            Whse(e.item.Name);
                          }} // Function will trigger on select event
                          // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                        />
                      </div>
                      <div style={{ width: "11.5rem", height: "auto" }}>
                        <input
                          type="number"
                          name="Discount"
                          readOnly
                          value={getnextnumber}
                          placeholder=""
                          class="form-control"
                        />{" "}
                        <br />
                      </div>
                    </CardGroup>
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                    <label> Status</label>
                    <Select
                      placeholder={getStatus}
                      isDisabled={getStatus ? true : false}
                      options={[
                        { label: "Open", value: "bost_Open" },
                        { label: "Close", value: "bost_Close" },
                        { label: "All", value: null },
                        // { label: 'Draft', value: 'bost_Draft' }
                      ]} // Options to display in the dropdown
                      onChange={(e) => {
                        setgetdocumentstatus(e.value);
                      }} // Function will trigger on select event
                      // onRemove={BusinessPartners} Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <br />
                  <div
                    className="notes"
                    style={{
                      width: "23.5rem",
                      height: "auto",
                      marginLeft: "3rem",
                      border: "1px solid",
                      borderColor: "lightgray",
                      borderRadius: "4px",
                    }}
                  >
                    <a
                      onClick={(e) => {
                        SearchAll_Filter_Data();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      <svg class="svg-icon17" viewBox="0 0 20 20">
                        <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                      </svg>
                    </a>
                    <input
                      name={"SearchPRNumber"}
                      type="Number"
                      placeholder="Number"
                      class="form-control13"
                      onKeyDown={keyHandler}
                      style={{
                        backgroundColor: isfocused ? "#fce8a7" : "",
                      }}
                      ref={searchRef}
                      onChange={(e) => {
                        setSearchNumber(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  <br />
                  <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                    <label> Posting Date</label>
                    <input
                      type="date"
                      name="DocDate"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      defaultValue={
                        HeaderData && HeaderData.DocDate
                          ? HeaderData && HeaderData.DocDate
                          : currentDate
                      }
                    />
                  </div>
                  {/* <br/>
            <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e =>setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
                  {/* <div style={{ width: '23.5rem',marginLeft:'3rem'  }}>
                <label> Document Date</label>
                <input
                  type='date'
                  name='DocDueDate'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate || HeaderData && HeaderData.DocDueDate}
                  onChange={e => {
                    DocDateChange(e)
                  }}
                />
              </div> */}
                </Container>
              </DIV3>
            </CardGroup>
            {/* Table+++++++++ */}

            <Modal show={show3} onHide={handleClose3}>
              <Modal.Header closeButton>
                <Modal.Title>Batch</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {PQDocumentLines && (
                  <Table responsive striped bordered hover>
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Batch Number</th>
                        <th>Expiry Date</th>
                        <th>Manufacturing Date</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>BaseLine Number</th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {PQDocumentLines.map(
                        (PrReItem, PrReIndex) =>
                          PrReItem.isSelected &&
                          PrReItem.DocumentLines.map(
                            (item, index) =>
                              item.ItemCode === getvaluefromtable &&
                              item.LineStatus === "bost_Open" && (
                                <tr key={`${index}`}>
                                  <TD>{index + 1}</TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="text"
                                        name="BatchNumber"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        // defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate || HeaderData && HeaderData.DocDueDate}
                                        onChange={(e) => {
                                          getvaluefrombatchtable(
                                            e,
                                            index,
                                            PrReIndex
                                          );
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="date"
                                        name="ExpiryDate"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        // defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate || HeaderData && HeaderData.DocDueDate}
                                        onChange={(e) => {
                                          getvaluefrombatchtable(
                                            e,
                                            index,
                                            PrReIndex
                                          );
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="date"
                                        name="ManufacturingDate"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        defaultValue={item.ItemCode}
                                        onChange={(e) => {
                                          getvaluefrombatchtable(
                                            e,
                                            index,
                                            PrReIndex
                                          );
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="text"
                                        name="Location"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        defaultValue={item.ItemCode}
                                        onChange={(e) => {
                                          getvaluefrombatchtable(
                                            e,
                                            index,
                                            PrReIndex
                                          );
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    {" "}
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="number"
                                        name="Quantity"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        defaultValue={item.Quantity}
                                        onChange={(e) => {
                                          getvaluefrombatchtable(
                                            e,
                                            index,
                                            PrReIndex
                                          );
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    {" "}
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="number"
                                        name="BaseLineNumber"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        readOnly
                                        aria-describedby="emailHelp"
                                        defaultValue={item.LineNum}
                                        onChange={(e) => {
                                          getvaluefrombatchtable(
                                            e,
                                            index,
                                            PrReIndex
                                          );
                                        }}
                                      />
                                    </div>
                                  </TD>
                                </tr>
                              )
                          )
                      )}
                    </tbody>
                  </Table>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose3}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Tabs
              defaultActiveKey="Contents"
              transition={false}
              id="noanim-tab-example"
            >
              <Tab eventKey="Contents" title="Contents">
                {PQDocumentLines && (
                  <Table responsive striped bordered hover id="table-to-xls">
                    {Array.isArray(PQDocumentLines) &&
                    PQDocumentLines.length > 0 ? (
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Bar Code</th>
                          <th>Item</th>
                          {Array.isArray(getbatchnumbers) &&
                          getbatchnumbers.length > 0 ? (
                            <th>Batch</th>
                          ) : null}
                          <th>UoM Name</th>
                          <th>Quantity</th>
                          <th>Open Qty</th>
                          <th>Free Text</th>
                          <th>Whse</th>
                          <th>Project</th>
                          <th>Cost Centre</th>
                          <th>IGP No</th>
                          <th>IGP Quantity</th>
                          <th>MIR No</th>
                          <th>Approved Quantity</th>
                          <th>Rejected Quantity</th>
                        </tr>
                      </TableHead>
                    ) : null}
                    <tbody>
                      {PQDocumentLines.map(
                        (PrReItem, PrReIndex) =>
                          PrReItem.isSelected &&
                          PrReItem.DocumentLines.map(
                            (item, index) =>
                              item.isSelected &&
                              item.LineStatus === "bost_Open" && (
                                <tr key={`${index}`}>
                                  <TD>{index + 1}</TD>
                                  <TD>{item.BarCode}</TD>
                                  <TD>{item.ItemCode}</TD>
                                  {Array.isArray(getbatchnumbers) &&
                                  getbatchnumbers.length > 0 ? (
                                    <TD>
                                      <Button
                                        onClick={(e) => {
                                          modalshow(item);
                                        }}
                                      >
                                        {" "}
                                        Batch{" "}
                                      </Button>
                                    </TD>
                                  ) : null}
                                  <TD>{item.MeasureUnit}</TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        class="form-control"
                                        type="number"
                                        name="Quantity"
                                        defaultValue={item.Quantity}
                                        // onChange={e => {
                                        //   ontextChanged(e, index)
                                        // }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        class="form-control"
                                        type="number"
                                        readOnly="readOnly"
                                        name="OpenQty"
                                        defaultValue={
                                          item.RemainingOpenQuantity
                                        }
                                        // onChange={e => {
                                        //   ontextChanged(e, index)
                                        // }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        class="form-control"
                                        type="text"
                                        name="FreeText"
                                        defaultValue={item.FreeText}
                                        onChange={(e) => {
                                          ontextChanged(e, index, PrReIndex);
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      {PrWhse && (
                                        <Select
                                          menuPortalTarget={document.body}
                                          value={PrWhse.filter(
                                            (option) =>
                                              option.value ===
                                              item.WarehouseCode
                                          )}
                                          placeholder="Select.."
                                          options={PrWhse} // Options to display in the dropdown
                                          onChange={(e) => {
                                            DocLinesDropDownOnChange(
                                              e,
                                              index,
                                              PrReIndex,
                                              "WarehouseCode"
                                            );
                                          }}
                                          // onSelect={CostCentre} // Function will trigger on select event
                                          // onRemove={CostCentre} //Function will trigger on remove event
                                          displayValue="name" // Property name to display in the dropdown options
                                        />
                                      )}
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      {PrProject && (
                                        <Select
                                          menuPortalTarget={document.body}
                                          value={PrProject.filter(
                                            (option) =>
                                              option.value === item.ProjectCode
                                          )}
                                          placeholder="Select.."
                                          options={PrProject} // Options to display in the dropdown
                                          onChange={(e) => {
                                            DocLinesDropDownOnChange(
                                              e,
                                              index,
                                              PrReIndex,
                                              "ProjectCode"
                                            );
                                          }}
                                          // onSelect={Project} // Function will trigger on select event
                                          // onRemove={Project} //Function will trigger on remove event
                                          displayValue="name" // Property name to display in the dropdown options
                                        />
                                      )}
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      {PrCost && (
                                        <Select
                                          menuPortalTarget={document.body}
                                          value={PrCost.filter(
                                            (option) =>
                                              option.value === item.CostingCode
                                          )}
                                          placeholder="Select.."
                                          options={PrCost} // Options to display in the dropdown
                                          onChange={(e) => {
                                            DocLinesDropDownOnChange(
                                              e,
                                              index,
                                              PrReIndex,
                                              "CostingCode"
                                            );
                                          }}
                                          // onSelect={CostCentre} // Function will trigger on select event
                                          // onRemove={CostCentre} //Function will trigger on remove event
                                          displayValue="name" // Property name to display in the dropdown options
                                        />
                                      )}
                                    </div>
                                  </TD>
                                  <TD>{item.U_IGPEntry}</TD>
                                  <TD> {item.U_IGPQuantity}</TD>
                                  <TD>{item.U_MIREntry}</TD>
                                  <TD> {item.U_AQuantity}</TD>
                                  <TD> {item.U_RQuantity}</TD>
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
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Bar Code</th>
                          <th>Item</th>
                          <th>UoM Name</th>
                          <th>Quantity</th>
                          <th>Open Qty</th>
                          <th>IGP No</th>
                          <th>IGP Quantity</th>
                          <th>MIR No</th>
                          <th>Approved Quantity</th>
                          <th>Rejected Quantity</th>
                          <th>Whse</th>
                          <th>Project</th>
                          <th>Cost Centre</th>
                          <th>Free Text</th>
                        </tr>
                      </TableHead>
                    ) : null}
                    <tbody>
                      {SearchDocumentLines.map((item, index) => (
                        <tr key={`${index}`}>
                          <TD>{index + 1}</TD>
                          <TD></TD>
                          <TD>{item.ItemCode}</TD>
                          <TD>{item.MeasureUnit}</TD>
                          <TD>
                            <input
                              class="form-control"
                              type="number"
                              name="Quantity"
                              defaultValue={item.Quantity}
                              // onChange={e => {
                              //   ontextChanged(e, index)
                              // }}
                            />
                          </TD>
                          <TD>
                            <input
                              class="form-control"
                              type="number"
                              readOnly="readOnly"
                              name="OpenQty"
                              defaultValue={item.RemainingOpenQuantity}
                              // onChange={e => {
                              //   ontextChanged(e, index)
                              // }}
                            />
                          </TD>
                          <TD>{item.U_IGPEntry}</TD>
                          <TD> {item.U_IGPQuantity}</TD>
                          <TD>{item.U_MIREntry}</TD>
                          <TD> {item.U_AQuantity}</TD>
                          <TD> {item.U_RQuantity}</TD>
                          <TD>
                            <div style={{ width: "15em" }}>
                              {PrWhse && (
                                <Select
                                  menuPortalTarget={document.body}
                                  value={PrWhse.filter(
                                    (option) =>
                                      option.value === item.WarehouseCode
                                  )}
                                  placeholder="Select.."
                                  options={PrWhse} // Options to display in the dropdown
                                  onChange={(e) => {
                                    SearchDocLinesDropDownOnChange(
                                      e,
                                      index,
                                      "WarehouseCode"
                                    );
                                  }}
                                  // onSelect={CostCentre} // Function will trigger on select event
                                  // onRemove={CostCentre} //Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              )}
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: "15em" }}>
                              {PrProject && (
                                <Select
                                  menuPortalTarget={document.body}
                                  value={PrProject.filter(
                                    (option) =>
                                      option.value === item.ProjectCode
                                  )}
                                  placeholder="Select.."
                                  options={PrProject} // Options to display in the dropdown
                                  onChange={(e) => {
                                    SearchDocLinesDropDownOnChange(
                                      e,
                                      index,
                                      "ProjectCode"
                                    );
                                  }}
                                  // onSelect={Project} // Function will trigger on select event
                                  // onRemove={Project} //Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              )}
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: "15em" }}>
                              {PrCost && (
                                <Select
                                  menuPortalTarget={document.body}
                                  value={PrCost.filter(
                                    (option) =>
                                      option.value === item.CostingCode
                                  )}
                                  placeholder="Select.."
                                  options={PrCost} // Options to display in the dropdown
                                  onChange={(e) => {
                                    SearchDocLinesDropDownOnChange(
                                      e,
                                      index,
                                      "CostingCode"
                                    );
                                  }}
                                  // onSelect={CostCentre} // Function will trigger on select event
                                  // onRemove={CostCentre} //Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              )}
                            </div>
                          </TD>
                          <TD>
                            <input
                              class="form-control"
                              type="text"
                              name="FreeText"
                              defaultValue={item.FreeText}
                              onChange={(e) => {
                                SearchontextChanged(e, index);
                              }}
                            />
                          </TD>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Tab>
              <Tab eventKey="Logistics" title="Logistics">
                <Logistics
                  getDatafromParent={SelectedPRDocEntry}
                  getDatafromParent22={ModalHeaderData}
                  setgetAddress={setgetAddress}
                  setgetAddress2={setgetAddress2}
                  setgetTransportationCode={setgetTransportationCode}
                />
              </Tab>
              <Tab eventKey="Accounting" title="Accounting">
                <Accounting
                  setgetJournalMemo={setgetJournalMemo}
                  setgetGroupNumber={setgetGroupNumber}
                  setgetProject={setgetProject}
                  setgetCancelDate={setgetCancelDate}
                />
              </Tab>
              <Tab eventKey="Attachment" title="Attachment">
                <Attachment setattachmentresponse={setattachmentresponse} />
              </Tab>
            </Tabs>
            {/* Bottom Side+++++++++ */}
            <CardGroup>
              <DIV3>
                <Container fluid>
                  <div class="form-group">
                    <div style={{ width: "23.5rem" }}>
                      <label for="exampleFormControlTextarea1">Remarks</label>
                      <div style={{ width: "23.5rem" }}>
                        <textarea
                          class="form-control rounded-0"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          onChange={(e) => {
                            setRemarks(e.target.value);
                          }}
                          defaultValue={
                            HeaderData &&
                            HeaderData.Comments + ":" + HeaderData.DocEntry
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
                  {localStorage.getItem("documentcontroller") === "R" ? (
                    <div>
                      <Button
                        style={{ marginLeft: "5%" }}
                        onClick={() => {
                          window.location.href = "/Home";
                        }}
                      >
                        OK
                      </Button>
                      <Button
                        variant="secondary"
                        style={{ marginLeft: "5%" }}
                        onClick={() => {
                          window.location.href = "/Home";
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        style={{ marginLeft: "5%" }}
                        onClick={() => {
                          Submit_PatchFunc();
                        }}
                      >
                        {ButtonName}
                      </Button>

                      <Button
                        variant="secondary"
                        style={{ marginLeft: "5%" }}
                        onClick={() => {
                          window.location.href = "/Home";
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </Container>
              </DIV3>
              <DIV4>
                {/* {ModalHeaderData ? ( */}
                {/* null */}
                {/* ): */}
              </DIV4>
              <DIV3>
                {/* <div>
            <div style={{ width: '23.5rem'  ,marginLeft:'4rem'}}>
              <label style={{ marginTop: '10%' }}>
               Net Total </label>
              <input
              readOnly='readOnly'
                type='number'
                step='any'
                value={getnetTotal || totalbforeDiscount}
               //value={((SelectedPRDocEntry && SelectedPRDocEntry.DocTotal ||  HeaderData && HeaderData.DocTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.TotalDiscountSC || HeaderData && HeaderData.TotalDiscountSC || 0)) - ((PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys || 0))}
                // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                class='form-control'  />
            </div>
            <div style={{marginLeft:'4rem'}}>
            <label>Discount</label>
            <CardGroup>
            <div style={{ width: '11.75rem' }}>
            <input
              type='number'
              value={disc || (SelectedPRDocEntry && SelectedPRDocEntry.DiscountPercent || HeaderData && HeaderData.DiscountPercent) }
              onChange={e => {
                setdisc(e.target.value)
                setDiscountTotal((e.target.value * (getnetTotal||totalbforeDiscount)) / 100)
              }}
              class='form-control'
              name='TaxAmount(LC)'
            />
            </div>
            <div  style={{ width: '11.75rem' }}>
            <input
              type='number'
              // value={DiscountTotal}
                  onChange={e => {
                    setDiscountTotal(e.target.value)
                    setdisc((e.target.value / (getnetTotal||totalbforeDiscount)) * 100)
                  }}
              class='form-control'
              name='TaxAmount(LC)'
              value={DiscountTotal ||( SelectedPRDocEntry && SelectedPRDocEntry.TotalDiscountSC || HeaderData && HeaderData.TotalDiscountSC) }
            />
            </div>
            </CardGroup>
            </div>
          </div>
          <div style={{ width: '23.5rem'  ,marginLeft:'4rem'}}>
            <label>Freight</label>
            <input
              // placeholder={totalFreight}
              readOnly='readOnly'
              class='form-control'
              //value={PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || "null"}
              // value={PQDocumentLines && PQDocumentLines.DocumentLineAdditionalExpenses[0].LineTotal}
            />
          </div>
          <br />
          <div style={{ width: '23.5rem',marginLeft:'4rem'}}>
          <label>Tax</label>
            <input
              type='number'
              // onChange={e => setBottomTax(+e.target.value)}
              // value={BottomTax}
              class='form-control'
              name='TaxAmount(LC)'
              readOnly='readOnly'
              value={gettaxtotal||SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys }
            />
          </div>

          <div style={{ width: '23.5rem' ,marginLeft:'4rem' }}>
            <label>Total Payment Due:</label>
            <input type='text'
             value={(( (totalbforeDiscount||getnetTotal) - DiscountTotal ) + (gettaxtotal||SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys))|| SelectedPRDocEntry && SelectedPRDocEntry.DocTotal.toFixed(2) ||  HeaderData && HeaderData.DocTotal.toFixed(2)}
              placeholder='' 
              readOnly='readOnly'
              class='form-control' />
          </div> */}
              </DIV3>
            </CardGroup>
          </Form>
        </>
      )}
    </>
  );
}
