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
  const alert = useAlert();
  const [SelectShow, setSelectShow] = React.useState();
  const [currentDate, setcurrentDate] = React.useState();
  const [getComments, setgetComments] = React.useState();
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState();
  const [DeliveryDate, setDeliveryDate] = React.useState();
  const [bothbodies, setbothbodies] = React.useState(false);
  const [DocStatus, setDocStatus] = React.useState();
  const [getnextnumber, setgetnextnumber] = React.useState();
  const [getseriesvalue, setgetseriesvalue] = React.useState();
  const [CustomerRefNo, setCustomerRefNo] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState();
  const [DocDate, setDocDate] = React.useState();
  const [getdocumentstatus, setgetdocumentstatus] = React.useState();
  const [show, setShow] = React.useState(false);
  const [HeaderData, setHeaderData] = React.useState();
  const [OpenQty, setOpenQty] = React.useState();
  const [SelectedCP, setSelectedCP] = React.useState();
  const [Customer, setCustomer] = React.useState();
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({});
  const [ButtonName, setButtonName] = React.useState();
  const [ItemsDropDown, setItemsDropDown] = React.useState();
  const [ItemsDetails, setItemsDetails] = React.useState();
  const [PRBody, setPRBody] = React.useState({});
  const [DelDate, setDelDate] = React.useState();
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState();
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
  const [Disply, setDisply] = React.useState(false);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([]);
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState();
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Discount, setDiscount] = React.useState();
  const [Tax, setTax] = React.useState();
  const [total, setTotal] = React.useState();
  const [TotalGross, setTotalGross] = React.useState();
  const [BottomTax, setBottomTax] = React.useState();
  const [gettaxtotal, setgettaxtotal] = React.useState();
  const [BottomDiscount, setBottomDiscount] = React.useState();
  const [TotalPayment, setTotalPayment] = React.useState();
  const [DiscountTotal, setDiscountTotal] = React.useState();
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState();
  const [totalFreight, setTotalFreight] = React.useState();
  const [disc, setdisc] = React.useState();
  const [ShipDate, setShipDate] = React.useState();
  const [getTaxDate, setgetTaxDate] = React.useState();
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"));
  const [showA, setShowA] = React.useState(false);
  const [currentComDate, setcurrentComDate] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
  );
  const [getdocumentname, setgetdocumentname] = React.useState("RDN2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("16");
  const [ModuleName, setModuleName] = React.useState("Returns");
  const [getserviceseries, setgetserviceseries] = React.useState();
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  };

  React.useEffect(async () => {
    today();
    setgetdocumentname("RDN2");
    setModuleName("Returns");
    setgetdocumenttype("16");
    setButtonName("Add");
    setSearchNumber("0");
    compareDate();
    let cook = await localStorage.getItem("cookie");
    const show = await localStorage.getItem("ShowBranches");
    let formcontroller = await JSON.parse(localStorage.getItem("AuthData"));
    if (formcontroller) {
      formcontroller.forEach(async (element) => {
        if (element.U_FormId === "ORDN") {
          await localStorage.setItem(
            "documentcontroller",
            element.U_Authorization
          );
        }
      });
    }
    if (showA == "true") {
      setShowA(true);
      compareDate();
      await localStorage.removeItem("ShowBranches");
    }
    if (cook) GetItems(cook);
    BusinessPartners(cook);
    Project(cook);
    CostCentre(cook);
    Buyer(cook);
    Owner(cook);
    OwnerPurchaseRequest(cook);
    Frieght1(cook);
    TableTaxCode(cook);
  }, []);
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem("cookie");
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `Returns(${id})`,
          cookie: cook,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success("Form Submitted Sucessfully");
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
  const DocDateChange = async (e) => {
    setDocDate(e.target.value);
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
  const ShipDateChange = (e, index, PrReIndex) => {
    let itemDetail = PQDocumentLines;
    itemDetail[PrReIndex].DocumentLines[index]["ShipDate"] = e.target.value;
    setShipDate(itemDetail);
  };
  const SearchShipDateChange = (e, index, name) => {
    let itemDetail = PQDocumentLines;
    itemDetail[index]["ShipDate"] = e.target.value;
    setShipDate(itemDetail);
  };
  const OwnerPurchaseRequest = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.emplyeeInfo,
        cookie: cookie,
      })
      .then(function (res) {
        // setOwnerPrRe(res.data.value)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    let ItemsResponseResult = {};
    const api = `${LINKS.api}/GetApi`;
    let cookie = await localStorage.getItem("cookie");
    let SAPapi = `DeliveryNotes?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${Customer}'`;
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
      let sapAPi = `Returns?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum`;
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value);
        })
        .catch({});
      setShow1(true);
    } else {
      let sapAPi = `Returns?$orderby=DocNum`;
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
    let sapAPi = `Returns?$filter=DocNum eq ${SearchNumber}`;
    let cook = await localStorage.getItem("cookie");
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
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
        setHeaderData(res.data.value[0]);

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
  const submitPatchReturns = async () => {
    let DocLines = [];
    let body = PRBody;
    SearchDocumentLines.forEach((element) => {
      DocLines.push({
        Quantity: element.Quantity,
      });
    });

    body["DocumentLines"] = DocLines;
    body["Comments"] = getComments;
    body["AttachmentEntry"] = attachmentresponse;
    Patch(HeaderData.DocEntry, body);
  };
  const submitReturns = async () => {
    let DocLines = [];
    let body = PRBody;
    PQDocumentLines.forEach((element) => {
      if (element.isSelected) {
        element.DocumentLines.forEach((element) => {
          if (element.isSelected && element.LineStatus === "bost_Open") {
            DocLines.push({
              BaseEntry: element.DocEntry,
              BaseType: 15,
              BaseLine: element.LineNum,
              // FreeText: element.FreeText,
              // WarehouseCode:element.WarehouseCode,
            });

            body["DocumentLines"] = DocLines;
            body["CardCode"] = Customer;
            body["DocTotal"] = TotalPayment;
            body["NumAtCard"] = CustomerRefNo;
            body["DocDate"] = DocDate ? DocDate : currentDate;
            body["Series"] = getseriesvalue;
            body["AttachmentEntry"] = attachmentresponse;
            body["DocDueDate"] = DeliveryDate ? DeliveryDate : currentDate;
            body["TaxDate"] = getTaxDate ? getTaxDate : currentDate;
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
          api: LINKS.sap.Sales.SaleReturns,
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
          api: LINKS.sap.Sales.SaleReturns,
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
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      submitReturns();
    } else if (ButtonName != "Add") {
      submitPatchReturns();
    }
  };
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset();
    Dropdown.reset();
  };
  const [modalOne, setModalOne] = React.useState();
  const [modalTwo, setModalTwo] = React.useState();

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
          setTotalbforeDiscount(sum);
          setgettaxtotal(sum1);
        });
      }
    });
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
          <h1 style={{ textAlign: "center" }}>Returns</h1>
          {/* Upper Side++++++++ */}
          <Form onSubmit={handleSubmitted}>
            <CardGroup>
              <DIV3>
                <Container fluid>
                  <label>Customer</label>
                  <div
                    style={{ width: "23.5rem", height: "auto" }}
                    variant="primary"
                  >
                    <Select
                      placeholder={HeaderData && HeaderData.CardCode}
                      options={VendorCodeDropdown}
                      onChange={(e) => {
                        VendorChange(e);
                      }}
                      displayValue="name"
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
                      options={ContactPersonDropdown}
                      displayValue="name"
                      onChange={(e) => {
                        CPChange(e);
                      }}
                    />
                  </div>
                  <br />
                  <Button variant="primary" onClick={handleShow}>
                    Copy From
                  </Button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    className="Modal-big"
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Open Delivery List
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
                  <Modal show={show1} onHide={handleClose2}>
                    <Modal.Header closeButton>
                      <Modal.Title>Open A/R DownPayment List</Modal.Title>
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
                  <Modal
                    show={modalTwo === "modal-two"}
                    className="Modal-big"
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        Open Delivery List
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
                            <th>Quantity</th>
                            <th>Delivery Date</th>
                            <th>Open Qty</th>
                            <th>Whse</th>
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
                                                menuPortalTarget={document.body}
                                                value={PrWhse.filter(
                                                  (option) =>
                                                    option.value ===
                                                    item.WarehouseCode
                                                )}
                                                placeholder="Select.."
                                                options={PrWhse} // Options to display in the dropdown
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
                  <br />
                  <div style={{ width: "23.5rem", height: "auto" }}>
                    <label>Customer Ref.No</label>
                    <input
                      value={HeaderData && HeaderData.NumAtCard}
                      onChange={(e) => {
                        setCustomerRefNo(e.target.value);
                      }}
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                    ></input>
                  </div>
                  <div
                    style={{ marginTop: "5%", marginLeft: "47%", width: "50%" }}
                  >
                    {RequesterCodeDropdown && (
                      <Select
                        placeholder=""
                        options={RequesterCodeDropdown} // Options to display in the dropdown
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
                    className="Return"
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
                      <svg class="svg-icon8" viewBox="0 0 20 20">
                        <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                      </svg>
                    </a>
                    <input
                      name={"SearchPRNumber"}
                      type="Number"
                      placeholder="Number"
                      class="form-control8"
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
                      onChange={(e) => {
                        DocDateChange(e);
                      }}
                      class="form-control"
                      defaultValue={
                        HeaderData && HeaderData.DocDate
                          ? HeaderData && HeaderData.DocDate
                          : currentDate
                      }
                    />
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                    <label> Due Date</label>
                    <input
                      type="date"
                      name="DocDuDate"
                      class="form-control"
                      defaultValue={
                        HeaderData && HeaderData.DocDuDate
                          ? HeaderData && HeaderData.DocDuDate
                          : currentDate
                      }
                      onChange={(e) => {
                        DocDateChange(e);
                      }}
                    />
                  </div>
                  <div style={{ width: "23.5rem", marginLeft: "3rem" }}>
                    <label>Document Date</label>

                    <input
                      class="form-control"
                      aria-describedby="emailHelp"
                      type="date"
                      defaultValue={
                        HeaderData && HeaderData.TaxDate
                          ? HeaderData && HeaderData.TaxDate
                          : currentDate
                      }
                      name="TaxDate"
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
                          <th>UoM Name</th>
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
                                          type="number"
                                          name="QuotedQty"
                                          readOnly="readOnly"
                                          class="form-control"
                                          aria-describedby="Requesterid"
                                          value={item.Quantity}
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
                                          value={item.ShipDate}
                                        />
                                      </div>
                                    </TD>
                                    <TD>{item.BaseOpenQuantity || OpenQty} </TD>
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
                                          // placeholder= {0 || item.DocumentLineAdditionalExpenses[0].ExpenseCode }
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
                                  type="number"
                                  name="QuotedQty"
                                  readOnly="readOnly"
                                  class="form-control"
                                  aria-describedby="Requesterid"
                                  value={item.Quantity}
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
                            <TD>{item.BaseOpenQuantity || OpenQty} </TD>
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
            <CardGroup>
              <DIV3>
                <Container fluid>
                  <div style={{ width: "23.5em", height: "auto" }}>
                    <label>Sales Employee</label>
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
                      displayValue="name" // Property name to display in the dropdown options
                    />
                  </div>
                  <br />
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Remarks</label>
                    <div style={{ width: "23.5rem" }}>
                      <textarea
                        defaultValue={
                          HeaderData &&
                          "Based on Deliveries: " +
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
                  <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                    <label style={{ marginTop: "10%" }}>Net Total </label>
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
                          value={
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
                            (HeaderData && HeaderData.TotalDiscountSC)
                          }
                        />
                      </div>
                    </CardGroup>
                  </div>
                </div>
                <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                  <label>Freight</label>
                  <input readOnly="readOnly" class="form-control" />
                </div>
                <br />
                <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                  <label>Tax</label>
                  <input
                    type="number"
                    class="form-control"
                    name="TaxAmount(LC)"
                    readOnly="readOnly"
                    value={gettaxtotal || (HeaderData && HeaderData.VatSumSys)}
                  />
                </div>
                <div style={{ width: "23.5rem", marginLeft: "4rem" }}>
                  <label>Total Payment Due:</label>
                  <input
                    type="text"
                    value={
                      totalbforeDiscount - DiscountTotal + gettaxtotal ||
                      (HeaderData && HeaderData.DocTotal.toFixed(2))
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
