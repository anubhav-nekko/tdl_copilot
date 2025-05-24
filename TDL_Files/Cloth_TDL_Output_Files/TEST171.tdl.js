// Auto-generated from TEST171.TXT
const tdl = `
;===============================================================================
; TEST171.TXT
; Created By: Khokan
; Purpose: Implements a custom report "test1" in Tally, demonstrating
;          ledger collection, receipt aggregation, filtering, and report layout.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: test1Lock ;; : @@test1DemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@test1Report: Display: Reptest1

[!menu: test1Lock]
    add: Item: before: @@locQuit: @@test1Report: Display: Reptest1
    add: Item: before: @@locQuit: Blank

;;------------------------------------------------------------------------------
;; SYSTEM FORMULAS: Report title and demo lock condition
;;------------------------------------------------------------------------------

[System: formula]
    test1Report: "test1"
;; test1DemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Reptest1]
    use: Dsp Template
    Title: @@test1Report
    Printset: Report Title: @@test1Report
    Form: Frmtest1
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmtest1]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0test1, Prttest1
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: test1botbrk, test1botOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[part: test1botBrk]
    line: EXPINV PageBreak
    border: thin top

[part: test1botopbrk]
    use: dspacctitles
    add: part: test1TitlePart

[part: test1TitlePart]
    line: Lntest1Title

[line: Lntest1CurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0test1]
    line : Lntest1CurrPeriod

;;------------------------------------------------------------------------------
;; DATA COLLECTION: Ledger collection filtered by Sundry Debtors group and custom filter
;;------------------------------------------------------------------------------

[Collection: Coltest1]
    type: ledger
    child of: $$Groupsundrydebtors
    belongs to: yes
    filter: cwColpartynetFilter

[Collection: Coltest1rec]
    source Collection: sourColtest1rec
    by: partyledgername: $partyledgername
    aggr compute: amount: sum: $amount  ;;if $$isreceipt:$vouchertypename then $amount else $amount*-1
    search key: $partyledgername

[Collection: sourColtest1rec]
    Use: Vouchers of Company
    delete: filter : daybookfilter
    Filter: Coltest1Filter, IsNonOptionalCancelledVchs
    /*
    Type: Vouchers : VoucherType
    Child Of: $$VchTypepayment  ;;receipt
    Belongs To: Yes
    */

[System: Formula]
    Coltest1Filter: $$isreceipt:$vouchertypename or $$ispayment:$vouchertypename

;;------------------------------------------------------------------------------
;; REPORT LINES: Titles, data, and totals
;;------------------------------------------------------------------------------

[Line: Lntest1Title]
    use: Lntest1
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: nf: set as: "Name"
    local: field: fwf: set as: "Description"
    local: field: amtf: set as: "Value"
    local: field: ratepf : set as : "Rate"
    local: field: default : style: normal bold

[Line: Lntest1]
    Fields: fwf, fwf2
    right field: amtf
    Option: Alter on Enter
    local: field: qtyf : Format : "NoSymbol, Short Form, No Compact, NoZero"
    local: field: ratepf : setas : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local : field : fwf : set as : $name
    local : field : fwf2 : set as : $partyledgername
    Local: Field: amtf: Set As: $$reportobject:$$collectionfieldbykey:$amount:#fwf:Coltest1rec  ;; $$CollAmtTotal:cwcollrx:$rcptvalue

[Collection: cwcollrx]
    Collection: cwcollrAx
    Collection: cwcollrBx

[Collection: cwcollrAx]
    type: bills
    ;; child of:$name  ;;$partyledgername
    ;; ParmVar : svfromdate : date : ##varvchdate
    ;; ParmVar : svtodate : date : ##varvchdate
    compute: rcptvalue: $amount ;;$$FilterValue:$amount:ledgerentries:1:cwreceiptfilter

    FILTER: cwreceiptfilter

[Collection: cwcollrBx]
    USE: cwcollrAx
    cleared: yes

[System: Formula]
    cwreceiptfilter: $$isreceipt:$vouchertypename   ;;and $date <= ##varvchdate

[Line: Lntest1Totals]
    use: Lntest1
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf

;===============================================================================
; End of TEST171.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
