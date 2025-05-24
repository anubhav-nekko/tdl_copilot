// Auto-generated from ALLAGENTWISENETSALESREPORTNEW.TXT
const tdl = `
;===============================================================================
; ALLAGENTWISENETSALESREPORTNEW.TXT
; Created By: Khokan on 2022-08-05 10:29, ID:
; Purpose: Provides an "All Agent Wise Net Sales Report" in Tally, showing
;          net sales, sales returns, collections, and related metrics
;          per party/agent, with filtering and aggregation features.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {05.Aug.22 11:40}         add: Option: allAGENTWISEnetsalesreportnewLock ;; : @@allAGENTWISEnetsalesreportnewDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@allAGENTWISEnetsalesreportnewReport: Display: RepallAGENTWISEnetsalesreportnew
[!menu: allAGENTWISEnetsalesreportnewLock]
    add: Item: before: @@locQuit: @@allAGENTWISEnetsalesreportnewReport: Display: RepallAGENTWISEnetsalesreportnew
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    allAGENTWISEnetsalesreportnewReport: "All " + @@cwcaption1tableundernew + " wise net sales report"
;; allAGENTWISEnetsalesreportnewDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION: All Agent Wise Net Sales Report
;------------------------------------------------------------------------------

[Report: RepallAGENTWISEnetsalesreportnew]
    use: Dsp Template
    Title: @@allAGENTWISEnetsalesreportnewReport
    Printset: Report Title: @@allAGENTWISEnetsalesreportnewReport
    Form: FrmallAGENTWISEnetsalesreportnew
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

[Form: FrmallAGENTWISEnetsalesreportnew]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0allAGENTWISEnetsalesreportnew,PrtallAGENTWISEnetsalesreportnew
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: allAGENTWISEnetsalesreportnewbotbrk,allAGENTWISEnetsalesreportnewbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    add: button: allagentnetsalesbotton

    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: allAGENTWISEnetsalesreportnewbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: allAGENTWISEnetsalesreportnewbotopbrk]
    use: dspacctitles
    add: part: allAGENTWISEnetsalesreportnewTitlePart

[part: allAGENTWISEnetsalesreportnewTitlePart]
    line: LnallAGENTWISEnetsalesreportnewTitle, LnallAGENTWISEnetsalesreportnewTitle2

[line: LnallAGENTWISEnetsalesreportnewCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    invisible: $$inprintmode

[part: PrtTitle0allAGENTWISEnetsalesreportnew]
    line : LnallAGENTWISEnetsalesreportnewCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH PARTY/AGENT
;------------------------------------------------------------------------------

[Part: PrtallAGENTWISEnetsalesreportnew]
    Line: LnallAGENTWISEnetsalesreportnewTitle, LnallAGENTWISEnetsalesreportnewTitle2, expAgentWISEsalesRepnew2, LnallAGENTWISEnetsalesreportnew
    bottom Line: LnallAGENTWISEnetsalesreportnewTotals
    repeat: LnallAGENTWISEnetsalesreportnew: ColallAGENTWISEnetsalesreportnew
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, amtf1, amtf2, amtf3, amtf4, amtf5, numf, numf1, numf2, numf3, numf4, amtf20, amtf16

;------------------------------------------------------------------------------
; COLLECTION: Ledgers under Sundry Debtors with filters
;------------------------------------------------------------------------------

[Collection: ColallAGENTWISEnetsalesreportnew]
    type: ledger
    child of: $$Groupsundrydebtors
    belongs to: yes
    filter: cwColpartyFilter
    filter: CwallNEWpartyfilter2, CwallAGENTpartyfilter2
    fetch: cwcaption1item
    sort: @@default: $cwcaption1item

[system: Formula]
    ColallAGENTWISEnetsalesreportnewFilter: Yes
    CwallNEWpartyfilter2: if $$issysname:##str1 then yes else $name = ##str1
    CwallAGENTpartyfilter2: if $$issysname:##str2 then yes else $cwcaption1item = ##str2

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main and secondary title lines
;------------------------------------------------------------------------------

[Line: LnallAGENTWISEnetsalesreportnewTitle]
    use: LnallAGENTWISEnetsalesreportnew
    option: titleopt
    local: field: fwf: set as: "Party Name"
    local: field: grsales: set as: "Net Sales"
    local: field: grSRIN: set as: "Net Sals Return"
    local: field: snetsales: set as: "S.Net Sales "
    local: field: numf3: set as: "Net Sales"
    local: field: amtf3: set as: "Gross Sale Less Gross Sales Return"
    local: field: amtf4: set as: "Net Sale Without Gst"
    local: field: amtf5: set as: "Colleection"
    local: field: default : style: normal bold
    local: field: grSRIN: Align: centre
    local: field: grsales: Align: centre
    local: field: snetsales: Align: centre
    local: field: default: Align: centre
    local: field: grsales: cells: 2
    local: field: grSRIN: cells: 2
    local: field: snetsales: cells: 2
    Local: field: snf: Align: left
    Local: field: fwf: Align: left
    Local: field: nf: Align: left
    Local: field: default: Lines: 0
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    local: field: grsales : style: styleCalisto2
    local: field: grSRIN : style: styleCalisto2
    local: field: snetsales : style: styleCalisto2
    local: field: fwf : style: styleCalisto2
    local: field: numf : style: styleCalisto2
    local: field: snf2 : style: styleCalisto2
    local: field: numf1 : style: styleCalisto2
    local: field: numf2 : style: styleCalisto2
    local: field: numf3 : style: styleCalisto2
    local: field: amtf : style: styleCalisto2
    local: field: amtf1 : style: styleCalisto2
    local: field: amtf2 : style: styleCalisto2
    local: field: amtf3 : style: styleCalisto2
    local: field: amtf4 : style: styleCalisto2
    local: field: amtf5 : style: styleCalisto2

[Line: LnallAGENTWISEnetsalesreportnewTitle2]
    use: LnallAGENTWISEnetsalesreportnew
    option: titleopt
    local: field: fwf: set as: ""
    local: field: numf: set as: "Pcs"
    local: field: numf2: set as: "Pcs"
    local: field: amtf: set as: "Amount"
    local: field: amtf2: set as: "Amount"
    local: field: numf3: set as: "Pcs"
    local: field: amtf3: set as: "Amount"
    local: field: amtf4: set as: "Amount"
    local: field: amtf5: set as: "Amount"
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    local: field: grsales : style: styleCalisto2
    local: field: grSRIN : style: styleCalisto2
    local: field: fwf : style: styleCalisto2
    local: field: nf : style: styleCalisto2
    local: field: numf : style: styleCalisto2
    local: field: numf1 : style: styleCalisto2
    local: field: numf2 : style: styleCalisto2
    local: field: numf3 : style: styleCalisto2
    local: field: amtf : style: styleCalisto2
    local: field: amtf1 : style: styleCalisto2
    local: field: amtf2 : style: styleCalisto2
    local: field: amtf3 : style: styleCalisto2
    local: field: amtf4 : style: styleCalisto2
    local: field: amtf5 : style: styleCalisto2

;------------------------------------------------------------------------------
; MAIN DATA LINE: Party/agent net sales, returns, collections, etc.
;------------------------------------------------------------------------------

[Line: LnallAGENTWISEnetsalesreportnew]
    Fields: fwf
    right field: nf, grsales, grSRIN, snetsales, amtf6, amtf4, amtf5, amtf7, amtf8, amtf9, amtf10, numf7, numf8, amtf12, amtf13, amtf14, amtf15
    Option: Alter on Enter

    Local: Field: nf9: Set As: $cwcaption1item
    local: field: fwf: set as: $name
    local: field: nf: set as: $cwcaption1vch1
    local: field: numf: set as: $$reportobject:$$collectionfieldbykey:$salesbilledqty:#fwf:ColallPartywisenetsalesreport
    local: field: numf2: set as: $$reportobject:$$collectionfieldbykey:$salescrbilledqty:#fwf:ColallPartywisenetsalesreport
    local: field: amtf: set as: $$nettamount:#amtf12:#amtf13
    local: field: amtf12: set as: $$nettamount:@@salesinvamt1valueall:@@cwsalesdiscamt1xall
    local: field: amtf13: set as: (#amtf12*5)/100
    local: field: amtf14: set as: $$nettamount:@@crnoteinvamt1all:@@cwcrnotediscamt1all
    local: field: amtf15: set as: (#amtf14*5)/100
    local: field: amtf2: set as: $$nettamount:#amtf14:#amtf15
    local: field: numf3: set as: #numf-#numf2
    local: field: amtf3: set as: #amtf-#amtf2
    local: field: amtf4: set as: #amtf3-#amtf6
    local: field: amtf6: set as: (#amtf3*5)/100
    local: field: amtf5: set as: $$reportobject:$$collectionfieldbykey:$rcptvalue:#fwf:Colreceipt
    local: field: amtf16: set as: @@cwnetreceipt
    local: field: amtf20: set as: @@cwnetpayment

    local: field: numf7: set as: if $$line=1 then #numf else $$prevlinefield+#numf
    local: field: numf8: set as: if $$line=1 then #numf2 else $$prevlinefield+#numf2
    local: field: amtf7: set as: if $$line=1 then #amtf else $$prevlinefield+#amtf
    local: field: amtf8: set as: if $$line=1 then #amtf2 else $$prevlinefield+#amtf2
    local: field: amtf9: set as: if $$line=1 then #amtf3 else $$prevlinefield+#amtf3
    local: field: amtf10: set as: if $$line=1 then #amtf4 else $$prevlinefield+#amtf4
    local: field: qtyf10: set as: if $$line=1 then #qtyf else $$prevlinefield+#qtyf

    local: field: amtf6: Invisible: yes
    local: field: amtf12: Invisible: yes
    local: field: amtf13: Invisible: yes
    local: field: amtf14: Invisible: yes
    local: field: amtf15: Invisible: yes
    local: field: amtf7: Invisible: yes
    local: field: NUMF7: Invisible: yes
    local: field: NUMF8: Invisible: yes
    local: field: amtf8: Invisible: yes
    local: field: amtf16: Invisible: yes
    local: field: amtf20: Invisible: yes
    local: field: amtf9: Invisible: yes
    local: field: amtf10: Invisible: yes
    Local: field: default: Border: thin right
    local: field: nf: Invisible: yes

    Local: field: numf: Width: 7
    Local: field: numf2: Width: 7
    Local: field: numf3: Width: 7
    Local: field: amtf: Width: 10
    Local: field: amtf2: Width: 10
    Local: field: amtf3: Width: 10
    Local: field: nf: Width: 30
    border: thin bottom

;------------------------------------------------------------------------------
; EXPLODE LINES FOR GROUPING (e.g., by agent/area)
;------------------------------------------------------------------------------

add: explode: expAgentWISEsalesRepnew: $$line = $$numitems or $cwcaption1item <> $$nextobj:$cwcaption1item

[line: expAgentWISEsalesRepnew2]
    use: LnallAGENTWISEnetsalesreportnew
    local: field: fwf: set as: $$CollectionField:$cwcaption1item:First:ColallAGENTWISEnetsalesreportnew
    local: field: nf: set as: ""
    Local: Field: NUMF: Set As: ""
    Local: Field: NUMF1: Set As: ""
    Local: Field: NUMF2: Set As: ""
    Local: Field: NUMF3: Set As: ""
    Local: Field: AMTF: Set As: ""
    Local: Field: AMTF1: Set As: ""
    Local: Field: AMTF2: Set As: ""
    Local: Field: AMTF3: Set As: ""
    Local: Field: AMTF4: Set As: ""
    Local: Field: AMTF5: Set As: ""
    local: field: default: style: styleCalistox2

[part: expAgentWISEsalesRepnew]
    line: expAgentWISEsalesRepnew

[line: expAgentWISEsalesRepnew]
    use: LnallAGENTWISEnetsalesreportnew
    delete: explode: expAgentWISEsalesRepnew
    local: field: fwf: set as: $$nextobj:$cwcaption1item
    local: field: nf: set as: ""
    Local: Field: NUMF: Set As: ""
    Local: Field: NUMF1: Set As: ""
    Local: Field: NUMF2: Set As: ""
    Local: Field: NUMF3: Set As: ""
    Local: Field: AMTF: Set As: ""
    Local: Field: AMTF1: Set As: ""
    Local: Field: AMTF2: Set As: ""
    Local: Field: AMTF3: Set As: ""
    Local: Field: AMTF4: Set As: ""
    Local: Field: AMTF5: Set As: ""
    local: field: default: style: styleCalistox2
    delete: border: thin bottom

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnallAGENTWISEnetsalesreportnewTotals]
    use: LnallAGENTWISEnetsalesreportnew
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: numf: set as: $$total:numf
    local: field: numf2: set as: $$total:numf2
    local: field: amtf: set as: #amtf7
    local: field: amtf20: set as: $$total:amtf20
    local: field: amtf16: set as: $$total:amtf16
    local: field: amtf2: set as: #amtf8
    local: field: numf3: set as: $$total:numf3
    local: field: amtf3: set as: #amtf9
    local: field: amtf4: set as: #amtf10
    local: field: amtf5: set as: $$ABS:$$total:amtf5
    local: field: amtf6: set as: $$total:amtf6
    local: field: amtf7: set as: $$prevlinefield
    local: field: amtf8: set as: $$prevlinefield
    local: field: amtf9: set as: $$prevlinefield
    local: field: amtf10: set as: $$prevlinefield
    local: field: amtf11: set as: $$prevlinefield
    local: field: numf7: set as: $$prevlinefield
    local: field: numf8: set as: $$prevlinefield
    local: field: qtyf10: set as: $$prevlinefield

    local: field: grsales : style: styleCalisto2
    local: field: grSRIN : style: styleCalisto2
    local: field: fwf : style: styleCalisto2
    local: field: numf : style: styleCalisto2
    local: field: numf1 : style: styleCalisto2
    local: field: numf2 : style: styleCalisto2
    local: field: numf3 : style: styleCalisto2
    local: field: amtf : style: styleCalisto2
    local: field: amtf1 : style: styleCalisto2
    local: field: amtf2 : style: styleCalisto2
    local: field: amtf3 : style: styleCalisto2
    local: field: amtf4 : style: styleCalisto2
    local: field: amtf5 : style: styleCalisto2


`;
export default tdl;
