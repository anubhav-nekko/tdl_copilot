// Auto-generated from TESTSALES.TXT
const tdl = `
;===============================================================================
; TESTSALES.TXT
; Created By: khokan on 2022-06-04 10:51, ID:
; Purpose: Implements a custom "testsales" report in Tally, showing party-wise
;          sales, credit note, and receipt values, with filtering and totals.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: testsalesLock ;; : @@testsalesDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@testsalesReport: Display: Reptestsales

[!menu: testsalesLock]
    add: Item: before: @@locQuit: @@testsalesReport: Display: Reptestsales
    add: Item: before: @@locQuit: Blank

[System: formula]
    testsalesReport: "testsales"
;; testsalesDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Reptestsales]
    use: Dsp Template
    Title: @@testsalesReport
    Printset: Report Title: @@testsalesReport
    Form: Frmtestsales
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate   : ##svcurrentdate
    Local: Button   : RelReports        : Inactive : Yes
    variable: str1, str2
    set: str1: ""
    set: str2: ""

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmtestsales]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0testsales, Prttestsales
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: testsalesbotbrk, testsalesbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add:button:allagentnetsalesbottonz

[part: testsalesbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: testsalesbotopbrk]
    use: dspacctitles
    add: part: testsalesTitlePart

[part: testsalesTitlePart]
    line: LntestsalesTitle

[line: LntestsalesCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0testsales]
    line : LntestsalesCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of party-wise sales, credit note, and receipt values
;;------------------------------------------------------------------------------

[Part: Prttestsales]
    Line: LntestsalesTitle, LntestsalesTitle2, Lntestsales
    bottom Line: LntestsalesTotals
    repeat: Lntestsales: Coltestsales
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, Qtyf2, amtf, amtf2, amtf3

[Collection: Coltestsales]
    source Collection: sourColtestsales
    by: partyledgername: $partyledgername
    by: vouchernumber1: $vouchernumber
    by: cwcaption1vch3: $..cwcaption3vch
    by: parent1: $parent:ledger:$partyledgername
    by: parent2: $grandparent:ledger:$partyledgername

    aggr compute: salesbilledqty: sum: if $$issales:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    compute: vouchertypename1: $vouchertypename
    compute: cwEnableNetSalesReport1: $cwEnableNetSalesReport:vouchertype:$vouchertypename
    aggr compute: salescrbilledqty: sum: if $$IsCreditNote:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
    aggr compute: salesamount: sum: if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute: salesinvamt1: sum: if $$issales:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    aggr compute: salescramount: sum: if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
    aggr compute: crnoteinvamt1: sum: if $$IsCreditNote:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"
    filter: cwGroupsundrydebtorsfilter, cwpartyledgernamefilter
    sort: @@default: $cwcaption1vch3

[Collection: sourColtestsales]
    Use: Vouchers of Company
    delete: filter : daybookfilter
    Filter: ColsalessrFilterx, IsNonOptionalCancelledVchs, ColallAGENTWISEnetsalesreportFilterx

[system: Formula]
    ColallAGENTWISEnetsalesreportFilterx: NOT $PARENT:LEDGER:$partyledgername = "Cash in Hand"
    ColsalessrFilterx: ($$issales:$vouchertypename or $$IsCreditNote:$vouchertypename) and @@cwEnableNetSalesReportx
    cwEnableNetSalesReportx: $cwEnableNetSalesReport:vouchertype:$vouchertypename = "yes"
    cwpartyledgernamefilter: if $$issysname:##str2 then yes else $partyledgername = ##str2

;;------------------------------------------------------------------------------
;; HEADER LINES: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LntestsalesTitle]
    use: Lntestsales
    option: titleopt
    local: field: nf: set as: "Name"
    local: field: fwf: set as: "Description"
    local: field: qtyf: set as: "Qty."
    local: field: qtyf2: set as: "Qty."
    local: field: amtf: set as: "sales Value"
    local: field: amtf2: set as: "cr noteValue"
    local: field: amtf3: set as: "receipt Value"
    local: field: default : style: normal bold

[Line: LntestsalesTitle2]
    use: Lntestsales
    Local: Field: nf: Set As: $$CollectionField:$cwcaption1vch3:First:Coltestsales

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per party
;;------------------------------------------------------------------------------

[Line: Lntestsales]
    field: fwf, nf, snf, snf2
    right field: qtyf, qtyf2, amtf, amtf2, amtf3

    local: field: snf: set as: $cwEnableNetSalesReport1
    local: field: snf2: set as: $vouchernumber1
    local: field: nf: set as: $vouchertypename1
    local: field: fwf: set as: $partyledgername
    local: field: qtyf: set as: $salesbilledqty
    local: field: qtyf2: set as: $salescrbilledqty
    local: field: amtf: set as: $salesamount
    local: field: amtf2: set as: $salescramount
    local: field: amtf3: set as: $$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:Colreceipt

;;------------------------------------------------------------------------------
;; EXPLODE LINE: (Optional, for area-wise grouping)
;;------------------------------------------------------------------------------

[part: expAREAWISEsalesRepx]
    line: expAREAWISEsalesRepx

[line: expAREAWISEsalesRepx]
    delete: explode
    use: Lntestsales
    local: field: nf: set as: $$nextobj:$cwcaption1vch3
    local: field: fwf: set as: ""
    local: field: qtyf: set as: ""
    local: field: qtyf2: set as: ""
    local: field: amtf: set as: ""
    local: field: amtf2: set as: ""
    local: field: amtf3: set as: ""

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LntestsalesTotals]
    use: Lntestsales
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: qtyf2: set as: $$total:qtyf2
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf
    local: field: amtf2 : set as :  $$total:amtf2
    local: field: amtf3 : set as :  $$total:amtf3

;;------------------------------------------------------------------------------
;; FILTER BUTTON: F7 filter popup for party selection
;;------------------------------------------------------------------------------

[button: allagentnetsalesbottonz]
    key: f7
    title: "Filter"
    Action : Modify Variables: allagentnetsalesbottonz

[report: allagentnetsalesbottonz]
    form: allagentnetsalesbottonz

[form: allagentnetsalesbottonz]
    part: allagentnetsalesbottonz
    HEIGHT: 20% PAGE
    WIDTH: 30% PAGE

[part: allagentnetsalesbottonz]
    line: cwtitlelinex, allagentnetsalesbottonz

[line: allagentnetsalesbottonz]
    field: sp, nf
    Local: Field: sp: Set As: @@cwcaption1tableundernew
    Local: Field: nf: modifies: str2
    space bottom: 0.5
    Local: field: sp: Width: 12
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf: table: collledp, Not Applicable
    Local: Field: nf: Show table: Always

[Collection: collledp]
    type: ledger

;===============================================================================
; End of TESTSALES.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
