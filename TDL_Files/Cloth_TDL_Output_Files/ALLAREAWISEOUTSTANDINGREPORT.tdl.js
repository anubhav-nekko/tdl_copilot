// Auto-generated from ALLAREAWISEOUTSTANDINGREPORT.TXT
const tdl = `
;===============================================================================
; ALLAREAWISEOUTSTANDINGREPORT.TXT
; Created By: Khokan on 2021-08-27 12:27, ID:
; Purpose: Provides an "All Area Wise Outstanding Report" in Tally, showing
;          outstanding bills and credits for all areas/parties, with filtering,
;          split view, and totals.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {14.Jun.22 11:59}         add: Option: allAREAWISEOutstandingReportLock ;; : @@allAREAWISEOutstandingReportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@allAREAWISEOutstandingReportReport: Display: RepallAREAWISEOutstandingReport

[!menu: allAREAWISEOutstandingReportLock]
    add: Item: before: @@locQuit: @@allAREAWISEOutstandingReportReport: Display: RepallAREAWISEOutstandingReport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    allAREAWISEOutstandingReportReport: "All " + @@cwcaption3tableundernew + " wise outstanding report"
;; allAREAWISEOutstandingReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION: All Area Wise Outstanding Report
;------------------------------------------------------------------------------

[Report: RepallAREAWISEOutstandingReport]
    use: Dsp Template
    Title: @@allAREAWISEOutstandingReportReport
    Printset: Report Title: @@allAREAWISEOutstandingReportReport
    Form: FrmallAREAWISEOutstandingReport
    Export: Yes
    ;; set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str1, str2
    set: str1: ""
    set: str2: ""

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmallAREAWISEOutstandingReport]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0allAREAWISEOutstandingReport, PrtallAREAWISEOutstandingReport, PrtallAREAWISEOutstandingReport2
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: allAREAWISEOutstandingReportbotbrk, allAREAWISEOutstandingReportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add: button: allareasbotton
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: allAREAWISEOutstandingReportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: allAREAWISEOutstandingReportbotopbrk]
    use: dspacctitles
    add: part: allAREAWISEOutstandingReportTitlePart

[part: allAREAWISEOutstandingReportTitlePart]
    line: LnallAREAWISEOutstandingReportTitle

[line: LnallAREAWISEOutstandingReportCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: styleCalisto
    Local: Field: fwf: Style: styleCalisto
    Local: Field: fwf: Set As: ##LedgerName
    Local: Field: nf: Set As: $$ReptField:Name:2:ledger:##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2: invisible: $$inprintmode

[part: PrtTitle0allAREAWISEOutstandingReport]
    line : LnallAREAWISEOutstandingReportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: Outstanding Bills (Debit Side)
;------------------------------------------------------------------------------

[Part: PrtallAREAWISEOutstandingReport]
    Part: PrtallAREAWISEOutstandingReportA
    Part: PrtallAREAWISEOutstandingReportB

[Part: PrtallAREAWISEOutstandingReportA]
    Line: LnallAREAWISEOutstandingReportTitle, LnallAREAWISEOutstandingReport
    repeat: LnallAREAWISEOutstandingReport: ColallAREAWISEOutstandingReport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf
    Width: 50% page

[Collection: ColallAREAWISEOutstandingReport]
    type: bills
    filter: ColallAREAWISEOutstandingReportFilter, cwparentagfilter, cwallareafilternew
    fetch: BillCreditPeriod, cwcaption1vch, cwcaption2vch, cwcaption3vch, cwcaption4vch, cwcaption5vch, cwcaption6vch

[system: Formula]
    ColallAREAWISEOutstandingReportFilter: $$isdr:$closingbalance

[Line: LnallAREAWISEOutstandingReportTitle]
    use: LnallAREAWISEOutstandingReport
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: snf: set as: "Bill No"
    local: field: fwf: set as: "Party"
    local: field: numf: set as: "Due Days"
    local: field: amtf: set as: "Bill Amt"
    local: field: default: style: normal bold
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    local: field: sdf: style: styleCalisto2
    local: field: snf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: nf9: style: styleCalisto2
    local: field: numf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2

[Line: LnallAREAWISEOutstandingReport]
    Fields: sdf, snf, fwf
    right field: nf9, numf, Amtf
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: nf9: set as: $cwcaption3item:ledger:$parent
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: sdf: set as: $billdate
    local: field: snf: set as: $name
    local: field: fwf: set as: $parent
    local: field: numf: set as: @@DSPToDate - $BillDate
    local: field: amtf: set as: $closingbalance
    Local: Field: default: Border: thin right
    local: field: default: style: styleCalisto
    border: thin bottom

;------------------------------------------------------------------------------
; MAIN DATA PART: Outstanding Credits (Credit Side)
;------------------------------------------------------------------------------

[Part: PrtallAREAWISEOutstandingReportB]
    Line: LnallAREAWISEOutstandingReportTitleB, LnallAREAWISEOutstandingReportB
    repeat: LnallAREAWISEOutstandingReportB: ColallAREAWISEOutstandingReportB
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf
    Width: 50% page

[Collection: ColallAREAWISEOutstandingReportB]
    type: bills
    filter: ColallAREAWISEOutstandingReportFilterB, cwparentagfilter, cwallareafilternew
    fetch: BillCreditPeriod, cwcaption1vch, cwcaption2vch, cwcaption3vch, cwcaption4vch, cwcaption5vch, cwcaption6vch

[system: Formula]
    ColallAREAWISEOutstandingReportFilterB: not $$isdr:$closingbalance

[Line: LnallAREAWISEOutstandingReportTitleB]
    use: LnallAREAWISEOutstandingReportB
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: fwf: set as: "Particulars"
    local: field: amtf: set as: "Cr. Amount"
    local: field: snf: set as: "Mode of credit"
    local: field: snf: style: styleCalisto2
    Local: field: fwf: Align: LEFT
    local: field: default: style: normal bold
    Local: field: DEFAULT: Align: centre
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    Local: field: snf: Lines: 0

[Line: LnallAREAWISEOutstandingReportB]
    Fields: sdf, snf, fwf
    right field: Amtf
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: nf9: set as: $cwcaption3item:ledger:$parent
    local: field: sdf: set as: $billdate
    local: field: fwf: set as: $name
    local: field: amtf: set as: $closingbalance
    Local: Field: DEFAULT: Border: thin right
    local: field: DEFAULT: style: styleCalisto
    local: field: snf: set as: if @@cwrecvchtype = "Receipt" then (if not $$isempty:@@cwTransactionTypec then @@cwTransactionTypec else "Cash") else @@cwModeofcredit
    Local: field: snf: Width: 10
    border: thin bottom

;------------------------------------------------------------------------------
; SPLIT VIEW PARTS FOR DR/CR TOTALS
;------------------------------------------------------------------------------

[PART: PrtallAREAWISEOutstandingReport2]
    PART: PrtallAREAWISEOutstandingReport2A
    PART: PrtallAREAWISEOutstandingReport2B

[PART: PrtallAREAWISEOutstandingReport2A]
    line: LnallAREAWISEOutstandingReportTotals, LnallAREAWISEOutstandingReportTotals2
    Width: 50% page

[line: LnallAREAWISEOutstandingReportTotals]
    use: LnallAREAWISEOutstandingReport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Dr.Total"
    local: field: amtf: set as: $$CollAmtTotal:ColallAREAWISEOutstandingReport:$closingbalance
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2

[line: LnallAREAWISEOutstandingReportTotals2]
    use: LnallAREAWISEOutstandingReport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "NET O/S"
    local: field: amtf: set as: $$CollAmtTotal:ColallAREAWISEOutstandingReport:$closingbalance - $$CollAmtTotal:ColallAREAWISEOutstandingReportB:$closingbalance
    Local: field: amtf: Format: "drcr"
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2

[PART: PrtallAREAWISEOutstandingReport2B]
    line: LnallAREAWISEOutstandingReportTotalsB
    Width: 50% page

[line: LnallAREAWISEOutstandingReportTotalsB]
    use: LnallAREAWISEOutstandingReportB
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Cr.Total"
    local: field: snf: set as: ""
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    local: field: amtf: set as: $$CollAmtTotal:ColallAREAWISEOutstandingReportB:$closingbalance

;------------------------------------------------------------------------------
; FILTER BUTTON AND FILTER REPORT
;------------------------------------------------------------------------------

[button: allareasbotton]
    key: f7
    title: "Filter"
    Action: Modify Variables: allareasbotton

[report: allareasbotton]
    form: allareasbotton

[form: allareasbotton]
    part: allareasbotton
    HEIGHT: 20
    WIDTH: 30

[part: allareasbotton]
    line: cwtitlelinex, agentbotton, alareabottonline

[line: alareabottonline]
    field: sp, nf
    Local: Field: sp: Set As: $cwcaption3:COMPANY:##SVCURRENTCOMPANY
    Local: field: sp: Width: 12
    space top: 0.5
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf: modifies: str2
    Local: Field: nf: table: cwcaption3tableundercc, Not Applicable: $cwcaption3table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local: Field: nf: Show table: Always
    Local: Field: nf: Table: cwcaption3tableundersc, Not Applicable: $cwcaption3table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field: nf: Table: cwcaption3tableunderled, Not Applicable: $cwcaption3table:COMPANY:##SVCURRENTCOMPANY="ledger"

;------------------------------------------------------------------------------
; SYSTEM FORMULAS: Filtering logic for area selection
;------------------------------------------------------------------------------

[System: Formula]
    cwallareafilternew: if $$issysname:##str2 then yes else @@cwcaption3itemfiltnew = ##str2
    cwcaption3itemfiltnew: $cwcaption3item:ledger:$parent


`;
export default tdl;
