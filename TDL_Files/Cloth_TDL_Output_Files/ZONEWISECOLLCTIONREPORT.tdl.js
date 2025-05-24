// Auto-generated from ZONEWISECOLLCTIONREPORT.TXT
const tdl = `
;===============================================================================
; ZONEWISECOLLCTIONREPORT.TXT
; Created By: Khokan on 2021-08-26 11:42, ID:
; Purpose: Implements a "Zone Wise Collection Report" in Tally, allowing users
;          to select a zone (cost centre) and view party-wise receipts with
;          cheque number, payment mode, and totals, with professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;; add: Option: ZONEWISEcollctionreportLock ;; : @@ZONEWISEcollctionreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@ZONEWISEcollctionreportReport: Display Collection: colllRepZONEWISEcollctionreport
    add: Item: before: @@locQuit: Blank

[System: formula]
    ZONEWISEcollctionreportReport: @@cwcaption4tableundernew + " wise collction report"
;; ZONEWISEcollctionreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; ZONE SELECTION: Popup for selecting a cost centre (zone)
;;------------------------------------------------------------------------------

[Collection: colllRepZONEWISEcollctionreport]
    Use                : Extract Alias Collection
    Source Collection  : List of Cost Centres
    Title              : $$LocaleString:"List of Cost Centres"
    Format             : $CstCatName
    Filter             : CostCentreFilter
    Report             : RepZONEWISEcollctionreport
    Variable           : SCostCentre
    Trigger            : SCostCentrex1

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepZONEWISEcollctionreport]
    use        : Dsp Template
    Title      : @@ZONEWISEcollctionreportReport
    Printset   : Report Title: @@ZONEWISEcollctionreportReport
    Form       : FrmZONEWISEcollctionreport
    Export     : Yes
    set        : svfromdate : ##svcurrentdate
    set        : svTodate   : ##svcurrentdate
    Local      : Button   : RelReports : Inactive : Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmZONEWISEcollctionreport]
    use     : DSP Template
    Part    : DspAccTitles, PrtTitle0ZONEWISEcollctionreport, PrtZONEWISEcollctionreport
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: ZONEWISEcollctionreportbotbrk, ZONEWISEcollctionreportbotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[part: ZONEWISEcollctionreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: ZONEWISEcollctionreportbotopbrk]
    use: dspacctitles
    add: part: ZONEWISEcollctionreportTitlePart

[part: ZONEWISEcollctionreportTitlePart]
    line: LnZONEWISEcollctionreportTitle

[line: LnZONEWISEcollctionreportCurrPeriod]
    field: fwf, nf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style:style3x
    Local: Field: fwf: Style:style3x
    Local: Field: nf: Style:style3x
    Local: Field: fwf: Set As: ##SCostCentre
    Local: Field: nf: Set As: $$ReptField:Name:2:ledger:##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2:invisible: $$inprintmode

[part: PrtTitle0ZONEWISEcollctionreport]
    line : LnZONEWISEcollctionreportCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of party-wise receipts for the selected zone
;;------------------------------------------------------------------------------

[Part: PrtZONEWISEcollctionreport]
    Line: LnZONEWISEcollctionreportTitle, LnZONEWISEcollctionreport
    bottom Line: LnZONEWISEcollctionreportTotals
    repeat: LnZONEWISEcollctionreport: ColZONEWISEcollctionreport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

[Collection: ColZONEWISEcollctionreport]
    type: bills
    filter: ColZONEWISEcollctionreportFilter, ColAGENTWISEollctionreportFilter2
    fetch: ledgerentries.ledgerentries.cwnetsales
    fetch: ledgerentries.ledgerentries.vouchertypename
    fetch: ledgerentries.BANKALLOCATIONS.INSTRUMENTNUMBER
    fetch: cwcaption1item

[system: Formula]
    ColZONEWISEcollctionreportFilter: $cwcaption4item:ledger:$parent = ##SCostCentre

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LnZONEWISEcollctionreportTitle]
    use: LnZONEWISEcollctionreport
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: fwf: set as: "Party"
    local: field: SNF: set as: "Chq No"
    local: field: NF: set as: "Mode of Payment"
    local: field: amtf: set as: "Receipt"
    local: field: sdf : style:style2x
    local: field: fwf : style:style2x
    local: field: SNF : style:style2x
    local: field: NF : style:style2x
    local: field: amtf : style:style2x
    Local: field: default: Align:centre
    Local: field: fwf: Align:left

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per party/receipt
;;------------------------------------------------------------------------------

[Line: LnZONEWISEcollctionreport]
    Fields: sdf, fwf
    right field: SNF, nf, Amtf
    Option: Alter on Enter
    local: field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local: field: sdf: set as: $billdate
    local: field: fwf: set as: $parent
    local: field: SNF: set as: @@recmyNewChqNoa
    local: field: NF: set as: $name
    local: field: NF2: set as: $$CollectionField:$vouchertypename:First:ledgerentries
    local: field: amtf: set as: $closingbalance
    local: field: DEFAULT : style:style3x
    Local: Field: default: Border: thin right
    border: thin bottom

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnZONEWISEcollctionreportTotals]
    use: LnZONEWISEcollctionreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: sdf: set as: ""
    local: field: SNF: set as: ""
    local: field: NF: set as: ""
    local: field: amtf : set as :  $$total:amtf
    local: field: sdf : style:style2x
    local: field: fwf : style:style2x
    local: field: SNF : style:style2x
    local: field: NF : style:style2x
    local: field: amtf : style:style2x

;===============================================================================
; End of ZONEWISECOLLCTIONREPORT.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
