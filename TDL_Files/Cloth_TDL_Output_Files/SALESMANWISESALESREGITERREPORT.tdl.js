// Auto-generated from SALESMANWISESALESREGITERREPORT.TXT
const tdl = `
;===============================================================================
; SALESMANWISESALESREGITERREPORT.TXT
; Created By: Khokan on 2021-08-25 18:08, ID:
; Purpose: Implements a "Salesman Wise Sales Register Report" in Tally,
;          listing all sales vouchers for parties under a selected salesman,
;          with item, transport, LR, narration, area, and totals for quantity/amount.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; Optionally lock demo access by date if needed
;; add: Option: salesmanWISEsalesregiterreportLock ;; : @@salesmanWISEsalesregiterreportDemoLock

[#menu : cw_Debug_menu]
    ;; Add the report to the debug menu for quick access
    add: Item: before: @@locQuit: @@salesmanWISEsalesregiterreportReport:Display Collection: colllRepsalesmanWISEsalesregiterreport

[!menu: salesmanWISEsalesregiterreportLock]
    add: Item: before: @@locQuit: @@salesmanWISEsalesregiterreportReport: Display Collection: colllRepsalesmanWISEsalesregiterreport
    add: Item: before: @@locQuit: Blank

[System: formula]
    ;; Dynamic report title using company’s salesman caption
    salesmanWISEsalesregiterreportReport:@@cwcaption2tableundernew+" "+"wise sales register report"
;; salesmanWISEsalesregiterreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; LEDGER SELECTION: Collection-driven popup for salesman selection
;;------------------------------------------------------------------------------

[Collection: colllRepsalesmanWISEsalesregiterreport]
    Use              : Extract Alias Collection
    Source Collection: List of Ledgers
    Variable         : Ledger Name
    Report           : RepsalesmanWISEsalesregiterreport
    Trigger          : cwLedgerName2
    Fetch            : Name

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepsalesmanWISEsalesregiterreport]
    use        : Dsp Template
    Title      : @@salesmanWISEsalesregiterreportReport
    Printset   : Report Title: @@salesmanWISEsalesregiterreportReport
    Form       : FrmsalesmanWISEsalesregiterreport
    Export     : Yes
    set        : svfromdate : ##svcurrentdate
    set        : svTodate   : ##svcurrentdate
    Local      : Button   : RelReports : Inactive : Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmsalesmanWISEsalesregiterreport]
    use     : DSP Template
    Part    : DspAccTitles,PrtTitle0salesmanWISEsalesregiterreport,PrtsalesmanWISEsalesregiterreport
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: salesmanWISEsalesregiterreportbotbrk,salesmanWISEsalesregiterreportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    ;; Style company name, address, and report title for print
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[part: salesmanWISEsalesregiterreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: salesmanWISEsalesregiterreportbotopbrk]
    use: dspacctitles
    add: part: salesmanWISEsalesregiterreportTitlePart

[part: salesmanWISEsalesregiterreportTitlePart]
    line: LnsalesmanWISEsalesregiterreportTitle

[line: LnsalesmanWISEsalesregiterreportCurrPeriod]
    field: fwf,nf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style:styleCalisto
    Local: Field: fwf: Style:styleCalisto
    Local: Field: NF: Style:styleCalisto
    Local: Field: fwf: Set As:##LedgerName
    Local: Field: nf: Set As:$$ReptField:Name:2:ledger:##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2:invisible: $$inprintmode

[part: PrtTitle0salesmanWISEsalesregiterreport]
    line : LnsalesmanWISEsalesregiterreportCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN PART: Data lines, headers, and totals
;;------------------------------------------------------------------------------

[Part: PrtsalesmanWISEsalesregiterreport]
    Line: LnsalesmanWISEsalesregiterreportTitle,LnsalesmanWISEsalesregiterreport
    bottom Line: LnsalesmanWISEsalesregiterreportTotals
    repeat: LnsalesmanWISEsalesregiterreport: ColsalesmanWISEsalesregiterreport
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf

;;------------------------------------------------------------------------------
;; MAIN DATA COLLECTION: Aggregates sales vouchers for all parties under selected salesman
;;------------------------------------------------------------------------------

[Collection: ColsalesmanWISEsalesregiterreport]
    source Collection: sourceColsalesmanWISEsalesregiterreport
    walk:inventoryentries
    by:partyledgername:$partyledgername
    by:date:$date
    by:vouchernumber:$vouchernumber
    by:stockitemname:$stockitemname
    by:cwcaption1vch2:$..cwcaption2vch
    aggr compute:billedqty:sum:$$CollAmtTotal:inventoryentries:$billedqty
    aggr compute:amount:sum:$amount
    aggr compute:amount1:sum:$$CollAmtTotal:inventoryentries:$amount
    compute:CWTEMPGSTEWAYTRANSPORTERNAME1:$CWTEMPGSTEWAYTRANSPORTERNAME
    compute:BILLOFLADINGNO1:$BILLOFLADINGNO
    compute:BILLOFLADINGDATE1:$BILLOFLADINGDATE
    compute:narration1:$narration
    compute:BASICFINALDESTINATION1:$BASICFINALDESTINATION
    filter:ColsalesmanWISEsalesregiterreportFilter

[Collection: sourceColsalesmanWISEsalesregiterreport]
    Type	   : Vouchers	: VoucherType
    Child Of   : $$VchTypesales
    Belongs To : Yes
    filter:cwpartylednetsalesfilter

[system: Formula]
    ColsalesmanWISEsalesregiterreportFilter: $cwcaption1vch2=##LedgerName

;;------------------------------------------------------------------------------
;; HEADER LINE: Table column headers
;;------------------------------------------------------------------------------

[Line: LnsalesmanWISEsalesregiterreportTitle]
    use: LnsalesmanWISEsalesregiterreport
    option: titleopt
    local:field: snf: set as:"Invoice No."
    local:field: sdf: set as: "Date"
    local:field: fwf: set as:"Party & Booked To"
    local:field: nf: set as:"Transport"
    local:field: snf2: set as:"LR Number"
    local:field: sdf2: set as: "LR Date"
    local:field: nf2: set as:"Remarks / Narration"
    local:field: snf3: set as: "Area"
    local:field: qtyf: set as: "Pcs"
    local:field: ratepf : set as : "Rate"
    local:field: amtf: set as: "Gross Amount"
    local:field: nf3: set as:"Stock Item"
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
    Local: field: fwf:indent:8

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per voucher/item
;;------------------------------------------------------------------------------

[Line: LnsalesmanWISEsalesregiterreport]
    Fields: snf,sdf,fwf
    right field:nf3,snf3,Qtyf,ratepf,Amtf
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local:field: snf: set as:$vouchernumber
    local:field: sdf: set as:$date
    local:field: fwf: set as:if $$isempty:$BASICFINALDESTINATION1 then $partyledgername else $partyledgername+" & "+$BASICFINALDESTINATION1
    local:field: nf: set as:$CWTEMPGSTEWAYTRANSPORTERNAME1
    local:field: snf2: set as:$BILLOFLADINGNO1
    local:field: snf3: set as:$cwledcity:ledger:$partyledgername
    local:field: sdf2: set as:$BILLOFLADINGDATE1
    local:field: nf2: set as:$narration1
    local:field: nf3: set as:$stockitemname
    local:field: qtyf: set as:IF $$LINE=1 THEN $billedqty else if $vouchernumber <> $$prevobj:$vouchernumber  then $billedqty else ""
    local:field: ratepf : set as :#amtf/#qtyf
    local:field: amtf: set as:IF $$LINE=1 THEN $amount1 else if $vouchernumber <> $$prevobj:$vouchernumber  then $amount1 else ""
    Local: field: nf3: Width:30
    Local: field: sdf: Width:8
    Local: field: snf3: Width:8
    Local: field: qtyf: Width:6
    local:field: default:style:styleCalisto
    border:thin bottom
    Local: Field: default: Border: thin right

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnsalesmanWISEsalesregiterreportTotals]
    use: LnsalesmanWISEsalesregiterreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: amtf : set as :  $$total:amtf
    local:field: snf: set as:""
    local:field: sdf: set as:""
    local:field: nf: set as:""
    local:field: snf2: set as:""
    local:field: sdf2: set as:""
    local:field: nf2: set as:""
    local:field: nf2: set as:""
    local:field: ratepf : set as :""
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

;===============================================================================
; End of SALESMANWISESALESREGITERREPORT.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
