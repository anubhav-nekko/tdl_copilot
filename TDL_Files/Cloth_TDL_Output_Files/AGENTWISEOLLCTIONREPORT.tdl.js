// Auto-generated from AGENTWISEOLLCTIONREPORT.TXT
const tdl = `
;===============================================================================
; AGENTWISEOLLCTIONREPORT.TXT
; Created By: Khokan on 2021-08-26 11:20, ID:
; Purpose: Provides an "Agent Wise Collection Report" in Tally, showing receipts
;          by party, date, cheque number, and mode of payment, with totals.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {18.Sep.21 13:12}         add: Option: AGENTWISEollctionreportLock ;; : @@AGENTWISEollctionreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AGENTWISEollctionreportReport: Display Collection: colllRepAGENTWISEollctionreport

[!menu: AGENTWISEollctionreportLock]
    add: Item: before: @@locQuit: @@AGENTWISEollctionreportReport: Display Collection: colllRepAGENTWISEollctionreport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; COLLECTION: List of Ledgers for report trigger
;------------------------------------------------------------------------------

[Collection: colllRepAGENTWISEollctionreport]
    Use         : Extract Alias Collection
    Source Collection : List of Ledgers
    Variable    : Ledger Name
    Report      : RepAGENTWISEollctionreport
    Trigger     : cwLedgerName1
    Fetch       : Name

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AGENTWISEollctionreportReport:@@cwcaption1tableundernew+" "+"wise collction report"
;; AGENTWISEollctionreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepAGENTWISEollctionreport]
    use: Dsp Template
    Title: @@AGENTWISEollctionreportReport
    Printset: Report Title: @@AGENTWISEollctionreportReport
    Form: FrmAGENTWISEollctionreport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmAGENTWISEollctionreport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0AGENTWISEollctionreport,PrtAGENTWISEollctionreport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AGENTWISEollctionreportbotbrk,AGENTWISEollctionreportbotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
;;    local : button : report config : action :modify variable: MyPLConfigure
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: AGENTWISEollctionreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AGENTWISEollctionreportbotopbrk]
    use: dspacctitles
    add: part: AGENTWISEollctionreportTitlePart

[part: AGENTWISEollctionreportTitlePart]
    line: LnAGENTWISEollctionreportTitle

[line: LnAGENTWISEollctionreportCurrPeriod]
    field: fwf, nf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style:style3x
    Local: Field: fwf: Style:style3x
    Local: Field: NF: Style:style3x
    Local: Field: fwf: Set As:##LedgerName
    Local: Field: nf: Set As:$$ReptField:Name:2:ledger:##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2:invisible: $$inprintmode

[part: PrtTitle0AGENTWISEollctionreport]
    line : LnAGENTWISEollctionreportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH RECEIPT ENTRY
;------------------------------------------------------------------------------

[Part: PrtAGENTWISEollctionreport]
    Line: LnAGENTWISEollctionreportTitle,LnAGENTWISEollctionreport
    bottom Line: LnAGENTWISEollctionreportTotals
    repeat: LnAGENTWISEollctionreport: ColAGENTWISEollctionreport
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf

;------------------------------------------------------------------------------
; COLLECTION: Aggregated receipts by party, date, voucher, etc.
;------------------------------------------------------------------------------

[Collection: ColAGENTWISEollctionreport]
    source Collection: Colreceiptsouagentcoll
    by:date:$date
    by:vouchernumber:$vouchernumber
    by:partyledgername:$partyledgername
    compute:cwcaption1item1:$cwcaption1item:ledger:$partyledgername
    by:vouchertypename:$vouchertypename
    aggr compute:rcptvalue:sum:$amount
    compute:chqno:$AllLedgerEntries[1, @@IsBankLedgr].BankAllocations[1].InstrumentNumber
    search key:$partyledgername
    filter:ColAGENTWISEollctionreportFilter

[Collection: Colreceiptsouagentcoll]
    Type        : Vouchers    : VoucherType
    Child Of    : $$VchTypereceipt
    Belongs To  : Yes
    /*
    type:bills
    ;; {26.Aug.21 10:16}   compute:cwrecvchtype:$$CollectionField:$vouchertypename:First:ledgerentries
    ;; {17.Sep.21 18:36}  compute:closingbalance:$closingbalance
    filter:ColAGENTWISEollctionreportFilter,ColAGENTWISEollctionreportFilter2 ;;,cwparentagfilter
    fetch:ledgerentries.ledgerentries.cwnetsales
    fetch:ledgerentries.ledgerentries.vouchertypename
    fetch:ledgerentries.BANKALLOCATIONS.INSTRUMENTNUMBER
    fetch:cwcaption1item
    ;; {17.Sep.21 18:45} cleared:yes
    ;; {26.Aug.21 11:05}  fetch:AllLedgerEntries.AllLedgerEntries.INSTRUMENTNUMBER
    */

;------------------------------------------------------------------------------
; SYSTEM FORMULAS: Filtering logic for party/agent and voucher type
;------------------------------------------------------------------------------

[system: Formula]
;; {18.Sep.21 12:28} ColAGENTWISEollctionreportFilter:$cwcaption1item:ledger:$parent=##LedgerName
ColAGENTWISEollctionreportFilter:$cwcaption1item:ledger:$partyledgername=##LedgerName
ColAGENTWISEollctionreportFilter2:@@cwrecvchtype="Receipt"

;------------------------------------------------------------------------------
; (Optional) Collection for uncleared entries (not used in main logic)
;------------------------------------------------------------------------------

[Collection: ColAGENTWISEollctionreportb]
    use: ColAGENTWISEollctionreportb
    cleared:no

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title Line
;------------------------------------------------------------------------------

[Line: LnAGENTWISEollctionreportTitle]
    use: LnAGENTWISEollctionreport
    option: titleopt
    local:field: sdf: set as: "Date"
    local:field: fwf: set as: "Party"
    local:field: SNF: set as: "Chq No"
    local:field: NF: set as: "Mode of Payment"
    local:field: amtf: set as: "Receipt"
    local: field: sdf : style:style2x
    local: field: fwf : style:style2x
    local: field: SNF : style:style2x
    local: field: NF : style:style2x
    local: field: amtf : style:style2x
    Local: field: default: Align:centre
    Local: field: fwf: Align:left

;------------------------------------------------------------------------------
; MAIN DATA LINE: RECEIPT DETAILS BY PARTY/DATE
;------------------------------------------------------------------------------

[Line: LnAGENTWISEollctionreport]
    Fields: sdf,fwf
    right field: SNF,nf,Amtf
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    ;;local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero,decimals:0"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    ;; local : field : fwf : alter : ledger : $$isledger
    local:field: sdf: set as:$date
    local:field: fwf: set as:$partyledgername
    local:field: SNF: set as:$chqno
    local:field: NF: set as:$vouchernumber
    local:field: NF2: set as:$cwcaption1item1
    local:field: amtf: set as:$rcptvalue
    local: field: DEFAULT : style:style3x
    ;; {26.Aug.21 11:08}   Local: field: amtf: Format: "drcr"
    Local: Field: default: Border: thin right
    ;; {17.Sep.21 18:46}   Local: field: amtf: Format: "drcr"
    border:thin bottom

;------------------------------------------------------------------------------
; TOTALS LINE: DISPLAY TOTALS FOR ALL COLUMNS
;------------------------------------------------------------------------------

[line: LnAGENTWISEollctionreportTotals]
    use: LnAGENTWISEollctionreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local:field: sdf: set as:""
    local:field: SNF: set as:""
    local:field: NF: set as:""
    local:field: amtf: set as:""
    local: field: amtf : set as :  $$total:amtf
    local: field: sdf : style:style2x
    local: field: fwf : style:style2x
    local: field: SNF : style:style2x
    local: field: NF : style:style2x
    local: field: amtf : style:style2x


`;
export default tdl;
