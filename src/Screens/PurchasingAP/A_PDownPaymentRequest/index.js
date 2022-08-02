import React from "react";
import Select from "react-select";
import { LINKS } from "../../../Utils";
import {
  Button,
  CardGroup,
  Table,
  Container,
  Modal,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";
import { Card } from "reactstrap";
import { Logistics, Accounting } from "../../../Component/PurchaseQuotation";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import "./index.css";
import { Navbar } from "../../../Component/Global";
import { input, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
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
  const [SelectedOwner, setSelectedOwner] = React.useState();
  const [getcomments, setgetcomments] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [showA, setShowA] = React.useState(false);
  const [getStatus, setgetStatus] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [bothbodies, setbothbodies] = React.useState(false);
  const [SearchNumber, setSearchNumber] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [gettaxtotal, setgettaxtotal] = React.useState();
  const [getnetTotal, setgetnetTotal] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [selectedPRVender, setselectedPRVender] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [DocDate, setDocDate] = React.useState();
  const [DocDueDate, setDocDueDate] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [Bra, setBra] = React.useState();
  const [PrVendor, setPrVendor] = React.useState();
  const [getdocumenttype, setgetdocumenttype] = React.useState("204");
  const [getdocumentname, setgetdocumentname] = React.useState("DPO2");
  const [ModuleName, setModuleName] = React.useState("PurchaseDownPayments");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [OwnerPrRe, setOwnerPrRe] = React.useState();
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
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
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState();
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [Totaltax, setTotaltax] = React.useState();
  const [disc, setdisc] = React.useState();
  const [ButtonName, setButtonName] = React.useState();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [downpayment, setdownpayment] = React.useState();
  const [show, setShow] = React.useState(false);

  const [modalTwo, setModalTwo] = React.useState();
  //Component Hooks---
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
  React.useEffect(async () => {
    setTestGetInstallationNumber("0020545074");
    setLiveGetInstallationNumber2("0021105591");
    today();
    compareDate();
    await setgetdocumentname("DPO2");
    await setModuleName("PurchaseDownPayments");
    await setgetdocumenttype("204");
    setButtonName("Add");
    setSearchNumber("0");
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    if (formcontroller) {
      formcontroller.forEach(async (element) => {
        if (element.U_FormId === "ODPO") {
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
    PurchaseQuotation(cook);
    OwnerPurchaseRequest(cook);
    BusinessPartners(cook);
    GroupNo(cook);
    Frieght1(cook);
    TableTaxCode(cook);
  }, [setShowA]);
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
  const BusinessPartners = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.Vendor, cookie: cookie }
      )
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
    // console.log("Today",currentDate)
  };

  const ContactPerson = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");

    // let SAPapi = `sml.svc/ACTIVECONTACTPERSON?$filter=CardCode eq '${SelectedVendor}' &$orderby=CntctCode`
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq  '${selectedPRVender}'`;
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
  const GetItems = async (cookie) => {
    let ItemsResponseResult = {};
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

  /* Table API's Call++++++++ */
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
        //  else  if (res.data !==  LiveGetInstallationNumber2 ) {
        //   if(res.data !== TestGetInstallationNumber){
        //   alert("Provided Key Does not match")
        //   // window.location.href="/DisabledHomeScreen";
        //   }
        // }
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
  const DocDateChange = async (e) => {
    setDocDate(e.target.value);
  };
  const PurchaseQuotation = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseOrder.purchaseorder,
        cookie: cookie,
      })
      .then(function (res) {})
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
    let SAPapi = `PurchaseOrders?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${selectedPRVender}' `;
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
    setSearchDocumentLines(item.DocumentLines);
    localStorage.setItem("getDocEntry", item.DocEntry);
    if (item.DocumentStatus == "bost_Open") {
      setgetStatus("Open");
      setButtonName("Update");
    } else {
      setgetStatus("Close");
      setButtonName("Update");
    }
    let sum = 0;
    let sum1 = 0;
    item.DocumentLines.forEach((item) => {
      sum = sum + item.LineTotal;
      sum1 = sum1 + item.TaxTotal;
    });
    setTotalbforeDiscount(sum);
    setTotaltax(sum1);
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
      let sapAPi = `PurchaseDownPayments?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `PurchaseDownPayments?$orderby=DocNum`;
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
    let sum = 0;
    let sum1 = 0;
    let sapAPi = `PurchaseDownPayments?$filter=DocNum eq ${SearchNumber}  &$orderby=DocNum asc`;
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
        res.data.value[0].DocumentLines.forEach((item) => {
          sum = sum + item.LineTotal;
          sum1 = sum1 + item.TaxTotal;
        });
        setTotalbforeDiscount(sum);
        setTotaltax(sum1);
        setSearchDocumentLines(res.data.value[0].DocumentLines);
        if (HeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});
  };
  const DocLinesDropDownOnChange = (selectedItem, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value;
    itemDetail[PrReIndex].DocumentLines[index]["GrossPrice"] =
      selectedItem.item.VatGroups_Lines[0].Rate;
    setPQDocumentLines(itemDetail);
  };
  const SearchDocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = SearchDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    itemDetail[index]["GrossPrice"] = selectedItem.item.VatGroups_Lines[0].Rate;
    setSearchDocumentLines(itemDetail);
  };
  const VendorChange = (e) => {
    setselectedPRVender(e.value);
  };
  const Patch = async (id, body) => {
    let DraftResponseResult = null;
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `PurchaseDownPayments(${id})`,
          cookie: cook,
        })

        .then(function (res) {
          DraftResponseResult = res;
          if (DraftResponseResult) {
            alert.show(DraftResponseResult.error.value.message);
          } else {
            alert.error(JSON.stringify(res.data.error.message.value));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const submitPatchDownPaymentRequest = async () => {
    let docLines = [];
    SearchDocumentLines.forEach((element) => {
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
    Patch(HeaderData.DocNum, body);
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitDownPaymentRequest();
    } else if (ButtonName != "Add") {
      submitPatchDownPaymentRequest();
    }
  };
  const submitDownPaymentRequest = async () => {
    let DocLines = [];
    let body = PRBody;
    PQDocumentLines.forEach((element) => {
      if (element.isSelected) {
        element.DocumentLines.forEach((item) => {
          if (item.isSelected && item.LineStatus === "bost_Open") {
            DocLines.push({
              BaseEntry: item.DocEntry,
              BaseType: 22,
              BaseLine: item.LineNum,
              FreeText: item.FreeText,
            });
            body["DownPaymentType"] = "dptRequest";
            body["DownPayment"] = disc;
            body["DocumentLines"] = DocLines;
            body["CardCode"] = selectedPRVender;
            body["DocDate"] = DocDate ? DocDate : currentDate;
            body["DocDueDate"] = DocDueDate ? DocDueDate : currentDate;
            body["AttachmentEntry"] = attachmentresponse;
            body["Series"] = getseriesvalue;
            //Component posting------
            body["Address"] = getAddress;
            body["Address2"] = getAddress2;
            body["TransportationCode"] = getTransportationCode;
            body["JournalMemo"] = getJournalMemo;
            body["GroupNumber"] = getGroupNumber;
            body["Project"] = getProject;
            body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
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
          api: LINKS.sap.PurchaseDownPayments.PostpurchaseDownPayments,
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
          api: LINKS.sap.PurchaseDownPayments.PostpurchaseDownPayments,
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
  const handleCloseee = () => setModalTwo(false);
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
        getdocumentname={getdocumentname}
        getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
      />
      {localStorage.getItem("documentcontroller") === "N" ? (
        <h1>You are not permited to perform this action</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>A/P Down Payment Request</h1>
          <Form onSubmit={handleSubmitted}>
            {/* Upper Side++++++++ */}
            <div className="main_container">
              <div className="left">
                <div className="header_items_container">
                  <label>Vendor</label>
                  <Select
                    placeholder={HeaderData && HeaderData.CardCode}
                    options={VendorCodeDropdown}
                    onChange={(e) => {
                      VendorChange(e);
                    }}
                    displayValue="name"
                  />
                </div>
                <div className="header_items_container">
                  <label>Contact Person</label>
                  <div variant="primary" onClick={ContactPerson}>
                    <Select
                      placeholder={HeaderData && HeaderData.ContactPersonCode}
                      options={ContactPersonDropdown}
                      displayValue="name"
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
                                            class="form-control"
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
                                          />
                                        </div>
                                      </TD>
                                      <TD>{item.RemainingOpenQuantity} </TD>
                                      <TD>
                                        <div style={{ width: "15em" }}>
                                          {PrWhse && (
                                            <Select
                                              menuPortalTarget={document.body}
                                              defaultValue={PrWhse.filter(
                                                (option) =>
                                                  option.value ===
                                                  item.WarehouseCode
                                              )}
                                              placeholder="Select.."
                                              options={PrWhse}
                                              onChange={(e) => {
                                                DocLinesDropDownOnChange(
                                                  e,
                                                  index,
                                                  "WarehouseCode"
                                                );
                                              }}
                                              displayValue="name"
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
                                            displayValue="name"
                                          />
                                        </div>
                                      </TD>
                                      <TD>{item.TaxTotal}</TD>
                                      <TD>{item.GrossTotalSC}</TD>
                                      <TD>
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            options={Frieght}
                                            displayValue="name"
                                          />
                                        </div>
                                      </TD>
                                      <TD>
                                        {item.DocumentLineAdditionalExpenses[0]
                                          ? item
                                              .DocumentLineAdditionalExpenses[0]
                                              .LineTotal
                                          : ""}
                                      </TD>
                                      <TD>{item.LineTotal}</TD>
                                      <TD>{item.GrossTotal}</TD>
                                      <TD>
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            placeholder={item.ProjectCode}
                                            displayValue="name"
                                          />
                                        </div>
                                      </TD>
                                      <TD>
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            placeholder={item.SalesPersonCode}
                                            displayValue="name"
                                          />
                                        </div>
                                      </TD>
                                      <TD>
                                        <div style={{ width: "14rem" }}>
                                          <Select
                                            menuPortalTarget={document.body}
                                            placeholder={item.CostingCode}
                                            displayValue="name"
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
                    <Modal.Title>A/P DownPayment Request List</Modal.Title>
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
                  <label>Vendor Ref.No</label>
                  <input
                    value={HeaderData && HeaderData.NumAtCard}
                    type="text"
                    class="input"
                    readOnly
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
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
                        value={getnextnumber}
                        placeholder=""
                        class=""
                      />
                    </div>
                  </div>
                </div>
                <div className="header_items_container">
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
                <div className="Down header_items_container">
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
                    class="form-control14"
                    onChange={(e) => {
                      setSearchNumber(e.target.value);
                    }}
                  />
                </div>
                {/* <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
            <label>No</label>
            <input
              type='number'
              class='form-control'
              readOnly='readOnly'
              value={SelectedPRDocEntry && SelectedPRDocEntry.DocNum||HeaderData && HeaderData.DocNum}
            /></div> */}

                <div className="header_items_container">
                  <label> Posting Date</label>
                  <input
                    type="date"
                    name="DocDate"
                    class="input"
                    defaultValue={
                      HeaderData && HeaderData.DocDate
                        ? HeaderData && HeaderData.DocDate
                        : currentDate
                    }
                    onChange={(e) => {
                      setDocDueDate(e.target.value);
                    }}
                  />
                </div>
                {/* <br/>
            <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e => setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
                {/* <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem'}}>
            <label> Document Date</label>
            <input
              type='date'
              name='DocDueDate'
              class='form-control'
              defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate||HeaderData && HeaderData.DocDueDate}
              onChange={e => {
                DocDateChange(e)
              }}
            />
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
                                            ontextChanged(e, index, PrReIndex);
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
                                        />
                                      </div>
                                    </TD>
                                    <TD>{item.RemainingOpenQuantity} </TD>
                                    <TD>
                                      <div style={{ width: "15em" }}>
                                        <Select
                                          menuPortalTarget={document.body}
                                          placeholder={item.WarehouseCode}
                                          options={PrWhse}
                                          onChange={(e) => {
                                            DocLinesDropDownOnChange(
                                              e,
                                              index,
                                              PrReIndex,
                                              "WarehouseCode"
                                            );
                                          }}
                                          displayValue="name"
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
                                          placeholder={
                                            item.VatGroup +
                                            "  : " +
                                            item.TaxPercentagePerRow +
                                            "%"
                                          }
                                          displayValue="name"
                                        />
                                      </div>
                                    </TD>
                                    <TD>{item.TaxTotal}</TD>
                                    <TD>{item.GrossTotalSC}</TD>
                                    <TD>
                                      <div style={{ width: "14rem" }}>
                                        <Select
                                          menuPortalTarget={document.body}
                                          options={Frieght}
                                          displayValue="name"
                                        />
                                      </div>
                                    </TD>
                                    <TD>
                                      {item.DocumentLineAdditionalExpenses[0]
                                        ? item.DocumentLineAdditionalExpenses[0]
                                            .LineTotal
                                        : ""}
                                    </TD>
                                    <TD>{item.LineTotal}</TD>
                                    <TD>{item.GrossTotal}</TD>
                                    <TD>
                                      <div style={{ width: "14rem" }}>
                                        <Select
                                          menuPortalTarget={document.body}
                                          placeholder={item.ProjectCode}
                                          displayValue="name"
                                        />
                                      </div>
                                    </TD>
                                    <TD>
                                      <div style={{ width: "14rem" }}>
                                        <Select
                                          menuPortalTarget={document.body}
                                          placeholder={item.SalesPersonCode}
                                          displayValue="name"
                                        />
                                      </div>
                                    </TD>
                                    <TD>
                                      <div style={{ width: "14rem" }}>
                                        <Select
                                          menuPortalTarget={document.body}
                                          placeholder={item.CostingCode}
                                          displayValue="name"
                                        />
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
                                      defaultValue={item.RemainingOpenQuantity}
                                    />
                                  </div>
                                </TD>
                                <TD>{item.RemainingOpenQuantity} </TD>
                                <TD>
                                  <div style={{ width: "15em" }}>
                                    <Select
                                      menuPortalTarget={document.body}
                                      placeholder={item.WarehouseCode}
                                      options={PrWhse}
                                      onChange={(e) => {
                                        SearchDocLinesDropDownOnChange(
                                          e,
                                          index,
                                          "WarehouseCode"
                                        );
                                      }}
                                      displayValue="name"
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
                                      placeholder={
                                        item.VatGroup +
                                        "  : " +
                                        item.TaxPercentagePerRow +
                                        "%"
                                      }
                                      displayValue="name"
                                    />
                                  </div>
                                </TD>
                                <TD>{item.TaxTotal}</TD>
                                <TD>{item.GrossTotalSC}</TD>
                                <TD>
                                  <div style={{ width: "14rem" }}>
                                    <Select
                                      menuPortalTarget={document.body}
                                      options={Frieght}
                                      displayValue="name"
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  {item.DocumentLineAdditionalExpenses
                                    ? item.DocumentLineAdditionalExpenses[0]
                                        .LineTotal
                                    : ""}
                                </TD>
                                <TD>{item.LineTotal}</TD>
                                <TD>{item.GrossTotal}</TD>
                                <TD>
                                  <div style={{ width: "14rem" }}>
                                    <Select
                                      menuPortalTarget={document.body}
                                      placeholder={item.ProjectCode}
                                      displayValue="name"
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: "14rem" }}>
                                    <Select
                                      menuPortalTarget={document.body}
                                      placeholder={item.SalesPersonCode}
                                      displayValue="name"
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: "14rem" }}>
                                    <Select
                                      menuPortalTarget={document.body}
                                      placeholder={item.CostingCode}
                                      displayValue="name"
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
                  getDatafromParent={HeaderData}
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
            <div className="main_container">
              <div className="left">
                <div className="header_items_container">
                  <label>Buyer</label>
                  <Select
                    displayValue="name"
                    placeholder={HeaderData && HeaderData.SalesEmployeeName}
                  />
                </div>
                <div className="header_items_container">
                  <label>Owner</label>
                  <Select
                    options={PrOwner}
                    onChange={(e) => setSelectedOwner(e.value)}
                    displayValue="name"
                  />
                </div>
                <div class="header_items_container">
                  <label for="exampleFormControlTextarea1">Remarks</label>
                  <div>
                    <textarea
                      defaultValue={
                        HeaderData &&
                        +"Document Entry" + HeaderData &&
                        HeaderData.DocEntry + ":" + HeaderData.Comments
                      }
                      type="text"
                      class="textArea"
                      id="exampleFormControlTextarea1"
                      name="Comments"
                      rows="3"
                      onChange={(e) => {
                        setgetcomments(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <div class="header_items_container">
                  <label>Net Total </label>
                  <input
                    readOnly="readOnly"
                    type="number"
                    value={getnetTotal || totalbforeDiscount}
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
                  <label>Tax</label>
                  <input
                    type="number"
                    class="input"
                    value={(HeaderData && HeaderData.VatSumSys) || gettaxtotal}
                    name="TaxAmount(LC)"
                    placeholder="Tax"
                  />
                </div>
                <div className="header_items_container">
                  <label>Total Payment Due:</label>
                  <input
                    type="text"
                    value={
                      Number(Totaltax || gettaxtotal) +
                        Number(
                          downpayment ||
                            (HeaderData && HeaderData.DownPaymentAmountSC)
                        ) ||
                      (HeaderData && HeaderData.DocTotal)
                    }
                    placeholder=""
                    class="input"
                  />
                </div>
                <div className="header_items_container">
                  <label>Blanace Due:</label>
                  <input
                    type="text"
                    value={
                      Number(Totaltax || gettaxtotal) +
                        Number(
                          downpayment ||
                            (HeaderData && HeaderData.DownPaymentAmountSC)
                        ) ||
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
