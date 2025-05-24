// Auto-generated from ALLPARTYWISESALESRETURNREGISTER.TXT
const tdl = `
;===============================================================================
; ALLPARTYWISESALESRETURNREGISTER.TXT
; Created By: khokan on 2022-04-27 12:38, ID:
; Purpose: Provides an "All Party Wise Sales Return Register Report" in Tally,
;          showing sales return vouchers by party with item, date, quantity,
;          gross amount, transport, LR details, narration, area, and totals.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {27.Apr.22 15:17} add: Option: AllPartywisesalesReturnregisterreportLock ;; : @@AllPartywisesalesReturnregisterreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AllPartywisesalesReturnregisterreportReport: Display Collection: colllRepAllPartywisesalesReturnregisterreport
    add: Item: before: @@locQuit: @@AllPartywisesalesReturnregisterreportReport: Display: RepAllPartywisesalesReturnregisterreport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; COLLECTION: For menu selection and report trigger
;------------------------------------------------------------------------------

[Collection: colllRepAllPartywisesalesReturnregisterreport]
    Use         : Extract Alias Collection
    Source Collection : List of Ledgers
    Variable    : Ledger Name
    Report      : RepAllPartywisesalesReturnregisterreport
    Trigger     : LedgerName
    Fetch       : Name

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AllPartywisesalesReturnregisterreportReport: "All Party wise sales return register report"
;; AllPartywisesalesReturnregisterreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepAllPartywisesalesReturnregisterreport]
    use: Dsp Template
    Title: @@AllPartywisesalesReturnregisterreportReport
    Printset: Report Title: @@AllPartywisesalesReturnregisterreportReport
    Form: FrmAllPartywisesalesReturnregisterreport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str1, str2
    set: str1: ""
    set: str2: ""

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmAllPartywisesalesReturnregisterreport]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0AllPartywisesalesReturnregisterreport, PrtAllPartywisesalesReturnregisterreport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AllPartywisesalesReturnregisterreportbotbrk, AllPartywisesalesReturnregisterreportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[part: AllPartywisesalesReturnregisterreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AllPartywisesalesReturnregisterreportbotopbrk]
    use: dspacctitles
    add: part: AllPartywisesalesReturnregisterreportTitlePart

[part: AllPartywisesalesReturnregisterreportTitlePart]
    line: LnAllPartywisesalesReturnregisterreportTitle

[line: LnAllPartywisesalesReturnregisterreportCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: styleCalisto
    Local: Field: fwf2: Style: styleCalisto
    Local: Field: fwf: Set As: ""
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2: invisible: $$inprintmode

[part: PrtTitle0AllPartywisesalesReturnregisterreport]
    line : LnAllPartywisesalesReturnregisterreportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH SALES RETURN VOUCHER/PARTY
;------------------------------------------------------------------------------

[Part: PrtAllPartywisesalesReturnregisterreport]
    Line: LnAllPartywisesalesReturnregisterreportTitle, LnAllPartywisesalesReturnregisterreport
    bottom Line: LnAllPartywisesalesReturnregisterreportTotals
    repeat: LnAllPartywisesalesReturnregisterreport: ColAllPartywisesalesReturnregisterreport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

;------------------------------------------------------------------------------
; COLLECTION: Aggregates sales return by party, date, item, voucher, etc.
;------------------------------------------------------------------------------

[Collection: ColAllPartywisesalesReturnregisterreport]
    source Collection: sourceColAllPartywisesalesReturnregisterreport
    walk: inventoryentries
    by: partyledgername: $partyledgername
    by: date: $date
    by: vouchernumber: $vouchernumber
    by: stockitemname: $stockitemname
    aggr compute: billedqty: sum: $$CollAmtTotal:inventoryentries:$billedqty
    aggr compute: amount: sum: $amount
    aggr compute: amount1: sum: $$CollAmtTotal:inventoryentries:$amount
    compute: CWTEMPGSTEWAYTRANSPORTERNAME1: $..CWTEMPGSTEWAYTRANSPORTERNAME
    compute: BILLOFLADINGNO1: $BILLOFLADINGNO
    compute: BILLOFLADINGDATE1: $BILLOFLADINGDATE
    compute: narration1: $narration
    compute: BASICFINALDESTINATION1: $BASICFINALDESTINATION
    Compute: masterid: $masterid

[Collection: sourceColAllPartywisesalesReturnregisterreport]
    Type: Vouchers : VoucherType
    Child Of: $$VchTypeCreditNote
    Belongs To: Yes

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title Line
;------------------------------------------------------------------------------

[Line: LnAllPartywisesalesReturnregisterreportTitle]
    use: LnAllPartywisesalesReturnregisterreport
    option: titleopt
    local: field: snf: set as: "Invoice No."
    local: field: sdf: set as: "Date"
    local: field: fwf: set as: "Party & Booked To"
    local: field: nf: set as: "Transport"
    local: field: nf3: set as: "Stock Item"
    local: field: snf2: set as: "LR Number"
    local: field: sdf2: set as: "LR Date"
    local: field: nf2: set as: "Remarks / Narration"
    local: field: snf3: set as: "Area"
    local: field: qtyf: set as: "Pcs"
    local: field: ratepf: set as: "Rate"
    local: field: amtf: set as: "Gross Amt"
    local: field: snf: style: styleCalisto2
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: nf: style: styleCalisto2
    local: field: nf3: style: styleCalisto2
    local: field: snf2: style: styleCalisto2
    local: field: snf3: style: styleCalisto2
    local: field: sdf2: style: styleCalisto2
    local: field: nf2: style: styleCalisto2
    local: field: qtyf: style: styleCalisto2
    local: field: ratepf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    Local: field: fwf: indent: 10

;------------------------------------------------------------------------------
; MAIN DATA LINE: Sales return details per party/voucher/item
;------------------------------------------------------------------------------

[Line: LnAllPartywisesalesReturnregisterreport]
    Fields: snf, sdf, fwf
    right field: nf3, nf, snf2, sdf2, snf3, Qtyf, ratepf, Amtf
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: snf: set as: $vouchernumber
    local: field: sdf: set as: $date
    local: field: fwf: set as: if $$isempty:$BASICFINALDESTINATION1 then $Partyledgername else $Partyledgername + " & " + $BASICFINALDESTINATION1
    local: field: nf3: set as: $stockitemname
    local: field: nf: set as: $CWTEMPGSTEWAYTRANSPORTERNAME1
    local: field: snf2: set as: $BILLOFLADINGNO1
    local: field: snf3: set as: $cwledcity:ledger:$AllPartyledgername
    local: field: sdf2: set as: $BILLOFLADINGDATE1
    local: field: nf2: set as: $narration1
    local: field: qtyf: set as: IF $$LINE=1 THEN $billedqty else if $vouchernumber <> $$prevobj:$vouchernumber then $billedqty else ""
    local: field: ratepf: set as: #amtf/#qtyf
    local: field: amtf: set as: IF $$LINE=1 THEN $amount1 else if $vouchernumber <> $$prevobj:$vouchernumber then $amount1 else ""
    local: field: default: style: styleCalisto
    Local: Field: default: Border: thin right
    border: thin bottom
    Local: field: nf: Width: 20
    Local: field: nf3: Width: 30
    Local: field: sdf: Width: 6
    Local: field: sdf2: Width: 6
    Local: field: snf: Width: 12
    Local: field: snf2: Width: 8
    Local: field: snf3: Width: 7
    Local: field: ratepf: Width: 6
    Local: field: AMTF: Width: 8
    Local: field: qtyf: Width: 5

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnAllPartywisesalesReturnregisterreportTotals]
    use: LnAllPartywisesalesReturnregisterreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: amtf: set as: $$total:amtf
    local: field: snf: set as: ""
    local: field: sdf: set as: ""
    local: field: nf: set as: ""
    local: field: snf2: set as: ""
    local: field: sdf2: set as: ""
    local: field: nf2: set as: ""
    local: field: snf3: set as: ""
    local: field: ratepf: set as: ""
    local: field: snf: style: styleCalisto2
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: nf: style: styleCalisto2
    local: field: snf2: style: styleCalisto2
    local: field: snf3: style: styleCalisto2
    local: field: sdf2: style: styleCalisto2
    local: field: nf2: style: styleCalisto2
    local: field: qtyf: style: styleCalisto2
    local: field: ratepf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2


`;
export default tdl;
