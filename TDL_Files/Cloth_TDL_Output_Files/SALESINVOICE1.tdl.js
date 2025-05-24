// Auto-generated from SALESINVOICE1.TXT
const tdl = `
; Created By: Khokan on 2021-04-09 17:56, ID: 

;; ===================================================================
;; INVOICE PRINTING FORMAT CUSTOMIZATION
;; ===================================================================
;; This TDL script customizes the invoice printing format in Tally
;; It defines various form layouts, fields, and formatting options
;; for sales invoices, credit notes, and related documents
;; ===================================================================

[#Form: VCHPRN Sales]
;; {17.Aug.21 18:38}  Add: BottomButton: At Beginning: salrepnew
;; Adds a button to the bottom of the sales voucher printing screen

 [KEY : salrepnew]
 ;; Defines a function key for toggling between Normal and Packing Slip formats
 title:"Print Format"
 KEY : F8

 TITLE :"Normal" ;if ##logi1 then "Normal"  else "Packing Slip"
 action :set : logi1:not ##logi1
 ;; Toggles the logical value logi1 when the button is clicked
 
 
 [System: Formula]
 ;; Formula to check if invoice cost option is enabled for the current voucher type
 cwEnableInvoiceCostopt:$cwEnableInvoiceCost:vouchertype:$vouchertypename="yes"

 
 
;; ===================================================================
;; FORM DEFINITIONS AND OPTIONS
;; ===================================================================

[#form : Simple Printed Invoice]
;; {13.Apr.21 18:08}    add : option :salesinvOpt:##logi1 and @@issales
   ;; Adds the salesinvOpt option to Simple Printed Invoice when conditions are met
   add : option :salesinvOpt:@@cwNormalInvoicenew and @@issales  and @@cwEnableInvoiceCostopt

;; {29.Apr.22 18:03}    add : option :salesinvOpt:@@cwNormalInvoicenew and @@issales and @@cwEnableInvoiceCostopt
   
   ;; Adds credit note option when the document is a credit note
   add : option :crnotesalesinvOpt:@@cwNormalInvoicenew and @@IsCreditNote ;;and @@cwEnableInvoiceCostopt
;; {17.Aug.21 20:34}    add : option : fnsalesinvOpt :@@cwbl2 and @@issales


[#form : ComprehensiveInvoice]
;; {19.Aug.21 14:09}    add : option :salesinvOpt:@@cwNormalInvoicenew and @@issales  and @@cwEnableInvoiceCostopt
;; {03.Jul.21 13:21}     add : option :crnotesalesinvOpt:@@cwNormalInvoicenew and @@IsCreditNote ;;and @@cwEnableInvoiceCostopt
;; {17.Aug.21 20:34}    add : option : fnsalesinvOpt :@@cwbl2 and @@issales or not @@IsCreditNote

;; ===================================================================
;; SALES INVOICE OPTION FORM DEFINITION
;; ===================================================================

[!form : salesinvOpt]
;; Main form definition for sales invoice option
;; Clears existing parts and defines new structure
Delete : Part
Delete : Bottom Part
Delete : Page Break
   add : Top part : salesinvTopPart1,salesinvTopPart,salesinvTopPart2,partTransporter
   add : Part : salesinvInvACCPart
   Add : bottom Part :  salesinvBottomPart,salesinvBottomPart2,salesinvBottomPart3,salesinvBottomPart4
   add : page Break : salesinvCLBreak, salesinvOPBreak
   ;; Disables pre-printed borders for all elements
   Local       : Part      : Default   : PrePrintedBorder  : no
    Local       : Line      : Default   : PrePrintedBorder  : no
    Local       : Field     : Default   : PrePrintedBorder  : no

[form : cwsalesinvOpt]
;; Custom sales invoice option form
;; Similar structure to salesinvOpt but with different parts
Delete : Part
Delete : Bottom Part
Delete : Page Break
   add : Top part : salesinvTopPart,salesinvTopPart2,partTransporter
   add : Part : salesinvInvACCPart
   Add : bottom Part :  salesinvBottomPart,salesinvBottomPart2,salesinvBottomPart3,salesinvBottomPart4
   add : page Break : salesinvCLBreak, salesinvOPBreak
   
;; Page dimension settings for the invoice
Width  		: @@InvWidth Inch
Height 		: @@InvHeight Inch
Space Top   : @@InvSpace inch
Space Right : 0.5 inch
Space Left  : @@InvSpaceLeft  inch
Space Bottom: 0.25 inch


[form : cwcrnotesalesinvOpt]
;; Custom credit note sales invoice option form
Delete : Part
Delete : Bottom Part
Delete : Page Break
   add : Top part : salesinvTopPart,salesinvTopPart2,partTransporter
   add : Part : salesinvInvACCPart
   Add : bottom Part :  salesinvBottomPart,salesinvBottomPart2,salesinvBottomPart3,salesinvBottomPart4
   add : page Break : salesinvCLBreak, salesinvOPBreak

;; Page dimension settings for the credit note
Width  		: @@InvWidth Inch
Height 		: @@InvHeight Inch
Space Top   : @@InvSpace inch
Space Right : 0.5 inch
Space Left  : @@InvSpaceLeft  inch
Space Bottom: 0.25 inch

   
[!form : crnotesalesinvOpt]
;; Main form definition for credit note sales invoice option
Delete : Part
Delete : Bottom Part
Delete : Page Break
   add : Top part : salesinvTopPart1,salesinvTopPart,salesinvTopPart2,partTransporter
   add : Part : salesinvInvACCPart
   Add : bottom Part :  salesinvBottomPart,salesinvBottomPart2,salesinvBottomPart3,salesinvBottomPart4
   add : page Break : salesinvCLBreak, salesinvOPBreak


;; ===================================================================
;; PAGE BREAK PARTS DEFINITION
;; ===================================================================

[Part : salesinvCLBreak]
   ;; Defines content to show at page breaks (bottom part)
   use : salesinvBottomPart

[Part : salesinvOpBreak]
  ;; Defines content to show at page breaks (top part)
  part : salesinvTopPart

;; ===================================================================
;; TOP PART DEFINITIONS - HEADER SECTION
;; ===================================================================

[part : salesinvTopPart1]
  ;; Top part of the invoice containing QR code and IRN details
  part:PackingslipsalesinvTopPartb1,PackingslipsalesinvTopParta1

   
[part:PackingslipsalesinvTopParta1]
   ;; Contains QR code for e-invoice
   Line		: Qurlogoline1
   QRCode	: @@eInvoiceQRCValue : Yes

   space left:@@cwSapceLeftqr  ;; ##qrspaceHeightnew
   ;; Local       : Field     : Default   : PrePrintedBorder  : Yes
   
;; {05.May.22 12:43}    option:salesinvTopPart1opt:##SVPrePrinted="yes"
   
[!part:salesinvTopPart1opt]
    ;; Removes QR code when using pre-printed stationery
    delete:QRCode	: @@eInvoiceQRCValue : Yes
    
[System: Formula]
  ;; Formula to get QR code spacing from company settings
  cwSapceLeftqr:$cwSapceLeftqr:COMPANY:##SVCURRENTCOMPANY	

[line:Qurlogoline1]
  ;; Empty line for spacing in QR code section
  field:snf
  Local: Field: snf: Set As:""
 
 
[part:PackingslipsalesinvTopPartb1]
  ;; Contains IRN and acknowledgment details for e-invoice
  line:cwirnlinem1,cwirnlinem,cwacknolinem,cwackdtlinem

[line:cwirnlinem1]
  ;; Conditional visibility line for IRN section
  field:snf
  local: field: default: Invisible:if @@cwChangePrintFormatnew="yes" then yes else no

[line:cwirnlinem]
  ;; Line displaying IRN (Invoice Reference Number) for e-invoice
  field:sp,nf

  Local: Field: sp: Set As:if $$isempty:@@gsteinvirn then "" else "IRN"
  Local: Field: nf: Set As:@@gsteinvirn

;; {05.May.22 12:43} Local: Field: sp: Set As:if $$isempty:@@gsteinvirn or ##SVPrePrinted="yes" then "" else "IRN"
;; {05.May.22 12:43} Local: Field: nf: Set As:if ##SVPrePrinted="yes" then "" else @@gsteinvirn

  ;; Field formatting for IRN display
  Local: field: sp: Width:7
  Local : field : nf: Lines : 0
  Local: Field: default: Style:small

[line:cwacknolinem]
  ;; Line displaying acknowledgment number for e-invoice
  use:cwirnlinem

;; {05.May.22 12:41} Local: Field:sp:Set As:if $$isempty:@@cwackno or ##SVPrePrinted="yes" then "" else "ACK NO."
;; {05.May.22 12:41} Local: Field:nf:Set As:if ##SVPrePrinted="yes" then "" else @@cwackno ;;+" "+@@cwakcdate+@@cwdate;;"Date"+" "+@@cwdate

  Local: Field:sp:Set As:if $$isempty:@@cwackno then "" else "ACK NO."
  Local: Field:nf:Set As:@@cwackno ;;+" "+@@cwakcdate+@@cwdate;;"Date"+" "+@@cwdate


[line:cwackdtlinem]
  ;; Line displaying acknowledgment date for e-invoice
  use:cwirnlinem

  Local: Field:sp:Set As:if $$isempty:@@cwackdate then "" else "Date:"
  Local: Field:nf:Set As:@@cwackdate    ;;++" "+@@cwakcdate+@@cwdate;;"Date"+" "+@@cwdate

;; {05.May.22 12:41} Local: Field:sp:Set As:if $$isempty:@@cwackdate or ##SVPrePrinted="yes" then "" else "Date:"
;; {05.May.22 12:41} Local: Field:nf:Set As:if ##SVPrePrinted="yes" then "" else @@cwackdate    ;;++" "+@@cwakcdate+@@cwdate;;"Date"+" "+@@cwdate


;; ===================================================================
;; INVOICE HEADER SECTION
;; ===================================================================
 
[part : salesinvTopPart]
  ;; Main header part of the invoice
  line :copymsline,cwblankline,invdateline,cwblankline2,cwblankline3

  ;;border:thin box

[line : copymsline]
  ;; Line for copy message (Original/Duplicate)
  right field:fwf,copyfield
  local: field: copyfield: Invisible: yes

  Local: Field: fwf: Set As:"" ;;#copyfield
  Local: field: fwf: Align: Right ;;centre

[line : invdateline]
  ;; Line displaying invoice number and date
  field:snfx,sdf
  right field:snf
  ;; Conditionally displays voucher number or formatted date based on print format setting
  Local: Field: sdf: Set As:if @@cwChangePrintFormatnew="yes" then $vouchernumber else @@cwshortmfdm
  local: field: sdf: type: String
  Local: Field: snf: Set As:if @@cwChangePrintFormatnew="yes" then @@cwshortmfdm else $vouchernumber
  Local: Field: default: Style: Normal Bold
  ;; {11.Apr.22 16:24} Local: Field: sdf: Border: thin box ;;left right
  Local: field: sdf: Width:20

[System: Formula]
  ;; Formula to get print format setting from company configuration
  cwChangePrintFormatnew:$cwChangePrintFormat:COMPANY:##SVCURRENTCOMPANY

;;=====================================
[System: Formula]
  ;; Formulas for date formatting in DD/MM/YY format
  cwshortmfdm : if not $$isempty:$date then @@cwshmfddaysm +"/"+ @@CWSHmfdMONm + "/"+ @@CWSHmfdYRm else "" ;; +  else ""
  cwshmfdDaysm : if @@cwshmfdDays1m < 10 then "0" + $$string:@@cwshmfdDays1m else $$string:@@cwshmfdDays1m
  CWSHmfdMONm  : if @@CWSHmfdMON1m < 10 then "0"+$$string:@@CWSHmfdMON1m else $$string:@@CWSHmfdMON1m
  CWSHmfdYRm  : if @@CWSHmfdYR1m < 10 then "0"+$$string:@@CWSHmfdYR1m else $$string:@@CWSHmfdYR1m

  ;; Extracts day, month and year components from the date
  cwshmfdDays1m: $$DAYOFDATE:$date
  CWSHmfdMON1m : $$MONTHOFDATE:$date
  CWSHmfdYR1m : $$YEAROFDATE:$date
;;=====================================


;; ===================================================================
;; BILL TO AND SHIP TO SECTIONS
;; ===================================================================

[part:salesinvTopPart2]
  ;; Contains Bill To and Ship To address sections
  part:salesinvTopPart2a
  part:salesinvTopPart2b
  ;; {14.Apr.21 15:06} border:thin box
  ;; {14.Apr.21 16:21} height:13.8 ;;15
  height:11.8 ;;13.8 ;;15

[part:salesinvTopPart2a]
  ;; Bill To section - contains buyer details
  line:cwblankline,cwblankline2,billtoline,billaddline,billtostateline,billtostatecodeline,citybuyerline,billtogstinline

  Repeat  : billaddline :  cwParty


[line:mscwblanklinex]
  ;; Blank line for spacing
  field:snf
  height:0.8

[line:billtoline]
  ;; Line displaying party name in Bill To section
  field:fwf
  Local   : Field : fwf  : Set as    :$PARTYMAILINGNAME  ;; $partyledgername
  space bottom:0.3
  Local: Field: default: Style: Normal Bold

[line:billaddline]
  ;; Line displaying address in Bill To section
  field:fwf
  Local   : Field : fwf  : Set as    :$Address
  space bottom:0.3
 
[line:billtostateline]
  ;; Line displaying state and PIN code in Bill To section
  field:nf,snf
  Local: Field:nf: Set As:$LedStateName:ledger:$partyledgername
  Local: Field:snf: Set As:$PinCode:ledger:$partyledgername
  space bottom:0.3

[line:billtostatecodeline]
  ;; Line displaying state code in Bill To section
  field:fwf
  Local: Field: fwf: Set As:@@cwstatecodenew
  space bottom:0.3

[line:citybuyerline]
  ;; Line displaying city in Bill To section
  field:fwf
  Local: Field: fwf: Set As:if $$isempty:$cwmsBuyerCity then "" else "City : "+$cwmsBuyerCity
  Local: field: snfx: Width:2

[System: Formula]
  ;; Formula to get state code for GST
  cwstatecodenew:If $$IsEmpty:@@cwVoucherPartyStateName then "" else "State Code : " + $$getgststatecode:@@cwVoucherPartyStateName


[line:billtogstinline]
  ;; Line displaying GSTIN in Bill To section
  field:fwf
  Local: Field: fwf: Set As:if $$isempty:$PARTYGSTIN then "" else "GSTIN : "+$PARTYGSTIN
  Local: Field: default: Style: Normal Bold
  space bottom:0.3

[part:salesinvTopPart2b]
  ;; Ship To section - contains consignee details
  line:cwblankline,cwblankline2,shiptoline,shiptoaddline,shiptostateline,shiptostatecodeline,cityshipline,shiptogstinline

  Repeat  : shiptoaddline :BASICBUYERADDRESS


[line:shiptoline]
  ;; Line displaying consignee name in Ship To section
  field:snfx,fwf
  Local: Field: FWF: Set As:$CONSIGNEEMAILINGNAME  ;;$BASICBUYERNAME;;$PARTYMAILINGNAME  ;;$BASICBUYERNAME
  Local: Field: default: Style: Normal Bold
  space bottom:0.3
  Local: field: snfx: Width:2

[line:shiptoaddline]
  ;; Line displaying address in Ship To section
  field:snfx,fwf
  Local: Field: fwf: Set As:$BASICBUYERADDRESS
  space bottom:0.3
  Local: field: snfx: Width:2

[line:shiptostateline]
  ;; Line displaying state and PIN code in Ship To section
  field:snfx,nf,snf
  Local: field: snfx: Width:2

  Local: Field: nf: Set As:$CONSIGNEESTATENAME  ;;$CONSIGNEEMAILINGNAME  ;;$CONSIGNEESTATENAME
  Local: Field:snf: Set As:$PinCode:ledger:$BASICBUYERNAME
  space bottom:0.3
 
[line:shiptostatecodeline]
  ;; Line displaying state code in Ship To section
  field:snfx,fwf
  Local: field: snfx: Width:2
  Local: Field: fwf: Set As:@@cwstateshipcodenew

  space bottom:0.3
 
[System: Formula]
  ;; Formula to get state code for consignee
  cwstateshipcodenew:If $$IsEmpty:@@cwVoucherPartyStateName then "" else "State Code : " + $$getgststatecode:$CONSIGNEESTATENAME

[line:shiptogstinline]
  ;; Line displaying GSTIN in Ship To section
  field:snfx,fwf
  Local: field: snfx: Width:2

  Local: Field: fwf: Set As:if $$isempty:$CONSIGNEEGSTIN then "" else "GSTIN : "+$CONSIGNEEGSTIN
  space bottom:0.3
  Local: Field: default: Style: Normal Bold

[line:cityshipline]
  ;; Line displaying city in Ship To section
  field:snfx,fwf
  Local: Field: fwf: Set As:if $$isempty:$cwmsconsCity then "" else "City : "+$cwmsconsCity

  Local: field: snfx: Width:2

;; ===================================================================
;; TRANSPORTER SECTION
;; ===================================================================

[part:partTransporter]
  ;; Section for transporter details
  line:Transporterline

[line:Transporterline]
  ;; Line displaying transporter name and number of bales
  field:fwf
  RIGHT FIELD:SP,SNF
  Local: Field: fwf: Set As:$cwtempGSTewayTransporterName

  Local: Field: SP: Set As:" No of Bale."
  Local: Field: snf: Set As:$cwnofobales
  Local: field: SP: Width:13
  Local: Field: default: Style: Normal Bold

;; ===================================================================
;; INVENTORY ITEMS SECTION
;; ===================================================================

[part : salesinvINVACCPart]
  ;; Container for inventory items section
  Parts       : salesinvInvPart
  CommonBorder: Yes
  Vertical    : Yes
  Scroll      : Vertical
  Float       : No
  ;;Total       :

[part : salesinvInvPart]
  ;; Part displaying inventory items
  line : cwblankline,cwblankline2,salesinvInvLineTitle,salesinvInvLine  ;;,salesinvInvLineTotal
  repeat : salesinvInvLine : Inventory Entries
  Scroll : vertical
  Common border : yes
  float : no


[Line : salesinvInvLine]
  ;; Line for each inventory item
  field : snfx,fwf
  right field :snf,qtyf,snf2,ratef,amtf,numf2,EXPINVHSNSACDetails

  local: field: EXPINVHSNSACDetails: Invisible: yes

  ;; Set field values for inventory item details
  local : field: snfx :set as :$$linenumber-3
  local : field : fwf : set as :$cwminuitem  ;; @@invitemname
  Local: Field: snf: Set As:#EXPINVHSNSACDetails
  local : field : qtyf : set as : $billedqty
  Local: Field: snf2: Set As:$baseunits:stockitem:$stockitemname
  local : field : ratef : set as : $rate
  local : field : amtf : set as : $amount
  Local: Field: numf2: Set As:(($billedqty*$rate)*$discount)/100

  ;; Explode additional parts when conditions are met
  explode : salesinvBUDPart : $basicuserdescription != ''
  ;; {13.Apr.21 15:05} explode : salesinvBatchPart : $batchname != "Primary batch"

  ;; Field formatting for rate
  local : field : ratef : type : number
  local : field : ratef : align : right
  local : field : ratef : format :"Decimals:2,NoZero"
  ;; {14.Apr.21 15:59} Local: Field: snf: Border: thin box ;;left right
  ;; {14.Apr.21 15:59} Local: Field: snf2: Border: thin box ;;left right
  ;; {14.Apr.21 15:59} Local: Field: ratef: Border: thin box ;;left right
  
  ;; Field width and formatting settings
  Local: field: qtyf: Width:11
  Local: field: qtyf: Format: "nosymbol"
  Local: field: snf: Width:13
  Local: field: snf2: Width:6
  Local: field: snfx: Width:3
  Local: field: qtyf: Align:centre
  Local: field: snf2: Align:centre

[line: salesinvInvLineTitle]
  ;; Title line for inventory items section
  use : salesinvInvLine
  delete : explode
  local : field: default : type : string
   
  ;; Column headers (commented out but available)
  local : field : snfx: set as :"";; "SL"
  local: field: fwf : set as :"";;  "Description"
  local: field: snf : set as :"";;  "HSN"
  local : field : qtyf : set as :"";;  "Qty."
  local : field : SNF2 : set as :"";;  "UOM"
  local: field : ratef : set as :"";;  "Rate"
  local : field : amtf : set as :"";; "Amount"
  local : field : NUMF : set as :"";; "DISC"
  local : field : NUMF2 : set as :"";; "DISC"
 
  ;; Alignment for numeric fields
  local : field : qtyf : align : right
  local: field : ratef : align : right
  local : field : amtf : align : right

;; ===================================================================
;; BATCH AND USER DESCRIPTION PARTS
;; ===================================================================

[part : salesinvBatchPart]
  ;; Part for batch details
  line : salesinvBatchLine
  repeat : salesinvBatchLine : BatchAllocations

[line : salesinvBatchLine]
  ;; Line for each batch
  use : salesinvBUDLine
  local : field : fwf : set as : $batchname

[part : salesinvBUDPart]
  ;; Part for basic user description
  line: salesinvBUDLine
  repeat : salesinvbudline : basicuserdescription

[line : salesinvBudLine]
  ;; Line for each user description
  use  : salesinvINVLINE
  delete : explode
  local : field : snf : set as : ""
  local : field : fwf : set as : $basicuserdescription
  local : field : qtyf : set as : ""
  local : field : ratef : set as : ""
  local : field : amtf : set as : ""

[line : salesinvInvLineTotal]
  ;; Total line for inventory items
  use  : salesinvINVLINE
  delete : explode
  local : field : snf : set as : ""
  local : field : fwf : set as : ""
  local : field : qtyf : set as : ""
  local : field : ratef : set as : ""
  local : field : amtf : set as : $$collamttotal:inventoryentries:$amount
  local : field : amtf : border :thin top
  space bottom : 0.05

;; ===================================================================
;; LEDGER ENTRIES SECTION
;; ===================================================================

[part : salesinvACCPart]
  ;; Part for ledger entries (accounting details)
  line : salesinvACCLine
  repeat : salesinvACCLine : Ledger Entries
  Scroll : vertical
  Common border : yes
  float : no

;; ===================================================================
;; BOTTOM PARTS - TOTALS AND SUMMARY
;; ===================================================================

[part : salesinvBottomPart]
  ;; Bottom part showing totals
  line : salesinvTotLine
  border:thin top bottom
  ;; {14.Apr.21 17:09}    height:1.8
  height:1.5
  
[line : salesinvTotLine]
  ;; Line showing total quantity and amount
  use : salesinvINVLINE
  delete : empty
  Local: Field: snfx: Set As:""
  Local: Field: snf: Set As:""
  Local: Field: numf: Set As:""
  Local: Field: qtyf: Set As:$$collqtytotal:inventoryentries:$billedqty

  Local: Field: snf2: Set As:""
  Local: Field: numf2: Set As:""
  Local: Field: amtf: Set As:$$collamttotal:inventoryentries:$amount
  local : field : ratef  : set as :""
  local : field : fwf : set as : "Total"
  local : field : fwf : align : right
  local : field : amtf : format : "noShowBaseSymbol"
  Local: Field: default: Style: Normal Bold
  
  
[part:salesinvBottomPart2]
  ;; Bottom part with terms and tax details
  part:salesinvBottomPart2a
  right part:salesinvBottomPart2b
  
[part:salesinvBottomPart2a]
  ;; Left section of bottom part - terms and ledger entries
  ;; {14.Apr.21 17:11}    line :termsdelline1,termsdelline,termsdellinex,salesinvACCLine,termstotalline,taxableamtline
  line :termsdelline1,termsdelline,termsdellinex,salesinvACCLine,termstotalline,taxableamtline
   
  repeat : salesinvACCLine : Ledger Entries
  ;; {09.Apr.21 19:04} Scroll : vertical
  ;; {09.Apr.21 19:05} Common border : yes
  ;; {09.Apr.21 19:05}  float : no


[Line : termsdelline]
  ;; Header line for terms section
  use:salesinvACCLine
  Local: Field: nf: Set As:"Term Description"
  Local: Field: amtf: Set As:"Term Amount"
  local: field: amtf: type: String
  Local: Field: default: Style: Normal Bold
  border:thin top

[Line : salesinvACCLine]
  ;; Line for each ledger entry
  field:nf
  right field:amtf
  ;; Skip certain ledger entries
  empty : $ledgername = $partyledgername or $$issysname:$ledgername or $$isempty:$amount
  local : field : ratef : type : number
  local : field : ratef : align : right
  local : field : ratef : format :"NoZero,Percentage"
  local : field : ratef  : set as : $basicrateofinvoicetax
  local : field : snf : set as : ""
  local : field : nf : set as : $ledgername
  Local: Field: amtf: Set As:$amount
  local : field : qtyf : set as : ""
  delete : explode
  space top:0.3

[line:termsdellinex]
  ;; Separator line for terms section
  field:snf
  border:thin bottom

[line:termsdelline1]
  ;; Blank line for spacing in terms section
  field:nf
  height:0.3

[line:termstotalline]
  ;; Line showing terms total
  use:salesinvACCLine
  Local: Field: nf: Set As:"Terms Total"
  Local: Field: amtf: Set As:$$CollAmtTotal:LedgerEntries:$amount-$amount
  Local: Field: default: Style: Normal Bold

[line:taxableamtline]
  ;; Line showing taxable amount
  use:salesinvACCLine
  Local: Field: nf: Set As:"Taxable Amount"
  Local: Field: amtf: Set As:($amount- $$FilterNumTotal:LedgerEntries:cwLedgerhasGSTEffect:$amount)-$$FilterNumTotal:LedgerEntries:cwRoundLedger:$amount
  Local: Field: default: Style: Normal Bold

`;
export default tdl;
