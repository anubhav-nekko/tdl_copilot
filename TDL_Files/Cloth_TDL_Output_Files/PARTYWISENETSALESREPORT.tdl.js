// Auto-generated from PARTYWISENETSALESREPORT.TXT
const tdl = `
;; ===================================================================
;; TALLY CUSTOMIZATION DEFINITION FILE
;; ===================================================================

; Created By: Khokan on 2021-08-25 13:37, ID:

;; ===================================================================
;; MENU CONFIGURATION - Gateway of Tally
;; Adds Party-wise net sales report option to main menu
;; ===================================================================

     [#menu: Gateway of Tally]
;; {25.Aug.21 15:10}         add: Option: PartywisenetsalesreportLock ;; : @@PartywisenetsalesreportDemoLock


;; ===================================================================
;; DEBUG MENU CONFIGURATION
;; Adds report option to debug menu for testing
;; ===================================================================

     [#menu : cw_Debug_menu]
        add: Item: before: @@locQuit: @@PartywisenetsalesreportReport: Display Collection: colllRepPartywisenetsalesreport


;; ===================================================================
;; MENU DEFINITION
;; Defines the Party-wise net sales report menu items
;; ===================================================================

     [!menu: PartywisenetsalesreportLock]
        add: Item: before: @@locQuit: @@PartywisenetsalesreportReport: Display Collection: colllRepPartywisenetsalesreport
        add: Item: before: @@locQuit: Blank

;; ===================================================================
;; SYSTEM FORMULAS
;; Defines report title and version control
;; ===================================================================

    [System: formula]
   PartywisenetsalesreportReport: "Party wise net sales report"
;; PartywisenetsalesreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;; ===================================================================
;; MAIN COLLECTION DEFINITION
;; Extracts ledger data for the report
;; ===================================================================

 [Collection: colllRepPartywisenetsalesreport]

   Use         : Extract Alias Collection
   Source Collection	: List of Ledgers
   Variable    : Ledger Name
   Report      :RepPartywisenetsalesreport
   Trigger     : LedgerName
   Fetch       : Name

;; ===================================================================
;; REPORT CONFIGURATION
;; Main settings for the Party-wise net sales report
;; ===================================================================

    [Report: RepPartywisenetsalesreport]
        use: Dsp Template
      Title: @@PartywisenetsalesreportReport
   Printset: Report Title: @@PartywisenetsalesreportReport
       Form: FrmPartywisenetsalesreport
     Export: Yes
     set  : svfromdate : ##svcurrentdate
     set  : svTodate : ##svcurrentdate
    Local       : Button   : RelReports        : Inactive : Yes

;; ===================================================================
;; FORM LAYOUT DEFINITION
;; Visual layout and components of the report form
;; ===================================================================

      [Form: FrmPartywisenetsalesreport]
        use: DSP Template
       Part: DspAccTitles,PrtTitle0Partywisenetsalesreport,PrtPartywisenetsalesreport
      Width: 100% Page
     Height: 100% Page
 Background: @@SV_STOCKSUMMARY
     delete: page break
        add: page break: Partywisenetsalesreportbotbrk,PartywisenetsalesreportbotOpbrk
Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
;;    local : button : report config : action :modify variable: MyPLConfigure

;; ===================================================================
;; COMPANY INFORMATION DISPLAY
;; Configures header elements for company details
;; ===================================================================

local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n  ;; Local: Field: DSPReportPeriod:border:thin box  ;;PrintStyle:style2
local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;; ===================================================================
;; PAGE BREAK DEFINITIONS
;; Controls page breaks in the report
;; ===================================================================

      [part: PartywisenetsalesreportbotBrk]
       line: EXPINV PageBreak
     border: thin top

      [part: Partywisenetsalesreportbotopbrk]
        use: dspacctitles
  add: part: PartywisenetsalesreportTitlePart

      [part: PartywisenetsalesreportTitlePart]
       line: LnPartywisenetsalesreportTitle

      [line: LnPartywisenetsalesreportCurrPeriod]
      field: fwf,fwf2
      Local: field: fwf2: Align: Right
      Local: Field: fwf: Style:styleCalisto
      Local: Field: fwf2: Style:styleCalisto
      Local: Field: fwf: Set As: ##LedgerName

      Local: Field: fwf2: Set As: @@dspDateStr
;; {18.Sep.21 12:46}     Local: Field: fwf2: Set As:invisible: $$inprintmode


      [part: PrtTitle0Partywisenetsalesreport]
      line : LnPartywisenetsalesreportCurrPeriod

      [Part: PrtPartywisenetsalesreport]
       Line: LnPartywisenetsalesreportTitle,LnPartywisenetsalesreportTitle2,LnPartywisenetsalesreport
bottom Line: LnPartywisenetsalesreportTotals
     repeat: LnPartywisenetsalesreport:ColPartywisenetreport ;; ColPartywisenetsalesreport
     scroll: Vertical
 Common Border: YEs
      Total: Qtyf,amtf,amtf1,amtf2,amtf3,amtf4,amtf5,numf,numf1,numf2,numf3,numf4,amtf20

;; ===================================================================
;; PARTY DATA COLLECTION
;; Filters ledger data for sundry debtors
;; ===================================================================

[Collection: ColPartywisenetreport]

type:ledger
child of:$$Groupsundrydebtors
belongs to:yes

filter:cwColpartynetFilter,cwColpartynetFilter2
;;filter:cwallpartyfilter

[System: Formula]
cwColpartynetFilter:not $$IsEmpty:$TBalDebits or not $$IsEmpty:$TBalCredits   ;; $TBalClosing  ;;$StkClBalance  ;;$StkOutQty
cwColpartynetFilter2:$name=##LedgerName


;;===============================================================================

;; ===================================================================
;; SALES DATA COLLECTION
;; Aggregates sales data by party with calculations
;; ===================================================================

[Collection: ColPartywisenetsalesreport]
source Collection: sourceColPartywisenetsalesreport
by:partyledgername:$partyledgername
;;by:vouchernumber1:$vouchernumber

;;by:cwcaption1vch1:$..cwcaption1vch
by:parent1:$parent:ledger:$partyledgername
by:parent2:$grandparent:ledger:$partyledgername

aggr compute:salesbilledqtyxx:sum:if $$issales:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
;;compute:vouchertypename1:$vouchertypename
compute:cwEnableNetSalesReport1:$cwEnableNetSalesReport:vouchertype:$vouchertypename

aggr compute:salescrbilledqty:sum:if $$IsCreditNote:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"

aggr compute:salesamount:sum:if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
aggr compute:salesinvamt1:sum:if $$issales:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"

aggr compute:salescramount:sum:if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
aggr compute:crnoteinvamt1:sum:if $$IsCreditNote:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"

aggr compute:cwsalesdiscamt1x:sum:if $$issales:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"  ;;(($cwsalesdiscamt1/$cwinvamt1)*$salesinvamt1)
aggr compute:cwcrnotediscamt1x:sum:if $$IsCreditNote:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"  ;;(($cwsalesdiscamt1/$cwinvamt1)*$salesinvamt1)


filter:cwGroupsundrydebtorsfilter,ColPartywisenetsalesnewfil   ;;,cwallpartyfilter

search key:$partyledgername

;; ===================================================================
;; SOURCE DATA COLLECTION
;; Defines the raw data source for the report
;; ===================================================================

[Collection: sourceColPartywisenetsalesreport]
 Use: Vouchers of Company
 delete: filter : daybookfilter

Filter: ColareasalessrFilterx,IsNonOptionalCancelledVchs


filter:ColallareawisesalesreportFilterx

[system: Formula]
ColPartywisenetsalesreportFilter: $partyledgername=##LedgerName
ColPartywisenetsalesnewfil: $partyledgername=##LedgerName


;; ===================================================================
;; REPORT HEADER DEFINITION
;; Configures the column headers for the report
;; ===================================================================

      [Line: LnPartywisenetsalesreportTitle]
        use: LnPartywisenetsalesreport
     option: titleopt
;;     local: field:default: set as: $$DescName
local:field: fwf: set as:"Party Name" ;; "PARTY NAME"

local:field: grsales: set as:"Net Sales" ;; "GROSS SALE"
local:field: grSRIN: set as:"Net Sals Return";; "GROSS SALE RETURN"
local:field: snetsales: set as:"S.Net Sales ";; "GROSS SALE RETURN"

local:field: numf3: set as:"Net Sales" ;; "NET SALE"
local:field: amtf3: set as:"Gross Sale Less Gross Sales Return" ;; "GROSS SALE LESS GROSS SALE RETURN "
local:field: amtf4: set as:"Net Sale Without Gst";; "NET SALE WITH GST LESS CRN"
local:field: amtf5: set as:"Colleection"  ;; "COLLECTION"
local : field : grsales : cells :2
local : field : grSRIN :cells :2
local : field : snetsales : cells :2


local: field: default : style: normal bold

local : field : grsales : delete :field
local : field : grSRIN : delete :field
local : field : snetsales : delete :field
Local: Field:grsales : Sub title : Yes
Local: Field:grSRIN : Sub title : Yes
Local: Field:snetsales : Sub title : Yes
Local: field: grSRIN: Align:centre
Local: field: grsales: Align:centre
Local: field: snetsales: Align:centre
Local: field: default: Align:centre

Local: field: snf: Align:left
Local: field: fwf: Align:left
Local: field: nf: Align:left
;; {07.Jun.22 13:06} Local: Field:grsales : Border: thin bottom
;; {07.Jun.22 13:06} Local: Field:grSRIN : Border: thin bottom
;; {07.Jun.22 13:06} Local: Field:snetsales : Border: thin bottom
Local : field : default: Lines : 0
Local: field: default: Align:centre
Local: field: fwf: Align:left

local: field: grsales : style:styleCalisto2
 local: field: grSRIN : style:styleCalisto2
 local: field: snetsales : style:styleCalisto2
 local: field: fwf : style:styleCalisto2
local: field: numf : style:styleCalisto2
local: field: snf2 : style:styleCalisto2
local: field: numf1 : style:styleCalisto2
local: field: numf2 : style:styleCalisto2
local: field: numf3 : style:styleCalisto2
local: field: amtf : style:styleCalisto2
local: field: amtf1 : style:styleCalisto2
local: field: amtf2 : style:styleCalisto2
local: field: amtf3 : style:styleCalisto2
local: field: amtf4 : style:styleCalisto2
local: field: amtf5 : style:styleCalisto2

;; ===================================================================
;; REPORT SUBHEADER DEFINITION
;; Configures the unit labels row
;; ===================================================================

[Line: LnPartywisenetsalesreportTitle2]
use: LnPartywisenetsalesreport
option: titleopt
;;     local: field:default: set as: $$DescName
local:field: fwf: set as: ""

local:field: numf: set as:"Pcs";; "PCS"
local:field: numf2: set as: "Pcs"
local:field: amtf: set as: "Amount"
local:field: amtf2: set as: "Amount"
local:field: numf3: set as: "Pcs"
local:field: amtf3: set as: "Amount"
local:field: amtf4: set as: "Amount"
local:field: amtf5: set as: "Amount"
Local: field: default: Align:centre
Local: field: fwf: Align:left

local: field: grsales : style:styleCalisto2
 local: field: grSRIN : style:styleCalisto2
 local: field: snetsales : style:styleCalisto2
 local: field: fwf : style:styleCalisto2
local: field: numf : style:styleCalisto2
local: field: snf2 : style:styleCalisto2
local: field: numf1 : style:styleCalisto2
local: field: numf2 : style:styleCalisto2
local: field: numf3 : style:styleCalisto2
local: field: amtf : style:styleCalisto2
local: field: amtf1 : style:styleCalisto2
local: field: amtf2 : style:styleCalisto2
local: field: amtf3 : style:styleCalisto2
local: field: amtf4 : style:styleCalisto2
local: field: amtf5 : style:styleCalisto2

;; ===================================================================
;; FIELD GROUP DEFINITIONS
;; Sets field groupings and column widths
;; ===================================================================

[field:grsales]
field:numf,amtf
width:17.9  ;;25.9

[field:grSRIN]
field:numf2,amtf2
width:17.9  ;;25.9

[field:snetsales]
field:numf3,amtf3
width:17.9  ;;25.9

[System: Formula]
salesinvamtval:$$reportobject:$$collectionfieldbykey:$salesinvamt1:@@keysalesnew2:ColPartywisenetsalesreport
cwsalesdiscamt1xval:$$reportobject:$$collectionfieldbykey:$cwsalesdiscamt1x:@@keysalesnew2:ColPartywisenetsalesreport

crnoteinvamtvalue:$$reportobject:$$collectionfieldbykey:$crnoteinvamt1:@@keysalesnew2:ColPartywisenetsalesreport
cwcrnotediscamt1xvalue:$$reportobject:$$collectionfieldbykey:$cwcrnotediscamt1x:@@keysalesnew2:ColPartywisenetsalesreport

;; ===================================================================
;; DATA ROW DEFINITION
;; Configures the data display for each record
;; ===================================================================

[Line: LnPartywisenetsalesreport]
Fields:fwf
right field:nf,grsales,grSRIN,snetsales,amtf6,amtf4,amtf5,amtf7,amtf8,amtf9,amtf10,numf7,numf8,amtf12,amtf13,amtf14,amtf15  ;;,amtf16,amtf20

Option: Alter on Enter
;; {31.May.22 15:59} local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
;;local:field: numf2 : Format : "Symbol"

;;local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero,decimals:0"



local:field: ratepf : setas  : #amtf/#qtyf

local: field: fwf: alter : voucher : $$isvoucher
option : alter on enter
local : field : fwf : alter : voucher : $$isvoucher
;; local : field : fwf : alter : ledger : $$isledger
local:field: snfx: set as:$cwShowinReport1

local:field: nf: set as:$cwcaption1vch1  ;;$cwcaption1item
;; {14.Jul.22 11:50} local:field: fwf: set as:$partyledgername  ;;$name
local:field: fwf: set as:$name

local:field: numf: set as:$salesbilledqty  ;;$$reportobject:$$collectionfieldbykey:$billedqty:@@keycrnotenew2:collagentsalesms ;; "PCS"

;; {19.Mar.24 11:49} local:field: numf: set as:$$reportobject:$$collectionfieldbykey:$salesbilledqty:#fwf:ColallPartywisenetsalesreport


local:field: qtyf1: set as:$salesbilledqty  ;;$$reportobject:$$collectionfieldbykey:$billedqty:@@keycrnotenew2:collagentsalesms ;; "PCS"
local:field: qtyf: set as:$salescrbilledqty  ;;$$reportobject:$$collectionfieldbykey:$billedqty:@@keycrnotenew2:collagentsalesms ;; "PCS"

local:field: amtf: set as:$$nettamount:#amtf12:#amtf13  ;;$amount  ;;$$reportobject:$$collectionfieldbykey:$amount:@@keycrnotenew2:collagentsalesms  ;;  "AMOUNT"

;; {14.Jul.22 12:19} local:field: amtf12: set as:$$nettamount:$salesinvamt1:$cwsalesdiscamt1x  ;;$cwsalesdiscamt1  ;;$amount  ;;$$reportobject:$$collectionfieldbykey:$amount:@@keycrnotenew2:collagentsalesms  ;;  "AMOUNT"
local:field: amtf12: set as:$$nettamount:@@salesinvamt1valueall:@@cwsalesdiscamt1xall ;;$cwsalesdiscamt1  ;;$amount  ;;$$reportobject:$$collectionfieldbykey:$amount:@@keycrnotenew2:collagentsalesms  ;;  "AMOUNT"


local:field: amtf13: set as:(#amtf12*5)/100  ;;$amount  ;;$$reportobject:$$collectionfieldbykey:$amount:@@keycrnotenew2:collagentsalesms  ;;  "AMOUNT"

;; {14.Jul.22 12:20} local:field: amtf14: set as:$$nettamount:$crnoteinvamt1:$cwcrnotediscamt1x
local:field: amtf14: set as:$$nettamount:@@crnoteinvamt1all:@@cwcrnotediscamt1all


local:field: amtf15: set as:(#amtf14*5)/100

;; {14.Jul.22 12:15} local:field: numf2: set as:$salescrbilledqty ;;$$reportobject:$$collectionfieldbykey:$billedqty:@@keycrnotenew2:cwColNetcrnotereport2 ;;  "PCS"

local:field: numf2: set as:$$reportobject:$$collectionfieldbykey:$salescrbilledqty:#fwf:ColallPartywisenetsalesreport


;; {07.Jun.22 09:38} local:field: amtf2: set as:$salescramount  ;;$$reportobject:$$collectionfieldbykey:$amount:@@keycrnotenew2:cwColNetcrnotereport2   ;;  "AMOUNT"
local:field: amtf2: set as:$$nettamount:#amtf14:#amtf15  ;;$$reportobject:$$collectionfieldbykey:$amount:@@keycrnotenew2:cwColNetcrnotereport2   ;;  "AMOUNT"

local:field: numf3: set as:#numf-#numf2  ;;  "PCS"
local:field: amtf3: set as:#amtf-#amtf2  ;;  "AMOUNT"

;; {27.May.22 13:26} local:field: amtf4: set as: if $$isempty:@@cwallpartycrnote then @@cwallpartysales else @@cwallpartysales-@@cwallpartycrnote ;; "AMOUNT"
local:field: amtf4: set as:#amtf3-#amtf6

;; {17.Sep.21 13:14} local:field: amtf4: set as: $$reportobject:$$collectionfieldbykey:$amount1:@@keycrnotenew2:collsalesms
;; {17.Sep.21 13:57} local:field: amtf4: set as:$$reportobject:$$collectionfieldbykey:$amount:@@keycrnotenew2:cwColNetcrnotereport2

 local:field: amtf6: set as:(#amtf3*5)/100  ;; "AMOUNT"
 local: field: amtf6: Invisible: yes
 local: field: amtf12: Invisible: yes
 local: field: amtf13: Invisible: yes
 local: field: amtf14: Invisible: yes
 local: field: amtf15: Invisible: yes


;; {19.Jul.22 11:00} local:field: amtf5: set as:$$nettamount:#amtf16:#amtf20  ;;$$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:Colreceipt  ;; "AMOUNT"
local:field: amtf5: set as:$$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:Colreceipt

local:field: amtf16: set as:@@cwnetreceipt ;;$$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:Colcashreceipt  ;; "AMOUNT"

local:field: amtf20: set as:@@cwnetpayment  ;;$$reportobject:$$collectionfieldbykey:$payvalue:#fwf:Colpament  ;; "AMOUNT"

;; {18.Jul.22 13:22} local:field: amtf5: set as:$$CollAmtTotal:Colreceipt:$cwReceiptDuringThePeriod ;; "AMOUNT"

Local: Field: default: Border: thin right
 local: field: nf: Invisible: yes

Local: field: numf: Width:7 ;;10
Local: field: numf2: Width:7 ;;10
Local: field: numf3: Width:7 ;;10
Local: field: amtf: Width:10  ;;15
Local: field: amtf2: Width:10  ;;15
Local: field: amtf3: Width:10 ;;15

Local: field: nf: Width:30
border:thin bottom

;; {14.Jun.22 14:32}  empty:$$line=$$numitems

local:field: numf7: set as:if $$line=1 then #numf else $$prevlinefield+#numf
local:field: numf8: set as:if $$line=1 then #numf2 else $$prevlinefield+#numf2

local:field: amtf7: set as:if $$line=1 then #amtf else $$prevlinefield+#amtf
local:field: amtf8: set as:if $$line=1 then #amtf2 else $$prevlinefield+#amtf2
local:field: amtf9: set as:if $$line=1 then #amtf3 else $$prevlinefield+#amtf3
local:field: amtf10: set as:if $$line=1 then #amtf4 else $$prevlinefield+#amtf4
local:field: qtyf10: set as:if $$line=1 then #qtyf else $$prevlinefield+#qtyf


local: field: amtf7: Invisible: yes
local: field: NUMF7: Invisible: yes
local: field: NUMF8: Invisible: yes
local: field: amtf8: Invisible: yes

`;
export default tdl;
