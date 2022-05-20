const LINKS = {
  // --------Local Working----------
  api: `${process.env.REACT_App_LOCAL}${process.env.REACT_App_PORT}`,
  SERVER_GET: `${process.env.REACT_App_LOCAL}${process.env.REACT_App_PORT}/GetApi`,
  SERVER_POST: `${process.env.REACT_App_LOCAL}${process.env.REACT_App_PORT}/POSTApi`,
  SERVER_PATCH: `${process.env.REACT_App_LOCAL}${process.env.REACT_App_PORT}/PATCHApi`,
  SERVER_Delete: `${process.env.REACT_App_LOCAL}${process.env.REACT_App_PORT}/DeleteApi`,
  sap: {
    MasterData: {
      ActvieDimensions:`Dimensions?$filter=IsActive eq 'tYES'`,
      GetDefaultReport:`ReportLayoutsService_GetDefaultReport`,
      GetInstallationNo:`LicenseService_GetInstallationNumber`,
      ActiveResources:`Resources`,
      ActiveRouteStage:`RouteStages`,
      ActiveAccounts:`ChartOfAccounts?$select=Code,Name`,
      AllTaxGroups:`VatGroups`,
      AllProjects:`Projects`,
      ActiveAllItems:`Items?$select=ItemCode,ItemName,ItemsGroupCode,PurchaseUnit&$filter=Valid eq 'tYES' &$orderby=ItemCode`,
      AllActiveItems:`Items?$select=ItemCode,ItemName,ItemsGroupCode,ManageBatchNumbers,ItemWarehouseInfoCollection,PurchaseUnit&$filter=Valid eq 'tYES' &$orderby=ItemCode`,
      ActivePurchaseItems: `Items?$select=ItemCode,ItemName,ItemsGroupCode,ItemWarehouseInfoCollection,PurchaseUnit&$filter=PurchaseItem eq 'tYES' and Valid eq 'tYES' and CapitalizationDate eq Null&$orderby=ItemCode`,
      ActiveSalesItems: `Items?$select=ItemCode,ItemName,ItemsGroupCode,ItemWarehouseInfoCollection,SalesUnit&$filter=Valid eq 'tYES'&$orderby=ItemCode `,
      ActiveInventoryItems: `Items?$select=ItemCode,ItemName,InventoryUOM&$filter=InventoryItem eq 'tYES' and Valid eq 'tYES'&$orderby=ItemCode`,
      ActiveUsers: `Users?$select=InternalKey,UserCode,UserName,eMail,MobilePhoneNumber,Branch,Department&$filter=Locked eq 'tNO'&$orderby=UserCode`,
      ActiveCostingCode: `ProfitCenters?$select=CenterCode,CenterName&$filter=Active eq 'tYES' and GroupCode ne null&$orderby=CenterCode`,
      ActiveEmplyeeInfo: `EmployeesInfo?$select=EmployeeID,LastName,FirstName,eMail,MiddleName&$filter=Active eq 'tYES'&$orderby=EmployeeID`,
      ActiveProjects: `Projects?$select=Code,Name&$filter=Active eq 'tYES' &$orderby=Code`,
      ActiveSalesEmployee: `SalesPersons?$select=SalesEmployeeCode,SalesEmployeeName&$filter=Locked eq 'tNO' and Active eq 'tYES'&$orderby=SalesEmployeeCode`,
      ActiveBranches: `BusinessPlaces?$select= BPLID, BPLName&$filter=Disabled eq 'tNO'&$orderby=BPLID`,
      ActiveVendor: `BusinessPartners?$select=CardCode,Currency,CardName&$filter=CardType eq 'cSupplier' and Valid eq 'tYES'&$orderby=CardCode`,
      ActiveCustomer: `BusinessPartners?$select=CardCode,Currency,CardName,Phone1&$filter=CardType eq 'cCustomer' and Valid eq 'tYES'&$orderby=CardCode`,
      ActiveWarehouse: `Warehouses?$select=WarehouseCode,WarehouseName&$orderby=WarehouseCode`,
      ActivePurchaseTax:`VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcInputTax'`,
      // ActiveSalesTax: `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' `,
      ActiveSalesTax: `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcOutputTax'`,
      Freight: `AdditionalExpenses`,
      Departments:`Departments`,
      ContactPerson: `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq `
    },
    PurchaseRequest: {
      PostTax: `VatGroups`,
      PostProject: `Projects`,
      purchaseItems: `Items?$select=ItemCode,ItemName,ItemsGroupCode,ItemWarehouseInfoCollection,PurchaseUnit&$filter=PurchaseItem eq 'tYES' and Valid eq 'tYES'&$orderby=ItemCode`,
      users: `Users?$select=UserCode,UserName,InternalKey,eMail&$filter=Locked eq 'tNO'&$orderby=UserCode`,
      costingCode: `ProfitCenters?$select=CenterCode,CenterName&$filter=Active eq 'tYES'&$orderby=CenterCode`,
      emplyeeInfo: `EmployeesInfo?$select=EmployeeID,LastName,FirstName,eMail,MiddleName&$filter=Active eq 'tYES'&$orderby=EmployeeID`,
      projects: `Projects?$select=Code,Name&$filter=Active eq 'tYES' &$orderby=Code`,
      salesEmployee: `SalesPersons?$select=SalesEmployeeCode,SalesEmployeeName&$filter=Locked eq 'tNO' and Active eq 'tYES'&$orderby=SalesEmployeeCode`,
      PurchaseRequest: `PurchaseRequests?$filter=DocumentStatus eq 'bost_Open'&$orderby=DocNum`,
      PurchaseRequests: `PurchaseRequests?$filter=DocumentStatus eq 'bost_Open'&$orderby=DocNum`,  
      PostPurchaseRequests: `PurchaseRequests`,  
      Branches: `BusinessPlaces?$select= BPLID, BPLName&$filter=Disabled eq 'tNO'&$orderby=BPLID`,
      Vendor: `BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'cSupplier' and Valid eq 'tYES'&$orderby=CardCode`,
      warehouse: `Warehouses?$select=WarehouseCode,WarehouseName&$orderby=WarehouseCode`,
      Freight: `AdditionalExpenses`
    },
    PurchaseQuotation: {
      PostPurchaseQuotation: `PurchaseQuotations`,
      purchaseItems: `Items?$select=ItemCode,ItemName,PurchaseUnit&$filter=PurchaseItem eq 'tYES' and Valid eq 'tYES'&$orderby=ItemCode`,
      users: `Users?$select=UserCode,UserName&$filter=Locked eq 'tNO'&$orderby=UserCode`,
      costingCode: `ProfitCenters?$select=CenterCode,CenterName&$filter=Active eq 'tYES'&$orderby=CenterCode`,
      emplyeeInfo: `EmployeesInfo?$select=EmployeeID,LastName,FirstName,eMail,MiddleName&$filter=Active eq 'tYES'`,
      projects: `Projects?$select=Code,Name&$filter=Active eq 'tYES' `,
      salesEmployee: `SalesPersons?$select=SalesEmployeeCode,SalesEmployeeName&$filter=Locked eq 'tNO' and Active eq 'tYES'`,
      purchaseTax: `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcInputTax'`,
      PurchaseQuotation: `PurchaseQuotations?$filter=DocumentStatus eq 'bost_Open'&$orderby=DocNum`,
      PurchaseQuotations: `PurchaseQuotations?$filter=DocumentStatus eq 'bost_Open'&$orderby=DocNum`,
      Vendor: `BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'cSupplier' and Valid eq 'tYES'`,
      Branches: `BusinessPlaces?$select= BPLID, BPLName&$filter=Disabled eq 'tNO'`,
      ContactPerson: `BusinessPartners?$select=ContactPerson`,
      GroupNumber: `PurchaseQuotations?$select=GroupNumber`,
      shipping:`ShippingTypes`,
      Indicator:`FactoringIndicators`,
    },
    PurchaseOrder: {
      purchaseTax: `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcInputTax'`,
      PostPurchaseorder: `PurchaseOrders`,
      PurchaseOrder: `PurchaseOrders?$filter=DocumentStatus eq 'bost_Open'`,
      Vendor: `BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'cSupplier' and Valid eq 'tYES'`,
      purchaseItems: `Items?$select=ItemCode,ItemName,PurchaseUnit&$filter=PurchaseItem eq 'tYES' and Valid eq 'tYES'`,
      users: `Users?$select=UserCode,UserName&$filter=Locked eq 'tNO'`,
      ContactPerson: `BusinessPartners?$select=ContactPerson`,
      Branches: `BusinessPlaces?$select= BPLID, BPLName&$filter=Disabled eq 'tNO'`
    },
    PurchaseDownPayments: {
      PurchaseDownPayments: `PurchaseDownPayments`,
      purchaseTax: `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcInputTax'`,
      PostpurchaseDownPayments: `PurchaseDownPayments`,
      Vendor: `BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'cSupplier' and Valid eq 'tYES'`,
      purchaseItems: `Items?$select=ItemCode,ItemName,PurchaseUnit&$filter=PurchaseItem eq 'tYES' and Valid eq 'tYES'`,
      users: `Users?$select=UserCode,UserName&$filter=Locked eq 'tNO'`
    },
    OIGP: {
      InwardGatePass: `OIGP`,
      OpenPurchaseOrders: `PurchaseOrders&$filter==DocumentStatus eq 'bost_Open'`
    },
    paymentTerms:{
      Payment:`PaymentTermsTypes`
     },
    OMIR: {
      MaterialInspection: `OMIR`,
      InwardGatePass: `OIGP`,
      CheckingRule: `OMCR?$select=Code,Name`
    },
    PurchaseInvoices: {
      PurchaseInvoices: `PurchaseInvoices`,
      OpenPurchaseDeliveryNotes: `PurchaseDeliveryNotes&$filter==DocumentStatus eq 'bost_Open'`
    },
    PurchaseDeliveryNotes: {
      PurchaseOrder: `PurchaseOrders?$filter=DocumentStatus eq 'bost_Open'`,
      PurchaseDeliveryNotes: `PurchaseDeliveryNotes`,
      MaterialInspection: `OMIR`,
      InwardGatePass: `OIGP`
    },
    PurchaseReturn: {
      PurchaseOrder: `PurchaseOrders?$filter=DocumentStatus eq 'bost_Open'`,
      PurchaseDeliveryNotes: `PurchaseDeliveryNotes?$filter=DocumentStatus eq 'bost_Open'`,
      PurchaseReturn:`PurchaseReturns`
    },
    Sales: {
      SalesOpportunities: `SalesOpportunities?$filter=Status eq 'sos_Open'`,
      Quotations: `Quotations?$filter=DocumentStatus eq 'bost_Open'`,
      PostQuotations: `Quotations`,
      Industries:`Industries`,
      Orders: `Orders?$filter=DocumentStatus eq 'bost_Open'`,
      
      PostDeliveryNotes:`DeliveryNotes`,
      PostOrders: `Orders`,
      DownPayments:`DownPayments?$filter=DocumentStatus eq 'bost_Open'`,
      DeliveryNotes:`DeliveryNotes?$filter=DocumentStatus eq 'bost_Open'`,
      Invoices:`Invoices`,
      CreditNotes:`CreditNotes?$filter=DocumentStatus eq 'bost_Open'`,
      OutwardGatePass:`Out_GP_V1`,
      SaleReturns:`Returns?$filter=DocumentStatus eq 'bost_Open'`
    },
    Attachments:{
      Attachment:`Attachments2`
    },
    Activity:{
      Activities:`Activities`,
      PostActivities:`Activities`,
      ActivityTypes:`ActivityTypes`,
      ActivityLocations:`ActivityLocations`
    },
    EmployeeMasterData:{
      EmployeesInfo:`EmployeesInfo`,
      Departments:`Departments`,
      EmployeePosition:`EmployeePosition`,
      States:`States`,
      Banks:`Banks`,
      Countries:`Countries?$select=Code,Name`,
      TimeSheet:`ProjectManagementTimeSheet`,
      EmployeeStatus:`EmployeeStatus`,
      TerminationReason:`TerminationReason`,
    },
    HumanResources:{
      LaeveType:`OLTD`,
      TimeSheet:`ProjectManagementTimeSheet`,
      Allowance:`OAED`,
      Deduction:`ODED`,
      EarnedLeavePolicy:`OELD`,
      EmployeeSalaryDetails:`OESD`,
      LatePolicy:`OLPD`,
      LeaveApplication:`OLEV`,
      PayGrade:`OPGD`,
      TaxRule:`OTRD`,
      AutomaticAllowance:`OAED?$filter=U_Process eq '1' and (U_Percent ne 0 or U_Amount ne 0)`,
      WorkShift:`OWSD`,
      EmployeeDeduction:`OEDN`,
      EmployeeAllowance:`OEAE`,
      FiscalYear:`OFSY`,
      PeriodMonthFiscalYear:`OFSY?$select=FSY1Collection &$filter=U_Locked eq '0'`,
      Loan_AdvanceApliation:`OLOA`,
      ActiveEmplyeeInfo: `EmployeesInfo?$select=EmployeeID,LastName,FirstName,eMail,MiddleName&$filter=Active eq 'tYES'&$orderby=EmployeeID`,
      PayRollProcess:`sml.svc/PAYROLLCALCULATIONSUMMARY`,
      PostPayrollProcess:`OPPG`,
    },
     ApprovalProcess:{
      ActiveTemplates:`ApprovalTemplates`,
      ApprovalStatus:`sml.svc/APPROVALSTATUSREPORT`,
      DraftsService:`DraftsService_SaveDraftToDocument`,
    },
    Production:{
     BOM:`ProductTrees`,
     ProductionOrders:`ProductionOrders?$filter=ProductionOrderStatus ne 'boposClosed'`,
     PostProductionOrders:`ProductionOrders`,
     PostIssueForProduction:`InventoryGenExits`,
     PostReceiptFromProduction:`InventoryGenEntries`,
    //  ApprovalStatus:`sml.svc/APPROVALSTATUSREPORT`,
    //  DraftsService:`DraftsService_SaveDraftToDocument`,
   },
   LandedCost: {
    PostLandedCostCodes: `LandedCostsCodes`,
    PostLandedCost: `LandedCosts`,
  
  },
  }
}
export default LINKS
