// Auto-generated from SUNDRYCREITORSOUTSANDING.TXT
const tdl = `
;===============================================================================
; SUNDRYCREITORSOUTSANDING.TXT
; Created By: khokan on 2022-05-16 16:35, ID:
; Purpose: Implements a "Sundry Creditors Outstanding" report in Tally,
;          showing all outstanding bills for suppliers under Sundry Creditors group,
;          with columns for date, reference, batch, party, pending amount, item,
;          bill age, and interest amount. Supports group selection and totals.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;; Optionally lock demo access by date if needed
    ;; add: Option: sundrycreitorsoutsandingLock ;; : @@sundrycreitorsoutsandingDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@sundrycreitorsoutsandingReport: Display Collection: collRepsundrycreitorsoutsanding
    add: Item: before: @@locQuit: Blank

[System: formula]
    sundrycreitorsoutsandingReport: "Sundry Creditors outsanding"
;; sundrycreitorsoutsandingDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; GROUP SELECTION: Popup for group selection (child of Sundry Creditors)
;;------------------------------------------------------------------------------

[Collection: collRepsundrycreitorsoutsanding]
    Use                : Extract Alias Collection
    Source Collection  : List of Groups
    Title              : $$LocaleString:"List of Groups"
    Collection         : Primary
    Variable           : Group Name
    Report             : Repsundrycreitorsoutsanding
    Trigger            : GroupNamexx
    Fetch              : Name, ReserveName, Parent

[Report: GroupNamexx]
    Use     : Collection Variable
    Local   : Line : Collection Variable : Field : GroupNamexx
    Local   : Field: MV Title            : Info  : $$LocaleString:"Name of Ledger"

[Field: GroupNamexx]
    Use         : Name Field
    Key         : Create group
    Modifies    : Group Name
    Table       : collsrLedgerNamex
    Show Table  : Always
    CommonTable : No

[collection: collsrLedgerNamex]
    type        : group
    Title       : $$LocaleString:"List of Groups"
    child of    : $$GroupSundryCreditors
    belongs to  : yes

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: Repsundrycreitorsoutsanding]
    use        : Dsp Template
    Title      : @@sundrycreitorsoutsandingReport
    Printset   : Report Title: @@sundrycreitorsoutsandingReport
    Form       : Frmsundrycreitorsoutsanding
    Export     : Yes
    set        : svTodate : ##svcurrentdate
    Local      : Button   : RelReports : Inactive : Yes

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: Frmsundrycreitorsoutsanding]
    use     : DSP Template
    Part    : DspAccTitles, PrtTitle0sundrycreitorsoutsanding, Prtsundrycreitorsoutsanding
    Width   : 100% Page
    Height  : 100% Page
    Background: @@SV_STOCKSUMMARY
    delete  : page break
    add     : page break: sundrycreitorsoutsandingbotbrk, sundrycreitorsoutsandingbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[part: sundrycreitorsoutsandingbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: sundrycreitorsoutsandingbotopbrk]
    use: dspacctitles
    add: part: sundrycreitorsoutsandingTitlePart

[part: sundrycreitorsoutsandingTitlePart]
    line: LnsundrycreitorsoutsandingTitle

[line: LnsundrycreitorsoutsandingCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf: Set As: "Group :"+" "+##GroupName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2:invisible: $$inprintmode
    local: field: fwf : style:styleCalisto2
    local: field: fwf2 : style:styleCalisto2

[part: PrtTitle0sundrycreitorsoutsanding]
    line : LnsundrycreitorsoutsandingCurrPeriod

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of outstanding bills for selected group
;;------------------------------------------------------------------------------

[Part: Prtsundrycreitorsoutsanding]
    Line: LnsundrycreitorsoutsandingTitle, Lnsundrycreitorsoutsanding
    bottom Line: LnsundrycreitorsoutsandingTotals
    repeat: Lnsundrycreitorsoutsanding: Colsundrycreitorsoutsanding
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf,amtf1,amtf2

[Collection: Colsundrycreitorsoutsanding]
    type: bills
    fetch: inventoryentries.ledgerentries.stockitemname
    filter: ColsundrycreitorsoutsandingFilter

[system: Formula]
    ;; Filter: Only bills belonging to selected Sundry Creditors group
    ColsundrycreitorsoutsandingFilter:$$isobjectbelongsto:group:($parent:ledger:$parent):##GroupName

;;------------------------------------------------------------------------------
;; HEADER LINE: Column titles for the report
;;------------------------------------------------------------------------------

[Line: LnsundrycreitorsoutsandingTitle]
    use: Lnsundrycreitorsoutsanding
    option: titleopt
    local:field: sdf: set as: "Date"
    local:field: snf1 : set as: "Ref. No."
    local:field: nf: set as: "Batch No."
    local:field: fwf: set as: "Party's Name"
    local:field: amtf: set as: "Pending Amount"
    local:field: nf2: set as: "Item Name"
    local:field: snf: set as: "Age of Bill In Days"
    local:field: amtf2: set as: "Int Amt"
    local: field: sdf : style:styleCalisto2
    local: field: snf : style:styleCalisto2
    local: field: snf1 : style:styleCalisto2
    local: field: nf : style:styleCalisto2
    local: field: nf2 : style:styleCalisto2
    local: field: fwf : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2
    Local: field: default: Align:centre
    Local: field: fwf: Align:left

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per bill
;;------------------------------------------------------------------------------

[Line: Lnsundrycreitorsoutsanding]
    Fields: sdf, snf1, nf, fwf
    right field: amtf, nf2, snf, amtf2
    Option: Alter on Enter
    Local: Field: nf1: Set As: $parent:ledger:$parent
    Local: Field: nf3: Set As: $parent:group:#nf1
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    local:field: sdf: set as: $billdate
    local:field: snf1: set as: $name
    local:field: nf: set as: $$CollectionField:($$CollectionField:$batchname:First:inventoryentries):First:ledgerentries
    local:field: fwf: set as: $parent
    local:field: amtf: set as: $closingbalance
    local:field: nf2: set as: $$CollectionField:($$CollectionField:$stockitemname:First:inventoryentries):First:ledgerentries
    local:field: snf: set as: @@DSPToDate - $BillDate
    local:field: amtf2: set as: $$CollectionField:($$CollectionField:$amount:First:inventoryentries):First:ledgerentries
    Local: Field: default: Border: thin right
    local: field: default : style:styleCalisto

;;------------------------------------------------------------------------------
;; TOTALS LINE: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnsundrycreitorsoutsandingTotals]
    use: Lnsundrycreitorsoutsanding
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local:field: sdf: set as: ""
    local:field: nf: set as: ""
    local:field: fwf: set as: "Total"
    local:field: amtf: set as: $$total:amtf
    local:field: nf2: set as: ""
    local:field: snf: set as: ""
    local:field: amtf2: set as: $$total:amtf2
    local: field: sdf : style:styleCalisto2
    local: field: nf : style:styleCalisto2
    local: field: snf1 : style:styleCalisto2
    local: field: snf : style:styleCalisto2
    local: field: nf2 : style:styleCalisto2
    local: field: fwf : style:styleCalisto2
    local: field: amtf : style:styleCalisto2
    local: field: amtf2 : style:styleCalisto2

;===============================================================================
; End of SUNDRYCREITORSOUTSANDING.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
