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
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import { Logistics, Accounting } from "../../../Component/PurchaseOrder";
import { CONSTANTS, LINKS } from "../../../Utils";
import { Navbar } from "../../../Component/Global";
import { useAlert, withAlert } from "react-alert";
import { input, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import "./index.css";
import { useSelector } from "react-redux";


const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function PurchaseOrder() {
  const redux_response = useSelector((state) => state.colorReducer);

  const alert = useAlert();
  const [getpurchaseordersdocentry, setgetpurchaseordersdocentry] =
    React.useState();
  const [SelectShow, setSelectShow] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [show3, setShow3] = React.useState(false);
  const [getseriesnumbring, setgetseriesnumbring] = React.useState();
  const [BatchNumbersData, setBatchNumbersData] = React.useState();
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const [getbatchnumbers, setgetbatchnumbers] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [DueDate, setDueDate] = React.useState();
  const [UpdatePurchaseRequest, setUpdatePurchaseRequest] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [valuechacker, setvaluechacker] = React.useState();
  const [getvaluefromtable, setgetvaluefromtable] = React.useState();
  const [OpenQty, setOpenQty] = React.useState();
  const [SelectedCP, setSelectedCP] = React.useState();
  const [SaleEmployee, setSaleEmployee] = React.useState();

  const [Customer, setCustomer] = React.useState();
  const [SearchPR, setSearchPR] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();

  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [ButtonName, setButtonName] = React.useState();
  const [SelectedVendor, setSelectedVendor] = React.useState();

  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [getautoseries, setgetautoseries] = React.useState();
  const [SelectedItems, setSelectedItems] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [DelDate, setDelDate] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [gettaxtotal, setgettaxtotal] = React.useState();
  const [getnetTotal, setgetnetTotal] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();

  const [SearchNumber, setSearchNumber] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [DocStatus, setDocStatus] = React.useState();
  const [PrOwner, setPrOwner] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [TodayDate, setTodayDate] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [CommentsValue, setCommentsValue] = React.useState();
  const [PrRe, setPrRe] = React.useState();
  const [OwnerPrRe, setOwnerPrRe] = React.useState();
  const [Disply, setDisply] = React.useState(false);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState();
  const [CP, setCP] = React.useState();
  const [GN, setGN] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Discount, setDiscount] = React.useState();
  const [Tax, setTax] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [getDocDate, setgetDocDate] = React.useState();
  const [getTaxDate, setgetTaxDate] = React.useState();
  const [total, setTotal] = React.useState();
  const [TotalGross, setTotalGross] = React.useState();
  const [BottomTax, setBottomTax] = React.useState();
  const [BottomDiscount, setBottomDiscount] = React.useState();
  const [TotalPayment, setTotalPayment] = React.useState();
  const [DiscountTotal, setDiscountTotal] = React.useState();
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [totalFreight, setTotalFreight] = React.useState();
  const [disc, setdisc] = React.useState();
  const [ShipDate, setShipDate] = React.useState();
  const [SelectedOwner, setSelectedOwner] = React.useState();
  const [Total_LC, setTotal_LC] = React.useState();
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
  const [getdocumentname, setgetdocumentname] = React.useState("DLN2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("15");
  const [ModuleName, setModuleName] = React.useState("Delivery");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [seletedBatchnumber, setseletedBatchnumber] = React.useState();
  const [seletedBatchnumber2, setseletedBatchnumber2] = React.useState([]);
  const [BatchNumberQuantityData, setBatchNumberQuantityData] =
    React.useState();
  const [bothbodies, setbothbodies] = React.useState(false);
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
    setgetdocumentname("DLN2");
    setModuleName("Delivery");
    setgetdocumenttype("15");
    setButtonName("Add");
    setSearchNumber("0");
    compareDate();
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    // let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    // if (formcontroller) {
    //   formcontroller.forEach(async (element) => {
    //     if (element.U_FormId === "ODLN") {
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
    getBatchQuantities(cook);
    getBatchNumbersfromAPI(cook);
    BatchNo(cook);
    GetItems(cook);
    Project(cook);
    CostCentre(cook);
    BusinessPartners(cook);
    Buyer(cook);
    Owner(cook);
    defaultWhse(cook);
    OwnerPurchaseRequest(cook);
    Frieght1(cook);
    TableTaxCode(cook);
  }, []);
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
        .then(function (res) {})
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
        api: `Orders?$select=DocEntry,DocNum`,
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getBatchQuantities = async (cook) => {
    let sapAPi = `SQLQueries('BatchNoQuantities')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("getBatchQuantities", res.data.value);
        setBatchNumberQuantityData(res.data.value);
      })
      .catch({});
  };
  const getBatchNumbersfromAPI = async (cook) => {
    let sapAPi = `SQLQueries('BatchNo')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("getBatchNumbersfromAPI", res.data.value);
        setBatchNumbersData(res.data.value);
      })
      .catch({});
  };
  const modalshow = (item, index) => {
    let Batchlines = [];
    PQDocumentLines.forEach((element) => {
      console.log("element", element);
      if (element.isSelected) {
        element.DocumentLines.forEach((item2) => {
          BatchNumberQuantityData.forEach((docElement) => {
            // if(item2.ItemCode === docElement.ItemCode){
            if (
              item2.ItemCode === docElement.ItemCode &&
              item2.WarehouseCode === docElement.WhsCode
            ) {
              console.log("docElement", docElement);
              Batchlines.push({
                BaseLineNumber: index,
                AbsEntry: docElement.AbsEntry,
                ItemCode: docElement.ItemCode,
                MdAbsEntry: docElement.MdAbsEntry,
                Quantity: docElement.Quantity,
                SysNumber: docElement.SysNumber,
                WhsCode: docElement.WhsCode,
              });
              console.log("Batchlines", Batchlines);
              whsecodematching(Batchlines, item);
            }
          });
        });
      }
    });
  };
  const whsecodematching = async (Batchlines, item) => {
    console.log("BatchNumbersData", BatchNumbersData);
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
          console.log("whsecodematching", Batchlines2);
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
        console.log("itemcodematching", docline);
        setseletedBatchnumber(docline);
        setShow3(true);
      }
    });
  };
  const getvaluefrombatchtable = (e, index, PrReIndex) => {
    let itemDetail = seletedBatchnumber;
    itemDetail[index][e.target.name] = e.target.value;
    setseletedBatchnumber(itemDetail);
    // itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value
    // setTimeout(function () {
    //   getfinalvaluefromtable(itemDetail);
    // }, 4000);
  };
  const getfinalvaluefromtable = () => {
    let itemDetail = seletedBatchnumber;
    setseletedBatchnumber2([...seletedBatchnumber2, itemDetail]);
    setvaluechacker(itemDetail);
    handleClose3();
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
          api: `DeliveryNotes(${id})`,
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

  const DocDueDateChange = async (e) => {
    setDueDate(e.target.value);
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
  const ContactPerson = async (getcustomer) => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    // let SAPapi = `sml.svc/ACTIVECONTACTPERSON?$filter=CardCode eq '${Customer}' &$orderby=CntctCode`;
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq '${getcustomer}'`;
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
  const handleClose3 = () => {
    setShow3(false);
  };
  // const modalshow = (item) =>{
  //   setgetvaluefromtable(item.ItemCode)
  //    setShow3(true)
  //  }
  const ShipDateChange = (e, index, PrReIndex) => {
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
    let SAPapi = `Orders?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${Customer}' and startswith(DocNum,'${getseriesnumbring}')`;
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie,
      })
      .then(function (res) {
        console.log(res);
        setPrRe(res.data.value);
      })
      .catch({});
    setShow(true);
  };
  const selectPR = async (item) => {
    setShow(false);
    setHeaderData(item);
    console.log(item.DocEntry);
    await localStorage.setItem("getDocEntry", item.DocEntry);
    if (item.DocumentStatus === "bost_Open") {
      setDocStatus("Open");
      setButtonName("Update");
    } else {
      setDocStatus("Close");
      setButtonName("Update");
    }
    setSearchDocumentLines(item.DocumentLines);
    console.log(item.DocumentLines);
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
      let sapAPi = `DeliveryNotes?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum `;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `DeliveryNotes?$orderby=DocNum `;
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
    let sapAPi = `DeliveryNotes?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(async function (res) {
        console.log(res.data.value[0]);
        setHeaderData(res.data.value[0]);
        await localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
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
      })
      .catch({});
  };
  const DocLinesDropDownOnChange = (selectedItem, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value;
    setPQDocumentLines(itemDetail);
  };
  const Home = () => {
    const alert = useAlert();
  };
  const VendorChange = (e) => {
    setCustomer(e.value);
    ContactPerson(e.value);
  };
  const OpenQtyFunction = (e, index, PrReIndex) => {
    let doclines = PQDocumentLines;
    const value = e.target.value;
    doclines[PrReIndex].DocumentLines[index][e.target.name] = value;
    setPQDocumentLines(doclines);
  };
  const submitPatchDelivery = async () => {
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
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitDelivery();
    } else if (ButtonName != "Add") {
      submitPatchDelivery();
    }
  };
  const submitDelivery = async () => {
    console.log("valuechacker", valuechacker);
    let DocLines = [];
    let SecondDB = [];
    let docLines2 = [];
    let docLines3 = [];
    let body = PRBody;
    let body2 = {};
    console.log("seletedBatchnumber2", seletedBatchnumber2);
    var filtered = seletedBatchnumber2.filter(function (el) {
      return (el == el.length) == 0;
    });
    console.log("filtered", filtered);
    if (valuechacker) {
      console.log("AAAAAA");
      filtered.forEach((Docelement) => {
        Docelement.forEach((Docelement2) => {
          console.log("Docelement2", Docelement2);
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
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseLine: item.LineNum,
                BaseEntry: element.DocEntry,
                BaseType: 17,
                WarehouseCode: item.WarehouseCode,
                ItemCode: item.ItemCode,
                Quantity: item.Quantity,
                ShipDate: item.ShipDate,
                BatchNumbers: docLines2.filter(function (i) {
                  return i.ItemCode == item.ItemCode;
                }),
              });
              body["DocDueDate"] = DueDate ? DueDate : currentDate;
              body["DocDate"] = getDocDate ? getDocDate : currentDate;
              body["TaxDate"] = getTaxDate ? getTaxDate : currentDate;
              body["DocumentLines"] = DocLines;
              body["U_CreatedBy"] = "Web UI";
              body["Series"] = getseriesvalue;
              body["CardCode"] = Customer;
              body["SalesPersonCode"] = SaleEmployee;
              body["DocumentsOwner"] = SelectedOwner;
              body["DiscountPercent"] = disc;
              body["AttachmentEntry"] = attachmentresponse;
            }
          });
        }
      });
    } else {
      console.log("BBBB");
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseLine: item.LineNum,
                BaseEntry: element.DocEntry,
                BaseType: 17,
                ItemCode: item.ItemCode,
                Quantity: item.Quantity,
                ShipDate: item.ShipDate,
              });
              body["DocDueDate"] = DueDate ? DueDate : currentDate;
              body["DocDate"] = getDocDate ? getDocDate : currentDate;
              body["TaxDate"] = getTaxDate ? getTaxDate : currentDate;
              body["DocumentLines"] = DocLines;
              body["U_CreatedBy"] = "Web UI";
              body["Series"] = getseriesvalue;
              body["CardCode"] = Customer;
              body["SalesPersonCode"] = SaleEmployee;
              body["DocumentsOwner"] = SelectedOwner;
              body["DiscountPercent"] = disc;
              body["AttachmentEntry"] = attachmentresponse;
            }
          });
        }
      });
    }
    var filtered2 = seletedBatchnumber2.filter(function (el) {
      return (el == el.length) == 0;
    });
    if (valuechacker) {
      console.log("AAAAAA");
      filtered2.forEach((Docelement) => {
        Docelement.forEach((Docelement2) => {
          console.log("Docelement23", Docelement2);
          docLines3.push({
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
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              SecondDB.push({
                BaseLine: item.LineNum,
                BaseEntry: getpurchaseordersdocentry[element.DocNum].DocEntry,
                BaseType: 17,
                WarehouseCode: item.WarehouseCode,
                ItemCode: item.ItemCode,
                Quantity: item.Quantity,
                ShipDate: item.ShipDate,
                BatchNumbers: docLines3.filter(function (i) {
                  return i.ItemCode == item.ItemCode;
                }),
              });
              body2["DocDueDate"] = DueDate ? DueDate : currentDate;
              body2["DocDate"] = getDocDate ? getDocDate : currentDate;
              body2["TaxDate"] = getTaxDate ? getTaxDate : currentDate;
              body2["U_CreatedBy"] = "Web UI";
              body2["DocumentLines"] = SecondDB;
              body2["Series"] = getseriesvalue;
              body2["CardCode"] = Customer;
              body2["SalesPersonCode"] = SaleEmployee;
              body2["DocumentsOwner"] = SelectedOwner;
              body2["DiscountPercent"] = disc;
              body2["AttachmentEntry"] = attachmentresponse;
            }
          });
        }
      });
    } else {
      console.log("BBBB");
      PQDocumentLines.forEach(async (element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              SecondDB.push({
                BaseLine: item.LineNum,
                BaseEntry: getpurchaseordersdocentry[element.DocNum].DocEntry,
                BaseType: 17,
                ItemCode: item.ItemCode,
                Quantity: item.Quantity,
                ShipDate: item.ShipDate,
              });
              body2["DocDueDate"] = DueDate ? DueDate : currentDate;
              body2["DocDate"] = getDocDate ? getDocDate : currentDate;
              body2["TaxDate"] = getTaxDate ? getTaxDate : currentDate;
              body2["DocumentLines"] = SecondDB;
              body2["Series"] = getseriesvalue;
              body2["CardCode"] = Customer;
              body2["U_CreatedBy"] = "Web UI";
              body2["SalesPersonCode"] = SaleEmployee;
              body2["DocumentsOwner"] = SelectedOwner;
              body2["DiscountPercent"] = disc;
              body2["AttachmentEntry"] = attachmentresponse;
            }
          });
        }
      });
    }
    console.log("body", JSON.stringify(body));
    console.log("body2", JSON.stringify(body2));
    if (bothbodies) {
      PostInSecondDB(body, body2);
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
          api: LINKS.sap.Sales.PostDeliveryNotes,
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
  const PostInSecondDB = async (body, body2) => {
    let cook = await localStorage.getItem("secondcookie");
    if (cook) {
      await axios
        .post(API_TYPES.SECONDPOST, {
          body: JSON.stringify(body2),
          api: LINKS.sap.Sales.PostDeliveryNotes,
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
  const [modalOne, setModalOne] = React.useState();
  const [modalTwo, setModalTwo] = React.useState();

  //   const [modalThree,setModalThree]=React.useState();
  //   const [modalFour,setModalFour]=React.useState();
  const handleClosee = () => setModalOne(false);
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
    prData.forEach((element) => {
      if (element.isSelected) {
        setgetautoseries(element.Series);
      }
    });
    setPQDocumentLines(prData);
  };
  const getbatchnumberdata = async (item) => {
    console.log(item);
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `Items?$filter=ItemCode eq '${item.ItemCode}' and ManageBatchNumbers eq 'tYES'`;
    console.log("SAPAPI", SAPapi);
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
  // const getvaluefrombatchtable = (e,index,PrReIndex) =>{
  //   let itemDetail = PQDocumentLines
  //   itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value
  //   setPQDocumentLines(itemDetail)
  //   setvaluechacker(itemDetail)
  // }
  const docLineSelectedSwitch = async (PrReIndex, item, index) => {
    console.log(item);
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
    await getbatchnumberdata(item);
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
          setTotalbforeDiscount(sum);
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
          <h1 style={{ textAlign: "center" }}>Delivery</h1>
          {/* Upper Side++++++++ */}

          <Form>
            <div className="main_container">
              <div className="left">
                  <div className="header_items_container">
                  <label>Customer</label>

                    <Select
                      placeholder={
                        HeaderData &&
                        HeaderData.CardCode + ":" + HeaderData &&
                        HeaderData.CardName
                      }
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
                      onChange={(e) => {
                        CPChange(e);
                      }}
                    />
                    {/* )} */}
                  </div>
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
                            {/* <th>Free Text</th> */}
                            <th>Quantity</th>
                            <th>Delivery Date</th>
                            <th>Open Qty</th>
                            <th>Whse</th>
                            {/* <th>Unit Price</th> */}
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
                                              // onChange={e => {
                                              //   ShipDateChange(e, index)
                                              // }}
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
                      <Modal.Title>Open Orders List</Modal.Title>
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
                      type="text"
                      class="input"
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
                      value={
                        (HeaderData && HeaderData.DocNum) || getnextnumber
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
                      <svg class="svg-icon6" viewBox="0 0 20 20">
                        <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                      </svg>
                    </a>
                    <input
                      name={"SearchPRNumber"}
                      type="Number"
                      placeholder="Number"
                      class="input"
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
                  {/* <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
            <label>No</label>
            <input
              type='number'
              readOnly='readOnly'
              defaultValue={HeaderData && HeaderData.DocNum ?SelectedPRDocEntry && SelectedPRDocEntry.DocNum:null}
              class='form-control' />
           </div> */}

<div className="header_items_container">

                    <label> Posting Date</label>

                    <input
                      type="date"
                      name="DocDate"
                      onChange={(e) => {
                        setgetDocDate(e.target.value);
                      }}
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
                      name="DocumentDate"
                      class="input"
                      onChange={(e) => {
                        setgetTaxDate(e.target.value);
                      }}
                      defaultValue={
                        HeaderData && HeaderData.TaxDate
                          ? HeaderData && HeaderData.TaxDate
                          : currentDate
                      }
                    />
                  </div>
                  <div className="header_items_container">

                    <label>Delivery Date</label>
                    <input
                      class="input"
                      aria-describedby="emailHelp"
                      type="date"
                      name="DeliveryDate"
                      defaultValue={
                        HeaderData && HeaderData.DocDueDate
                          ? HeaderData && HeaderData.DocDueDate
                          : currentDate
                      }
                      onChange={(e) => {
                        setDueDate(e.target.value);
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
            <Modal
              show={show3}
              onHide={handleClose3}
              className="Modal-big"
              size="lg"
            >
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
                <Button variant="secondary" onClick={getfinalvaluefromtable}>
                  Add
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
                  <Table responsive striped bordered hover>
                    {Array.isArray(PQDocumentLines) &&
                    PQDocumentLines.length > 0 ? (
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Bar Code</th>
                          <th>Item No.</th>
                          <th>Item Description</th>
                          {Array.isArray(getbatchnumbers) &&
                          getbatchnumbers.length > 0 ? (
                            <th>Batch</th>
                          ) : null}
                          <th>UoM Name</th>
                          {/* <th>Free Text</th> */}
                          <th>Quantity</th>
                          <th>Delivery Date</th>
                          <th>Open Qty</th>
                          <th>Whse</th>
                          {/* <th>Unit Price</th> */}
                          {/* <th>Discount</th>
                  <th>Price after Discount</th>
                  <th>Tax Code : Rate</th>
                  <th>Tax Amount(LC)</th>
                  <th>Gross Price After Disc.</th>
                  <th>Freight 1</th>
                  <th>Freight 1 (LC)</th>
                  <th>Line Total</th>
                  <th>Gross Total(LC)</th> */}
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
                                    {Array.isArray(getbatchnumbers) &&
                                    getbatchnumbers.length > 0 ? (
                                      <TD>
                                        <Button
                                          onClick={(e) => {
                                            modalshow(item, index);
                                          }}
                                        >
                                          {" "}
                                          Batch{" "}
                                        </Button>
                                      </TD>
                                    ) : null}
                                    <TD>{item.MeasureUnit}</TD>
                                    {/* <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='FreeText'
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          defaultValue={item.FreeText}
                          onChange={e => {
                            ontextChanged(e, index,PrReIndex)
                          }}
                        />
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
                                          type="number"
                                          name="Quantity"
                                          class="form-control"
                                          aria-describedby="Requesterid"
                                          defaultValue={item.Quantity}
                                          onChange={
                                            (e) =>
                                              OpenQtyFunction(
                                                e,
                                                index,
                                                PrReIndex
                                              )
                                            // setOpenQty(e.target.value)
                                          }
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
                                          class="form-control"
                                          onChange={(e) => {
                                            OpenQtyFunction(
                                              e,
                                              index,
                                              PrReIndex
                                            );
                                            ShipDateChange(e, index, PrReIndex);
                                          }}
                                          defaultValue={item.ShipDate}
                                        />
                                      </div>
                                    </TD>
                                    <TD>{item.RemainingOpenQuantity} </TD>
                                    <TD>
                                      <div style={{ width: "15em" }}>
                                        <Select
                                          menuPortalTarget={document.body}
                                          // value={PrWhse && PrWhse.filter(
                                          //   option => option.value === item.WarehouseCode
                                          // )}
                                          placeholder={item.WarehouseCode}
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
                                      </div>
                                    </TD>
                                    <TD>
                                      <div style={{ width: "14rem" }}>
                                        <Select
                                          menuPortalTarget={document.body}
                                          value={
                                            PrProject &&
                                            PrProject.filter(
                                              (option) =>
                                                option.value ===
                                                item.WarehouseCode
                                            )
                                          }
                                          placeholder={item.ProjectCode}
                                          options={PrProject} // Options to display in the dropdown
                                          onChange={(e) => {
                                            DocLinesDropDownOnChange(
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
                                          options={PrCost} // Options to display in the dropdown
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
                          <th>Quantity</th>
                          <th>Delivery Date</th>
                          <th>Open Qty</th>
                          <th>Whse</th>
                          {/* <th>Unit Price</th>
                  <th>Discount</th>
                  <th>Price after Discount</th>
                  <th>Tax Code : Rate</th>
                  <th>Tax Amount(LC)</th>
                  <th>Gross Price After Disc.</th>
                  <th>Freight 1</th>
                  <th>Freight 1 (LC)</th>
                  <th>Line Total</th>
                  <th>Gross Total(LC)</th> */}
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
                            {/* <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='FreeText'
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          defaultValue={item.FreeText}
                          onChange={e => {
                            SearchontextChanged(e, index)
                          }}
                        />
                      </div>
                    </TD> */}
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
                              {item.RemainingOpenQuantity ? OpenQty : null}{" "}
                            </TD>
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
            <div className="main_container">
              <div className="left">
              <div className="header_items_container">
                    <label>Sales Employee</label>
                    {/* <input
                type='text'
                class='form-control'
                placeholder=''
                defaultValue={  SelectedPRDocEntry && SelectedPRDocEntry.SalesPersonCode? HeaderData && HeaderData.SalesPersonCode:null}
              /> */}
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
                      options={PrOwner}
                      placeholder={HeaderData && HeaderData.DocumentsOwner}
                      onChange={(e) => setSelectedOwner(e.value)} // Options to display in the dropdown
                      // onSelect={Owner} // Function will trigger on select event
                      // onRemove={Owner} //Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                    <div className="header_items_container">
                    <label for="exampleFormControlTextarea1">Remarks</label>
                      <textarea
                        defaultValue={
                          HeaderData &&
                          "Based on Orders: " +
                            HeaderData.DocEntry +
                            ". " +
                            HeaderData.Comments
                        }
                        type="text"
                        class="textArea"
                        id="exampleFormControlTextarea1"
                        name="Comments"
                        rows="3"
                        // onChange={e => {
                        //   CommentsFun(e)
                        // }}
                      />
                    </div>

                 
              </div>
              <div className="right">
              <div className="header_items_container">
                    <label >Net Total </label>
                    <input
                      readOnly="readOnly"
                      type="number"
                      value={
                        totalbforeDiscount
                          ? totalbforeDiscount
                          : HeaderData &&
                            HeaderData.DocTotal -
                              HeaderData.TotalDiscountSC -
                              HeaderData.VatSumSys
                      }
                      //  (SelectedPRDocEntry && SelectedPRDocEntry.DocTotal - SelectedPRDocEntry.TotalDiscountSC  - SelectedPRDocEntry.VatSumSys) ||(HeaderData && HeaderData.DocTotal - HeaderData.TotalDiscountSC - HeaderData.VatSumSys)
                      // defaultValue={((SelectedPRDocEntry && SelectedPRDocEntry.DocTotal ||  HeaderData && HeaderData.DocTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.TotalDiscountSC || HeaderData && HeaderData.TotalDiscountSC || 0)) - ((PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys || 0))}
                      // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                      class="input"
                    />
                  </div>
                  <div className="header_items_container">
                <label>Discount</label>
                <div className="innerpart">
                  <div className="discountfirst">
                    <input
                      type="number"
                      value={disc || (HeaderData && HeaderData.DiscountPercent)}
                      onChange={(e) => {
                        setdisc(e.target.value);
                        setDiscountTotal((e.target.value * getnetTotal) / 100);
                      }}
                      name="TaxAmount(LC)"
                    />
                  </div>
                  <div className="discountsecond">
                    <input
                      type="number"
                      // value={DiscountTotal}
                      onChange={(e) => {
                        setDiscountTotal(e.target.value);
                        setdisc((e.target.value / getnetTotal) * 100);
                      }}
                      class=""
                      style={{ width: "7rem" }}
                      name="TaxAmount(LC)"
                      value={
                        DiscountTotal ||
                        (HeaderData && HeaderData.TotalDiscountSC)
                      }
                    />
                  </div>
                </div>
              </div>
                {/* <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                  <label>Freight</label>
                  <input
                    // placeholder={totalFreight}
                    readOnly="readOnly"
                    class="form-control"
                    // value={PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || "null"}
                  />
                </div> */}
              <div className="header_items_container">
                  <label>Tax</label>
                  <input
                    type="number"
                    // onChange={e => setBottomTax(+e.target.value)}
                    // value={BottomTax}
                    class="input"
                    name="TaxAmount(LC)"
                    readOnly="readOnly"
                    value={gettaxtotal || (HeaderData && HeaderData.VatSumSys)}
                  />
                </div>
                <div className="header_items_container">
                  <label>Total Payment Due:</label>
                  <input
                    type="text"
                    value={
                      totalbforeDiscount
                        ? totalbforeDiscount - DiscountTotal + Number(gettaxtotal)
                        : HeaderData && HeaderData.DocTotal
                    }
                    placeholder=""
                    readOnly="readOnly"
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
