// Auto-generated from AREAWISENETSALESREPORTNEW.TXT
const tdl = `
;===============================================================================
; AREAWISENETSALESREPORTNEW.TXT
; Created By: Khokan on 2022-08-08 17:46, ID:
; Purpose: Provides an "Area Wise Net Sales Report" in Tally, showing
;          net sales, returns, collections, and related metrics per area/party,
;          with filtering, grouping, and aggregation features.
;===============================================================================

[#menu: Gateway of Tally]
;; {09.Aug.22 10:17} add: Option: AREAWISEnetsalesReportnewLock ;; : @@AREAWISEnetsalesReportnewDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AREAWISEnetsalesReportnewReport: Display Collection: collRepAREAWISEnetsalesReportnew

[!menu: AREAWISEnetsalesReportnewLock]
    add: Item: before: @@locQuit: @@AREAWISEnetsalesReportnewReport: Display Collection: collRepAREAWISEnetsalesReportnew
    add: Item: before: @@locQuit: Blank

[Collection: collRepAREAWISEnetsalesReportnew]
    Use: Extract Alias Collection
    Source Collection: List of Cost Centres
    Title: $$LocaleString:"List of Cost Centres"
    Format: $CstCatName
    Filter: CostCentreFilter
    Report: RepAREAWISEnetsalesReportnew
    Variable: SCostCentre
    Trigger: SCostCentrex

[System: formula]
    AREAWISEnetsalesReportnewReport: @@cwcaption3tableundernew + " wise net sales report"
;; AREAWISEnetsalesReportnewDemoLock: $$MachineDate < $$Date:"01/04/2013"

[Report: RepAREAWISEnetsalesReportnew]
    use: Dsp Template
    Title: @@AREAWISEnetsalesReportnewReport
    Printset: Report Title: @@AREAWISEnetsalesReportnewReport
    Form: FrmAREAWISEnetsalesReportnew
    Export: Yes
    set: svfromdate: ##svcurrentdate
    set: svTodate: ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str1, str2
    set: str1: ""
    set: str2: ""

[Form: FrmAREAWISEnetsalesReportnew]
    use: DSP Template
    Part: DspAccTitles, PrtTitle0AREAWISEnetsalesReportnew, PrtAREAWISEnetsalesReportnew
    Width: 100% Page
    Height: 100% Page
    delete: page break
    add: page break: AREAWISEnetsalesReportnewbotbrk, AREAWISEnetsalesReportnewbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add: button: agentbotton
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

[part: AREAWISEnetsalesReportnewbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AREAWISEnetsalesReportnewbotopbrk]
    use: dspacctitles
    add: part: AREAWISEnetsalesReportnewTitlePart

[part: AREAWISEnetsalesReportnewTitlePart]
    line: LnAREAWISEnetsalesReportnewTitle, LnAREAWISEnetsalesReportnewTitle2

[line: LnAREAWISEnetsalesReportnewCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: style3x
    Local: Field: fwf2: Style: style3x
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: ##SCostCentre
    Local: Field: fwf2: invisible: $$inprintmode

[part: PrtTitle0AREAWISEnetsalesReportnew]
    line: LnAREAWISEnetsalesReportnewCurrPeriod

[Part: PrtAREAWISEnetsalesReportnew]
    Line: LnAREAWISEnetsalesReportnewTitle, LnAREAWISEnetsalesReportnewTitle2, LnAREAWISEnetsalesReportnew
    bottom Line: LnAREAWISEnetsalesReportnewTotals
    repeat: LnAREAWISEnetsalesReportnew: ColAREAWISEnetsalesReportnew
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, amtf1, amtf2, amtf3, amtf4, amtf5, numf, numf1, numf2, numf3, numf4

[Collection: ColAREAWISEnetsalesReportnew]
    type: ledger
    child of: $$Groupsundrydebtors
    belongs to: yes
    filter: ColAREAWISEnetsalesReportnewFilter, cwColpartynameFilternew1
    fetch: cwcaption2item
    sort: @@default: $cwcaption3item

[system: Formula]
    ColAREAWISEnetsalesReportnewFilter: $cwcaption3item = ##SCostCentre

[Line: LnAREAWISEnetsalesReportnewTitle]
    use: LnAREAWISEnetsalesReportnew
    option: titleopt
    local: field: fwf: set as: "Party Name"
    local: field: grsales: set as: "Net Sales"
    local: field: grSRIN: set as: "Net Sals Return"
    local: field: snetsales: set as: "S.Net Sales "
    local: field: numf3: set as: "Net Sales"
    local: field: amtf3: set as: "Gross Sale Less Gross Sales Return"
    local: field: amtf4: set as: "Net Sale Without Gst"
    local: field: amtf5: set as: "Colleection"
    local: field: default: style: normal bold
    local: field: grsales: delete: field
    local: field: grSRIN: delete: field
    local: field: snetsales: delete: field
    Local: Field: grsales: Sub title: Yes
    Local: Field: grSRIN: Sub title: Yes
    Local: Field: snetsales: Sub title: Yes
    Local: field: grSRIN: Align: centre
    Local: field: grsales: Align: centre
    Local: field: snetsales: Align: centre
    Local: field: default: Align: centre
    local: field: grsales: cells: 2
    local: field: grSRIN: cells: 2
    local: field: snetsales: cells: 2
    Local: field: snf: Align: left
    Local: field: fwf: Align: left
    Local: field: nf: Align: left
    Local: field: default: Lines: 0
    local: field: grsales: style: styleCalisto2
    local: field: grSRIN: style: styleCalisto2
    local: field: snetsales: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: numf: style: styleCalisto2
    local: field: snf2: style: styleCalisto2
    local: field: numf1: style: styleCalisto2
    local: field: numf2: style: styleCalisto2
    local: field: numf3: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    local: field: amtf1: style: styleCalisto2
    local: field: amtf2: style: styleCalisto2
    local: field: amtf3: style: styleCalisto2
    local: field: amtf4: style: styleCalisto2
    local: field: amtf5: style: styleCalisto2

[Line: LnAREAWISEnetsalesReportnewTitle2]
    use: LnAREAWISEnetsalesReportnew
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
    local: field: grsales: style: styleCalisto2
    local: field: grSRIN: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: nf: style: styleCalisto2
    local: field: numf: style: styleCalisto2
    local: field: numf1: style: styleCalisto2
    local: field: numf2: style: styleCalisto2
    local: field: numf3: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    local: field: amtf1: style: styleCalisto2
    local: field: amtf2: style: styleCalisto2
    local: field: amtf3: style: styleCalisto2
    local: field: amtf4: style: styleCalisto2
    local: field: amtf5: style: styleCalisto2

[Line: LnAREAWISEnetsalesReportnew]
    Fields: fwf
    right field: nf, grsales, grSRIN, snetsales, amtf6, amtf4, amtf5, amtf7, amtf8, amtf9, amtf10, numf7, numf8, amtf12, amtf13, amtf14, amtf15
    Option: Alter on Enter
    local: field: nf9: Set As: $cwcaption1item
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: snfx: set as: $cwShowinReport1
    local: field: nf: set as: $cwcaption1vch1
    local: field: fwf: set as: $name
    local: field: numf: set as: $$reportobject:$$collectionfieldbykey:$salesbilledqty:#fwf:ColallPartywisenetsalesreport
    local: field: qtyf1: set as: $salesbilledqty
    local: field: qtyf: set as: $salescrbilledqty
    local: field: amtf: set as: $$nettamount:#amtf12:#amtf13
    local: field: amtf12: set as: $$nettamount:@@salesinvamt1valueall:@@cwsalesdiscamt1xall
    local: field: amtf13: set as: (#amtf12*5)/100
    local: field: amtf14: set as: $$nettamount:@@crnoteinvamt1all:@@cwcrnotediscamt1all
    local: field: amtf15: set as: (#amtf14*5)/100
    local: field: numf2: set as: $$reportobject:$$collectionfieldbykey:$salescrbilledqty:#fwf:ColallPartywisenetsalesreport
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
    local: field: default: style: styleCalisto
    local: field: nf: Invisible: yes
    Local: field: numf: Width: 7
    Local: field: numf2: Width: 7
    Local: field: numf3: Width: 7
    Local: field: amtf: Width: 10
    Local: field: amtf2: Width: 10
    Local: field: amtf3: Width: 10
    Local: field: nf: Width: 30
    border: thin bottom

[line: LnAREAWISEnetsalesReportnewTotals]
    use: LnAREAWISEnetsalesReportnew
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
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
    local: field: grsales: style: styleCalisto2
    local: field: grSRIN: style: styleCalisto2
    local: field: fwf: style: styleCalisto2
    local: field: numf: style: styleCalisto2
    local: field: numf1: style: styleCalisto2
    local: field: numf2: style: styleCalisto2
    local: field: numf3: style: styleCalisto2
    local: field: amtf: style: styleCalisto2
    local: field: amtf1: style: styleCalisto2
    local: field: amtf2: style: styleCalisto2
    local: field: amtf3: style: styleCalisto2
    local: field: amtf4: style: styleCalisto2
    local: field: amtf5: style: styleCalisto2

`;
export default tdl;
