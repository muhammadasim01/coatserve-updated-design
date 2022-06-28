import React from "react";
import {
  Button,
  Card,
  CardGroup,
  Table,
  Tab,
  Tabs,
  Container,
  Modal,
} from "react-bootstrap";
import "./index.css";
import { MenuUp } from "react-bootstrap-icons";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MdDelete } from "react-icons/md";
import { CONSTANTS, LINKS } from "../../../Utils";
import { Navbar } from "../../../Component/Global";

import { InputR, DIV3, DIV4, ItemsWrapper, TableHead, TD } from "./Style";
import { useAlert } from "react-alert";
import e from "cors";
const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function PurchaseRequest() {
  const alert = useAlert();
  const classes = useStyles();
  const [getseriesnumbring, setgetseriesnumbring] = React.useState();
  const [gettablecontroller, setgettablecontroller] =
    React.useState("selectedItems");
  const [bothbodies, setbothbodies] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [SelectedOwner, setSelectedOwner] = React.useState();
  const [selectedPRCustomer, setselectedPRCustomer] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [getNumatcard, setgetNumatcard] = React.useState();
  const [SaleEmployee, setSaleEmployee] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getautounitprice, setgetautounitprice] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [DocStatus, setDocStatus] = React.useState();
  const [ButtonName, setButtonName] = React.useState("Add");
  const [SearchNumber, setSearchNumber] = React.useState("0");
  const [update, setUpdate] = React.useState(1);
  const [Frieght, setFrieght] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [ReqDate, setReqDate] = React.useState();
  const [PrVendor, setPrVendor] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [HeaderData, setHeaderData] = React.useState(false);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [DiscountTotal, setDiscountTotal] = React.useState(0);
  const [TaxCode, setTaxCode] = React.useState();
  const [disc, setdisc] = React.useState();
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState(0);
  const [totalFreight, setTotalFreight] = React.useState();
  const [TotalTaxRate, setTotalTaxRate] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  // ahtsham hooks
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [getdocumentname, setgetdocumentname] = React.useState("QUT2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("23");
  const [ModuleName, setModuleName] = React.useState("Quotations");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"));
  const [showA, setShowA] = React.useState(false);
  const [currentComDate, setcurrentComDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  // informational hooks
  const [selectedItems, setSelectedItems] = React.useState([
    { ItemCode: "", UOM_Name: "" },
  ]);
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  };
  React.useEffect(async () => {
    today();
    setgetdocumentname("QUT2");
    setModuleName("Quotations");
    setgetdocumenttype("23");
    compareDate();
    let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    if (formcontroller) {
      formcontroller.forEach(async (element) => {
        if (element.U_FormId === "OQUT") {
          await localStorage.setItem(
            "documentcontroller",
            element.U_Authorization
          );
        }
      });
    }
    async function fetchData() {
      let cook = await localStorage.getItem("cookie");
      const show = await localStorage.getItem("ShowBranches");
      if (showA == "true") {
        setShowA(true);
        compareDate();
        await localStorage.removeItem("ShowBranches");
      }
      if (cook) {
        Vendor(cook);
        GetItems(cook);
        Buyer(cook);
        CostCentre(cook);
        Project(cook);
        TableTaxCode(cook);
        Frieght1(cook);
        Owner(cook);
      }
    }
    fetchData();
  }, []);
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
  };
  const ContactPerson = async (selectedPRCustomer) => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq '${selectedPRCustomer}'`;
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
  const GetItems = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveSalesItems,
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
          FreeText: element.FreeText,
          RequriedDate: element.RequriedDate,
          ShipDate: element.ShipDate,
          // RequiredQuantity: 1,
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
          item: element,
        });
      });

      await setItemsDropDown(ItemsDropDown);
      await setItemsDetails(ItemsDetails);
    }
  };
  // --------------------------------
  const itemsChange = (e, index) => {
    let obj = selectedItems;
    obj[index][e.target.name] = e.target.value;
    obj[index]["TaxRate"] = 0;
    obj[index]["PriceAfterVAT"] = obj[index]["UnitPrice"];
    obj[index]["LineTotal"] =
      obj[index].PriceAfterVAT * obj[index].RequiredQuantity;
    obj[index]["TaxAmount_LC"] =
      (obj[index]["PriceAfterVAT"] *
        (obj[index]["RequiredQuantity"] * obj[index]["TaxRate"])) /
      100;
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    obj.forEach((element) => {
      if (element.ItemCode) {
        sum = sum + element.LineTotal;
        sum1 = sum1 + element.TaxRate;
        sum2 = sum2 + element.Freight;
      }
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
    setTotalFreight(sum2);
    setSelectedItems(obj);
    if (e.target.name === "QuotedQuantity") {
      discountFormula(e, index);
    } else if (e.target.name === "DiscountPercent") {
      itemsChange22(e, index);
    }
  };
  const itemsChange22 = (e, index) => {
    let obj = selectedItems;
    obj[index]["PriceAfterVAT"] =
      obj[index]["UnitPrice"] -
      (obj[index]["UnitPrice"] * obj[index]["DiscountPercent"]) / 100;
    obj[index]["LineTotal"] =
      obj[index].PriceAfterVAT * obj[index].RequiredQuantity;
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    obj.forEach((element) => {
      if (element.ItemCode) {
        sum = sum + element.LineTotal;
        sum1 = sum1 + element.TaxRate;
        sum2 = sum2 + element.Freight;
      }
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
    setTotalFreight(sum2);
    setSelectedItems(obj);
  };
  const discountFormula = (e, index) => {
    let obj = selectedItems;
    obj[index][e.target.name] = e.target.value;
    setSelectedItems(obj);
  };
  // ===================================================================

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
  const Vendor = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------

    await axios
      .post(LINKS.SERVER_GET, {
        api: LINKS.sap.MasterData.ActiveCustomer,
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
      .post(LINKS.SERVER_GET, {
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
      .post(LINKS.SERVER_GET, {
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
      .post(LINKS.SERVER_GET, {
        api: LINKS.sap.PurchaseRequest.Freight,
        cookie: cookie,
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = [];
          res.data.value.forEach((element) => {
            ItemsDropDown.push({
              value: element.Name,
              label: element.Name,
            });
          });
          setFrieght(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Buyer = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(LINKS.SERVER_GET, {
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
      .post(LINKS.SERVER_GET, {
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
  const requireDateChange = async (e) => {
    setReqDate(e.target.value);
  };
  const ItemsDropDownfunc = async (selectedList, index, name) => {
    let doclines = selectedItems;
    doclines[index]["ItemCode"] = selectedList.value;
    doclines[index]["ItemName"] = selectedList.item.ItemName;
    doclines[index]["LineNum"] = index;
    doclines[index]["SalesUnit"] = selectedList.item.SalesUnit;
    doclines[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setSelectedItems(doclines);
  };
  const ontextChanged = (e, index) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index][e.target.name] = e.target.value;
    setPQDocumentLines(itemDetail);
  };
  const DocLinesDropDownOnChange2 = (selectedItem, index, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    setPQDocumentLines(itemDetail);
  };
  const DocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = selectedItems;
    itemDetail[index][name] = selectedItem.value;
    setSelectedItems(itemDetail);
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitSQ();
    } else if (ButtonName != "Add") {
      // submitPatchPO()
    }
  };
  const submitSQ = async () => {
    var filtered = selectedItems.filter(function (el) {
      return el != null || el != [];
    });
    let DocLines = [];
    let body = PRBody;
    filtered.forEach((element) => {
      if (element.ItemCode) {
        DocLines.push({
          ItemCode: element.ItemCode,
          FreeText: element.FreeText,
          RequiredQuantity: element.RequiredQuantity,
          RequiredDate: element.RequiredDate,
          DiscountPercent: element.DiscountPercent,
          VatGroup: element.VatGroup,
          UnitPrice: element.UnitPrice,
          PriceAfterVAT: element.PriceAfterVAT,
          DistributeExpense: "tYES",
          DocumentLineAdditionalExpenses: [
            {
              ExpenseCode: 1,
              LineTotal: element.TotalFreight,
            },
          ],
        });
      }
    });
    body["DocumentLines"] = DocLines;
    body["CardCode"] = selectedPRCustomer;
    body["SendNotification"] = "tNO";
    body["RequriedDate"] = ReqDate ? ReqDate : currentDate;
    body["DocDueDate"] = PRBody.DocDueDate ? PRBody.DocDueDate : currentDate;
    body["DocDate"] = PRBody.DocDate ? PRBody.DocDate : currentDate;
    body["TaxDate"] = PRBody.TaxDate ? PRBody.TaxDate : currentDate;
    body["NumAtCard"] = getNumatcard;
    body["AttachmentEntry"] = attachmentresponse;
    body["Series"] = getseriesvalue;
    body["SalesPersonCode"] = SaleEmployee;
    body["DocumentsOwner"] = SelectedOwner;
    console.log(body);
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
          api: LINKS.sap.Sales.PostQuotations,
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
          api: LINKS.sap.Sales.PostQuotations,
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
  React.useEffect(() => {}, [PQDocumentLines]);
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
    setgettablecontroller("PQDocumentLines");
    setPQDocumentLines(item.DocumentLines);
  };
  const getUnitPricesfromCardcode = async (getCardCode) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    let cook = await localStorage.getItem("cookie");
    let SAPapi = `SpecialPrices?$select=CardCode,DiscountPercent,ItemCode,Price &$filter=CardCode eq '${getCardCode}'`;

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cook,
      })
      .then(function (res) {
        if (res.data.value) {
          let CardCodeDetails = [];
          res.data.value.forEach((element) => {
            CardCodeDetails[element.ItemCode] = {
              ItemCode: element.ItemCode,
              CardCode: element.CardCode,
              Price: element.Price,
              DiscountPercent: element.DiscountPercent,
            };
          });
          setgetautounitprice(CardCodeDetails);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
      let sapAPi = `Quotations?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `Quotations?$orderby=DocNum`;
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
  const testing = (e, index) => {
    let obj = selectedItems;
    obj[index][e.target.name] = e.target.value;
    obj[index]["UnitPrice"] =
      getautounitprice &&
      getautounitprice[obj[index]["ItemCode"]].Price +
        (getautounitprice &&
          getautounitprice[obj[index]["ItemCode"]].Price * getautounitprice &&
          getautounitprice[obj[index]["ItemCode"]].DiscountPercent / 100);
    obj[index]["DiscountPercent"] =
      getautounitprice &&
      getautounitprice[obj[index]["ItemCode"]].DiscountPercent;
    obj[index]["LineTotal"] =
      getautounitprice &&
      getautounitprice[obj[index]["ItemCode"]].Price *
        obj[index].RequiredQuantity;
    obj[index]["TaxAmount_LC"] =
      getautounitprice &&
      (getautounitprice[obj[index]["ItemCode"]].Price *
        (obj[index]["RequiredQuantity"] * obj[index]["TaxRate"])) /
        100;
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0;
    obj.forEach((element) => {
      if (element.ItemCode) {
        sum = sum + element.LineTotal;
      }
    });
    setTotalbforeDiscount(sum);
    setSelectedItems(obj);
    // if(e.target.name === 'QuotedQuantity'){
    //   discountFormula(e, index)
    // }
    // else if(e.target.name === 'DiscountPercent'){
    //   itemsChange22(e, index)
    // }
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  const DocLinesDropDownOnChange22 = (selectedItem, index, name) => {
    let obj = selectedItems;
    obj[index]["VatGroup"] = selectedItem.value;
    obj[index]["TaxRate"] = selectedItem.item.VatGroups_Lines[0].Rate;
    obj[index]["LineTotal"] =
      obj[index].PriceAfterVAT * obj[index].RequiredQuantity +
      obj[index].TaxRate;
    obj[index]["TaxAmount_LC"] =
      (obj[index].PriceAfterVAT *
        obj[index].RequiredQuantity *
        obj[index].PriceAfterVAT) /
      100;
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    obj.forEach((element) => {
      sum = sum + element.LineTotal;
      sum1 = sum1 + element.TaxRate;
      sum2 = sum2 + element.Freight;
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
    setTotalFreight(sum2);
  };
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `Quotations?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0]);
        if (res.data.value[0] != undefined) {
          setButtonName("Update");
        }
        if (res.data.value[0].DocumentStatus === "bost_Open") {
          setDocStatus("Open");
        } else {
          setDocStatus("Close");
        }
        setgettablecontroller("PQDocumentLines");
        setPQDocumentLines(res.data.value[0].DocumentLines);
      })
      .catch({});
  };
  const deleteobject = (e, item, index) => {
    var newArrayList = [];
    let obj = selectedItems;
    var filtered = obj.filter(function (el) {
      return el != null;
    });
    console.log("filtered", filtered);
    filtered[index]["LineNum"] = index;
    newArrayList = filtered.filter((element) => element.LineNum != index);
    let sum = 0;
    newArrayList.forEach((element) => {
      if (element.ItemCode) {
        console.log("element", element);
        sum = sum + element.LineTotal;
      }
    });
    console.log("sum", sum);
    setTotalbforeDiscount(sum);
    newArrayList["update"] = update + 1;
    setSelectedItems(newArrayList);
    setUpdate(update + 1);
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
          <h1 style={{ textAlign: "center" }}>Sales Quotation</h1>
          <CardGroup>
            <DIV3>
              <Container fluid>
                <label>Customers</label>
                <div style={{ width: "23.5rem", height: "auto" }}>
                  <Select
                    placeholder={
                      HeaderData &&
                      HeaderData.CardCode + " : " + HeaderData &&
                      HeaderData.CardName
                    }
                    options={PrVendor}
                    onChange={(e) => {
                      getUnitPricesfromCardcode(e.value);
                      ContactPerson(e.value);
                      setselectedPRCustomer(e.value);
                    }}
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <label>Contact Person</label>
                <div style={{ width: "23.5rem", height: "auto" }}>
                  <Select
                    placeholder={HeaderData && HeaderData.ContactPersonCode}
                    options={ContactPersonDropdown} // Options to display in the dropdown
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <br />
                <div style={{ width: "23.5rem", height: "auto" }}>
                  <label>Customer Ref.No</label>
                  <input
                    defaultValue={HeaderData && HeaderData.NumAtCard}
                    type="text"
                    class="form-control"
                    onChange={(e) => setgetNumatcard(e.target.value)}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
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
                        options={getserviceseries} // Options to display in the dropdown
                        onChange={(e) => {
                          getseriesvaluefunction(e);
                          Whse(e.item.Name);
                        }} // Function will trigger on select event
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
                    ]} // Options to display in the dropdown
                    onChange={(e) => {
                      setgetdocumentstatus(e.value);
                    }}
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <br />
                <div
                  className="sale"
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
                    <svg class="svg-icon4" viewBox="0 0 20 20">
                      <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                    </svg>
                  </a>
                  <input
                    name={"SearchPRNumber"}
                    type="Number"
                    placeholder="Number"
                    class="form-control4"
                    onChange={(e) => {
                      setSearchNumber(e.target.value);
                    }}
                  />
                </div>
                <Modal show={show1} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Quotation List</Modal.Title>
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
                <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                  <label> Posting Date</label>
                  <input
                    type="date"
                    name="DocDate"
                    class="form-control"
                    defaultValue={
                      HeaderData && HeaderData.DocDate
                        ? HeaderData && HeaderData.DocDate
                        : currentDate
                    }
                    onChange={(e) => {
                      dateChange(e);
                    }}
                  />
                </div>
                <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                  <label> Valid Date</label>
                  <input
                    type="date"
                    name="DocDueDate"
                    class="form-control"
                    defaultValue={
                      HeaderData && HeaderData.DocDueDate
                        ? HeaderData && HeaderData.DocDueDate
                        : currentDate
                    }
                    onChange={(e) => {
                      dateChange(e);
                    }}
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
                        : currentDate
                    }
                    onChange={(e) => {
                      dateChange(e);
                    }}
                  />
                </div>
                <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                  <label>Required Date</label>
                  <input
                    type="date"
                    name="RequriedDate"
                    class="form-control"
                    defaultValue={
                      HeaderData && HeaderData.RequriedDate
                        ? HeaderData && HeaderData.RequriedDate
                        : currentDate
                    }
                    onChange={(e) => {
                      requireDateChange(e);
                    }}
                  />
                </div>
              </Container>
            </DIV3>
          </CardGroup>
          {/* Items List Table */}
          <Tabs
            defaultActiveKey="Contents"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="Contents" title="Contents">
              {gettablecontroller === "selectedItems" ? (
                <Table responsive striped bordered hover>
                  {Array.isArray(selectedItems) && selectedItems.length > 0 ? (
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Bar Code</th>
                        <th>Item No.</th>
                        <th>Item Description</th>
                        <th>UoM Name</th>
                        <th>Free Text</th>
                        <th>Requried Qty</th>
                        <th>Requried Date</th>
                        <th>Quoted Qty</th>
                        <th>Open Qty</th>
                        <th>Unit Price</th>
                        <th>Discount</th>
                        <th>Price after Discount</th>
                        <th>Tax Code</th>
                        <th>Tax Amount(LC)</th>
                        <th>Gross Price Disc.</th>
                        <th>Total(LC)</th>
                        <th>Gross Total(LC)</th>
                        <th>Whse</th>
                        <th>Project</th>
                        <th>Buyer</th>
                        <th>Cost Centre</th>
                      </tr>
                    </TableHead>
                  ) : null}
                  <tbody>
                    {selectedItems &&
                      selectedItems.map((item, index) => (
                        <tr key={`${index}`}>
                          <TD>
                            {index + 1}
                            <a
                              style={{ color: "black" }}
                              class=""
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Delete"
                              rel=""
                              onClick={(e) => {
                                deleteobject(e, item, index);
                              }}
                            >
                              {" "}
                              <MdDelete />{" "}
                            </a>
                          </TD>
                          <TD></TD>
                          <TD>
                            {" "}
                            <div style={{ width: "14rem", height: "auto" }}>
                              {ItemsDropDown && (
                                <Select
                                  value={ItemsDropDown.filter(
                                    (option) => option.value === item.ItemCode
                                  )}
                                  placeholder="Select.."
                                  menuPortalTarget={document.body}
                                  options={ItemsDropDown}
                                  onChange={(e) => {
                                    ItemsDropDownfunc(e, index, "ItemCode");
                                    setSelectedItems([...selectedItems, []]);
                                  }}
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              )}
                            </div>
                          </TD>
                          <TD>{item.ItemName}</TD>
                          <TD>{item.SalesUnit}</TD>
                          <TD>
                            <div style={{ width: "14rem", height: "auto" }}>
                              <input
                                type="text"
                                name="FreeText"
                                class="form-control"
                                value={item.ItemCode ? item.FreeText : ""}
                                onChange={(e) => {
                                  itemsChange(e, index);
                                }}
                              />
                            </div>
                          </TD>
                          <TD>
                            {" "}
                            {getautounitprice &&
                            getautounitprice[item.ItemCode] ? (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  name="RequiredQuantity"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  value={
                                    item.ItemCode ? item.RequiredQuantity : ""
                                  }
                                  onChange={(e) => {
                                    testing(e, index);
                                  }}
                                />
                              </div>
                            ) : (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  name="RequiredQuantity"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  value={
                                    item.ItemCode ? item.RequiredQuantity : ""
                                  }
                                  onChange={(e) => {
                                    itemsChange(e, index);
                                  }}
                                />
                              </div>
                            )}
                          </TD>
                          <TD>
                            <div style={{ width: "14rem", height: "auto" }}>
                              <input
                                type="date"
                                name="RequiredDate"
                                class="form-control"
                                aria-describedby="Requesterid"
                                value={
                                  item.RequiredDate
                                    ? item.RequiredDate
                                    : currentDate
                                }
                                onChange={(e) => {
                                  itemsChange(e, index);
                                }}
                              />
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: "14rem", height: "auto" }}>
                              <input
                                type="number"
                                name="QuotedQuantity"
                                class="form-control"
                                onChange={(e) => {
                                  itemsChange(e, index);
                                }}
                                value={item.QuotedQuantity}
                              />
                            </div>
                          </TD>
                          <TD>{item.RequiredQuantity}</TD>
                          <TD>
                            {getautounitprice &&
                            getautounitprice[item.ItemCode] ? (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="UnitPrice"
                                  type="number"
                                  class="form-control"
                                  readOnly
                                  value={
                                    item.ItemCode
                                      ? getautounitprice &&
                                        getautounitprice[item.ItemCode].Price
                                      : ""
                                  }
                                />
                              </div>
                            ) : (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="UnitPrice"
                                  type="number"
                                  class="form-control"
                                  value={item.ItemCode ? item.UnitPrice : ""}
                                  onChange={(e) => {
                                    itemsChange(e, index);
                                  }}
                                  // value={getautounitprice && getautounitprice[item.ItemCode] ? getautounitprice && getautounitprice[item.ItemCode].Price : 0 }
                                />
                              </div>
                            )}
                          </TD>
                          <TD>
                            {" "}
                            {getautounitprice &&
                            getautounitprice[item.ItemCode] ? (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  name="DiscountPercent"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  readOnly
                                  value={
                                    item.ItemCode
                                      ? getautounitprice &&
                                        getautounitprice[item.ItemCode]
                                          .DiscountPercent
                                      : ""
                                  }
                                />
                              </div>
                            ) : (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  name="DiscountPercent"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  onChange={(e) => itemsChange(e, index)}
                                  defaultValue={item.ItemCode ? 0 : ""}
                                />
                              </div>
                            )}
                          </TD>
                          <TD>
                            {" "}
                            {getautounitprice &&
                            getautounitprice[item.ItemCode] ? (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="PriceAfterVAT"
                                  class="form-control"
                                  readOnly
                                  aria-describedby="Requesterid"
                                  value={
                                    item.ItemCode
                                      ? getautounitprice &&
                                        getautounitprice[item.ItemCode].Price
                                      : ""
                                  }
                                />
                              </div>
                            ) : (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="PriceAfterVAT"
                                  class="form-control"
                                  readOnly
                                  aria-describedby="Requesterid"
                                  value={
                                    item.ItemCode ? item.PriceAfterVAT : ""
                                  }
                                />
                              </div>
                            )}
                          </TD>
                          <TD>
                            {getseriesnumbring == "2" ? (
                              <div style={{ width: "14rem" }}>
                                {TaxCode && (
                                  <Select
                                    value={TaxCode.filter(
                                      (option) => option.value === "S2"
                                    )}
                                    menuPortalTarget={document.body}
                                    options={TaxCode} // Options to display in the dropdown
                                    onChange={(e) => {
                                      DocLinesDropDownOnChange22(
                                        e,
                                        index,
                                        "VatGroup"
                                      );
                                    }}
                                    displayValue="name" // Property name to display in the dropdown options
                                  />
                                )}
                              </div>
                            ) : (
                              <div style={{ width: "14rem" }}>
                                <Select
                                  placeholder="Select.."
                                  menuPortalTarget={document.body}
                                  options={TaxCode} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange22(
                                      e,
                                      index,
                                      "VatGroup"
                                    );
                                  }}
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              </div>
                            )}
                          </TD>
                          <TD>
                            <div style={{ width: "14rem", height: "auto" }}>
                              <input
                                type="number"
                                class="form-control"
                                id="Requesterid"
                                readOnly
                                aria-describedby="Requesterid"
                                value={item.TaxRate}
                                // {((item.TaxRate + item.PriceAfterVAT) * item.RequiredQuantity)}
                                name="TaxAmount_LC"
                              />
                            </div>
                          </TD>
                          <TD>
                            {" "}
                            {getautounitprice && getautounitprice[item.ItemCode]
                              ? Number(item.TaxRate) +
                                Number(
                                  getautounitprice &&
                                    getautounitprice[item.ItemCode].Price
                                )
                              : Number(item.TaxRate) +
                                Number(item.PriceAfterVAT)}
                          </TD>
                          <TD>
                            {" "}
                            {getautounitprice &&
                            getautounitprice[item.ItemCode] ? (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="Requesterid"
                                  readOnly
                                  aria-describedby="Requesterid"
                                  value={
                                    item.ItemCode
                                      ? getautounitprice &&
                                        getautounitprice[item.ItemCode].Price *
                                          item.RequiredQuantity
                                      : ""
                                  }
                                  name="Total_LC"
                                />
                              </div>
                            ) : (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="Requesterid"
                                  readOnly
                                  aria-describedby="Requesterid"
                                  value={item.ItemCode ? item.LineTotal : ""}
                                  name="Total_LC"
                                />
                              </div>
                            )}
                          </TD>
                          <TD>
                            {getautounitprice &&
                            getautounitprice[item.ItemCode] ? (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="Requesterid"
                                  aria-describedby="Requesterid"
                                  value={
                                    item.ItemCode
                                      ? getautounitprice &&
                                        getautounitprice[item.ItemCode].Price *
                                          item.RequiredQuantity
                                      : ""
                                  }
                                />
                              </div>
                            ) : (
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="Requesterid"
                                  aria-describedby="Requesterid"
                                  value={
                                    item.ItemCode
                                      ? item.PriceAfterVAT *
                                        item.RequiredQuantity
                                      : ""
                                  }
                                />
                              </div>
                            )}
                          </TD>
                          <TD>
                            <div style={{ width: "15em" }}>
                              {PrWhse && (
                                <Select
                                  value={PrWhse.filter(
                                    (option) =>
                                      option.value === item.WarehouseCode
                                  )}
                                  menuPortalTarget={document.body}
                                  placeholder="Select.."
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
                          <TD>
                            <div style={{ width: "15em" }}>
                              {PrProject && (
                                <Select
                                  value={PrProject.filter(
                                    (option) =>
                                      option.value === item.ProjectCode
                                  )}
                                  placeholder="Select.."
                                  menuPortalTarget={document.body}
                                  options={PrProject} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      index,
                                      "ProjectCode"
                                    );
                                  }}
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              )}
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: "15em" }}>
                              {PrBuyer && (
                                <Select
                                  value={PrBuyer.filter(
                                    (option) =>
                                      option.value === item.SalesPersonCode
                                  )}
                                  placeholder="Select.."
                                  menuPortalTarget={document.body}
                                  options={PrBuyer} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      index,
                                      "SalesPersonCode"
                                    );
                                  }}
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              )}
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: "14rem" }}>
                              {PrCost && (
                                <Select
                                  value={PrCost.filter(
                                    (option) =>
                                      option.value === item.CostingCode
                                  )}
                                  placeholder="Select.."
                                  menuPortalTarget={document.body}
                                  options={PrCost} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      index,
                                      "CostingCode"
                                    );
                                  }}
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              )}
                            </div>
                          </TD>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              ) : (
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
                    {PQDocumentLines &&
                      PQDocumentLines.map((item, index) => (
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
                                  ontextChanged(e, index);
                                }}
                              />
                            </div>
                            {item.FreeText}
                          </TD>
                          <TD>
                            <div style={{ width: "14rem", height: "auto" }}>
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
                          <TD>
                            <div style={{ width: "14rem", height: "auto" }}>
                              <input
                                type="date"
                                name="ShipDate"
                                readOnly="readOnly"
                                class="form-control"
                                defaultValue={item.ShipDate}
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
                                  options={PrWhse} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange2(
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
                                options={Frieght} // Options to display in the dropdown
                                displayValue="name" // Property name to display in the dropdown options
                              />
                            </div>
                          </TD>
                          <TD>
                            {/* {item.DocumentLineAdditionalExpenses[0].LineTotal?"":null} */}
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
            <Tab eventKey="Attachment" title="Attachment">
              <Attachment setattachmentresponse={setattachmentresponse} />
            </Tab>
          </Tabs>
          {/* Bottom Side+++++++++ */}
          <CardGroup>
            <DIV3>
              <Container fluid>
                <div style={{ width: "23.5rem", height: "auto" }}>
                  <label>Sales Employee</label>
                  <Select
                    placeholder={HeaderData && HeaderData.SalesPersonCode}
                    options={PrBuyer} // Options to display in the dropdown
                    onChange={(e) => setSaleEmployee(e.value)}
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <div style={{ width: "23.5rem", height: "auto" }}>
                  <label>Owner</label>
                  <Select
                    placeholder={HeaderData && HeaderData.DocumentsOwner}
                    options={PrOwner}
                    onChange={(e) => setSelectedOwner(e.value)} // Options to display in the dropdown
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <br />
                <div
                  class="form-group"
                  style={{ width: "23.5rem", height: "auto" }}
                >
                  <label for="exampleFormControlTextarea1">Remarks</label>
                  <textarea
                    class="form-control rounded-0"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    defaultValue={
                      HeaderData &&
                      HeaderData.Comments + ":" + HeaderData.DocEntry
                    }
                  />
                </div>
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
                      type="reset"
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
                <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
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
                              HeaderData.TotalDiscount +
                              HeaderData.VatSum)
                    }
                    class="form-control"
                  />
                </div>
                <label style={{ marginLeft: "3rem" }}>Discount</label>
                <CardGroup style={{ marginLeft: "3rem" }}>
                  <div style={{ width: "11.75rem" }}>
                    <input
                      type="number"
                      class="form-control"
                      defaultValue={0}
                      name="TaxAmount(LC)"
                      onChange={(e) => {
                        setdisc(e.target.value);
                        setDiscountTotal(
                          (e.target.value * totalbforeDiscount) / 100
                        );
                      }}
                      placeholder={
                        disc || (HeaderData && HeaderData.DiscountPercent)
                      }
                    />
                  </div>
                  <div style={{ width: "11.75rem" }}>
                    <input
                      type="number"
                      onChange={(e) => {
                        setDiscountTotal(e.target.value);
                        setdisc((e.target.value / totalbforeDiscount) * 100);
                      }}
                      class="form-control"
                      defaultValue={0}
                      name="DiscountTotal"
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
              <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                <label>Tax</label>
                <input
                  type="number"
                  class="form-control"
                  name="TaxAmount(LC)"
                  readOnly="readOnly"
                  defaultValue={
                    TotalTaxRate ||
                    (HeaderData &&
                      (HeaderData.DocTotalFc != 0
                        ? HeaderData.VatSumFc
                        : HeaderData.VatSum))
                  }
                />
              </div>
              <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                <label>Total Payment Due:</label>
                <input
                  type="text"
                  value={
                    totalbforeDiscount - DiscountTotal + TotalTaxRate ||
                    (HeaderData &&
                      (HeaderData.DocTotalFc != 0
                        ? HeaderData.DocTotalFc
                        : HeaderData.DocTotal))
                  }
                  placeholder=""
                  readOnly="readOnly"
                  class="form-control"
                />
              </div>
            </DIV3>
          </CardGroup>
        </>
      )}
    </>
  );
}
