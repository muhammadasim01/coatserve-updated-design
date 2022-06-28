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

import "../../../Screens/coupon.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { FcCancel } from "react-icons/fc";
import { GrClose, GrView } from "react-icons/gr";
import { IoReload } from "react-icons/io5";
import { BiAddToQueue } from "react-icons/bi";

import { MenuUp } from "react-bootstrap-icons";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Logistics, Accounting } from "../../../Component/PurchaseOrder";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import { CONSTANTS, LINKS } from "../../../Utils";
import { Navbar } from "../../../Component/Global";
import { useAlert } from "react-alert";
import { input, DIV3, DIV4, DIV6, DIV7, InputD, TableHead, TD } from "./Style";
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
  const [loading, setLoading] = React.useState(false);
  const [getseriesnumbring, setgetseriesnumbring] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [visiblebutton, setvisiblebutton] = React.useState(true);
  const [bothbodies, setbothbodies] = React.useState(false);
  const [update, setUpdate] = React.useState(1);
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [getpurchaseordersdocentry, setgetpurchaseordersdocentry] =
    React.useState();
  const classes = useStyles();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [show, setShow] = React.useState(false);
  const [HeaderData, setHeaderData] = React.useState();
  const [OpenQty, setOpenQty] = React.useState();
  const [SelectedCP, setSelectedCP] = React.useState();
  const [SelectedOwner, setSelectedOwner] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [ButtonName, setButtonName] = React.useState();
  const [SelectedVendor, setSelectedVendor] = React.useState();
  const [JEHeaderData, setJEHeaderData] = React.useState();
  const [JournalEntryLines, setJournalEntryLines] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [DelDate, setDelDate] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [getdocdate, setgetdocdate] = React.useState();
  const [getdocduedate, setgetdocduedate] = React.useState();
  const [gettaxdate, setgettaxdate] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [getdocentry, setgetdocentry] = React.useState();
  const [OwnerPrRe, setOwnerPrRe] = React.useState();
  const [Disply, setDisply] = React.useState(false);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [gettaxtotal, setgettaxtotal] = React.useState(0);
  const [Price, setPrice] = React.useState();
  const [cancelbutton, setcancelbutton] = React.useState(false);
  const [Discount, setDiscount] = React.useState();
  const [Tax, setTax] = React.useState();
  const [getComments, setgetComments] = React.useState();
  const [total, setTotal] = React.useState();
  const [TotalGross, setTotalGross] = React.useState();
  const [BottomTax, setBottomTax] = React.useState();
  const [BottomDiscount, setBottomDiscount] = React.useState();
  const [TotalPayment, setTotalPayment] = React.useState();
  const [DiscountTotal, setDiscountTotal] = React.useState(0);
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [DocStatus, setDocStatus] = React.useState();
  const [totalFreight, setTotalFreight] = React.useState();
  const [disc, setdisc] = React.useState(0);
  const [ShipDate, setShipDate] = React.useState();
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"));
  const [TestGetInstallationNumber, setTestGetInstallationNumber] =
    React.useState("0020545074");
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] =
    React.useState("0021105591");

  const [showA, setShowA] = React.useState(false);
  const [JEshow, setJEShow] = React.useState(false);
  const [gettotaldebit, setgettotaldebit] = React.useState(0);
  const [gettotalcredit, setgettotalcredit] = React.useState(0);
  const [currentComDate, setcurrentComDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [getTransNum, setgetTransNum] = React.useState();
  const [getcopyfromvalue, setgetcopyfromvalue] = React.useState();
  const [getdocumentname, setgetdocumentname] = React.useState("INV2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("13");
  const [ModuleName, setModuleName] = React.useState("Invoices");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [seletedBatchnumber, setseletedBatchnumber] = React.useState();
  const [seletedBatchnumber2, setseletedBatchnumber2] = React.useState([]);
  const [getbatchnumbers, setgetbatchnumbers] = React.useState();
  const [BatchNumbersData, setBatchNumbersData] = React.useState();
  const [show3, setShow3] = React.useState(false);
  const [valuechacker, setvaluechacker] = React.useState();
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
    today();

    setButtonName("Add");
    setSearchNumber("0");
    setgetdocumentname("INV2");
    setModuleName("Invoices");
    setgetdocumenttype("13");
    compareDate();
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    // let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    // if (formcontroller) {
    //   formcontroller.forEach(async (element) => {
    //     if (element.U_FormId === "OINV") {
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
    if (cook) BatchNoQuantities(cook);
    // BatchQuantitiesfunction(cook)
    getBatchNumbersfromAPI(cook);
    BatchNo(cook);
    getItemsList(cook);
    BusinessPartners(cook);
    Project(cook);
    CostCentre(cook);
    Buyer(cook);
    Owner(cook);
    defaultWhse(cook);
    OwnerPurchaseRequest(cook);
    Frieght1(cook);
    TableTaxCode(cook);
  }, []);
  const getpurchaseorders = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: `DeliveryNotes?$select=DocEntry,DocNum`,
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
  const handleClose3 = () => {
    setShow3(false);
  };
  const BatchNoQuantities = async (cook) => {
    let body = {
      SqlCode: "BatchNoQuantities",
      SqlName: "BatchNoQuantities",
      SqlText:
        "Select ItemCode, Quantity, WhsCode, SysNumber, AbsEntry, MdAbsEntry From OBTQ Where Quantity > 0",
    };
    let api = `SQLQueries`;
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: api,
          cookie: cook,
        })
        .then(function (res) {
          console.log("BatchNoQuantities", res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const BatchQuantitiesfunction = async (item, index) => {
    let cook = await localStorage.getItem("cookie");
    let sapAPi = `SQLQueries('BatchNoQuantities')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        if (res.data.value) {
          setvaluechacker("INOUT");
          setTimeout(function () {
            modalshow(item, index, res.data.value);
          }, 2000);
        } else {
        }
        // modalshow(item,index,res.data.value)
        // setBatchNumberQuantityData(res.data.value)
      })
      .catch({});
  };
  const getBatchQuantities = async (item, index) => {
    let cook = await localStorage.getItem("cookie");
    let sapAPi = `SQLQueries('BatchNoQuantities')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(async function (res) {
        setvaluechacker("LineBatch");
        setseletedBatchnumber2([]);
        // await setBatchNumberQuantityData(res.data.value)
        setTimeout(function () {
          modalshow(item, index, res.data.value);
        }, 2000);
      })
      .catch({});
  };
  const getBatchNumbersfromAPI = async (cook) => {
    let sapAPi = `SQLQueries('BatchNo')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("BatchNo", res);
        setBatchNumbersData(res.data.value);
      })
      .catch({});
  };
  const today = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    setgetdocdate(year + "-" + month + "-" + day);
    setgetdocduedate(year + "-" + month + "-" + day);
    setgettaxdate(year + "-" + month + "-" + day);
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
  const modalshow = async (item, index, BatchNumberQuantityData) => {
    let Batchlines = [];
    PQDocumentLines.forEach((element) => {
      if (element.isSelected) {
        element.DocumentLines.forEach((item2) => {
          BatchNumberQuantityData.forEach((docElement) => {
            // if(item2.ItemCode === docElement.ItemCode){
            if (
              item2.ItemCode === docElement.ItemCode &&
              item2.WarehouseCode === docElement.WhsCode
            ) {
              Batchlines.push({
                BaseLineNumber: index,
                AbsEntry: docElement.AbsEntry,
                ItemCode: docElement.ItemCode,
                MdAbsEntry: docElement.MdAbsEntry,
                Quantity: docElement.Quantity,
                SysNumber: docElement.SysNumber,
                WhsCode: docElement.WhsCode,
              });
              whsecodematching(Batchlines, item);
            }
          });
        });
      }
    });
    setShow3(true);
  };
  const whsecodematching = async (Batchlines, item) => {
    let Batchlines2 = [];
    Batchlines.forEach((element) => {
      BatchNumbersData.forEach((docElement) => {
        if (
          element.ItemCode === docElement.ItemCode &&
          element.SysNumber === docElement.SysNumber
        ) {
          Batchlines2.push({
            BaseLineNumber: element.BaseLineNumber,
            DistNumber: docElement.DistNumber,
            AbsEntry: element.AbsEntry,
            ItemCode: element.ItemCode,
            MdAbsEntry: element.MdAbsEntry,
            Quantity: element.Quantity,
            SysNumber: element.SysNumber,
            WhsCode: element.WhsCode,
          });
          itemcodematching(Batchlines2, item);
        }
      });
    });
  };
  const itemcodematching = async (Batchlines2, item) => {
    let docline = [];
    Batchlines2.forEach((element) => {
      if (element.ItemCode === item.ItemCode) {
        docline.push({
          BaseLineNumber: element.BaseLineNumber,
          DistNumber: element.DistNumber,
          AbsEntry: element.AbsEntry,
          ItemCode: element.ItemCode,
          MdAbsEntry: element.MdAbsEntry,
          Quantity: element.Quantity,
          SysNumber: element.SysNumber,
          WhsCode: element.WhsCode,
        });
        setseletedBatchnumber(docline);
      }
    });
  };
  const getvaluefrombatchtable = (e, index) => {
    let itemDetail = seletedBatchnumber;
    itemDetail[index][e.target.name] = e.target.value;
    setseletedBatchnumber(itemDetail);
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getfinalvaluefromtable = () => {
    let obj = seletedBatchnumber;
    setseletedBatchnumber2([...seletedBatchnumber2, obj]);
    batchsubmit([...seletedBatchnumber2, obj]);
    // setdisabledbutton(false)
  };
  const BatchNo = async (cook) => {
    let body = {
      SqlCode: "BatchNo",
      SqlName: "BatchNo",
      SqlText:
        "Select ItemCode, SysNumber, DistNumber, MnfSerial, LotNumber, MnfDate, ExpDate, Location From OBTN",
    };
    let api = `SQLQueries`;
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: api,
          cookie: cook,
        })
        .then(function (res) {})
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `Invoices(${id})`,
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
  const BusinessPartners = async (cook) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    let SAPapi = LINKS.sap.MasterData.ActiveCustomer;

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
        api: LINKS.sap.PurchaseRequest.projects,
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

    let SAPApi = `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcOutputTax'`;
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
  const SearchontextChanged = (e, index) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index][e.target.name] = e.target.value;
    setSearchDocumentLines(itemDetail);
  };
  const ontextChanged = (e, index, PrReIndex) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value;
    setPQDocumentLines(itemDetail);
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
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    if (getcopyfromvalue === "SO") {
      let SAPapi = `Orders?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${SelectedVendor}'and startswith(DocNum,'${getseriesnumbring}')`;
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
      let SAPapi = `DeliveryNotes?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${SelectedVendor}' and startswith(DocNum,'${getseriesnumbring}')`;
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
    setgetdocentry(item.DocEntry);
    setgetTransNum(item.TransNum);
    localStorage.setItem("getDocEntry", item.DocEntry);
    if (item.DocumentStatus === "bost_Open") {
      setDocStatus("Open");
      setcancelbutton(true);
      setButtonName("Update");
    } else {
      setDocStatus("Close");
      setButtonName("OK");
    }
    setSearchDocumentLines(item.DocumentLines);
  };
  const TransactionNumber = async () => {
    let sapAPi = `JournalEntries?$filter=OriginalJournal eq 'ttARInvoice' and JdtNum  eq ${getTransNum}`;
    let sum = 0;
    let sum2 = 0;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
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
      let sapAPi = `Invoices?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum desc`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `Invoices?$orderby=DocNum desc`;
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
    }
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `Invoices?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0]);
        setgetTransNum(res.data.value[0].TransNum);
        setgetdocentry(res.data.value[0].DocEntry);
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        if (res.data.value[0].DocumentStatus === "bost_Open") {
          setDocStatus("Open");
          setcancelbutton(true);
        } else {
          setDocStatus("Close");
        }
        // let sum = 0
        // res.data.value[0].DocumentLines.forEach(item => {
        //   sum = sum + item.LineTotal
        // })
        // setTotalbforeDiscount(sum)
        setSearchDocumentLines(res.data.value[0].DocumentLines);

        if (HeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});
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
  const DocLinesDropDownOnChange2 = (selectedItem, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value;
    itemDetail[PrReIndex][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setPQDocumentLines(itemDetail);
  };
  const SearchDocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    itemDetail[index]["GrossPrice"] = selectedItem.item.VatGroups_Lines[0].Rate;
    setSearchDocumentLines(itemDetail);
  };
  const SearchDocLinesDropDownOnChange2 = (selectedItem, index, name) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    setSearchDocumentLines(itemDetail);
  };
  const VendorChange = (e) => {
    setSelectedVendor(e.value);
  };
  const submitPatchPO = async () => {
    let docLines = [];
    SearchDocumentLines.forEach((element) => {
      docLines.push({
        FreeText: element.FreeText,
        VatGroup: element.VatGroup,
      });
    });
    let body = {
      Comments: getComments,
      DocumentLines: docLines,
      AttachmentEntry: attachmentresponse,
    };
    Patch(HeaderData.DocEntry, body);
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
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitInvoice();
    } else if (ButtonName != "Add") {
      submitPatchPO();
    }
  };
  const variancesubmit = async (batchdata2) => {
    let DocLines = [];
    let docLines2 = [];
    let selectedBatch = batchdata2;
    let nestedarray = PQDocumentLines;
    let body = {};
    if (getcopyfromvalue === "SO" && valuechacker) {
      var filtered = selectedBatch.filter(function (el) {
        return (el == el.length) == 0;
      });
      filtered.forEach((Docelement) => {
        Docelement.forEach((Docelement2) => {
          docLines2.push({
            Quantity: Docelement2.SelectedQty,
            BaseLineNumber: Docelement2.BaseLineNumber,
            ItemCode: Docelement2.ItemCode,
            SystemSerialNumber: Docelement2.SysNumber,
            BatchNumber: Docelement2.DistNumber,
          });
        });
      });
      nestedarray.forEach((element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((element2) => {
            if (element2.isSelected && element2.Variance === "Excess") {
              DocLines.push({
                ItemCode: element2.ItemCode,
                Quantity: Number(element2.VarianceQuantity),
                WarehouseCode: element2.WarehouseCode,
                // CostingCode: element2.costingCodeDropDown,
                ProjectCode: element2.ProjectCode,
                BatchNumbers: docLines2.filter(function (i) {
                  return i.ItemCode == element2.ItemCode;
                }),
              });
              body["DocDate"] = getdocdate;
              body["DocumentLines"] = DocLines;
              setvisiblebutton(false);
              InventoryGenEntriesPost(body);
            } else if (element2.isSelected && element2.Variance === "Less") {
              DocLines.push({
                ItemCode: element2.ItemCode,
                Quantity: Number(element2.VarianceQuantity),
                WarehouseCode: element2.WarehouseCode,
                // CostingCode: element2.costingCodeDropDown,
                ProjectCode: element2.ProjectCode,
                BatchNumbers: docLines2.filter(function (i) {
                  return i.ItemCode == element2.ItemCode;
                }),
              });
              body["DocDate"] = getdocdate;
              body["DocumentLines"] = DocLines;
              console.log("Body", JSON.stringify(body));
              setvisiblebutton(false);
              InventoryGenExitPost(body);
            }
          });
        }
      });
    }
    setShow3(false);
  };
  const InventoryGenEntriesPost = async (body) => {
    let cook = await localStorage.getItem("cookie");
    let api = `InventoryGenEntries`;
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: api,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success("Operation completed successfully");
            // window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const InventoryGenExitPost = async (body) => {
    let cook = await localStorage.getItem("cookie");
    let api = `InventoryGenExits`;
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: api,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success("Operation completed successfully");
            // window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const submitInvoice = async () => {
    let DocLines = [];
    let SecondDB = [];
    let body = PRBody;
    let body2 = {};
    let docLines2 = [];
    if (getcopyfromvalue === "SO" && valuechacker) {
      var filtered = seletedBatchnumber2.filter(function (el) {
        return (el == el.length) == 0;
      });
      filtered.forEach((Docelement) => {
        Docelement.forEach((Docelement2) => {
          docLines2.push({
            Quantity: Docelement2.SelectedQty,
            BaseLineNumber: Docelement2.BaseLineNumber,
            ItemCode: Docelement2.ItemCode,
            SystemSerialNumber: Docelement2.SysNumber,
            BatchNumber: Docelement2.DistNumber,
          });
        });
      });
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((element2) => {
            if (element2.isSelected && element2.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 17,
                BaseLine: element2.LineNum,
                DiscountPercent: element2.DiscountPercent,
                FreeText: element2.FreeText,
                Quantity: element2.Quantity,
                UnitPrice: element2.UnitPrice,
                VatGroup: element2.VatGroup,
                WarehouseCode: element2.WarehouseCode,
                ProjectCode: element2.ProjectCode,
                SalesPersonCode: element2.SalesPersonCode,
                BatchNumbers: docLines2.filter(function (i) {
                  return i.ItemCode == element2.ItemCode;
                }),
              });
              body["DocDueDate"] = getdocduedate;
              body["DocDate"] = getdocdate;
              body["TaxDate"] = gettaxdate;
              body["U_CreatedBy"] = "Web UI";
              body["DocumentLines"] = DocLines;
              body["CardCode"] = SelectedVendor;
              body["Series"] = getseriesvalue;
              body["DiscountPercent"] = disc;
              body["AttachmentEntry"] = attachmentresponse;
              body["DocCurrency"] = element.DocCurrency;
              body["DocRate"] = element.DocRate;
            }
          });
        }
      });
    } else {
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((element) => {
            if (element.isSelected && element.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 15,
                BaseLine: element.LineNum,
              });
              body["DocDueDate"] = getdocduedate;
              body["DocDate"] = getdocdate;
              body["TaxDate"] = gettaxdate;
              body["U_CreatedBy"] = "Web UI";
              body["DocumentLines"] = DocLines;
              body["CardCode"] = SelectedVendor;
              body["Series"] = getseriesvalue;
              body["DiscountPercent"] = disc;
              body["AttachmentEntry"] = attachmentresponse;
              body["DocCurrency"] = element.DocCurrency;
              body["DocRate"] = element.DocRate;
            }
          });
        }
      });
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((element) => {
            if (element.isSelected && element.LineStatus === "bost_Open") {
              SecondDB.push({
                BaseEntry: getpurchaseordersdocentry[element.DocNum].DocEntry,
                BaseType: 15,
                BaseLine: element.LineNum,
              });
              body2["DocDueDate"] = getdocduedate;
              body2["DocDate"] = getdocdate;
              body2["TaxDate"] = gettaxdate;
              body2["DocumentLines"] = SecondDB;
              body2["CardCode"] = SelectedVendor;
              body["U_CreatedBy"] = "Web UI";
              body2["Series"] = getseriesvalue;
              body2["DiscountPercent"] = disc;
              body2["AttachmentEntry"] = attachmentresponse;
              body2["DocCurrency"] = element.DocCurrency;
              body2["DocRate"] = element.DocRate;
            }
          });
        }
      });
    }
    console.log("body", JSON.stringify(body));
    console.log("body", JSON.stringify(body2));
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
          api: LINKS.sap.Sales.Invoices,
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
          api: LINKS.sap.Sales.Invoices,
          cookie: cook,
        })
        .then(async function (res) {
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
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset();
    Dropdown.reset();
  };
  const [modalOne, setModalOne] = React.useState();
  const [modalTwo, setModalTwo] = React.useState();
  const handleClosee = () => setJEShow(false);
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
          setTotalbforeDiscount(sum);
          setgettaxtotal(sum1);
        });
      }
    });
  };
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
    setPQDocumentLines(prData);
  };
  const variancechanger = async (e, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][name] = e.value;
    itemDetail[PrReIndex][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setPQDocumentLines(itemDetail);
  };
  const batchsubmit = async (batchdata2) => {
    if (valuechacker === "INOUT") {
      variancesubmit(batchdata2);
    } else {
      handleClose3();
    }
  };
  const documentcancel = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `Invoices(${getdocentry})/Cancel`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        if (res.data.error) {
          alert.error(JSON.stringify(res.data.error.message));
        } else {
          alert.success("Operation completed successfully");
        }
      })
      .catch({});
  };
  return (
    <>
      <Navbar
        setgetserviceseries={setgetserviceseries}
        getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
        HeaderData={HeaderData}
        getdocumentname={getdocumentname}
      />
      {localStorage.getItem("documentcontroller") === "N" ? (
        <h1>You are not permited to perform this action</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>A/R Invoice</h1>
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
                          { label: "Delivery", value: "Delivery" },
                          { label: "Sales Order", value: "SO" },
                        ]} // Options to display in the dropdown
                        onChange={(e) => {
                          setgetcopyfromvalue(e.value);
                        }} // Function will trigger on select event
                        // onRemove={BusinessPartners} Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <label>Customer</label>
                    <div
                      style={{ width: "23.5rem", height: "auto" }}
                      variant="primary"
                    >
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
                    <label>Contact Person</label>
                    <div
                      style={{ width: "23.5rem", height: "auto" }}
                      variant="primary"
                      onClick={ContactPerson}
                    >
                      {/* {ContactPersonDropdown && ( */}
                      <Select
                        // value={ContactPersonDropdown.filter(
                        //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                        // )}
                        placeholder={HeaderData && HeaderData.ContactPersonCode}
                        options={ContactPersonDropdown} // Options to display in the dropdown
                        // onSelect={GroupNo} // Function will trigger on select event
                        // onRemove={GroupNo} Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                        onChange={(e) => {
                          CPChange(e);
                        }}
                      />
                      {/* )} */}
                    </div>
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
                    <br />
                    {getseriesvalue ? (
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
                          {" "}
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
                                <th>Customer Code</th>
                                <th>Customer Name</th>
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
                              {/* <th>Free Text</th> */}
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
                                          <TD> </TD>
                                          <TD>{item.ItemCode}</TD>
                                          <TD>{item.ItemDescription}</TD>
                                          <TD>{item.MeasureUnit}</TD>
                                          {/* <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='FreeText'
                          class='form-control'
                          aria-describedby='Requesterid'
                          defaultValue={item.FreeText}
                          // onChange={e => {
                          //   ontextChanged(e, index)
                          // }}
                        />
                      </div>
                      {item.FreeText}
                    </TD> */}
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
                                                  ShipDateChange(e, index);
                                                }}
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
                                                  isDisabled
                                                  placeholder="Select.."
                                                  options={PrWhse} // Options to display in the dropdown
                                                  // onChange={e => {
                                                  //   DocLinesDropDownOnChange(e, index, 'WarehouseCode')
                                                  // }}
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
                                                isDisabled
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
                                                isDisabled
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
                                              <Select
                                                isDisabled
                                                menuPortalTarget={document.body}
                                                placeholder={item.ProjectCode}
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
                                                isDisabled
                                                placeholder={
                                                  item.SalesPersonCode
                                                }
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
                                                isDisabled
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
                        <Modal.Title>Documents List</Modal.Title>
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
                        <Button variant="primary" onClick={handleClose2}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <br />
                    <div style={{ width: "23.5rem", height: "auto" }}>
                      <label>Customer Ref.No</label>
                      <input
                        value={HeaderData && HeaderData.NumAtCard}
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=""
                      ></input>
                    </div>
                    {/* <label>Variance</label>
              <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
                <Select
                  placeholder='Select'
                  options={[
                    { label: 'Less', value: 'Less' },
                    { label: 'Excess', value: 'Excess' }
                  ]} // Options to display in the dropdown
                  // onChange={e => {
                  //   setgetcopyfromvalue(e.value)
                  // }} // Function will trigger on select event
                  // onRemove={BusinessPartners} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div> */}
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
                          // onSelect={RequesterCodeDropdownfunc} // Function will trigger on select event
                          // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                        />
                      )}
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
                            value={
                              getnextnumber
                                ? getnextnumber
                                : HeaderData && HeaderData.DocNum
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
                        placeholder={DocStatus}
                        isDisabled={DocStatus ? true : false}
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
                        <svg class="svg-icon9" viewBox="0 0 20 20">
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
                    {/* <Button
            style={{marginLeft:'3rem'}}
              onClick={e => {
                SearchAll_Filter_Data()
              }}
            >
              Search
            </Button><br/> */}
                    {/* <div style={{ width: '23.5rem',marginLeft:'3rem'  }}>
            <label>No</label>
            
            <input
              type='number'
              readOnly='readOnly'
              defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocNum || HeaderData && HeaderData.DocNum}
              class='form-control' />
            </div> */}

                    <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                      <label>Posting Date</label>

                      <input
                        type="date"
                        name="DocDate"
                        onChange={(e) => {
                          setgetdocdate(e.target.value);
                        }}
                        class="form-control"
                        defaultValue={
                          HeaderData && HeaderData.DocDate
                            ? HeaderData && HeaderData.DocDate
                            : getdocdate
                        }
                      />
                    </div>
                    <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                      <label> Due Date</label>
                      <input
                        type="date"
                        name="DocDueDate"
                        class="form-control"
                        onChange={(e) => {
                          setgetdocduedate(e.target.value);
                        }}
                        defaultValue={
                          HeaderData && HeaderData.DocDueDate
                            ? HeaderData && HeaderData.DocDueDate
                            : getdocduedate
                        }
                      />
                    </div>
                    <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                      <label> Document Date</label>
                      <input
                        type="date"
                        name="TaxDate"
                        class="form-control"
                        defaultValue={
                          HeaderData && HeaderData.TaxDate
                            ? HeaderData && HeaderData.TaxDate
                            : gettaxdate
                        }
                        onChange={(e) => {
                          setgettaxdate(e.target.value);
                        }}
                      />
                    </div>
                    {/* <br/>
            <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e => setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
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
                  <Modal show={show3} onHide={handleClose3} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title>Batch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {seletedBatchnumber && (
                        <Table responsive striped bordered hover>
                          <TableHead>
                            <tr>
                              <th>#</th>
                              <th>Batch Number</th>
                              <th>Item Code</th>
                              <th>Whse Code</th>
                              <th>Quantity</th>
                              <th>Selected Quantity</th>
                              <th>BaseLine Number</th>
                            </tr>
                          </TableHead>
                          <tbody>
                            {seletedBatchnumber.map((item, index) => (
                              <tr key={`${index}`}>
                                <TD>{index + 1}</TD>
                                <TD>
                                  <div style={{ width: "11rem" }}>
                                    <input
                                      type="text"
                                      name="DistNumber"
                                      readOnly
                                      class="form-control"
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      defaultValue={item.DistNumber}
                                      // onChange={e => {
                                      //   getvaluefrombatchtable(e, index)
                                      // }}
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: "11rem" }}>
                                    <input
                                      type="text"
                                      name="ItemCode"
                                      readOnly
                                      class="form-control"
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      defaultValue={item.ItemCode}
                                      // onChange={e => {
                                      //   getvaluefrombatchtable(e, index)
                                      // }}
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: "11rem" }}>
                                    <input
                                      type="text"
                                      name="WhsCode"
                                      class="form-control"
                                      readOnly
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      defaultValue={item.WhsCode}
                                      // onChange={e => {
                                      //   getvaluefrombatchtable(e, index)
                                      // }}
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
                                      readOnly
                                      aria-describedby="emailHelp"
                                      defaultValue={item.Quantity}
                                      // onChange={e => {
                                      //   getvaluefrombatchtable(e, index)
                                      // }}
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  {" "}
                                  <div style={{ width: "11rem" }}>
                                    <input
                                      type="number"
                                      name="SelectedQty"
                                      class="form-control"
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      onChange={(e) => {
                                        getvaluefrombatchtable(e, index);
                                      }}
                                      onKeyPress={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === "NumpadEnter"
                                        ) {
                                          getfinalvaluefromtable();
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
                                      name="SelectedQty"
                                      class="form-control"
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      defaultValue={item.BaseLineNumber}
                                      // onChange={e => {
                                      //   getvaluefrombatchtable(e, index)
                                      // }}
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
                      <Button
                        variant="secondary"
                        onClick={getfinalvaluefromtable}
                      >
                        Add
                      </Button>
                    </Modal.Footer>
                  </Modal>
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
                            getbatchnumbers.length > 0 ? (
                              <th>Batch</th>
                            ) : null}
                            <th>Free Text</th>
                            <th>Quantity</th>
                            {/* <th>Variance</th>
                      <th>Variance Quantity</th> */}
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
                                      getbatchnumbers.length > 0 ? (
                                        <TD>
                                          <Button
                                            onClick={(e) => {
                                              getBatchQuantities(item, index);
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
                                            defaultValue={item.Quantity}
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
                                      {/* <TD>
                        <div style={{ width: '14rem', height: 'auto' }} variant='primary' >
                          <Select
                            placeholder='Select'
                            options={[
                              { label: 'Less', value: 'Less' },
                              { label: 'Excess', value: 'Excess' }
                            ]} // Options to display in the dropdown
                            onChange={e => {
                              variancechanger(e, index, PrReIndex, 'Variance')
                            }} // Function will trigger on select event
                            // onRemove={BusinessPartners} Function will trigger on remove event
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div>
                        </TD>
                        <TD>
                          <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='number'
                              name='VarianceQuantity'
                              class='form-control'
                              aria-describedby='Requesterid'
                              onChange={e => {
                                UnitPriceChanged(e, index, PrReIndex)
                              }}
                            />
                            {visiblebutton ? 
                            <Button variant="light" onClick={e=>{ BatchQuantitiesfunction(item,index)}}><BiAddToQueue className="Variance Batch"/></Button>
                            : null }
                          </div>
                        </TD> */}
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
                                              // onSelect={CostCentre} // Function will trigger on select event
                                              // onRemove={CostCentre} //Function will trigger on remove event
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
                  {SearchDocumentLines && (
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
                          SearchDocumentLines.map((item, index) => (
                            <tr key={`${index}`}>
                              <TD>{index + 1}</TD>
                              <TD></TD>
                              <TD>{item.ItemCode}</TD>
                              <TD>{item.ItemDescription}</TD>
                              <TD>{item.MeasureUnit}</TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
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
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="number"
                                    name="Quantity"
                                    class="form-control"
                                    aria-describedby="Requesterid"
                                    defaultValue={item.Quantity}
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
                                <div style={{ width: "14rem", height: "auto" }}>
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
                                {item.RemainingOpenQuantity ? OpenQty : 0}{" "}
                              </TD>
                              <TD>
                                <div style={{ width: "15em" }}>
                                  <Select
                                    menuPortalTarget={document.body}
                                    placeholder={item.WarehouseCode}
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
                                    options={TaxCode} // Options to display in the dropdown
                                    onChange={(e) => {
                                      SearchDocLinesDropDownOnChange2(
                                        e,
                                        index,
                                        "VatGroup"
                                      );
                                    }}
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
                                  <Select
                                    menuPortalTarget={document.body}
                                    placeholder={item.ProjectCode}
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
                          ))}
                      </tbody>
                    </Table>
                  )}
                </Tab>
                <Tab eventKey="Logistics" title="Logistics">
                  <Logistics />
                </Tab>
                <Tab eventKey="Accounting" title="Accounting">
                  <Accounting />
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
                      <label>Sales Employee</label>
                      {/* <input
                type='text'
                class='form-control'
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.SalesPersonCode || HeaderData && HeaderData.SalesPersonCode}
                value={SelectedPRDocEntry && SelectedPRDocEntry.SalesPersonCode}
              /> */}
                      <Select
                        placeholder={HeaderData && HeaderData.SalesPersonCode}
                        options={PrBuyer} // Options to display in the dropdown
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
                      <label for="exampleFormControlTextarea1">Remarks</label>
                      <div style={{ width: "23.5rem" }}>
                        <textarea
                          defaultValue={
                            HeaderData &&
                            "Document Entry : " +
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
                            setgetComments(e.target.value);
                          }}
                        />
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
                <DIV4></DIV4>
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
                        // value={totalbforeDiscount ? totalbforeDiscount : (HeaderData && HeaderData.DocTotal - HeaderData.TotalDiscountSC - HeaderData.VatSumSys)}

                        //value={((SelectedPRDocEntry && SelectedPRDocEntry.DocTotal ||  HeaderData && HeaderData.DocTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.TotalDiscountSC || HeaderData && HeaderData.TotalDiscountSC || 0)) - ((PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys || 0))}
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
                            onChange={(e) => {
                              setdisc(e.target.value);
                              setDiscountTotal(
                                (e.target.value * totalbforeDiscount) / 100
                              );
                            }}
                            class="form-control"
                            name="TaxAmount(LC)"
                            defaultValue={
                              disc || (HeaderData && HeaderData.DiscountPercent)
                            }
                          />
                        </div>
                        <div style={{ width: "11.75rem" }}>
                          <input
                            type="number"
                            onChange={(e) => {
                              setDiscountTotal(e.target.value);
                              setdisc(
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
                            // defaultValue={DiscountTotal || HeaderData && HeaderData.TotalDiscountSC}
                          />
                        </div>
                      </CardGroup>
                    </div>
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                    <label>Freight</label>
                    <input
                      // placeholder={totalFreight}
                      readOnly="readOnly"
                      class="form-control"
                      //value={PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || "null"}
                      // value={PQDocumentLines && PQDocumentLines.DocumentLineAdditionalExpenses[0].LineTotal}
                    />
                  </div>
                  <br />
                  <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                    <label>Tax</label>
                    <input
                      type="number"
                      // onChange={e => setBottomTax(+e.target.value)}
                      // value={BottomTax}
                      class="form-control"
                      name="TaxAmount(LC)"
                      readOnly="readOnly"
                      value={
                        gettaxtotal ||
                        (HeaderData &&
                          (HeaderData.DocTotalFc != 0
                            ? HeaderData.VatSumFc
                            : HeaderData.VatSum))
                      }
                      // value={gettaxtotal || HeaderData && HeaderData.VatSumSys}
                    />
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                    <label>Total Payment Due:</label>
                    <input
                      type="text"
                      value={
                        totalbforeDiscount - DiscountTotal + gettaxtotal ||
                        (HeaderData &&
                          (HeaderData.DocTotalFc != 0
                            ? HeaderData.DocTotalFc
                            : HeaderData.DocTotal))
                      }
                      //  value={((totalbforeDiscount - DiscountTotal) + gettaxtotal) || HeaderData && HeaderData.DocTotal}
                      placeholder=""
                      readOnly="readOnly"
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
