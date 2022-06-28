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
import Switch from "react-switch";
import { MenuUp } from "react-bootstrap-icons";
import { MdDelete } from "react-icons/md";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Attachment } from "../../../Component/APDownPaymentRequest";
import { Logistics, Accounting } from "../../../Component/PurchaseOrder";
import { CONSTANTS, LINKS } from "../../../Utils";
import { Navbar } from "../../../Component/Global";
import { useAlert } from "react-alert";
import { input, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import "./index.css";

const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function PurchaseOrder() {
  const [getautounitprice, setgetautounitprice] = React.useState();
  const [bothbodies, setbothbodies] = React.useState(false);
  const [getseriesnumbring, setgetseriesnumbring] = React.useState();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const alert = useAlert();
  const [getcurrencycode, setgetcurrencycode] = React.useState();
  const [getcurrencyrate, setgetcurrencyrate] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [getDocDate, setgetDocDate] = React.useState();
  const [CurrencyDropdown, setCurrencyDropdown] = React.useState();
  const [update, setUpdate] = React.useState(1);
  const [getTaxDate, setgetTaxDate] = React.useState();
  const [getdefaultdata, setgetdefaultdata] = React.useState();
  const [CurrencyRateData, setCurrencyRateData] = React.useState();
  const [getdirectdoctype, setgetdirectdoctype] = React.useState("Direct");
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState();
  const [CommentsValue, setCommentsValue] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [TotalTaxRate, setTotalTaxRate] = React.useState(0);
  const classes = useStyles();
  const [DocStatus, setDocStatus] = React.useState();
  const [show, setShow] = React.useState(false);
  const [DueDate, setDueDate] = React.useState();
  const [gettablecontroller, setgettablecontroller] =
    React.useState("selectedItems");
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [OpenQty, setOpenQty] = React.useState();
  const [SelectedCP, setSelectedCP] = React.useState();
  const [Customer, setCustomer] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [ButtonName, setButtonName] = React.useState();
  const [getnumatcard, setgetnumatcard] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [SelectedOwner, setSelectedOwner] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [OwnerPrRe, setOwnerPrRe] = React.useState();
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [SaleEmployee, setSaleEmployee] = React.useState();
  const [DiscountTotal, setDiscountTotal] = React.useState(0);
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [totalFreight, setTotalFreight] = React.useState(0);
  const [disc, setdisc] = React.useState();
  const [ShipDate, setShipDate] = React.useState();
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
  const [getdocumentname, setgetdocumentname] = React.useState("RDR2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("17");
  const [ModuleName, setModuleName] = React.useState("Orders");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
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
    setgetdocumentname("RDR2");
    setModuleName("Orders");
    setgetdocumenttype("17");
    setButtonName("Add");
    setSearchNumber("0");
    compareDate();
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    // let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    // if (formcontroller) {
    //   formcontroller.forEach(async (element) => {
    //     if (element.U_FormId === "ORDR") {
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
    if (cook) getcurrencyratefunction(cook);
    getaddcurrencyfunction(cook);
    BusinessPartners(cook);
    getBatchQuantities(cook);
    GetItems(cook);
    Project(cook);
    CostCentre(cook);
    Buyer(cook);
    Owner(cook);
    defaultWhse(cook);
    // PurchaseQuotation(cook)
    OwnerPurchaseRequest(cook);
    Frieght1(cook);
    TableTaxCode(cook);
  }, []);
  // ---------- Ctrl + F function -------------
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
  const getBatchQuantities = async (cook) => {
    let sapAPi = `SQLQueries('UDFBagShape')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        UDFBagShape(cook);
      })
      .catch({});
  };
  const getaddcurrencyfunction = async (cook) => {
    let sapAPi = `SQLQueries('currencyrate')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setCurrencyRateData(res.data.value);
      })
      .catch({});
  };
  const getcurrencyratefunction = async (cook) => {
    let body = {
      SqlCode: "currencyrate",
      SqlName: "currencyrate",
      SqlText: "Select RateDate, Currency, Rate, UserSign From ORTT",
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
  const Currencies = async (e) => {
    let cook = await localStorage.getItem("cookie");
    const api = `${LINKS.api}/GetApi`;
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    if (e.item.Currency === "##") {
      let SAPapi = `Currencies?$select=Code,Name,DocumentsCode`;
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
                value: element.Code,
                label: element.Code + " : " + element.Name,
              });
            });
            setCurrencyDropdown(ItemsDropDown);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (e.item.Currency !== "##") {
      let SAPapi = `Currencies?$select=Code,Name,DocumentsCode &$filter=Code eq '${e.item.Currency}'`;
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
                value: element.Code,
                label: element.Code + " : " + element.Name,
              });
            });
            setCurrencyDropdown(ItemsDropDown);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let SAPapi = `Currencies?$select=Code,Name,DocumentsCode`;
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
                value: element.Code,
                label: element.Code + " : " + element.Name,
              });
            });
            setCurrencyDropdown(ItemsDropDown);
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
    setDueDate(year + "-" + month + "-" + day);
    setgetDocDate(year + "-" + month + "-" + day);
    setgetTaxDate(year + "-" + month + "-" + day);
  };
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `Orders(${id})`,
          cookie: cook,
        })
        .then(function (res) {
          console.log(res);
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
  const UDFBagShape = async (cook) => {
    let body = {
      SqlCode: "UDFBagShape",
      SqlName: "UDFBagShape",
      SqlText: `Select FldValue, Descr From UFD1 Where TableID = 'ORDR' and FieldID = 12`,
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
              label: element.CardCode + ":" + element.CardName,
              item: element,
            });
          });
          setVendorCodeDropdown(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const ContactPerson = async (CustomerName) => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq '${CustomerName}'`;
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
          BarCode: element.BarCode,
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
  const DocTypeChange = (e) => {
    if (e.value === "Direct") {
      setgettablecontroller("selectedItems");
      setgetcopyfromdoctype();
      setgetdirectdoctype("Direct");
    } else if (e.value === "CopyFrom") {
      setSelectedItems(null);
      setgetdirectdoctype();
      setgetcopyfromdoctype("CopyFrom");
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
  const ShipDateChange = (e, index, PrReIndex) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index]["ShipDate"] = e.target.value;
    setShipDate(itemDetail);
  };
  const SearchShipDateChange = (e, index) => {
    let itemDetail = PQDocumentLines;
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
  const SearchonPriceschnage = (e, index) => {
    let obj = SearchDocumentLines;
    console.log("SearchDocumentLines", SearchDocumentLines);
    obj[index][e.target.name] = e.target.value;
    obj[index]["Price"] =
      obj[index]["UnitPrice"] -
      (obj[index]["UnitPrice"] * obj[index]["DiscountPercent"]) / 100;
    obj[index]["LineTotal"] = obj[index].Price * obj[index].Quantity;
    obj[index]["TaxTotal"] = obj[index].VatGroupRate
      ? obj[index].LineTotal * (obj[index].VatGroupRate / 100)
      : obj[index].TaxTotal;
    obj[index]["GrossTotal"] =
      obj[index].Price * obj[index].Quantity + obj[index].TaxTotal;
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    obj.forEach((element) => {
      sum = sum + element.LineTotal;
      sum1 = sum1 + element.TaxTotal;
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
    setSelectedItems(obj);
    console.log("object", obj);
    setSearchDocumentLines(obj);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `Quotations?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${Customer}'`;
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
    setgettablecontroller("SearchDocumentLines");
    localStorage.setItem("getDocEntry", item.DocEntry);
    if (item.DocumentStatus === "bost_Open") {
      setDocStatus("Open");
      setButtonName("Update");
    } else {
      setDocStatus("Close");
      setButtonName("Update");
    }
    setSearchDocumentLines(item.DocumentLines);
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
      let sapAPi = `Orders?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum desc`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `Orders?$orderby=DocNum desc`;
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
    let sapAPi = `Orders?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setgettablecontroller("SearchDocumentLines");
        setHeaderData(res.data.value[0]);
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        if (res.data.value[0].DocumentStatus === "bost_Open") {
          setDocStatus("Open");
        } else {
          setDocStatus("Close");
        }
        // let sum = 0
        //   res.data.value[0].DocumentLines.forEach(item => {
        //    sum = sum + item.LineTotal
        //   })
        //   setTotalbforeDiscount(sum)
        setSearchDocumentLines(res.data.value[0].DocumentLines);
        if (HeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});
  };
  const DocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = selectedItems;
    itemDetail[index][name] = selectedItem.value;
    itemDetail["update"] = update + 1;
    setUpdate(update + 1);
    setSelectedItems(itemDetail);
  };
  const VendorChange = (e) => {
    setgetdefaultdata(e);
    setCustomer(e.value);
    ContactPerson(e.value);
  };
  const submitPatchOrders = async () => {
    let DocLines = [];
    let body = PRBody;
    SearchDocumentLines.forEach((element) => {
      DocLines.push({
        UnitPrice: element.UnitPrice,
        Quantity: element.Quantity,
        FreeText: element.FreeText,
        DiscountPercent: element.DiscountPercent,
        VatGroup: element.VatGroup,
        WarehouseCode: element.WarehouseCode,
        CostingCode: element.CostingCode,
        ProjectCode: element.ProjectCode,
        SalesPersonCode: element.SalesPersonCode,
      });
    });
    body["Comments"] = CommentsValue;
    body["DocumentLines"] = DocLines;
    body["AttachmentEntry"] = attachmentresponse;
    console.log(body);
    Patch(HeaderData.DocEntry, body);
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitO();
    } else if (ButtonName != "Add") {
      submitPatchOrders();
    }
  };
  const submitO = async () => {
    var filtered = selectedItems.filter(function (el) {
      return el != null || el != [];
    });
    let DocLines = [];
    let body = PRBody;
    if (getdirectdoctype === "Direct") {
      filtered.forEach((element) => {
        if (element.ItemCode) {
          DocLines.push({
            ItemCode: element.ItemCode,
            FreeText: element.FreeText,
            Quantity: element.RequiredQuantity,
            RequiredDate: element.RequiredDate,
            DiscountPercent: element.DiscountPercent,
            VatGroup: element.VatGroup === undefined ? "S2" : element.VatGroup,
            WarehouseCode: element.WarehouseCode,
            CostingCode: element.CostingCode,
            ProjectCode: element.ProjectCode,
            SalesPersonCode: element.SalesPersonCode,
            UnitPrice: element.UnitPrice,
            // "DistributeExpense": "tYES",
            // "DocumentLineAdditionalExpenses": [
            //     {
            //         "ExpenseCode": 1,
            //         "LineTotal":element.TotalFreight
            //     }
            // ],
          });
        }
      });
      body["SendNotification"] = "tNO";
      body["DocDueDate"] = DueDate;
      body["DocDate"] = getDocDate;
      body["TaxDate"] = getTaxDate;
      body["Comments"] = CommentsValue;
      body["DocumentLines"] = DocLines;
      body["U_CreatedBy"] = "Web UI";
      body["NumAtCard"] = getnumatcard;
      body["CardCode"] = Customer;
      body["Series"] = getseriesvalue;
      body["SalesPersonCode"] = SaleEmployee;
      body["DocumentsOwner"] = SelectedOwner;
      body["DiscountPercent"] = disc;
      body["AttachmentEntry"] = attachmentresponse;
      body["DocCurrency"] = getcurrencycode;
      body["DocRate"] = getcurrencycode === "PKR" ? 1 : getcurrencyrate;
    } else {
      PQDocumentLines.forEach((element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((element) => {
            if (element.isSelected && element.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: element.DocEntry,
                BaseType: 23,
                ItemCode: element.ItemCode,
                BaseLine: element.LineNum,
                Quantity: element.Quantity,
              });
              body["DocDueDate"] = DueDate;
              body["DocDate"] = getDocDate;
              body["U_CreatedBy"] = "Web UI";
              body["TaxDate"] = getTaxDate;
              body["DocumentLines"] = DocLines;
              body["CardCode"] = Customer;
              body["Comments"] = CommentsValue;
              body["Series"] = getseriesvalue;
              body["SalesPersonCode"] = SaleEmployee;
              body["DocumentsOwner"] = SelectedOwner;
              body["NumAtCard"] = getnumatcard;
              body["DiscountPercent"] = disc;
              body["AttachmentEntry"] = attachmentresponse;
              body["DocCurrency"] = getcurrencycode ? getcurrencycode : "PKR";
              body["DocRate"] = getcurrencycode === "PKR" ? 1 : getcurrencyrate;
            }
          });
        }
      });
    }
    // console.log(JSON.stringify(body));
    // console.log(body);
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
          api: LINKS.sap.Sales.PostOrders,
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
          api: LINKS.sap.Sales.PostOrders,
          cookie: cook,
        })
        .then(async function (res) {
          if (res.data.DocNum) {
            await PostInFirstDB(body);
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

  const handleClosee = () => setModalOne(false);
  const handleCloseee = () => setModalTwo(false);

  const handleShowModalTwo = () => {
    setModalTwo("modal-two");
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
    setgettablecontroller("PQDocumentLines");
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
  const netTotalFunc = (e, index, PrReIndex, item) => {
    let doclines = PQDocumentLines;
    const value = e.target.value;
    doclines[PrReIndex].DocumentLines[index]["PriceBeforeVat"] =
      doclines[PrReIndex].DocumentLines[index].UnitPrice *
      doclines[PrReIndex].DocumentLines[index].Quantity;

    setPQDocumentLines(doclines);
    let sum = 0;
    let sum1 = 0;
    PQDocumentLines.forEach((element) => {
      if (element.isSelected) {
        element.DocumentLines.forEach((item) => {
          if (item.isSelected && item.LineStatus === "bost_Open") {
            sum = sum + item.PriceBeforeVat;
          }
          setTotalbforeDiscount(sum);
        });
      }
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
          setTotalbforeDiscount(sum);
          setTotalTaxRate(sum1);
        });
      }
    });
  };
  const testing = (e, index) => {
    let obj = selectedItems;
    obj[index][e.target.name] = e.target.value;
    obj[index]["PriceAfterVAT"] =
      getautounitprice && getautounitprice[obj[index]["ItemCode"]].Price;
    // obj[index]["DiscountPercent"] =
    //   getautounitprice &&
    //   getautounitprice[obj[index]["ItemCode"]].DiscountPercent;
    obj[index]["LineTotal"] =
      getautounitprice &&
      getautounitprice[obj[index]["ItemCode"]].Price *
        Number(obj[index].RequiredQuantity);
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0;
    obj.forEach((element) => {
      if (element.ItemCode) {
        sum = sum + element.LineTotal;
      }
    });
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setTotalbforeDiscount(sum);
    setSelectedItems(obj);
  };
  const itemsChange = (e, index) => {
    let obj = selectedItems;
    obj[index][e.target.name] = e.target.value;
    obj[index]["PriceAfterVAT"] = Number(obj[index]["UnitPrice"]);
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
      }
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
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
      sum = sum + element.LineTotal;
      sum1 = sum1 + element.TaxRate;
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
    setTotalFreight(sum2);
    setSelectedItems(obj);
  };
  const DocLinesDropDownOnChange22 = (selectedItem, index, name) => {
    let obj = selectedItems;
    obj[index]["VatGroup"] = selectedItem.value;
    //  itemDetail[item]['TaxAmount'] = itemDetail[item].PriceAfterVAT * (selectedItem.item.VatGroups_Lines[0].Rate / 100)
    obj[index]["TaxRate"] =
      obj[index].PriceAfterVAT *
      (selectedItem.item.VatGroups_Lines[0].Rate / 100);
    obj[index]["LineTotal"] =
      obj[index].PriceAfterVAT * obj[index].RequiredQuantity;
    obj[index]["TaxAmount_LC"] =
      obj[index].LineTotal * (selectedItem.item.VatGroups_Lines[0].Rate / 100);
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    obj.forEach((element) => {
      if (element.ItemCode) {
        sum = sum + element.LineTotal;
        sum1 = sum1 + element.TaxAmount_LC;
      }
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setSelectedItems(obj);
  };
  const SearchDropDownOnChange = (selectedItem, index, name) => {
    let obj = SearchDocumentLines;
    obj[index][name] = selectedItem.value;
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    console.log(obj);
    setSearchDocumentLines(obj);
  };
  const SearchDropDownOnChange22 = (selectedItem, index, name) => {
    let obj = SearchDocumentLines;
    console.log("SearchDocumentLines", SearchDocumentLines);
    obj[index]["VatGroup"] = selectedItem.value;
    obj[index]["VatGroupRate"] = selectedItem.item.VatGroups_Lines[0].Rate;
    //  itemDetail[item]['TaxAmount'] = itemDetail[item].PriceAfterVAT * (selectedItem.item.VatGroups_Lines[0].Rate / 100)
    obj[index]["TaxRate"] =
      obj[index].Price * (selectedItem.item.VatGroups_Lines[0].Rate / 100);
    obj[index]["LineTotal"] = obj[index].Price * obj[index].Quantity;
    obj[index]["TaxTotal"] =
      obj[index].LineTotal * (selectedItem.item.VatGroups_Lines[0].Rate / 100);
    obj[index]["GrossTotal"] =
      obj[index].Price * obj[index].Quantity + obj[index].TaxTotal;
    let sum = 0;
    let sum1 = 0;
    let sum2 = 0;
    obj.forEach((element) => {
      if (element.ItemCode) {
        sum = sum + element.LineTotal;
        sum1 = sum1 + element.TaxTotal;
        sum2 = sum2 + element.Freight;
      }
    });
    setTotalbforeDiscount(sum);
    setTotalTaxRate(sum1);
    setTotalFreight(sum2);
    obj[index][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    console.log(obj);
    setSearchDocumentLines(obj);
  };
  const discountFormula = (e, index) => {
    let obj = selectedItems;
    obj[index][e.target.name] = e.target.value;
    setSelectedItems(obj);
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
  const currencychanger = (e) => {
    let str = getDocDate;
    let stringToAdd = str.replace("-", "");
    let str2 = stringToAdd.replace("-", "");
    CurrencyRateData.forEach((item) => {
      if (item.Currency === e.value && str2 >= item.RateDate) {
        setgetcurrencyrate(item.Rate);
      }
    });
    setgetcurrencycode(e.value);
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
          <h1 style={{ textAlign: "center" }}>Sales Order</h1>
          <Form onSubmit={handleSubmitted}>
            <CardGroup>
              <DIV3>
                <Container fluid>
                  <label>Doc Type</label>
                  <div
                    style={{ width: "23.5rem", height: "auto" }}
                    variant="primary"
                  >
                    <Select
                      placeholder={
                        HeaderData && HeaderData.DocType
                          ? HeaderData && HeaderData.DocType
                          : "Direct"
                      }
                      options={[
                        { label: "Direct", value: "Direct" },
                        { label: "Copy From", value: "CopyFrom" },
                      ]} // Options to display in the dropdown
                      onChange={(e) => {
                        DocTypeChange(e);
                      }}
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <label>Customer</label>
                  <div
                    style={{ width: "23.5rem", height: "auto" }}
                    variant="primary"
                  >
                    <Select
                      placeholder={
                        HeaderData &&
                        HeaderData.CardCode + " : " + HeaderData &&
                        HeaderData.CardName
                      }
                      options={VendorCodeDropdown} // Options to display in the dropdown
                      onChange={(e) => {
                        getUnitPricesfromCardcode(e.value);
                        Currencies(e);
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
                  >
                    <Select
                      placeholder={HeaderData && HeaderData.ContactPersonCode}
                      options={ContactPersonDropdown} // Options to display in the dropdown
                      displayValue="name" // Property name to display in the dropdown options
                      onChange={(e) => {
                        CPChange(e.value);
                      }}
                    />
                  </div>
                  <br />
                  {getcopyfromdoctype ? (
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
                        Open Quotations List
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
                        Open Quotations List
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
                            <th>Delivery Date</th>
                            <th>Whse</th>
                            <th>Unit Price</th>
                            <th>Project</th>
                            {/* <th>Buyer</th> */}
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
                                              value={item.ShipDate}
                                            />
                                          </div>
                                        </TD>
                                        <TD>
                                          <div style={{ width: "15em" }}>
                                            {PrWhse && (
                                              <Select
                                                value={PrWhse.filter(
                                                  (option) =>
                                                    option.value ===
                                                    item.WarehouseCode
                                                )}
                                                menuPortalTarget={document.body}
                                                placeholder="Select.."
                                                options={PrWhse}
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
                                              displayValue="name"
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
                  <Modal
                    show={show1}
                    className="Modal-big"
                    size="lg"
                    onHide={handleClose2}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Orders List</Modal.Title>
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
                    <label>Customer PO No.</label>
                    <input
                      defaultValue={HeaderData && HeaderData.NumAtCard}
                      type="text"
                      class="form-control"
                      onChange={(e) => {
                        setgetnumatcard(e.target.value);
                      }}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder={HeaderData && HeaderData.NumAtCard}
                    ></input>
                  </div>
                  <label>Currency</label>
                  <div
                    style={{ width: "23.5rem", height: "auto" }}
                    variant="primary"
                  >
                    <Select
                      isDisabled={CurrencyRateData ? false : true}
                      placeholder={HeaderData && HeaderData.DocCurrency}
                      options={CurrencyDropdown} // Options to display in the dropdown
                      displayValue="name" // Property name to display in the dropdown options
                      onChange={(e) => {
                        currencychanger(e);
                      }}
                    />
                  </div>
                  <label>Exchange Rate</label>
                  <div
                    style={{ width: "23.5rem", height: "auto" }}
                    variant="primary"
                  >
                    <input
                      defaultValue={
                        getcurrencycode === "PKR"
                          ? 1
                          : getcurrencyrate ||
                            (HeaderData && HeaderData.DocRate)
                      }
                      type="number"
                      class="form-control"
                      id="exampleInputEmail1"
                      onChange={(e) => {
                        setgetcurrencyrate(e.target.value);
                      }}
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                  </div>
                  <br />
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
                          name="DocNum"
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
                      ]}
                      onChange={(e) => {
                        setgetdocumentstatus(e.value);
                      }}
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <br />
                  <div
                    className="sales"
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
                      <svg class="svg-icon5" viewBox="0 0 20 20">
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
                  <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                    <label> Posting Date</label>
                    <input
                      type="date"
                      name="DocDate"
                      class="form-control"
                      onChange={(e) => {
                        setgetDocDate(e.target.value);
                      }}
                      defaultValue={
                        HeaderData && HeaderData.DocDate
                          ? HeaderData && HeaderData.DocDate
                          : getDocDate
                      }
                    />
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                    <label>Delivery Date</label>
                    <input
                      class="form-control"
                      aria-describedby="emailHelp"
                      type="date"
                      name="TaxDate"
                      defaultValue={
                        HeaderData && HeaderData.DocDueDate
                          ? HeaderData && HeaderData.DocDueDate
                          : DueDate
                      }
                      onChange={(e) => {
                        setDueDate(e.target.value);
                      }}
                    />
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                    <label>Document Date</label>
                    <input
                      type="date"
                      name="TaxDate"
                      class="form-control"
                      defaultValue={
                        HeaderData && HeaderData.TaxDate
                          ? HeaderData && HeaderData.TaxDate
                          : getTaxDate
                      }
                      onChange={(e) => {
                        setgetTaxDate(e.target.value);
                      }}
                    />
                  </div>
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
                {gettablecontroller === "selectedItems" ? (
                  <Table responsive striped bordered hover>
                    {Array.isArray(selectedItems) &&
                    selectedItems.length > 0 ? (
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Bar Code</th>
                          <th>Item No.</th>
                          <th>Item Description</th>
                          <th>UoM Name</th>
                          <th>Free Text</th>
                          <th>Requried Qty</th>
                          {/* <th>Requried Date</th>
                          <th>Quoted Qty</th> */}
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
                            <TD>{item.BarCode}</TD>
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
                            {/* <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="date"
                                  name="RequiredDate"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  value={
                                    item.RequiredDate
                                      ? item.RequiredDate
                                      : DueDate
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
                            </TD> */}
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
                                    // value={
                                    //   item.ItemCode
                                    //     ? getautounitprice &&
                                    //       getautounitprice[item.ItemCode]
                                    //         .DiscountPercent
                                    //     : ""
                                    // }
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
                                    placeholder="Select"
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
                                  value={item.TaxAmount_LC}
                                  // {((item.TaxRate + item.PriceAfterVAT) * item.RequiredQuantity)}
                                  name="TaxAmount_LC"
                                />
                              </div>
                            </TD>
                            <TD>
                              {" "}
                              {getautounitprice &&
                              getautounitprice[item.ItemCode]
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
                                          getautounitprice[item.ItemCode]
                                            .Price * item.RequiredQuantity
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
                                          getautounitprice[item.ItemCode]
                                            .Price *
                                            item.RequiredQuantity +
                                            Number(item.TaxAmount_LC)
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
                                            item.RequiredQuantity +
                                          item.TaxAmount_LC
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
                ) : gettablecontroller === "PQDocumentLines" ? (
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
                                            ShipDateChange(e, index, PrReIndex);
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
                                        {PrWhse && (
                                          <Select
                                            value={PrWhse.filter(
                                              (option) =>
                                                option.value ===
                                                item.WarehouseCode
                                            )}
                                            menuPortalTarget={document.body}
                                            placeholder="Select.."
                                            options={PrWhse}
                                            displayValue="name" // Property name to display in the dropdown options
                                          />
                                        )}
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
                                          type="text"
                                          name="UnitPrice"
                                          class="form-control"
                                          aria-describedby="Requesterid"
                                          defaultValue={item.UnitPrice}
                                          onChange={(e) => {
                                            netTotalFunc(
                                              e,
                                              index,
                                              PrReIndex,
                                              item
                                            );
                                          }}
                                        />
                                      </div>
                                    </TD>
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
                                      {/* {0 ||item.DocumentLineAdditionalExpenses[0].LineTotal} */}
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
                                )
                            )
                        )}
                    </tbody>
                  </Table>
                ) : gettablecontroller === "SearchDocumentLines" ? (
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
                          {/* <th>Open Qty</th> */}
                          <th>Whse</th>
                          <th>Unit Price</th>
                          <th>Discount</th>
                          <th>Price after Discount</th>
                          <th>Tax Code</th>
                          <th>Tax Amount(LC)</th>
                          <th>Gross Price After Disc.</th>
                          {/* <th>Freight 1</th>
                      <th>Freight 1 (LC)</th> */}
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
                                  placeholder={item.FreeText}
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
                                  onChange={(e) => {
                                    SearchonPriceschnage(e, index);
                                  }}
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  defaultValue={item.Quantity}
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
                                  value={item.ShipDate}
                                />
                              </div>
                            </TD>
                            {/* <TD>{item.RemainingOpenQuantity || OpenQty} </TD> */}
                            <TD>
                              <div style={{ width: "15em" }}>
                                {PrWhse && (
                                  <Select
                                    value={PrWhse.filter(
                                      (option) =>
                                        option.value === item.WarehouseCode
                                    )}
                                    onChange={(e) => {
                                      SearchDropDownOnChange(
                                        e,
                                        index,
                                        "WarehouseCode"
                                      );
                                    }}
                                    menuPortalTarget={document.body}
                                    placeholder="Select.."
                                    options={PrWhse} // Options to display in the dropdown
                                    displayValue="name" // Property name to display in the dropdown options
                                  />
                                )}
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  name="UnitPrice"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  defaultValue={item.UnitPrice}
                                  onChange={(e) => {
                                    SearchonPriceschnage(e, index);
                                  }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  name="DiscountPercent"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  defaultValue={item.DiscountPercent}
                                  onChange={(e) => {
                                    SearchonPriceschnage(e, index);
                                  }}
                                />
                              </div>
                            </TD>
                            <TD>{item.Price}</TD>
                            <TD>
                              <div style={{ width: "14rem" }}>
                                {TaxCode && (
                                  <Select
                                    value={TaxCode.filter(
                                      (option) => option.value === item.VatGroup
                                    )}
                                    onChange={(e) => {
                                      SearchDropDownOnChange22(
                                        e,
                                        index,
                                        "VatGroup"
                                      );
                                    }}
                                    menuPortalTarget={document.body}
                                    placeholder="Select"
                                    options={TaxCode} // Options to display in the dropdown
                                    displayValue="name" // Property name to display in the dropdown options
                                  />
                                )}
                              </div>
                            </TD>
                            <TD>{item.TaxTotal}</TD>
                            <TD>{item.GrossTotalSC}</TD>
                            {/* <TD>
                          <div style={{ width: "14rem" }}>
                            <Select
                              menuPortalTarget={document.body}
                              options={Frieght}
                              displayValue="name"
                            />
                          </div>
                        </TD>
                        <TD>
                          {0 ||item.DocumentLineAdditionalExpenses[0].LineTotal}
                        </TD> */}
                            <TD>{item.LineTotal}</TD>
                            <TD>{item.GrossTotal}</TD>
                            <TD>
                              <div style={{ width: "14rem" }}>
                                {PrProject && (
                                  <Select
                                    value={PrProject.filter(
                                      (option) =>
                                        option.value === item.ProjectCode
                                    )}
                                    onChange={(e) => {
                                      SearchDropDownOnChange(
                                        e,
                                        index,
                                        "ProjectCode"
                                      );
                                    }}
                                    menuPortalTarget={document.body}
                                    options={PrProject} // Options to display in the dropdown
                                    displayValue="name" // Property name to display in the dropdown options
                                  />
                                )}
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem" }}>
                                {PrBuyer && (
                                  <Select
                                    value={PrBuyer.filter(
                                      (option) =>
                                        option.value === item.SalesPersonCode
                                    )}
                                    onChange={(e) => {
                                      SearchDropDownOnChange(
                                        e,
                                        index,
                                        "SalesPersonCode"
                                      );
                                    }}
                                    menuPortalTarget={document.body}
                                    options={PrBuyer} // Options to display in the dropdown
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
                                    onChange={(e) => {
                                      SearchDropDownOnChange(
                                        e,
                                        index,
                                        "CostingCode"
                                      );
                                    }}
                                    menuPortalTarget={document.body}
                                    options={PrCost} // Options to display in the dropdown
                                    displayValue="name" // Property name to display in the dropdown options
                                  />
                                )}
                              </div>
                            </TD>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : null}
              </Tab>
              <Tab eventKey="Logistics" title="Logistics">
                <Logistics getdefaultdata={getdefaultdata} />
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
                      options={PrOwner}
                      placeholder={HeaderData && HeaderData.DocumentsOwner}
                      onChange={(e) => setSelectedOwner(e.value)} // Options to display in the dropdown
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <br />
                  <div
                    class="form-group"
                    style={{ width: "23.5em", height: "auto" }}
                  >
                    <label for="exampleFormControlTextarea1">Remarks</label>
                    <textarea
                      onChange={(e) => {
                        setCommentsValue(e.target.value);
                      }}
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
                      type="text"
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
          </Form>
        </>
      )}
    </>
  );
}
