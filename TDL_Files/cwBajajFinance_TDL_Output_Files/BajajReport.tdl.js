// Auto-generated from BajajReport.txt
const tdl = `
; Created By: pg on 2021-07-31 11:20, ID:

; ==================== MENU CONFIGURATION FOR BAJAJ FINANCE REPORT ==============
; This section adds the Bajaj Finance Report option to the Gateway of Tally menu
; and Account Books menu for easy access

[#menu: Gateway of Tally]
        add: Option: cwBFReportLock  : @@cwdebug

[#menu : account books]
add: Option: cwBFReportLock

; ==================== BAJAJ FINANCE REPORT MENU DEFINITION =====================
; Defines the menu items for the Bajaj Finance Report, including the report display
; and a blank line for visual separation

[!menu: cwBFReportLock]
        add: Item: before: @@locQuit: @@cwBFReportReport: Display: RepcwBFReport
        add: Item: before: @@locQuit: Blank

; ==================== SYSTEM FORMULAS FOR REPORT CONFIGURATION =================
; Defines the report title and any conditional display logic

[System: formula]
   cwBFReportReport: "Bajaj Finance Report"
;; cwBFReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

; ==================== BAJAJ FINANCE REPORT DEFINITION ==========================
; Main report definition including title, form, export options, and date settings

[Report: RepcwBFReport]
        use: Dsp Template
      Title: @@cwBFReportReport
   Printset: Report Title: @@cwBFReportReport
       Form: FrmcwBFReport
     Export: Yes
     set  : svfromdate : ##svcurrentdate
     set  : svTodate : ##svcurrentdate
    Local       : Button   : RelReports        : Inactive : Yes

     variable:str1,str2,logi1,str5 ,logi2

; ==================== BAJAJ FINANCE REPORT FORM DEFINITION =====================
; Form layout and configuration for the Bajaj Finance Report

[Form: FrmcwBFReport]
        use: DSP Template
       Part: DspAccTitles,PrtTitle0cwBFReport,PrtcwBFReport
      Width: 100% Page
     Height: 100% Page
;; {31.Jul.21 11:23}  Background: @@SV_STOCKSUMMARY
     delete: page break
        add: page break: cwBFReportbotbrk,cwBFReportbotOpbrk
Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
;;    local : button : report config : action :modify variable: MyPLConfigure

 ; Add buttons for export and processing functionality
 add : button : cwreportUploadFin
 add : option : cwUpdateFromReport : @@cwDOUpdateFromReport
 add : option : cwReportProcessFin : yes

; ==================== CONDITIONAL BUTTON CONFIGURATIONS ========================
; Adds buttons based on specific conditions for report processing and updates

[!form: cwReportProcessFin]
 add: button : cwReportProcessFin

[!form :  cwUpdateFromReport]
add : button: cwDetailsBtn

; ==================== EXPORT FINANCE BUTTON DEFINITION =========================
; Button for exporting finance data with keyboard shortcut

[Button: cwreportUploadFin]
title : "Export Fin."
key : alt + U
scope : Selected
action : call :cwExportforSigningy
inactive:not @@cwExpPdfFromReport

; ==================== PROCESS FINANCE BUTTON DEFINITION ========================
; Button for processing finance data with keyboard shortcut

[button:cwReportProcessFin]
title:"Process Fin"
key : alt + F
action : call: cwProcessFin

/*[Button:cwRepInvBtn]
Title:"Inv"
Key: Alt + I
scope : Selected
Inactive: $$NumLinesInScope>1
Action  : print :RepBajajExportPdf

 [button : cwRepExportBtn]
 title : "Export PDf"
 key : Alt + 1
 scope : Selected
 action :call : cwfunExportPdf
 Inactive: $$NumLinesInScope>1  */

; ==================== FINANCE PROCESSING FUNCTION ==============================
; Function to process finance data by executing an external application

[Function: cwProcessFin]
variable : cwExePath : string : @@cwUploaderExePath

;; {01.Nov.21 18:57} 10 : log :"Process Fin"
;; {01.Nov.21 18:57} 11 : log : "a "+##cwExePath + " " + "Auto"
;; {01.Nov.21 18:57} 12 : log : ##svvouchertype
;; {01.Nov.21 18:57} 13 : log : "c " +$cwInvoiceUploader:vouchertype:##svvouchertype
;; {01.Nov.21 18:57} 14 : log : "d " + $cwInvoiceUploader:COMPANY:##SVCURRENTCOMPANY

10 : exec command : ##cwExePath : "Auto"

; ==================== PAGE BREAK PARTS DEFINITION ==============================
; Defines parts for page breaks in the report

[part: cwBFReportbotBrk]
       line: EXPINV PageBreak
     border: thin top

[part: cwBFReportbotopbrk]
        use: dspacctitles
  add: part: cwBFReportTitlePart

[part: cwBFReportTitlePart]
       line: LncwBFReportTitle

; ==================== CURRENT PERIOD DISPLAY LINE ==============================
; Line showing the current period in the report header

[line: LncwBFReportCurrPeriod]
      field: fwf,fwf2
      Local: field: fwf2: Align: Right
      Local: Field: fwf: Style: normal bold
      Local: Field: fwf2: Style: normal bold
      Local: Field: fwf2: Set As: @@dspDateStr
  invisible: $$inprintmode

; ==================== REPORT TITLE PARTS =======================================
; Parts defining the title section of the report

[part: PrtTitle0cwBFReport]
      line : LncwBFReportCurrPeriod

; ==================== MAIN REPORT CONTENT PART =================================
; Defines the main content part of the report with lines, scrolling, and totals

[Part: PrtcwBFReport]
       Line: LncwBFReportTitle,LncwBFReport
bottom Line: LncwBFReportTotals
     repeat: LncwBFReport: ColcwBFReport
     scroll: both
 Common Border: YEs
      Total: Qtyf,amtf

; ==================== REPORT DATA COLLECTION ==================================
; Collection defining the data source for the report

[Collection: ColcwBFReport]
        Use: Vouchers of Company
     delete: filter : daybookfilter
     Filter: ColcwBFReportFilter,IsNonOptionalCancelledVchs   ;;,CHECKLOGI
    ; compute: cwvchDealids : $$fulllist:allInventoryEntries:$cwdealid
      fetch:BasicBuyername,BasicBuyerAddress,Address
    
    ; Filter formula to include only sales vouchers
    [system: Formula]
ColcwBFReportFilter: if $$issales:$vouchertypename then yes else no ;; $cwbajfinapplcable else no

 CHECKLOGI : IF ##LOGI2 THEN YES ELSE NOT $cwisexported

; ==================== REPORT TITLE LINE DEFINITION =============================
; Defines the column headers for the report

[Line: LncwBFReportTitle]
        use: LncwBFReport
     option: titleopt
     local: field: default : style: small bold
;;     local: field:default: set as: $$DescName
local:field: sdf: set as: "Date"
local:field: nf: set as: "Vch Type"
local:field: nf3: set as: "Particulars"
local:field: nf2: set as: "Vch No."
local:field: amtf: set as: "Vch Value"
local:field: ratepf : set as : "Rate"
Local: Field: nf4: Set As: "DO Number"

; ==================== FINANCE FIELDS COLUMN HEADERS ===========================
; Defines column headers for various finance-related fields

local: field: amtf1 : info: 'Invoice Amount' ;;
local: field: amtf2 : info: 'Gross Loan Amount' ;;
local: field: amtf3 : info: 'Customer Down Payment' ;;
local: field: amtf4 : info: 'Net Loan Amount' ;;
local: field: amtf5 : info: 'Other Charges' ;;
local: field: amtf6 : info: 'SFDCLTV' ;;
local: field: amtf7 : info: 'CoBrand Card Charges' ;;
local: field: amtf8 : info: 'Subvention' ;;
local: field: amtf9 : info: 'Margin Money' ;;
local: field: amtf10 : info: 'MFR Subvention' ;;
local: field: amtf11 : info: 'BFL Share' ;;
local: field: amtf12 : info: 'Processing Fees' ;;
local: field: amtf13 : info: 'Special Charges' ;;
local: field: amtf14 : info: 'EMI Card Fee' ;;
local: field: amtf15 : info: 'Total Deductions' ;;
local: field: amtf16 : info: 'Net Disbursement' ;;
local: field: amtf17 : info: 'Total GST On DBD' ;;
local: field: amtf18 : info: 'Advance EMI' ;;
local: field: amtf19 : info: 'Product EMI' ;;
local: field: amtf20 : info: 'Total EMI' ;;

; ==================== ADDITIONAL FINANCE FIELDS COLUMN HEADERS ================
; Defines column headers for additional finance-related fields

local: field: snf : info: 'Add On Card Requested' ;;
local: field: snf1 : info: 'Add On Card Charges' ;;
local: field: snf2 : info: 'Insta Card Activation Fees' ;;
local: field: snf3 : info: 'IMPS Charges' ;;
local: field: snf4 : info: 'Net Tenure' ;;
local: field: snf5 : info: 'Subvention Percentage' ;;
local: field: snf6 : info: 'Risk Pool Amount' ;;
local: field: snf7 : info: 'Promo Payable By BFL Prcent' ;;
local: field: snf8 : info: 'Promo Payable By Retailer Prcent' ;;
local: field: snf9 : info: 'Promo Payable By Manufacturer Prcent' ;;
local: field: snf10 : info: 'Promo Payable By BFL Value' ;;
local: field: snf11 : info: 'Promo Payable By Retailer Value' ;;
local: field: snf12 : info: 'Promo Payable By Manufacturer Value' ;;
local: field: snf13 : info: 'Total Promo Value' ;;
local: field: snf14 : info: 'Upfront Interest' ;;
local: field: snf15 : info: 'Service Charge' ;;
local: field: snf16 : info: 'Total Promo Percent' ;;
local: field: snf17 : info: 'DUEDAY' ;;
local: field: snf18 : info: 'Tenure' ;;

; ==================== CUSTOM FIELDS COLUMN HEADERS ============================
; Defines column headers for custom fields and additional information

local: field: snf19 : info: 'Parent ID' ;;
local: field: snf20 : info: 'Field1' ;;
local: field: snf21 : info: 'Field2' ;;
local: field: snf22 : info: 'Field3' ;;
local: field: snf23 : info: 'Field4' ;;
local: field: snf24 : info: 'Field5' ;;
local: field: snf25 : info: 'Field6' ;;
local: field: snf26 : info: 'Field7' ;;
local: field: snf27 : info: 'Field8' ;;
local: field: snf28 : info: 'Field9' ;;
local: field: snf29 : info: 'Field10' ;;
local: field: snf30 : info: 'Field11' ;;
local: field: snf31 : info: 'Field12' ;;
local: field: snf32 : info: 'Field13' ;;
local: field: snf33 : info: 'Field14' ;;
local: field: snf34 : info: 'Field15' ;;
local: field: snf35 : info: 'VAN' ;;
local: field: snf36 : info: 'DMEID' ;;
local: field: snf37 : info: 'Serial No' ;;

; ==================== DEALER AND CUSTOMER INFORMATION HEADERS =================
; Defines column headers for dealer and customer information

local: field: snf38 : info: 'Dealer Name' ;;
local: field: snf39 : info: 'DO Number' ;;
local: field: snf40 : info: 'Status' ;;
local: field: snf41 : info: 'Customer Name' ;;
local: field: snf42 : info: 'Customer Phone No' ;;
local: field: snf43 : info: 'Address Line 1' ;;
local: field: snf44 : info: 'Address Line 2' ;;
local: field: snf45 : info: 'Address Line 3' ;;
local: field: snf46 : info: 'City' ;;
local: field: snf47 : info: 'Customer PAN' ;;
local: field: snf48 : info: 'Customer First Name' ;;
local: field: snf49 : info: 'Model No' ;;
local: field: snf50 : info: 'Make' ;;
local: field: snf51 : info: 'Asset Category' ;;
local: field: snf52 : info: 'Cd Line' ;;

; ==================== ADDITIONAL DEALER AND DATE INFORMATION HEADERS ==========
; Defines column headers for additional dealer and date information

local: field: snf53 : info: 'Dealer Code' ;;
local: field: snf54 : info: 'Created On' ;;
local: field: snf55 : info: 'Invoice Expiry Date' ;;
local: field: snf56 : info: 'Customer Middle Name' ;;
local: field: snf57 : info: 'Appliances Line' ;;

; ==================== DEAL AND SCHEME INFORMATION HEADERS =====================
; Defines column headers for deal and scheme information

local: field: snf58 : info: 'Deal ID' ;;
local: field: snf59 : info: 'Scheme Id' ;;
local: field: snf60 : info: 'EMI CardL imit' ;;
local: field: snf61 : info: 'Customer Email ID' ;;
local: field: snf62 : info: 'Area' ;;
local: field: snf63 : info: 'Landmark' ;;
local: field: snf64 : info: 'Pin Code' ;;
local: field: snf65 : info: 'STATE' ;;
local: field: snf66 : info: 'customer GSTIN' ;;
local: field: snf67 : info: 'Customer Last Name' ;;
local: field: snf68 : info: 'Cobrand Card Limit' ;;
local: field: snf69 : info: 'Manufacturer Name' ;;
local: field: snf70 : info: 'Digital Line' ;;

; ==================== REPORT DATA LINE DEFINITION =============================
; Defines the data line format for the report with all fields

[Line: LncwBFReport]
     Fields:sdf,nf3,nf,nf2 ,amtf ,nf4
     Local: Field: amtf: Color : if $$explodelevel = 0 then "blue" else "black"

     ; Finance-related fields
     field: amtf1, amtf2, amtf3, amtf4, amtf5, amtf6, amtf7, amtf8, amtf9, amtf10, amtf11, amtf12, amtf13, amtf14, amtf15, amtf16, amtf17, amtf18, amtf19, amtf20
     ; Additional finance fields
     field: snf, snf1, snf2, snf3, snf4, snf5, snf6, snf7, snf8, snf9, snf10, snf11, snf12, snf13, snf14, snf15, snf16, snf17, snf18
     ; Custom fields
     field: snf19, snf20, snf21, snf22, snf23, snf24, snf25, snf26, snf27, snf28, snf29, snf30, snf31, snf32, snf33, snf34, snf35, snf36, snf37
     ; Dealer and customer information fields
     field: snf38, snf39, snf40, snf41, snf42, snf43, snf44, snf45, snf46, snf47, snf48, snf49, snf50, snf51, snf52
     ; Additional dealer and date information fields
     field: snf53, snf54, snf55, snf56, snf57
     ; Deal and scheme information fields
     field: snf58, snf59, snf60, snf61, snf62, snf63, snf64, snf65, snf66, snf67, snf68, snf69, snf70

     ; Field formatting and behavior configuration
     Option: Alter on Enter
local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
;;local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero,decimals:0"
local:field: ratepf : setas  : #amtf/#qtyf
     local: field: nf3: alter : voucher : $$isvoucher
option : alter on enter
local : field : nf3 : alter : voucher : $$isvoucher
;; local : field : nf3 : alter : ledger : $$isledger

; Field value assignments based on explode level
Local: Field: nf3: Set As: if $$explodelevel = 0 then  $partyledgername  else $stockitemname
local : field : nf3 : indent : $$explodelevel * 2
Local: Field: nf: Set As: if $$explodelevel = 0 then  $vouchertypename else ""
 local : field : sdf : set as : if $$explodelevel = 0 then  $date   else ""
 Local: Field: nf2: Set As:if $$explodelevel = 0 then  $vouchernumber else ""
 Local: Field: nf4: Set As: if $$explodelevel = 0 then  "" else $cwdealid

 Local: Field: default: Style: small

 ; Explode configuration for inventory details
 explode : cwInvDetails

 ; ==================== FINANCE FIELD VALUE ASSIGNMENTS =========================
 ; Assigns values to finance-related fields from system variables

 local: field: amtf1 : set as: $cwbfInvoiceAmount ;;
local: field: amtf2 : set as: $cwbfGrossLoanAmount ;;
local: field: amtf3 : set as: $cwbfCustomerDownPayment ;;
local: field: amtf4 : set as: $cwbfNetLoanAmount ;;
local: field: amtf5 : set as: $cwbfOtherCharges ;;
local: field: amtf6 : set as: $cwbfSFDCLTV ;;
local: field: amtf7 : set as: $cwbfCoBrandCardCharges ;;
local: field: amtf8 : set as: $cwbfSubvention ;;
local: field: amtf9 : set as: $cwbfMarginMoney ;;
local: field: amtf10 : set as: $cwbfMFRSubvention ;;
local: field: amtf11 : set as: $cwbfBFLShare ;;
local: field: amtf12 : set as: $cwbfProcessingFees ;;
local: field: amtf13 : set as: $cwbfSpecialCharges ;;
local: field: amtf14 : set as: $cwbfEMICardFee ;;
local: field: amtf15 : set as: $cwbfTotalDeductions ;;
local: field: amtf16 : set as: $cwbfNetDisbursement ;;
local: field: amtf17 : set as: $cwbfTotalGSTOnDBD ;;
local: field: amtf18 : set as: $cwbfAdvanceEMI ;;
local: field: amtf19 : set as: $cwbfProductEMI ;;
local: field: amtf20 : set as: $cwbfTotalEMI ;;

; ==================== ADDITIONAL FINANCE FIELD VALUE ASSIGNMENTS ==============
; Assigns values to additional finance-related fields

local: field: snf : set as : $cwbfAddOnCardRequested ;;
local: field: snf1 : set as : $cwbfAddOnCardCharges ;;
local: field: snf2 : set as : $cwbfInstaCardActivationFees ;;
local: field: snf3 : set as : $cwbfImpsCharges ;;
local: field: snf4 : set as : $cwbfNetTenure ;;
local: field: snf5 : set as : $cwbfSubventionPercentage ;;
local: field: snf6 : set as : $cwbfRiskPoolAmount ;;
local: field: snf7 : set as : $cwbfPromoPayableByBFLPrcent ;;
local: field: snf8 : set as : $cwbfPromoPayableByRetailerPrcent ;;
local: field: snf9 : set as : $cwbfPromoPayableByManufacturerPrcent ;;
local: field: snf10 : set as : $cwbfPromoPayableByBFLValue ;;
local: field: snf11 : set as : $cwbfPromoPayableByRetailerValue ;;
local: field: snf12 : set as : $cwbfPromoPayableByManufacturerValue ;;
local: field: snf13 : set as : $cwbfTotalPromoValue ;;
local: field: snf14 : set as : $cwbfUpfrontInterest ;;
local: field: snf15 : set as : $cwbfServiceCharge ;;
local: field: snf16 : set as : $cwbfTotalPromoPrcent ;;
local: field: snf17 : set as : $cwbfDUEDAY ;;
local: field: snf18 : set as : $cwbfTenure ;;

; ==================== CUSTOM FIELD VALUE ASSIGNMENTS ==========================
; Assigns values to custom fields

local: field: snf19 : set as : $cwbfParentID ;;
local: field: snf20 : set as : $cwbfField1 ;;
local: field: snf21 : set as : $cwbfField2 ;;
local: field: snf22 : set as : $cwbfField3 ;;
local: field: snf23 : set as : $cwbfField4 ;;
local: field: snf24 : set as : $cwbfField5 ;;
local: field: snf25 : set as : $cwbfField6 ;;
local: field: snf26 : set as : $cwbfField7 ;;
local: field: snf27 : set as : $cwbfField8 ;;
local: field: snf28 : set as : $cwbfField9 ;;
local: field: snf29 : set as : $cwbfField10 ;;
local: field: snf30 : set as : $cwbfField11 ;;
local: field: snf31 : set as : $cwbfField12 ;;
local: field: snf32 : set as : $cwbfField13 ;;
local: field: snf33 : set as : $cwbfField14 ;;
local: field: snf34 : set as : $cwbfField15 ;;
local: field: snf35 : set as : $cwbfVAN ;;
local: field: snf36 : set as : $cwbfDMEID ;;
local: field: snf37 : set as : $cwbfSerialNo ;;

; ==================== DEALER AND CUSTOMER INFORMATION VALUE ASSIGNMENTS =======
; Assigns values to dealer and customer information fields

local: field: snf38 : set as : $cwbfDealerName ;;
local: field: snf39 : set as : $cwbfDONumber ;;
local: field: snf40 : set as : $cwbfStatus ;;
local: field: snf41 : set as : $cwbfCustomerName ;;
local: field: snf42 : set as : $cwbfCustomerPhoneNo ;;
local: field: snf43 : set as : $cwbfAddressLine1 ;;
local: field: snf44 : set as : $cwbfAddressLine2 ;;
local: field: snf45 : set as : $cwbfAddressLine3 ;;
local: field: snf46 : set as : $cwbfCITY ;;
local: field: snf47 : set as : $cwbfCustomerPAN ;;
local: field: snf48 : set as : $cwbfCustomerFirstName ;;
local: field: snf49 : set as : $cwbfModelNo ;;
local: field: snf50 : set as : $cwbfMAKE ;;
local: field: snf51 : set as : $cwbfassetCategory ;;
local: field: snf52 : set as : $cwbfCdLine ;;

; ==================== ADDITIONAL DEALER AND DATE VALUE ASSIGNMENTS ============
; Assigns values to additional dealer and date information fields

local: field: snf53 : set as : $cwbfDealerCode ;;
local: field: snf54 : set as : $cwbfCreatedOn ;;
local: field: snf55 : set as : $cwbfInvoiceExpiryDate ;;
local: field: snf56 : set as : $cwbfCustomerMiddleName ;;
local: field: snf57 : set as : $cwbfAppliancesLine ;;

; ==================== DEAL AND SCHEME VALUE ASSIGNMENTS =======================
; Assigns values to deal and scheme information fields

local: field: snf58 : set as : $cwbfDealID ;;
local: field: snf59 : set as : $cwbfSchemeId ;;
local: field: snf60 : set as : $cwbfEMICardLimit ;;
local: field: snf61 : set as : $cwbfCustomerEmailID ;;
local: field: snf62 : set as : $cwbfArea ;;
local: field: snf63 : set as : $cwbfLandmark ;;
local: field: snf64 : set as : $cwbfPinCode ;;
local: field: snf65 : set as : $cwbfSTATE ;;
local: field: snf66 : set as : $cwbfcustomerGSTIN ;;
local: field: snf67 : set as : $cwbfCustomerLastName ;;
local: field: snf68 : set as : $cwbfCobrandCardLimit ;;
local: field: snf69 : set as : $cwbfManufacturerName ;;
local: field: snf70 : set as : $cwbfDigitalLine ;;

; Field border configuration
Local: Field: default: Border: thin box ;;left right

; ==================== INVENTORY DETAILS PART DEFINITION =======================
; Part for displaying inventory details in the report

[part : cwInvDetails]
 line : cwInvDetails
 repeat : cwInvDetails : InventoryEntries

; ==================== INVENTORY DETAILS LINE DEFINITION =======================
; Line definition for inventory details, inheriting from the main report line

[line : cwInvDetails]
 use : LncwBFReport
 delete : explode

; ==================== REPORT TOTALS LINE DEFINITION ===========================
; Defines the totals line at the bottom of the report

[line: LncwBFReportTotals]
        use: LncwBFReport
     option: totalOpt
      local: field: nf3: align: right
      local: field: default : style: normal bold
      local: field: qtyf: set as: $$total:qtyf
      local: field: fwf: set as: "Total"
      local: field: fwf: set as: ""
      local: field: amtf : set as :  $$total:amtf

`;
export default tdl;
