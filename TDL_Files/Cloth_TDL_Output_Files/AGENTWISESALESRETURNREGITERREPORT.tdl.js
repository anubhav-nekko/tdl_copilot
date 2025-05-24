// Auto-generated from AGENTWISESALESRETURNREGITERREPORT.TXT
const tdl = `
;===============================================================================
; AGENTWISESALESRETURNREGITERREPORT.TXT
; Created By: khokan on 2022-04-27 12:46, ID:
; Purpose: Provides an "Agent Wise Sales Return Register Report" in Tally,
;          showing sales returns grouped by agent/party with quantities and
;          gross amounts, including subtotals and totals.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {29.Apr.22 09:59}         add: Option: AGENTWISEsalesReturnregiterreportLock ;; : @@AGENTWISEsalesReturnregiterreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AGENTWISEsalesReturnregiterreportReport: Display Collection: colllRepAGENTWISEsalesReturnregiterreport

[!menu: AGENTWISEsalesReturnregiterreportLock]
    add: Item: before: @@locQuit: @@AGENTWISEsalesReturnregiterreportReport: Display Collection: colllRepAGENTWISEsalesReturnregiterreport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AGENTWISEsalesReturnregiterreportReport:@@cwcaption1tableundernew+" "+"wise sales return register report"
;; AGENTWISEsalesReturnregiterreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; COLLECTION: For report selection (by ledger/agent)
;------------------------------------------------------------------------------

[Collection: colllRepAGENTWISEsalesReturnregiterreport]
    Use         : Extract Alias Collection
    Source Collection : List of Ledgers
    Variable    : Ledger Name
    Report      : RepAGENTWISEsalesReturnregiterreport
    Trigger     : cwLedgerName1
    Fetch       : Name

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepAGENTWISEsalesReturnregiterreport]
    use: Dsp Template
    Title: @@AGENTWISEsalesReturnregiterreportReport
    Printset: Report Title: @@AGENTWISEsalesReturnregiterreportReport
    Form: FrmAGENTWISEsalesReturnregiterreport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmAGENTWISEsalesReturnregiterreport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0AGENTWISEsalesReturnregiterreport,PrtAGENTWISEsalesReturnregiterreport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AGENTWISEsalesReturnregiterreportbotbrk,AGENTWISEsalesReturnregiterreportbotOpbrk
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

[part: AGENTWISEsalesReturnregiterreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AGENTWISEsalesReturnregiterreportbotopbrk]
    use: dspacctitles
    add: part: AGENTWISEsalesReturnregiterreportTitlePart

[part: AGENTWISEsalesReturnregiterreportTitlePart]
    line: LnAGENTWISEsalesReturnregiterreportTitle

[line: LnAGENTWISEsalesReturnregiterreportCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style:styleCalisto
    Local: Field: fwf: Style:styleCalisto
    Local: Field: NF: Style:styleCalisto
    Local: Field: fwf: Set As:##LedgerName
    Local: Field: nf: Set As:$$ReptField:Name:2:ledger:##LedgerName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2:invisible: $$inprintmode

[part: PrtTitle0AGENTWISEsalesReturnregiterreport]
    line : LnAGENTWISEsalesReturnregiterreportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH AGENT/PARTY
;------------------------------------------------------------------------------

[Part: PrtAGENTWISEsalesReturnregiterreport]
    Line: LnAGENTWISEsalesReturnregiterreportTitle,LnAGENTWISEsalesReturnregiterreport
    bottom Line: LnAGENTWISEsalesReturnregiterreportTotals
    repeat: LnAGENTWISEsalesReturnregiterreport: ColAGENTWISEsalesReturnregiterreport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf,amtf

;------------------------------------------------------------------------------
; COLLECTION: Aggregates sales return by agent/party
;------------------------------------------------------------------------------

[Collection: ColAGENTWISEsalesReturnregiterreport]
    source Collection: sourceColAGENTWISEsalesReturnregiterreport
    by:partyledgername:$partyledgername
    by:cwcaption1vch1:$..cwcaption1vch
    aggr compute:billedqty:sum:$$CollAmtTotal:inventoryentries:$billedqty
    aggr compute:amount1:sum:$$CollAmtTotal:inventoryentries:$amount
    compute:CWTEMPGSTEWAYTRANSPORTERNAME1:$CWTEMPGSTEWAYTRANSPORTERNAME
    compute:BILLOFLADINGNO1:$BILLOFLADINGNO
    compute:BILLOFLADINGDATE1:$BILLOFLADINGDATE
    compute:narration1:$narration
    compute:BASICFINALDESTINATION1:$BASICFINALDESTINATION
    filter:ColAGENTWISEsalesReturnregiterreportFilter

[Collection: sourceColAGENTWISEsalesReturnregiterreport]
    Type	   : Vouchers	: VoucherType
    Child Of   : $$VchTypeCreditNote
    Belongs To : Yes
    filter:cwEnableSalesReturn

[system: Formula]
    ColAGENTWISEsalesReturnregiterreportFilter:$cwcaption1vch1=##LedgerName
    cwEnableSalesReturn:$cwEnableSalesReturn:vouchertype:$vouchertypename="yes"

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title Line
;------------------------------------------------------------------------------

[Line: LnAGENTWISEsalesReturnregiterreportTitle]
    use: LnAGENTWISEsalesReturnregiterreport
    option: titleopt
    local:field: SNF: set as:"Agent/ Party"
    local:field: fwf: set as:""
    local:field: qtyf: set as: "Pcs"
    local:field: amtf: set as: "Gr. Amt"
    local:field: nf4: set as:"Agent"
    local:field: default: Align:centre
    local:field: fwf: Align:left
    local:field: fwf:indent:10
    local:field: snf: style:styleCalisto2
    local:field: fwf: style:styleCalisto2
    local:field: qtyf: style:styleCalisto2
    local:field: amtf: style:styleCalisto2

;------------------------------------------------------------------------------
; MAIN DATA LINE: Sales return details per agent/party
;------------------------------------------------------------------------------

[Line: LnAGENTWISEsalesReturnregiterreport]
    Fields: SNF,fwf
    right field:Qtyf,Amtf,nf4,Qtyf2,Amtf2
    Option: Alter on Enter
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact,NoZero"
    local:field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option : alter on enter
    local : field : fwf : alter : voucher : $$isvoucher
    Local:field: snf: set as:$$ReptField:Name:2:LEDGER:#fwf
    local:field: fwf: set as:$partyledgername
    local:field: qtyf: set as:$billedqty
    local:field: amtf: set as:$amount1
    local:field: nf4: set as:$cwcaption1vch1
    local:field: qtyf2: set as:if $$line=1 then #qtyf else if $cwcaption1vch1 <> $$prevobj:$cwcaption1vch1 then #qtyf else $$prevlinefield+#qtyf
    local:field: amtf2: set as:if $$line=1 then #amtf else if $cwcaption1vch1 <> $$prevobj:$cwcaption1vch1 then #amtf else $$prevlinefield+#amtf
    local:field: qtyf2: Invisible: yes
    local:field: amtf2: Invisible: yes
    local:field: nf4: Invisible: yes
    local:field: default:style:styleCalisto
    border:thin bottom

;------------------------------------------------------------------------------
; (Optional) Subtotal and subtotal lines for agent grouping (commented logic)
;------------------------------------------------------------------------------

;; {29.Apr.22 09:58}   add:explode:expAgentWISEsalesRetur1:$$line = $$numitems or $cwcaption1vch1 <> $$nextobj:$cwcaption1vch1

[part:expAgentWISEsalesRetur1]
    line:expAgentWISEsalesRetursubtotal1,expAgentWISEsalesRetur1

[line:expAgentWISEsalesRetur1]
    use: LnAGENTWISEsalesReturnregiterreport
    delete:explode
    local:field: fwf: set as:$$nextobj:$cwcaption1vch1
    local:field: nf: set as:""
    Local:field: snf: set as:$$ReptField:Name:2:COSTCENTRE:#fwf
    local:field: qtyf: set as:""
    local:field: amtf: set as:""
    local:field: default:style:styleCalisto2
    delete:border:thin bottom

[line: expAgentWISEsalesRetursubtotal1]
    use: LnAGENTWISEsalesReturnregiterreport
    delete:explode
    local: field: fwf: align: right
    local:field: fwf: set as:"Agent Total"
    local:field: nf: set as:""
    local:field: qtyf: set as:#qtyf2
    local:field: amtf: set as:#amtf2
    local:field: qtyf2: set as:$$prevlinefield
    local:field: amtf2: set as:$$prevlinefield
    local:field: default:style:styleCalisto2
    Local: field: fwf: Align: Right
    delete:border:thin bottom

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnAGENTWISEsalesReturnregiterreportTotals]
    use: LnAGENTWISEsalesReturnregiterreport
    option: totalOpt
    local: field: fwf: align: right
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: amtf : set as :  $$total:amtf
    local:field: snf: set as:""
    local:field: sdf: set as:""
    local:field: nf: set as:""
    local:field: snf2: set as:""
    local:field: sdf2: set as:""
    local:field: nf2: set as:""
    local:field: nf3: set as:""
    local:field: ratepf : set as :""
    local:field: snf: style:styleCalisto2
    local:field: sdf:style:styleCalisto2
    local:field: fwf: style:styleCalisto2
    local:field: nf:style:styleCalisto2
    local:field: snf2: style:styleCalisto2
    local:field: snf3: style:styleCalisto2
    local:field: sdf2:style:styleCalisto2
    local:field: nf2:style:styleCalisto2
    local:field: qtyf: style:styleCalisto2
    local:field: ratepf :style:styleCalisto2
    local:field: amtf:style:styleCalisto2


`;
export default tdl;
