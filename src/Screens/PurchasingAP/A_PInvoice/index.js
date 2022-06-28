import React from "react";
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Modal,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";
import { MenuUp } from "react-bootstrap-icons";

import "../../../Screens/coupon.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FcCancel } from "react-icons/fc";
import { GrClose, GrView } from "react-icons/gr";
import { IoReload } from "react-icons/io5";

import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Logistics, Accounting } from "../../../Component/PurchaseQuotation";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import { CONSTANTS, LINKS } from "../../../Utils";
import { Navbar } from "../../../Component/Global";
import { useAlert } from "react-alert";
import { input, DIV3, DIV4, DIV7, DIV6, InputD, TableHead, TD } from "./Style";
import "./index.css";
import Switch from "react-switch";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Invoice() {
  const alert = useAlert();
  const [SelectShow, setSelectShow] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [VendorCode, setVendorCode] = React.useState();
  const classes = useStyles();
  const [getpurchaseordersdocentry, setgetpurchaseordersdocentry] =
    React.useState();
  const [show, setShow] = React.useState(false);
  const [getseriesnumbring, setgetseriesnumbring] = React.useState();
  const [showA, setShowA] = React.useState(false);
  const [bothbodies, setbothbodies] = React.useState(false);
  const [SelectedBuyer, setSelectedBuyer] = React.useState();
  const [getStatus, setgetStatus] = React.useState();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [gettotalQuantity, setgettotalQuantity] = React.useState();
  const [getcomments, setgetcomments] = React.useState();
  const [getdocentry, setgetdocentry] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [show3, setShow3] = React.useState(false);
  const [getvaluefromtable, setgetvaluefromtable] = React.useState();
  const [JEshow, setJEShow] = React.useState(false);
  const [OpenQty, setOpenQty] = React.useState();
  const [valuechacker, setvaluechacker] = React.useState();
  const [getdirectdoctype, setgetdirectdoctype] = React.useState();
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState();
  const [SelectedCP, setSelectedCP] = React.useState();
  const [getTransNum, setgetTransNum] = React.useState();
  const [SelectedOwner, setSelectedOwner] = React.useState();
  const [batchnumberlines, setbatchnumberlines] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [ButtonName, setButtonName] = React.useState();
  const [cancelbutton, setcancelbutton] = React.useState(false);
  const [SelectedVendor, setSelectedVendor] = React.useState();
  const [downpayment, setdownpayment] = React.useState(0);
  const [gettotaldebit, setgettotaldebit] = React.useState(0);
  const [gettotalcredit, setgettotalcredit] = React.useState(0);
  const [gettaxtotal, setgettaxtotal] = React.useState();
  const [getnetTotal, setgetnetTotal] = React.useState();
  const [getlinenum, setgetlinenum] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [getpostingdate, setgetpostingdate] = React.useState();
  const [getdeliverydate, setgetdeliverydate] = React.useState();
  const [JEHeaderData, setJEHeaderData] = React.useState();
  const [JournalEntryLines, setJournalEntryLines] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState();
  const [discountpercent, setdiscountpercent] = React.useState(0);
  const [PRBody, setPRBody] = React.useState({});
  const [DelDate, setDelDate] = React.useState();
  const [AccountselectedItems, setAccountSelectedItems] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [Bra, setBra] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [update, setUpdate] = React.useState(1);
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
  const [PrBuyer, setPrBuyer] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [TodayDate, setTodayDate] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [OwnerPrRe, setOwnerPrRe] = React.useState();
  const [Disply, setDisply] = React.useState(false);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [CP, setCP] = React.useState();
  const [GN, setGN] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Discount, setDiscount] = React.useState();
  const [Tax, setTax] = React.useState();
  const [total, setTotal] = React.useState();
  const [TotalGross, setTotalGross] = React.useState();
  const [BottomTax, setBottomTax] = React.useState();
  const [BottomDiscount, setBottomDiscount] = React.useState();
  const [TotalPayment, setTotalPayment] = React.useState();
  const [DiscountTotal, setDiscountTotal] = React.useState(0);
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [totalFreight, setTotalFreight] = React.useState();
  const [disc, setdisc] = React.useState(0);
  const [ShipDate, setShipDate] = React.useState();
  const [getcopyfromvalue, setgetcopyfromvalue] = React.useState();
  const [getbatchnumbers, setgetbatchnumbers] = React.useState();
  // const [OpenQty, setOpenQty] = React.useState()
  const [Total_LC, setTotal_LC] = React.useState();
  //Component Hooks---
  const [getdocumenttype, setgetdocumenttype] = React.useState("18");
  const [getdocumentname, setgetdocumentname] = React.useState("PCH2");
  const [ModuleName, setModuleName] = React.useState("PurchaseInvoices");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [getAddress, setgetAddress] = React.useState();
  const [getAddress2, setgetAddress2] = React.useState();
  const [getTransportationCode, setgetTransportationCode] = React.useState();
  const [getGroupNumber, setgetGroupNumber] = React.useState();
  const [getJournalMemo, setgetJournalMemo] = React.useState();
  const [getProject, setgetProject] = React.useState();
  const [getCancelDate, setgetCancelDate] = React.useState();
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
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
    await setgetdocumentname("PCH2");
    await setModuleName("PurchaseInvoices");
    await setgetdocumenttype("18");
    setButtonName("Add");
    setSearchNumber("0");
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    // let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    // if (formcontroller) {
    //   formcontroller.forEach(async (element) => {
    //     if (element.U_FormId === "OPCH") {
    //       await localStorage.setItem(
    //         "documentcontroller",
    //         element.U_Authorization
    //       );
    //     }
    //   });
    // }
    if (showA == "true") {
      setShowA(true);
      // setShow1(true)
      compareDate();
      await localStorage.removeItem("ShowBranches");
    }
    let cook2 = await localStorage.getItem("secondcookie");
    getpurchaseorders(cook2);
    if (cook) Project(cook);
    BusinessPartners(cook);
    getItemsList(cook);
    CostCentre(cook);
    Buyer(cook);
    Owner(cook);
    defaultWhse(cook);
    PurchaseQuotation(cook);
    OwnerPurchaseRequest(cook);
    Frieght1(cook);
    TableTaxCode(cook);
  }, [setShowA]);
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `PurchaseInvoices(${id})`,
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
  const getpurchaseorders = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: `PurchaseDeliveryNotes?$select=DocEntry,DocNum`,
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
    setgetpostingdate(year + "-" + month + "-" + day);
    setgetdeliverydate(year + "-" + month + "-" + day);
    // console.log("Today",currentDate)
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
  const BusinessPartners = async (cook) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------

    const api = `${LINKS.api}/GetApi`;
    let SAPapi = LINKS.sap.MasterData.ActiveVendor;
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
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
  const ContactPerson = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");

    // let SAPapi = `sml.svc/ACTIVECONTACTPERSON?$filter=CardCode eq '${SelectedVendor}' &$orderby=CntctCode`
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq  '${SelectedVendor}'`;

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie,
      })
      .then(function (res) {
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
  const OwnerhandleClose = () => setDisply(false);
  const OwnerhandleShow = () => setDisply(true);
  const getItemsList = async (cook) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // let SAPapi = `ChartOfAccounts?$filter=AccountLevel eq 5`
    let SAPapi = `ChartOfAccounts?$select=Code,AccountLevel,Name&$filter=ActiveAccount eq 'tYES' &$orderby=Code`;
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cook,
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
        ItemsDetails[element.Code] = {
          Code: element.Code,
          Name: element.Name,
        };
        ItemsDropDown.push({
          value: element.Code,
          label: element.Code + " : " + element.Name,
          item: element,
        });
      });
      console.log("ItemsDetails", ItemsDetails);
      await setItemsDropDown(ItemsDropDown);
      await setItemsDetails(ItemsDetails);
    }
  };
  const CPChange = (e) => {
    setSelectedCP(e.value);
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
  const Project = async (cookie, e) => {
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
  const CostCentre = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.costingCode,
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
        api: LINKS.sap.PurchaseRequest.Freight,
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
        api: LINKS.sap.PurchaseRequest.salesEmployee,
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
        api: LINKS.sap.PurchaseRequest.emplyeeInfo,
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
  const ShipDateChange = (e, index, name, PrReIndex) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index]["ShipDate"] = e.target.value;
    setShipDate(itemDetail);
  };
  const SearchShipDateChange = (e, index, name) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index]["ShipDate"] = e.target.value;
    setSearchDocumentLines(itemDetail);
  };
  const DeliveryDateChange = async (e) => {
    setDelDate(e.target.value);
  };
  const PurchaseQuotation = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseQuotation.PurchaseQuotation,
        cookie: cookie,
      })
      .then(function (res) {
        setPrRe(res.data.value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const OwnerPurchaseRequest = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.emplyeeInfo,
        cookie: cookie,
      })
      .then(function (res) {
        setOwnerPrRe(res.data.value);
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
    if (getcopyfromvalue === "PO") {
      let SAPapi = `PurchaseOrders?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${SelectedVendor}'and startswith(DocNum,'${getseriesnumbring}')`;
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
    } else {
      let SAPapi = `PurchaseDeliveryNotes?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${SelectedVendor}'and startswith(DocNum,'${getseriesnumbring}')`;
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
    }
  };
  const selectPR = async (item) => {
    setShow(false);
    setHeaderData(item);
    setgetTransNum(item.TransNum);
    setgetdocentry(item.DocEntry);
    localStorage.setItem("getDocEntry", item.DocEntry);
    if (item.DocumentStatus == "bost_Open") {
      setgetStatus("Open");
      setcancelbutton(true);
      setButtonName("Update");
    } else {
      setgetStatus("Close");
      setButtonName("Update");
    }
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
      let sapAPi = `PurchaseInvoices?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum desc`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `PurchaseInvoices?$orderby=DocNum`;
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
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `PurchaseInvoices?$filter=DocNum eq ${SearchNumber} &$orderby=DocNum asc`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res);
        setHeaderData(res.data.value[0]);
        setgetTransNum(res.data.value[0].TransNum);
        setgetdocentry(res.data.value[0].DocEntry);
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        setSearchDocumentLines(res.data.value[0].DocumentLines);
        // let sum = 0
        // res.data.value[0].DocumentLines.forEach(item => {
        //   sum = sum + item.LineTotal
        // })
        if (res.data.value[0].DocumentStatus == "bost_Open") {
          setgetStatus("Open");
          setButtonName("Update");
          setcancelbutton(true);
        } else {
          setgetStatus("Close");
          setButtonName("Update");
        }
        // setTotalbforeDiscount(sum)
        if (HeaderData != "") {
        }
      })
      .catch({});
  };
  const UnitPriceChanged = (e, index, PrReIndex) => {
    let sum = 0;
    let sum2 = 0;
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value;
    itemDetail[PrReIndex].DocumentLines[index]["Price"] =
      itemDetail[PrReIndex].DocumentLines[index]["UnitPrice"] -
      (itemDetail[PrReIndex].DocumentLines[index]["UnitPrice"] *
        itemDetail[PrReIndex].DocumentLines[index]["DiscountPercent"]) /
        100;
    itemDetail[PrReIndex].DocumentLines[index]["LineTotal"] =
      Number(itemDetail[PrReIndex].DocumentLines[index]["Price"]) *
      Number(itemDetail[PrReIndex].DocumentLines[index]["Quantity"]);
    itemDetail[PrReIndex].DocumentLines[index]["GrossTotal"] =
      Number(itemDetail[PrReIndex].DocumentLines[index]["Price"]) *
        Number(itemDetail[PrReIndex].DocumentLines[index]["Quantity"]) +
      Number(itemDetail[PrReIndex].DocumentLines[index]["TaxTotal"]);
    itemDetail[PrReIndex][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    itemDetail[PrReIndex].DocumentLines.forEach((element) => {
      sum = sum + element.LineTotal;
      sum2 = sum2 + element.TaxTotal;
    });
    setTotalbforeDiscount(sum);
    setgettaxtotal(sum2);
    setPQDocumentLines(itemDetail);
  };
  const DocLinesDropDownOnChange2 = (selectedItem, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value;
    itemDetail[PrReIndex][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setPQDocumentLines(itemDetail);
  };
  const DocLinesDropDownOnChange = (selectedItem, index, PrReIndex, name) => {
    let sum2 = 0;
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value;
    itemDetail[PrReIndex].DocumentLines[index]["TaxTotal"] =
      (Number(itemDetail[PrReIndex].DocumentLines[index]["LineTotal"]) *
        selectedItem.item.VatGroups_Lines[0].Rate) /
      100;
    itemDetail[PrReIndex].DocumentLines[index]["GrossTotal"] =
      Number(itemDetail[PrReIndex].DocumentLines[index]["Price"]) *
        Number(itemDetail[PrReIndex].DocumentLines[index]["Quantity"]) +
      Number(itemDetail[PrReIndex].DocumentLines[index]["TaxTotal"]);

    itemDetail[PrReIndex][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    itemDetail[PrReIndex].DocumentLines.forEach((element) => {
      sum2 = sum2 + element.TaxTotal;
    });
    setgettaxtotal(sum2);
    setPQDocumentLines(itemDetail);
  };
  const SearchDocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    itemDetail[index]["GrossPrice"] = selectedItem.item.VatGroups_Lines[0].Rate;
    setSearchDocumentLines(itemDetail);
  };
  const Home = () => {
    const alert = useAlert();
  };
  const VendorChange = (e) => {
    setSelectedVendor(e.value);
  };
  const OpenQtyFunction = (e, index) => {
    let doclines = PQDocumentLines;
    const value = e.target.value;
    doclines[index]["RemainingOpenQuantity"] = value;
    setPQDocumentLines(doclines);
  };
  const submitPatchPO = async () => {
    let docLines = [];
    PQDocumentLines.forEach((element) => {
      docLines.push({
        RequiredDate: element.RequiredDate,
        ItemCode: element.ItemCode,
        ItemDescription: element.ItemDescription,
        MeasureUnit: element.MeasureUnit,
        FreeText: element.FreeText,
        RequriedDate: element.RequiredDate,
        RequiredQuantity: element.Quantity,
        BaseOpenQuantity: element.RemainingOpenQuantity,
        U_MPrice: element.U_MPrice,
        LineVendor: element.LineVendor,
        CostingCode: element.CostingCode,
        ProjectCode: element.ProjectCode,
        SalesPersonCode: element.SalesPersonCode,
        WarehouseCode: element.WarehouseCode,
      });
    });
    let body = {
      Comments: getcomments,
      DocumentLines: docLines,
      AttachmentEntry: attachmentresponse,
    };
    Patch(HeaderData.DocEntry, body);
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitInvoice();
    } else if (ButtonName != "Add") {
      submitPatchPO();
    }
  };
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
  const submitInvoice = async () => {
    let DocLines = [];
    let secondDBlines = [];
    let BatchDocLines = [];
    let body = PRBody;
    let body2 = {};
    let batchdata = batchnumberlines;
    if (valuechacker && getcopyfromvalue === "PO") {
      batchdata.forEach((element2) => {
        BatchDocLines.push({
          BatchNumber: element2.BatchNumber,
          ExpiryDate: element2.ExpiryDate,
          ManufacturingDate: element2.ManufacturingDate,
          Location: element2.ItemCode,
          Quantity: element2.BatchQuantity,
          BaseLineNumber: element2.LineNum,
        });
      });
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 22,
                BaseLine: item.LineNum,
                BatchNumbers: BatchDocLines.filter(function (i) {
                  return (
                    i.BaseLineNumber === item.LineNum &&
                    i.Location === item.ItemCode
                  );
                }),
                DiscountPercent: item.DiscountPercent,
                FreeText: item.FreeText,
                Quantity: item.Quantity,
                UnitPrice: item.UnitPrice,
                VatGroup: item.VatGroup,
                WarehouseCode: item.WarehouseCode,
                ProjectCode: item.ProjectCode,
                SalesPersonCode: item.SalesPersonCode,
                Currency: item.Currency,
                Rate: item.Rate,
              });

              body["DocumentLines"] = DocLines;
              body["U_CreatedBy"] = "Web UI";
              body["CardCode"] = SelectedVendor;
              body["DiscountPercent"] = discountpercent;
              body["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body["Address"] = getAddress;
              body["Address2"] = getAddress2;
              body["TransportationCode"] = getTransportationCode;
              body["JournalMemo"] = getJournalMemo;

              body["DocCurrency"] = element.DocCurrency;
              body["DocRate"] = element.DocRate;

              body["GroupNumber"] = getGroupNumber;
              body["Project"] = getProject;
              body["SalesPersonCode"] = SelectedBuyer;
              body["Series"] = getseriesvalue;
              body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              body["DocDate"] = getpostingdate ? getpostingdate : currentDate;
              body["DocDueDate"] = getdeliverydate
                ? getdeliverydate
                : currentDate;
            }
          });
        }
      });
    } else if (getcopyfromvalue === "PO") {
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 22,
                BaseLine: item.LineNum,
                DiscountPercent: item.DiscountPercent,
                FreeText: item.FreeText,
                Quantity: item.Quantity,
                UnitPrice: item.UnitPrice,
                VatGroup: item.VatGroup,
                WarehouseCode: item.WarehouseCode,
                ProjectCode: item.ProjectCode,
                SalesPersonCode: item.SalesPersonCode,
                Currency: item.Currency,
                Rate: item.Rate,
              });
              body["DocumentLines"] = DocLines;
              body["CardCode"] = SelectedVendor;
              body["U_CreatedBy"] = "Web UI";
              body["DiscountPercent"] = discountpercent;
              body["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body["Address"] = getAddress;
              body["Address2"] = getAddress2;
              body["TransportationCode"] = getTransportationCode;
              body["JournalMemo"] = getJournalMemo;

              body["DocCurrency"] = element.DocCurrency;
              body["DocRate"] = element.DocRate;

              body["GroupNumber"] = getGroupNumber;
              body["Project"] = getProject;
              body["SalesPersonCode"] = SelectedBuyer;
              body["Series"] = getseriesvalue;
              body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              body["DocDate"] = getpostingdate ? getpostingdate : currentDate;
              body["DocDueDate"] = getdeliverydate
                ? getdeliverydate
                : currentDate;
            }
          });
        }
      });
    } else {
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 20,
                BaseLine: item.LineNum,
                Currency: item.Currency,
                Rate: item.Rate,
              });
              body["DocumentLines"] = DocLines;
              body["CardCode"] = SelectedVendor;
              body["U_CreatedBy"] = "Web UI";
              body["DiscountPercent"] = discountpercent;
              body["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body["Address"] = getAddress;
              body["Address2"] = getAddress2;
              body["TransportationCode"] = getTransportationCode;
              body["JournalMemo"] = getJournalMemo;
              body["GroupNumber"] = getGroupNumber;
              body["DocCurrency"] = element.DocCurrency;
              body["DocRate"] = element.DocRate;
              body["Project"] = getProject;
              body["SalesPersonCode"] = SelectedBuyer;
              body["Series"] = getseriesvalue;
              body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              body["DocDate"] = getpostingdate ? getpostingdate : currentDate;
              body["DocDueDate"] = getdeliverydate
                ? getdeliverydate
                : currentDate;
            }
          });
        }
      });
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              secondDBlines.push({
                BaseEntry: getpurchaseordersdocentry[element.DocNum].DocEntry,
                BaseType: 20,
                BaseLine: item.LineNum,
                Currency: item.Currency,
                Rate: item.Rate,
              });
              body2["DocumentLines"] = secondDBlines;
              body2["CardCode"] = SelectedVendor;
              body2["U_CreatedBy"] = "Web UI";
              body2["DiscountPercent"] = discountpercent;
              body2["AttachmentEntry"] = attachmentresponse;
              //Component posting------
              body2["Address"] = getAddress;
              body2["Address2"] = getAddress2;
              body2["TransportationCode"] = getTransportationCode;
              body2["JournalMemo"] = getJournalMemo;
              body2["GroupNumber"] = getGroupNumber;
              body2["DocCurrency"] = element.DocCurrency;
              body2["DocRate"] = element.DocRate;
              body2["Project"] = getProject;
              body2["SalesPersonCode"] = SelectedBuyer;
              body2["Series"] = getseriesvalue;
              body2["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              body2["DocDate"] = getpostingdate ? getpostingdate : currentDate;
              body2["DocDueDate"] = getdeliverydate
                ? getdeliverydate
                : currentDate;
            }
          });
        }
      });
    }
    console.log(JSON.stringify(body));
    console.log(JSON.stringify(body2));
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
          api: LINKS.sap.PurchaseInvoices.PurchaseInvoices,
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
  const PostInSecondDB = async (body2, body) => {
    let cook = await localStorage.getItem("secondcookie");
    if (cook) {
      await axios
        .post(API_TYPES.SECONDPOST, {
          body: JSON.stringify(body2),
          api: LINKS.sap.PurchaseInvoices.PurchaseInvoices,
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
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset();
    Dropdown.reset();
  };
  const [modalOne, setModalOne] = React.useState();
  const [modalTwo, setModalTwo] = React.useState();
  //   const [modalThree,setModalThree]=React.useState();
  //   const [modalFour,setModalFour]=React.useState();
  const handleClosee = () => setJEShow(false);
  const handleCloseee = () => setModalTwo(false);
  function handleShowModalOne() {
    setModalOne("modal-one");
  }
  const handleShowModalTwo = () => {
    setModalTwo("modal-two");
  };
  const ItemsDropDownfunc2 = async (selectedList) => {
    let list = [];
    selectedList.forEach((element) => {
      list.push(element.value);
    });
    await setAccountSelectedItems(list);
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
    setPQDocumentLines(prData);
  };
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
          setTotalbforeDiscount(sum);
          setgettaxtotal(sum1);
        });
      }
    });
  };
  const DocTypeChange = (e) => {
    if (e.value === "Service") {
      setgetcopyfromdoctype();
      setgetdirectdoctype("Service");
    } else if (e.value === "Item") {
      setgetdirectdoctype();
      setgetcopyfromdoctype("Item");
    }
  };
  const modalshow = (item) => {
    setbatchnumberlines([item]);
    setgettotalQuantity(item.Quantity);
    setgetvaluefromtable(item.ItemCode);
    setgetlinenum(item.LineNum);
    setShow3(true);
  };
  const handleClose3 = () => {
    setShow3(false);
  };
  const getvaluefrombatchtable = (e, index) => {
    let itemDetail = batchnumberlines;
    itemDetail[index][e.target.name] = e.target.value;
    setbatchnumberlines(itemDetail);
  };
  const documentcancel = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `PurchaseInvoices(${getdocentry})/Cancel`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("res", res);
        if (res.data.error) {
          alert.error(JSON.stringify(res.data.error.message));
        } else {
          alert.success("Operation completed successfully");
        }
      })
      .catch({});
  };
  const BatchQtychanger = (e, index) => {
    let object = batchnumberlines;
    object[index][e.target.name] = e.target.value;
    setbatchnumberlines(object);
  };
  const BatchQtychanger2 = (e, index) => {
    let sum = 0;
    let object = batchnumberlines;
    object.forEach((el) => {
      sum = sum + Number(el.BatchQuantity);
    });
    setbatchnumberlines(object);
    if (sum === gettotalQuantity) {
      let object1 = batchnumberlines;
      object1[index][e.target.name] = e.target.value;
      object1[index]["ItemCode"] = getvaluefromtable;
      object1[index]["LineNum"] = getlinenum;
      object1[`ùpdate${update + 1}`] = update + 1;
      setUpdate(update + 1);
      setbatchnumberlines(object1);
      setvaluechacker("object1");
      handleClose3();
    } else if (sum > gettotalQuantity) {
      let object = batchnumberlines;
      object[index]["ItemCode"] = getvaluefromtable;
      object[index]["LineNum"] = getlinenum;
      setbatchnumberlines(object);
      alert.error("Selected Quantity must be less or equal to Quantity");
    } else if (sum < gettotalQuantity) {
      let obj = batchnumberlines;
      obj[index][e.target.name] = e.target.value;
      obj[index]["ItemCode"] = getvaluefromtable;
      obj[index]["LineNum"] = getlinenum;
      obj[`ùpdate${update + 1}`] = update + 1;
      setUpdate(update + 1);
      setbatchnumberlines([...batchnumberlines, obj]);
    }
  };
  const TransactionNumber = async () => {
    let sapAPi = `JournalEntries?$filter=OriginalJournal eq 'ttAPInvoice' and JdtNum  eq ${getTransNum}`;
    console.log("SAPapi", sapAPi);
    let sum = 0;
    let sum2 = 0;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("JournalEntry", res);
        setJEHeaderData(res.data.value[0]);
        setJournalEntryLines(res.data.value[0].JournalEntryLines);
        res.data.value[0].JournalEntryLines.forEach((item) => {
          sum = sum + Number(item.Debit);
          sum2 = sum2 + Number(item.Credit);
        });
        setgettotaldebit(sum);
        setgettotalcredit(sum2);
      })
      .catch({});
    setJEShow(true);
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
          <h1 style={{ textAlign: "center" }}>A/P Invoice</h1>
          {/* Upper Side++++++++ */}
          <Form onSubmit={handleSubmitted}>
            <ContextMenuTrigger id="contextmenu">
              <CardGroup>
                <DIV3>
                  <Container fluid>
                    <label>Copy From</label>
                    <div
                      style={{ width: "23.5rem", height: "auto" }}
                      variant="primary"
                    >
                      <Select
                        placeholder="Select"
                        options={[
                          { label: "Goods Receipt PO", value: "GRPO" },
                          { label: "Purchase Order", value: "PO" },
                        ]} // Options to display in the dropdown
                        // onInputChange={e=>console.log(e)}
                        onChange={(e) => {
                          setgetcopyfromvalue(e.value);
                        }} // Function will trigger on select event
                        // onRemove={BusinessPartners} Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <label>Doc Type</label>
                    <div
                      style={{ width: "23.5rem", height: "auto" }}
                      variant="primary"
                    >
                      <Select
                        placeholder="Select"
                        options={[
                          { label: "Item", value: "Item" },
                          { label: "Service", value: "Service" },
                        ]} // Options to display in the dropdown
                        onChange={(e) => {
                          DocTypeChange(e);
                        }} // Function will trigger on select event
                        // onRemove={BusinessPartners} Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <label>Vendor</label>
                    <div
                      style={{ width: "23.5rem", height: "auto" }}
                      variant="primary"
                    >
                      <Select
                        placeholder={HeaderData && HeaderData.CardCode}
                        options={VendorCodeDropdown} // Options to display in the dropdown
                        onChange={(e) => {
                          VendorChange(e);
                        }}
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <label>Contact Person</label>
                    <div
                      style={{ width: "23.5rem", height: "auto" }}
                      variant="primary"
                      onClick={ContactPerson}
                    >
                      <Select
                        placeholder={HeaderData && HeaderData.ContactPersonCode}
                        options={ContactPersonDropdown} // Options to display in the dropdown
                        displayValue="name" // Property name to display in the dropdown options
                        onChange={(e) => {
                          CPChange(e);
                        }}
                      />
                      {/* )} */}
                    </div>
                    <br />
                    {/* --------------------Start Journal Entry Modal------------------ */}
                    <Modal
                      show={JEshow}
                      onHide={handleClosee}
                      className="Modal-big"
                      size="lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Journal Entry
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <CardGroup>
                            <DIV7>
                              <Container fluid>
                                <CardGroup>
                                  <div
                                    style={{ width: "10em", height: "auto" }}
                                  >
                                    <label>Series</label>
                                    <Select
                                      style={{ height: "2px" }}
                                      options={[
                                        { label: "Primary", value: "Primary" },
                                      ]}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Number</label>
                                    <input
                                      type="text"
                                      readOnly
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.Number
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Posting Date</label>
                                    <input
                                      type="date"
                                      name="PostingDate"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.TaxDate
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Due Date</label>
                                    <input
                                      type="date"
                                      name="DueDate"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.TaxDate
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Doc Date</label>
                                    <input
                                      type="date"
                                      name="DocDate"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.TaxDate
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "20rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Remarks</label>
                                    <input
                                      type="text"
                                      name="Remarks"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.Memo
                                      }
                                    ></input>
                                  </div>
                                </CardGroup>
                                <CardGroup>
                                  <div
                                    style={{ width: "10rem", height: "auto" }}
                                  >
                                    <label>Origin No.</label>
                                    <input
                                      type="text"
                                      name="OriginNo"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.Reference
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Trans. No</label>
                                    <input
                                      type="text"
                                      name="TransNo"
                                      class="form-control"
                                      readOnly
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.JdtNum
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Project</label>
                                    <Select
                                      placeholder={
                                        JEHeaderData && JEHeaderData.ProjectCode
                                      }
                                    />
                                  </div>
                                </CardGroup>
                                <CardGroup>
                                  <div
                                    style={{ width: "10rem", height: "auto" }}
                                  >
                                    <label>Ref.1</label>
                                    <input
                                      type="text"
                                      name="Ref_1"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.Reference
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Ref.2</label>
                                    <input
                                      type="text"
                                      name="Ref_2"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.Reference2
                                      }
                                    ></input>
                                  </div>
                                  <div
                                    style={{
                                      width: "10rem",
                                      height: "auto",
                                      marginLeft: "2rem",
                                    }}
                                  >
                                    <label>Ref.3</label>
                                    <input
                                      type="text"
                                      name="Ref_3"
                                      class="form-control"
                                      defaultValue={
                                        JEHeaderData && JEHeaderData.Reference3
                                      }
                                    ></input>
                                  </div>
                                  <br />
                                  <br />
                                </CardGroup>
                                <div style={{ width: "22rem", height: "auto" }}>
                                  <label>Charts Of Accounts</label>
                                  <Select
                                    isMulti
                                    placeholder="Select"
                                    options={ItemsDropDown}
                                    // onChange={ItemsDropDownfunc}
                                    displayValue="name"
                                  />
                                </div>
                              </Container>
                              <br />
                              <br />
                              <br />
                              <br />
                              <br />
                            </DIV7>
                            <DIV6>
                              <Container></Container>
                            </DIV6>
                          </CardGroup>
                          <Tabs
                            defaultActiveKey="Contents"
                            transition={false}
                            id="noanim-tab-example"
                          >
                            <Tab eventKey="Contents" title="Contents">
                              <div>
                                {JournalEntryLines && (
                                  <Table responsive striped bordered hover>
                                    {Array.isArray(JournalEntryLines) &&
                                    JournalEntryLines.length > 0 ? (
                                      <TableHead>
                                        <tr>
                                          <th> #</th>
                                          <th>G/L Acct/BP Code</th>
                                          <th>G/L Acct/BP Name</th>
                                          <th>Debit</th>
                                          <th>Credit</th>
                                          <th>Empolee id</th>
                                          <th>Remarks</th>
                                          <th>Ref. 1</th>
                                          <th>Ref.3</th>
                                          <th>Project</th>
                                          <th>Cost Center</th>
                                        </tr>
                                      </TableHead>
                                    ) : null}
                                    <tbody>
                                      {JournalEntryLines.map((item, index) => (
                                        <tr key={`${index}`}>
                                          <TD>{index + 1}</TD>
                                          <TD>{item.AccountCode}</TD>
                                          <TD>
                                            {
                                              ItemsDetails[item.AccountCode]
                                                .Name
                                            }
                                          </TD>
                                          <TD>{item.Debit}</TD>
                                          <TD>{item.Credit}</TD>
                                          <TD>{item.U_EmployeeID}</TD>
                                          <TD>{item.LineMemo}</TD>
                                          <TD>{item.Reference1}</TD>
                                          <TD>{item.Reference2}</TD>
                                          <TD>{item.ProjectCode}</TD>
                                          <TD>{item.CostingCode}</TD>
                                        </tr>
                                      ))}
                                      <tr>
                                        <TD></TD>
                                        <TD></TD>
                                        <TD></TD>
                                        <TD>{gettotaldebit}</TD>
                                        <TD>{gettotalcredit}</TD>
                                        <TD></TD>
                                        <TD></TD>
                                        <TD></TD>
                                        <TD></TD>
                                        <TD></TD>
                                        <TD></TD>
                                      </tr>
                                    </tbody>
                                  </Table>
                                )}
                              </div>
                            </Tab>
                            <Tab eventKey="Attachment" title="Attachment">
                              <Attachment
                                setattachmentresponse={setattachmentresponse}
                              />
                            </Tab>
                          </Tabs>
                          <DIV3>
                            <Container fluid></Container>
                          </DIV3>
                          <br />
                          <br />
                          <div style={{ marginLeft: "2rem" }}>
                            <Button
                              style={{ marginLeft: "5%" }}
                              type="reset"
                              onClick={() => {
                                handleClosee();
                              }}
                            >
                              OK
                            </Button>
                            <Button
                              style={{ marginLeft: "5%" }}
                              onClick={() => {
                                handleClosee();
                              }}
                              type="reset"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer></Modal.Footer>
                    </Modal>
                    {/* --------------------End Journal Entry Modal------------------ */}
                    {getcopyfromdoctype && getseriesvalue ? (
                      <Button variant="primary" onClick={handleShow}>
                        Copy From
                      </Button>
                    ) : null}
                    <Modal
                      show={show}
                      onHide={handleClose}
                      className="Modal-big"
                      size="lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Document Numbers List
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
                    <Modal show={show3} onHide={handleClose3}>
                      <Modal.Header closeButton>
                        <Modal.Title>Batch</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {batchnumberlines && (
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
                              {batchnumberlines.map((item, index) => (
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
                                        onChange={(e) => {
                                          getvaluefrombatchtable(e, index);
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
                                        onChange={(e) => {
                                          getvaluefrombatchtable(e, index);
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
                                        onChange={(e) => {
                                          getvaluefrombatchtable(e, index);
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="text"
                                        name="ItemCode"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        defaultValue={item.ItemCode}
                                        onChange={(e) => {
                                          getvaluefrombatchtable(e, index);
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    {" "}
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="number"
                                        name="BatchQuantity"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        defaultValue={item.BatchQuantity}
                                        onChange={(e) => {
                                          BatchQtychanger(e, index);
                                        }}
                                        onKeyPress={(e) => {
                                          if (
                                            e.key === "Enter" ||
                                            e.key === "NumpadEnter"
                                          ) {
                                            BatchQtychanger2(e, index);
                                          }
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
                                      />
                                    </div>
                                  </TD>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={BatchQtychanger2}>
                          Add
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal
                      show={modalTwo === "modal-two"}
                      className="Modal-big"
                      size="lg"
                    >
                      <Modal.Title id="example-modal-sizes-title-lg">
                        List of Open Items
                      </Modal.Title>
                      <Modal.Body>
                        <Table responsive striped bordered hover>
                          <TableHead>
                            <tr>
                              <th>#</th>
                              <th>Bar Code</th>
                              <th>Item No.</th>
                              <th>Item Description</th>
                              <th>UoM Name</th>
                              <th>Free Text</th>
                              <th>Quantity</th>
                              <th>Delivery Date</th>
                              <th>Open Qty</th>
                              <th>Whse</th>
                              <th>Unit Price</th>
                              <th>Discount</th>
                              <th>Price after Discount</th>
                              <th>Tax Code : Rate</th>
                              <th>Tax Amount(LC)</th>
                              <th>Gross Price After Disc.</th>
                              <th>Freight 1</th>
                              <th>Freight 1 (LC)</th>
                              <th>Line Total</th>
                              <th>Gross Total(LC)</th>
                              <th>Project</th>
                              <th>Buyer</th>
                              <th>Cost Centre</th>
                            </tr>
                          </TableHead>
                          <tbody>
                            {PQDocumentLines &&
                              PQDocumentLines.map(
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
                                          <TD>{item.ItemDescription}</TD>
                                          <TD>{item.MeasureUnit}</TD>
                                          <TD>
                                            <div
                                              style={{
                                                width: "14rem",
                                                height: "auto",
                                              }}
                                            >
                                              <input
                                                type="text"
                                                name="FreeText"
                                                readOnly="readOnly"
                                                class="form-control"
                                                aria-describedby="Requesterid"
                                                defaultValue={item.FreeText}
                                              />
                                            </div>
                                          </TD>
                                          <TD>
                                            <div
                                              style={{
                                                width: "14rem",
                                                height: "auto",
                                              }}
                                            >
                                              <input
                                                type="number"
                                                name="QuotedQty"
                                                readOnly="readOnly"
                                                class="form-control"
                                                aria-describedby="Requesterid"
                                                defaultValue={
                                                  item.RemainingOpenQuantity
                                                }
                                              />
                                            </div>
                                          </TD>
                                          <TD>
                                            <div
                                              style={{
                                                width: "14rem",
                                                height: "auto",
                                              }}
                                            >
                                              <input
                                                type="date"
                                                name="ShipDate"
                                                readOnly="readOnly"
                                                class="form-control"
                                                defaultValue={item.ShipDate}
                                              />
                                            </div>
                                          </TD>
                                          <TD>
                                            {item.RemainingOpenQuantity
                                              ? OpenQty
                                              : 0}{" "}
                                          </TD>
                                          <TD>
                                            <div style={{ width: "15em" }}>
                                              {PrWhse && (
                                                <Select
                                                  menuPortalTarget={
                                                    document.body
                                                  }
                                                  value={PrWhse.filter(
                                                    (option) =>
                                                      option.value ===
                                                      item.WarehouseCode
                                                  )}
                                                  placeholder="Select.."
                                                  isDisabled
                                                  options={PrWhse} // Options to display in the dropdown
                                                  onChange={(e) => {
                                                    DocLinesDropDownOnChange(
                                                      e,
                                                      index,
                                                      "WarehouseCode"
                                                    );
                                                  }}
                                                  displayValue="name" // Property name to display in the dropdown options
                                                />
                                              )}
                                            </div>
                                          </TD>
                                          <TD>{item.UnitPrice}</TD>
                                          <TD>{item.DiscountPercent}</TD>
                                          <TD>{item.Price}</TD>
                                          <TD>
                                            <div style={{ width: "14rem" }}>
                                              <Select
                                                menuPortalTarget={document.body}
                                                isDisabled
                                                placeholder={
                                                  item.VatGroup +
                                                  "  : " +
                                                  item.TaxPercentagePerRow +
                                                  "%"
                                                }
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            </div>
                                          </TD>
                                          <TD>{item.TaxTotal}</TD>
                                          <TD>{item.GrossTotalSC}</TD>
                                          <TD>
                                            <div style={{ width: "14rem" }}>
                                              <Select
                                                menuPortalTarget={document.body}
                                                isDisabled
                                                options={Frieght} // Options to display in the dropdown
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            </div>
                                          </TD>
                                          <TD>
                                            {/* {item.DocumentLineAdditionalExpenses[0].LineTotal || "null"} */}
                                          </TD>
                                          <TD>{item.LineTotal}</TD>
                                          <TD>{item.GrossTotal}</TD>
                                          <TD>
                                            <div style={{ width: "14rem" }}>
                                              <Select
                                                menuPortalTarget={document.body}
                                                isDisabled
                                                placeholder={item.ProjectCode}
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            </div>
                                          </TD>
                                          <TD>
                                            <div style={{ width: "14rem" }}>
                                              <Select
                                                menuPortalTarget={document.body}
                                                isDisabled
                                                placeholder={
                                                  item.SalesPersonCode
                                                }
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            </div>
                                          </TD>
                                          <TD>
                                            <div style={{ width: "14rem" }}>
                                              <Select
                                                menuPortalTarget={document.body}
                                                isDisabled
                                                placeholder={item.CostingCode}
                                                displayValue="name" // Property name to display in the dropdown options
                                              />
                                            </div>
                                          </TD>
                                        </tr>
                                      )
                                  )
                              )}
                          </tbody>
                        </Table>
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
                        <Modal.Title>Purchase Invoices List</Modal.Title>
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
                      </Modal.Footer>
                    </Modal>
                    <br />
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
                    <div
                      style={{
                        marginTop: "5%",
                        marginLeft: "47%",
                        width: "50%",
                      }}
                    >
                      {RequesterCodeDropdown && (
                        <Select
                          placeholder=""
                          options={RequesterCodeDropdown} // Options to display in the dropdown
                          displayValue="name" // Property name to display in the dropdown options
                        />
                      )}
                    </div>
                    {getdirectdoctype ? (
                      <>
                        <label>G/L Account</label>
                        <div style={{ width: "23.5rem", height: "auto" }}>
                          {/* {ItemsDropDown && ( */}
                          <Select
                            isMulti
                            options={ItemsDropDown}
                            onChange={ItemsDropDownfunc2}
                            displayValue="name"
                          />
                          {/* )} */}
                        </div>
                        <br />
                      </>
                    ) : null}
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
                            value={
                              HeaderData && HeaderData.DocNum
                                ? HeaderData && HeaderData.DocNum
                                : getnextnumber
                            }
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
                      className="invoice"
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
                        <svg class="svg-icon19" viewBox="0 0 20 20">
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
                    {/* <br />
              <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label>No</label>
              <input
                type='number'
                readOnly='readOnly'
                defaultValue={
                  SelectedPRDocEntry && SelectedPRDocEntry.DocNum
                    ? HeaderData && HeaderData.DocNum
                    : null
                }
                class='form-control'
              /></div>
              <br /> */}
                    <div
                      style={{
                        width: "23.5rem",
                        height: "auto",
                        marginLeft: "3rem",
                      }}
                    >
                      <label>Posting Date</label>
                      <input
                        type="date"
                        name="DocDate"
                        onChange={(e) => {
                          setgetpostingdate(e.target.value);
                        }}
                        class="form-control"
                        defaultValue={
                          HeaderData && HeaderData.DocDate
                            ? HeaderData && HeaderData.DocDate
                            : getpostingdate
                        }
                      />
                    </div>
                    <div
                      style={{
                        width: "23.5rem",
                        height: "auto",
                        marginLeft: "3rem",
                      }}
                    >
                      <label> Due Date</label>
                      <input
                        type="date"
                        name="DocDueDate"
                        class="form-control"
                        onChange={(e) => {
                          setgetdeliverydate(e.target.value);
                        }}
                        defaultValue={
                          HeaderData && HeaderData.DocDueDate
                            ? HeaderData && HeaderData.DocDueDate
                            : getdeliverydate
                        }
                      />
                    </div>
                    {/* <br/>
                   <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e =>setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
                    {/* <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label> Document Date</label>
              <input
                type='date'
                name='DocumentDate'
                class='form-control'
                defaultValue={
                  SelectedPRDocEntry && SelectedPRDocEntry.TaxDate
                    ? HeaderData && HeaderData.TaxDate
                    : null
                }
                onChange={e => {
                  dateChange(e)
                }}
              /></div> */}
                    <br />
                  </Container>
                </DIV3>
              </CardGroup>
              {/* Table+++++++++ */}
              <Tabs
                defaultActiveKey="Contents"
                transition={false}
                id="noanim-tab-example"
              >
                <Tab eventKey="Contents" title="Contents">
                  {AccountselectedItems && (
                    <Table responsive>
                      {Array.isArray(AccountselectedItems) &&
                      AccountselectedItems.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>G/L Account</th>
                            <th>Account Name</th>
                            <th>Doc. Remarks</th>
                            <th>Tax Definition</th>
                            <th>Net Amount</th>
                            <th>Cost Centre</th>
                            <th>Project</th>
                          </tr>
                        </TableHead>
                      ) : null}
                      <tbody>
                        {AccountselectedItems.map((item, index) => (
                          <tr key={`${index}`}>
                            <TD>{index + 1}</TD>
                            <TD>{ItemsDetails[item].Code}</TD>
                            <TD>{ItemsDetails[item].Name}</TD>
                            <TD>
                              <input
                                type="text"
                                name="Remarks"
                                class="form-control"
                                onChange={(e) => {
                                  // gettableinputvalues(e, item)
                                }}
                              ></input>
                            </TD>
                            <TD>
                              <Select
                                menuPortalTarget={document.body}
                                placeholder="Select"
                                options={TaxCode}
                                onChange={(e) => {
                                  DocLinesDropDownOnChange(
                                    e,
                                    item,
                                    "Tax_Definition"
                                  );
                                }}
                                displayValue="name"
                              />
                            </TD>
                            <TD>
                              {" "}
                              <input
                                type="number"
                                name="Net_Amount"
                                class="form-control"
                                onChange={(e) => {
                                  // setAccountinvoiceTotalAmount(
                                  //  e.target.value
                                  // )
                                  // gettableinputvalues(e, item)
                                }}
                              ></input>
                            </TD>
                            <TD>
                              <Select
                                menuPortalTarget={document.body}
                                placeholder="Select"
                                // options={CountryDropdowon}
                                onChange={(e) => {
                                  DocLinesDropDownOnChange(
                                    e,
                                    item,
                                    "CostCentre"
                                  );
                                }}
                                displayValue="name"
                              />
                            </TD>
                            <TD>
                              <Select
                                menuPortalTarget={document.body}
                                placeholder="Select"
                                // options={CountryDropdowon}
                                onChange={(e) => {
                                  DocLinesDropDownOnChange(e, item, "Project");
                                }}
                                displayValue="name"
                              />
                            </TD>
                            {/* <TD>
                                <Select
                                  placeholder='Select'
                                  options={BanksDropdowon}
                                  onChange={e => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      'BankName'
                                    )
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                           
                             */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                  {
                    <Table responsive striped bordered hover>
                      {Array.isArray(PQDocumentLines) &&
                      PQDocumentLines.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Bar Code</th>
                            <th>Item No.</th>
                            <th>Item Description</th>
                            <th>UoM Name</th>
                            {Array.isArray(getbatchnumbers) &&
                            getbatchnumbers.length > 0 &&
                            getcopyfromvalue === "PO" ? (
                              <th>Batch</th>
                            ) : null}
                            <th>Free Text</th>
                            <th>Quantity</th>
                            <th>Delivery Date</th>
                            <th>Open Qty</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Price after Discount</th>
                            <th>Tax Code : Rate</th>
                            <th>Tax Amount(LC)</th>
                            {/* <th>Gross Price After Disc.</th> */}
                            <th>Freight 1</th>
                            <th>Freight 1 (LC)</th>
                            <th>Line Total</th>
                            <th>Gross Total(LC)</th>
                            <th>Whse</th>
                            <th>Project</th>
                            <th>Buyer</th>
                            <th>Cost Centre</th>
                          </tr>
                        </TableHead>
                      ) : null}
                      <tbody>
                        {PQDocumentLines &&
                          PQDocumentLines.map(
                            (PrReItem, PrReIndex) =>
                              PrReItem.isSelected &&
                              PrReItem.DocumentLines.map(
                                (item, index) =>
                                  item.isSelected &&
                                  item.LineStatus === "bost_Open" && (
                                    <tr key={`${index}`}>
                                      <TD>{index + 1}</TD>
                                      <TD></TD>
                                      <TD>{item.ItemCode}</TD>
                                      <TD>{item.ItemDescription}</TD>
                                      <TD>{item.MeasureUnit}</TD>
                                      {Array.isArray(getbatchnumbers) &&
                                      getbatchnumbers.length > 0 &&
                                      getcopyfromvalue === "PO" ? (
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

                                      <TD>
                                        <div
                                          style={{
                                            width: "14rem",
                                            height: "auto",
                                          }}
                                        >
                                          <input
                                            type="text"
                                            name="FreeText"
                                            class="form-control"
                                            aria-describedby="Requesterid"
                                            defaultValue={item.FreeText}
                                            onChange={(e) => {
                                              ontextChanged(
                                                e,
                                                index,
                                                PrReIndex
                                              );
                                            }}
                                          />
                                        </div>
                                      </TD>
                                      <TD>
                                        <div
                                          style={{
                                            width: "14rem",
                                            height: "auto",
                                          }}
                                        >
                                          <input
                                            type="number"
                                            name="Quantity"
                                            class="form-control"
                                            aria-describedby="Requesterid"
                                            value={item.Quantity}
                                            onChange={(e) => {
                                              UnitPriceChanged(
                                                e,
                                                index,
                                                PrReIndex
                                              );
                                            }}
                                          />
                                        </div>
                                      </TD>
                                      <TD>
                                        <div
                                          style={{
                                            width: "14rem",
                                            height: "auto",
                                          }}
                                        >
                                          <input
                                            type="date"
                                            name="ShipDate"
                                            readOnly="readOnly"
                                            class="form-control"
                                            onChange={(e) => {
                                              ShipDateChange(
                                                e,
                                                index,
                                                PrReIndex
                                              );
                                            }}
                                            defaultValue={item.ShipDate}
                                          />
                                        </div>
                                      </TD>
                                      <TD>{item.RemainingOpenQuantity} </TD>
                                      <TD>
                                        <div
                                          style={{
                                            width: "14rem",
                                            height: "auto",
                                          }}
                                        >
                                          <input
                                            type="number"
                                            name="UnitPrice"
                                            class="form-control"
                                            aria-describedby="Requesterid"
                                            defaultValue={item.UnitPrice}
                                            onChange={(e) => {
                                              UnitPriceChanged(
                                                e,
                                                index,
                                                PrReIndex
                                              );
                                            }}
                                          />
                                        </div>
                                      </TD>
                                      <TD>
                                        <div
                                          style={{
                                            width: "14rem",
                                            height: "auto",
                                          }}
                                        >
                                          <input
                                            type="number"
                                            name="DiscountPercent"
                                            class="form-control"
                                            aria-describedby="Requesterid"
                                            defaultValue={item.DiscountPercent}
                                            onChange={(e) => {
                                              UnitPriceChanged(
                                                e,
                                                index,
                                                PrReIndex
                                              );
                                            }}
                                          />
                                        </div>
                                      </TD>
                                      <TD>{item.Price}</TD>
                                      <TD>
                                        <div style={{ width: "14rem" }}>
                                          {TaxCode && (
                                            <Select
                                              menuPortalTarget={document.body}
                                              value={TaxCode.filter(
                                                (option) =>
                                                  option.value === item.VatGroup
                                              )}
                                              // disabled={true}
                                              placeholder=""
                                              options={TaxCode} // Options to display in the dropdown
                                              onChange={(e) => {
                                                DocLinesDropDownOnChange(
                                                  e,
                                                  index,
                                                  PrReIndex,
                                                  "VatGroup"
                                                );
                                              }}
                                              // onSelect={CostCentre} // Function will trigger on select event
                                              // onRemove={CostCentre} //Function will trigger on remove event
                                              displayValue="name" // Property name to display in the dropdown options
                                            />
                                          )}
                                        </div>
                                      </TD>
                                      <TD>{item.TaxTotal}</TD>
                                      {/* <TD>
                    {item.GrossTotalSC}
                    </TD> */}
                                      <TD>
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            // placeholder= {item.DocumentLineAdditionalExpenses[0].ExpenseCode || "null"}
                                            options={Frieght} // Options to display in the dropdown
                                            // onChange={e => {
                                            //   FreightDropDownOnChange(e, index, 'Freight')
                                            // }}
                                            // onSelect={CostCentre} // Function will trigger on select event
                                            // onRemove={CostCentre} //Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                          />
                                        </div>
                                      </TD>
                                      <TD>
                                        {/* {item.DocumentLineAdditionalExpenses[0].LineTotal || "null"} */}
                                      </TD>
                                      <TD>{item.LineTotal}</TD>
                                      <TD>{item.GrossTotal}</TD>
                                      <TD>
                                        <div style={{ width: "15em" }}>
                                          {PrWhse && (
                                            <Select
                                              menuPortalTarget={document.body}
                                              value={PrWhse.filter(
                                                (option) =>
                                                  option.value ===
                                                  item.WarehouseCode
                                              )}
                                              placeholder=""
                                              options={PrWhse} // Options to display in the dropdown
                                              onChange={(e) => {
                                                DocLinesDropDownOnChange2(
                                                  e,
                                                  index,
                                                  PrReIndex,
                                                  "WarehouseCode"
                                                );
                                              }}
                                              displayValue="name" // Property name to display in the dropdown options
                                            />
                                          )}
                                        </div>
                                      </TD>
                                      <TD>
                                        <div style={{ width: "14rem" }}>
                                          {PrProject && (
                                            <Select
                                              menuPortalTarget={document.body}
                                              value={PrProject.filter(
                                                (option) =>
                                                  option.value ===
                                                  item.ProjectCode
                                              )}
                                              placeholder=""
                                              // options={Frieght} // Options to display in the dropdown
                                              onChange={(e) => {
                                                DocLinesDropDownOnChange2(
                                                  e,
                                                  index,
                                                  PrReIndex,
                                                  "ProjectCode"
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
                                        <div style={{ width: "14rem" }}>
                                          {PrBuyer && (
                                            <Select
                                              menuPortalTarget={document.body}
                                              value={PrBuyer.filter(
                                                (option) =>
                                                  option.value ===
                                                  item.SalesPersonCode
                                              )}
                                              placeholder=""
                                              // options={Frieght} // Options to display in the dropdown
                                              onChange={(e) => {
                                                DocLinesDropDownOnChange2(
                                                  e,
                                                  index,
                                                  PrReIndex,
                                                  "SalesPersonCode"
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
                                        <div style={{ width: "14rem" }}>
                                          {PrCost && (
                                            <Select
                                              menuPortalTarget={document.body}
                                              placeholder={item.CostingCode}
                                              value={PrCost.filter(
                                                (option) =>
                                                  option.value ===
                                                  item.CostingCode
                                              )}
                                              // options={Frieght} // Options to display in the dropdown
                                              onChange={(e) => {
                                                DocLinesDropDownOnChange2(
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
                                    </tr>
                                  )
                              )
                          )}
                      </tbody>
                    </Table>
                  }
                  {
                    <Table responsive striped bordered hover>
                      {Array.isArray(SearchDocumentLines) &&
                      SearchDocumentLines.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Bar Code</th>
                            <th>Item No.</th>
                            <th>Item Description</th>
                            <th>UoM Name</th>
                            <th>Free Text</th>
                            <th>Quantity</th>
                            <th>Delivery Date</th>
                            <th>Open Qty</th>
                            <th>Whse</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Price after Discount</th>
                            <th>Tax Code : Rate</th>
                            <th>Tax Amount(LC)</th>
                            <th>Gross Price After Disc.</th>
                            <th>Freight 1</th>
                            <th>Freight 1 (LC)</th>
                            <th>Line Total</th>
                            <th>Gross Total(LC)</th>
                            <th>Project</th>
                            <th>Buyer</th>
                            <th>Cost Centre</th>
                          </tr>
                        </TableHead>
                      ) : null}
                      <tbody>
                        {SearchDocumentLines &&
                          SearchDocumentLines.map(
                            (item, index) =>
                              item.LineStatus === "bost_Open" && (
                                <tr key={`${index}`}>
                                  <TD>{index + 1}</TD>
                                  <TD></TD>
                                  <TD>{item.ItemCode}</TD>
                                  <TD>{item.ItemDescription}</TD>
                                  <TD>{item.MeasureUnit}</TD>
                                  <TD>
                                    <div
                                      style={{ width: "14rem", height: "auto" }}
                                    >
                                      <input
                                        type="text"
                                        name="FreeText"
                                        class="form-control"
                                        aria-describedby="Requesterid"
                                        defaultValue={item.FreeText}
                                        onChange={(e) => {
                                          SearchontextChanged(e, index);
                                        }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div
                                      style={{ width: "14rem", height: "auto" }}
                                    >
                                      <input
                                        type="number"
                                        name="QuotedQty"
                                        readOnly="readOnly"
                                        class="form-control"
                                        aria-describedby="Requesterid"
                                        defaultValue={
                                          item.RemainingOpenQuantity
                                        }
                                        // onChange={e=>OpenQtyFunction(e, index)
                                        // setOpenQty(e.target.value)
                                        // }
                                        // onChange={e => {
                                        //   OpenQtyFunction(e, index)
                                        //   setOpenQty(e.target.value)
                                        // }}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div
                                      style={{ width: "14rem", height: "auto" }}
                                    >
                                      <input
                                        type="date"
                                        name="ShipDate"
                                        readOnly="readOnly"
                                        class="form-control"
                                        onChange={(e) => {
                                          SearchShipDateChange(e, index);
                                        }}
                                        defaultValue={item.ShipDate}
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    {item.RemainingOpenQuantity || OpenQty}{" "}
                                  </TD>
                                  <TD>
                                    <div style={{ width: "15em" }}>
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
                                  <TD>{item.UnitPrice}</TD>
                                  <TD>{item.DiscountPercent}</TD>
                                  <TD>{item.Price}</TD>
                                  <TD>
                                    <div style={{ width: "14rem" }}>
                                      <Select
                                        menuPortalTarget={document.body}
                                        // disabled={true}
                                        placeholder={
                                          item.VatGroup +
                                          "  : " +
                                          item.TaxPercentagePerRow +
                                          "%"
                                        }
                                        // options={TaxCode} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   DocLinesDropDownOnChange(e, index, 'VatGroup')
                                        // }}
                                        // onSelect={CostCentre} // Function will trigger on select event
                                        // onRemove={CostCentre} //Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                      />
                                    </div>
                                  </TD>
                                  <TD>{item.TaxTotal}</TD>
                                  <TD>{item.GrossTotalSC}</TD>
                                  <TD>
                                    <div style={{ width: "14rem" }}>
                                      <Select
                                        menuPortalTarget={document.body}
                                        // placeholder= {item.DocumentLineAdditionalExpenses[0].ExpenseCode || "null"}
                                        options={Frieght} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   FreightDropDownOnChange(e, index, 'Freight')
                                        // }}
                                        // onSelect={CostCentre} // Function will trigger on select event
                                        // onRemove={CostCentre} //Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    {/* {item.DocumentLineAdditionalExpenses[0].LineTotal || "null"} */}
                                  </TD>
                                  <TD>{item.LineTotal}</TD>
                                  <TD>{item.GrossTotal}</TD>
                                  <TD>
                                    <div style={{ width: "14rem" }}>
                                      {PrProject && (
                                        <Select
                                          menuPortalTarget={document.body}
                                          value={PrProject.filter(
                                            (option) =>
                                              option.value === item.ProjectCode
                                          )}
                                          placeholder=""
                                          options={PrProject} // Options to display in the dropdown
                                          // onChange={e => {
                                          //   FreightDropDownOnChange(e, index, 'Freight')
                                          // }}
                                          // onSelect={CostCentre} // Function will trigger on select event
                                          // onRemove={CostCentre} //Function will trigger on remove event
                                          displayValue="name" // Property name to display in the dropdown options
                                        />
                                      )}
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "14rem" }}>
                                      <Select
                                        menuPortalTarget={document.body}
                                        placeholder={item.SalesPersonCode}
                                        // options={Frieght} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   FreightDropDownOnChange(e, index, 'Freight')
                                        // }}
                                        // onSelect={CostCentre} // Function will trigger on select event
                                        // onRemove={CostCentre} //Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                      />
                                    </div>
                                  </TD>
                                  <TD>
                                    <div style={{ width: "14rem" }}>
                                      <Select
                                        menuPortalTarget={document.body}
                                        placeholder={item.CostingCode}
                                        // options={Frieght} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   FreightDropDownOnChange(e, index, 'Freight')
                                        // }}
                                        // onSelect={CostCentre} // Function will trigger on select event
                                        // onRemove={CostCentre} //Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                      />
                                    </div>
                                  </TD>
                                </tr>
                              )
                          )}
                      </tbody>
                    </Table>
                  }
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
                    <div style={{ width: "23.5em", height: "auto" }}>
                      <label>Buyer</label>
                      <Select
                        placeholder={HeaderData && HeaderData.SalesPersonCode}
                        options={PrBuyer} // Options to display in the dropdown
                        onChange={(e) => setSelectedBuyer(e.value)}
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <div style={{ width: "23.5rem", height: "auto" }}>
                      <label>Owner</label>
                      <Select
                        placeholder={HeaderData && HeaderData.DocumentsOwner}
                        options={PrOwner}
                        onChange={(e) => setSelectedOwner(e.value)} // Options to display in the dropdown
                        // onSelect={Owner} // Function will trigger on select event
                        // onRemove={Owner} //Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <div class="form-group">
                      <div style={{ width: "23.5rem", height: "auto" }}>
                        <label for="exampleFormControlTextarea1">Remarks</label>
                        <div style={{ width: "23.5rem" }}>
                          <textarea
                            defaultValue={
                              getcopyfromvalue === "PO"
                                ? HeaderData &&
                                  "Based on Purchase Order: " +
                                    HeaderData.DocEntry +
                                    ". " +
                                    HeaderData.Comments
                                : HeaderData &&
                                  HeaderData.DocEntry +
                                    ". " +
                                    HeaderData.Comments
                            }
                            type="text"
                            class="form-control rounded-0"
                            id="exampleFormControlTextarea1"
                            name="Comments"
                            rows="3"
                            onChange={(e) => {
                              setgetcomments(e.target.value);
                            }}
                          />{" "}
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
                          style={{ marginLeft: "5%" }}
                          variant="secondary"
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

                  {/* } */}
                </DIV4>
                <DIV3>
                  <div>
                    <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                      <label style={{ marginTop: "10%" }}>Net Total </label>
                      <input
                        readOnly="readOnly"
                        type="number"
                        value={
                          totalbforeDiscount
                            ? totalbforeDiscount
                            : HeaderData &&
                              (HeaderData.DocTotalFc != 0
                                ? HeaderData.DocTotalFc +
                                  HeaderData.TotalDiscountFC -
                                  HeaderData.VatSumFc
                                : HeaderData.DocTotal +
                                  HeaderData.TotalDiscount -
                                  HeaderData.VatSum)
                        }
                        // value={totalbforeDiscount}
                        // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                        class="form-control"
                      />
                    </div>
                    <div style={{ marginLeft: "4rem" }}>
                      <label>Discount</label>
                      <CardGroup>
                        <div style={{ width: "11.75rem" }}>
                          <input
                            type="number"
                            value={
                              discountpercent ||
                              (HeaderData && HeaderData.DiscountPercent)
                            }
                            onChange={(e) => {
                              setdiscountpercent(e.target.value);
                              setDiscountTotal(
                                (e.target.value * totalbforeDiscount) / 100
                              );
                            }}
                            class="form-control"
                            name="TaxAmount(LC)"
                          />
                        </div>
                        <div style={{ width: "11.75rem" }}>
                          <input
                            type="number"
                            // value={DiscountTotal}
                            onChange={(e) => {
                              setDiscountTotal(e.target.value);
                              setdiscountpercent(
                                (e.target.value / totalbforeDiscount) * 100
                              );
                            }}
                            class="form-control"
                            name="TaxAmount(LC)"
                            value={
                              DiscountTotal ||
                              (HeaderData &&
                                (HeaderData.DocTotalFc != 0
                                  ? HeaderData.TotalDiscountFC
                                  : HeaderData.TotalDiscount))
                            }
                          />
                        </div>
                      </CardGroup>
                    </div>
                  </div>
                  <div style={{ marginLeft: "4rem" }}>
                    <label>DPM</label>
                    <CardGroup>
                      <div style={{ width: "11.75rem" }}>
                        <input
                          type="number"
                          name="DPM%"
                          class="form-control"
                          value={
                            disc ||
                            (HeaderData && HeaderData.DownPaymentPercentage)
                          }
                          onChange={(e) => {
                            setdisc(e.target.value);
                            setdownpayment(
                              (e.target.value * totalbforeDiscount) / 100
                            );
                          }}
                          placeholder="%"
                        />
                      </div>
                      <div style={{ width: "11.75rem" }}>
                        <input
                          type="number"
                          name="DPMPKR"
                          class="form-control"
                          value={
                            downpayment ||
                            (HeaderData &&
                              (HeaderData.DocTotalFc != 0
                                ? HeaderData.DownPaymentAmountFc
                                : HeaderData.DownPaymentAmount))
                          }
                          // onChange={e => setBottomDiscount(e.target.value)}
                          placeholder="PKR"
                          onChange={(e) => {
                            setdownpayment(e.target.value);
                            setdisc(
                              (e.target.value / totalbforeDiscount) * 100
                            );
                          }}
                        />
                      </div>
                    </CardGroup>
                  </div>
                  {/* <div style={{width:'23.5rem'}}>
          <label>Freight</label>
          <input
            defualtValue={totalFreight}
            class='form-control'
          />
           </div>
          <br /> */}
                  <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                    <label>Tax</label>
                    <input
                      type="number"
                      class="form-control"
                      // onChange={e => setBottomTax(+e.target.value)}
                      value={
                        gettaxtotal ||
                        (HeaderData &&
                          (HeaderData.DocTotalFc != 0
                            ? HeaderData.VatSumFc
                            : HeaderData.VatSum))
                      }
                      name="TaxAmount(LC)"
                      placeholder="Tax"
                    />
                  </div>
                  {/* <button onClick={TotalPaymentDue}>Total</button> */}
                  <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                    <label>Total Payment Due:</label>
                    <input
                      type="text"
                      value={
                        Number(totalbforeDiscount) +
                          Number(gettaxtotal) -
                          Number(DiscountTotal) ||
                        (HeaderData &&
                          (HeaderData.DocTotalFc != 0
                            ? HeaderData.DocTotalFc
                            : HeaderData.DocTotal))
                      }
                      placeholder=""
                      class="form-control"
                    />
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                    <label>Blanace Due:</label>
                    <input
                      type="text"
                      value={
                        Number(totalbforeDiscount) +
                          Number(gettaxtotal) -
                          Number(DiscountTotal) ||
                        (HeaderData &&
                          (HeaderData.DocTotalFc != 0
                            ? HeaderData.DocTotalFc - HeaderData.PaidToDateFC
                            : HeaderData.DocTotal - HeaderData.PaidToDate))
                      }
                      placeholder="PaidToDateFC"
                      class="form-control"
                    />
                  </div>
                </DIV3>
              </CardGroup>
            </ContextMenuTrigger>
            {cancelbutton ? (
              <>
                <ContextMenu id="contextmenu">
                  <MenuItem onClick={documentcancel}>
                    <FcCancel className="Cancel" />
                    <span>Cancel</span>
                  </MenuItem>
                  <MenuItem onClick={TransactionNumber}>
                    <GrView className="JournalEntry" />
                    <span>Journal Entry</span>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      window.location.href = "/Home";
                    }}
                  >
                    <GrClose className="Close" />
                    <span>Close</span>
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      window.location.reload(false);
                    }}
                  >
                    <IoReload className="Reload" />
                    <span>Reload</span>
                  </MenuItem>
                </ContextMenu>
              </>
            ) : null}
          </Form>
        </>
      )}
    </>
  );
}
