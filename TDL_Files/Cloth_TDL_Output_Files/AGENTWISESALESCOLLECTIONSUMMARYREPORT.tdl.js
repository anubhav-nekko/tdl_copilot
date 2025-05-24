// Auto-generated from AGENTWISESALESCOLLECTIONSUMMARYREPORT.TXT
const tdl = `
;===============================================================================
; AGENTWISESALESCOLLECTIONSUMMARYREPORT.TXT
; Created By: khokan on 2022-05-25 09:20, ID:
; Purpose: Provides an "Agent Wise Sales Collection Summary Report" in Tally,
;          showing sales, returns, credit/debit notes, net sales, and collection
;          values per agent, with filtering and aggregation features.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {11.Aug.22 16:15}         add: Option: agentwisesalescollectionsummaryreportLock ;; : @@agentwisesalescollectionsummaryreportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@agentwisesalescollectionsummaryreportReport: Display: Repagentwisesalescollectionsummaryreport

[!menu: agentwisesalescollectionsummaryreportLock]
    add: Item: before: @@locQuit: @@agentwisesalescollectionsummaryreportReport: Display: Repagentwisesalescollectionsummaryreport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    agentwisesalescollectionsummaryreportReport: "Agent wise sales collection summary report"
;; agentwisesalescollectionsummaryreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION: Agent Wise Sales Collection Summary Report
;------------------------------------------------------------------------------

[Report: Repagentwisesalescollectionsummaryreport]
    use: Dsp Template
    Title: @@agentwisesalescollectionsummaryreportReport
    Printset: Report Title: @@agentwisesalescollectionsummaryreportReport
    Form: Frmagentwisesalescollectionsummaryreport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str12
    set: str12: ""

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: Frmagentwisesalescollectionsummaryreport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0agentwisesalescollectionsummaryreport,Prtagentwisesalescollectionsummaryreport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: agentwisesalescollectionsummaryreportbotbrk,agentwisesalescollectionsummaryreportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12

    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

    add:button:agentsalesbotton2

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: agentwisesalescollectionsummaryreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: agentwisesalescollectionsummaryreportbotopbrk]
    use: dspacctitles
    add: part: agentwisesalescollectionsummaryreportTitlePart

[part: agentwisesalescollectionsummaryreportTitlePart]
    line: LnagentwisesalescollectionsummaryreportTitle

[line: LnagentwisesalescollectionsummaryreportCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0agentwisesalescollectionsummaryreport]
    line : LnagentwisesalescollectionsummaryreportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH AGENT
;------------------------------------------------------------------------------

[Part: Prtagentwisesalescollectionsummaryreport]
    Line: LnagentwisesalescollectionsummaryreportTitle,Lnagentwisesalescollectionsummaryreport
    bottom Line: LnagentwisesalescollectionsummaryreportTotals
    repeat: Lnagentwisesalescollectionsummaryreport: Colagentwisesalescollectionsummaryreport
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf,Qtyf1,Qtyf2,Qtyf3,Qtyf4,amtf,amtf1,amtf2,amtf3,amtf4,amtf5,amtf6,amtf7

;------------------------------------------------------------------------------
; COLLECTION: Agent-wise ledgers for summary report
;------------------------------------------------------------------------------

[Collection: Colagentwisesalescollectionsummaryreport]
    type: ledger
    ;; {11.Aug.22 10:52} child of:$$Groupsundrydebtors
    child of:@@cwcaption1tableundernew
    belongs to: yes
    filter: cwagentlednetsales1filterx
    fetch: cwcaption1item
    sort: @@default: $cwcaption1item

[Collection: Colagentwisesalescollectionsummaryreport2]
    type: ledger
    child of: $$Groupsundrydebtors
    fetch: cwcaption1item
    sort: @@default: $cwcaption1item
    filter: cwcaption1itemfilter, cwColpartyFilternew

[System: Formula]
    cwcaption1itemfilter: not $$isempty:$cwcaption1item
    cwColpartyFilternew: not $$IsEmpty:$TBalDebits or not $$IsEmpty:$TBalCredits
    cwagentlednetsales1filter: if $$issysname:##str12 then yes else $cwcaption1item1 =##str12
    cwagentlednetsales1filterx: if $$issysname:##str12 then yes else $name =##str12

;------------------------------------------------------------------------------
; SALES SUMMARY COLLECTIONS: Sales, Sales Return, Credit/Debit Note, Collection
;------------------------------------------------------------------------------

[Collection: Colagentwisesalessummary]
    source Collection: sourColagentwisesalessummary
    by: cwcaption1vch1: $cwcaption1vch
    aggr compute: billedqty: sum: $$CollqtyTotal:inventoryentries:$billedqty
    aggr compute: amount: sum: $$CollnumTotal:inventoryentries:$amount
    search key: $cwcaption1vch1

[Collection: sourColagentwisesalessummary]
    Type: Vouchers : VoucherType
    Child Of: $$VchTypesales
    Belongs To: Yes

[Collection: Colagentwisesalesreturnsummary]
    source Collection: sourColagentwisesalesreturnsummary
    by: cwcaption1vch1: $cwcaption1vch
    aggr compute: scrnbilledqty: sum: $$CollqtyTotal:inventoryentries:$billedqty
    aggr compute: scrnamount: sum: $$CollamtTotal:inventoryentries:$amount
    search key: $cwcaption1vch1

[Collection: sourColagentwisesalesreturnsummary]
    Type: Vouchers : VoucherType
    Child Of: $$VchTypeCreditNote
    Belongs To: Yes
    fetch: partyledgername

[Collection: Colagentwisesalesreturnsummary2]
    source Collection: sourColagentwisesalesreturnsummary
    by: cwcaption1vch1: $cwcaption1item:ledger:$partyledgername
    aggr compute: crnamount: sum: $$CollamtTotal:inventoryentries:$amount
    search key: $cwcaption1vch1

[Collection: ColagentwisedebitNotesummary]
    source Collection: sourColagentwisedebitNotesummary
    by: cwcaption1vch1: $cwcaption1item:ledger:$partyledgername
    aggr compute: drnamount: sum: $$CollamtTotal:inventoryentries:$amount
    search key: $cwcaption1vch1

[Collection: sourColagentwisedebitNotesummary]
    Type: Vouchers : VoucherType
    Child Of: $$VchTypedebitNote
    Belongs To: Yes
    fetch: partyledgername

[Collection: ColColreceiptagentsummary]
    source Collection: Colreceiptsou
    by: cwcaption1item1: $cwcaption1item:ledger:$partyledgername
    aggr compute: rcptvalue: sum: $amount
    sort: @@default: $cwcaption1item1
    search key: $cwcaption1item1

[Collection: Colreceiptagentwise]
    source Collection: sourColreceiptagentwise
    by: cwcaption1vch1: $cwcaption1item:ledger:$partyledgername
    aggr compute: rcptvalue: sum: $amount
    search key: $cwcaption1vch1

[Collection: sourColreceiptagentwise]
    Type: Vouchers : VoucherType
    Child Of: $$VchTypereceipt
    Belongs To: Yes

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title Line
;------------------------------------------------------------------------------

[Line: LnagentwisesalescollectionsummaryreportTitle]
    use: Lnagentwisesalescollectionsummaryreport
    option: titleopt
    local: field: fwf: set as: "Agent Name"
    local: field: amtf: set as: "Sales (Value)"
    local: field: qtyf: set as: "Sales (Pcs)"
    local: field: amtf2: set as: "Sales Return (Value)"
    local: field: qtyf2: set as: "Sales Return (Pcs)"
    local: field: amtf3: set as: "Credit Note(Value)"
    local: field: amtf4: set as: "Debit Note(Value)"
    local: field: amtf5: set as: "Net Sales (Value)"
    local: field: qtyf3: set as: "Net Sales (Pcs)"
    local: field: amtf6: set as: "Collection (Value)"
    local: field: default : style: normal bold
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    Local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    local: field: amtf2: style: styleCalisto2
    local: field: amtf3: style: styleCalisto2
    local: field: amtf4: style: styleCalisto2
    local: field: amtf5: style: styleCalisto2
    local: field: amtf6: style: styleCalisto2
    local: field: qtyf: style: styleCalisto2
    local: field: qtyf2: style: styleCalisto2
    local: field: qtyf3: style: styleCalisto2

;------------------------------------------------------------------------------
; MAIN DATA LINE: Agent sales, returns, notes, net sales, collection
;------------------------------------------------------------------------------

[Line: Lnagentwisesalescollectionsummaryreport]
    Fields: fwf
    right field: amtf, Qtyf, Amtf2, qtyf2, amtf3, amtf4, amtf5, qtyf3, amtf6
    Option: Alter on Enter
    local: field: ratepf : setas  : #amtf/#qtyf
    local: field: fwf: alter : voucher : $$isvoucher
    option: alter on enter
    local: field: fwf: alter : voucher : $$isvoucher
    local: field: fwf: set as: $name
    local: field: nf1: set as: ##str12
    local: field: amtf: set as: $$reportobject:$$collectionfieldbykey:$amount:@@keysales1:Colagentwisesalessummary
    local: field: qtyf: set as: $$reportobject:$$collectionfieldbykey:$billedqty:@@keysales1:Colagentwisesalessummary
    local: field: amtf2: set as: $$reportobject:$$collectionfieldbykey:$scrnamount:@@keysales1:Colagentwisesalesreturnsummary
    local: field: qtyf2: set as: $$reportobject:$$collectionfieldbykey:$scrnbilledqty:@@keysales1:Colagentwisesalesreturnsummary
    local: field: amtf3: set as: $$reportobject:$$collectionfieldbykey:$crnamount:@@keysales1:Colagentwisesalesreturnsummary2
    local: field: amtf4: set as: $$reportobject:$$collectionfieldbykey:$drnamount:@@keysales1:ColagentwisedebitNotesummary
    local: field: amtf5: set as: #amtf-#amtf2
    local: field: qtyf3: set as: #qtyf-#qtyf2
    local: field: amtf6: set as: $$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:ColColreceiptagentsummary
    Local: Field: qtyf10: Set As: if $$line=1 then #qtyf else $$prevlinefield+#qtyf
    Local: Field: default: Border: thin right
    local: field: default: style: styleCalisto

[System: Formula]
    keysales1: #fwf

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnagentwisesalescollectionsummaryreportTotals]
    use: Lnagentwisesalescollectionsummaryreport
    option: totalOpt
    local: field: fwf: set as: "Total"
    local: field: amtf: set as: $$total:amtf
    local: field: qtyf: set as: $$total:qtyf
    local: field: amtf2: set as: $$total:amtf2
    local: field: qtyf2: set as: $$total:qtyf2
    local: field: amtf3: set as: $$total:amtf3
    local: field: amtf4: set as: $$total:amtf4
    local: field: amtf5: set as: $$total:amtf5
    local: field: qtyf3: set as: $$total:qtyf3
    local: field: amtf6: set as: $$total:amtf6
    local: field: fwf: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    local: field: amtf2: style: styleCalisto2
    local: field: amtf3: style: styleCalisto2
    local: field: amtf4: style: styleCalisto2
    local: field: amtf5: style: styleCalisto2
    local: field: amtf6: style: styleCalisto2
    local: field: qtyf: style: styleCalisto2
    local: field: qtyf2: style: styleCalisto2
    local: field: qtyf3: style: styleCalisto2

;------------------------------------------------------------------------------
; FILTER BUTTON AND FILTER REPORT
;------------------------------------------------------------------------------

[button: agentsalesbotton2]
    key: f7
    title: "Filter"
    Action: Modify Variables: agentsalesbotton2

[report: agentsalesbotton2]
    form: agentsalesbotton2

[form: agentsalesbotton2]
    part: agentsalesbotton2
    HEIGHT: 20
    WIDTH: 30

[part: agentsalesbotton2]
    line: cwtitlelinex, agentsalesbotton2

[line: agentsalesbotton2]
    field: sp, nf
    Local: Field: sp: info: "Agent Name"
    Local: Field: sp: Set As: $cwcaption1:COMPANY:##SVCURRENTCOMPANY
    Local: Field: nf: modifies: str12
    Local: Field: default: Style: small
    Local: Field: nf: table: cwcaption1tableundercc, Not Applicable: $cwcaption1table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local: Field: nf: Show table: Always
    Local: Field: nf: Table: cwcaption1tableundersc, Not Applicable: $cwcaption1table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field: nf: Table: cwcaption1tableunderled, Not Applicable: $cwcaption1table:COMPANY:##SVCURRENTCOMPANY="ledger"
    Local: field: sp: Width: 20


`;
export default tdl;
