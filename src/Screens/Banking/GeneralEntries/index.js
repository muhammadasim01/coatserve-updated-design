import React from "react";
import { CONSTANTS, LINKS } from "../../../Utils";
import { Multiselect } from "multiselect-react-dropdown";
import {
  Button,
  CardGroup,
  Table,
  Container,
  Tabs,
  Tab,
  Modal,
  Form,
} from "react-bootstrap";
import { Card } from "reactstrap";
import { Attachment } from "../../../Component/APDownPaymentRequest";
import "../GeneralEntries/Index.css";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavBar from "../../../Component/Global/Navbar";
import { input, DIV3, DIV4, InputD, TableHead, TD } from "./Style";
import Select from "react-select";
import { Logo, TextInput, Alert } from "../../../Component/Global";
import { useAlert } from "react-alert";
import { ButtonOr } from "semantic-ui-react";
import MaterialTable from "material-table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import XLSX from "xlsx";
import { PurchaseRequests } from "..";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function GeneralEntries() {
  const alert = useAlert();
  const [loading, setloading] = React.useState(false);
  const [selectedOwner, setselectedOwner] = React.useState();
  const [getProjectvalue, setgetProjectvalue] = React.useState();
  const [projectsDropDown, setProjectsDropdowon] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [bothbodies, setbothbodies] = React.useState(false);
  const [getvalues, setgetvalues] = React.useState({});
  const [getdocentryforreport, setgetdocentryforreport] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [selectedFile, setselectedFile] = React.useState();
  const classes = useStyles();
  const [ButtonName, setButtonName] = React.useState("Add");
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [getStatus, setgetStatus] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState("0");
  const [PrVendor, setPrVendor] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [UpdatePurchaseRequest, setUpdatePurchaseRequest] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [ReqQty, setReqQty] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [SelectedItems, setSelectedItems] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [OwnerDropdown, setOwnerDropdown] = React.useState();
  const [RequiredDate, setRequiredDate] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [UserName, setUserName] = React.useState();
  const [Dept, setDept] = React.useState();
  const [PRRequiredDate, setPRRequiredDate] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
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
  const [colDefs, setColDefs] = React.useState();
  const [data, setData] = React.useState();
  const [getdocumentname, setgetdocumentname] = React.useState("JDT2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("30");
  const [ModuleName, setModuleName] = React.useState("JournalEntry");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const [getdocnumfromcomponent, setgetdocnumfromcomponent] = React.useState();
  const [getdirectdoctype, setgetdirectdoctype] = React.useState();
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState();
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  };
  const Home = () => {
    const alert = useAlert();
  };
  React.useEffect(() => {
    (async () => {
      today();
      setgetdocumentname("JDT2");
      setModuleName("JournalEntry");
      setgetdocumenttype("30");
      compareDate();
      let cook = await localStorage.getItem("cookie");
      const show = await localStorage.getItem("ShowBranches");
      let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
      if (formcontroller) {
        formcontroller.forEach(async (element) => {
          if (element.U_FormId === "OJDT") {
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
      let cook2 = await localStorage.getItem("cookiee");
      console.log(cook);
      console.log(cook2);
      if (cook) GetItems(cook);
      Project(cook);
      CostCentre(cook);
      PurchaseRequest(cook);
      Department(cook);
      getProjects(cook);
    })();
  }, []);
  const getProjects = async (cookie) => {
    const api = `Projects?$select=Code,Name&$filter=Active eq 'tYES' and (ValidTo lt '2021-01-11' or ValidTo eq '2021-01-11' or  ValidTo eq null)`;
    let resResult = {};

    // -------------------------    Items API GET DATA   -----------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (Response) {
        console.log(Response);
        resResult = Response;
      })
      .catch(function (error) {
        console.log(error);
      });
    let res = apiProcessing(resResult);
    if (res) {
      let dropdown = [];
      res.forEach((element) => {
        dropdown.push({
          value: element.Code,
          label: element.Code + " : " + element.Name,
        });
      });
      setProjectsDropdowon(dropdown);
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
    setcurrentDate(year + "-" + month + "-" + day);
    // console.log("Today",currentDate)
  };

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };
  const importExcel = (e) => {
    console.log("ZZZZZZZZZ", e.target.files);
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      console.log("fileData", fileData);
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
      console.log("heads", heads);

      // removing header
      fileData.splice(0, 1);

      setData(convertToJson(headers, fileData));
      console.log("data", convertToJson(headers, fileData));
    };
    reader.readAsBinaryString(file);
  };
  const selectPR = async (item) => {
    setShow(false);
    setHeaderData(item);
    localStorage.setItem("getDocEntry", item.JdtNum);
    setPQDocumentLines(item.JournalEntryLines);
    console.log(item.JournalEntryLines);
    if (item.DocumentStatus == "bost_Open") {
      setButtonName("Update");
    }
  };
  const apiProcessing = (res) => {
    if (res) {
      if (res.data) {
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
  const ItemsDropDownfunc = async (selectedList) => {
    console.log(selectedList);
    let list = [];
    selectedList.forEach((element) => {
      list.push(element.value);
    });
    await setSelectedItems(list);
  };
  {
    /* Table API's Call++++++++ */
  }
  const GetItems = async () => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `ChartOfAccounts?$select=Code,AccountLevel,Name&$filter=ActiveAccount eq 'tYES' &$orderby=Code`;
    console.log(SAPapi);

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
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
  const Department = async (e) => {
    // -------------------------    Warehouse API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;

    let cookie = await localStorage.getItem("cookie");

    let SAPapi = `Departments`;
    console.log(SAPapi);

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
              value: element.Code,
              label: element.Code + " : " + element.Name,
            });
          });
          setDept(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Vendor = async (cook) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");

    let SAPapi = `BusinessPartners?$select=CardCode,CardName,DebitorAccount &$orderby=CardCode`;
    console.log(SAPapi);

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
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
        ItemsDetails[element.CardCode] = {
          CardCode: element.CardCode,
          CardName: element.CardName,
          DebitorAccount: element.DebitorAccount,
        };
        ItemsDropDown.push({
          value: element.CardCode,
          label: element.CardCode + " : " + element.CardName,
          item: element,
        });
      });

      await setItemsDropDown(ItemsDropDown);
      await setItemsDetails(ItemsDetails);
    }
  };
  const Project = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: `Projects?$select=Code,Name&$filter=Active eq 'tYES' and (ValidTo lt '2021-01-11' or ValidTo eq '2021-01-11' or  ValidTo eq null)`,
        cookie: cookie,
      })
      .then(function (res) {
        console.log(res);
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
  const dateChange = (e) => {
    let prBody = PRBody;
    prBody[e.target.name] = e.target.value;
    setPRBody(prBody);
  };
  const CommentsFun = (e) => {
    let prBody = PRBody;
    prBody[e.target.name] = e.target.value;
    setPRBody(prBody);
  };
  const RequriedDateChange = async (e) => {
    let newItemDetail = ItemsDetails;
    let prBody = PRBody;
    let name = e.target.name;
    let value = e.target.value;
    SelectedItems.forEach((item) => {
      newItemDetail[item]["RequriedDate"] = value;
    });

    await setItemsDetails(newItemDetail);
    prBody[name] = value;
    setPRBody(prBody);
  };
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `JournalEntries(${id})`,
          cookie: cook,
        })

        .then(function (res) {
          console.log(res);
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
  const submitPatch = async () => {
    console.log(PQDocumentLines);
    let docLines = [];
    PQDocumentLines.forEach((element) => {
      docLines.push({
        Debit: element.Debit,
        Credit: element.Credit,
        LineMemo: element.LineMemo,
        ProjectCode: element.ProjectCode,
        CostingCode: element.RequiredQuantity,
        Reference1: element.Reference1,
        Reference2: element.Reference2,
        AccountCode: element.AccountCode,
      });
    });
    let body = {
      Memo: getvalues.Remarks,
      JournalEntryLines: docLines,
    };

    Patch(HeaderData.DocEntry, body);
    console.log(HeaderData.DocEntry, body);
  };
  const ontextItemChanged = (e) => {
    let obj = TextItemChangedObject;
    obj[e.target.name] = e.target.value;
    setTextItemChangedObject(obj);
  };
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === "0") {
      console.log("Show All Data");
      SearchPRNumberAll();
    } else {
      console.log("Show Filter Data");
      SearchPRNumberFilter();
    }
  };
  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `JournalEntries?$orderby=Number desc`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setModalHeaderData(res.data.value);
        console.log(res.data.value);
      })
      .catch(function (error) {
        console.log(error);
      });

    setShow1(true);
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject;
    console.log(obj.SearchPRNumber);
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `JournalEntries?$filter=Number eq ${SearchNumber}`;

    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res);
        setHeaderData(res.data.value[0]);
        setPQDocumentLines(res.data.value[0].JournalEntryLines);
        localStorage.setItem("getDocEntry", res.data.value[0].JdtNum);
        setgetdocentryforreport(res.data.value[0].JdtNum);
        console.log(res.data.value[0].JournalEntryLines);
        if (HeaderData != "") {
          setButtonName("Update");
        }
      })
      .catch(function (error) {
        alert.error(error);
      });
  };
  const Owner = async () => {
    let ItemsResponseResult = {};
    // -------------------------    Items API GET DATA   ------------------------------------------------------

    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = LINKS.sap.MasterData.ActiveEmplyeeInfo;

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
              value: element.EmployeeID,
              label: element.EmployeeID + " : " + element.FirstName,
            });
          });
          setOwnerDropdown(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const SearchPRNumberFilterFromComponent = async () => {
    let obj = TextItemChangedObject;
    console.log(obj.SearchPRNumber);
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `PurchaseRequests?$filter=DocNum eq ${getdocnumfromcomponent}`;

    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        // setHeaderData(res.data.value[0])
        console.log(res.data.value[0]);
        //   if(res.data.value[0].DocumentStatus == 'bost_Open'){
        //     setgetStatus("Open")
        //  }else{
        //     setgetStatus("Close")
        //  }
        //   setPQDocumentLines(res.data.value[0].DocumentLines)
        //   console.log(res.data.value[0].DocumentLines)
        //   if (HeaderData != '') {
        //     setButtonName('Update')
        //   }
        //   if (res.data.value[0].ReqType === '12') {
        //     setUserName('User')
        //   } else if (res.data.value[0].ReqType !== '12') {
        //     setUserName('Employee')
        //   }
      })
      .catch(function (error) {
        alert.error(error);
      });
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      console.log("submit");
      submit();
    } else if (ButtonName != "Add") {
      console.log("Patch");
      submitPatch();
    }
  };
  const submit = async () => {
    let DocLines = [];
    let body = PRBody;
    console.log("SelectedItems", SelectedItems);
    SelectedItems.forEach((element) => {
      DocLines.push({
        Debit: ItemsDetails[element]["Debit"],
        Credit: ItemsDetails[element]["Credit"],
        LineMemo: ItemsDetails[element]["Remarks"],
        ProjectCode: ItemsDetails[element]["RequiredDate"],
        CostingCode: ItemsDetails[element]["RequiredQuantity"],
        Reference1: ItemsDetails[element]["Ref_1"],
        Reference2: ItemsDetails[element]["Ref_3"],
        AccountCode: ItemsDetails[element]["Code"],
        // Reference2: ItemsDetails[element]['SalesPersonCode'],
        // Reference3: ItemsDetails[element]['WarehouseCode'],
      });
    });
    body["JournalEntryLines"] = DocLines;
    body["ReferenceDate"] = getvalues.PostingDate;
    body["DueDate"] = getvalues.DueDate ? getvalues.DueDate : currentDate;
    body["TaxDate"] = getvalues.DocDate ? getvalues.DocDate : currentDate;
    body["Memo"] = getvalues.Remarks;
    // body['BaseReference'] = PRBody.Comments
    // body['TransactionCode'] = selectedOwner
    body["ProjectCode"] = getProjectvalue;
    body["Reference"] = getvalues.Ref_1;
    body["Reference2"] = getvalues.Ref_2;
    body["Reference3"] = getvalues.Ref_3;
    console.log("body", JSON.stringify(body));
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
          api: `JournalEntries`,
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
          api: `JournalEntries`,
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
  const PurchaseRequest = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.PurchaseRequests,
        cookie: cookie,
      })
      .then(function (res) {
        setUpdatePurchaseRequest(res.data.value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleShow = async (cookie) => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;

    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActivePurchaseItems,
        cookie: cookie,
      })
      .then(function (ItemsResponse) {
        ItemsResponseResult = ItemsResponse;
      })
      .catch({});

    setShow(true);
  };
  const DocLinesDropDownOnChange = (selectedItem, item, name) => {
    let itemDetail = ItemsDetails;
    itemDetail[item][name] = selectedItem.value;
    setItemsDetails(itemDetail);
  };
  const FindDocLinesDropDownOnChange = (selectedItem, index, name) => {
    // let taxcodeDetai=TaxCode.find(o => o.value === selectedItem.value);
    console.log(selectedItem);
    let itemDetail = PQDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    setPQDocumentLines(itemDetail);
  };
  const ontextChanged = (e, item) => {
    console.log(item);
    let itemDetail = ItemsDetails;
    itemDetail[item][e.target.name] = e.target.value;
    console.log(itemDetail);
    setItemsDetails(itemDetail);
  };
  const onpatchtextChanged = (e, index) => {
    let doclines = PQDocumentLines;
    doclines[index][e.target.name] = e.target.value;
    setPQDocumentLines(doclines);
  };
  const RequiredDateChange = (e, item) => {
    let itemDetail = ItemsDetails;
    itemDetail[item]["RequiredDate"] = e.target.value;
    setRequiredDate(itemDetail);
  };
  const OnPatchRequiredDateChange = (e, index) => {
    let doclines = PQDocumentLines;
    doclines[index]["RequiredDate"] = e.target.value;
    setPRRequiredDate(doclines);
  };
  const CloseFunction = () => {
    console.log("Close");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  const valuechangefunction = (e) => {
    let obj = getvalues;
    obj[e.target.name] = e.target.value;
    setgetvalues(obj);
    console.log(obj);
  };
  const DocTypeChange = (e) => {
    if (e.value === "BPCode") {
      console.log("Code");
      setgetcopyfromdoctype();
      setgetdirectdoctype("BP_Code");
    } else if (e.value === "Accoount") {
      console.log("Acct");
      setgetdirectdoctype();
      setgetcopyfromdoctype("G_LAccoount");
    }
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
  return (
    <>
      <NavBar
        setgetserviceseries={setgetserviceseries}
        getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
        HeaderData={HeaderData}
        getdocumentname={getdocumentname}
        setgetdocnumfromcomponent={setgetdocnumfromcomponent}
        SearchPRNumberFilterFromComponent={SearchPRNumberFilterFromComponent}
      />
      {localStorage.getItem("documentcontroller") === "N" ? (
        <h1>You are not permited to perform this action</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Journal Entry</h1>
          <Modal show={show1} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Open List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {ModalHeaderData && (
                <Table responsive>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>DocNum</th>
                      <th>Remarks</th>
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
                        <TD>{item.Number}</TD>
                        <TD>{item.Memo}</TD>
                        <TD>{item.DueDate}</TD>
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
          <Form onSubmit={handleSubmit}>
            <CardGroup>
              <DIV3>
                <Container fluid>
                  <CardGroup>
                    <div
                      style={{
                        width: "10em",
                        height: "auto",
                        marginRight: "2rem",
                      }}
                    >
                      <label>Doc Type</label>
                      <Select
                        placeholder="Select"
                        options={[
                          { label: "BP Code", value: "BPCode" },
                          { label: "G/L Account", value: "Accoount" },
                        ]} // Options to display in the dropdown
                        onChange={(e) => {
                          DocTypeChange(e);
                        }} // Function will trigger on select event
                        // onRemove={BusinessPartners} Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                      />
                    </div>
                    <div style={{ width: "10em", height: "auto" }}>
                      <label>Series</label>
                      <Select
                        style={{ height: "2px" }}
                        onChange={(e) => {
                          getseriesvaluefunction(e);
                          Whse(e.item.Name);
                        }}
                        options={getserviceseries}
                      />
                    </div>
                    <div
                      style={{
                        width: "10rem",
                        height: "auto",
                        marginLeft: "2rem",
                      }}
                    >
                      <label>No</label>
                      <input
                        type="number"
                        name="No"
                        readOnly
                        value={
                          getnextnumber || (HeaderData && HeaderData.Number)
                        }
                        placeholder=""
                        class="form-control"
                      />{" "}
                      <br />
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
                          HeaderData && HeaderData.ReferenceDate
                            ? HeaderData && HeaderData.ReferenceDate
                            : currentDate
                        }
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
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
                          HeaderData && HeaderData.DueDate
                            ? HeaderData && HeaderData.DueDate
                            : currentDate
                        }
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
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
                          HeaderData && HeaderData.TaxDate
                            ? HeaderData && HeaderData.TaxDate
                            : currentDate
                        }
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
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
                        defaultValue={HeaderData && HeaderData.Memo}
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
                      ></input>
                    </div>
                    <br />
                    <div
                      className="username"
                      style={{
                        width: "9rem",
                        marginLeft: "2rem",
                        marginTop: "2rem",
                        borderColor: "lightgray",
                      }}
                    >
                      <a
                        onClick={(e) => {
                          SearchAll_Filter_Data();
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        <svg class="svg-icon1" viewBox="0 0 20 20">
                          <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                        </svg>
                      </a>
                      <input
                        type="Number"
                        placeholder=""
                        name={"SearchPRNumber"}
                        class="form-control1"
                        onChange={(e) => {
                          ontextItemChanged(e);
                          setSearchNumber(e.target.value);
                        }}
                      />
                    </div>
                  </CardGroup>
                  <CardGroup>
                    <div style={{ width: "10rem", height: "auto" }}>
                      <label>Origin</label>
                      <input
                        type="text"
                        readOnly
                        name="Origin"
                        class="form-control"
                        defaultValue={HeaderData && HeaderData.OriginalJournal}
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        width: "10rem",
                        height: "auto",
                        marginLeft: "2rem",
                      }}
                    >
                      <label>Origin No.</label>
                      <input
                        type="text"
                        name="OriginNo"
                        readOnly
                        class="form-control"
                        defaultValue={HeaderData && HeaderData.BaseReference}
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
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
                        readOnly
                        class="form-control"
                        defaultValue={HeaderData && HeaderData.JdtNum}
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
                      ></input>
                    </div>
                    {/* <div style={{ width: '10rem', height: 'auto' ,marginLeft:'2rem' }}>
            <label>Template Type</label>
            <Select
                onChange={e => {
                  setgetProjectvalue(e.value)
                }}
                // options={projectsDropDown}
              />
              </div> */}
                    {/* <div style={{ width: '10rem', height: 'auto' ,marginLeft:'2rem' }}>
            <label>Template</label>
              <input
                type='text'
                name='Template'
                class='form-control'
                // defaultValue={HeaderData && HeaderData.TaxDate}
                onChange={e => {
                  valuechangefunction(e)
                }}
              ></input>
              </div> */}
                    {/* <div style={{ width: '10rem', height: 'auto' ,marginLeft:'2rem' }}>
            <label>Indicator</label>
            <Select
                onChange={e => {
                  setgetProjectvalue(e.value)
                }}
                // options={projectsDropDown}
              />
              </div> */}
                    <div
                      style={{
                        width: "20rem",
                        height: "auto",
                        marginLeft: "2rem",
                      }}
                    >
                      <label>Project</label>
                      <Select
                        placeholder={HeaderData && HeaderData.ProjectCode}
                        onChange={(e) => {
                          setgetProjectvalue(e.value);
                        }}
                        options={projectsDropDown}
                      />
                    </div>
                  </CardGroup>
                  <CardGroup>
                    {/* <div style={{ width: '10rem', height: 'auto'  }}>
            <label>Trans. Code</label>
              <input
                type='text'
                name='TransCode'
                class='form-control'
                onChange={e => {
                  valuechangefunction(e)
                }}
              ></input>
              </div> */}
                    <div style={{ width: "10rem", height: "auto" }}>
                      <label>Ref.1</label>

                      <input
                        type="text"
                        name="Ref_1"
                        defaultValue={HeaderData && HeaderData.Reference}
                        class="form-control"
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
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
                        defaultValue={HeaderData && HeaderData.Reference2}
                        class="form-control"
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
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
                        defaultValue={HeaderData && HeaderData.Reference3}
                        class="form-control"
                        onChange={(e) => {
                          valuechangefunction(e);
                        }}
                      ></input>
                    </div>
                    <br />
                    <br />
                  </CardGroup>
                  <CardGroup>
                    {getcopyfromdoctype ? (
                      <>
                        <div
                          style={{ width: "22rem", height: "auto" }}
                          onClick={GetItems}
                        >
                          <label>Charts Of Accounts</label>
                          <Select
                            isMulti
                            placeholder="Select"
                            options={ItemsDropDown} // Options to display in the dropdown
                            onChange={ItemsDropDownfunc} // Function will trigger on select event
                            // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </div>
                      </>
                    ) : null}
                    {getdirectdoctype ? (
                      <>
                        <div
                          style={{ width: "22rem", height: "auto" }}
                          onClick={Vendor}
                        >
                          <label>Business Partners</label>
                          <Select
                            isMulti
                            placeholder="Select"
                            options={ItemsDropDown} // Options to display in the dropdown
                            onChange={ItemsDropDownfunc} // Function will trigger on select event
                            // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </div>
                      </>
                    ) : null}
                  </CardGroup>
                </Container>
                <br />
                <br />
                <br />
                <br />
                <br />
              </DIV3>

              <DIV4>
                <Container></Container>
              </DIV4>
            </CardGroup>
            <Tabs
              defaultActiveKey="Contents"
              transition={false}
              id="noanim-tab-example"
            >
              <Tab eventKey="Contents" title="Contents">
                <div>
                  {PQDocumentLines && (
                    <Table responsive striped bordered hover id="table-to-xls">
                      {Array.isArray(PQDocumentLines) &&
                      PQDocumentLines.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th> #</th>
                            <th>G/L Acct/BP Code</th>
                            <th>G/L Acct/BP Name</th>
                            <th>Control Acct</th>
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
                        {PQDocumentLines.map((item, index) => (
                          // console.log(item)
                          <tr key={`${index}`}>
                            <TD>{index + 1}</TD>
                            <TD>{item.AccountCode}</TD>
                            <TD>{ItemsDetails[item.AccountCode].Name}</TD>
                            <TD>{item.ControlAccount}</TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  id="text"
                                  name="Debit"
                                  defaultValue={item.Debit}
                                  class="form-control"
                                  aria-describedby="text"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  id="start"
                                  name="Credit"
                                  defaultValue={item.Credit}
                                  class="form-control"
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                  placeholder=""
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  option={OwnerDropdown}
                                  // type='date'
                                  // name='RequiredDate'
                                  // class='form-control'
                                  // onChange={e => {
                                  //   RequiredDateChange(e, item)
                                  // }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="Remarks"
                                  class="form-control"
                                  defaultValue={item.LineMemo}
                                  type="text"
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                  // readOnly='readOnly'
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="Ref_1"
                                  class="form-control"
                                  defaultValue={item.Reference1}
                                  type="text"
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                  // readOnly='readOnly'
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="Ref_3"
                                  class="form-control"
                                  type="text"
                                  defaultValue={item.Reference2}
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                  // readOnly='readOnly'
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "15em" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  placeholder={item.ProjectCode}
                                  options={PrProject} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      "ProjectCode"
                                    );
                                  }}
                                  // onSelect={Project} // Function will trigger on select event
                                  // onRemove={Project} //Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "15em" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  placeholder={item.CostingCode}
                                  options={PrCost} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      "CostingCode"
                                    );
                                  }}
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
                  {SelectedItems && (
                    <Table responsive striped bordered hover>
                      <TableHead>
                        <tr>
                          <th> #</th>
                          <th>G/L Acct/BP Code</th>
                          <th>G/L Acct/BP Name</th>
                          <th>Control Acct</th>
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
                      <tbody>
                        {SelectedItems.map((item, index) => (
                          <tr key={`${index}`}>
                            <TD>{index + 1}</TD>
                            <TD>
                              {ItemsDetails[item].Code ||
                                ItemsDetails[item].CardCode}
                            </TD>
                            <TD>
                              {ItemsDetails[item].Name ||
                                ItemsDetails[item].CardName}
                            </TD>
                            <TD>
                              {ItemsDetails[item].DebitorAccount
                                ? ItemsDetails[item].DebitorAccount
                                : null}
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  name="Debit"
                                  class="form-control"
                                  aria-describedby="text"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  type="number"
                                  id="start"
                                  name="Credit"
                                  class="form-control"
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  option={OwnerDropdown}
                                  // type='date'
                                  // name='RequiredDate'
                                  // class='form-control'
                                  // onChange={e => {
                                  //   RequiredDateChange(e, item)
                                  // }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="Remarks"
                                  class="form-control"
                                  type="text"
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="Ref_1"
                                  class="form-control"
                                  type="text"
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                  // readOnly='readOnly'
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "14rem", height: "auto" }}>
                                <input
                                  name="Ref_3"
                                  class="form-control"
                                  type="text"
                                  aria-describedby="date"
                                  onChange={(e) => {
                                    ontextChanged(e, item);
                                  }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "15em" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  placeholder="Select.."
                                  options={PrProject} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      "ProjectCode"
                                    );
                                  }}
                                  // onSelect={Project} // Function will trigger on select event
                                  // onRemove={Project} //Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: "15em" }}>
                                <Select
                                  menuPortalTarget={document.body}
                                  placeholder="Select.."
                                  options={PrCost} // Options to display in the dropdown
                                  onChange={(e) => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      "CostingCode"
                                    );
                                  }}
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
                  {/* Bottom Side+++++++++ */}
                </div>
              </Tab>
              <Tab eventKey="Attachment" title="Attachment">
                <input type="file" onChange={(e) => importExcel(e)} />
                {Array.isArray(data) && data.length > 0 ? (
                  <MaterialTable
                    title="Olympic Data"
                    data={data}
                    id="table-to-xls"
                    columns={colDefs}
                  />
                ) : null}
                <Attachment setattachmentresponse={setattachmentresponse} />
              </Tab>
            </Tabs>
            {/* Table+++++++++ */}
            <DIV3>
              <Container fluid></Container>
            </DIV3>
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
              <div style={{ marginLeft: "2rem" }}>
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
                  type="reset"
                >
                  Cancel
                </Button>
              </div>
            )}
          </Form>
        </>
      )}
    </>
  );
}
