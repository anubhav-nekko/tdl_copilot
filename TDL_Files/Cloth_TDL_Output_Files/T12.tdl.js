// Auto-generated from T12.TXT
const tdl = `
;===============================================================================
; T12.TXT
; Created By: khokan on 2022-05-25 17:25, ID:
; Purpose: Implements a Credit Note Register report in Tally, listing credit note
;          vouchers with party, description, quantity, value, and rate, with totals.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: t12Lock ;; : @@t12DemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@t12Report: Display: Rept12

[!menu: t12Lock]
    add: Item: before: @@locQuit: @@t12Report: Display: Rept12
    add: Item: before: @@locQuit: Blank

[System: formula]
    t12Report: "t12"
;; t12DemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Rept12]
    use        : Dsp Template
    Title      : @@t12Report
    Printset   : Report Title: @@t12Report
    Form       : Frmt12
    Export     : Yes
    set        : svfromdate : ##svcurrentdate
    set        : svTodate   : ##svcurrentdate
    Local      : Button   : RelReports : Inactive : Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmt12]
    use     : DSP Template
    Part    : DspAccTitles, PrtTitle0t12, Prtt12
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: t12botbrk, t12botOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    ;; Standard Tally navigation and action buttons

[part: t12botBrk]
    line: EXPINV PageBreak
    border: thin top

[part: t12botopbrk]
    use: dspacctitles
    add: part: t12TitlePart

[part: t12TitlePart]
    line: Lnt12Title

[line: Lnt12CurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0t12]
    line : Lnt12CurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of credit note vouchers
;;------------------------------------------------------------------------------

[Part: Prtt12]
    Line: Lnt12Title, Lnt12
    bottom Line: Lnt12Totals
    repeat: Lnt12: Colt12
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

;;------------------------------------------------------------------------------
;; DATA COLLECTION: Credit note vouchers
;;------------------------------------------------------------------------------

[Collection: Colt12]
    Type       : Vouchers : VoucherType
    Child Of   : $$VchTypeCreditNote
    Belongs To : Yes
    fetch      : partyledgername

[system: Formula]
    Colt12Filter: Yes

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: Lnt12Title]
    use: Lnt12
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: nf: set as: "Name"
    local: field: fwf: set as: "Description"
    local: field: qtyf: set as: "Qty."
    local: field: amtf: set as: "Value"
    local: field: ratepf : set as : "Rate"
    local: field: default : style: normal bold

;;------------------------------------------------------------------------------
;; DATA LINE: One line per credit note voucher
;;------------------------------------------------------------------------------

[Line: Lnt12]
    Fields: sdf, nf, fwf
    right field: ratepf, Qtyf, Amtf
    Option: Alter on Enter
    local: field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local : field : sdf : set as : $date
    local : field : amtf : set as : $amount
    local : field : fwf : set as : $partyledgername
    local : field : nf : set as : $cwcaption1item:ledger:$partyledgername

;;------------------------------------------------------------------------------
;; TOTALS LINE: Sums for all columns
;;------------------------------------------------------------------------------

[line: Lnt12Totals]
    use: Lnt12
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf

;===============================================================================
; End of T12.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
