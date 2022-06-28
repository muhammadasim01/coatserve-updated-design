import React from "react";
import { CONSTANTS, LINKS } from "../../../Utils";
import "./index.css";
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
import { MdDelete } from "react-icons/md";
import { PurchaseRequests } from "..";
const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function PurchaseRequest() {
  const alert = useAlert();
  const [loading, setloading] = React.useState(false);
  const [getautounitprice, setgetautounitprice] = React.useState();
  const [gettablecontroller, setgettablecontroller] =
    React.useState("selectedItems");
  const [selectedOwner, setselectedOwner] = React.useState();
  const [getdocentryforreport, setgetdocentryforreport] = React.useState();
  const [getdepartment, setgetdepartment] = React.useState();
  const [getemail, setgetemail] = React.useState();
  const [Frieght, setFrieght] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const classes = useStyles();
  const [bothbodies, setbothbodies] = React.useState(false);
  const [getdocumentname, setgetdocumentname] = React.useState("PRQ2");
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [getdocumenttype, setgetdocumenttype] = React.useState("1470000113");
  const [ModuleName, setModuleName] = React.useState("PurchaseRequests");
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
  const [ButtonName, setButtonName] = React.useState("Add");
  const [getStatus, setgetStatus] = React.useState();
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState();
  const [TaxCode, setTaxCode] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [SearchNumber, setSearchNumber] = React.useState("0");
  const [PrVendor, setPrVendor] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [showA, setShowA] = React.useState(false);
  const [update, setUpdate] = React.useState(1);
  const [valuechanger, setvaluechanger] = React.useState(true);

  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [UpdatePurchaseRequest, setUpdatePurchaseRequest] = React.useState();
  const [HeaderData, setHeaderData] = React.useState();
  const [getdocnumfromcomponent, setgetdocnumfromcomponent] = React.useState();
  const [ReqQty, setReqQty] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [SelectedItems, setSelectedItems] = React.useState([
    { ItemCode: "", UOM_Name: "" },
  ]);
  const [PRBody, setPRBody] = React.useState({});
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
  const [PrProject, setPrProject] = React.useState();
  const [PrCost, setPrCost] = React.useState();
  const [PrBuyer, setPrBuyer] = React.useState();
  const [OwnerDropdown, setOwnerDropdown] = React.useState();
  const [RequiredDate, setRequiredDate] = React.useState();
  const [PrWhse, setPrWhse] = React.useState();
  const [UserName, setUserName] = React.useState();
  const [Dept, setDept] = React.useState();
  const [PRRequiredDate, setPRRequiredDate] = React.useState();
  const [colDefs, setColDefs] = React.useState();
  const [data, setData] = React.useState();
  const [getserviceseries, setgetserviceseries] = React.useState();

  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesnumbring, setgetseriesnumbring] = React.useState();
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
  React.useEffect(() => {
    (async () => {
      setTestGetInstallationNumber("0020545074");
      setLiveGetInstallationNumber2("0021105591");
      today();
      compareDate();

      setgetdocumentname("PRQ2");
      setModuleName("PurchaseRequests");
      setgetdocumenttype("1470000113");
      let cook = await localStorage.getItem("cookie");
      const show = await localStorage.getItem("ShowBranches");
      let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
      if (formcontroller) {
        formcontroller.forEach(async (element) => {
          if (element.U_FormId === "OPRQ") {
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
      if (cook) GetItems(cook);
      // Whse(cook)
      Vendor(cook);
      Frieght1(cook);
      Buyer(cook);
      Project(cook);
      CostCentre(cook);
      TableTaxCode(cook);
      PurchaseRequest(cook);
      Department(cook);
    })();
  }, []);

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
  const DocLinesDropDownOnChange22 = (selectedItem, item, name) => {
    let itemDetail = SelectedItems;
    itemDetail[item][name] = selectedItem.value;
    setSelectedItems(itemDetail);
  };
  const importExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      //get first sheet
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      const headers = fileData[0];
      const heads = headers.map((head) => ({ title: head, field: head }));
      setColDefs(heads);
      // removing header
      fileData.splice(0, 1);
      setData(convertToJson(headers, fileData));
    };
    reader.readAsBinaryString(file);
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

  const GetRequesterDetail = async (cookie, api) => {
    // -------------------------    Request API GET DATA   -----------------------------------------------------------
    let response = {};

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
        dropdown.push({
          value: element.Code,
          label: element.Code + " : " + element.Name,
          item: element.eMail,
        });
      });
      await setRequesterCodeDropdown(dropdown);
      await setItemsDetails(ItemsDetails);
    }
  };
  const selectPR = async (item) => {
    setShow(false);
    setSelectedPRDocEntry(item);
    localStorage.setItem("getDocEntry", item.DocEntry);
    setgettablecontroller("PQDocumentLines");
    setPQDocumentLines(item.DocumentLines);
    if (item.DocumentStatus == "bost_Open") {
      setgetStatus("Open");
      setButtonName("Update");
    } else {
      setgetStatus("Close");
      setButtonName("Update");
    }
  };
  const apiProcessing = (res) => {
    if (res) {
      if (res.data.value) {
        return res.data.value;
      } else {
        alert.error(
          `Items Details Response Error : <-- ${res.data.error.message} -->`
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);

        return null;
      }
    }
  };
  const ItemsDropDownfunc = async (selectedList, index, name) => {
    // PriceListFromAPI(selectedList.item.SWW)
    let doclines = SelectedItems;
    doclines[index]["ItemCode"] = selectedList.value;
    doclines[index]["ItemName"] = selectedList.item.ItemName;
    doclines[index]["LineNum"] = index;
    doclines[index]["PurchaseUnit"] = selectedList.item.PurchaseUnit;
    doclines[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setSelectedItems(doclines);
  };
  // const ItemsDropDownfunc = async selectedList => {
  //   let list = []
  //   selectedList.forEach(element => {
  //     list.push(element.value)
  //   })
  //   await setSelectedItems(list)
  // }
  const requesterDropDownfunc = async (selectedOption) => {
    let prBody = PRBody;
    prBody["ReqType"] = `${selectedOption.value}`;
    setPRBody(prBody);
    let EIapi = LINKS.sap.MasterData.ActiveEmplyeeInfo;
    let cook = await localStorage.getItem("cookie");
    let response = {};
    let Uapi = LINKS.sap.MasterData.ActiveUsers;
    let api = "";
    if (selectedOption.value === 171) {
      api = EIapi;
      axios
        .post(API_TYPES.GET, { api: api, cookie: cook })
        .then(function (res) {
          if (res.data.value) {
            let dropdown = [];
            res.data.value.forEach((element) => {
              dropdown.push({
                value: element.EmployeeID,
                label: element.EmployeeID + " : " + element.FirstName,
                item: element.eMail,
              });
            });
            setRequesterCodeDropdown(dropdown);
            setItemsDetails(ItemsDetails);
          } else {
            alert(
              `Items Details Response Error : <-- ${res.data.error.message.value} -->`
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (selectedOption.value === 12) {
      api = Uapi;
      axios
        .post(API_TYPES.GET, { api: api, cookie: cook })
        .then(function (res) {
          if (res.data.value) {
            let dropdown = [];
            res.data.value.forEach((element) => {
              dropdown.push({
                value: element.UserCode,
                label: element.UserCode + " : " + element.UserName,
                item: element.eMail,
              });
            });
            setRequesterCodeDropdown(dropdown);
            setItemsDetails(ItemsDetails);
          } else {
            alert(
              `Items Details Response Error : <-- ${res.data.error.message.value} -->`
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const RequesterCodeDropdownfunc = async (selectedList, selectedItem) => {
    console.log("selectedList", selectedList);
    let prBody = PRBody;
    prBody["Requester"] = `${selectedList.value}`;
    prBody["RequesterEmail"] = `${selectedList.item}`;
    setgetemail(prBody["RequesterEmail"]);
    setPRBody(prBody);
  };
  const RequiredQuantity = (e, item) => {
    let RequiredQuantity = SelectedItems;
    RequiredQuantity[item][e.target.name] = parseInt(e.target.value);
    setSelectedItems(RequiredQuantity);
  };
  {
    /* Table API's Call++++++++ */
  }
  const GetItems = async () => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = LINKS.sap.MasterData.ActivePurchaseItems;
    // let SAPapi = `Items?$select=ItemCode,ItemName,ItemsGroupCode,ItemWarehouseInfoCollection,PurchaseUnit&$filter=PurchaseItem eq 'tYES' and Valid eq 'tYES' and CapitalizationDate eq Null&$orderby=ItemCode &$top=10`

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie,
      })
      .then(function (ItemsResponse) {
        console.log("ItemsResponse", ItemsResponse);
        ItemsResponseResult = ItemsResponse;
      })
      .catch(function (error) {
        console.log(error);
      });
    let res = apiProcessing(ItemsResponseResult);
    console.log("res", res);
    if (res) {
      let ItemsDropDown = [];
      let ItemsDetails = [];
      res.forEach((element) => {
        ItemsDetails[element.ItemCode] = {
          ItemCode: element.ItemCode,
          ItemName: element.ItemName,
          PurchaseUnit: element.BuyUnitMsr,
          FreeText: element.FreeText,
          RequiredQuantity: element.RequiredQuantity,
          Quantity: element.RequiredQuantity,
          LineVendor: element.LineVendor,
          CostingCode: element.CostingCode,
          SalesPersonCode: element.SalesPersonCode,
          WarehouseCode: element.WarehouseCode,
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
    let SAPapi = LINKS.sap.MasterData.Departments;
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
          setPrVendor(ItemsDropDown);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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
  const deleteobject = (e, item, index) => {
    var newArrayList = [];
    let obj = SelectedItems;
    var filtered = obj.filter(function (el) {
      return el != null || el != [];
    });
    filtered[index]["LineNum"] = index;
    newArrayList = filtered.filter((element) => element.LineNum != index);
    newArrayList["update"] = update + 1;
    console.log("newArrayList", newArrayList);
    setSelectedItems(newArrayList);
    setUpdate(update + 1);
  };
  const Buyer = async (cook) => {
    // -------------------------    Buyer API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let SAPapi = LINKS.sap.MasterData.ActiveSalesEmployee;
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
        //   alert.error("Provided Key Does not match")
        //   window.location.href="/DisabledHomeScreen";
        //   }
        // }
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
          api: `PurchaseRequests(${id})`,
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
  const submitPatchPR = async () => {
    let docLines = [];
    PQDocumentLines.forEach((element) => {
      docLines.push({
        ItemCode: element.ItemCode,
        FreeText: element.FreeText,
        RequiredDate: element.RequiredDate,
        RequiredQuantity: element.RequiredQuantity,
        Quantity: element.RequiredQuantity,
        LineVendor: element.LineVendor,
        CostingCode: element.CostingCode,
        ProjectCode: element.ProjectCode,
        SalesPersonCode: element.SalesPersonCode,
        WarehouseCode: element.WarehouseCode,
        DistributeExpense: "tYES",
        DocumentLineAdditionalExpenses: [
          {
            ExpenseCode: 1,
            LineTotal: element.FreightCharges,
          },
        ],
      });
    });
    let body = {
      Comments: PRBody.Comments,
      DocumentLines: docLines,
      AttachmentEntry: attachmentresponse,
    };
    Patch(HeaderData.DocEntry, body);
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
      let sapAPi = `PurchaseRequests?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `PurchaseRequests?$orderby=DocNum`;
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
    let sapAPi = `PurchaseRequests?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0]);
        if (res.data.value[0].DocumentStatus == "bost_Open") {
          setgetStatus("Open");
        } else {
          setgetStatus("Close");
        }
        setgettablecontroller("PQDocumentLines");
        setPQDocumentLines(res.data.value[0].DocumentLines);
        localStorage.setItem("getDocEntry", res.data.value[0].DocEntry);
        setgetdocentryforreport(res.data.value[0].DocEntry);
        if (HeaderData != "") {
          setButtonName("Update");
        }
        if (res.data.value[0].ReqType === "12") {
          setUserName("User");
        } else if (res.data.value[0].ReqType !== "12") {
          setUserName("Employee");
        }
      })
      .catch({});
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
  const SearchPRNumberFilterFromComponent = async () => {
    let obj = TextItemChangedObject;
    const api = `${LINKS.api}/GetApi`;
    let sapAPi = `PurchaseRequests?$filter=DocNum eq ${getdocnumfromcomponent}`;

    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {})
      .catch({});
  };
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitPR();
    } else if (ButtonName != "Add") {
      submitPatchPR();
    }
  };
  const submitPR = async () => {
    let DocLines = [];
    let body = PRBody;
    SelectedItems.forEach((element) => {
      if (element.ItemCode) {
        DocLines.push({
          ItemCode: element.ItemCode,
          FreeText: element.FreeText,
          RequiredQuantity: element.RequiredQuantity,
          RequiredDate: element.RequiredDate,
          Quantity: element.RequiredQuantity,
          LineVendor: element.LineVendor,
          ProjectCode: element.PojectCode,
          CostingCode: element.CostingCode,
          SalesPersonCode: element.SalesPersonCode,
          WarehouseCode: element.WarehouseCode,
          DistributeExpense: "tYES",
          DocumentLineAdditionalExpenses: [
            {
              ExpenseCode: 1,
              LineTotal: element.FreightCharges,
            },
          ],
        });
      }
    });
    body["DocumentLines"] = DocLines;
    body["DocDate"] = PRBody.DocDate ? PRBody.DocDate : currentDate;
    body["DocDueDate"] = PRBody.DocDueDate ? PRBody.DocDueDate : currentDate;
    // body['TaxDate'] = PRBody.TaxDate
    body["RequriedDate"] = PRBody.RequriedDate
      ? PRBody.RequriedDate
      : currentDate;
    body["Comments"] = PRBody.Comments;
    body["DocumentsOwner"] = selectedOwner;
    body["ReqType"] = PRBody.ReqType;
    body["Requester"] = PRBody.Requester;
    body["RequesterEmail"] = PRBody.RequesterEmail;
    body["RequesterDepartment"] = getdepartment;
    body["Series"] = getseriesvalue;
    body["AttachmentEntry"] = attachmentresponse;
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
          api: LINKS.sap.PurchaseRequest.PostPurchaseRequests,
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
  const DiscountontextChanged = (e, item) => {
    let SelectedDocLines = [];
    let itemDetail = SelectedItems;
    itemDetail[item][e.target.name] = e.target.value;
    itemDetail[item]["PriceAfterDiscount"] =
      itemDetail[item].UnitPrice -
      (itemDetail[item].UnitPrice * itemDetail[item].Discount) / 100;
    itemDetail[item]["GrossPriceAfterDiscount"] =
      itemDetail[item].PriceAfterDiscount;
    itemDetail[item]["Total_LC"] =
      Number(itemDetail[item].PriceAfterDiscount) *
      Number(itemDetail[item].Quantity);
    itemDetail[item]["GrossTotal"] =
      Number(itemDetail[item].GrossPriceAfterDiscount) *
      Number(itemDetail[item].Quantity);

    itemDetail[item][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setSelectedItems(itemDetail);
  };
  const unitPriceontextChanged = (e, item) => {
    let SelectedDocLines = [];
    let itemDetail = SelectedItems;
    itemDetail[item][e.target.name] = e.target.value;
    itemDetail[item]["PriceAfterDiscount"] = itemDetail[item].UnitPrice;
    itemDetail[item]["GrossPriceAfterDiscount"] = itemDetail[item].UnitPrice;
    itemDetail[item]["Total_LC"] =
      itemDetail[item].UnitPrice * itemDetail[item].Quantity;
    itemDetail[item]["GrossTotal"] =
      itemDetail[item].UnitPrice * itemDetail[item].Quantity;
    itemDetail[item][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    console.log("itemDetail", itemDetail);
    setSelectedItems(itemDetail);
  };
  const DocLinesDropDownOnChange2 = (selectedItem, item, name) => {
    let itemDetail = SelectedItems;
    let SelectedDocLines = [];
    itemDetail[item][name] = selectedItem.value;
    itemDetail[item]["TaxAmount"] = Number(
      selectedItem.item.VatGroups_Lines[0].Rate
    );
    itemDetail[item]["TaxTotalAmount"] =
      selectedItem.item.VatGroups_Lines[0].Rate *
      Number(itemDetail[item].Quantity);
    itemDetail[item]["GrossPriceAfterDiscount"] =
      itemDetail[item].PriceAfterDiscount + itemDetail[item].TaxAmount;
    itemDetail[item]["Total_LC"] =
      Number(
        itemDetail[item].PriceAfterDiscount * Number(itemDetail[item].Quantity)
      ) + Number(itemDetail[item].TaxAmount);
    itemDetail[item]["GrossTotal"] =
      itemDetail[item].GrossPriceAfterDiscount *
      Number(itemDetail[item].Quantity);

    itemDetail[item][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setSelectedItems(itemDetail);
  };
  const testing = (e, item) => {
    let SelectedDocLines = [];
    let itemDetail = SelectedItems;
    itemDetail[item][e.target.name] = e.target.value;
    itemDetail[item]["UnitPrice"] =
      getautounitprice &&
      getautounitprice[itemDetail[item]["ItemCode"]].Price +
        (getautounitprice &&
          getautounitprice[itemDetail[item]["ItemCode"]].Price *
            getautounitprice &&
          getautounitprice[itemDetail[item]["ItemCode"]].DiscountPercent / 100);
    itemDetail[item]["DiscountPercent"] =
      getautounitprice &&
      getautounitprice[itemDetail[item]["ItemCode"]].DiscountPercent;
    // itemDetail[item]["AfterDiscount"] =(itemDetail[item].No_Cylinder * itemDetail[item].UnitPrice - (itemDetail[item].No_Cylinder * itemDetail[item].Discount * (itemDetail[item].Discount / 100)))
    itemDetail[item]["Total_LC"] =
      getautounitprice &&
      getautounitprice[itemDetail[item]["ItemCode"]].Price *
        itemDetail[item].Quantity;

    // SelectedItems.forEach(element => {
    //   SelectedDocLines.push({
    //     Total_LC: ItemsDetails[element]['Total_LC'],
    //   })
    // })
    // let sum = 0
    // SelectedDocLines.forEach(element => {
    //         sum = sum + element.Total_LC
    // })
    itemDetail[item][`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setSelectedItems(itemDetail);
  };
  const PostInSecondDB = async (body) => {
    let cook = await localStorage.getItem("secondcookie");
    if (cook) {
      await axios
        .post(API_TYPES.SECONDPOST, {
          body: JSON.stringify(body),
          api: LINKS.sap.PurchaseRequest.PostPurchaseRequests,
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
    let itemDetail = SelectedItems;
    itemDetail[item][name] = selectedItem.value;
    setSelectedItems(itemDetail);
  };
  const FindDocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index][name] = selectedItem.value;
    setPQDocumentLines(itemDetail);
  };
  const ontextChanged = (e, item) => {
    let itemDetail = SelectedItems;
    itemDetail[item][e.target.name] = e.target.value;
    setSelectedItems(itemDetail);
  };
  const onpatchtextChanged = (e, index) => {
    let doclines = PQDocumentLines;
    doclines[index][e.target.name] = e.target.value;
    setPQDocumentLines(doclines);
  };
  const RequiredDateChange = (e, item) => {
    let itemDetail = SelectedItems;
    itemDetail[item]["RequiredDate"] = e.target.value;
    setRequiredDate(itemDetail);
  };
  const ontextChanged2222 = (e, item) => {
    let itemDetail = SelectedItems;
    itemDetail[item][e.target.name] = e.target.value;
    setSelectedItems(itemDetail);
  };
  const OnPatchRequiredDateChange = (e, index) => {
    let doclines = PQDocumentLines;
    doclines[index]["RequiredDate"] = e.target.value;
    setPRRequiredDate(doclines);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
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
              value: element.ExpensCode,
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
  return (
    <>
      <NavBar
        getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
        HeaderData={HeaderData}
        getdocumentname={getdocumentname}
        setgetdocnumfromcomponent={setgetdocnumfromcomponent}
        setgetserviceseries={setgetserviceseries}
      />
      {localStorage.getItem("documentcontroller") === "N" ? (
        <h1>You are not permited to perform this action</h1>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Purchase Request</h1>
          <Modal show={show1} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Purchase Request List</Modal.Title>
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
                            <p style={{ background: "gray", color: "white" }}>
                              Open
                            </p>
                          ) : item.DocumentStatus === "bost_Close" ? (
                            <p style={{ background: "red", color: "white" }}>
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
          <Form onSubmit={handleSubmit}>
            <CardGroup>
              <DIV3>
                <Container fluid>
                  <label>Requester</label>
                  <div style={{ width: "23.5rem", height: "auto" }}>
                    <Select
                      placeholder={HeaderData && HeaderData.ReqType}
                      options={[
                        { label: "User", value: 12 },
                        { label: "Employee", value: 171 },
                      ]} // Options to display in the dropdown
                      onChange={requesterDropDownfunc} // Function will trigger on select event
                      // onRemove={requesterDropDownfunc}
                      displayValue="label" // Property name to display in the dropdown options
                    />
                  </div>

                  <label>Select Requester</label>
                  <div style={{ width: "23.5rem", height: "auto" }}>
                    <Select
                      placeholder={HeaderData && HeaderData.RequesterName}
                      options={RequesterCodeDropdown} // Options to display in the dropdown
                      onChange={RequesterCodeDropdownfunc} // Function will trigger on select event
                      // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <label>Department</label>
                  <div style={{ width: "23.5rem", height: "auto" }}>
                    <Select
                      placeholder={HeaderData && HeaderData.RequesterDepartment}
                      options={Dept} // Options to display in the dropdown
                      onChange={(e) => {
                        setgetdepartment(e.value);
                      }} // Function will trigger on select event
                      // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>

                  <div style={{ width: "23.5rem", height: "auto" }}>
                    <label>Email</label>
                    <input
                      type="email"
                      readOnly="readOnly"
                      class="form-control"
                      id="exampleInputEmail1"
                      defaultValue={
                        getemail
                          ? getemail
                          : HeaderData && HeaderData.RequesterEmail
                      }
                      aria-describedby="emailHelp"
                      // placeholder={HeaderData && HeaderData.RequesterEmail}
                    ></input>
                  </div>
                  <br />

                  {/* <label>Select Item(s)</label>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                  <Select
                    isMulti
                    placeholder='Select Items'
                    options={ItemsDropDown} // Options to display in the dropdown
                    onChange={ItemsDropDownfunc} // Function will trigger on select event
                    // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                    displayValue='name' // Property name to display in the dropdown options
                  />
              </div>
              <br /> */}
                </Container>
              </DIV3>
              <DIV4>
                <Container></Container>
              </DIV4>
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
                    className="Request"
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
                      <svg class="svg-icon10" viewBox="0 0 20 20">
                        <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                      </svg>
                    </a>
                    <input
                      type="Number"
                      placeholder="Number"
                      name={"SearchPRNumber"}
                      class="form-control10"
                      onChange={(e) => {
                        ontextItemChanged(e);
                        setSearchNumber(e.target.value);
                      }}
                    />
                  </div>
                  <br />
                  {/* <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem'}}>
                <label>No.</label>
                <input
                  type='text'
                  readOnly='readOnly'
                  defaultValue={HeaderData && HeaderData.DocNum}
                  class='form-control'
                />
              </div> */}

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
                      defaultValue={
                        HeaderData && HeaderData.DocDate
                          ? HeaderData && HeaderData.DocDate
                          : currentDate
                      }
                      name="DocDate"
                      class="form-control"
                      onChange={(e) => {
                        dateChange(e);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "23.5rem",
                      height: "auto",
                      marginLeft: "3rem",
                    }}
                  >
                    <label>Valid Date</label>
                    <input
                      type="date"
                      defaultValue={
                        HeaderData && HeaderData.DocDueDate
                          ? HeaderData && HeaderData.DocDueDate
                          : currentDate
                      }
                      name="DocDueDate"
                      class="form-control"
                      onChange={(e) => {
                        dateChange(e);
                      }}
                    />
                  </div>
                  {/* <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
                <label>Document Date</label>
                <input
                  type='date'
                  defaultValue={HeaderData && HeaderData.TaxDate}
                  name='TaxDate'
                  class='form-control'
                  onChange={e => {
                    dateChange(e)
                  }}
                />
              </div> */}
                  <div
                    style={{
                      width: "23.5rem",
                      height: "auto",
                      marginLeft: "3rem",
                    }}
                  >
                    <label>Required Date</label>
                    <input
                      type="date"
                      defaultValue={
                        HeaderData && HeaderData.RequriedDate
                          ? HeaderData && HeaderData.RequriedDate
                          : currentDate
                      }
                      name="RequriedDate"
                      class="form-control"
                      onChange={(e) => {
                        RequriedDateChange(e);
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
            <Tabs
              defaultActiveKey="Contents"
              transition={false}
              id="noanim-tab-example"
            >
              <Tab eventKey="Contents" title="Contents">
                <div>
                  {gettablecontroller === "selectedItems" ? (
                    <Table responsive striped bordered hover>
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Bar Code</th>
                          <th>Item No.</th>
                          <th>Item Description</th>
                          <th>UoM Name</th>
                          <th>Free Text</th>
                          <th>Required Date</th>
                          {/* <th>Open Qty</th> */}
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Discount</th>
                          <th>Tax Code</th>
                          <th>Tax Percentage</th>
                          <th>Price after Discount</th>
                          <th>Gross Price after Disc.</th>
                          <th>Freight Code</th>
                          <th>Freight 1</th>
                          <th>Tax Amount</th>
                          <th>Gross Total</th>
                          <th>Total(LC)</th>
                          <th>Whse</th>
                          <th>Project</th>
                          <th>Buyer</th>
                          <th>Cost Centre</th>
                        </tr>
                      </TableHead>
                      <tbody>
                        {SelectedItems &&
                          SelectedItems.map((item, index) => (
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
                                <div
                                  style={{ width: "13.5rem", height: "auto" }}
                                >
                                  {ItemsDropDown && (
                                    <Select
                                      menuPortalTarget={document.body}
                                      value={ItemsDropDown.filter(
                                        (option) =>
                                          option.value === item.ItemCode
                                      )}
                                      placeholder={
                                        item.ItemCode ? item.ItemCode : "Select"
                                      }
                                      options={ItemsDropDown} // Options to display in the dropdown
                                      onChange={(e) => {
                                        ItemsDropDownfunc(e, index, "ItemCode");
                                        setSelectedItems([
                                          ...SelectedItems,
                                          [],
                                        ]);
                                      }} // Function will trigger on select event
                                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                                      displayValue="name" // Property name to display in the dropdown options
                                    />
                                  )}
                                </div>
                              </TD>
                              <TD>{item.ItemName}</TD>
                              <TD>{item.PurchaseUnit}</TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="text"
                                    name="FreeText"
                                    class="form-control"
                                    aria-describedby="Requesterid"
                                    value={item.ItemCode ? item.FreeText : ""}
                                    onChange={(e) => {
                                      ontextChanged(e, index);
                                    }}
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="date"
                                    name="RequiredDate"
                                    onChange={(e) => {
                                      ontextChanged2222(e, index);
                                    }}
                                    // readOnly="readOnly"
                                    class="form-control"
                                    aria-describedby="Requesterid"
                                    value={currentDate}
                                  />
                                </div>
                              </TD>
                              {/* <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      type='number'
                      name='OpenQty'
                      // onChange={e => {
                      //   ontextChanged2222(e, item)
                      // }}
                      readOnly="readOnly"
                      class='form-control'
                      aria-describedby='Requesterid'
                      defaultValue={ItemsDetails[item].ItemWarehouseInfoCollection[0].InStock}
                    />
                  </div>
                </TD> */}

                              <TD>
                                {" "}
                                {getautounitprice &&
                                getautounitprice[item.ItemCode] ? (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="Quantity"
                                      // readOnly="readOnly"
                                      onChange={(e) => {
                                        testing(e, index);
                                      }}
                                      value={item.ItemCode ? item.Quantity : ""}
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="Quantity"
                                      // readOnly="readOnly"
                                      onChange={(e) => {
                                        ontextChanged(e, index);
                                      }}
                                      value={item.ItemCode ? item.Quantity : ""}
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                    />
                                  </div>
                                )}
                              </TD>
                              <TD>
                                {getautounitprice &&
                                getautounitprice[item.ItemCode] ? (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="UnitPrice"
                                      readOnly
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode
                                          ? getautounitprice &&
                                            getautounitprice[item.ItemCode]
                                              .Price
                                          : ""
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="UnitPrice"
                                      onChange={(e) => {
                                        unitPriceontextChanged(e, index);
                                      }}
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode ? item.UnitPrice : ""
                                      }
                                    />
                                  </div>
                                )}
                              </TD>
                              <TD>
                                {" "}
                                {getautounitprice &&
                                getautounitprice[item.ItemCode] ? (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="Discount"
                                      readOnly
                                      class="form-control"
                                      aria-describedby="Requesterid"
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
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="Discount"
                                      onChange={(e) => {
                                        DiscountontextChanged(e, index);
                                      }}
                                      // readOnly="readOnly"
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      // defaultValue={item.RemainingOpenQuantity}
                                    />
                                  </div>
                                )}
                              </TD>
                              <TD>
                                {getseriesnumbring == "2" ? (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    {TaxCode && (
                                      <Select
                                        value={TaxCode.filter(
                                          (option) => option.value === "P2"
                                        )}
                                        menuPortalTarget={document.body}
                                        placeholder="Select.."
                                        options={TaxCode} // Options to display in the dropdown
                                        onChange={(e) => {
                                          DocLinesDropDownOnChange2(
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
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <Select
                                      menuPortalTarget={document.body}
                                      placeholder="Select.."
                                      options={TaxCode} // Options to display in the dropdown
                                      onChange={(e) => {
                                        DocLinesDropDownOnChange2(
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
                                    name="TaxCode"
                                    readOnly="readOnly"
                                    class="form-control"
                                    aria-describedby="Requesterid"
                                    value={
                                      item.ItemCode ? item.TaxAmount : null
                                    }
                                  />
                                </div>
                              </TD>
                              <TD>
                                {" "}
                                {getautounitprice &&
                                getautounitprice[item.ItemCode] ? (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="PriceafterDiscount"
                                      onChange={(e) => {
                                        ontextChanged2222(e, index);
                                      }}
                                      readOnly="readOnly"
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode
                                          ? getautounitprice &&
                                            getautounitprice[item.ItemCode]
                                              .Price
                                          : ""
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="PriceafterDiscount"
                                      onChange={(e) => {
                                        ontextChanged2222(e, index);
                                      }}
                                      readOnly="readOnly"
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode
                                          ? item.PriceAfterDiscount
                                          : ""
                                      }
                                    />
                                  </div>
                                )}
                              </TD>
                              <TD>
                                {" "}
                                {getautounitprice &&
                                getautounitprice[item.ItemCode] ? (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="GrossPriceafterDisc"
                                      // onChange={e => {
                                      //   ontextChanged2222(e, item)
                                      // }}
                                      readOnly="readOnly"
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode
                                          ? Number(item.TaxRate) +
                                            Number(
                                              getautounitprice &&
                                                getautounitprice[item.ItemCode]
                                                  .Price
                                            )
                                          : ""
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="GrossPriceafterDisc"
                                      // onChange={e => {
                                      //   ontextChanged2222(e, item)
                                      // }}
                                      readOnly="readOnly"
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode
                                          ? item.GrossPriceAfterDiscount
                                          : ""
                                      }
                                    />
                                  </div>
                                )}
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <Select
                                    menuPortalTarget={document.body}
                                    placeholder="Select.."
                                    options={Frieght} // Options to display in the dropdown
                                    onChange={(e) => {
                                      DocLinesDropDownOnChange22(
                                        e,
                                        index,
                                        "FreightCode"
                                      );
                                    }}
                                    // onSelect={CostCentre} // Function will trigger on select event
                                    // onRemove={CostCentre} //Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="number"
                                    name="Freight"
                                    onChange={(e) => {
                                      unitPriceontextChanged(e, index);
                                    }}
                                    // readOnly="readOnly"
                                    class="form-control"
                                    aria-describedby="Requesterid"
                                    // defaultValue={item.RemainingOpenQuantity}
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="number"
                                    name="TaxTotalAmount"
                                    // onChange={e => {
                                    //   ontextChanged2222(e, item)
                                    // }}
                                    readOnly="readOnly"
                                    class="form-control"
                                    aria-describedby="Requesterid"
                                    value={item.ItemCode ? item.TaxAmount : ""}
                                  />
                                </div>
                              </TD>
                              <TD>
                                {getautounitprice &&
                                getautounitprice[item.ItemCode] ? (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="GrossTotal"
                                      // onChange={e => {
                                      //   ontextChanged2222(e, item)
                                      // }}
                                      readOnly="readOnly"
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode
                                          ? (item.TaxAmount +
                                              getautounitprice &&
                                              getautounitprice[item.ItemCode]
                                                .Price) * item.Quantity
                                          : ""
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div
                                    style={{ width: "14rem", height: "auto" }}
                                  >
                                    <input
                                      type="number"
                                      name="GrossTotal"
                                      // onChange={e => {
                                      //   ontextChanged2222(e, item)
                                      // }}
                                      readOnly="readOnly"
                                      class="form-control"
                                      aria-describedby="Requesterid"
                                      value={
                                        item.ItemCode ? item.GrossTotal : ""
                                      }
                                    />
                                  </div>
                                )}
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="number"
                                    name="Total"
                                    readOnly="readOnly"
                                    class="form-control"
                                    aria-describedby="Requesterid"
                                    value={item.ItemCode ? item.Total_LC : ""}
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  {PrWhse && (
                                    <Select
                                      menuPortalTarget={document.body}
                                      value={PrWhse.filter(
                                        (option) => option.value === item.Whse
                                      )}
                                      options={PrWhse} // Options to display in the dropdown
                                      onChange={(e) => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          "Whse"
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
                                <div style={{ width: "14rem", height: "auto" }}>
                                  {PrProject && (
                                    <Select
                                      menuPortalTarget={document.body}
                                      value={PrProject.filter(
                                        (option) =>
                                          option.value === item.Project
                                      )}
                                      placeholder="Select.."
                                      options={PrProject} // Options to display in the dropdown
                                      onChange={(e) => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          "Project"
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
                                <div style={{ width: "14rem", height: "auto" }}>
                                  {PrBuyer && (
                                    <Select
                                      menuPortalTarget={document.body}
                                      value={PrBuyer.filter(
                                        (option) => option.value === item.Buyer
                                      )}
                                      placeholder="Select.."
                                      options={PrBuyer} // Options to display in the dropdown
                                      onChange={(e) => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          "Buyer"
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
                                <div style={{ width: "14rem", height: "auto" }}>
                                  {PrCost && (
                                    <Select
                                      menuPortalTarget={document.body}
                                      value={PrCost.filter(
                                        (option) =>
                                          option.value === item.CostCentre
                                      )}
                                      placeholder="Select.."
                                      options={PrCost} // Options to display in the dropdown
                                      onChange={(e) => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          "CostCentre"
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
                          ))}
                      </tbody>
                    </Table>
                  ) : (
                    <Table responsive striped bordered hover id="table-to-xls">
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
                            <th>Required Qty</th>
                            <th>Required Date</th>
                            <th>Open Qty</th>
                            <th>Whse</th>
                            <th>Vendor</th>
                            <th>Project</th>
                            <th>Cost Centre</th>
                            <th>Buyer</th>
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
                                    class="form-control"
                                    id="Requesterid"
                                    name="FreeText"
                                    aria-describedby="Requesterid"
                                    defaultValue={item.FreeText}
                                    onChange={(e) => {
                                      onpatchtextChanged(e, index);
                                    }}
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="number"
                                    class="form-control"
                                    id="Requesterid"
                                    aria-describedby="Requesterid"
                                    defaultValue={item.Quantity}
                                    onChange={(e) => {
                                      onpatchtextChanged(e, index);
                                    }}
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="date"
                                    name="RequiredDate"
                                    id="Requesterid"
                                    aria-describedby="Requesterid"
                                    defaultValue={item.RequiredDate}
                                    class="form-control"
                                    onChange={(e) => {
                                      OnPatchRequiredDateChange(e, index);
                                    }}
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem", height: "auto" }}>
                                  <input
                                    type="number"
                                    readOnly="readOnly"
                                    class="form-control"
                                    id="Requesterid"
                                    aria-describedby="Requesterid"
                                    defaultValue={item.RemainingOpenQuantity}
                                  />
                                </div>
                              </TD>
                              <TD>
                                <div style={{ width: "14rem" }}>
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
                                <div style={{ width: "15em" }}>
                                  {PrVendor && (
                                    <Select
                                      menuPortalTarget={document.body}
                                      value={PrVendor.filter(
                                        (option) =>
                                          option.value === item.LineVendor
                                      )}
                                      placeholder="Select.."
                                      options={PrVendor} // Options to display in the dropdown
                                      onChange={(e) => {
                                        FindDocLinesDropDownOnChange(
                                          e,
                                          index,
                                          "LineVendor"
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
                                <div style={{ width: "14rem" }}>
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
                                        FindDocLinesDropDownOnChange(
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
                                <div style={{ width: "14rem" }}>
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
                                        FindDocLinesDropDownOnChange(
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
                                <div style={{ width: "14rem" }}>
                                  {PrBuyer && (
                                    <Select
                                      menuPortalTarget={document.body}
                                      value={PrBuyer.filter(
                                        (option) =>
                                          option.value === item.SalesPersonCode
                                      )}
                                      placeholder="Select.."
                                      options={PrBuyer} // Options to display in the dropdown
                                      onChange={(e) => {
                                        FindDocLinesDropDownOnChange(
                                          e,
                                          index,
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
              <Tab eventKey="Import_Data" title="Import_Data">
                <input type="file" onChange={(e) => importExcel(e)} />
                <MaterialTable
                  title=""
                  data={data}
                  id="table-to-xls"
                  columns={colDefs}
                />
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls"
                  filename="PurchaseQuotation"
                  sheet="PurchaseQuotation"
                  buttonText="XLS"
                />
              </Tab>
            </Tabs>
            {/* Table+++++++++ */}
            <DIV3>
              <Container fluid>
                <label for="exampleFormControlTextarea1">Owner</label>
                <div
                  style={{ width: "23.5rem", height: "auto" }}
                  onClick={Owner}
                >
                  <Select
                    placeholder={HeaderData && HeaderData.Owner}
                    options={OwnerDropdown}
                    onChange={(e) => setselectedOwner(e.value)} // Options to display in the dropdown
                    // onSelect={Owner} // Function will trigger on select event
                    // onRemove={Owner} //Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Remarks</label>
                  <div style={{ width: "23.5rem" }}>
                    <textarea
                      defaultValue={HeaderData && HeaderData.Comments}
                      type="text"
                      class="form-control rounded-0"
                      id="exampleFormControlTextarea1"
                      name="Comments"
                      rows="3"
                      onChange={(e) => {
                        CommentsFun(e);
                      }}
                    ></textarea>
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
          </Form>
        </>
      )}
    </>
  );
}
