// Auto-generated from FinanceDetails.txt
const tdl = `
; Created By: pg on 2021-07-30 15:10, ID: 

;; =====================================================================
;; REPORT DEFINITION
;; This section defines the main report structure and initial variables
;; =====================================================================
[report: cwFinanceDetails]
title : "Details"                 ; Report title displayed to users
form : cwFinanceDetails           ; Main form to use for this report
variable : logi1                  ; Toggle variable for switching between Finance and Profile views
set : at beginning : logi1 : yes  ; Initialize logi1 to 'yes' at the start (show Finance view by default)

;; =====================================================================
;; MAIN FORM DEFINITION
;; Defines the primary form layout and behavior
;; =====================================================================
[form : cwFinanceDetails]
option : small size form          ; Set form to use small size layout
button : cwToggleLogi             ; Include toggle button for switching views

part : cwFinanceDetails           ; Include the finance details part
option : cwShowFindetails : ##logi1           ; Show finance details when logi1 is true
option : cwShowProfiledetails : not ##logi1   ; Show profile details when logi1 is false
width:60% screen                  ; Set form width to 60% of screen
height:60% screen                 ; Set form height to 60% of screen
button : cwGetDODetails           ; Include button to get DO (Delivery Order) details

;; =====================================================================
;; CONDITIONAL FORM PARTS
;; Define which parts to show based on the toggle state
;; =====================================================================
[!form : cwshowFinDetails]        ; Form section for finance details
part : cwFinanceOption            ; Include finance options part when in finance view

[!form : cwShowProfiledetails]    ; Form section for profile details
part : cwProfileOption            ; Include profile options part when in profile view

;; =====================================================================
;; KEY BINDING DEFINITION
;; Define keyboard shortcut and action for toggling between views
;; =====================================================================
[key : cwtogglelogi]              ; Define key binding for toggle function
key : alt + 2                     ; Set Alt+2 as the keyboard shortcut
title : if ##logi1 then "Show Profile" else "Show Fin."  ; Dynamic button title based on current state
action : SET : logi1 : not ##logi1                       ; Toggle logi1 value when activated

;; =====================================================================
;; FINANCE DETAILS PART DEFINITION
;; Main container for finance information display
;; =====================================================================
[part : cwFinanceDetails]
line : cwFinanceDetails0, cwFinanceDetails  ; Include header lines
;; {29.Jul.21 18:28} set : 1                ; Set line count to 1 (commented out)
;; {29.Jul.21 18:28} repeat : cwFinanceDetails  ; Repeat finance details (commented out)
;; {29.Jul.21 18:28} scroll : vertical      ; Enable vertical scrolling (commented out)

;; =====================================================================
;; HEADER LINE DEFINITIONS
;; Define the header lines for the finance details section
;; =====================================================================
[line: cwFinanceDetails0]         ; First header line with DO Number
field: sp,nf                      ; Include spacer and number field
Local: Field: sp: info: "DO Number"  ; Label for DO Number
Local: Field: nf: storage: cwdealid   ; Store value in cwdealid variable
Local: Field: nf: Skip forward: Yes   ; Skip this field when tabbing forward
Local: Field: nf: Style: Normal Bold  ; Display in bold style

[line : cwFinanceDetails]         ; Second header line with title
field : nf,fwfc,nf2               ; Include fields for layout
Local: Field: fwfc : set as :if ##logi1 then "Finance and Other Details" else "Profile & Other Details"  ; Dynamic title based on current view
Local: Field: fwfc: Skip: Yes     ; Skip this field when tabbing
Local: Field: fwfc: Style: Normal Bold  ; Display in bold style
Local: Field: fwfc: Border: thinbottom  ; Add thin bottom border
space bottom : 0.50               ; Add space below this line

Local: Field: nf: Skip: Yes       ; Skip these fields when tabbing
Local: Field: nf2: Skip: Yes
Local: Field: fwfc: Skip: Yes
;; {29.Jul.21 18:27} explode : cwFinanceOption      ; Expand finance options (commented out)
;; {29.Jul.21 18:27} explode : cwProfileOption      ; Expand profile options (commented out)

;; =====================================================================
;; FINANCE OPTIONS PART DEFINITION
;; Contains all financial data fields and their layout
;; =====================================================================
[part : cwFinanceOption]
;; {29.Jul.21 15:48} line  : cwFinanceOptionTitle   ; Title line (commented out)
line  : cwFinanceLine1, cwFinanceLine2, cwFinanceLine3, cwFinanceLine4, cwFinanceLine5        ; First set of finance lines
line  : cwFinanceLine6, cwFinanceLine7, cwFinanceLine8, cwFinanceLine9, cwFinanceLine10       ; Second set of finance lines
line  : cwFinanceLine11, cwFinanceLine12, cwFinanceLine13, cwFinanceLine14, cwFinanceLine15   ; Third set of finance lines
line  : cwFinanceLine16, cwFinanceLine17, cwFinanceLine18, cwFinanceLine19, cwFinanceLine20, cwFinanceLine21, cwFinanceLine22  ; Fourth set of finance lines
;; {29.Jul.21 17:18} invisible : not ##logi1        ; Hide when not in finance view (commented out)

;; Finance option title line definition
[line : cwFinanceOptionTitle]
field : fwfc                      ; Include field for title
Local: Field: fwfc :info : ""     ; Empty info text

;; =====================================================================
;; AMOUNT FIELD TEMPLATE DEFINITION
;; Standard definition for amount fields used throughout the form
;; =====================================================================
[field: amtfnew]                  ; Define template for amount fields
type : amount                     ; Set field type to amount
width : @@amountwidth * 1.2       ; Set width relative to standard amount width
align : right                     ; Right-align the content
format :"NoZero,decimals:2,Comma" ; Format with 2 decimal places and commas, hide zeros
;; {29.Jul.21 16:16} set always : yes  ; Always set value (commented out)

;; =====================================================================
;; FINANCE LINE TEMPLATE DEFINITION
;; Base template for all finance data lines
;; =====================================================================
[line : cwFinanceLine0]           ; Template for finance data lines
field: sp,amtfnew,snfx,sp2,snf,snfx2,sp3,snf2  ; Field layout for each line

; Style settings for fields
Local: Field: amtfnew: Style: Normal Bold  ; Bold style for amount field
Local: Field: snf: Style: Normal Bold      ; Bold style for first data field
Local: Field: snf2: Style: Normal Bold     ; Bold style for second data field

; Set fields as read-only
local:field: amtfnew : readonly : yes  ; Amount field is read-only
local:field: snf : readonly : yes      ; First data field is read-only
local:field: snf2 : readonly : yes     ; Second data field is read-only

; Skip settings for separator fields
Local: Field: snfx: Skip: Yes     ; Skip first separator when tabbing
Local: Field: snfx2: Skip: Yes    ; Skip second separator when tabbing

; Format settings for the snf field
local: field: snf: type: amount   ; Set field type to amount
local: field: snf: width : @@amountwidth * 1.2  ; Set width relative to standard amount width
local: field: snf: align : right  ; Right-align the content
local: field: snf: format :"NoZero,decimals:2,Comma"  ; Format with 2 decimal places and commas, hide zeros

;; {29.Jul.21 16:01} Local: Field: amtfnew: Set As: $$value  ; Set value (commented out)
;; {29.Jul.21 15:51} Local: Field: snf: Set As: $$value      ; Set value (commented out)

; Width settings for all fields
Local: field: sp: Width: 1.5 inch    ; Width for first label field
Local: field: sp2: Width: 2.0 inch   ; Width for second label field
;; {31.Jul.21 10:39} Local: Field: sp2: Border: thin box  ; Add border (commented out)
Local: field: sp3: Width: 0.60 inch  ; Width for third label field
Local: field: snf: Width: 6          ; Width for first data field
Local: field: snf2: Width: 1.0 inch  ; Width for second data field
Local : field : snf2: Lines : 0      ; No line wrapping for second data field
Local: field: snfx: Width:1          ; Width for first separator
Local: field: snfx2: Width:1         ; Width for second separator

;; =====================================================================
;; FINANCE DATA LINES DEFINITIONS
;; Each line defines a specific financial data row with labels and storage variables
;; =====================================================================

;; Line 1: Invoice Amount, AddOn Card Requested, Parent ID
[line: cwFinanceLine1]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Invoice Amount'         ; Label for first field
local: field: amtfnew : storage : cwbfInvoiceAmount  ; Storage variable for first field
local: field: sp2 : info: 'AddOn Card Requested'  ; Label for second field
local: field: snf : storage : cwbfAddOnCardRequested  ; Storage variable for second field
local: field: sp3 : info: 'Parent ID'             ; Label for third field
local: field: snf2 : storage : cwbfParentID       ; Storage variable for third field

;; Line 2: Gross Loan Amount, AddOn Card Charges, Field1
[line: cwFinanceLine2]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Gross Loan Amount'      ; Label for first field
local: field: amtfnew : storage : cwbfGrossLoanAmount  ; Storage variable for first field
local: field: sp2 : info: 'AddOn Card Charges'    ; Label for second field
local: field: snf : storage : cwbfAddOnCardCharges  ; Storage variable for second field
local: field: sp3 : info: 'Field1'                ; Label for third field
local: field: snf2 : storage : cwbfField1         ; Storage variable for third field

;; Line 3: Customer Down Payment, InstaCard Activation Fees, Field2
[line: cwFinanceLine3]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Customer Down Payment'  ; Label for first field
local: field: amtfnew : storage : cwbfCustomerDownPayment  ; Storage variable for first field
local: field: sp2 : info: 'InstaCard Activation Fees'  ; Label for second field
local: field: snf : storage : cwbfInstaCardActivationFees  ; Storage variable for second field
local: field: sp3 : info: 'Field2'                ; Label for third field
local: field: snf2 : storage : cwbfField2         ; Storage variable for third field

;; Line 4: Net Loan Amount, IMPS Charges, Field3
[line: cwFinanceLine4]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Net Loan Amount'        ; Label for first field
local: field: amtfnew : storage : cwbfNetLoanAmount  ; Storage variable for first field
local: field: sp2 : info: 'IMPS Charges'          ; Label for second field
local: field: snf : storage : cwbfImpsCharges     ; Storage variable for second field
local: field: sp3 : info: 'Field3'                ; Label for third field
local: field: snf2 : storage : cwbfField3         ; Storage variable for third field

;; Line 5: Other Charges, Net Tenure, Field4
[line: cwFinanceLine5]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Other Charges'          ; Label for first field
local: field: amtfnew : storage : cwbfOtherCharges  ; Storage variable for first field
local: field: amtfnew : set as : $cwbfOtherCharges  ; Set value from variable
local: field: sp2 : info: 'Net Tenure'            ; Label for second field
local: field: snf : storage : cwbfNetTenure       ; Storage variable for second field
local: field: sp3 : info: 'Field4'                ; Label for third field
local: field: snf2 : storage : cwbfField4         ; Storage variable for third field

;; Line 6: SFDCLTV, Subvention%, Field5
[line: cwFinanceLine6]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'SFDCLTV'                ; Label for first field
local: field: amtfnew : storage : cwbfSFDCLTV     ; Storage variable for first field
local: field: sp2 : info: 'Subvention%'           ; Label for second field
local: field: snf : storage : cwbfSubventionPercentage  ; Storage variable for second field
local: field: sp3 : info: 'Field5'                ; Label for third field
local: field: snf2 : storage : cwbfField5         ; Storage variable for third field

;; Line 7: CoBrand Card Charges, Risk Pool Amount, Field6
[line: cwFinanceLine7]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'CoBrand Card Charges'   ; Label for first field
local: field: amtfnew : storage : cwbfCoBrandCardCharges  ; Storage variable for first field
local: field: sp2 : info: 'Risk Pool Amount'      ; Label for second field
local: field: snf : storage : cwbfRiskPoolAmount  ; Storage variable for second field
local: field: sp3 : info: 'Field6'                ; Label for third field
local: field: snf2 : storage : cwbfField6         ; Storage variable for third field

;; Line 8: Subvention, Promo Payable By BFL%, Field7
[line: cwFinanceLine8]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Subvention'             ; Label for first field
local: field: amtfnew : storage : cwbfSubvention  ; Storage variable for first field
local: field: sp2 : info: 'Promo Payable By BFL%'  ; Label for second field
local: field: snf : storage : cwbfPromoPayableByBFLPrcent  ; Storage variable for second field
local: field: sp3 : info: 'Field7'                ; Label for third field
local: field: snf2 : storage : cwbfField7         ; Storage variable for third field

;; Line 9: Margin Money, Promo Payable By Retailer%, Field8
[line: cwFinanceLine9]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Margin Money'           ; Label for first field
local: field: amtfnew : storage : cwbfMarginMoney  ; Storage variable for first field
local: field: sp2 : info: 'Promo Payable By Retailer%'  ; Label for second field
local: field: snf : storage : cwbfPromoPayableByRetailerPrcent  ; Storage variable for second field
local: field: sp3 : info: 'Field8'                ; Label for third field
local: field: snf2 : storage : cwbfField8         ; Storage variable for third field

;; Line 10: MFR Subvention, Promo Payable By Manufacturer%, Field9
[line: cwFinanceLine10]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'MFR Subvention'         ; Label for first field
local: field: amtfnew : storage : cwbfMFRSubvention  ; Storage variable for first field
local: field: sp2 : info: 'Promo Payable By Manufacturer%'  ; Label for second field
local: field: snf : storage : cwbfPromoPayableByManufacturerPrcent  ; Storage variable for second field
local: field: sp3 : info: 'Field9'                ; Label for third field
local: field: snf2 : storage : cwbfField9         ; Storage variable for third field

;; Line 11: BFL Share, Promo Payable By BFL Value, Field10
[line: cwFinanceLine11]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'BFL Share'              ; Label for first field
local: field: amtfnew : storage : cwbfBFLShare    ; Storage variable for first field
local: field: sp2 : info: 'Promo Payable By BFL Value'  ; Label for second field
local: field: snf : storage : cwbfPromoPayableByBFLValue  ; Storage variable for second field
local: field: sp3 : info: 'Field10'               ; Label for third field
local: field: snf2 : storage : cwbfField10        ; Storage variable for third field

;; Line 12: Processing Fees, Promo Payable By Retailer Value, Field11
[line: cwFinanceLine12]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Processing Fees'        ; Label for first field
local: field: amtfnew : storage : cwbfProcessingFees  ; Storage variable for first field
local: field: sp2 : info: 'Promo Payable By Retailer Value'  ; Label for second field
local: field: snf : storage : cwbfPromoPayableByRetailerValue  ; Storage variable for second field
local: field: sp3 : info: 'Field11'               ; Label for third field
local: field: snf2 : storage : cwbfField11        ; Storage variable for third field

;; Line 13: Special Charges, Promo Payable By Manufacturer Value, Field12
[line: cwFinanceLine13]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Special Charges'        ; Label for first field
local: field: amtfnew : storage : cwbfSpecialCharges  ; Storage variable for first field
local: field: sp2 : info: 'Promo Payable By Manufacturer Value'  ; Label for second field
local: field: snf : storage : cwbfPromoPayableByManufacturerValue  ; Storage variable for second field
local: field: sp3 : info: 'Field12'               ; Label for third field
local: field: snf2 : storage : cwbfField12        ; Storage variable for third field

;; Line 14: EMI Card Fee, Total Promo Value, Field13
[line: cwFinanceLine14]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'EMI Card Fee'           ; Label for first field
local: field: amtfnew : storage : cwbfEMICardFee  ; Storage variable for first field
local: field: sp2 : info: 'Total Promo Value'     ; Label for second field
local: field: snf : storage : cwbfTotalPromoValue  ; Storage variable for second field
local: field: sp3 : info: 'Field13'               ; Label for third field
local: field: snf2 : storage : cwbfField13        ; Storage variable for third field

;; Line 15: Upfront Interest, Total Promo%, Field14
[line: cwFinanceLine15]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Upfront Interest'       ; Label for first field
local: field: amtfnew : storage : cwbfUpfrontInterest  ; Storage variable for first field
local: field: sp2 : info: 'Total Promo%'          ; Label for second field
local: field: snf : storage : cwbfTotalPromoPrcent  ; Storage variable for second field
local: field: snf: type: amount                   ; Set field type to amount
local: field: sp3 : info: 'Field14'               ; Label for third field
local: field: snf2 : storage : cwbfField14        ; Storage variable for third field

;; Line 16: Service Charge, VAN, Field15
[line: cwFinanceLine16]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Service Charge'         ; Label for first field
local: field: amtfnew : storage : cwbfServiceCharge  ; Storage variable for first field
local: field: sp2 : info: 'VAN'                   ; Label for second field
local: field: snf : storage : cwbfVAN             ; Storage variable for second field
local: field: snf: type: String                   ; Set field type to String
local: field: sp3 : info: 'Field15'               ; Label for third field
local: field: snf2 : storage : cwbfField15        ; Storage variable for third field

;; Line 17: Total GST On DBD, DME ID
[line: cwFinanceLine17]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Total GST On DBD'       ; Label for first field
local: field: amtfnew : storage : cwbfTotalGSTOnDBD  ; Storage variable for first field
local: field: sp2 : info: 'DME ID'                ; Label for second field
local: field: snf : storage : cwbfDMEID           ; Storage variable for second field
local: field: snf: type: String                   ; Set field type to String
Local: Field: snf2: Skip: Yes                     ; Skip third field

;; Line 18: Total Deductions, Due Days
[line: cwFinanceLine18]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Total Deductions'       ; Label for first field
local: field: amtfnew : storage : cwbfTotalDeductions  ; Storage variable for first field
local: field: sp2 : info: 'Due Days'              ; Label for second field
local: field: snf : storage : cwbfDUEDAY          ; Storage variable for second field
local: field: snf: type: number                   ; Set field type to number
Local: field: snf: Format: "nozero,decimals:0"    ; Format with no decimals, hide zeros
Local: Field: snf2: Skip: Yes                     ; Skip third field

;; Line 19: Net Disbursement, Tenure
[line: cwFinanceLine19]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Net Disbursement'       ; Label for first field
local: field: amtfnew : storage : cwbfNetDisbursement  ; Storage variable for first field
local: field: sp2 : info: 'Tenure'                ; Label for second field
local: field: snf : storage : cwbfTenure          ; Storage variable for second field
local: field: snf: type: number                   ; Set field type to number
Local: field: snf: Format: "nozero,decimals:0"    ; Format with no decimals, hide zeros
;; {31.Jul.21 10:46} local: field: sp3 : info: 'SerialNo'  ; Label for third field (commented out)
;; {31.Jul.21 10:46} local: field: snf2 : storage : cwbfSerialNo  ; Storage variable for third field (commented out)
Local: Field: snf2: Skip: Yes                     ; Skip third field

;; Line 20: Advance EMI
[line: cwFinanceLine20]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Advance EMI'            ; Label for first field
local: field: amtfnew : storage : cwbfAdvanceEMI  ; Storage variable for first field
local: field: sp2 : info: ''                      ; Empty label for second field
local: field: snf : skip : yes                    ; Skip second field
local: field: sp3 : info: ''                      ; Empty label for third field
local: field: snf2 : skip : yes                   ; Skip third field

;; Line 21: Product EMI
[line: cwFinanceLine21]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Product EMI'            ; Label for first field
local: field: amtfnew : storage : cwbfProductEMI  ; Storage variable for first field
local: field: sp2 : info: ''                      ; Empty label for second field
local: field: snf : skip : yes                    ; Skip second field
local: field: sp3 : info: ''                      ; Empty label for third field
local: field: snf2 : skip : yes                   ; Skip third field

;; Line 22: Total EMI
[line: cwFinanceLine22]
use:cwFinanceLine0                ; Use the template defined above
local: field: sp : info: 'Total EMI'              ; Label for first field
local: field: amtfnew : storage : cwbfTotalEMI    ; Storage variable for first field
local: field: sp2 : info: ''                      ; Empty label for second field
local: field: snf : skip : yes                    ; Skip second field
local: field: sp3 : info: ''                      ; Empty label for third field
local: field: snf2 : skip : yes                   ; Skip third field

;; =====================================================================
;; PROFILE OPTIONS PART DEFINITION
;; Contains all profile data fields and their layout
;; =====================================================================
[part : cwProfileOption]
line  : cwProifileLine1, cwProifileLine1a,cwProifileLine2, cwProifileLine3, cwProifileLine4      ; First set of profile lines
line  : cwProifileLine5, cwProifileLine6, cwProifileLine7, cwProifileLine8                       ; Second set of profile lines
line  : cwProifileLine9, cwProifileLine10, cwProifileLine11, cwProifileLine11a                   ; Third set of profile lines
line  : cwProifileLine15,cwProifileLine12, cwProifileLine13, cwProifileLine14, cwProifileLine16  ; Fourth set of profile lines

;; =====================================================================
;; PROFILE LINE TEMPLATE DEFINITION
;; Base template for all profile data lines
;; =====================================================================
[line: cwProifileLine0]           ; Template for profile data lines
field : sp,snf3,sp3,snf2          ; Field layout for each line
  
; Style settings for fields
Local: Field: snf2: Style: Normal Bold  ; Bold style for second data field
Local: Field: snf3: Style: Normal Bold  ; Bold style for first data field
  
; Set fields as read-only
Local: Field: snf3: readonly: Yes  ; First data field is read-only
Local: Field: snf: readonly: Yes   ; Additional data field is read-only
Local: Field: snf2: readonly: Yes  ; Second data field is read-only

; Skip settings for separator fields
Local: Field: snfx: Skip: Yes     ; Skip first separator when tabbing
Local: Field: snfx2: Skip: Yes    ; Skip second separator when tabbing

; Skip forward settings
Local: Field: snf: Skipforward: Yes   ; Skip additional field when tabbing forward
Local: Field: snf2: Skipforward: Yes  ; Skip second data field when tabbing forward

; Width settings for all fields
Local: field: sp: Width: 1.25 inch    ; Width for first label field
Local: field: snf3: Width: 3.0 inch   ; Width for first data field
Local: field: sp3: Width: 1.50 inch   ; Width for second label field
Local: field: snf2: Width: 2 inch     ; Width for second data field
;; {29.Jul.21 18:24} Local: Field: default : Border: thin box  ; Add border to all fields (commented out)

;; =====================================================================
;; PROFILE DATA LINES DEFINITIONS
;; Each line defines a specific profile data row with labels and storage variables
;; =====================================================================

;; Line 1: Dealer Name, Dealer Code
[line: cwProifileLine1]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Dealer Name'            ; Label for first field
local: field: snf3 : storage : cwbfDealerName     ; Storage variable for first field
local: field: sp3 : info: 'Dealer Code'           ; Label for second field
local: field: snf2 : storage : cwbfDealerCode     ; Storage variable for second field

;; Line 1a: Deal Id, Scheme Id
[line: cwProifileLine1a]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Deal Id'                ; Label for first field
local: field: snf3 : storage : cwbfDealID         ; Storage variable for first field
local: field: sp3 : info: 'Scheme Id'             ; Label for second field
local: field: snf2 : storage : cwbfSchemeId       ; Storage variable for second field

;; Line 2: DO Number, Created On
[line: cwProifileLine2]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'DO Number'              ; Label for first field
local: field: snf3 : storage : cwbfDONumber       ; Storage variable for first field
local: field: sp3 : info: 'Created On'            ; Label for second field
local: field: snf2 : storage : cwbfCreatedOn      ; Storage variable for second field

;; Line 3: Status, Invoice Expiry Date
[line: cwProifileLine3]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Status'                 ; Label for first field
local: field: snf3 : storage : cwbfStatus         ; Storage variable for first field
local: field: sp3 : info: 'Invoice Expiry Date'   ; Label for second field
local: field: snf2 : storage : cwbfInvoiceExpiryDate  ; Storage variable for second field

;; Line 4: Customer Name, EMI Card Limit
[line: cwProifileLine4]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Customer Name'          ; Label for first field
local: field: snf3 : storage : cwbfCustomerName   ; Storage variable for first field
local: field: sp3 : info: 'EMI Card Limit'        ; Label for second field
local: field: snf2 : storage : cwbfEMICardLimit   ; Storage variable for second field

;; Line 5: Customer Phone No, Customer Email ID
[line: cwProifileLine5]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Customer Phone No'      ; Label for first field
local: field: snf3 : storage : cwbfCustomerPhoneNo  ; Storage variable for first field
local: field: sp3 : info: 'Customer Email ID'     ; Label for second field
local: field: snf2 : storage : cwbfCustomerEmailID  ; Storage variable for second field

;; Line 6: Address1, Area
[line: cwProifileLine6]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Address1'               ; Label for first field
local: field: snf3 : storage : cwbfAddressLine1   ; Storage variable for first field
local: field: sp3 : info: 'Area'                  ; Label for second field
local: field: snf2 : storage : cwbfArea           ; Storage variable for second field

;; Line 7: Address2, Landmark
[line: cwProifileLine7]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Address2'               ; Label for first field
local: field: snf3 : storage : cwbfAddressLine2   ; Storage variable for first field
local: field: sp3 : info: 'Landmark'              ; Label for second field
local: field: snf2 : storage : cwbfLandmark       ; Storage variable for second field

;; Line 8: Address3, PinCode
[line: cwProifileLine8]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Address3'               ; Label for first field
local: field: snf3 : storage : cwbfAddressLine3   ; Storage variable for first field
local: field: sp3 : info: 'PinCode'               ; Label for second field
local: field: snf2 : storage : cwbfPinCode        ; Storage variable for second field

;; Line 9: City, STATE
[line: cwProifileLine9]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'City'                   ; Label for first field
local: field: snf3 : storage : cwbfCITY           ; Storage variable for first field
local: field: sp3 : info: 'STATE'                 ; Label for second field
local: field: snf2 : storage : cwbfSTATE          ; Storage variable for second field

;; Line 10: PAN, GSTIN
[line: cwProifileLine10]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'PAN'                    ; Label for first field
local: field: snf3 : storage : cwbfCustomerPAN    ; Storage variable for first field
local: field: sp3 : info: 'GSTIN'                 ; Label for second field
local: field: snf2 : storage : cwbfcustomerGSTIN  ; Storage variable for second field

;; Line 11: First Name, Middle Name
[line: cwProifileLine11]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'First Name'             ; Label for first field
local: field: snf3 : storage : cwbfCustomerFirstName  ; Storage variable for first field
local: field: sp3 : info: 'Middle Name'           ; Label for second field
local: field: snf2 : storage : cwbfCustomerMiddleName  ; Storage variable for second field

;; Line 11a: Last Name, Appliances Line
[line: cwProifileLine11a]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Last Name'              ; Label for first field
local: field: snf3 : storage : cwbfCustomerLastName  ; Storage variable for first field
local: field: sp3 : info: 'Appliances Line'       ; Label for second field
local: field: snf2 : storage : cwbfAppliancesLine  ; Storage variable for second field

;; Line 12: Model No (with special formatting)
[line: cwProifileLine12]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Model No'               ; Label for first field
local: field: snf3 : storage : cwbfModelNo        ; Storage variable for first field
Local : field : snf3: Lines : 0                   ; No line wrapping for first data field
Local: Field: snf2: Skip: Yes                     ; Skip second data field
local: field: sp3: Invisible: yes                 ; Hide second label field
local: field: snf2: Invisible: yes                ; Hide second data field
Local: field: snf3: Width: @@namewidth *3         ; Set width relative to standard name width

space top : 1                     ; Add space above this line
space bottom : 0.5                ; Add space below this line

;; Line 13: Make, Digital Line
[line: cwProifileLine13]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Make'                   ; Label for first field
local: field: snf3 : storage : cwbfMAKE           ; Storage variable for first field
local: field: sp3 : info: 'Digital Line'          ; Label for second field
local: field: snf2 : storage : cwbfDigitalLine    ; Storage variable for second field

;; Line 16: Serial No
[line: cwProifileLine16]
use : cwProifileLine0             ; Use the template defined above
local: field: sp : info: 'Serial No'              ; Label for first field
local: field: snf3 : storage : cwbfSerialNo       ; Storage variable for first field
Local: Field: snf2: Skip: Yes                     ; Skip second data field
space top : 0.25                                  ; Add space above this line

`;
export default tdl;
