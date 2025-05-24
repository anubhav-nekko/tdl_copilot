// Auto-generated from PARTYWISESALESREGISTERREPORT.TXT
const tdl = `
; Created By: Khokan on 2021-08-25 17:34, ID:

;===========================================================
; Add menu option in Gateway of Tally
[#menu: Gateway of Tally]
;; {25.Aug.21 18:57} Add report option to Gateway of Tally menu
add: Option: PartywisesalesregisterreportLock ;; : @@PartywisesalesregisterreportDemoLock

;===========================================================
; Add report option to debug menu
[#menu : cw_Debug_menu]   
add: Item: before: @@locQuit: @@PartywisesalesregisterreportReport: Display Collection: colllRepPartywisesalesregisterreport  ;;:  RepPartywisesalesregisterreport

;===========================================================
; Menu definition for report access with display collection
[!menu: PartywisesalesregisterreportLock]
add: Item: before: @@locQuit: @@PartywisesalesregisterreportReport: Display Collection: colllRepPartywisesalesregisterreport  ;;: RepPartywisesalesregisterreport
add: Item: before: @@locQuit: Blank

;===========================================================
; Collection to iterate over list of ledgers for report
[Collection: colllRepPartywisesalesregisterreport]
Use         : Extract Alias Collection
Source Collection : List of Ledgers
Variable    : Ledger Name
Report      : RepPartywisesalesregisterreport
Trigger     : LedgerName
Fetch       : Name

;===========================================================
; System formula for report title
[System: formula]
PartywisesalesregisterreportReport: "Party wise sales register report"
;; PartywisesalesregisterreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;===========================================================
; Report definition
[Report: RepPartywisesalesregisterreport]
use: Dsp Template
Title: @@PartywisesalesregisterreportReport
Printset: Report Title: @@PartywisesalesregisterreportReport
Form: FrmPartywisesalesregisterreport
Export: Yes
set  : svfromdate : ##svcurrentdate
set  : svTodate : ##svcurrentdate
Local : Button : RelReports : Inactive : Yes
variable:str1,str2
set:str1:""
set:str2:""

;===========================================================
; Form definition for layout and parts
[Form: FrmPartywisesalesregisterreport]
use: DSP Template
Part: DspAccTitles,PrtTitle0Partywisesalesregisterreport,PrtPartywisesalesregisterreport
Width: 100% Page
Height: 100% Page
Background: @@SV_STOCKSUMMARY
delete: page break
add: page break: Partywisesalesregisterreportbotbrk,PartywisesalesregisterreportbotOpbrk
Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12

;; Custom print styles
local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;===========================================================
; Page break and title parts
[part: PartywisesalesregisterreportbotBrk]
line: EXPINV PageBreak
border: thin top

[part: Partywisesalesregisterreportbotopbrk]
use: dspacctitles
add: part: PartywisesalesregisterreportTitlePart

[part: PartywisesalesregisterreportTitlePart]
line: LnPartywisesalesregisterreportTitle

[line: LnPartywisesalesregisterreportCurrPeriod]
field: fwf,fwf2
Local: field: fwf2: Align: Right
Local: Field: fwf: Style:styleCalisto
Local: Field: fwf2: Style:styleCalisto
Local: Field: fwf: Set As:""
Local: Field: fwf2: Set As: @@dspDateStr
Local: Field: fwf2:invisible: $$inprintmode

;===========================================================
; Title display part
[part: PrtTitle0Partywisesalesregisterreport]
line : LnPartywisesalesregisterreportCurrPeriod

;===========================================================
; Main report part with scrolling and repeating line
[Part: PrtPartywisesalesregisterreport]
Line: LnPartywisesalesregisterreportTitle,LnPartywisesalesregisterreport
bottom Line: LnPartywisesalesregisterreportTotals
repeat: LnPartywisesalesregisterreport: ColPartywisesalesregisterreport
scroll: Vertical
Common Border: YEs
Total: Qtyf,amtf

;===========================================================
; Collection of report lines
[Collection: ColPartywisesalesregisterreport]
source Collection: sourceColPartywisesalesregisterreport
walk:inventoryentries
by:partyledgername:$partyledgername
by:date:$date
by:vouchernumber:$vouchernumber
by:stockitemname:$stockitemname
aggr compute:billedqty:sum:$$CollAmtTotal:inventoryentries:$billedqty
aggr compute:amount:sum:$amount
aggr compute:amount1:sum:$$CollAmtTotal:inventoryentries:$amount
compute:CWTEMPGSTEWAYTRANSPORTERNAME1:$..CWTEMPGSTEWAYTRANSPORTERNAME
compute:BILLOFLADINGNO1:$BILLOFLADINGNO
compute:BILLOFLADINGDATE1:$BILLOFLADINGDATE
compute:narration1:$narration
compute:BASICFINALDESTINATION1:$BASICFINALDESTINATION
Compute:masterid:$masterid

[Collection: sourceColPartywisesalesregisterreport]
Type       : Vouchers : VoucherType
Child Of   : $$VchTypesales
Belongs To : Yes
filter:ColPartywisesalesregreportFilter

[system: Formula]
ColPartywisesalesregreportFilter:$partyledgername=##LedgerName
ColPartywisesalesregisterreportFilter: Yes

;===========================================================
; Title line for report
[Line: LnPartywisesalesregisterreportTitle]
use: LnPartywisesalesregisterreport
option: titleopt
;; Column headings
local:field: snf: set as:"Invoice No."
local:field: sdf: set as: "Date"
local:field: fwf: set as:"Party & Booked To"
local:field: nf: set as:"Transport"
local:field: nf3: set as:"Stock Item"
local:field: snf2: set as:"LR Number"
local:field: sdf2: set as: "LR Date"
local:field: nf2: set as:"Remarks / Narration"
local:field: snf3: set as: "Area"
local:field: qtyf: set as: "Pcs"
local:field: ratepf : set as : "Rate"
local:field: amtf: set as: "Gross Amt"
;; Apply styles to fields
local:field: snf: style:styleCalisto2
local:field: sdf:style:styleCalisto2
local:field: fwf: style:styleCalisto2
local:field: nf:style:styleCalisto2
local:field: nf3:style:styleCalisto2
local:field: snf2: style:styleCalisto2
local:field: snf3: style:styleCalisto2
local:field: sdf2:style:styleCalisto2
local:field: nf2:style:styleCalisto2
local:field: qtyf: style:styleCalisto2
local:field: ratepf :style:styleCalisto2
local:field: amtf:style:styleCalisto2
Local: field: default: Align:centre
Local: field: fwf: Align:left
Local: field: fwf:indent:10

;===========================================================
; Main line details with calculations and conditions
[Line: LnPartywisesalesregisterreport]
Fields: snf,sdf,fwf
right field:nf3,nf,snf2,sdf2,snf3,Qtyf,ratepf,Amtf
local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
local:field: ratepf : setas  : #amtf/#qtyf
local: field: fwf: alter : voucher : $$isvoucher
local:field: snf: set as:$vouchernumber
local:field: sdf: set as:$date
local:field: fwf: set as:if $$isempty:$BASICFINALDESTINATION1 then $partyledgername else $partyledgername+" & "+$BASICFINALDESTINATION1
local:field: nf3: set as:$stockitemname
local:field: nf: set as:$CWTEMPGSTEWAYTRANSPORTERNAME1
local:field: snf2: set as:$BILLOFLADINGNO1
local:field: snf3: set as:$cwledcity:ledger:$partyledgername
local:field: sdf2: set as:$BILLOFLADINGDATE1
local:field: nf2: set as:$narration1
local:field: qtyf: set as:IF $$LINE=1 THEN $billedqty else if $vouchernumber <> $$prevobj:$vouchernumber  then $billedqty else ""
local:field: ratepf : set as :#amtf/#qtyf
local:field: amtf: set as:IF $$LINE=1 THEN $amount1 else if $vouchernumber <> $$prevobj:$vouchernumber  then $amount1 else ""
local:field: default:style:styleCalisto
local:field: fwf:style:styleCalisto
Local: Field: default: Border: thin right
border:thin bottom
option : cwalterVch
;; Field widths
Local: field: nf: Width:20
Local: field: nf3: Width:30
Local: field: sdf: Width:6
Local: field: sdf2: Width:6
Local: field: snf: Width:12
Local: field: snf2: Width:8
Local: field: snf3: Width:7
Local: field: ratepf: Width:6
Local: field: AMTF: Width:8
Local: field: qtyf: Width:5

;===========================================================
; Totals line
[line: LnPartywisesalesregisterreportTotals]
use: LnPartywisesalesregisterreport
option: totalOpt
local: field: fwf: align: right
local: field: qtyf: set as: $$total:qtyf
local: field: fwf: set as: "Total"
local: field: amtf : set as :  $$total:amtf
;; Clear other fields
local:field: snf: set as:""
local:field: sdf: set as:""
local:field: nf: set as:""
local:field: snf2: set as:""
local:field: sdf2: set as:""
local:field: nf2: set as:""
local:field: ratepf : set as :""
;; Styles
local:field: snf: style:styleCalisto2
local:field: sdf:style:styleCalisto2
local:field: fwf: style:styleCalisto2
local:field: nf:style:styleCalisto2
local:field: snf2: style:styleCalisto2
local:field: snf3: style:styleCalisto2
local:field: sdf2:style:styleCalisto2
local:field: nf2:style:styleCalisto2
local:field: qtyf: style:styleCalisto2
local:field: ratepf :style:styleCalisto2
local:field: amtf:style:styleCalisto2
`;
export default tdl;
