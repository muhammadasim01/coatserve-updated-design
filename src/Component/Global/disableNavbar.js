import React from "react";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
export default function DisableNavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand  href=" ">UI</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link disabled href="">File</Nav.Link>
          <Nav.Link disabled href="#link">Edit</Nav.Link>
          <Nav.Link disabled href="#link">View</Nav.Link>
          <Nav.Link disabled href="#link">Data</Nav.Link>
          <Nav.Link disabled href="#link">Go To</Nav.Link>
          <NavDropdown disabled title="Modules" id="basic-nav-dropdown">
          <div className="mb-2">
              <DropdownButton
                size="lg"
                as={ButtonGroup}
                id={`dropdown-button`}
                drop={"right"}
                variant=" "
                title={`  Administration  `}
              >
                 <Dropdown.Item disabled href="#">Choose Company</Dropdown.Item>                
                <Dropdown.Item disabled href="#">Exchange Rates and Indexes</Dropdown.Item>
                <Dropdown.Item disabled href="#">System Initialization</Dropdown.Item>
                <Dropdown.Item disabled href="#">Setup</Dropdown.Item>                
                <Dropdown.Item disabled href="#">Data Import/Export</Dropdown.Item>
                <Dropdown.Item disabled href="#">Utilities</Dropdown.Item>
                <div className="mb-2">
              <DropdownButton
                size="lg"
                as={ButtonGroup}
                id={`dropdown-button`}
                drop={"right"}
                variant=" "
                title={`  Approvel Process  `}
              >
                <Dropdown.Item disabled href="#">Approval Stages </Dropdown.Item>                
                <Dropdown.Item disabled href="#">Approval Tamplates</Dropdown.Item>
                <Dropdown.Item  href="ApprovalStatusReport">Approval Status Report</Dropdown.Item>
                <Dropdown.Item  href="ApprovalDecisionReport">Approval Decision Report</Dropdown.Item>
                
              </DropdownButton>
            </div>
            <Dropdown.Item disabled href="#">License</Dropdown.Item>
                <Dropdown.Item disabled href="#">Integration Service</Dropdown.Item>
                <Dropdown.Item disabled href="#">Add-Ons</Dropdown.Item>                
                <Dropdown.Item disabled href="#">Workflow</Dropdown.Item>
                <Dropdown.Item disabled href="#">Alerts Management</Dropdown.Item>
                
              </DropdownButton>
            </div>
            <NavDropdown.Item eventKey="1">Financials</NavDropdown.Item>
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
                <Dropdown.Item href="Opportunities">Opportunities</Dropdown.Item>
                {/* <Dropdown.Item href="SalesQuotation">SalesQuotation</Dropdown.Item> */}
                <Dropdown.Item href="SalesQuotation">Sales Quotation</Dropdown.Item>
                <Dropdown.Item href="Orders">Sales Order</Dropdown.Item>
                <Dropdown.Item href="SalesDownPaymentRequest">A/R Down Payment Request</Dropdown.Item>
                {/* <Dropdown.Item href="DeliveryNotes">Delivery</Dropdown.Item> */}
                <Dropdown.Item href="DeliveryNotes">Delivery</Dropdown.Item>
                <Dropdown.Item href="OGP">Outward Gate Pass</Dropdown.Item>
                <Dropdown.Item href="Returns">Return</Dropdown.Item>
                <Dropdown.Item  href='Invoices'>A/R Invoice</Dropdown.Item>
                <Dropdown.Item disabled href='CreditNotes'>A/R Credit Memo</Dropdown.Item>
                
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
                <Dropdown.Item href='PurchaseRequest'>Purchase Request</Dropdown.Item>
                {/* <Dropdown.Item href='UpdatePurchaseRequest'>Update Purchase Request</Dropdown.Item> */}
                <Dropdown.Item href='PurchaseQuotation'>Purchase Quotation</Dropdown.Item>
                <Dropdown.Item href='PurchaseOrder'>Purchase Order</Dropdown.Item>
                <Dropdown.Item href="DownPaymentRequest ">A/P Down Payment Request</Dropdown.Item>
                <Dropdown.Item href="OIGP">Inward Gate Pass</Dropdown.Item>
                <Dropdown.Item href="MIR">Metrial Inspection Report</Dropdown.Item>
                <Dropdown.Item href='PurchaseDeliveryNotes'>Goods Receipt PO</Dropdown.Item>
                <Dropdown.Item href="PurchaseReturn ">Goods Return</Dropdown.Item>
                <Dropdown.Item href='PurchaseInvoices'>A/P Invoice</Dropdown.Item>
                <Dropdown.Item disabled href='PurchaseCreditNotes'>A/P Credit Memo</Dropdown.Item>
                <Dropdown.Item disabled eventKey='#'>A/P Reserve Invoice</Dropdown.Item>
                <Dropdown.Item disabled eventKey='LandedCosts'>Landed Cost</Dropdown.Item>
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
                <Dropdown.Item href="IncomingPayments">Incoming Payment</Dropdown.Item>  
                <Dropdown.Item href="VendorPayments">Outgoing Payment</Dropdown.Item>
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
                <Dropdown.Item disabled href="InventoryGenEntries">Item Master Data</Dropdown.Item>
                <Dropdown.Item disabled href="InventoryGenExit">Bar Codes</Dropdown.Item>
                <Dropdown.Item disabled href="InventoryTransferRequests">Document Printing</Dropdown.Item>
                <Dropdown.Item disabled href="StockTransfers">Bin Locations</Dropdown.Item>
                <div className="mb-2">
              <DropdownButton
                size="lg"
                as={ButtonGroup}
                id={`dropdown-button`}
                drop={"right"}
                variant=" "
                title={` Inventory Transactions  `}
              >
                   <Dropdown.Item href="InventoryGenEntries">Goods Receipt</Dropdown.Item>
                <Dropdown.Item href="InventoryGenExit">Goods Issue</Dropdown.Item>
                <Dropdown.Item href="InventoryTransferRequests">Inventory Transfer Requests</Dropdown.Item>
                <Dropdown.Item href="StockTransfers">Inventory Transfer</Dropdown.Item>
                </DropdownButton>
                  </div>
                <Dropdown.Item disabled href="InventoryGenExit">Price Lists</Dropdown.Item>
                <Dropdown.Item disabled href="InventoryTransferRequests">Pick And Pack</Dropdown.Item>
                <Dropdown.Item disabled href="StockTransfers">Inventory Reports</Dropdown.Item>
              </DropdownButton>
            </div>
            <NavDropdown.Item eventKey="9">Resources</NavDropdown.Item>
            <NavDropdown.Item eventKey="22">Production</NavDropdown.Item>
            <NavDropdown.Item eventKey="33">MRP</NavDropdown.Item>
            <NavDropdown.Item eventKey="32">Services</NavDropdown.Item>
            <div className="mb-2">
              <DropdownButton
                size="lg"
                as={ButtonGroup}
                id={`dropdown-button`}
                drop={"right"}
                variant=" "
                title={` Human Resources  `}
              >
                 <Dropdown.Item href="EmployeeMasterData">Employee Master Data</Dropdown.Item>
                 <Dropdown.Item href="TimeSheet">Time Sheet</Dropdown.Item>
                 <Dropdown.Item href="PayGrade">PayGrade Setup</Dropdown.Item>
                 <Dropdown.Item href="EmployeeSalary">Employee Salary Detail</Dropdown.Item>
                 <Dropdown.Item href="FiscalYear">Fiscal Year Setup</Dropdown.Item>
                 <Dropdown.Item href="WorkShift">Work Shift Setup</Dropdown.Item>
                 <Dropdown.Item href="Allowance">Allowance Setup</Dropdown.Item>
                 <Dropdown.Item href="Deduction">Deduction Setup</Dropdown.Item>
                 <Dropdown.Item href="LeaveApplication">Leave Application</Dropdown.Item>
                 <Dropdown.Item href="LatePolicy">Late Policy</Dropdown.Item>
                 <Dropdown.Item href="EarnedLeavePolicy">Earned Leave Policy</Dropdown.Item>
                 <Dropdown.Item href="TaxRule">Tax Rule Setup</Dropdown.Item>
                 <Dropdown.Item href="Loan_AdvanceAppliation">Loan/Advance Appliation</Dropdown.Item>
                 <Dropdown.Item href="LeaveType">Leave Type Setup</Dropdown.Item>
                 <Dropdown.Item href="EmployeeAllowance">Employee Allowance</Dropdown.Item>
                 <Dropdown.Item href="PayrollProcess">Payroll Process</Dropdown.Item>

              </DropdownButton>
            </div>
            <NavDropdown.Item href=" ">Action</NavDropdown.Item>
            <NavDropdown.Item href=" ">Reports </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Project Management
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link disabled href="#link">Tools</Nav.Link>
          <Nav.Link disabled href="#link">Window</Nav.Link>
          <Nav.Link disabled href="#link">Help</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button disabled variant="outline-secondary" >
            Search
          </Button>
          <Button variant="outline-secondary" href="/">
            Logout
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
