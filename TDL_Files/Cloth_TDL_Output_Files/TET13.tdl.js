// Auto-generated from TET13.TXT
const tdl = `
; ===============================================================================
; Ageing Wise Outstanding Report (Agent Wise) - Tally Definition
; ===============================================================================
; Created By: Khokan on 2018-12-11 18:29, ID:
; Last Modified: 04.Sep.21
; 
; PURPOSE: This report provides an ageing analysis of outstanding amounts by agent,
; categorizing receivables into different time buckets based on due dates.
; ===============================================================================

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

; ===============================================================================
; MENU CONFIGURATION
; Adds the report option to Gateway of Tally menu
; ===============================================================================
[#menu: Gateway of Tally]
;; {04.Sep.21 14:27}         add: Option: AgeingWiseOutstandingLock ;; : @@AgeingWiseOutstandingDemoLock

; ===============================================================================
; MENU ITEM DEFINITION
; Defines the menu item and links it to the report collection
; ===============================================================================
[!menu: AgeingWiseOutstandingLock]
        add: Item: before: @@locQuit: @@AgeingWiseOutstandingReport: Display collection: colRepAgeingWiseOutstandingxx
        add: Item: before: @@locQuit: Blank

; ===============================================================================
; SYSTEM FORMULAS
; Defines report title and any system-level variables
; ===============================================================================
[System: formula]
   AgeingWiseOutstandingReport: "Ageing Wise Outstanding Report (Agent Wise)"
;; AgeingWiseOutstandingDemoLock: $$MachineDate < $$Date:"01/04/2013"

; ===============================================================================
; COLLECTION DEFINITION
; Main collection that extracts data for the report
; ===============================================================================
[collection : colRepAgeingWiseOutstandingxx]
Use         : Extract Alias Collection
 Source Collection	: List of Ledgers
 Variable    : Ledger Name
 Report      :RepAgeingWiseOutstanding
 Trigger     :cwLedgerName1  ;; cwLedgerNamex
 Fetch       : Name
                                
; ===============================================================================
; REPORT DEFINITION
; Main report configuration including title, form, and variables
; ===============================================================================                                
[Report: RepAgeingWiseOutstanding]
        use: Dsp Template
      Title: @@AgeingWiseOutstandingReport
   Printset: Report Title: @@AgeingWiseOutstandingReport
       Form: FrmAgeingWiseOutstanding
     Export: Yes
   ;  set  : svfromdate : ##svcurrentdate
     set  : svTodate : ##svcurrentdate
    Local       : Button   : RelReports        : Inactive : Yes
    variable:str1,str2
    variable : groupname,ledgername
    set:str1:""
    set:str2:""
    variable : DSPAgeByDueDate,ShowBillRange
    set : DSPAgeByDueDate : yes
    set : ShowBillRange : $$sysname:OverdueBills

; ===============================================================================
; FORM DEFINITION
; Defines the layout and structure of the report form
; ===============================================================================
[Form: FrmAgeingWiseOutstanding]
        use: DSP Template
;; {04.Sep.21 14:06}        Part: DspAccTitles,PrtTitle0AgeingWiseOutstanding,PrtAgeingWiseOutstanding
       Part: PrtTitle0AgeingWiseOutstanding,PrtAgeingWiseOutstanding
      Width: 100% Page
     Height: 100% Page
 Background: @@SV_STOCKSUMMARY
     delete: page break
        add: page break: AgeingWiseOutstandingbotbrk,AgeingWiseOutstandingbotOpbrk
Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
;;    local : button : report config : action :modify variable: MyPLConfigure

;; {04.Sep.21 14:10} local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:style3n
local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n  ;; Local: Field: DSPReportPeriod:border:thin box  ;;PrintStyle:style2
local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

; Add button for party name selection
      add:button:PartyNamebotton

; ===============================================================================
; PAGE BREAK PARTS
; Define page break behavior for the report
; ===============================================================================
[part: AgeingWiseOutstandingbotBrk]
       line: EXPINV PageBreak
     border: thin top

[part: AgeingWiseOutstandingbotopbrk]
        use: dspacctitles
  add: part: AgeingWiseOutstandingTitlePart

; ===============================================================================
; TITLE PARTS
; Define the title sections of the report
; ===============================================================================
[part: AgeingWiseOutstandingTitlePart]
       line: LnAgeingWiseOutstandingTitle,LnAgeingWiseOutstandingTitle2

; ===============================================================================
; CURRENT PERIOD LINE
; Displays the current period information in the report header
; ===============================================================================
[line: LnAgeingWiseOutstandingCurrPeriod]
      field: fwf,fwf2
      Local: field: fwf2: Align: Right
      Local: Field: fwf: Style: normal bold
      Local: Field: fwf2: Style: normal bold
      Local: Field: fwf2: Set As: @@dspDateStr
      Local: Field: fwf: Set As:@@cwcaption1tableundernew+" : "+##LedgerName ;; ##groupname
;; {04.Sep.21 14:07}       Local: Field: fwf2:invisible: $$inprintmode
      Local: Field: fwf2: Style:style2x
      Local: Field: fwf: Style:style2x
      
; ===============================================================================
; TITLE PART DEFINITION
; Defines the title part of the report with company and report name
; ===============================================================================
[part: PrtTitle0AgeingWiseOutstanding]
      line : DSPCompanyName,DSPReportName,LnAgeingWiseOutstandingCurrPeriod
      local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalistox2
      local:line:DSPReportName: Local: Field: default:PrintStyle:styleCalistox2

; ===============================================================================
; MAIN REPORT PART
; Defines the main body of the report with data lines and totals
; ===============================================================================
[Part: PrtAgeingWiseOutstanding]
       Line: LnAgeingWiseOutstandingTitle,LnAgeingWiseOutstandingTitle2,LnAgeingWiseOutstanding
bottom Line: LnAgeingWiseOutstandingTotals,LnAgeingWiseOutstandingTotals2
     repeat: LnAgeingWiseOutstanding: ColAgeingWiseOutstanding
     scroll: Vertical
 Common Border: YEs
      Total: Qtyf,amtf,amtf2,amtf3,amtf4,amtf5,amtf6,amtf7,amtf8,amtf9,amtf10,amtf20,amtf21,amtf22,amtf23

; ===============================================================================
; MAIN DATA COLLECTION
; Defines the data collection for the ageing report with calculations
; ===============================================================================
[Collection: ColAgeingWiseOutstanding]
Type :ledger
child of: $$groupsundrydebtors
belongs to : yes
fetch : *
Fetch: BillDate, Name, Parent, BillDueDate,ClosingBalance,cwcaption1item

add:filter:cwPartyfilter

; Calculate on-account values and closing balances
compute var : myonaccount : amount : $onaccountvalue
compute var : crbal : logical : not $$isdr:$closingbalance ;;

compute var : clbalance : amount :  $closingbalance
compute var : onacc : amount : $$InitValue:"Amount"

; Calculate ageing buckets based on due dates
compute var: d0_10  : amount : $$BillValue:Yes:no:@@mycwfromageing:@@mycwtoageing:no ;;##DSPAgeByDueDate ;;sum : $d0_10a
compute var: d10_20 : amount : $$BillValue:Yes:no:@@mycwfromageing2:@@mycwtoageing2:no ;;sum : $d10_20
compute var: d20_30 : amount : $$BillValue:Yes:no:@@mycwfromageing3:@@mycwtoageing3:no ;;sum : $d20_30
compute var: d30_40 : amount : $$BillValue:Yes:no:@@mycwfromageing4:@@mycwtoageing4:no ;; {04.Sep.21 12:53} aggr compute : d30_40 : sum : $d30_40
compute var: d40_50 : amount : $$BillValue:Yes:no:@@mycwfromageing5:@@mycwtoageing5:no ;; sum : $d40_50
compute var: d50_60 : amount : $$BillValue:Yes:no:@@mycwfromageing6:@@mycwtoageing6:no ;; sum : $d50_60
compute var: d60_0  : amount : $$BillValue:Yes:no:@@mycwfromageing7:@@mycwtoageing7:no ;; sum : $d60_0
compute var: onacc  : amount : $onaccountvalue

; Update calculations when needed
compute var: cwdummy : amount : if @@cwnotcloingbalance then $$callUpdate else $$InitValue:"Amount"

; Assign computed values to report variables
compute : d0_10  : ##d0_10
compute : d10_20 : ##d10_20
compute : d20_30 : ##d20_30
compute : d30_40 : ##d30_40
compute : d40_50 : ##d40_50
compute : d50_60 : ##d50_60
compute : d60_0  : ##d60_0
compute : onacc  : ##onacc

; Update calculations when needed (repeated)
compute var: cwdummy : amount : if @@cwnotcloingbalance then $$callUpdate else $$InitValue:"Amount"
filter:cwnotcloingbalance

; ===============================================================================
; SYSTEM FORMULA FOR FILTERING
; Defines filter condition for closing balance
; ===============================================================================
[System: Formula]
cwnotcloingbalance:$$isdr:$closingbalance and ##ledgername=$cwcaption1item

; ===============================================================================
; BILLS COLLECTION
; Collection for bill-level data with ageing calculations
; ===============================================================================
[collection: cwDrBillsofLedger]
type : bills
;; {04.Sep.21 12:33} child of :$name
filter : cwonlyDrBills

; Calculate ageing buckets for bills
; 0 - 30 days
compute : d0_10a : $$BillValue:Yes:No:0:30:no ;; $$fromvalue:(@@dsptodate-@@mycwtoageing):$$tovalue:(@@dsptodate):$closingbalance ;;$$asamount:2 ;;

; 30 - 60 days
compute : d10_20 :  $$fromvalue:(@@dsptodate-@@mycwtoageing2):$$tovalue:(@@dsptodate-@@mycwfromageing2):$closingbalance ;;$$asamount:3 ;;

; 60 - 90 days
compute : d20_30 :  $$fromvalue:(@@dsptodate-@@mycwtoageing3):$$tovalue:(@@dsptodate-@@mycwfromageing3):$tbaldebits ;;$$asamount:4 ;;

; 90 - 120 days
compute : d30_40 :  $$fromvalue:(@@dsptodate-@@mycwtoageing4):$$tovalue:(@@dsptodate-@@mycwfromageing4):$tbaldebits ;;$$asamount:5 ;;

; 120 - 150 days
compute : d40_50 : $$fromvalue:(@@dsptodate-@@mycwtoageing5):$$tovalue:(@@dsptodate-@@mycwfromageing5):$tbaldebits ;;$$asamount:6 ;;

; 150 - 180 days
compute : d50_60 :  $$fromvalue:(@@dsptodate-@@mycwtoageing6):$$tovalue:(@@dsptodate-@@mycwfromageing6):$tbaldebits ;;$$asamount:7 ;;

; Over 180 days
compute : d60_0 :  $$fromvalue:(@@dsptodate-@@mycwtoageing7):$$tovalue:(@@dsptodate-@@mycwfromageing7):$tbaldebits ;;$$asamount:8 ;;$$initvalue:"amount" ;;$$fromvalue:(@@dsptodate-@@mycwtoageing7):$$tovalue:(@@dsptodate-@@mycwfromageing7):$tbaldebits

; ===============================================================================
; FILTER FORMULA FOR BILLS
; Defines which bills to include in the report
; ===============================================================================
[System: Formula]
cwonlyDrBills :  if ##ledgername=$cwcaption1item:ledger:$parent then $$isdr:$closingbalance  else no

; ===============================================================================
; TITLE LINE DEFINITION
; Defines the column headers for the report
; ===============================================================================
[Line: LnAgeingWiseOutstandingTitle]
use: LnAgeingWiseOutstanding
option: titleopt

local:field: fwf: set as: "Party"
local:field: nf: set as: "Branch"
local:field: amtf: set as: "Total"
local:field: amtf2: set as: "Amount"

Local: Field:amtf20: Set As:"Opening"
Local: Field:amtf21: Set As:"";;"Payment"

Local: Field:newUnAdjusted: Set As:"Un-Adjusted";;"Credit Note"
local : field : newUnAdjusted : delete :field
Local: Field: newUnAdjusted: Sub title : Yes
local:field: snfx2: set as: ""
Local: Field:amtf23: Set As:"Credit Limit"

; Set column headers for ageing buckets
local:field: amtf3: set as:$$string:@@mycwfromageing+$$string:"-" +$$string:@@mycwtoageing  ;;+ "0-10"
local:field: amtf4: set as:$$string:@@mycwfromageing2+$$string:"-"+$$string:@@mycwtoageing2  ;; "11-21"
local:field: amtf5: set as:$$string:@@mycwfromageing3+$$string:"-"+$$string:@@mycwtoageing3  ;; "22-31"
local:field: amtf6: set as:$$string:@@mycwfromageing4+$$string:"-"+$$string:@@mycwtoageing4  ;; "32-60"
local:field: amtf7: set as:$$string:@@mycwfromageing5+$$string:"-"+$$string:@@mycwtoageing5  ;; "61-100"
local:field: amtf8: set as:$$string:@@mycwfromageing6+$$string:"-"+$$string:@@mycwtoageing6  ;; "101-119"
;; {04.Sep.21 14:04} local:field: amtf9: set as:$$string:@@mycwfromageing7+$$string:" "+$$string:"And Above"  ;; "120 And Above"
local:field: amtf9: set as:$$string:"Over"+$$string:" "+$$string:@@mycwfromageing7
local:field: amtf10: set as:"On Account"

; Set field alignment and styling
Local: field: DEFAULT: Align:centre
Local: field: newUnAdjusted: Align:centre
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

; Apply consistent styling to all fields
Local: Field: newUnAdjusted: Style:styleCalistox2
Local: Field: fwf: Style:styleCalistox2
Local: Field: nf: Style:styleCalistox2
Local: Field:amtf: Style:styleCalistox2
Local: Field:amtf1: Style:styleCalistox2
Local: Field:amtf2: Style:styleCalistox2
Local: Field:amtf3: Style:styleCalistox2
Local: Field:amtf4: Style:styleCalistox2
Local: Field:amtf5: Style:styleCalistox2
Local: Field:amtf6: Style:styleCalistox2
Local: Field:amtf7: Style:styleCalistox2
Local: Field:amtf8: Style:styleCalistox2
Local: Field:amtf9: Style:styleCalistox2
Local: Field:amtf10: Style:styleCalistox2
Local: Field:amtf20: Style:styleCalistox2
Local: Field:amtf21: Style:styleCalistox2
Local: Field:amtf22: Style:styleCalistox2
Local: Field:amtf23: Style:styleCalistox2

Local: Field: fwf: Color :Black

; ===============================================================================
; LOGGING FUNCTIONS
; Helper functions for debugging and value inspection
; ===============================================================================
[function : cwLogDetails2]
parameter : title : string
parameter : value1 : number
parameter : value2 : number

05 : log : "Value"+##title+" : "+$$string:##value1 + " - " + $$string:##value2
10 : log : ##title+": " + $$string:(@@dsptodate-##value1)+ " " + $$string:(@@dsptodate-##value2)

; Function to log all ageing period values for debugging
[function : cwlogDetails]
0001 : log :  @@mycwfromageing
0002 : log :  @@mycwfromageing2
0003 : log :  @@mycwfromageing3
0004 : log :  @@mycwfromageing4
0005 : log :  @@mycwfromageing5
0006 : log :  @@mycwfromageing6
0007 : log :  @@mycwfromageing7
0007a:log:"---- to --"
0008 : log :  @@mycwtoageing
0009 : log :  @@mycwtoageing2
0011 : log : @@mycwtoageing3
0012 : log : @@mycwtoageing4
0013 : log : @@mycwtoageing5
0014 : log : @@mycwtoageing6
0015 : log : @@mycwtoageing7

;; {04.Sep.21 13:10} 10 : call : cwLogDetails2:"1":@@mycwtoageing:0
;; {04.Sep.21 13:10} 20 : call : cwLogDetails2:"2":@@mycwtoageing:@@mycwfromageing

; ===============================================================================
; SECONDARY TITLE LINE
; Additional title line for the report
; ===============================================================================
[Line: LnAgeingWiseOutstandingTitle2]
use: LnAgeingWiseOutstanding
option: titleopt

local:field: fwf: set as: ""
local:field: snfx2: set as: ""
local:field: nf: set as: "Branch"
local:field: amtf: set as:" Outstanding"
local:field: amtf1: set as: ""
local:field: amtf2: set as: "Amount"

Local: Field:amtf20: Set As:"Opening"
Local: Field:amtf21: Set As:"Payment"

Local: Field:amtf22: Set As:"Credit Note"
;; {04.Sep.21 13:10} Local: Field:amtf23: Set As:$$cwlogdetails

; Commented out ageing calculations (preserved for reference)
;; {03.Sep.21 11:22} compute var: da_10 : amount : $$fromvalue:(@@dsptodate-@@mycwtoageing):$$tovalue:(@@dsptodate):$tbaldebits
;; {03.Sep.21 11:22} compute var: d0_10 : amount : $$fromvalue:(@@dsptodate-@@mycwtoageing):$$tovalue:(@@dsptodate-@@mycwfromageing):$tbaldebits
;; {03.Sep.21 11:22} compute var: d10_20 : amount : $$fromvalue:(@@dsptodate-@@mycwtoageing2):$$tovalue:(@@dsptodate-@@mycwfromageing2):$tbaldebits
;; {03.Sep.21 11:22} compute var: d20_30 : amount: $$fromvalue:(@@dsptodate-@@mycwtoageing3):$$tovalue:(@@dsptodate-@@mycwfromageing3):$tbaldebits
;; {03.Sep.21 11:22} compute var: d30_40 : amount : $$fromvalue:(@@dsptodate-@@mycwtoageing4):$$tovalue:(@@dsptodate-@@mycwfromageing4):$tbaldebits
;; {03.Sep.21 11:22} compute var : d40_50 :amount: $$fromvalue:(@@dsptodate-@@mycwtoageing5):$$tovalue:(@@dsptodate-@@mycwfromageing5):$tbaldebits
;; {03.Sep.21 11:22} compute var  : d50_60 : amount : $$fromvalue:(@@dsptodate-@@mycwtoageing6):$$tovalue:(@@dsptodate-@@mycwfromageing6):$tbaldebits
;; {02.Sep.21 18:16} compute var  : d50_60 : amount : $$fromvalue:(@@dsptodate-@@mycwtoageing5):$$tovalue:(@@dsptodate-@@mycwfromageing5):$tbaldebits
;; {01.Mar.19 19:07} compute: c50_60 : $$fromvalue:(@@dsptodate-50):$$tovalue:(@@dsptodate-60):$tbalcredits

; Empty field settings for second title line
local:field: amtf3: set as:"" ;;$$string:@@mycwfromageing+$$string:"-" +$$string:@@mycwtoageing  ;;+ "0-10"
local:field: amtf4: set as:"" ;;$$string:@@mycwfromageing2+$$string:"-"+$$string:@@mycwtoageing2  ;; "11-21"
local:field: amtf5: set as:"" ;;$$string:@@mycwfromageing3+$$string:"-"+$$string:@@mycwtoageing3  ;; "22-31"
local:field: amtf6: set as:"" ;;$$string:@@mycwfromageing4+$$string:"-"+$$string:@@mycwtoageing4  ;; "32-60"
local:field: amtf7: set as:"" ;;$$string:@@mycwfromageing5+$$string:"-"+$$string:@@mycwtoageing5  ;; "61-100"
local:field: amtf8: set as:"" ;;$$string:@@mycwfromageing6+$$string:"-"+$$string:@@mycwtoageing6  ;; "101-119"
local:field: amtf9: set as:"" ;;$$string:@@mycwtoageing6+$$string:" "+$$string:"And Above"  ;; "120 And Above"
local:field: amtf10: set as:"On Account"

; Set field alignment and styling for second title line
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

; Apply consistent styling to all fields
Local: Field: fwf: Style:styleCalistox2
Local: Field: nf: Style:styleCalistox2
Local: Field:amtf: Style:styleCalistox2
Local: Field:amtf1: Style:styleCalistox2
Local: Field:amtf2: Style:styleCalistox2
Local: Field:amtf3: Style:styleCalistox2
Local: Field:amtf4: Style:styleCalistox2
Local: Field:amtf5: Style:styleCalistox2
Local: Field:amtf6: Style:styleCalistox2
Local: Field:amtf7: Style:styleCalistox2
Local: Field:amtf8: Style:styleCalistox2
Local: Field:amtf9: Style:styleCalistox2
Local: Field:amtf10: Style:styleCalistox2
Local: Field:amtf20: Style:styleCalistox2
Local: Field:amtf21: Style:styleCalistox2
Local: Field:amtf22: Style:styleCalistox2
Local: Field:amtf23: Style:styleCalistox2
Local: Field: fwf: Color :Black

; ===============================================================================
; SYSTEM FORMULAS FOR AGEING PERIODS
; Defines the ageing periods used throughout the report
; ===============================================================================
[System: Formula]
mycwfromageing:$cwfromageing:COMPANY:##SVCURRENTCOMPANY
mycwfromageingx:@@mycwfromageing+1

mycwfromageing2:$cwfromageing2:COMPANY:##SVCURRENTCOMPANY
mycwfromageing2x:@@mycwfromageing2+

mycwfromageing3:$cwfromageing3:COMPANY:##SVCURRENTCOMPANY
mycwfromageing3x:@@mycwfromageing3+1

mycwfromageing4:$cwfromageing4:COMPANY:##SVCURRENTCOMPANY
mycwfromageing4x:@@mycwfromageing4

mycwfromageing5:$cwfromageing5:COMPANY:##SVCURRENTCOMPANY
mycwfromageing5x:@@mycwfromageing5+1

mycwfromageing6:$cwfromageing6:COMPANY:##SVCURRENTCOMPANY
mycwfromageing6x:@@mycwfromageing6+1

mycwfromageing7:  $cwfromageing7:COMPANY:##SVCURRENTCOMPANY
mycwfromageing7x: @@mycwfromageing7+1

mycwtoageing:$cwtoageing:COMPANY:##SVCURRENTCOMPANY
mycwtoageing2:$cwtoageing2:COMPANY:##SVCURRENTCOMPANY
mycwtoageing3:$cwtoageing3:COMPANY:##SVCURRENTCOMPANY
mycwtoageing4:$cwtoageing4:COMPANY:##SVCURRENTCOMPANY
mycwtoageing5:$cwtoageing5:COMPANY:##SVCURRENTCOMPANY
mycwtoageing6:$cwtoageing6:COMPANY:##SVCURRENTCOMPANY
mycwtoageing7:$cwtoageing7:COMPANY:##SVCURRENTCOMPANY

; ===============================================================================
; FUNCTION TO CHECK LAST NON-ZERO VALUE
; Helper function to find the last non-zero ageing period
; ===============================================================================
[function : checklastnonzero]
returns: number

10 : do if : $cwfromageing7:COMPANY:##SVCURRENTCOMPANY <> 0 : return : $cwfromageing7:COMPANY:##SVCURRENTCOMPANY
20 : do if : @@mycwfromageing6 <> 0 : return : @@mycwfromageing6
30 : do if : @@mycwfromageing5 <> 0 : return : @@mycwfromageing5
40 : do if : @@mycwfromageing4 <> 0 : return : @@mycwfromageing4
50 : do if : @@mycwfromageing3 <> 0 : return : @@mycwfromageing3
60 : do if : @@mycwfromageing2 <> 0 : return : @@mycwfromageing2
70 : do if : @@mycwfromageing  <> 0 : return : @@mycwfromageing

; ===============================================================================
; FIELD DEFINITION FOR UNADJUSTED AMOUNTS
; Defines the field for unadjusted amounts in the report
; ===============================================================================
[field:newUnAdjusted]
field:amtf21,amtf22
width:16  ;;14 ;;20

; ===============================================================================
; COLLECTION FOR RECEIPTS AND CREDIT NOTES
; Collection to track payments and credit notes
; ===============================================================================
[Collection: collreciptcrnote]
type :bills
child of:#nf1 ;;#fwf

compute:OpeningBalance1:if not $$isdr:$openingbalance then $openingbalance else ""
;; {04.Sep.21 16:01}  compute:rcptvalue:$$FilterValue:$amount:ledgerentries:1:cwreceiptmsfilter
;; {04.Sep.21 16:06}  compute:crnotevalue:$$FilterValue:$amount:ledgerentries:1:cwcrnotemsfilter

compute:rcptvalue:$$filtervalue:($$FNBillAllocTotal:@@AllocBillName):ledgerentries:1:cwreceiptmsfilter
compute:crnotevalue:$$filtervalue:($$FNBillAllocTotal:@@AllocBillName):ledgerentries:1:cwcrnotemsfilter

; ===============================================================================
; SECONDARY COLLECTION FOR RECEIPTS AND CREDIT NOTES
; Cleared version of the receipts collection
; ===============================================================================
[Collection: collreciptcrnoteb]
USE: collreciptcrnotea
cleared:yes
 
; ===============================================================================
; SYSTEM FORMULAS FOR FILTERING RECEIPTS AND CREDIT NOTES
; Defines filters for receipt and credit note vouchers
; ===============================================================================
[System: Formula]
cwreceiptmsfilter:$$isreceipt:$vouchertypename
cwcrnotemsfilter:$$iscreditnote:$vouchertypename

; ===============================================================================
; MAIN DATA LINE DEFINITION
; Defines the data line format for the report
; ===============================================================================
[Line: LnAgeingWiseOutstanding]
Fields:snfx2,fwf,nf1,dspaccname

local: field: nf1: Invisible: yes
local: field: dspdispname: Invisible: yes

right field:amtf3,amtf4,amtf5,amtf6,amtf7,amtf8,amtf9,amtf43,amtf44,amtf45,amtf46,amtf47,amtf48,amtf49,amtf50,amtf10,Amtf,newUnAdjusted,amtf23  ;;,amtf33,amtf34,amtf35,amtf36,amtf37,amtf38,amtf39,amtf40
Option: display on Enter

; Set field values for receipt and credit note data
Local: Field: amtf20: Set As:""
Local: Field: amtf21: Set As:$$CollAmtTotal:collreciptcrnote:$rcptvalue
Local: Field: amtf22: Set As:$$CollAmtTotal:collreciptcrnote:$crnotevalue
Local: Field:amtf23: Set As:$CreditLimit:ledger:$name

; Set field width for amount field
Local: field: amtf: Width: @@amountwidth * 1.5

; Configure party name field behavior
local: field: fwf: display : ledger vouchers ;;: $$isvoucher
option : alter on enter
local : field : fwf : alter : voucher : $$isvoucher
;; local : field : fwf : alter : ledger : $$isledger
;; {17.Dec.18 18:58} local:field: fwf: set as:@@mycwtoageing2 ;$name;; "Party"
local:field: fwf: set as:if $$stringlength:$name < 40 then $name else $$stringpart:$name:0:39;; "Party"
local:field: nf1: set as:$name;; "Party"

; Set branch and amount field values
local:field: nf: set as:$cwBranch:LEDGER:$parent;; "Branch"
local:field: amtf: set as:$closingbalance;; "Total Overdue"

; Set field widths for payment and credit note fields
Local: field: amtf21: Width:7 ;;6.5 ;;9.5
Local: field: amtf22: Width:8  ;;6.6 ;;9.5

; Configure number formatting for all amount fields
Local: field: amtf11: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf: Format:"decimals:0"  ;; "drcr"
Local: field: amtf1: Format: "decimals:0,nocomma"  ;;"drcr"

Local: field: amtf3: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf4: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf5: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf6: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf7: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf8: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf9: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf10: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf20: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf21: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf22: Format:"decimals:0,nocomma"  ;; "drcr"
Local: field: amtf23: Format:"decimals:0,nocomma"  ;; "drcr"

; Set ageing bucket values for each field
Local: Field:  amtf3: Set As:  $d0_10
Local: Field:  amtf4: Set As:  $d10_20
Local: Field:  amtf5: Set As:  $d20_30
Local: Field:  amtf6: Set As:  $d30_40
Local: Field:  amtf7: Set As:  $d40_50
Local: Field:  amtf8: Set As:  $d50_60
Local: Field:  amtf9: Set As:  $d60_0
Local: Field:  amtf10: Set As: $onacc

; Configure field borders and styling
;; {01.Mar.19 19:59}  local: field: default: type: String
 Local: Field: DEFAULT: Border: thin right
;; {06.Dec.21 15:07}  Local: Field: default: Border: thin left
 Local: Field: snfx2:delete: Border: thin right

 Local: field:snfx2: Width:1

; Configure field visibility based on ageing period values
;; {04.Sep.21 12:04}  local:field: amtf3: invisible :  @@mycwfromageing = 0 or @@mycwtoageing2 =0 ;; "11-21"
;; {04.Sep.21 12:04}  local:field: amtf4: invisible :  @@mycwfromageing2 = 0 or @@mycwtoageing2 =0 ;; "11-21"
;; {04.Sep.21 12:04} local:field: amtf5: invisible :  @@mycwfromageing3 = 0 or @@mycwtoageing3 =0  ;; "22-31"
;; {04.Sep.21 12:04} local:field: amtf6: invisible :  @@mycwfromageing4 = 0 or @@mycwtoageing4 =0 ;; "32-60"
;; {04.Sep.21 12:04} local:field: amtf7: invisible : @@mycwfromageing5 = 0 or @@mycwtoageing5 =0  ;; "61-100"
;; {04.Sep.21 12:04} local:field: amtf8:  invisible : @@mycwfromageing6 = 0 or @@mycwtoageing6 = 0 ;; "101-119"
local:field: amtf10:  invisible : yes
;; {04.Sep.21 12:03} local: field: default : style: style3x

; Set field widths for all amount columns
Local: field: amtf: Width:9 ;;12
Local: field: amtf1: Width:6 ;;10
Local: field: amtf2: Width:6 ;;10
Local: field: amtf3: Width:6 ;;10
Local: field: amtf4: Width:6 ;;10
Local: field: amtf5: Width:6 ;;10
Local: field: amtf6: Width:6 ;;10
Local: field: amtf7: Width:6 ;;10
Local: field: amtf8: Width:6 ;;10
Local: field: amtf9: Width:6 ;;10
Local: field: amtf10: Width:6 ;;10
Local: field: amtf11: Width:6 ;;10
Local: field: amtf12: Width:6 ;;10
Local: field: amtf23: Width:7 ;;10

; Apply styling to all fields
Local: Field:default: Style:styleCalistox
;; {04.Sep.21 14:24} Local: Field:fwf: Style:if #amtf < #amtf23 then "styleCalistox" else "styleCalistox2"
;;Local: Field: fwf: Color :if #amtf > #amtf23 then "blue" else "Black"
Local: Field: snfx2: set as :if #amtf > #amtf23 then "**" else ""
;; {04.Sep.21 14:22} Local: Field:snfx: set as:if #amtf < #amtf23 then "styleCalistox" else "styleCalistox2"

; Hide unused fields
local: field:amtf41: Invisible: yes
local: field:amtf42: Invisible: yes
local: field:amtf43: Invisible: yes
local: field:amtf44: Invisible: yes
local: field:amtf45: Invisible: yes
local: field:amtf46: Invisible: yes
local: field:amtf47: Invisible: yes
local: field:amtf48: Invisible: yes
local: field:amtf49: Invisible: yes
local: field:amtf50: Invisible: yes

; Add border between different parties
Border:Thin top:$name <> $$prevobj:$name

; ===============================================================================
; TOTALS LINE DEFINITION
; Defines the totals line at the bottom of the report
; ===============================================================================
[line: LnAgeingWiseOutstandingTotals]
use: LnAgeingWiseOutstanding
option: totalOpt
local: field: fwf: align: right
local: field: default : style: normal bold
local: field: qtyf: set as: $$total:qtyf
local:field: snfx2: set as: ""
local:field: fwf: set as:"Total";; "Party"
local:field: nf: set as:"";; "Branch"
local:field: amtf: set as:$$total:amtf;; "Total Overdue"
local:field: amtf1: set as:$$total:amtf1;; "Total Overdue"
local:field: amtf2: set as:$$total:amtf2;; "Amount"
local:field: amtf3: set as:$$total:amtf3;; "0-10"
local:field: amtf4: set as:$$total:amtf4;; "11-21"
local:field: amtf5: set as:$$total:amtf5;; "22-31"
local:field: amtf6: set as:$$total:amtf6;; "32-60"
local:field: amtf7: set as:$$total:amtf7;; "61-100"
local:field: amtf8: set as:$$total:amtf8;; "101-119"
local:field: amtf9: set as:$$total:amtf9;; "120 And Above"
local:field: amtf10: set as:$$total:amtf10;; "120 And Above"
local:field: amtf20: set as:$$total:amtf20;; "120 And Above"
local:field: amtf21: set as:$$total:amtf21;; "120 And Above"
local:field: amtf22: set as:$$total:amtf22;; "120 And Above"
local:field: amtf23: set as:$$total:amtf23;; "120 And Above"

; Apply consistent styling to all total fields
Local: Field: fwf: Style:styleCalistox2
Local: Field: nf: Style:styleCalistox2
Local: Field:amtf: Style:styleCalistox2
Local: Field:amtf1: Style:styleCalistox2
Local: Field:amtf2: Style:styleCalistox2
Local: Field:amtf3: Style:styleCalistox2
Local: Field:amtf4: Style:styleCalistox2
Local: Field:amtf5: Style:styleCalistox2
Local: Field:amtf6: Style:styleCalistox2
Local: Field:amtf7: Style:styleCalistox2
Local: Field:amtf8: Style:styleCalistox2
Local: Field:amtf9: Style:styleCalistox2
Local: Field:amtf10: Style:styleCalistox2
Local: Field:amtf20: Style:styleCalistox2
Local: Field:amtf21: Style:styleCalistox2
Local: Field:amtf22: Style:styleCalistox2
Local: Field:amtf23: Style:styleCalistox2

; ===============================================================================
; SYSTEM FORMULAS FOR TOTALS CALCULATIONS
; Formulas for calculating report totals and ratios
; ===============================================================================
[System: Formula]
amtf6total:$$total:amtf6/2
amtf40total:$$total:amtf/2
amtf6total2:@@amtf6total/@@amtf40total

`;
export default tdl;
