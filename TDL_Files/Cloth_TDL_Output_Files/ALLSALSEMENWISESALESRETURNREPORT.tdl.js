// Auto-generated from ALLSALSEMENWISESALESRETURNREPORT.TXT
const tdl = `
;===============================================================================
; ALLSALESMANWISESALESRETURNREGITERREPORT.TXT
; Created By: khokan on 2022-04-28 13:33, ID:
; Purpose: Provides an "All Salesman Wise Sales Return Register Report" in Tally,
;          showing sales returns grouped by salesman/party with quantities and
;          gross amounts, including subtotals and totals.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {28.Apr.22 13:33}         add: Option: AllSALESMANWISEsalesReturnregiterreportLock ;; : @@AllSALESMANWISEsalesReturnregiterreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AllSALESMANWISEsalesReturnregiterreportReport: Display Collection: colllRepAllSALESMANWISEsalesReturnregiterreport

[!menu: AllSALESMANWISEsalesReturnregiterreportLock]
    add: Item: before: @@locQuit: @@AllSALESMANWISEsalesReturnregiterreportReport: Display: RepAllSALESMANWISEsalesReturnregiterreport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AllSALESMANWISEsalesReturnregiterreportReport: "All Salesman wise sales return register report"
;; AllSALESMANWISEsalesReturnregiterreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; COLLECTION: For menu selection and report trigger
;------------------------------------------------------------------------------

[Collection: colllRepAllSALESMANWISEsalesReturnregiterreport]
    Use         : Extract Alias Collection
    Source Collection : List of Ledgers
    Variable    : Ledger Name
    Report      : RepAllSALESMANWISEsalesReturnregiterreport
    Trigger     : cwLedgerName1
    Fetch       : Name

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepAllSALESMANWISEsalesReturnregiterreport]
    use: Dsp Template
    Title: @@AllSALESMANWISEsalesReturnregiterreportReport
    Printset: Report Title: @@AllSALESMANWISEsalesReturnregiterreportReport
    Form: FrmAllSALESMANWISEsalesReturnregiterreport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmAllSALESMANWISEsalesReturnregiterreport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0AllSALESMANWISEsalesReturnregiterreport,PrtAllSALESMANWISEsalesReturnregiterreport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AllSALESMANWISEsalesReturnregiterreportbotbrk,AllSALESMANWISEsalesReturnregiterreportbotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12

    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: AllSALESMANWISEsalesReturnregiterreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AllSALESMANWISEsalesReturnregiterreportbotopbrk]
    use: dspacctitles
    add: part: AllSALESMANWISEsalesReturnregiterreportTitlePart

[part: AllSALESMANWISEsalesReturnregiterreportTitlePart]
    line: LnAllSALESMANWISEsalesReturnregiterreportTitle

[line: LnAllSALESMANWISEsalesReturnregiterreportCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: styleCalisto
    Local: Field: fwf: Style: styleCalisto
    Local: Field: NF: Style: styleCalisto
    Local: Field: fwf: Set As: ##LedgerName
    Local: Field: nf: Set As: $$ReptField:Name:2:ledger:##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2: invisible: $$inprintmode

[part: PrtTitle0AllSALESMANWISEsalesReturnregiterreport]
    line : LnAllSALESMANWISEsalesReturnregiterreportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH SALESMAN/PARTY
;------------------------------------------------------------------------------

[Part: PrtAllSALESMANWISEsalesReturnregiterreport]
    Line: LnAllSALESMANWISEsalesReturnregiterreportTitle, LnAllSALESMANWISEsalesReturnregiterreportTitle1, LnAllSALESMANWISEsalesReturnregiterreport
    bottom Line: LnAllSALESMANWISEsalesReturnregiterreportTotals
    repeat: LnAllSALESMANWISEsalesReturnregiterreport: ColAllSALESMANWISEsalesReturnregiterreport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

;------------------------------------------------------------------------------
; COLLECTION: Aggregates sales return by salesman/party
;------------------------------------------------------------------------------

[Collection: ColAllSALESMANWISEsalesReturnregiterreport]
    source Collection: sourceColAllSALESMANWISEsalesReturnregiterreport
    by: partyledgername: $partyledgername
    by: cwcaption1vch2: $..cwcaption2vch
    aggr compute: billedqty: sum: $$CollAmtTotal:inventoryentries:$billedqty
    aggr compute: amount1: sum: $$CollAmtTotal:inventoryentries:$amount
    compute: CWTEMPGSTEWAYTRANSPORTERNAME1: $CWTEMPGSTEWAYTRANSPORTERNAME
    compute: BILLOFLADINGNO1: $BILLOFLADINGNO
    compute: BILLOFLADINGDATE1: $BILLOFLADINGDATE
    compute: narration1: $narration
    compute: BASICFINALDESTINATION1: $BASICFINALDESTINATION
    sort: @@default: $cwcaption1vch2
    filter: cwcaption1vch2fil

[Collection: sourceColAllSALESMANWISEsalesReturnregiterreport]
    Type	   : Vouchers	: VoucherType
    Child Of   : $$VchTypeCreditNote
    Belongs To : Yes
    filter: cwEnableSalesReturn

[system: Formula]
    cwcaption1vch2fil: not $$isempty:$cwcaption1vch2

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title and Sub-Title Lines
;------------------------------------------------------------------------------

[Line: LnAllSALESMANWISEsalesReturnregiterreportTitle1]
    use: LnAllSALESMANWISEsalesReturnregiterreport
    local: field: fwf: set as: $$CollectionField:$cwcaption1vch2:First:ColAllSALESMANWISEsalesReturnregiterreport
    local: field: qtyf: set as: ""
    local: field: amtf: set as: ""
    local: field: nf4: set as: ""
    local: field: fwf: style: styleCalistox2
    Local: field: snf: set as: $$ReptField:Name:2:COSTCENTRE:#fwf

[Line: LnAllSALESMANWISEsalesReturnregiterreportTitle]
    use: LnAllSALESMANWISEsalesReturnregiterreport
    option: titleopt
    local: field: SNF: set as: "Salesman/ Party"
    local: field: fwf: set as: ""
    local: field: qtyf: set as: "Pcs"
    local: field: amtf: set as: "Gr. Amt"
    local: field: nf4: set as: "Salesman"
    local: field: snf: style: styleCalisto2
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: nf: style: styleCalisto2
    local: field: nf3: style: styleCalisto2
    local: field: snf2: style: styleCalisto2
    local: field: snf3: style: styleCalisto2
    local: field: sdf2: style: styleCalisto2
    local: field: nf2: style: styleCalisto2
    local: field: nf4: style: styleCalisto2
    local: field: qtyf: style: styleCalisto2
    local: field: ratepf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    Local: field: fwf: indent: 10

;------------------------------------------------------------------------------
; MAIN DATA LINE: Sales return details per salesman/party
;------------------------------------------------------------------------------

[Line: LnAllSALESMANWISEsalesReturnregiterreport]
    Fields: SNF, fwf
    right field: Qtyf, Amtf, nf4, Qtyf2, Amtf2
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    Local: field: snf: set as: $$ReptField:Name:2:LEDGER:#fwf
    local: field: fwf: set as: $partyledgername
    local: field: qtyf: set as: $billedqty
    local: field: amtf: set as: $amount1
    local: field: nf4: set as: $cwcaption1vch2
    local: field: qtyf2: set as: if $$line=1 then #qtyf else if $cwcaption1vch2 <> $$prevobj:$cwcaption1vch2 then #qtyf else $$prevlinefield+#qtyf
    local: field: amtf2: set as: if $$line=1 then #amtf else if $cwcaption1vch2 <> $$prevobj:$cwcaption1vch2 then #amtf else $$prevlinefield+#amtf
    local: field: default: style: styleCalisto
    local: field: qtyf2: Invisible: yes
    local: field: amtf2: Invisible: yes
    local: field: nf4: Invisible: yes
    border: thin bottom

;------------------------------------------------------------------------------
; EXPLOSION PART: Subtotal and subtotal lines for salesman grouping
;------------------------------------------------------------------------------

add: explode: expSALESMANWISEsalesRetur: $$line = $$numitems or $cwcaption1vch2 <> $$nextobj:$cwcaption1vch2

[part: expSALESMANWISEsalesRetur]
    line: expSALESMANWISEsalesRetursubtotal, expSALESMANWISEsalesRetur

[line: expSALESMANWISEsalesRetur]
    use: LnAllSALESMANWISEsalesReturnregiterreport
    delete: explode
    local: field: fwf: set as: $$nextobj:$cwcaption1vch2
    local: field: nf: set as: ""
    Local: field: snf: set as: $$ReptField:Name:2:COSTCENTRE:#fwf
    local: field: qtyf: set as: ""
    local: field: amtf: set as: ""
    local: field: fwf: style: styleCalistox2
    delete: border: thin bottom

[line: expSALESMANWISEsalesRetursubtotal]
    use: LnAllSALESMANWISEsalesReturnregiterreport
    delete: explode
    local: field: fwf: align: right
    local: field: fwf: set as: "Salesman Total"
    local: field: nf: set as: ""
    local: field: qtyf: set as: #qtyf2
    local: field: amtf: set as: #amtf2
    local: field: qtyf2: set as: $$prevlinefield
    local: field: amtf2: set as: $$prevlinefield
    local: field: default: style: styleCalisto2
    Local: field: fwf: Align: Right
    delete: border: thin bottom

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnAllSALESMANWISEsalesReturnregiterreportTotals]
    use: LnAllSALESMANWISEsalesReturnregiterreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: fwf: set as: "Report Total"
    local: field: qtyf: set as: $$total:qtyf
    local: field: amtf: set as: $$total:amtf
    local: field: snf: style: styleCalisto2
    local: field: sdf: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: nf: style: styleCalisto2
    local: field: snf2: style: styleCalisto2
    local: field: snf3: style: styleCalisto2
    local: field: sdf2: style: styleCalisto2
    local: field: nf2: style: styleCalisto2
    local: field: nf2: style: styleCalisto2
    local: field: qtyf: style: styleCalisto2
    local: field: ratepf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2


`;
export default tdl;
