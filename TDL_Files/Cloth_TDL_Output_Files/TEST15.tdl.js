// Auto-generated from TEST15.TXT
const tdl = `
;===============================================================================
; TEST15.TXT
; Created By: Khokan on 2021-09-03 17:27, ID:
; Purpose: Implements a custom Tally report "test15" for Sundry Debtors ledgers,
;          showing debit/credit balances, sales/credit note quantities, and totals,
;          with menu integration, filtering, and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: test15Lock ;; : @@test15DemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@test15Report: Display: Reptest15

[!menu: test15Lock]
    add: Item: before: @@locQuit: @@test15Report: Display: Reptest15
    add: Item: before: @@locQuit: Blank

[System: formula]
    test15Report: "test15"
;; test15DemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Reptest15]
    use: Dsp Template
    Title: @@test15Report
    Printset: Report Title: @@test15Report
    Form: Frmtest15
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate   : ##svcurrentdate
    Local: Button   : RelReports        : Inactive : Yes
    variable:str1
    set:str1:""

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmtest15]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0test15,Prttest15
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: test15botbrk,test15botOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    add:button:agentnetsalesbotton

[part: test15botBrk]
    line: EXPINV PageBreak
    border: thin top

[part: test15botopbrk]
    use: dspacctitles
    add: part: test15TitlePart

[part: test15TitlePart]
    line: Lntest15Title

[line: Lntest15CurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0test15]
    line : Lntest15CurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of ledger balances and sales/credit note quantities
;;------------------------------------------------------------------------------

[Part: Prttest15]
    Line: Lntest15Title,Lntest15
    bottom Line: Lntest15Totals
    repeat: Lntest15: Coltest15
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf,numf,numf2

;;------------------------------------------------------------------------------
;; DATA COLLECTION: Ledgers under Sundry Debtors with filters
;;------------------------------------------------------------------------------

[Collection: Coltest15]
    type:ledger
    child of:$$Groupsundrydebtors
    filter:Coltest15Filter,cwpartylednetsalesfilterxxxx

[system: Formula]
    ;; Filter: Only ledgers with non-empty debit or credit balances
    Coltest15Filter:not $$IsEmpty:$TBalDebits or not $$IsEmpty:$TBalCredits
    ;; Filter: If str1 is blank, show all; else filter by name
    cwpartylednetsalesfilterxxxx:if $$issysname:##str1 then yes else $name =##str1

;;------------------------------------------------------------------------------
;; SALES/CREDIT NOTE QUANTITY COLLECTIONS
;;------------------------------------------------------------------------------

[Collection:cwcrnote]
    source Collection: sourcwcrnote
    walk:inventoryentries
    by:partyledgername:$partyledgername
    aggr compute:billedqty:sum:$$number:$billedqty
    search key:$partyledgername

[Collection: sourcwcrnote]
    Type		: Vouchers	: VoucherType
    Child Of	: $$VchTypeCreditNote
    Belongs To	: Yes

[Collection: cwsalesnew]
    source Collection: sourcwsalesnew
    walk:inventoryentries
    by:partyledgername:$partyledgername
    aggr compute:billedqty:sum:$$number:$billedqty
    aggr compute:amount:sum:$amount
    aggr compute:amount1:sum:$$CollAmtTotal:inventoryentries:$amount
    search key:$partyledgername

[Collection: sourcwsalesnew]
    Type	   : Vouchers	: VoucherType
    Child Of   : $$VchTypesales
    Belongs To : Yes

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: Lntest15Title]
    use: Lntest15
    option: titleopt
    local:field: sdf: set as: "Date"
    local:field: nf: set as: "Name"
    local:field: fwf: set as: "Description"
    local:field: qtyf: set as: "cr qty"
    local:field: numf: set as: "sales qty"
    local:field: numf2: set as: "cr note qty"
    local:field: amtf: set as: "Value"
    local:field: ratepf : set as : "Rate"
    local: field: default : style: normal bold

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per ledger
;;------------------------------------------------------------------------------

[Line: Lntest15]
    Fields: sdf,nf,fwf
    right field: ratepf,Qtyf,Amtf,amtf2,numf,numf2
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local : field : sdf : set as : $date
    local : field : fwf : set as : $name
    local : field : nf : set as : $parent
    local : field : amtf : set as : $TBalDebits
    local : field : amtf2 : set as : $TBalCredits
    local : field : qtyf : set as : $StkOutQty
    local : field : numf : set as : $$reportobject:$$collectionfieldbykey:$billedqty:@@keycrnotenew2:Colt16
    local : field : numf2 : set as : $$reportobject:$$collectionfieldbykey:$billedqty:@@keycrnotenew2:cwcrnote
    Local: Field: default: Border: thin right

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: Lntest15Totals]
    use: Lntest15
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: fwf: set as: ""
    local: field: amtf : set as :  $$total:amtf
    local: field: numf : set as :  $$total:numf
    local: field: numf1 : set as :  $$total:numf
    local: field: numf2 : set as :  $$total:numf2

;===============================================================================
; End of TEST15.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
