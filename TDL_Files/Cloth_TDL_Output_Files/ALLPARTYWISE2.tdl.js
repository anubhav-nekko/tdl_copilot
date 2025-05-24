// Auto-generated from ALLPARTYWISE2.TXT
const tdl = `
;===============================================================================
; ALLPARTYWISE2.TXT
; Created By: Khokan on 2018-12-11 18:29, ID:
; Purpose: Provides an "Ageing Wise Outstanding Report (All party)" in Tally,
;          showing outstanding balances for all parties with ageing buckets,
;          branch, credit limit, and totals, including dynamic field formatting.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Gateway of Tally
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: AllpartyAgeingWiseOutstandingLock ;; : @@AgeingWiseOutstandingDemoLock

[!menu: AllpartyAgeingWiseOutstandingLock]
    add: Item: before: @@locQuit: @@AllpartyAgeingWiseOutstandingReport: Display : AllpartyRepAgeingWiseOutstanding
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AllpartyAgeingWiseOutstandingReport: "Ageing Wise Outstanding Report (All party)"
;; AgeingWiseOutstandingDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: AllpartyRepAgeingWiseOutstanding]
    use: Dsp Template
    Title: @@AllpartyAgeingWiseOutstandingReport
    Printset: Report Title: @@AllpartyAgeingWiseOutstandingReport
    Form: AllpartyFrmAgeingWiseOutstanding
    Export: Yes
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str1, str2
    variable: groupname, ledgername
    set: str1: ""
    set: str2: ""
    variable: DSPAgeByDueDate, ShowBillRange
    set : DSPAgeByDueDate : yes
    set : ShowBillRange : $$sysname:OverdueBills

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: AllpartyFrmAgeingWiseOutstanding]
    use: DSP Template
    Part: AllpartyPrtTitle0AgeingWiseOutstanding, AllpartyPrtAgeingWiseOutstanding
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AllpartyAgeingWiseOutstandingbotbrk, AllpartyAgeingWiseOutstandingbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    add: button: PartyNamebotton, cwconfigurebotton1

    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: AllpartyAgeingWiseOutstandingbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AllpartyAgeingWiseOutstandingbotopbrk]
    use: dspacctitles
    add: part: AllpartyAgeingWiseOutstandingTitlePart

[part: AllpartyAgeingWiseOutstandingTitlePart]
    line: AllpartyLnAgeingWiseOutstandingTitle, AllpartyLnAgeingWiseOutstandingTitle2

[line: AllpartyLnAgeingWiseOutstandingCurrPeriod]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: @@cwcaption1tableundernew + " : " + ##LedgerName
    Local: Field: fwf2: Style:style2x
    Local: Field: fwf: Style:style2x

[part: AllpartyPrtTitle0AgeingWiseOutstanding]
    line : DSPCompanyName, DSPReportName, AllpartyLnAgeingWiseOutstandingCurrPeriod
    local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalistox2
    local:line:DSPReportName: Local: Field: default:PrintStyle:styleCalistox2

;------------------------------------------------------------------------------
; MAIN DATA PART: Ageing Details for All Parties
;------------------------------------------------------------------------------

[Part: AllpartyPrtAgeingWiseOutstanding]
    Line: AllpartyLnAgeingWiseOutstandingTitle, AllpartyLnAgeingWiseOutstandingTitle2, AllpartyLnAgeingWiseOutstanding
    bottom Line: AllpartyLnAgeingWiseOutstandingTotals, AllpartyLnAgeingWiseOutstandingTotals2
    repeat: AllpartyLnAgeingWiseOutstanding: allpartyColAgeingWiseOutstanding
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, amtf2, amtf3, amtf4, amtf5, amtf6, amtf7, amtf8, amtf9, amtf10, amtf20, amtf21, amtf22, amtf23

[Collection: allpartyColAgeingWiseOutstanding]
    Type: ledger
    child of: $$groupsundrydebtors
    belongs to: yes
    fetch: *
    Fetch: BillDate, Name, Parent, BillDueDate, ClosingBalance, cwcaption1item
    add: filter: cwPartyfilter

    compute var: myonaccount : amount : $onaccountvalue
    compute var: crbal : logical : not $$isdr:$closingbalance
    compute var: clbalance : amount : $closingbalance
    compute var: onacc : amount : $$InitValue:"Amount"
    compute var: d0_10  : amount : $$BillValue:Yes:no:@@mycwfromageing:@@mycwtoageing:no
    compute var: d10_20 : amount : $$BillValue:Yes:no:@@mycwfromageing2:@@mycwtoageing2:no
    compute var: d20_30 : amount : $$BillValue:Yes:no:@@mycwfromageing3:@@mycwtoageing3:no
    compute var: d30_40 : amount : $$BillValue:Yes:no:@@mycwfromageing4:@@mycwtoageing4:no
    compute var: d40_50 : amount : $$BillValue:Yes:no:@@mycwfromageing5:@@mycwtoageing5:no
    compute var: d50_60 : amount : $$BillValue:Yes:no:@@mycwfromageing6:@@mycwtoageing6:no
    compute var: d60_0  : amount : $$BillValue:Yes:no:@@mycwfromageing7:@@mycwtoageing7:no
    compute var: onacc  : amount : $onaccountvalue
    compute var: cwdummy : amount : if @@cwnotcloingbalancenew then $$callUpdate else $$InitValue:"Amount"

    compute : d0_10  : ##d0_10
    compute : d10_20 : ##d10_20
    compute : d20_30 : ##d20_30
    compute : d30_40 : ##d30_40
    compute : d40_50 : ##d40_50
    compute : d50_60 : ##d50_60
    compute : d60_0  : ##d60_0
    compute : onacc  : ##onacc

    filter: cwnotcloingbalancenew

[System: Formula]
    cwnotcloingbalancenew: $$isdr:$closingbalance
    cwPartyfilter: if $$isempty:$closingbalance then no else if $$issysname:##str1 then yes else $name =##str1

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title Lines
;------------------------------------------------------------------------------

[Line: AllpartyLnAgeingWiseOutstandingTitle]
    use: AllpartyLnAgeingWiseOutstanding
    option: titleopt
    local: field: fwf: set as: "Party"
    local: field: nf: set as: "Branch"
    local: field: amtf: set as: "Total"
    local: field: amtf2: set as: "Amount"
    Local: Field: amtf20: Set As: "Opening"
    Local: Field: amtf21: Set As: ""
    Local: Field: newUnAdjusted: Set As: "Un-Adjusted"
    local: field: newUnAdjusted: delete: field
    Local: Field: newUnAdjusted: Sub title: Yes
    local: field: amtf3: set as: $$string:@@mycwfromageing + "-" + $$string:@@mycwtoageing
    local: field: amtf4: set as: $$string:@@mycwfromageing2 + "-" + $$string:@@mycwtoageing2
    local: field: amtf5: set as: $$string:@@mycwfromageing3 + "-" + $$string:@@mycwtoageing3
    local: field: amtf6: set as: $$string:@@mycwfromageing4 + "-" + $$string:@@mycwtoageing4
    local: field: amtf7: set as: $$string:@@mycwfromageing5 + "-" + $$string:@@mycwtoageing5
    local: field: amtf8: set as: $$string:@@mycwfromageing6 + "-" + $$string:@@mycwtoageing6
    local: field: amtf9: set as: "Over " + $$string:@@mycwfromageing7
    local: field: amtf10: set as: "On Account"
    Local: field: DEFAULT: Align: centre
    Local: field: newUnAdjusted: Align: centre
    Local: field: FWF: Align: LEFT
    local: field: default: style: normal bold

[Line: AllpartyLnAgeingWiseOutstandingTitle2]
    use: AllpartyLnAgeingWiseOutstanding
    option: titleopt
    local: field: fwf: set as: ""
    local: field: snfx2: set as: ""
    local: field: nf: set as: "Branch"
    local: field: amtf: set as: " Outstanding"
    local: field: amtf2: set as: "Amount"
    Local: Field: amtf20: Set As: "Opening"
    Local: Field: amtf21: Set As: "Payment"
    Local: Field: amtf22: Set As: "Credit Note"

;------------------------------------------------------------------------------
; MAIN DATA LINE: Party ageing, branch, amounts, ageing buckets, credit limit
;------------------------------------------------------------------------------

[Line: AllpartyLnAgeingWiseOutstanding]
    Fields: snfx2, fwf, nf1, dspaccname
    local: field: nf1: Invisible: yes
    local: field: dspdispname: Invisible: yes
    right field: amtf3, amtf4, amtf5, amtf6, amtf7, amtf8, amtf9, amtf10, Amtf, newUnAdjusted, amtf23
    Option: display on Enter

    local: field: fwf: set as: if $$stringlength:$name < 40 then $name else $$stringpart:$name:0:39
    local: field: nf1: set as: $name
    local: field: nf: set as: $cwBranch:LEDGER:$parent
    local: field: amtf: set as: $closingbalance
    Local: Field: amtf3: Set As: $d0_10
    Local: Field: amtf4: Set As: $d10_20
    Local: Field: amtf5: Set As: $d20_30
    Local: Field: amtf6: Set As: $d30_40
    Local: Field: amtf7: Set As: $d40_50
    Local: Field: amtf8: Set As: $d50_60
    Local: Field: amtf9: Set As: $d60_0
    Local: Field: amtf10: Set As: $onacc
    Local: Field: amtf23: Set As: $CreditLimit:ledger:$name
    Local: field: default: Border: thin right
    local: field: default: style: styleCalistox

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: AllpartyLnAgeingWiseOutstandingTotals]
    use: AllpartyLnAgeingWiseOutstanding
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: fwf: set as: "Total"
    local: field: amtf: set as: $$total:amtf
    local: field: amtf3: set as: $$total:amtf3
    local: field: amtf4: set as: $$total:amtf4
    local: field: amtf5: set as: $$total:amtf5
    local: field: amtf6: set as: $$total:amtf6
    local: field: amtf7: set as: $$total:amtf7
    local: field: amtf8: set as: $$total:amtf8
    local: field: amtf9: set as: $$total:amtf9
    local: field: amtf10: set as: $$total:amtf10
    local: field: amtf20: set as: $$total:amtf20
    local: field: amtf21: set as: $$total:amtf21
    local: field: amtf22: set as: $$total:amtf22
    local: field: amtf23: set as: $$total:amtf23
    Local: Field: fwf: Style:styleCalistox2

[line: AllpartyLnAgeingWiseOutstandingTotals2]
    use: AllpartyLnAgeingWiseOutstanding
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: fwf: set as: "O/S Percentage"

;------------------------------------------------------------------------------
; FILTER BUTTON AND FILTER REPORT
;------------------------------------------------------------------------------

[button: PartyNamebotton]
    key: f7
    title: "Filter"
    Action: Modify Variables: PartyNamebotton

[report: PartyNamebotton]
    form: PartyNamebotton

[form: PartyNamebotton]
    part: PartyNamebotton
    HEIGHT: 20
    WIDTH: 30

[part: PartyNamebotton]
    line: titlelinex, PartyNameline

[line: PartyNameline]
    field: sp, nf
    Local: Field: sp: Set As: "Party Name"
    Local: Field: nf: modifies: str1
    space bottom: 0.5
    Local: field: sp: Width: 12
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf: table: collpartyname, Not Applicable
    Local: Field: nf: Show table: Always

[Collection: collpartyname]
    type: ledger
    title: "List of Ledger"


`;
export default tdl;
