import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  
  LoginScreen,
  HomeScreen,
  // EmployeeMasterData,
  // TimeSheet,
} from "../Screens";
// Purchasing AP Screens
import {
  // A_PDownPaymentRequest,
  PurchaseInvoices,
  GRPO,
  MIR,
  OIGP,
  PurchaseDeliveryNotes,
  PurchaseReturn,
  DownPaymentRequest,
  PurchaseOrder,
  ItemsDelete,
  LandedCost,
  PurchaseQuotation,
  PurchaseRequests,
  UpdatePurchaseRequest,
  DisabledHomeScreen,
} from '../Screens/PurchasingAP'

import {JournalEntries,IncomingPayments,OutgoingPayments,AccountBalanceReport} from '../Screens/Banking'
// Sales Screens
import {
  CustomerDetails,
 // DeliveryNotes,
 Invoices,
  DownPayment,
  // IncomingPayments,
  ReserveInvoices,
  SalesQuotation,
  SalesQuotation2,
  
} from "../Screens/Sales";
import SalesDownPaymentRequest from '../Screens/Sales/SalesDownPaymentRequest'
import Sidebar from '../Component/Global/Component/Sidebar';

import DeliveryNotes from '../Screens/Sales/Delivery'
import Orders from '../Screens/Sales/SalesOrder'
import OGP from '../Screens/Sales/OutwardGatePass'
import Returns from '../Screens/Sales/SaleReturns'
import Opportunities from '../Screens/Opportunities'

// Business Partners Screens
import Activity from '../Screens/BusinessPartners/Activity'

import {
  TaxGroup,
  Projects,
  Banks,ChartOfAccounts,
  ExchangeRates
} from '../Screens/Administrator'

// Inventory Screens
import {
  InventoryGenEntries,
  InventoryGenExit,
  InventoryTransferRequests,
  ItemsMasterData,
  StockTransfers,
  InventoryReports,
} from "../Screens/Inventory";
// HR Screens
import {
  EmployeeMasterData,
    TimeSheet,
    Allowance,
    Deduction,
    EarnedLeavePolicy,
    EmployeeSalary,
    LatePolicy,
    LeaveApplication,
    LeaveType,
    PayGrade,
    TaxRule,
    Loan_AdvanceAppliation,
    WorkShift,
    EmployeeDeduction,
    EmployeeAllowance,
    FiscalYear,
    PayrollProcess,
} from "../Screens/HR";
// Approval Process Screen
import {
  ApprovalStatusReport,
  ApprovalDecisionReport
} from '../Screens/ApprovalProcess'


import {
  BillOfMaterials,
    ProductionOrder,
    ReceiptFromProduction,
    IssueForProduction
} from '../Screens/Production'

import DocumentDraftReport from '../Screens/DocumentDraftReport'

