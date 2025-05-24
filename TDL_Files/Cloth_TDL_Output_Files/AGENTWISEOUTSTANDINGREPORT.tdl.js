// Auto-generated from AGENTWISEOUTSTANDINGREPORT.TXT
const tdl = `
;===============================================================================
; AGENTWISEOUTSTANDINGREPORT.TXT
; Created By: Khokan on 2021-08-24 11:57, ID:
; Purpose: Provides an "Agent Wise Outstanding Report" in Tally, showing outstanding
;          bills and credits per party/agent, with filtering, split view, and totals.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {24.Aug.21 19:26}         add: Option: AGENTWISEOutstandingReportLock ;; : @@AGENTWISEOutstandingReportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AGENTWISEOutstandingReportReport: Display: RepAGENTWISEOutstandingReport

[!menu: AGENTWISEOutstandingReportLock]
    add: Item: before: @@locQuit: @@AGENTWISEOutstandingReportReport: Display Collection: collRepAGENTWISEOutstandingReport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; COLLECTION: List of Ledgers for report trigger
;------------------------------------------------------------------------------

[Collection: collRepAGENTWISEOutstandingReport]
    Use         : Extract Alias Collection
    Source Collection : List of Ledgers
    Variable    : Ledger Name
    Report      : RepAGENTWISEOutstandingReport
    Trigger     : cwLedgerName1
    Fetch       : Name

;------------------------------------------------------------------------------
; LEDGER NAME FIELD FOR SELECTION
;------------------------------------------------------------------------------

[Report: cwLedgerName1]   ;;Auto Report
    Use     : Collection Variable
    Local   : Line : Collection Variable : Field : cwLedgerName1
    Local   : Field: MV Title            : Info  : $$LocaleString:"Name of Ledger"

[Field: cwLedgerName1]
    Use         : Name Field
    Key         : Create Ledger
    Modifies    : LedgerName
    Table       : collmycwcwcaption1
    Show Table  : Always
    CommonTable : No

[Collection: collmycwcwcaption1]
    type: ledger
    TITLE: "List of Ledger Name"
    add: filter: mycwcwcaption1table
    fetch: cwshowinledstate

[System: Formula]
    mycwcwcaption1table: $parent = @@cwcaption1tableundernew

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AGENTWISEOutstandingReportReport: @@cwcaption1tableundernew + " wise outstanding report"
;; AGENTWISEOutstandingReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION: Agent Wise Outstanding Report
;------------------------------------------------------------------------------

[Report: RepAGENTWISEOutstandingReport]
    use: Dsp Template
    Title: @@AGENTWISEOutstandingReportReport
    Printset: Report Title: @@AGENTWISEOutstandingReportReport
    Form: FrmAGENTWISEOutstandingReport
    Export: Yes
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str1
    set: str1: ""

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmAGENTWISEOutstandingReport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0AGENTWISEOutstandingReport,PrtAGENTWISEOutstandingReport,PrtAGENTWISEOutstandingReport2
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AGENTWISEOutstandingReportbotbrk,AGENTWISEOutstandingReportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    add: button: agentbotton
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: AGENTWISEOutstandingReportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AGENTWISEOutstandingReportbotopbrk]
    use: dspacctitles
    add: part: AGENTWISEOutstandingReportTitlePart

[part: AGENTWISEOutstandingReportTitlePart]
    line: LnAGENTWISEOutstandingReportTitle

[line: LnAGENTWISEOutstandingReportCurrPeriod]
    field: fwf, nf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: styleCalisto
    Local: Field: fwf: Style: styleCalisto
    Local: Field: fwf: Set As: ##LedgerName
    Local: Field: nf: Set As: $$ReptField:Name:2:ledger:##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2: invisible: $$inprintmode

[part: PrtTitle0AGENTWISEOutstandingReport]
    line : LnAGENTWISEOutstandingReportCurrPeriod, LnoutstandingreportTitleaddress, partyphline
    repeat: LnoutstandingreportTitleaddress: collcwLedgeraddress

;------------------------------------------------------------------------------
; MAIN DATA PART: Outstanding Bills (Debit Side)
;------------------------------------------------------------------------------

[Part: PrtAGENTWISEOutstandingReport]
    Part: PrtAGENTWISEOutstandingReporta
    Part: PrtAGENTWISEOutstandingReportb

[Part: PrtAGENTWISEOutstandingReporta]
    Line: LnAGENTWISEOutstandingReportTitle, LnAGENTWISEOutstandingReport
    repeat: LnAGENTWISEOutstandingReport: ColAGENTWISEOutstandingReport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf
    Border: thin left
    Width: 50 ;;% page

[Collection: ColAGENTWISEOutstandingReport]
    type: bills
    filter: ColAGENTWISEOutstandingReportFilter, cwparentagfilter
    fetch: BillCreditPeriod, cwcaption1vch, cwcaption2vch, cwcaption3vch, cwcaption4vch, cwcaption5vch, cwcaption6vch
    fetch: ledgerentries.ledgerentries.cwnetsales

[system: Formula]
    ColAGENTWISEOutstandingReportFilter: $$isdr:$closingbalance and $cwcaption1item:ledger:$parent = ##LedgerName

[Line: LnAGENTWISEOutstandingReportTitle]
    use: LnAGENTWISEOutstandingReport
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
    local: field: numf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2

[Line: LnAGENTWISEOutstandingReport]
    Fields: sdf, snf, fwf
    right field: numf, Amtf
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
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
; TOTALS LINES: Outstanding Dr. Total and Net O/S
;------------------------------------------------------------------------------

[part: PrtAGENTWISEOutstandingReport2a]
    Width: 50 ;;% page
    line: LnAGENTWISEOutstandingReportTotals, LnAGENTWISEoutstandingreportTotalsnettolat

[line: LnAGENTWISEOutstandingReportTotals]
    use: LnAGENTWISEOutstandingReport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Dr.Total"
    local: field: amtf: set as: $$CollAmtTotal:ColAGENTWISEOutstandingReport:$closingbalance
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2

[line: LnAGENTWISEoutstandingreportTotalsnettolat]
    use: LnAGENTWISEOutstandingReport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "NET O/S"
    local: field: amtf: set as: $$CollAmtTotal:ColAGENTWISEOutstandingReport:$closingbalance - $$CollAmtTotal:ColAGENTWISEOutstandingReportb:$closingbalance
    Local: field: amtf: Format: "drcr"
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2

;------------------------------------------------------------------------------
; MAIN DATA PART: Outstanding Credits (Credit Side)
;------------------------------------------------------------------------------

[Part: PrtAGENTWISEOutstandingReportb]
    Width: 50  ;;% page
    Line: LnAGENTWISEOutstandingReportTitleb, LnAGENTWISEOutstandingReportb
    repeat: LnAGENTWISEOutstandingReportb: ColAGENTWISEOutstandingReportb
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf
    Border: thin left right

[Collection: ColAGENTWISEOutstandingReportb]
    type: bills
    filter: ColAGENTWISEOutstandingReportFilterbnos, cwparentagfilter
    fetch: BillCreditPeriod, cwcaption1vch, cwcaption2vch, cwcaption3vch, cwcaption4vch, cwcaption5vch, cwcaption6vch
    fetch: ledgerentries.ledgerentries.vouchertypename

[system: Formula]
    ColAGENTWISEOutstandingReportFilterbnos: not $$isdr:$closingbalance and $cwcaption1item:ledger:$parent = ##LedgerName

[Line: LnAGENTWISEOutstandingReportTitleb]
    use: LnAGENTWISEOutstandingReportb
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: fwf: set as: "Particulars"
    local: field: amtf: set as: "Cr. Amount"
    local: field: snf: set as: "Mode of credit"
    local: field: snf: style: styleCalisto2
    Local: field: fwf: Align: LEFT
    local: field: default: style: normal bold
    Local: field: default: Align: centre
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    Local: field: snf: Lines: 0

[Line: LnAGENTWISEOutstandingReportb]
    Fields: sdf, snf, fwf
    right field: Amtf
    Local: Field: nf9: Set As: $cwcaption1item:ledger:$parent
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: sdf: set as: $billdate
    local: field: fwf: set as: $name
    local: field: amtf: set as: $closingbalance
    Local: Field: default: Border: thin right
    local: field: default: style: styleCalisto
    local: field: snf: set as: if @@cwrecvchtype = "Receipt" then (if not $$isempty:@@cwTransactionTypec then @@cwTransactionTypec else "Cash") else @@cwModeofcredit
    Local: field: snf: Width: 10
    border: thin bottom

;------------------------------------------------------------------------------
; CREDIT TOTALS LINE
;------------------------------------------------------------------------------

[part: PrtAGENTWISEOutstandingReport2]
    part: PrtAGENTWISEOutstandingReport2a
    part: PrtAGENTWISEOutstandingReport2b

[part: PrtAGENTWISEOutstandingReport2b]
    Width: 50  ;;% page
    line: LnAGENTWISEOutstandingReportTotalsb

[line: LnAGENTWISEOutstandingReportTotalsb]
    use: LnAGENTWISEOutstandingReportb
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Cr.Total"
    local: field: snf: set as: ""
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    local: field: amtf: set as: $$CollAmtTotal:ColAGENTWISEOutstandingReportb:$closingbalance

;------------------------------------------------------------------------------
; SYSTEM FORMULAS: Mode of Credit, Transaction Type, and Filtering
;------------------------------------------------------------------------------

[System: Formula]
    cwModeofcredit: IF $$IsEMPTY:@@cwrecvchtype then $name else $$CollectionField:$vouchertypename:First:ledgerentries
    cwTransactionTypec: $$filtervalue:@@cwTransactionTypeb:ledgerentries:(-1):recColxFilter
    cwTransactionTypeb: $$filtervalue:@@cwTransactionTypea:allledgerentries:1:reccwLedisBank
    cwTransactionTypea: $$collectionfield:$TransactionType:1:BANKALLOCATIONS

;------------------------------------------------------------------------------
; FILTER BUTTON AND FILTER REPORT
;------------------------------------------------------------------------------

[button: agentbotton]
    key: f7
    title: "Filter"
    Action: Modify Variables: agentbotton

[report: agentbotton]
    form: agentbotton

[form: agentbotton]
    part: agentbotton
    HEIGHT: 20
    WIDTH: 30

[part: agentbotton]
    line: cwtitlelinex, agentbotton

[line: cwtitlelinex]
    field: fwfc
    Local: Field: fwfc: info: "Filter"
    Local: Field: fwfc: Border: thin bottom
    Local: Field: fwfc: Style: Normal Bold
    space bottom: 0.5

[line: agentbotton]
    field: sp, nf
    Local: Field: sp: Set As: "Party Name"
    Local: Field: nf: modifies: str1
    space bottom: 0.5
    Local: field: sp: Width: 12
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf: table: collcwled, Not Applicable
    Local: Field: nf: Show table: Always

[Collection: collcwled]
    type: ledger
    title: "List of Ledger"

[System: Formula]
    cwparentagfilter: if $$issysname:##str1 then yes else $parent = ##str1


`;
export default tdl;
