import React from "react";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Modal,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import { saveAs } from "file-saver";
import { LINKS } from "../../Utils";
import "../Global/Navbar.css";
const axios = require("axios");

const Header = () => {
  const [getfromdate, setgetfromdate] = React.useState();
  const [gettodate, setgettodate] = React.useState();
  const [show1, setShow1] = React.useState(false);
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    REPORTPOST: `${LINKS.api}/ReportPOSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
  };
  //   React.useEffect(() => {
  //     (async () => {
  //       localStorage.removeItem('getDocEntry')

  //   const getdocentry = await localStorage.getItem('getDocEntry')
  //   let cook = await localStorage.getItem('cookie')
  //   let cook2 = await localStorage.getItem('cookiee');
  //   if(cook||cook2===null){
  //     // alert("Please Login")
  //     window.location.href="/"
  //   }

  //     })();
  // }, []);

  const TrialBalanceReport = async () => {
    console.log("body2");
    let cook2 = await localStorage.getItem("cookiee");
    let SAPapi = `ExportPDFData?DocCode=RCRI0011`;
    console.log("SAPapi", SAPapi);
    let body2 = [
      {
        name: "FromDate",
        type: "xsd:date",
        value: [[getfromdate]],
      },
      {
        name: "ToDate",
        type: "xsd:date",
        value: [[gettodate]],
      },
    ];
    console.log("body2", JSON.stringify(body2));
    if (cook2) {
      axios
        .post(API_TYPES.REPORTPOST, {
          body: JSON.stringify(body2),
          api: SAPapi,
          cookie: "ROUTEID=.node3;" + cook2,
        })
        .then(function (res) {
          console.log("res2", res);
          saveAs(
            "data:application/pdf;base64," + res.data,
            "TrialBalanceReport" + ".pdf"
          );
          //  setgetbase64data(res.data)
          // localStorage.removeCookie('getDocEntry')
          // document.cookie = 'getDocEntry' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handleClose2 = () => {
    setShow1(false);
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="Home">UI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="">File</Nav.Link>
            <Nav.Link href="#link">Edit</Nav.Link>
            <Nav.Link href="#link">View</Nav.Link>
            <Nav.Link href="#link">Data</Nav.Link>
            <Nav.Link href="#link">Go To</Nav.Link>
            <NavDropdown title="Modules" id="basic-nav-dropdown">
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={`  Administration  `}
                >
                  <Dropdown.Item disabled href="#">
                    Choose Company
                  </Dropdown.Item>
                  {/* <Dropdown.Item href="ExchangeRates">Exchange Rates and Indexes</Dropdown.Item> */}
                  <div className="mb-2">
                    <DropdownButton
                      size="lg"
                      as={ButtonGroup}
                      id={`dropdown-button`}
                      drop={"right"}
                      variant=" "
                      title={`  System Initialization  `}
                    >
                      <div className="mb-2">
                        <DropdownButton
                          size="lg"
                          as={ButtonGroup}
                          id={`dropdown-button`}
                          drop={"right"}
                          variant=" "
                          title={`  Authorizations  `}
                        >
                          <Dropdown.Item href="Authorization">
                            General Authorizations
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </DropdownButton>
                  </div>
                  <div className="mb-2">
                    <DropdownButton
                      size="lg"
                      as={ButtonGroup}
                      id={`dropdown-button`}
                      drop={"right"}
                      variant=" "
                      title={`  Setup  `}
                    >
                      <Dropdown.Item disabled href="#">
                        General
                      </Dropdown.Item>
                      <div className="mb-2">
                        <DropdownButton
                          size="lg"
                          as={ButtonGroup}
                          id={`dropdown-button`}
                          drop={"right"}
                          variant=" "
                          title={`  Financials  `}
                        >
                          <Dropdown.Item disabled href="#">
                            Branches
                          </Dropdown.Item>
                          <Dropdown.Item disabled href="#">
                            Currencies
                          </Dropdown.Item>
                          <Dropdown.Item href="Projects">
                            Projects
                          </Dropdown.Item>
                          <div className="mb-2">
                            <DropdownButton
                              size="lg"
                              as={ButtonGroup}
                              id={`dropdown-button`}
                              drop={"right"}
                              variant=" "
                              title={`  Tax  `}
                            >
                              <Dropdown.Item href="TaxGroup">
                                Tax Groups
                              </Dropdown.Item>
                              <Dropdown.Item disabled href="#">
                                Tax Code Determination
                              </Dropdown.Item>
                              <Dropdown.Item disabled href="#">
                                Withholding Tax
                              </Dropdown.Item>
                              <Dropdown.Item disabled href="#">
                                Tax Declaration Boxes
                              </Dropdown.Item>
                            </DropdownButton>
                          </div>
                        </DropdownButton>
                      </div>
                      <Dropdown.Item href="Opportunities">
                        Opportunities
                      </Dropdown.Item>
                      <div className="mb-2">
                        <DropdownButton
                          size="lg"
                          as={ButtonGroup}
                          id={`dropdown-button`}
                          drop={"right"}
                          variant=" "
                          title={`  Banking  `}
                        >
                          <Dropdown.Item href="Banks">Banks</Dropdown.Item>
                          <Dropdown.Item disabled href="#">
                            House Bank Accounts
                          </Dropdown.Item>
                          <Dropdown.Item disabled href="#">
                            Credit Cards
                          </Dropdown.Item>
                          <Dropdown.Item disabled href="#">
                            Credit Card Payment
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                      <div className="mb-2">
                        <DropdownButton
                          size="lg"
                          as={ButtonGroup}
                          id={`dropdown-button`}
                          drop={"right"}
                          variant=" "
                          title={`  Inventory  `}
                        >
                          <Dropdown.Item disabled href="ItemGroups">
                            Item Groups
                          </Dropdown.Item>
                          <Dropdown.Item disabled href="#">
                            Warehouses
                          </Dropdown.Item>
                          {/* <Dropdown.Item disabled href="#">Units of Measure</Dropdown.Item> 
                <Dropdown.Item disabled href="#">Unit of Measure Groups</Dropdown.Item>  */}
                        </DropdownButton>
                      </div>
                    </DropdownButton>
                  </div>
                  <Dropdown.Item disabled href="#">
                    Data Import/Export
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="#">
                    Utilities
                  </Dropdown.Item>
                  <div className="mb-2">
                    <DropdownButton
                      size="lg"
                      as={ButtonGroup}
                      id={`dropdown-button`}
                      drop={"right"}
                      variant=" "
                      title={`  Approvel Process  `}
                    >
                      <Dropdown.Item disabled href="#">
                        Approval Stages{" "}
                      </Dropdown.Item>
                      <Dropdown.Item disabled href="#">
                        Approval Tamplates
                      </Dropdown.Item>
                      <Dropdown.Item href="ApprovalStatusReport">
                        Approval Status Report
                      </Dropdown.Item>
                      <Dropdown.Item href="ApprovalDecisionReport">
                        Approval Decision Report
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <Dropdown.Item disabled href="#">
                    License
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="#">
                    Integration Service
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="#">
                    Add-Ons
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="#">
                    Workflow
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="#">
                    Alerts Management
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={`  Financials  `}
                >
                  <Dropdown.Item href="JournalEntries">
                    Journal Entry
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => {
                      setShow1(true);
                    }}
                  >
                    Trial Balance Report
                  </Dropdown.Item>
                  <Dropdown.Item href="AccountBalanceReport">
                    Account Balance Report
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={`  Sales - A/R  `}
                >
                  {/* <Dropdown.Item href="IncomingPayments">Incoming Payment</Dropdown.Item> */}
                  {/* <Dropdown.Item href="Opportunities">Opportunities</Dropdown.Item> */}
                  {/* <Dropdown.Item href="SalesQuotation">SalesQuotation</Dropdown.Item> */}
                  <Dropdown.Item href="SalesQuotation">
                    Sales Quotation
                  </Dropdown.Item>
                  <Dropdown.Item href="Orders">Sales Order</Dropdown.Item>
                  <Dropdown.Item href="SalesDownPaymentRequest">
                    A/R Down Payment Request
                  </Dropdown.Item>
                  {/* <Dropdown.Item href="DeliveryNotes">Delivery</Dropdown.Item> */}
                  <Dropdown.Item href="DeliveryNotes">Delivery</Dropdown.Item>
                  <Dropdown.Item href="OGP">Outward Gate Pass</Dropdown.Item>
                  <Dropdown.Item href="Returns">Return</Dropdown.Item>
                  <Dropdown.Item href="Invoices">A/R Invoice</Dropdown.Item>
                  <Dropdown.Item disabled href="CreditNotes">
                    A/R Credit Memo
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={`  Purchasing - A/P  `}
                >
                  <Dropdown.Item disabled eventKey=" ">
                    Purchase Blanket Agreement
                  </Dropdown.Item>
                  <Dropdown.Item href="PurchaseRequest">
                    Purchase Request
                  </Dropdown.Item>
                  {/* <Dropdown.Item href='UpdatePurchaseRequest'>Update Purchase Request</Dropdown.Item> */}
                  <Dropdown.Item href="PurchaseQuotation">
                    Purchase Quotation
                  </Dropdown.Item>
                  <Dropdown.Item href="PurchaseOrder">
                    Purchase Order
                  </Dropdown.Item>
                  <Dropdown.Item href="DownPaymentRequest ">
                    A/P Down Payment Request
                  </Dropdown.Item>
                  <Dropdown.Item href="OIGP">Inward Gate Pass</Dropdown.Item>
                  <Dropdown.Item href="MIR">
                    Metrial Inspection Report
                  </Dropdown.Item>
                  <Dropdown.Item href="PurchaseDeliveryNotes">
                    Goods Receipt PO
                  </Dropdown.Item>
                  <Dropdown.Item href="PurchaseReturn ">
                    Goods Return
                  </Dropdown.Item>
                  <Dropdown.Item href="PurchaseInvoices">
                    A/P Invoice
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="PurchaseCreditNotes">
                    A/P Credit Memo
                  </Dropdown.Item>
                  <Dropdown.Item disabled eventKey="#">
                    A/P Reserve Invoice
                  </Dropdown.Item>
                  <Dropdown.Item href="LandedCost">Landed Cost</Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={`  Business Partners  `}
                >
                  <Dropdown.Item href="#">
                    Business Partner Master Data
                  </Dropdown.Item>
                  <Dropdown.Item href="Activity">Activity</Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={`  Banking  `}
                >
                  <Dropdown.Item href="IncomingPayments">
                    Incoming Payment
                  </Dropdown.Item>
                  <Dropdown.Item href="OutgoingPayments">
                    Outgoing Payment
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={` Inventory  `}
                >
                  <Dropdown.Item href="ItemsMasterData">
                    Item Master Data
                  </Dropdown.Item>
                  <Dropdown.Item href="InventoryReports">
                    Inventory Reports
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="InventoryGenExit">
                    Bar Codes
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="InventoryTransferRequests">
                    Document Printing
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="StockTransfers">
                    Bin Locations
                  </Dropdown.Item>
                  <div className="mb-2">
                    <DropdownButton
                      size="lg"
                      as={ButtonGroup}
                      id={`dropdown-button`}
                      drop={"right"}
                      variant=" "
                      title={` Inventory Transactions  `}
                    >
                      <Dropdown.Item href="InventoryGenEntries">
                        Goods Receipt
                      </Dropdown.Item>
                      <Dropdown.Item href="InventoryGenExit">
                        Goods Issue
                      </Dropdown.Item>
                      <Dropdown.Item href="InventoryTransferRequests">
                        Inventory Transfer Requests
                      </Dropdown.Item>
                      <Dropdown.Item href="StockTransfers">
                        Inventory Transfer
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <Dropdown.Item disabled href="InventoryGenExit">
                    Price Lists
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="InventoryTransferRequests">
                    Pick And Pack
                  </Dropdown.Item>
                  <Dropdown.Item disabled href="StockTransfers">
                    Inventory Reports
                  </Dropdown.Item>
                </DropdownButton>
              </div>{" "}
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  disabled
                  variant=" "
                  title={`  Resources  `}
                ></DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={`  Production  `}
                >
                  <Dropdown.Item href="BillOfMaterials">
                    Bill Of Materials
                  </Dropdown.Item>
                  <Dropdown.Item href="ProductionOrder">
                    Production Order
                  </Dropdown.Item>
                  <Dropdown.Item href="ReceiptFromProduction">
                    Receipt From Production
                  </Dropdown.Item>
                  <Dropdown.Item href="IssueForProduction">
                    Issue For Production
                  </Dropdown.Item>
                </DropdownButton>
              </div>{" "}
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  disabled
                  title={`  MRP  `}
                ></DropdownButton>
              </div>{" "}
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  disabled
                  variant=" "
                  title={`  Services  `}
                ></DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  variant=" "
                  title={` Human Resources  `}
                >
                  <Dropdown.Item href="EmployeeMasterData">
                    Employee Master Data
                  </Dropdown.Item>
                  <Dropdown.Item href="TimeSheet">Time Sheet</Dropdown.Item>
                  <Dropdown.Item href="PayGrade">PayGrade Setup</Dropdown.Item>
                  <Dropdown.Item href="EmployeeSalary">
                    Employee Salary Detail
                  </Dropdown.Item>
                  <Dropdown.Item href="FiscalYear">
                    Fiscal Year Setup
                  </Dropdown.Item>
                  <Dropdown.Item href="WorkShift">
                    Work Shift Setup
                  </Dropdown.Item>
                  <Dropdown.Item href="Allowance">
                    Allowance Setup
                  </Dropdown.Item>
                  <Dropdown.Item href="Deduction">
                    Deduction Setup
                  </Dropdown.Item>
                  <Dropdown.Item href="LeaveApplication">
                    Leave Application
                  </Dropdown.Item>
                  <Dropdown.Item href="LatePolicy">Late Policy</Dropdown.Item>
                  <Dropdown.Item href="EarnedLeavePolicy">
                    Earned Leave Policy
                  </Dropdown.Item>
                  <Dropdown.Item href="TaxRule">Tax Rule Setup</Dropdown.Item>
                  <Dropdown.Item href="Loan_AdvanceAppliation">
                    Loan/Advance Appliation
                  </Dropdown.Item>
                  <Dropdown.Item href="LeaveType">
                    Leave Type Setup
                  </Dropdown.Item>
                  <Dropdown.Item href="EmployeeAllowance">
                    Employee Allowance
                  </Dropdown.Item>
                  <Dropdown.Item href="PayrollProcess">
                    Payroll Process
                  </Dropdown.Item>
                </DropdownButton>
              </div>{" "}
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  disabled
                  variant=" "
                  title={`  Action  `}
                ></DropdownButton>
              </div>
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  disabled
                  variant=" "
                  title={`  Reports  `}
                ></DropdownButton>
              </div>{" "}
              <div className="mb-2">
                <DropdownButton
                  size="lg"
                  as={ButtonGroup}
                  id={`dropdown-button`}
                  drop={"right"}
                  disabled
                  variant=" "
                  title={`  Project Management  `}
                ></DropdownButton>
              </div>
            </NavDropdown>
            <Nav.Link href="#link">Tools</Nav.Link>
            <Nav.Link href="#link">Window</Nav.Link>
            <Nav.Link href="#link">Help</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button
              disabled
              variant="outline-secondary"
              href="PurchaseQuotation"
            >
              Search
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                localStorage.removeItem("cookie");
                localStorage.removeItem("cookiee");
                localStorage.removeItem("AuthData");
                localStorage.removeItem("autobranches");
              }}
              href="/"
            >
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Trial Balance Report- Selection Criteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <div style={{ width: "23.5rem" }}>
              <label>From Date</label>
              <input
                type="date"
                name="FromDate"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setgetfromdate(e.target.value);
                }}
                // defaultValue={currentDate || SelectedPRDocEntry && SelectedPRDocEntry.DocDate || HeaderData && HeaderData.DocDate}
              />
            </div>
            <div style={{ width: "23.5rem" }}>
              <label> To Date</label>
              <input
                type="date"
                name="ToDate"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                // defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate || HeaderData && HeaderData.DocDueDate}
                onChange={(e) => {
                  setgettodate(e.target.value);
                }}
              />
            </div>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={TrialBalanceReport}>
            Show
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Header;
