// Auto-generated from ALLPARTYWISE.TXT
const tdl = `
;===============================================================================
; ALLPARTYWISE.TXT
; Created By: Khokan on 2018-12-11 18:29, ID:
; Purpose: Provides an "Ageing Outstanding (All Party Wise)" report in Tally,
;          showing outstanding balances for all parties with ageing buckets,
;          dynamic configuration, and totals.
;===============================================================================

/*
[style:style1]
font:"Times New Roman"
height:10
bold:yes

[style:style2]
font:"Times New Roman"
height:10
bold:no
*/

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Gateway of Tally
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {04.Oct.23 10:42} add: Option: AgeingPartyWiseWiseOutstandingLock ;; : @@AgeingWiseOutstandingDemoLock

[!menu: AgeingPartyWiseWiseOutstandingLock]
    add: Item: before: @@locQuit: @@PartyWiseAgeingWiseOutstandingReport: Display : RepPartyWiseAgeingWiseOutstanding
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    PartyWiseAgeingWiseOutstandingReport: "Ageing Outstanding (All Party Wise)"
;; AgeingWiseOutstandingDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepPartyWiseAgeingWiseOutstanding]
    use: Dsp Template
    Title: @@PartyWiseAgeingWiseOutstandingReport
    Printset: Report Title: @@PartyWiseAgeingWiseOutstandingReport
    Form: FrmPartyWiseAgeingWiseOutstanding
    Export: Yes
;    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable: str1, str2, logi1, logi2, logi3, logi4, logi5, logi6, logi7
    variable: groupname, ledgername
    set: str1: ""
    set: str2: ""
    set: logi1: yes
    set: logi2: yes
    set: logi3: yes
    set: logi4: yes
    set: logi5: yes
    set: logi6: yes
    set: logi7: yes
    variable: DSPAgeByDueDate, ShowBillRange
    set : DSPAgeByDueDate : yes
    set : ShowBillRange : $$sysname:OverdueBills

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmPartyWiseAgeingWiseOutstanding]
    use: DSP Template
    Part: PrtTitle0AgeingWiseOutstandingX, PrtAgeingWiseOutstandingX
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AgeingWiseOutstandingbotbrkX, AgeingWiseOutstandingbotOpbrkX
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

    add: button: PartyNamebotton
    add: button: cwconfigurebotton1

[part: AgeingWiseOutstandingbotBrkX]
    line: EXPINV PageBreak
    border: thin top

[part: AgeingWiseOutstandingbotopbrkX]
    use: dspacctitles
    add: part: AgeingWiseOutstandingTitlePartX

[part: AgeingWiseOutstandingTitlePartX]
    line: LnAgeingWiseOutstandingTitleX, LnAgeingWiseOutstandingTitle2X

[line: LnAgeingWiseOutstandingCurrPeriodX]
    field: fwf, fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: ""
    Local: Field: fwf2: Style: style2x
    Local: Field: fwf: Style: style2x

[part: PrtTitle0AgeingWiseOutstandingX]
    line: DSPCompanyName, DSPReportName, LnAgeingWiseOutstandingCurrPeriodX
    local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalistox2
    local:line:DSPReportName: Local: Field: default:PrintStyle:styleCalistox2

[Part: PrtAgeingWiseOutstandingX]
    Line: LnAgeingWiseOutstandingTitleX, LnAgeingWiseOutstandingTitle2X, LnAgeingWiseOutstandingX
    bottom Line: LnAgeingWiseOutstandingTotalsX, LnAgeingWiseOutstandingTotals2X
    repeat: LnAgeingWiseOutstandingX: ColAgeingWiseOutstandingX
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, amtf2, amtf3, amtf4, amtf5, amtf6, amtf7, amtf8, amtf9, amtf10, amtf20, amtf21, amtf22, amtf23

[Collection: ColAgeingWiseOutstandingX]
    Type: ledger
    child of: $$groupsundrydebtors
    belongs to: yes
    fetch: *
    Fetch: BillDate, Name, Parent, BillDueDate, ClosingBalance, cwcaption1item
    add: filter: cwPartyfilter

    compute var: myonaccount: amount: $onaccountvalue
    compute var: crbal: logical: not $$isdr:$closingbalance
    compute var: clbalance: amount: $closingbalance
    compute var: onacc: amount: $$InitValue:"Amount"
    compute var: d0_10: amount: $$BillValue:Yes:no:@@mycwfromageing:@@mycwtoageing:no
    compute var: d10_20: amount: $$BillValue:Yes:no:@@mycwfromageing2:@@mycwtoageing2:no
    compute var: d20_30: amount: $$BillValue:Yes:no:@@mycwfromageing3:@@mycwtoageing3:no
    compute var: d30_40: amount: $$BillValue:Yes:no:@@mycwfromageing4:@@mycwtoageing4:no
    compute var: d40_50: amount: $$BillValue:Yes:no:@@mycwfromageing5:@@mycwtoageing5:no
    compute var: d50_60: amount: $$BillValue:Yes:no:@@mycwfromageing6:@@mycwtoageing6:no
    compute var: d60_0: amount: $$BillValue:Yes:no:@@mycwfromageing7:@@mycwtoageing7:no
    compute var: onacc: amount: $onaccountvalue
    compute var: cwdummy: amount: if @@cwnotcloingbalancex then $$callUpdate else $$InitValue:"Amount"

    compute: d0_10: ##d0_10
    compute: d10_20: ##d10_20
    compute: d20_30: ##d20_30
    compute: d30_40: ##d30_40
    compute: d40_50: ##d40_50
    compute: d50_60: ##d50_60
    compute: d60_0: ##d60_0
    compute: onacc: ##onacc

    filter: cwnotcloingbalanceX

[System: Formula]
    cwnotcloingbalanceX: $$isdr:$closingbalance

;------------------------------------------------------------------------------
; COLUMN HEADERS: Ageing Buckets, Party, Branch, Totals
;------------------------------------------------------------------------------

[Line: LnAgeingWiseOutstandingTitleX]
    use: LnAgeingWiseOutstandingX
    option: titleopt
    local: field: fwf: set as: "Party"
    local: field: nf: set as: "Branch"
    local: field: amtf: set as: "Total"
    local: field: amtf2: set as: "Amount"
    Local: Field: amtf20: Set As: "Opening"
    Local: Field: amtf21: Set As: ""
    Local: Field: newUnAdjusted: Set As: "Un-Adjusted"
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

;------------------------------------------------------------------------------
; MAIN DATA LINE: Party-wise ageing, totals, and dynamic configuration
;------------------------------------------------------------------------------

[Line: LnAgeingWiseOutstandingX]
    Fields: snfx2, fwf, nf1, dspaccname
    local: field: nf1: Invisible: yes
    local: field: dspdispname: Invisible: yes
    right field: amtf3, amtf4, amtf5, amtf6, amtf7, amtf8, amtf9, amtf43, amtf44, amtf45, amtf46, amtf47, amtf48, amtf49, amtf50, amtf10, Amtf, newUnAdjusted, amtf23
    Option: display on Enter
    Local: Field: amtf20: Set As: ""
    Local: Field: amtf21: Set As: $$CollAmtTotal:collreciptcrnote:$rcptvalue
    Local: Field: amtf22: Set As: $$CollAmtTotal:collreciptcrnote:$crnotevalue
    Local: Field: amtf23: Set As: $CreditLimit:ledger:$name
    Local: field: amtf: Width: @@amountwidth * 1.5
    local: field: fwf: display: ledger vouchers
    option: alter on enter
    local: field: fwf: alter: voucher: $$isvoucher
    local: field: fwf: set as: if $$stringlength:$name < 40 then $name else $$stringpart:$name:0:39
    local: field: nf1: set as: $name
    local: field: nf: set as: $cwBranch:LEDGER:$parent
    local: field: amtf: set as: $closingbalance

;------------------------------------------------------------------------------
; TOTALS LINE: Display totals for all columns
;------------------------------------------------------------------------------

[line: LnAgeingWiseOutstandingTotalsX]
    use: LnAgeingWiseOutstandingX
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: snfx2: set as: ""
    local: field: fwf: set as: "Total"
    local: field: nf: set as: ""
    local: field: amtf: set as: $$total:amtf
    local: field: amtf1: set as: $$total:amtf1
    local: field: amtf2: set as: $$total:amtf2
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
    Local: Field: fwf: Style: styleCalistox2

[line: LnAgeingWiseOutstandingTotals2X]
    use: LnAgeingWiseOutstandingX
    option: totalOpt
    local: field: fwf: align: right
    local: field: default: style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: snfx2: set as: ""
    local: field: fwf: set as: "O/S Percentage"

`;
export default tdl;
