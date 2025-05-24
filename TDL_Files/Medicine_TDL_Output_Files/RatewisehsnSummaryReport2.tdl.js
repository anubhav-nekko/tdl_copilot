// Auto-generated from RatewisehsnSummaryReport2.txt
const tdl = `
;===============================================================================
; RATEWISEHSNSUMMARYREPORT2.TXT
; Created By: Khokan on 2019-06-18 13:32, ID:
; Purpose: GST Rate-wise HSN Summary report (variant 2) for Tally, showing HSN,
;          GST rate, and description for each stock item.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: ratewiseLock ;; : @@ratewiseDemoLock

[!menu: ratewiseLock]
    add: Item: before: @@locQuit: @@ratewiseReport: Display: Repratewise
    add: Item: before: @@locQuit: Blank

[System: formula]
    ratewiseReport: "ratewise"
    ;; ratewiseDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT AND FORM
;------------------------------------------------------------------------------

[Report: Repratewise]
    use: Dsp Template
    Title: @@ratewiseReport
    Printset: Report Title: @@ratewiseReport
    Form: Frmratewise
    Export: Yes
    set: svfromdate : ##svcurrentdate
    set: svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

[Form: Frmratewise]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0ratewise, Prtratewise
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: ratewisebotbrk, ratewisebotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[part: ratewisebotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: ratewisebotopbrk]
    use: dspacctitles
    add: part: ratewiseTitlePart

[part: ratewiseTitlePart]
    line: LnratewiseTitle

[line: LnratewiseCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0ratewise]
    line : LnratewiseCurrPeriod

[Part: Prtratewise]
    Line: LnratewiseTitle, Lnratewise
    bottom Line: LnratewiseTotals
    repeat: Lnratewise: Colratewise
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

;------------------------------------------------------------------------------
; DATA COLLECTION
;------------------------------------------------------------------------------

[Collection: Colratewise]
    use: stockitem

[system: Formula]
    ColratewiseFilter: Yes

;------------------------------------------------------------------------------
; COLUMN HEADERS
;------------------------------------------------------------------------------

[Line: LnratewiseTitle]
    use: Lnratewise
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: nf: set as: "Name"
    local: field: fwf: set as: "Description"
    local: field: qtyf: set as: "Qty."
    local: field: amtf: set as: "Value"
    local: field: ratepf : set as : "Rate"
    local: field: default : style: normal bold

;------------------------------------------------------------------------------
; MAIN DATA LINE
;------------------------------------------------------------------------------

[Line: Lnratewise]
    Fields: nf, numf, nf2, fwf
    right field: Qtyf, Amtf
    Option: Alter on Enter
    local: field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    Local: Field: nf: Set As: $(StockItem, $name).GSTDETAILS[Last].HSNCODE
    Local: Field: numf: Set As: $$cwGetGSTRateForInclusive:$name
    Local: Field: nf2: Set As: $name
    Local: Field: fwf: Set As: $(StockItem, $name).GSTDETAILS[Last].HSN
    Local: Field: qtyf: Set As: ""
    Local: Field: amtf: Set As: ""
    Local: Field: amtf2: Set As: ""

;------------------------------------------------------------------------------
; TOTALS LINE
;------------------------------------------------------------------------------

[line: LnratewiseTotals]
    use: Lnratewise
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
