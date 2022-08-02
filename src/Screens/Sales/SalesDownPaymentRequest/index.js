import React from "react";
import Select from "react-select";

import { LINKS } from "../../../Utils";
import {
  Button,
  CardGroup,
  Table,
  Container,
  Modal,
  Card,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import { Logistics, Accounting } from "../../../Component/APDownPaymentRequest";
import Switch from "react-switch";
import { Navbar } from "../../../Component/Global";
import { input, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";

import "./index.css";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function DownPaymentRequest() {
  const redux_response = useSelector((state) => state.colorReducer);

  const alert = useAlert();
  const classes = useStyles();
  const [SaleEmployee, setSaleEmployee] = React.useState();
  const [SelectedOwner, setSelectedOwner] = React.useState();
  const [SelectShow, setSelectShow] = React.useState();
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [HeaderData, setHeaderData] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [gettaxtotal, setgettaxtotal] = React.useState();
  const [bothbodies, setbothbodies] = React.useState(false);
  const [getnetTotal, setgetnetTotal] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [CommentsValue, setCommentsValue] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [Customer, setCustomer] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [DocDate, setDocDate] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [PrVendor, setPrVendor] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [CustomerRefNo, setCustomerRefNo] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [OwnerPrRe, setOwnerPrRe] = React.useState();
  const [Disply, setDisply] = React.useState(false);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState();
  const [GN, setGN] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Discount, setDiscount] = React.useState();
  const [Tax, setTax] = React.useState();
  const [total, setTotal] = React.useState();
  const [TotalGross, setTotalGross] = React.useState();
  const [BottomTax, setBottomTax] = React.useState();
  const [TotalPayment, setTotalPayment] = React.useState();
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [totalFreight, setTotalFreight] = React.useState();
  const [disc, setdisc] = React.useState();
  const [ButtonName, setButtonName] = React.useState();
  const [downpayment, setdownpayment] = React.useState();
  const [DocStatus, setDocStatus] = React.useState();
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"));
  const [TestGetInstallationNumber, setTestGetInstallationNumber] =
    React.useState("0020545074");
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] =
    React.useState("0021105591");

  const [showA, setShowA] = React.useState(false);

  const [currentComDate, setcurrentComDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [getdocumentname, setgetdocumentname] = React.useState("DPI2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("206");
  const [ModuleName, setModuleName] = React.useState("DownPayment");

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  };

  React.useEffect(async () => {
    today();
    setgetdocumentname("DPI2");
    setModuleName("DownPayment");
    setgetdocumenttype("206");
    setButtonName("Add");
    setSearchNumber("0");
    compareDate();
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    if (formcontroller) {
      formcontroller.forEach(async (element) => {
        if (element.U_FormId === "ODPI") {
          await localStorage.setItem(
            "documentcontroller",
            element.U_Authorization
          );
        }
      });
    }
    if (showA == "true") {
      setShowA(true);
      // setShow1(true)
      compareDate();
      await localStorage.removeItem("ShowBranches");
    }
    if (cook) GetItems(cook);
    Vendor(cook);
    Project(cook);
    CostCentre(cook);
    Buyer(cook);
    Owner(cook);
    // Whse(cook)
    OwnerPurchaseRequest(cook);
    BusinessPartners(cook);
    ContactPerson(cook);
    GroupNo(cook);
    Frieght1(cook);
    TableTaxCode(cook);
  }, []);
  const Home = () => {
    const alert = useAlert();
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
  const BusinessPartners = async (e) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;

    let cookie = await localStorage.getItem("cookie");
    let SAPapi = LINKS.sap.MasterData.ActiveCustomer;

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
  const today = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    setcurrentDate(year + "-" + month + "-" + day);
  };

  const ContactPerson = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;

    let cookie = await localStorage.getItem("cookie");

    // let SAPapi = `sml.svc/ACTIVECONTACTPERSON?$filter=CardCode eq '${Customer}' &$orderby=CntctCode`;
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq  '${Customer}'`;
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

  const GroupNo = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.GroupNumber, cookie: cookie }
      )
      .then(function (res) {
        setGN(res.data.value);
        if (res.data.value) {
          let ItemsDropDown = [];

          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.GroupNumber,
              label: element.GroupNumber,
            });
          });
          setGroupNoDropdown(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const OwnerhandleClose = () => setDisply(false);
  const OwnerhandleShow = () => setDisply(true);

  const GetItems = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.purchaseItems,
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
          FreeText: element.FreeText,
          RequriedDate: element.RequriedDate,
          ShipDate: element.ShipDate,
          RequiredQuantity: 1,
          BaseOpenQuantity: element.BaseOpenQuantity,
          U_MPrice: element.U_MPrice,
          // LineVendor:element.LineVendor,
          //  CostingCode:element.CostingCode,
          //  SalesPersonCode:element.SalesPersonCode,
          //  WarehouseCode:element.WarehouseCode,
        };
        ItemsDropDown.push({
          value: element.ItemCode,
          label: element.ItemCode + " : " + element.ItemName,
        });
      });

      await setItemsDropDown(ItemsDropDown);
      await setItemsDetails(ItemsDetails);
    }
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
  const Vendor = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------

    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.Vendor,
        cookie: cookie,
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
          setPrVendor(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
  const dateChange = (e) => {
    let prBody = PRBody;
    prBody[e.target.name] = e.target.value;
    setPRBody(prBody);
  };

  const DocDateChange = async (e) => {
    setDocDate(e.target.value);
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
    let SAPapi = `Orders?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${Customer}'`;
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
    if (item.DocumentStatus === "bost_Open") {
      setDocStatus("Open");
      setButtonName("Update");
    } else {
      setDocStatus("Close");
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
      let sapAPi = `DownPayments?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum `;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `DownPayments?$orderby=DocNum `;
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
    let sapAPi = `DownPayments?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0]);
        if (res.data.value[0].DocumentStatus === "bost_Open") {
          setDocStatus("Open");
        } else {
          setDocStatus("Close");
        }
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
  const DocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    itemDetail[index]["GrossPrice"] = selectedItem.item.VatGroups_Lines[0].Rate;
    setPQDocumentLines(itemDetail);
  };
  const VendorChange = (e) => {
    setCustomer(e.value);
  };
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `DownPayments(${id})`,
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
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitDownPaymentRequest();
    } else if (ButtonName != "Add") {
      submitPatchDownPayments();
    }
  };
  const submitDownPaymentRequest = async () => {
    let DocLines = [];
    let body = PRBody;
    PQDocumentLines.forEach((element) => {
      if (element.isSelected) {
        element.DocumentLines.forEach((element) => {
          if (element.isSelected && element.LineStatus === "bost_Open") {
            DocLines.push({
              BaseEntry: element.DocEntry,
              BaseType: 17,
              BaseLine: element.LineNum,
              FreeText: element.FreeText,
            });
            body["DownPaymentType"] = "dptRequest";
            body["DownPaymentPercentage"] = disc;
            body["DocumentLines"] = DocLines;
            body["CardCode"] = Customer;
            body["Series"] = getseriesvalue;
            body["SalesPersonCode"] = SaleEmployee;
            body["DocumentsOwner"] = SelectedOwner;
            body["AttachmentEntry"] = attachmentresponse;
            body["NumAtCard"] = CustomerRefNo;
            body["DocDate"] = DocDate ? DocDate : currentDate;
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
          api: LINKS.sap.Sales.DownPayments,
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
          api: LINKS.sap.Sales.DownPayments,
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
  const submitPatchDownPayments = async () => {
    let DocLines = [];
    let body = PRBody;
    SearchDocumentLines.forEach((element) => {
      DocLines.push({
        Quantity: element.Quantity,
        FreeText: element.FreeText,
      });
    });
    body["Comments"] = CommentsValue;
    body["DocumentLines"] = DocLines;
    body["AttachmentEntry"] = attachmentresponse;
    Patch(HeaderData && HeaderData.DocEntry, body);
  };
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset();
    Dropdown.reset();
  };
  const priceFunc = (e, index) => {
    let doclines = PQDocumentLines;
    const value = e.target.value;
    doclines[index]["PriceAfterVAT"] =
      value - (value * doclines[index].DiscountPercent) / 100;
    doclines[index]["GrossPriceAfterDisc"] =
      doclines[index].PriceAfterVAT + doclines[index].GrossPrice;
    doclines[index]["QuotedQty"] = value;
    doclines[index]["UnitPrice"] = value;
    setPQDocumentLines(doclines);
    let sum = 0;
    PQDocumentLines.forEach((element) => {
      sum = sum + element.LineTotal;
    });
    setTotalbforeDiscount(sum);
  };
  const QuantityFun = (index) => {
    let doclines = PQDocumentLines;
    doclines[index]["Total_LC"] =
      doclines[index].Quantity * doclines[index].PriceAfterVAT;
    setPQDocumentLines(doclines);
  };
  const onFreightChanged = (e, index, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index]["FreightLC"] = e.target.value;
    setPQDocumentLines(itemDetail);
    let sum = 0;
    PQDocumentLines.forEach((element) => {
      sum = sum + element.FreightLC;
    });
    setTotalFreight(sum);
  };
  const FreightDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index]["Freight"] = selectedItem.value;
  };
  const getPrice = async (e) => {
    setTotal(Price - (Price * Discount) / 100);
  };
  const getTotalPrice = async (e) => {
    setTotalGross(Tax + total);
  };
  const TotalPaymentDue = async (e) => {
    setTotalPayment(totalbforeDiscount - downpayment + BottomTax);
  };
  const DownPayment = async (e) => {
    let doclines = PQDocumentLines;
    setPQDocumentLines(doclines);
    let sum = 0;
    PQDocumentLines.forEach((element) => {
      sum = sum + element.LineTotal;
    });
    setTotalbforeDiscount(sum);
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
        getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
        HeaderData={HeaderData}
        getdocumentname={getdocumentname}
      />

      {localStorage.getItem("documentcontroller") === "N" ? (
        <h1>You are not permited to perform this action</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>A/R DownPayment Request</h1>
          <Form onSubmit={handleSubmitted}>
            {/* Upper Side++++++++ */}
            <div className="main_container">
              <div className="left">
                <div className="header_items_container">
                  <label>Customer</label>

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
                <div className="header_items_container">
                  <label>Contact Person</label>

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
                  />
                  {/* )} */}
                </div>

                <Modal
                  show={show}
                  onHide={handleClose}
                  className="Modal-big"
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Open Orders List
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
                  onHide={handleClose}
                  className="Modal-big"
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                      Open Orders List
                    </Modal.Title>
                  </Modal.Header>
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
                          <th>Open Qty</th>
                          <th>Whse</th>
                          <th>Unit Price</th>
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
                                            readOnly
                                            aria-describedby="Requesterid"
                                            defaultValue={item.FreeText}
                                            onChange={(e) => {
                                              ontextChanged(e, index);
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
                                      <TD>{item.RemainingOpenQuantity} </TD>
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
                                      <TD>{item.UnitPrice}</TD>

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
                    <Modal.Title>DownPayment Request List</Modal.Title>
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

                <div className="header_items_container">
                  <label>Customer Ref.No</label>
                  <input
                    defaultValue={HeaderData && HeaderData.NumAtCard}
                    onChange={(e) => {
                      setCustomerRefNo(e.target.value);
                    }}
                    type="text"
                    class="input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
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
                        Whse(e.item.Name);
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
                        value={
                          getnextnumber
                            ? getnextnumber
                            : HeaderData && HeaderData.DocNum
                        }
                        placeholder=""
                        class=""
                      />
                    </div>
                  </div>
                </div>
                <div className="header_items_container">
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
                <div className="header_items_container">
                  <a
                    onClick={(e) => {
                      SearchAll_Filter_Data();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <svg class="svg-icon5" viewBox="0 0 20 20">
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
                  <label> Posting Date</label>
                  <input
                    type="date"
                    name="DocDate"
                    readOnly
                    class="input"
                    defaultValue={
                      HeaderData && HeaderData.DocDate
                        ? HeaderData && HeaderData.DocDate
                        : currentDate
                    }
                  />
                </div>
                <div className="header_items_container">
                  <label> Document Date</label>
                  <input
                    type="date"
                    name="DocDueDate"
                    class="input"
                    defaultValue={
                      HeaderData && HeaderData.DocDueDate
                        ? HeaderData && HeaderData.DocDueDate
                        : currentDate
                    }
                    onChange={(e) => {
                      DocDateChange(e);
                    }}
                  />
                </div>
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
                {PQDocumentLines && (
                  <Table responsive striped bordered hover>
                    {Array.isArray(PQDocumentLines) &&
                    PQDocumentLines.length > 0 ? (
                      <TableHead>
                        <tr>
                          <th>
                            <div className="first_column">#</div>
                          </th>
                          <th>
                            <div>Bar Code</div>
                          </th>
                          <th>
                            <div>Item No.</div>
                          </th>
                          <th>
                            <div>Item Description</div>
                          </th>
                          <th>
                            <div>UoM Name</div>
                          </th>
                          <th>
                            <div>Free Text</div>
                          </th>
                          <th>
                            <div>Quantity</div>
                          </th>
                          <th>
                            <div>Open Qty</div>
                          </th>
                          <th>
                            <div>Whse</div>
                          </th>
                          <th>
                            <div>Unit Price</div>
                          </th>
                          <th>
                            <div>Discount</div>
                          </th>
                          <th>
                            <div>Price after Discount</div>
                          </th>
                          <th>
                            <div>Tax Code : Rate</div>
                          </th>
                          <th>
                            <div>Tax Amount(LC)</div>
                          </th>
                          <th>
                            <div>Gross Price After Disc.</div>
                          </th>
                          <th>
                            <div>Freight 1</div>
                          </th>
                          <th>
                            <div>Freight 1 (LC)</div>
                          </th>
                          <th>
                            <div>Line Total</div>
                          </th>
                          <th>
                            <div>Gross Total(LC)</div>
                          </th>
                          <th>
                            <div>Project</div>
                          </th>
                          <th>
                            <div>Buyer</div>
                          </th>
                          <th>
                            <div>Cost Centre</div>
                          </th>
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
                                    <td>
                                      <div className="inside_td">
                                        {index + 1}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td"></div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.ItemCode}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.ItemDescription}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.MeasureUnit}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
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
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
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
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.RemainingOpenQuantity}{" "}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
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
                                              options={PrWhse}
                                              displayValue="name"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.UnitPrice}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.DiscountPercent}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.Price}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            placeholder={
                                              item.VatGroup +
                                              "  : " +
                                              item.TaxPercentagePerRow +
                                              "%"
                                            }
                                            displayValue="name" // Property name to display in the dropdown options
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.TaxTotal}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.GrossTotalSC}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            options={Frieght} // Options to display in the dropdown
                                            displayValue="name" // Property name to display in the dropdown options
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {/* {item.DocumentLineAdditionalExpenses[0].LineTotal || 0} */}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.LineTotal}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        {item.GrossTotal}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            placeholder={item.ProjectCode}
                                            displayValue="name" // Property name to display in the dropdown options
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            placeholder={item.SalesPersonCode}
                                            displayValue="name" // Property name to display in the dropdown options
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="inside_td">
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            placeholder={item.CostingCode}
                                            displayValue="name" // Property name to display in the dropdown options
                                          />
                                        </div>
                                      </div>
                                    </td>
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
                          <th>Item No.</th>
                          <th>Item Description</th>
                          <th>UoM Name</th>
                          <th>Free Text</th>
                          <th>Quantity</th>
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
                                  name="QuotedQty"
                                  readOnly="readOnly"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  defaultValue={item.Quantity}
                                />
                              </div>
                            </TD>
                            <TD>{item.RemainingOpenQuantity} </TD>
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
                                    options={PrWhse}
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
                                  // placeholder= {item.DocumentLineAdditionalExpenses[0].ExpenseCode || 0}
                                  options={Frieght} // Options to display in the dropdown
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              </div>
                            </TD>
                            <TD>
                              {/* {item.DocumentLineAdditionalExpenses[0].LineTotal || 0} */}
                            </TD>
                            <TD>{item.LineTotal}</TD>
                            <TD>{item.GrossTotal}</TD>
                            <TD>
                              <div style={{ width: "14rem" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  placeholder={item.ProjectCode}
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  placeholder={item.SalesPersonCode}
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  placeholder={item.CostingCode}
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
            <div className="main_container">
              <div className="left">
                <div className="header_items_container">
                  <label>Sales Employee</label>
                  <Select
                    placeholder={HeaderData && HeaderData.SalesPersonCode}
                    onChange={(e) => setSaleEmployee(e.value)}
                    options={PrBuyer} // Options to display in the dropdown
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <div className="header_items_container">
                  <label>Owner</label>
                  <Select
                    placeholder={HeaderData && HeaderData.DocumentsOwner}
                    options={PrOwner} // Options to display in the dropdown
                    onChange={(e) => setSelectedOwner(e.value)}
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <div className="header_items_container">
                  <label for="exampleFormControlTextarea1">Remarks</label>
                  <textarea
                    type="text"
                    placeholder=" "
                    class="textArea"
                    id="exampleFormControlTextarea1"
                    name="Comments"
                    rows="3"
                    onChange={(e) => {
                      setCommentsValue(e.target.value);
                    }}
                    defaultValue={
                      HeaderData &&
                      HeaderData.Comments + ":" + HeaderData.DocEntry
                    }
                  />
                </div>
              </div>
              <div className="right">
                <div className="header_items_container">
                  <label>Net Total </label>
                  <input
                    readOnly="readOnly"
                    type="number"
                    value={getnetTotal || totalbforeDiscount}
                    // defaultValue={PQDocumentLines[0] && PQDocumentLines[0].Price}
                    // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                    class="input"
                  />
                </div>
                <div className="header_items_container">
                  <label>DPM</label>
                  <div className="innerpart">
                    <div className="discountfirst">
                      <input
                        type="number"
                        name="DPM%"
                        value={
                          disc ||
                          (HeaderData && HeaderData.DownPaymentPercentage)
                        }
                        onChange={(e) => {
                          setdisc(e.target.value);
                          setdownpayment(
                            (e.target.value *
                              (getnetTotal || totalbforeDiscount)) /
                              100
                          );
                        }}
                        placeholder="%"
                      />
                    </div>
                    <div className="discountsecond">
                      <input
                        type="number"
                        name="DPMPKR"
                        value={
                          downpayment ||
                          (HeaderData && HeaderData.DownPaymentAmountSC)
                        }
                        placeholder="PKR"
                        style={{ width: "7rem" }}
                        onChange={(e) => {
                          setdownpayment(e.target.value);
                          setdisc(
                            (e.target.value /
                              (getnetTotal || totalbforeDiscount)) *
                              100
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="header_items_container">
                  <label>Freight</label>
                  <input defaultValue={totalFreight} class="input" />
                </div>
                <div className="header_items_container">
                  <label>Tax</label>
                  <input
                    type="number"
                    class="input"
                    // onChange={e => setBottomTax(+e.target.value)}
                    value={gettaxtotal || (HeaderData && HeaderData.VatSumSys)}
                    // defaultValue={(disc*(PQDocumentLines[0] && PQDocumentLines[0].TaxTotal))/100}
                    name="TaxAmount(LC)"
                    placeholder="Tax"
                  />
                </div>
                <div className="header_items_container">
                  <label>Total</label>
                  <input
                    type="number"
                    value={
                      Number(gettaxtotal) + Number(downpayment) ||
                      (HeaderData && HeaderData.DocTotal)
                    }
                    placeholder=""
                    class="input"
                  />
                </div>
                <div className="header_items_container">
                  <label>Blanace Due:</label>
                  <input
                    type="number"
                    value={
                      Number(gettaxtotal) + Number(downpayment) ||
                      (HeaderData && HeaderData.DocTotalSys)
                    }
                    placeholder=""
                    class="input"
                  />
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
          </Form>
        </>
      )}
    </>
  );
}
