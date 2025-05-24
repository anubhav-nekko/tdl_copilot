// Auto-generated from TESTCOMPANY.TXT
const tdl = `
;===============================================================================
; TESTCOMPANY.TXT
; Created By: Khokan
; Purpose: Implements a custom report "testcompany" in Tally, demonstrating
;          company/group-wise sales aggregation, discounts, and advanced
;          reporting with professional formatting and menu integration.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: testcompanyLock ;; : @@testcompanyDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@testcompanyReport: Display: Reptestcompany

[!menu: testcompanyLock]
    add: Item: before: @@locQuit: @@testcompanyReport: Display: Reptestcompany
    add: Item: before: @@locQuit: Blank

[System: formula]
    testcompanyReport: "testcompany"
;; testcompanyDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Reptestcompany]
    use: Dsp Template
    Title: @@testcompanyReport
    Printset: Report Title: @@testcompanyReport
    Form: Frmtestcompany
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate   : ##svcurrentdate
    Local: Button   : RelReports        : Inactive : Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmtestcompany]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0testcompany, Prttestcompany
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: testcompanybotbrk, testcompanybotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[part: testcompanybotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: testcompanybotopbrk]
    use: dspacctitles
    add: part: testcompanyTitlePart

[part: testcompanyTitlePart]
    line: LntestcompanyTitle

[line: LntestcompanyCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0testcompany]
    line : LntestcompanyCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of company/group-wise sales and discount aggregation
;;------------------------------------------------------------------------------

[Part: Prttestcompany]
    Line: LntestcompanyTitle, Lntestcompany
    bottom Line: LntestcompanyTotals
    repeat: Lntestcompany: Coltestcompany
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf, amtf

[Collection: Coltestcompany]
    Collection: Coltestcompany2:myGrpCompany
    by:partyledgername:$partyledgername
    by:cwcaption1vch1:$cwcaption1vch1
    aggr compute:salesbilledqty:sum:@@cwsalesqty
    aggr compute:cwsalesdiscamt1x:sum:(@@cwsalesdiscamount2/@@cwinvamt)*@@cwsalesinvamt
    aggr compute:salesamount:sum:$amount
    compute : myCompany1 :$myCompany1
    search key :$myCompany1+$partyledgername+$cwcaption1vch1
    sort:@@default:$cwcaption1vch1

[System: Formula]
    cwIsNetSalesReportopt:$cwIsNetSalesReport:vouchertype:$vouchertypename="yes"
    cwsalesqty:$$FilterQtyTotal:inventoryentries:cwbaseunitsFilter2:$billedqty
    cwsalesinvamt:$$FilteramtTotal:inventoryentries:cwbaseunitsFilter2:$amount
    cwsalesdiscamount2:$$FilteramtTotal:ledgerentries:cwApprForfilter:$amount
    cwbaseunitsFilter2:$baseunits:stockitem:$stockitemname="pcs"
    cwApprForfilter:$AppropriateFor:ledger:$ledgername  = "GST"

[collection : myGrpCompany]
    Type	: Company
    Child Of:##svcurrentcompany
    compute : myCompany1 : $$LoopCollObj:$name

[Collection: Coltestcompany2]
    source Collection: sourColtestcompany
    by:partyledgername:$partyledgername
    by:cwcaption1vch1:$..cwcaption1vch
    by:parent1:$parent:ledger:$partyledgername
    by:parent2:$grandparent:ledger:$partyledgername
    aggr compute:salesbilledqty:sum:@@cwsalesqty
    aggr compute:cwsalesdiscamt1x:sum:(@@cwsalesdiscamount2/@@cwinvamt)*@@cwsalesinvamt
    aggr compute:salesamount:sum:$amount
    compute : myCompany1 :$$LoopCollObj:$name
    sort:@@default:$cwcaption1vch1

[Collection: sourColtestcompany]
    Type	   : Vouchers	: VoucherType
    Child Of   : $$VchTypesales
    Belongs To : Yes

[System: Formula]
    ColtestcompanyFilter:$$issales:$vouchertypename

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LntestcompanyTitle]
    use: Lntestcompany
    option: titleopt
    local:field: sdf: set as: "Date"
    local:field: nf: set as: "Name"
    local:field: fwf: set as: "Description"
    local:field: qtyf: set as: "Qty."
    local:field: amtf: set as: "Value"
    local:field: ratepf : set as : "Rate"
    local: field: default : style: normal bold

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per company/group
;;------------------------------------------------------------------------------

[Line: Lntestcompany]
    Fields:nf,nf2,fwf
    right field: ratepf,Qtyf,Amtf,Amtf1
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local : field : sdf : set as : $date
    local : field : fwf : set as :$myCompany1
    local : field : nf : set as :$partyledgername
    local : field : nf2 : set as :$cwcaption1vch1
    local : field : qtyf : set as :$salesbilledqty
    local : field : amtf : set as :$salesamount
    local : field : amtf1 : set as :$cwsalesdiscamt1x

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LntestcompanyTotals]
    use: Lntestcompany
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf

;===============================================================================
; End of TESTCOMPANY.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
