// Auto-generated from TESTNEW14.TXT
const tdl = `
;===============================================================================
; TESTNEW14.TXT
; Created By: Khokan on 2023-10-03 16:39, ID:
; Purpose: Implements an "Ageing Outstanding (All Party Wise)" report in Tally,
;          showing party-wise outstanding grouped by ageing buckets, with
;          dynamic configuration, totals, and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; MENU INTEGRATION: Add report option to Gateway of Tally and Debug menu
;;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    add: Option: AgeingPartyWiseWiseOutstandingLock ;; : @@AgeingWiseOutstandingDemoLock

[!menu: AgeingPartyWiseWiseOutstandingLock]
    add: Item: before: @@locQuit: @@PartyWiseAgeingWiseOutstandingReport: Display : RepPartyWiseAgeingWiseOutstanding
    add: Item: before: @@locQuit: Blank

[System: formula]
    PartyWiseAgeingWiseOutstandingReport: "Ageing Outstanding (All Party Wise)222"
;; AgeingWiseOutstandingDemoLock: $$MachineDate < $$Date:"01/04/2013"

;;------------------------------------------------------------------------------
;; MAIN REPORT DEFINITION
;;------------------------------------------------------------------------------

[Report: RepPartyWiseAgeingWiseOutstanding]
    use: Dsp Template
    Title: @@PartyWiseAgeingWiseOutstandingReport
    Printset: Report Title: @@PartyWiseAgeingWiseOutstandingReport
    Form: FrmPartyWiseAgeingWiseOutstanding
    Export: Yes
    set  : svTodate : ##svcurrentdate
    Local: Button   : RelReports        : Inactive : Yes
    variable:str1,str2,logi1,logi2,logi3,logi4,logi5,logi6,logi7
    variable : groupname,ledgername
    set:str1:""
    set:str2:""
    set:logi1:yes
    set:logi2:yes
    set:logi3:yes
    set:logi4:yes
    set:logi5:yes
    set:logi6:yes
    set:logi7:yes
    variable : DSPAgeByDueDate,ShowBillRange
    set : DSPAgeByDueDate : yes
    set : ShowBillRange : $$sysname:OverdueBills

;;------------------------------------------------------------------------------
;; MAIN FORM LAYOUT
;;------------------------------------------------------------------------------

[Form: FrmPartyWiseAgeingWiseOutstanding]
    use: DSP Template
    Part: PrtTitle0AgeingWiseOutstandingX,PrtAgeingWiseOutstandingX
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AgeingWiseOutstandingbotbrkX,AgeingWiseOutstandingbotOpbrkX
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n
    add:button:PartyNamebotton
    add:button:cwconfigurebotton1

[part: AgeingWiseOutstandingbotBrkX]
    line: EXPINV PageBreak
    border: thin top

[part: AgeingWiseOutstandingbotopbrkX]
    use: dspacctitles
    add: part: AgeingWiseOutstandingTitlePartX

[part: AgeingWiseOutstandingTitlePartX]
    line: LnAgeingWiseOutstandingTitleX,LnAgeingWiseOutstandingTitle2X

[line: LnAgeingWiseOutstandingCurrPeriodX]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As:""
    Local: Field: fwf2: Style:style2x
    Local: Field: fwf: Style:style2x

[part: PrtTitle0AgeingWiseOutstandingX]
    line : DSPCompanyName,DSPReportName,LnAgeingWiseOutstandingCurrPeriodX
    local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalistox2
    local:line:DSPReportName: Local: Field: default:PrintStyle:styleCalistox2

;;------------------------------------------------------------------------------
;; MAIN DATA PART: Table of party-wise ageing outstanding details
;;------------------------------------------------------------------------------

[Part: PrtAgeingWiseOutstandingX]
    Line: LnAgeingWiseOutstandingTitleX,LnAgeingWiseOutstandingTitle2X,LnAgeingWiseOutstandingX
    bottom Line: LnAgeingWiseOutstandingTotalsX,LnAgeingWiseOutstandingTotals2X
    repeat: LnAgeingWiseOutstandingX: ColAgeingWiseOutstandingX
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf,amtf2,amtf3,amtf4,amtf5,amtf6,amtf7,amtf8,amtf9,amtf10,amtf20,amtf21,amtf22,amtf23

;;------------------------------------------------------------------------------
;; DATA COLLECTION: Party-wise ageing buckets and computed fields
;;------------------------------------------------------------------------------

[Collection: ColAgeingWiseOutstandingX]
    Type :ledger
    child of: $$groupsundrydebtors
    belongs to : yes
    fetch : *
    Fetch: BillDate, Name, Parent, BillDueDate,ClosingBalance,cwcaption1item
    add:filter:cwPartyfilter

    compute var : myonaccount : amount : $onaccountvalue
    compute var : crbal : logical : not $$isdr:$closingbalance
    compute var : clbalance : amount :  $closingbalance
    compute var : onacc : amount : $$InitValue:"Amount"
    compute var: d0_10  : amount : $$BillValue:Yes:no:@@mycwfromageing:@@mycwtoageing:no
    compute var: d10_20 : amount : $$BillValue:Yes:no:@@mycwfromageing2:@@mycwtoageing2:no
    compute var: d20_30 : amount : $$BillValue:Yes:no:@@mycwfromageing3:@@mycwtoageing3:no
    compute var: d30_40 : amount : $$BillValue:Yes:no:@@mycwfromageing4:@@mycwtoageing4:no
    compute var: d40_50 : amount : $$BillValue:Yes:no:@@mycwfromageing5:@@mycwtoageing5:no
    compute var: d50_60 : amount : $$BillValue:Yes:no:@@mycwfromageing6:@@mycwtoageing6:no
    compute var: d60_0  : amount : $$BillValue:Yes:no:@@mycwfromageing7:@@mycwtoageing7:no
    compute var: onacc  : amount : $onaccountvalue
    compute var: cwdummy : amount : if @@cwnotcloingbalancex then $$callUpdate else $$InitValue:"Amount"
    compute : d0_10  : ##d0_10
    compute : d10_20 : ##d10_20
    compute : d20_30 : ##d20_30
    compute : d30_40 : ##d30_40
    compute : d40_50 : ##d40_50
    compute : d50_60 : ##d50_60
    compute : d60_0  : ##d60_0
    compute : onacc  : ##onacc
    filter:cwnotcloingbalanceX

[System: Formula]
    cwnotcloingbalanceX:$$isdr:$closingbalance

;;------------------------------------------------------------------------------
;; HEADER LINES: Main column headers and subheaders
;;------------------------------------------------------------------------------

[Line: LnAgeingWiseOutstandingTitleX]
    use: LnAgeingWiseOutstandingX
    option: titleopt
    local:field: fwf: set as: "Party1111"
    local:field: nf: set as: "Branch"
    local:field: amtf: set as: "Total"
    local:field: amtf2: set as: "Amount"
    Local: Field:amtf20: Set As:"Opening"
    Local: Field:amtf21: Set As:""
    Local: Field:newUnAdjusted: Set As:"Un-Adjusted"
    local:field: amtf3: set as:$$string:@@mycwfromageing+$$string:"-" +$$string:@@mycwtoageing
    local:field: amtf4: set as:$$string:@@mycwfromageing2+$$string:"-"+$$string:@@mycwtoageing2
    local:field: amtf5: set as:$$string:@@mycwfromageing3+$$string:"-"+$$string:@@mycwtoageing3
    local:field: amtf6: set as:$$string:@@mycwfromageing4+$$string:"-"+$$string:@@mycwtoageing4
    local:field: amtf7: set as:$$string:@@mycwfromageing5+$$string:"-"+$$string:@@mycwtoageing5
    local:field: amtf8: set as:$$string:@@mycwfromageing6+$$string:"-"+$$string:@@mycwtoageing6
    local:field: amtf9: set as:$$string:"Over"+$$string:" "+$$string:@@mycwfromageing7
    local:field: amtf10: set as:"On Account"
    Local: field: DEFAULT: Align:centre
    Local: field: FWF: Align:LEFT
    local: field: default : style: normal bold
    local: field:amtf3: type: String
    local: field:amtf4: type: String
    local: field:amtf5: type: String
    local: field:amtf6: type: String
    local: field:amtf7: type: String
    local: field:amtf8: type: String
    local: field:amtf9: type: String
    local: field:newUnAdjusted: type: String
    Local: Field: newUnAdjusted: Style:style1

[Line: LnAgeingWiseOutstandingTitle2X]
    use: LnAgeingWiseOutstandingX
    option: titleopt
    local:field: fwf: set as: ""
    local:field: snfx2: set as: ""
    local:field: nf: set as: "Branch"
    local:field: amtf: set as:" Outstanding"
    local:field: amtf2: set as: "Amount"
    Local: Field:amtf20: Set As:"Opening"
    Local: Field:amtf21: Set As:"Payment"
    Local: Field:amtf22: Set As:"Credit Note"
    local:field: amtf10: set as:"On Account"
    Local: field: DEFAULT: Align:centre
    Local: field: FWF: Align:LEFT
    local: field: default : style: normal bold

;;------------------------------------------------------------------------------
;; DATA LINE: Main line showing all calculated columns per party
;;------------------------------------------------------------------------------

[Line: LnAgeingWiseOutstandingX]
    Fields:snfx2,fwf,nf1,dspaccname
    right field:amtf3,amtf4,amtf5,amtf6,amtf7,amtf8,amtf9,amtf10,Amtf,newUnAdjusted,amtf23
    Option: display on Enter
    local:field: fwf: set as:if $$stringlength:$name < 40 then $name else $$stringpart:$name:0:39
    local:field: nf1: set as:$name
    local:field: nf: set as:$cwBranch:LEDGER:$parent
    local:field: amtf: set as:$closingbalance
    Local: field: amtf3: Set As:  $d0_10
    Local: field: amtf4: Set As:  $d10_20
    Local: field: amtf5: Set As:  $d20_30
    Local: field: amtf6: Set As:  $d30_40
    Local: field: amtf7: Set As:  $d40_50
    Local: field: amtf8: Set As:  $d50_60
    Local: field: amtf9: Set As:  $d60_0
    Local: field: amtf10: Set As: $onacc
    Local: Field: DEFAULT: Border: thin right

;;------------------------------------------------------------------------------
;; TOTALS LINES: Running totals for all columns
;;------------------------------------------------------------------------------

[line: LnAgeingWiseOutstandingTotalsX]
    use: LnAgeingWiseOutstandingX
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: fwf: set as:"Total"
    local: field: amtf: set as:$$total:amtf
    local: field: amtf3: set as:$$total:amtf3
    local: field: amtf4: set as:$$total:amtf4
    local: field: amtf5: set as:$$total:amtf5
    local: field: amtf6: set as:$$total:amtf6
    local: field: amtf7: set as:$$total:amtf7
    local: field: amtf8: set as:$$total:amtf8
    local: field: amtf9: set as:$$total:amtf9
    local: field: amtf10: set as:$$total:amtf10

[line: LnAgeingWiseOutstandingTotals2X]
    use: LnAgeingWiseOutstandingX
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: fwf: set as:"O/S Percentage"

;;------------------------------------------------------------------------------
;; CONFIGURE BUTTON: F12 popup for ageing bucket visibility
;;------------------------------------------------------------------------------

[button:cwconfigurebotton1]
    key:f12
    title:"Configure"
    Action : Modify Variables:cwconfigurebotton1

[report:cwconfigurebotton1]
    form:cwconfigurebotton1

[form:cwconfigurebotton1]
    part:cwconfigurebotton1
    WIDTH:30

[part:cwconfigurebotton1]
    line:Configuretitlelinex,ageingline1,ageingline2,ageingline3,ageingline4,ageingline5,ageingline6,ageingline7

[line:Configuretitlelinex]
    field:fwfc
    Local: Field: fwfc: info: "Configure"

[line:ageingline1]
    field:sp,CWLOGICAL
    Local: Field: sp: Set As:@@cwageing1
    Local: Field: CWLOGICAL:modifies:logi1
    Local: Field: CWLOGICAL:set as:##logi1
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold

[line:ageingline2]
    field:sp,CWLOGICAL
    Local: Field: sp: Set As:@@cwageing2
    Local: Field: CWLOGICAL:modifies:logi2
    Local: Field: CWLOGICAL:set as:##logi2
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold

[line:ageingline3]
    field:sp,CWLOGICAL
    Local: Field: sp: Set As:@@cwageing3
    Local: Field: CWLOGICAL:modifies:logi3
    Local: Field: CWLOGICAL:set as:##logi3
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold

[line:ageingline4]
    field:sp,CWLOGICAL
    Local: Field: sp: Set As:@@cwageing4
    Local: Field: CWLOGICAL:modifies:logi4
    Local: Field: CWLOGICAL:set as:##logi4
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold

[line:ageingline5]
    field:sp,CWLOGICAL
    Local: Field: sp: Set As:@@cwageing5
    Local: Field: CWLOGICAL:modifies:logi5
    Local: Field: CWLOGICAL:set as:##logi5
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold

[line:ageingline6]
    field:sp,CWLOGICAL
    Local: Field: sp: Set As:@@cwageing6
    Local: Field: CWLOGICAL:modifies:logi6
    Local: Field: CWLOGICAL:set as:##logi6
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold

[line:ageingline7]
    field:sp,CWLOGICAL
    Local: Field: sp: Set As:@@cwageing7
    Local: Field: CWLOGICAL:modifies:logi7
    Local: Field: CWLOGICAL:set as:##logi7
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold

[System: Formula]
    cwageing1:$$string:@@mycwfromageing+$$string:"-" +$$string:@@mycwtoageing
    cwageing2:$$string:@@mycwfromageing2+$$string:"-"+$$string:@@mycwtoageing2
    cwageing3:$$string:@@mycwfromageing3+$$string:"-"+$$string:@@mycwtoageing3
    cwageing4:$$string:@@mycwfromageing4+$$string:"-"+$$string:@@mycwtoageing4
    cwageing5:$$string:@@mycwfromageing5+$$string:"-"+$$string:@@mycwtoageing5
    cwageing6:$$string:@@mycwfromageing6+$$string:"-"+$$string:@@mycwtoageing6
    cwageing7:$$string:"Over"+$$string:" "+$$string:@@mycwfromageing7

;===============================================================================
; End of TESTNEW14.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
