// Auto-generated from T10.TXT
const tdl = `
;===============================================================================
; T10.TXT
; Created By: Khokan on 2021-03-25 19:25, ID:
; Purpose: Implements a test report "testcr" in Tally, demonstrating
;          collection, filtering, and reporting of receipt values from bills.
;          Includes menu integration, period setup, and report formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: testcrLock ;; : @@testcrDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@testcrReport: Display: Reptestcr

[!menu: testcrLock]
    add: Item: before: @@locQuit: @@testcrReport: Display: Reptestcr
    add: Item: before: @@locQuit: Blank

[System: formula]
    testcrReport: "testcr"
;; testcrDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Reptestcr]
    use: Dsp Template
    Title: @@testcrReport
    Printset: Report Title: @@testcrReport
    Form: Frmtestcr
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate   : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

;;------------------------------------------------------------------------------
;; FORM LAYOUT: Main form for the testcr report
;;------------------------------------------------------------------------------

[Form: Frmtestcr]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0testcr, Prttestcr
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: testcrbotbrk, testcrbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[part: testcrbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: testcrbotopbrk]
    use: dspacctitles
    add: part: testcrTitlePart

[part: testcrTitlePart]
    line: LntestcrTitle

[line: LntestcrCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0testcr]
    line : LntestcrCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of receipt values from bills
;;------------------------------------------------------------------------------

[Part: Prttestcr]
    Line: LntestcrTitle, Lntestcr
    bottom Line: LntestcrTotals
    repeat: Lntestcr: Colreceipt  ;;sourColtestcr  ;; Coltestcr
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

;;------------------------------------------------------------------------------
;; COLLECTIONS: Receipt values from bills (cleared and uncleared)
;;------------------------------------------------------------------------------

[Collection: Coltestcr]
    Collection: Coltestcra
    Collection: Coltestcrb

[Collection: Coltestcra]
    type : bills
    child of: #fwf
    compute: rcptvalue: $$FilteramtTotal:ledgerentries:cwreceiptfilterxxnew:@@cwFNBillAllocTotal
    cleared: yes

[System: Formula]
    cwreceiptfilterxxnew: $$isreceipt:$vouchertypename
    cwreceiptfilterxxnew2: yes

[Collection: Coltestcrb]
    use: Coltestcra
    cleared: no

;;------------------------------------------------------------------------------
;; ALTERNATE COLLECTIONS: (Commented/Legacy for reference)
;;------------------------------------------------------------------------------

[Collection: sourColtestcr]
    source Collection: sourColtestcrx
    by: partyledgername: $partyledgername
    by: vouchernumber: $vouchernumber

[Collection: sourColtestcrx]
    Type: Vouchers : Vouchertype
    Child of: $$VchTypesales
    Belongs To: Yes
    fetch: partyledgername, amount

[System: Formula]
    ColtestcrFilter: $vouchernumber = "M-20-21/150"

;;------------------------------------------------------------------------------
;; LINE DEFINITIONS: Titles, Data, Totals
;;------------------------------------------------------------------------------

[Line: LntestcrTitle]
    use: Lntestcr
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: nf: set as: "Name"
    local: field: fwf: set as: "Description"
    local: field: qtyf: set as: "Qty."
    local: field: amtf: set as: "Value"
    local: field: ratepf: set as: "Rate"
    local: field: default: style: normal bold

[Line: Lntestcr]
    Fields: sdf, sdf2, nf, nf1, fwf
    right field: snf, Qtyf, Amtf, amtf2
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: sdf: set as: $billdate
    local: field: nf: set as: $vouchernumber
    local: field: nf1: set as: $partyledgername
    local: field: fwf: set as: $parent
    local: field: snf: set as: $vouchertypename1
    Local: Field: amtf: Set As: $amount
    Local: Field: amtf2: Set As: $rcptvalue
    Local: Field: sdf2: Set As: $rcptvaluedate

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LntestcrTotals]
    use: Lntestcr
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf: set as: $$total:amtf

;===============================================================================
; End of T10.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
