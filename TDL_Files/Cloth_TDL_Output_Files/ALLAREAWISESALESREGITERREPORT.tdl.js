// Auto-generated from ALLAREAWISESALESREGITERREPORT.TXT
const tdl = `
;===============================================================================
; ALLAREAWISESALESREGITERREPORT.TXT
; Created By: Khokan on 2021-08-27 16:05, ID:
; Purpose: Provides an "All Area Wise Sales Register Report" in Tally,
;          listing sales vouchers by party/area, with transport, area, LR details,
;          quantities, and gross amounts, including totals.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: allAREAWISEsalesregiterReportLock ;; : @@allAREAWISEsalesregiterReportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@allAREAWISEsalesregiterReportReport: Display: RepallAREAWISEsalesregiterReport
    add: Item: before: @@locQuit: Blank

[!menu: allAREAWISEsalesregiterReportLock]
    add: Item: before: @@locQuit: @@allAREAWISEsalesregiterReportReport: Display: RepallAREAWISEsalesregiterReport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    allAREAWISEsalesregiterReportReport: "All " + @@cwcaption3tableundernew + " sales register report"
;; allAREAWISEsalesregiterReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepallAREAWISEsalesregiterReport]
    use: Dsp Template
    Title: @@allAREAWISEsalesregiterReportReport
    Printset: Report Title: @@allAREAWISEsalesregiterReportReport
    Form: FrmallAREAWISEsalesregiterReport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmallAREAWISEsalesregiterReport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0allAREAWISEsalesregiterReport,PrtallAREAWISEsalesregiterReport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: allAREAWISEsalesregiterReportbotbrk,allAREAWISEsalesregiterReportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12

[part: allAREAWISEsalesregiterReportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: allAREAWISEsalesregiterReportbotopbrk]
    use: dspacctitles
    add: part: allAREAWISEsalesregiterReportTitlePart

[part: allAREAWISEsalesregiterReportTitlePart]
    line: LnallAREAWISEsalesregiterReportTitle

[line: LnallAREAWISEsalesregiterReportCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: style3x
    Local: Field: fwf2: Style: style3x
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: ##LedgerName
    Local: Field: fwf2: invisible: $$inprintmode

[part: PrtTitle0allAREAWISEsalesregiterReport]
    line : LnallAREAWISEsalesregiterReportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH SALES VOUCHER/PARTY/AREA
;------------------------------------------------------------------------------

[Part: PrtallAREAWISEsalesregiterReport]
    Line: LnallAREAWISEsalesregiterReportTitle, LnallAREAWISEsalesregiterReport
    bottom Line: LnallAREAWISEsalesregiterReportTotals
    repeat: LnallAREAWISEsalesregiterReport: ColallAREAWISEsalesregiterReport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

;------------------------------------------------------------------------------
; COLLECTION: Aggregates sales by party/area, date, voucher, etc.
;------------------------------------------------------------------------------

[Collection: ColallAREAWISEsalesregiterReport]
    source Collection: sourColallAREAWISEsalesregiterReport
    by: partyledgername: $partyledgername
    by: date: $date
    by: vouchernumber: $vouchernumber
    by: cwcaption1vch3: $..cwcaption3vch
    aggr compute: billedqty: sum: $$CollAmtTotal:inventoryentries:$billedqty
    aggr compute: amount: sum: $amount
    aggr compute: amount1: sum: $$CollAmtTotal:inventoryentries:$amount
    compute: CWTEMPGSTEWAYTRANSPORTERNAME1: $CWTEMPGSTEWAYTRANSPORTERNAME
    compute: BILLOFLADINGNO1: $BILLOFLADINGNO
    compute: BILLOFLADINGDATE1: $BILLOFLADINGDATE
    compute: narration1: $narration
    compute: BASICFINALDESTINATION1: $BASICFINALDESTINATION

;; {27.Aug.21 16:07} filter: ColAREAWISEsalesregiterReportFilter

[Collection: sourColallAREAWISEsalesregiterReport]
    Type: Vouchers : VoucherType
    Child Of: $$VchTypesales
    Belongs To: Yes
;; {27.Aug.21 16:07} filter: cwpartylednetsalesfilter

[system: Formula]
    ColallAREAWISEsalesregiterReportFilter: Yes

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title Line
;------------------------------------------------------------------------------

[Line: LnallAREAWISEsalesregiterReportTitle]
    use: LnallAREAWISEsalesregiterReport
    option: titleopt
    local: field: snf: set as: "Invoice No."
    local: field: sdf: set as: "Date"
    local: field: fwf: set as: "Party & Booked To"
    local: field: nf: set as: "Transport"
    local: field: nf3: set as: @@cwcaption3tableundernew
    local: field: snf2: set as: "LR Number"
    local: field: sdf2: set as: "LR Date"
    local: field: nf2: set as: "Remarks / Narration"
    local: field: snf3: set as: "Area"
    local: field: qtyf: set as: "Pcs"
    local: field: ratepf: set as: "Rate"
    local: field: amtf: set as: "Gross Amount"

    local: field: snf: style: style2x
    local: field: sdf: style: style2x
    local: field: fwf: style: style2x
    local: field: nf: style: style2x
    local: field: snf2: style: style2x
    local: field: snf3: style: style2x
    local: field: sdf2: style: style2x
    local: field: nf2: style: style2x
    local: field: nf3: style: style2x
    local: field: qtyf: style: style2x
    local: field: ratepf: style: style2x
    local: field: amtf: style: style2x
    Local: field: default: Align: centre
    Local: field: fwf: Align: left

;------------------------------------------------------------------------------
; MAIN DATA LINE: Sales voucher details per party/area
;------------------------------------------------------------------------------

[Line: LnallAREAWISEsalesregiterReport]
    Fields: snf, sdf, fwf
    right field: nf3, nf, snf2, sdf2, snf3, Qtyf, ratepf, Amtf
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher

    local: field: snf: set as: $vouchernumber
    local: field: sdf: set as: $date
    local: field: fwf: set as: if $$isempty:$BASICFINALDESTINATION1 then $partyledgername else $partyledgername + " & " + $BASICFINALDESTINATION1
    local: field: nf3: set as: $cwcaption1vch3
    local: field: nf: set as: $CWTEMPGSTEWAYTRANSPORTERNAME1
    local: field: snf2: set as: $BILLOFLADINGNO1
    local: field: snf3: set as: $cwledcity:ledger:$partyledgername
    local: field: sdf2: set as: $BILLOFLADINGDATE1
    local: field: nf2: set as: $narration1

    local: field: qtyf: set as: $billedqty
    local: field: ratepf: set as: #amtf/#qtyf
    local: field: amtf: set as: $amount1

    local: field: default: style: style3x
    Local: Field: default: Border: thin right

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnallAREAWISEsalesregiterReportTotals]
    use: LnallAREAWISEsalesregiterReport
    option: totalOpt
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: amtf: set as: $$total:amtf
    local: field: snf: set as: ""
    local: field: sdf: set as: ""
    local: field: fwf: set as: ""
    local: field: nf: set as: ""
    local: field: snf2: set as: ""
    local: field: sdf2: set as: ""
    local: field: nf2: set as: ""
    local: field: nf3: set as: ""
    local: field: ratepf: set as: ""

    local: field: snf: style: style2x
    local: field: sdf: style: style2x
    local: field: fwf: style: style2x
    local: field: nf: style: style2x
    local: field: snf2: style: style2x
    local: field: snf3: style: style2x
    local: field: sdf2: style: style2x
    local: field: nf2: style: style2x
    local: field: nf3: style: style2x
    local: field: qtyf: style: style2x
    local: field: ratepf: style: style2x
    local: field: amtf: style: style2x


`;
export default tdl;
