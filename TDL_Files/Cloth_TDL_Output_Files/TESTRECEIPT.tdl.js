// Auto-generated from TESTRECEIPT.TXT
const tdl = `
;===============================================================================
; TESTRECEIPT.TXT
; Created By: khokan on 2022-07-14 14:22, ID:
; Purpose: Implements a test receipt report in Tally, demonstrating
;          collection, grouping, filtering, and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: testreceiptLock ;; : @@testreceiptDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@testreceiptReport: Display: Reptestreceipt

[!menu: testreceiptLock]
    add: Item: before: @@locQuit: @@testreceiptReport: Display: Reptestreceipt
    add: Item: before: @@locQuit: Blank

[System: formula]
    testreceiptReport: "testreceipt"
;; testreceiptDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Reptestreceipt]
    use: Dsp Template
    Title: @@testreceiptReport
    Printset: Report Title: @@testreceiptReport
    Form: Frmtestreceipt
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate   : ##svcurrentdate
    Local: Button   : RelReports        : Inactive : Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmtestreceipt]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0testreceipt, Prttestreceipt
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: testreceiptbotbrk, testreceiptbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[part: testreceiptbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: testreceiptbotopbrk]
    use: dspacctitles
    add: part: testreceiptTitlePart

[part: testreceiptTitlePart]
    line: LntestreceiptTitle

[line: LntestreceiptCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0testreceipt]
    line : LntestreceiptCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of grouped and filtered receipts
;;------------------------------------------------------------------------------

[Part: Prttestreceipt]
    Line: LntestreceiptTitle, Lntestreceipt
    bottom Line: LntestreceiptTotals
    repeat: Lntestreceipt: Coltestreceipt
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf, amtf

[Collection: Coltestreceipt]
    source Collection: Colreceiptsou
    by: partyledgername: $partyledgername
    by: ledgername1: $$CollectionField:$ledgername:2:ledgerentries
    aggr compute: rcptvalue: sum: $amount
    search key: $partyledgername
    filter: ColtestreceiptFilter

[system: Formula]
    ColtestreceiptFilter: not $ledgername1 = "cash"

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LntestreceiptTitle]
    use: Lntestreceipt
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: nf: set as: "Name"
    local: field: fwf: set as: "Description"
    local: field: qtyf: set as: "Qty."
    local: field: amtf: set as: "Value"
    local: field: ratepf : set as : "Rate"
    local: field: default : style: normal bold

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per receipt/party
;;------------------------------------------------------------------------------

[Line: Lntestreceipt]
    Fields: sdf, nf, fwf
    right field: ratepf, Qtyf, Amtf
    Option: Alter on Enter
    local: field: qtyf : Format : "NoSymbol, Short Form, No Compact, NoZero"
    local: field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local : field : sdf : set as : $date
    local : field : fwf : set as : $partyledgername
    local : field : nf : set as : $ledgername1

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LntestreceiptTotals]
    use: Lntestreceipt
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf

;===============================================================================
; End of TESTRECEIPT.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
