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
import Select from "react-select";
import { Logistics, Accounting } from "../../../Component/PurchaseQuotation";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import "./index.css";
import { useAlert } from "react-alert";
import { LINKS } from "../../../Utils";
import { Logo, TextInput, Alert, Navbar } from "../../../Component/Global";
import Switch from "react-switch";
import { input, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import { useSelector } from "react-redux";

const axios = require("axios");

export default function PurchaseReturn() {
  const redux_response = useSelector((state) => state.colorReducer);

  const alert = useAlert();
  const [show1, setShow1] = React.useState(false);
  const [bothbodies, setbothbodies] = React.useState(false);
  const [getbatchnumbers, setgetbatchnumbers] = React.useState();
  const [show, setShow] = React.useState(false);
  const [SelectShow, setSelectShow] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [valuechacker, setvaluechacker] = React.useState();
  const [ButtonDropdown, setButtonDropdown] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState("0");
  const [ButtonName, setButtonName] = React.useState("Add");
  const [getvaluefromtable, setgetvaluefromtable] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [selectedPRVender, setselectedPRVender] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [currentDate, setcurrentDate] = React.useState();
  const [DocStatus, setDocStatus] = React.useState();
  const [DocDate, setDocDate] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [PrProject, setPrProject] = React.useState();
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
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [Pq, setPq] = React.useState();
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [Comments, setComments] = React.useState();
  const [ModalPQDocumentLines, setModalPQDocumentLines] = React.useState();
  const [MIR, setMIR] = React.useState();
  const [IGP, setIGP] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
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
  const [getdocumenttype, setgetdocumenttype] = React.useState("21");
  const [getdocumentname, setgetdocumentname] = React.useState("RPD2");
  const [ModuleName, setModuleName] = React.useState("PurchaseReturns");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [show3, setShow3] = React.useState(false);
  const [showA, setShowA] = React.useState(false);

  const [BatchNumbersData, setBatchNumbersData] = React.useState();
  const [getAddress, setgetAddress] = React.useState();
  const [getAddress2, setgetAddress2] = React.useState();
  const [getTransportationCode, setgetTransportationCode] = React.useState();
  const [getGroupNumber, setgetGroupNumber] = React.useState();
  const [getJournalMemo, setgetJournalMemo] = React.useState();
  const [getProject, setgetProject] = React.useState();
  const [getCancelDate, setgetCancelDate] = React.useState();
  const [seletedBatchnumber, setseletedBatchnumber] = React.useState();
  const [seletedBatchnumber2, setseletedBatchnumber2] = React.useState([]);

  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  };
  const Home = () => {
    const alert = useAlert();
  };
  React.useEffect(async () => {
    setTestGetInstallationNumber("0020545074");
    setLiveGetInstallationNumber2("0021105591");
    today();
    compareDate();

    await setgetdocumentname("RPD2");
    await setModuleName("PurchaseReturns");
    await setgetdocumenttype("21");
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    if (formcontroller) {
      formcontroller.forEach(async (element) => {
        if (element.U_FormId === "ORPD") {
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
    BatchNoQuantities(cook);
    BatchNo(cook);
    Project(cook);
    CostCentre(cook);
    Buyer(cook);
    getBatchNumbersfromAPI(cook);
    Owner(cook);
    // Whse(cook)
    PurchaseQuotation(cook);
    OwnerPurchaseRequest(cook);
    BusinessPartners(cook);
    Frieght1(cook);
    TableTaxCode(cook);
    MaterialInspectionReport(cook);
    InwardGatePass(cook);
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
          api: `PurchaseReturns(${id})`,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success("Operation completed successfully");
            window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message.value));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const submitPatchPurchaseReturn = async () => {
    let body = {};
    // // PQDocumentLines.forEach(element => {
    // body.push({
    //   Remark:"Zeeshan"

    // })
    body["Comments"] = Comments;
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

  const ContactP = async () => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq '${selectedPRVender}'`;
    await axios
      .post(API_TYPES.GET, { api: SAPapi, cookie: cookie })
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

  const CostCentre = async (cookie, e) => {
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
        api: LINKS.sap.PurchaseReturn.PurchaseDeliveryNotes,
        cookie: cookie,
      })
      .then(function (res) {
        // setPrRe(res.data.value)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const ontextChanged = (e, index) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index][e.target.name] = e.target.value;
    setPQDocumentLines(itemDetail);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  const handleShow = async () => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `PurchaseDeliveryNotes?$filter=CardCode eq '${selectedPRVender}' and DocumentStatus eq 'bost_Open' &$orderby=DocNum`;
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
      let sapAPi = `PurchaseReturns?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `PurchaseReturns?$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    }
  };
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `PurchaseReturns?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0]);
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        setSearchDocumentLines(res.data.value[0].DocumentLines);
        if (res.data.value[0].DocumentStatus === "bost_Open") {
          setDocStatus("Open");
        } else {
          setDocStatus("Close");
        }
        if (HeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch({});
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
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitPurchaseReturns();
    } else if (ButtonName != "Add") {
      submitPatchPurchaseReturn();
    }
  };
  const submitPurchaseReturns = async () => {
    let DocLines = [];
    let body = PRBody;
    if (valuechacker) {
      PQDocumentLines.forEach((element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: item.DocEntry,
                BaseType: 20,
                BaseLine: item.LineNum,
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
                // ItemCode:element.ItemCode
              });

              body["DocumentLines"] = DocLines;
              body["CardCode"] = selectedPRVender;
              body["AttachmentEntry"] = attachmentresponse;
              body["DocDate"] = DocDate ? DocDate : currentDate;
              //Component posting------
              body["Address"] = getAddress;
              body["Address2"] = getAddress2;
              body["TransportationCode"] = getTransportationCode;
              body["JournalMemo"] = getJournalMemo;
              body["GroupNumber"] = getGroupNumber;
              body["Project"] = getProject;
              body["Series"] = getseriesvalue;
              body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              // body['Indicator'] = IndicatorAccounting
            }
          });
        }
      });
    } else {
      PQDocumentLines.forEach((element) => {
        if (element.isSelected) {
          element.DocumentLines.forEach((item) => {
            if (item.isSelected && item.LineStatus === "bost_Open") {
              DocLines.push({
                BaseEntry: item.DocEntry,
                BaseType: 20,
                BaseLine: item.LineNum,
                // ItemCode:element.ItemCode
              });
              body["DocumentLines"] = DocLines;
              body["CardCode"] = selectedPRVender;
              body["AttachmentEntry"] = attachmentresponse;
              body["DocDate"] = DocDate ? DocDate : currentDate;
              //Component posting------
              body["Address"] = getAddress;
              body["Address2"] = getAddress2;
              body["TransportationCode"] = getTransportationCode;
              body["JournalMemo"] = getJournalMemo;
              body["GroupNumber"] = getGroupNumber;
              body["Project"] = getProject;
              body["Series"] = getseriesvalue;
              body["CancelDate"] = getCancelDate ? getCancelDate : currentDate;
              // body['Indicator'] = IndicatorAccounting
            }
          });
        }
      });
    }
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
          api: LINKS.sap.PurchaseReturn.PurchaseReturn,
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
          api: LINKS.sap.PurchaseReturn.PurchaseReturn,
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

  const selectrow = async (items) => {
    PQDocumentLines.forEach((element) => {
      element.PQDocumentLines.forEach((docElement) => {
        if (docElement.isSelected) {
          setSelectShow(docElement);
        }
      });
    });
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
  const handleClose3 = () => {
    setShow3(false);
  };

  const modalshow = (item, index) => {
    // let Batchlines = []
    // selectedItems.forEach(element => {
    //   BatchNumberQuantityData.forEach(docElement => {
    //     if(element.ItemCode === docElement.ItemCode && element.WarehouseCode === docElement.WhsCode){
    //       Batchlines.push({
    //         BaseLineNumber:index,
    //         AbsEntry: docElement.AbsEntry,
    //         ItemCode: docElement.ItemCode,
    //         MdAbsEntry: docElement.MdAbsEntry,
    //         Quantity: docElement.Quantity,
    //         SysNumber: docElement.SysNumber,
    //         WhsCode: docElement.WhsCode,
    //       })
    //       whsecodematching(Batchlines,item)
    //     }
    //   });
    // });
    //  setShow3(true)
  };
  const getBatchNumbersfromAPI = async (cook) => {
    let sapAPi = `SQLQueries('BatchNo')/List`;
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setBatchNumbersData(res.data.value);
      })
      .catch({});
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
    setTimeout(function () {
      getfinalvaluefromtable(itemDetail);
    }, 4000);
  };
  const getfinalvaluefromtable = (itemDetail) => {
    setseletedBatchnumber2([...seletedBatchnumber2, itemDetail]);
    setvaluechacker(itemDetail);
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
          <h1 style={{ textAlign: "center" }}>Goods Return</h1>
          <Form>
            <div className="main_container">
              <div className="left">
                <div className="header_items_container">
                  <label>Vendor</label>

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

                  <Select
                    placeholder={HeaderData && HeaderData.ContactPersonCode}
                    options={ContactPersonDropdown} // Options to display in the dropdown
                    // onSelect={GroupNo} // Function will trigger on select event
                    // onRemove={GroupNo} Function will trigger on remove event
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
                      Open Goods Receipt PO List
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
                    Open Goods Receipt PO List
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
                            <th>Whse</th>
                            <th>Project</th>
                            <th>Cost Centre</th>
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
                                        {" "}
                                        <div style={{ width: "11rem" }}>
                                          <input
                                            type="number"
                                            readOnly="readOnly"
                                            name="OpenQty"
                                            class="form-control"
                                            value={item.RemainingOpenQuantity}
                                            // onChange={e => {
                                            //   ontextChanged(e, index)
                                            // }}
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
                    <Modal.Title>Open Goods Receipt PO List</Modal.Title>
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
                <div className="header_items_container">
                  <label>Vendor Ref.No</label>
                  <input
                    value={HeaderData && HeaderData.NumAtCard}
                    type="text"
                    class="input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=""
                  ></input>
                </div>

                <div className="header_items_container">
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
                    <svg class="svg-icon18" viewBox="0 0 20 20">
                      <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                    </svg>
                  </a>
                  <input
                    name={"SearchPRNumber"}
                    type="Number"
                    class="input"
                    id="exampleInputEmail1"
                    placeholder={HeaderData && HeaderData.DocNum}
                    onChange={(e) => {
                      setSearchNumber(e.target.value);
                    }}
                  />
                </div>
                {/* <Button
              style={{marginLeft:'3rem'}}
              onClick={e => {
                SearchAll_Filter_Data()
              }}
            >
              Search
            </Button> */}

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
                  />
                </div>
                <div className="header_items_container">
                  <label> Due Date</label>
                  <input
                    type="date"
                    name="DocDate"
                    class="input"
                    defaultValue={
                      HeaderData && HeaderData.DocDueDate
                        ? HeaderData && HeaderData.DocDueDate
                        : currentDate
                    }
                    // defaultValue={currentDate || SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate || HeaderData && HeaderData.DocDueDate}
                  />
                </div>
                <div className="header_items_container">
                  <label> Document Date</label>
                  <input
                    type="date"
                    name="DocDate"
                    class="input"
                    defaultValue={
                      HeaderData && HeaderData.TaxDate
                        ? HeaderData && HeaderData.TaxDate
                        : currentDate
                    }
                    // value={currentDate || SelectedPRDocEntry && SelectedPRDocEntry.TaxDate || HeaderData && HeaderData.TaxDate}
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
                          <th>#</th>
                          <th>Bar Code</th>
                          <th>Item</th>
                          {Array.isArray(getbatchnumbers) &&
                          getbatchnumbers.length > 0 ? (
                            <th>Batch</th>
                          ) : null}
                          <th>UoM Name</th>
                          <th>Quantity</th>
                          <th>Whse</th>
                          <th>Project</th>
                          <th>Cost Centre</th>
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
                                  <TD></TD>
                                  <TD>{item.ItemCode}</TD>
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

                                  <TD>
                                    <div style={{ width: "11rem" }}>
                                      <input
                                        type="number"
                                        readOnly="readOnly"
                                        name="OpenQty"
                                        class="form-control"
                                        value={item.RemainingOpenQuantity}
                                        // onChange={e => {
                                        //   ontextChanged(e, index)
                                        // }}
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
                )}
                <Modal show={show3} onHide={handleClose3}>
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
                    <Button variant="secondary" onClick={handleClose3}>
                      Add
                    </Button>
                  </Modal.Footer>
                </Modal>
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
                          <th>Whse</th>
                          <th>Project</th>
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
                            <TD>{item.MeasureUnit}</TD>

                            <TD>
                              <div style={{ width: "11rem" }}>
                                <input
                                  type="number"
                                  readOnly="readOnly"
                                  name="OpenQty"
                                  class="form-control"
                                  value={item.RemainingOpenQuantity}
                                  // onChange={e => {
                                  //   ontextChanged(e, index)
                                  // }}
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
                                      SearchDocLinesDropDownOnChange(
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
                )}
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
                  <label for="exampleFormControlTextarea1">Remarks</label>
                  <textarea
                    class="textArea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={
                      HeaderData &&
                      HeaderData.Comments + ":" + HeaderData.DocEntry
                    }
                    onChange={(e) => {
                      setComments(e.target.value);
                    }}
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
