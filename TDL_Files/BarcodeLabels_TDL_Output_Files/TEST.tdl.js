// Auto-generated from TEST.TXT
const tdl = `
;===============================================================================
; TEST.TXT
; Created By: Pg on 2013-01-09 19:22, ID:
; Purpose: Provides a test utility for Tally that allows sorting and clearing
;          part numbers (mailing names) for stock items, with a report to view
;          items sorted by name, part no, or alias, and batch operations.
;===============================================================================

;------------------------------------------------------------------------------
; (Commented) Optionally add test report to Gateway of Tally menu
;------------------------------------------------------------------------------
;; [#menu: Gateway of Tally]
;;    add: Option: testLock ;;testDemoLock

;------------------------------------------------------------------------------
; Add "Details..." and "Empty Part No" buttons to Stock Items menu
;------------------------------------------------------------------------------

[#menu : stock items] ;;Inventory Info.]
add : button : cwcheck,cwEmptyPArtNo

;------------------------------------------------------------------------------
; "Details..." button: Shows the test report for stock items (F8)
;------------------------------------------------------------------------------

[Button : cwcheck]
title :"Details..."
key : f8
action: display : reptest

;------------------------------------------------------------------------------
; Variable for sort mode (1=Name, 2=Part No, 3=Alias)
;------------------------------------------------------------------------------

[variable : num1x]
type : number
default : 1

[system:variable]
num1x : 1

;------------------------------------------------------------------------------
; "Empty Part No" button: Clears all part numbers (mailing names) from stock items (F9)
;------------------------------------------------------------------------------

[button : cwEmptyPArtNo]
title :"Empty Part No"
key : f9
action : call : cwEmptyPartNo

[function : cwEmptyPartNo]
  01xx : QueryBox:"Clear All Part Nos?":Yes:No
  02xx : do if : not $$lastresult : continue
  variable : myLastNo : number : @@cwnewno
  variable : totctr : number : $$numitems:MyNewItemsx

    05 : start progress : ##totctr : "Emptying Part Nos" : "" : "Please Wait ..."
    10 : walk collection :  MyNewItemsx
    20 : modify object : (stockitem,$name).mailingname[1].mailingname : ""
;    30 : set : myLastno : ##mylastno + 1
    40 : show progress : $$loopindex
    100 : end walk
    120 : end  progress

;------------------------------------------------------------------------------
; Collection: All stock items with a non-empty mailing name (part no)
;------------------------------------------------------------------------------

[collection : MyNewItemsx]
use : stock item
filter : cwhasmailingc

[System: Formula]
cwhasmailingc : not $$isempty:$mailingname

;------------------------------------------------------------------------------
; (Commented) Optionally add test report to menu with lock
;------------------------------------------------------------------------------

[!menu: testLock]
    add: Item: before: @@locQuit: @@testReport: Display: Reptest
    add: Item: before: @@locQuit: Blank

[System: formula]
testReport: "Details"
;; testDemoLock: $$MachineDate < $$Date:"02-02-2013"

;------------------------------------------------------------------------------
; Main "Details" report definition
;------------------------------------------------------------------------------

[Report: Reptest]
    use: Dsp Template
    Title: @@testReport
    Printset: Report Title: @@testReport
    Form: Frmtest
    Export: Yes
;;    set  : svfromdate : ##svcurrentdate
;;    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable : num1x
    set : num1x : 1

[Form: Frmtest]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0test,Prttest
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: testbotbrk,testbotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12

button : cwsortbyName,cwSortByPartNo,cwSortbyAlias

;------------------------------------------------------------------------------
; Sorting buttons for the report (F4=Name, F5=Part No, F6=Alias)
;------------------------------------------------------------------------------

[button: cwsortbyName]
key : f4
title :"By Name"
action : set : num1x : 1

[button: cwSortByPartNo]
key : f5
title :"By Part No"
action : set : num1x : 2

[button: cwSortbyAlias]
key : f6
title :"By Alias"
action : set : num1x : 3

;------------------------------------------------------------------------------
; Page break and title parts for the report
;------------------------------------------------------------------------------

[part: testbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: testbotopbrk]
    use: dspacctitles
    add: part: testTitlePart

[part: testTitlePart]
    line: LntestTitle

[line: LntestCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As: if ##num1x = 1 then "By Name" else if ##num1x = 2 then "By Part No" else "By Alias"
    invisible: $$inprintmode

[part: PrtTitle0test]
    line : LntestCurrPeriod

;------------------------------------------------------------------------------
; Main data part: repeat lines for each item, sorted by selected mode
;------------------------------------------------------------------------------

[Part: Prttest]
    Line: LntestTitle,Lntest
    bottom Line: LntestTotals
    repeat: Lntest: Coltest
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf

[Collection: Coltest]
use : newItemColl
with alias : yes
sort : @@Default :@@mysort

[system: Formula]
ColtestFilter: Yes
mysort : if ##num1x = 1 then $name else if ##num1x = 2 then $mailingname else $$alias

;------------------------------------------------------------------------------
; Column headers for the report
;------------------------------------------------------------------------------

[Line: LntestTitle]
    use: Lntest
    option: titleopt
    local:field: qtyf: set as: "Qty."
    local:field: amtf: set as: "Value"
    local:field: ratepf : set as : "Rate"
    local: field: default : style: normal bold
    Local: Field: nf: Set As: "Name"
    Local: Field: nf2: Set As: "Part No"
    Local: Field: nf3: Set As: "Alias"

;------------------------------------------------------------------------------
; Main data line: item details
;------------------------------------------------------------------------------

[Line: Lntest]
    field : nf,nf2,nf3
    Local: Field: nf: Set As: $name
    Local: Field: nf2: Set As: $mailingname
    Local: Field: nf3: Set As: $$alias
    option : alter on enter
    local : field : nf : alter : stockitem : $$isstockitem
    Local: field: default: Width:100

;------------------------------------------------------------------------------
; Totals line for the report
;------------------------------------------------------------------------------

[line: LntestTotals]
    use: Lntest
    option: totalOpt
    local: field: fwf: align: right
    local: field: default : style: normal bold
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    local: field: amtf : set as :  $$total:amtf

`;
export default tdl;
