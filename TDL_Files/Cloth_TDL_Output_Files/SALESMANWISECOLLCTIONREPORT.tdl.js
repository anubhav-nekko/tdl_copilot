// Auto-generated from SALESMANWISECOLLCTIONREPORT.TXT
const tdl = `
;===============================================================================
; SALESMANWISECOLLCTIONREPORT.TXT
; Created By: Khokan on 2021-08-26 11:32, ID:
; Purpose: Implements a "Salesman Wise Collection Report" in Tally,
;          listing all receipts for a selected salesman, showing party,
;          cheque number, mode of payment, and receipt amount.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;; Add the Salesman Wise Collection Report to the main menu (locked/demo logic can be enabled if needed)
    ;; add: Option: SALESMANWISEcollctionreportLock ;; : @@SALESMANWISEcollctionreportDemoLock

[#menu : cw_Debug_menu]
    ;; Add the report to the debug menu for display via collection
    add: Item: before: @@locQuit: @@SALESMANWISEcollctionreportReport: Display Collection: collRepSALESMANWISEcollctionreport
    add: Item: before: @@locQuit: Blank

[!menu: SALESMANWISEcollctionreportLock]
    ;; Add the report to a locked menu if required
    add: Item: before: @@locQuit: @@SALESMANWISEcollctionreportReport: Display Collection: collRepSALESMANWISEcollctionreport
    add: Item: before: @@locQuit: Blank

[System: formula]
    ;; Dynamic report title using the company's salesman caption
    SALESMANWISEcollctionreportReport:@@cwcaption2tableundernew+" "+"wise collction report"
    ;; SALESMANWISEcollctionreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; COLLECTION: Ledger selection for salesman-wise report
;;------------------------------------------------------------------------------

[Collection: collRepSALESMANWISEcollctionreport]
    Use               : Extract Alias Collection
    Source Collection : List of Ledgers
    Variable          : Ledger Name
    Report            : RepSALESMANWISEcollctionreport
    Trigger           : cwLedgerName2
    Fetch             : Name

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepSALESMANWISEcollctionreport]
    use        : Dsp Template
    Title      : @@SALESMANWISEcollctionreportReport
    Printset   : Report Title: @@SALESMANWISEcollctionreportReport
    Form       : FrmSALESMANWISEcollctionreport
    Export     : Yes
    set        : svfromdate : ##svcurrentdate
    set        : svTodate   : ##svcurrentdate
    Local      : Button: RelReports: Inactive: Yes

;;------------------------------------------------------------------------------
;; MAIN FORM AND LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmSALESMANWISEcollctionreport]
    use     : DSP Template
    Part    : DspAccTitles, PrtTitle0SALESMANWISEcollctionreport, PrtSALESMANWISEcollctionreport
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: SALESMANWISEcollctionreportbotbrk, SALESMANWISEcollctionreportbotOpbrk
    Bottom Toolbar Buttons : BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    ;; Style company name, address, and report title for print
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;;------------------------------------------------------------------------------
;; PAGE BREAK PARTS (for print/export)
;;------------------------------------------------------------------------------

[part: SALESMANWISEcollctionreportbotBrk]
    line   : EXPINV PageBreak
    border : thin top

[part: SALESMANWISEcollctionreportbotopbrk]
    use    : dspacctitles
    add    : part: SALESMANWISEcollctionreportTitlePart

[part: SALESMANWISEcollctionreportTitlePart]
    line   : LnSALESMANWISEcollctionreportTitle

;;------------------------------------------------------------------------------
;; TITLE LINE: Display report period, salesman, and other info
;;------------------------------------------------------------------------------

[line: LnSALESMANWISEcollctionreportCurrPeriod]
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

[part: PrtTitle0SALESMANWISEcollctionreport]
    line : LnSALESMANWISEcollctionreportCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of salesman-wise collection details
;;------------------------------------------------------------------------------

[Part: PrtSALESMANWISEcollctionreport]
    Line        : LnSALESMANWISEcollctionreportTitle, LnSALESMANWISEcollctionreport
    bottom Line : LnSALESMANWISEcollctionreportTotals
    repeat      : LnSALESMANWISEcollctionreport: ColSALESMANWISEcollctionreport
    scroll      : Vertical
    Common Border: Yes
    Total       : Qtyf, amtf

;;------------------------------------------------------------------------------
;; DATA COLLECTION: Salesman-wise collection details
;;------------------------------------------------------------------------------

[Collection: ColSALESMANWISEcollctionreport]
    source Collection: Colreceiptsouagentcoll
    by:date:$date
    by:vouchernumber:$vouchernumber
    by:partyledgername:$partyledgername
    compute:cwcaption2item1:$cwcaption2item:ledger:$partyledgername
    by:vouchertypename:$vouchertypename
    aggr compute:rcptvalue:sum:$amount
    compute:chqno:$AllLedgerEntries[1, @@IsBankLedgr].BankAllocations[1].InstrumentNumber
    search key:$partyledgername
    filter:ColSALESMANWISEcollctionreportFilter,ColAGENTWISEollctionreportFilter2
    fetch:ledgerentries.ledgerentries.cwnetsales
    fetch:ledgerentries.ledgerentries.vouchertypename
    fetch:ledgerentries.BANKALLOCATIONS.INSTRUMENTNUMBER
    fetch:cwcaption1item

[system: Formula]
    ;; Filter: Only include receipts for parties where the selected salesman matches the party's salesman field
    ColSALESMANWISEcollctionreportFilter:$cwcaption2item:ledger:$partyledgername=##LedgerName

;;------------------------------------------------------------------------------
;; TITLE LINE: Table headers
;;------------------------------------------------------------------------------

[Line: LnSALESMANWISEcollctionreportTitle]
    use   : LnSALESMANWISEcollctionreport
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

;;------------------------------------------------------------------------------
;; DATA LINE: One line per receipt/party with all columns
;;------------------------------------------------------------------------------

[Line: LnSALESMANWISEcollctionreport]
    Fields: sdf, fwf
    right field: SNF, nf, amtf
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local:field: sdf: set as:$date
    local:field: fwf: set as:$partyledgername
    local:field: SNF: set as:$chqno
    local:field: NF: set as:$vouchernumber
    local:field: NF2: set as:$cwcaption1item1
    local:field: amtf: set as:$rcptvalue
    local: field: DEFAULT : style:style3x
    Local: Field: default: Border: thin right
    border:thin bottom

;;------------------------------------------------------------------------------
;; TOTALS LINE: Sums for all columns
;;------------------------------------------------------------------------------

[line: LnSALESMANWISEcollctionreportTotals]
    use: LnSALESMANWISEcollctionreport
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

;===============================================================================
; End of SALESMANWISECOLLCTIONREPORT.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