export default function App() {
  return (
    <Router>
    {/* <Sidebar/> */}
      {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <LoginScreen/>
        </Route>
        <Route exact path="/Home">
          <HomeScreen />
        </Route>
      
        <Route exact path="/DisabledHomeScreen">
          <DisabledHomeScreen />
        </Route> 
         {/* Administrator Screens */}
  <Route exact path='/TaxGroup' >
          <TaxGroup />
        </Route>
        <Route exact path='/ChartOfAccounts'>
          <ChartOfAccounts />
        </Route>
        <Route exact path='/Projects' >
          <Projects />
        </Route>
        <Route exact path='/Banks' >
          <Banks />
        </Route>
        <Route exact path='/ExchangeRates' >
          <ExchangeRates />
        </Route>
        {/* Purchase Screens */}
        <Route exact path='/PurchaseQuotation' component={PurchaseQuotation} >
          <PurchaseQuotation />
        </Route>
         <Route exact path="/ItemsDelete">
          <ItemsDelete />
        </Route>
        <Route exact path="/LandedCost">
          <LandedCost />
        </Route>
        <Route exact path="/PurchaseInvoices">
          <PurchaseInvoices />
        </Route>
        <Route exact path="/DownPaymentRequest">
          <DownPaymentRequest />
        </Route>
        <Route exact path="/PurchaseRequest">
          <PurchaseRequests />
        </Route>
        <Route exact path="/PurchaseOrder">
          <PurchaseOrder />
        </Route>
        <Route exact path="/GRPO">
          <GRPO />
        </Route>
        <Route exact path="/UpdatePurchaseRequest">
          <UpdatePurchaseRequest />
        </Route>
        <Route exact path="/MIR">
          <MIR />
        </Route>
        <Route exact path="/OIGP">
          <OIGP />
        </Route>
        <Route exact path="/PurchaseDeliveryNotes">
          <PurchaseDeliveryNotes />
        </Route>
        <Route exact path="/PurchaseReturn">
          <PurchaseReturn />
        </Route>

        {/* Sales Screens */}
        <Route exact path="/CustomerDetails">
          <CustomerDetails />
        </Route>
        <Route exact path="/DeliveryNotes">
          <DeliveryNotes />
        </Route>
        <Route exact path="/Invoices">
          <Invoices />
        </Route>
        <Route exact path="/DownPayment">
          <DownPayment />
        </Route>
        {/* <Route exact path="/IncomingPayments">
          <IncomingPayments />
        </Route> */}
        <Route exact path="/ReserveInvoices">
          <ReserveInvoices />
        </Route>
        <Route exact path="/SalesQuotation2">
          <SalesQuotation2 />
        </Route>
        <Route exact path="/SalesQuotation">
          <SalesQuotation />
        </Route>
        <Route exact path="/Orders">
          <Orders />
        </Route>
        <Route exact path="/Opportunities"  >
          <Opportunities />
        </Route>
        <Route exact path="/SalesDownPaymentRequest">
          <SalesDownPaymentRequest />
        </Route>
        <Route exact path="/OGP">
          <OGP />
        </Route>
        <Route exact path="/Returns">
          <Returns />
        </Route>
        
        {/* <Route exact path="/DeliveryNotes">
          <DeliveryNotes />
        </Route> */}



        {/* Banking */}
       <Route exact path="/JournalEntries">
          <JournalEntries />
        </Route>
        <Route exact path="/IncomingPayments">
          <IncomingPayments />
        </Route>
        <Route exact path="/OutgoingPayments">
          <OutgoingPayments />
        </Route>
        <Route exact path="/AccountBalanceReport">
          <AccountBalanceReport />
        </Route>


      
 {/* Business Partners Screens */}
       <Route exact path="/Activity">
          <Activity />
        </Route>


         {/* HR Screens */}
         <Route exact path="/EmployeeMasterData">
          <EmployeeMasterData />
        </Route>
        <Route exact path="/PayrollProcess">
          <PayrollProcess />
        </Route>
        <Route exact path="/TimeSheet">
          <TimeSheet />
        </Route>
        <Route exact path="/Allowance">
          <Allowance />
        </Route>
        <Route exact path="/Deduction">
          <Deduction />
        </Route>
        <Route exact path="/EarnedLeavePolicy">
          <EarnedLeavePolicy />
        </Route>
        <Route exact path="/EmployeeSalary">
          <EmployeeSalary />
        </Route>
        <Route exact path="/LatePolicy">
          <LatePolicy />
        </Route>
        <Route exact path="/LeaveApplication">
          <LeaveApplication />
        </Route>
        <Route exact path="/LeaveType">
          <LeaveType />
        </Route>
        <Route exact path="/PayGrade">
          <PayGrade />
        </Route>
        <Route exact path="/TaxRule">
          <TaxRule />
        </Route>
        <Route exact path="/WorkShift">
          <WorkShift />
        </Route>
        <Route exact path="/EmployeeDeduction">
          <EmployeeDeduction />
        </Route>
        <Route exact path="/EmployeeAllowance">
          <EmployeeAllowance />
        </Route>
        <Route exact path="/FiscalYear">
          <FiscalYear />
        </Route>
        <Route exact path="/Loan_AdvanceAppliation">
          <Loan_AdvanceAppliation />
        </Route>
       {/* Approval Process */}
        <Route exact path="/ApprovalStatusReport">
          <ApprovalStatusReport />
        </Route>
        <Route exact path="/ApprovalDecisionReport">
          <ApprovalDecisionReport />
        </Route>
   
     <Route exact path="/DocumentDraftReport">
          <DocumentDraftReport />
        </Route>
    
        {/* Inventory Screens */}
        <Route exact path="/InventoryGenEntries">
          <InventoryGenEntries />
        </Route>
        <Route exact path="/ItemsMasterData">
          <ItemsMasterData />
        </Route>
        <Route exact path="/InventoryGenExit">
          <InventoryGenExit />
        </Route>
        <Route exact path="/InventoryTransferRequests">
          <InventoryTransferRequests />
        </Route>
        <Route exact path="/StockTransfers">
          <StockTransfers />
        </Route>
        <Route exact path="/InventoryReports">
          <InventoryReports />
        </Route>
        {/* Production */}
        <Route exact path="/BillOfMaterials">
          <BillOfMaterials />
        </Route>
        <Route exact path="/ProductionOrder">
          <ProductionOrder />
        </Route>
        <Route exact path="/ReceiptFromProduction">
          <ReceiptFromProduction />
        </Route>
        <Route exact path="/IssueForProduction">
          <IssueForProduction />
        </Route>
        
      </Switch>
    </Router>
  );
}