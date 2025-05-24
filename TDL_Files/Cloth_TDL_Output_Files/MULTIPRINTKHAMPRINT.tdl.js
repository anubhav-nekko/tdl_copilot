// Auto-generated from MULTIPRINTKHAMPRINT.TXT
const tdl = `
;; ===================================================================
;; MULTI KHAM PRINT MODULE FOR TALLY
;; ===================================================================
;; Created By: khokan on 2022-04-21 16:16, ID: 
;; Last Modified: 2022-08-02
;; Purpose: This module implements a multi-print functionality for Kham reports
;;          with customized formatting and layout options.
;; ===================================================================

;; ===================================================================
;; MENU CONFIGURATION SECTION
;; ===================================================================
;; Adding the report option to the Gateway of Tally menu
     [#menu: Gateway of Tally]
;; {23.Apr.22 12:43}         add: Option: multiprintkhamprintLock ;; : @@multiprintkhamprintDemoLock
       
;; Adding the report option to the Debug menu
     [#menu : cw_Debug_menu]   
        add: Item: before: @@locQuit: @@multiprintkhamprintReport: print Collection: collRepmultiprintkhamprint  ;;: Repmultiprintkhamprint

;; Defining the multiprintkhamprintLock menu structure
     [!menu: multiprintkhamprintLock]
        add: Item: before: @@locQuit: @@multiprintkhamprintReport: print Collection: collRepmultiprintkhamprint  ;;: Repmultiprintkhamprint
        add: Item: before: @@locQuit: Blank
        
;; ===================================================================
;; COLLECTION DEFINITIONS
;; ===================================================================
;; Main report collection definition
   [Collection: collRepmultiprintkhamprint]
   Use         : Extract Alias Collection
   Source Collection	: List of Ledgers
   Variable    : Ledger Name
   Report      :Repmultiprintkhamprint
   Trigger     : cwLedgerName1
   Fetch       : Name

;; ===================================================================
;; SYSTEM FORMULAS
;; ===================================================================
    [System: formula]
   multiprintkhamprintReport: "Multi Kham Print"
;; multiprintkhamprintDemoLock: $$MachineDate < $$Date:"01/04/2013"
     
;; ===================================================================
;; REPORT DEFINITION
;; ===================================================================
;; Main report configuration
    [Report: Repmultiprintkhamprint]
        use: Dsp Template
      Title: @@multiprintkhamprintReport
   Printset: Report Title: @@multiprintkhamprintReport
       Form: Frmmultiprintkhamprint
     Export: Yes
     set  : svfromdate : ##svcurrentdate
     set  : svTodate : ##svcurrentdate
    Local       : Button   : RelReports        : Inactive : Yes
     
;; ===================================================================
;; FORM DEFINITION
;; ===================================================================
;; Main form configuration for the report
      [Form: Frmmultiprintkhamprint]
        use: DSP Template
;; {21.Apr.22 17:58}        Part: DspAccTitles,PrtTitle0multiprintkhamprint,Prtmultiprintkhamprint
;; {22.Apr.22 09:49}        Part: PrtTitle0multiprintkhamprint,Prtmultiprintkhamprint
       Part:PrtTitle0multiprintkhamprint,Prtmultiprintkhamprint
      Width: 100% Page
     Height: 100% Page
 Background: @@SV_STOCKSUMMARY
     delete: page break
;; {22.Apr.22 09:51}         add: page break: multiprintkhamprintbotbrk ,multiprintkhamprintbotOpbrk

;; Bottom toolbar configuration
Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
;;    local : button : report config : action :modify variable: MyPLConfigure

;; ===================================================================
;; PAGE BREAK PARTS
;; ===================================================================
;; Bottom page break definition
      [part: multiprintkhamprintbotBrk]
       line: EXPINV PageBreak
;; {22.Apr.22 11:17}      border: thin top
;; {22.Apr.22 11:19} line:LnmultiprintAGENTWISEOutstandingReportTitlekham

;; Bottom opening page break definition
      [part: multiprintkhamprintbotopbrk]
   add: part: multiprintAGENTWISEOutstandingReportTitlePartkham

;; ===================================================================
;; TITLE PARTS
;; ===================================================================
;; Agent-wise outstanding report title part
  [part: multiprintAGENTWISEOutstandingReportTitlePartkham]
   use: dspacctitles
   add: part: multiprintkhamprintTitlePart

;; Hide standard report elements to customize the layout
      local:Part: DSP ReportTime:Invisible:yes
      local:Part: DSP CompanyName:Invisible:yes
      local:Part: DSP GCC CmpRegnNo:Invisible:yes
      local:Part: DSP GSTCmpRegnNo:Invisible:yes
      local:Part: DSP ReportTitle:Invisible:yes
      local:Part: DSP PageNo:Invisible:yes
      local:Part: DSP CompanyAddress:delete:Repeat  : DSP CompanyAddress  :  Company Address

;; Custom title part definition
      [part: multiprintkhamprintTitlePart]
       line: cwblankline
       
;; ===================================================================
;; LINE DEFINITIONS FOR TITLES
;; ===================================================================
;; Line definition for agent-wise outstanding report title
      [LINE:LnmultiprintAGENTWISEOutstandingReportTitlekhamX]
      FIELD:NF,NF1
      Local: Field: NF1: Set As:$NAME
       Local: Field: NF: Set As:IF $$LINE=2 THEN "AAAAAAAAAA" ELSE "BBBBBBBBBBBBBBBBBBB"
;; {22.Apr.22 12:58}        invisible : $$prevobj:$name <> $name
       
;; Current period line definition
      [line: LnmultiprintkhamprintCurrPeriod]
      field: fwf,fwf2
      Local: field: fwf2: Align: Right
      Local: Field: fwf: Style: normal bold
      Local: Field: fwf2: Style: normal bold
      Local: Field: fwf2: Set As:"";; @@dspDateStr
      Local: Field: fwf: Set As:"";;##LedgerName
   Local: Field: fwf2:invisible: $$inprintmode

;; Title part definition
      [part: PrtTitle0multiprintkhamprint]
      line : LnmultiprintkhamprintCurrPeriod
      
;; ===================================================================
;; MAIN PRINT PART
;; ===================================================================
      [Part: Prtmultiprintkhamprint]
 Line: multikhamprintledgerx ;;,LnmultiprintAGENTWISEOutstandingReportTitle ;;,LnmultiprintAGENTWISEOutstandingReport

;; {22.Apr.22 12:31}      set : 1

;; Configure vertical scrolling and totals
     repeat: multikhamprintledgerx : Colmultiprintkhamprint
     scroll: Vertical
;; Common Border: YEs
      Total: Qtyf,amtf,amtf1,amtf2

;; ===================================================================
;; COLLECTION DEFINITIONS FOR DATA
;; ===================================================================
;; Main collection for multi-print data
[Collection: Colmultiprintkhamprint]
Type :ledger
;; {21.Apr.22 16:19} child of: $$groupsundrydebtors
belongs to : yes
fetch : *
Fetch: BillDate, Name, Parent,BillDueDate,ClosingBalance,cwcaption1item
filter:cwnotcloingbalancemultiprint ;;,cwnotcloingbalancemultiprintdrcr

;; ===================================================================
;; LEDGER LINE DEFINITIONS
;; ===================================================================
;; Main ledger line definition
 [line:multikhamprintledgerx]
;; {22.Apr.22 13:34}  line: LnmultiprintAGENTWISEOutstandingReportTitlekhamXy
 line:multikhamprintledger
 
;; {22.Apr.22 13:04}  option : addHeader : $$LineNumber = $$FirstLineNumber
 
;; Line for displaying ledger name
 [line : LnmultiprintAGENTWISEOutstandingReportTitlekhamXy]
 field : nf,nf2
 Local: Field: nf: Set As: $name
 Local: Field: nf2: Set As: $$prevobj:$name
 
;; Main ledger line with fields configuration
 [line:multikhamprintledger]
 field:nf,fwf,newsf
 Local: Field: fwf: Set As: $name

 ;; Force next page for each ledger
  next page :yes

 ;; Configure field width
 Local: field: nf: Width:16 ;;29.2
 
;; Configure top spacing (updated on Aug 2, 2022)
;; {02.Aug.22 14:31} space top  :##spacetopnewKham inch
space top  :3 inch
   
;; Add exploded parts for address and outstanding details
add:explode:Lnmultiprintleaddresskham
add:explode:LnmultiprintAGENTWISEoskham

;; Set default field style
local: field: default : style:small bold

;; Page break configurations
;; {22.Apr.22 12:48} add: page break : cwCLPageBreak,cwOPPageBreak
;; {22.Apr.22 12:51} add : page break : LnmultiprintAGENTWISEOutstandingReportTitlekhamX,

;; ===================================================================
;; PAGE BREAK PARTS
;; ===================================================================
;; CL page break definition
[part : cwCLPageBreak]
line: cwCLPageBreak
[line: cwCLPageBreak]
field : nf
Local: Field: nf: Set As: "b"

;; OP page break definition
[part: cwOPPageBreak]
line : cwOPPageBreal
[line:cwOPPageBreak]
field : nf
Local: Field: nf: Set As:"a"

;; News field definition (hidden)
     [field:newsf]
     use:nf
     Set As:$name
     Invisible: yes
     
;; ===================================================================
;; ADDRESS PARTS
;; ===================================================================
;; Ledger address part definition
 [part:Lnmultiprintleaddresskham]
 line:multiprintAGENTbilldetailpartaddxkham,multiprintAGENTbilldetailpartadd2xkham,multiprintAGENTbilldetailpartphxkham

    ;;DIRECT 1,DRT

;; Address line 1 definition
[line:multiprintAGENTbilldetailpartaddxkham]
field:nf,fwf
Local: Field: fwf: Set As:$$CollectionField:$address:First:collcwLedgeraggaddress1kham
;; {21.Apr.22 16:58} local: field: fwfc : style:styleCalisto
 delete:explode
 Local: field: FWF: Align:LEFT
 Local: field: nf: Width:16 ;29.2
  local: field: default : style:small
  
;; Address line 2 definition
[line:multiprintAGENTbilldetailpartadd2xkham]
field:nf,fwf
Local: Field: fwf: Set As:$$CollectionField:$address:2:collcwLedgeraggaddress1kham
;; {21.Apr.22 16:58} local: field: fwfc : style:styleCalisto
  delete:explode
 Local: field: FWF: Align:LEFT
Local: field: nf: Width:16 ;29.2
local: field: default : style:small

;; Phone details line definition
[line:multiprintAGENTbilldetailpartphxkham]
field:nf,fwf,nf9
 Local: Field: fwf: Set As:"Phone."+" "+$LedgerPhone:ledger:#newsf+"    "+$LedgerMobile:ledger:#newsf
;; {21.Apr.22 16:58}        local: field: FWFc : style:styleCalisto
  Local: field: FWF: Align:LEFT
  delete:explode
Local: field: nf: Width:16 ;29.2
local: field: default : style:small bold
 
;; Address collection definition
[Collection: collcwLedgeraggaddress1kham]
type : address : ledger
  child of :#fwf

;; ===================================================================
;; OUTSTANDING REPORT PARTS
;; ===================================================================
;; Agent-wise outstanding report part
 [part:LnmultiprintAGENTWISEoskham]
 line:LnmultiprintAGENTWISEOutstandingReportTitlekham,LnmultiprintAGENTWISEOutstandingReportkham
 repeat:LnmultiprintAGENTWISEOutstandingReportkham;;  :ColmultiprintAGENTWISEOutstandingReportaa
 set:$$multiRepeatControlkham
;; {06.Sep.21 10:05}  Total: Qtyf,amtf,amtf1,amtf2
  common border:yes
;; {22.Apr.22 13:33}   add: page break : cwCLPageBreak,cwOPPageBreak
;; {22.Apr.22 13:33}   srcoll: vertical

;; Function to control repeat count based on DR/CR items
 [Function: multiRepeatControlkham]
 variable: drcount : number : $$numitems:ColmultiprintAGENTWISEOutstandingReportakham
 variable: crcount : number : $$numitems:ColmultiprintAGENTWISEOutstandingReportbkham

 10 : do if : ##drcount > ##crcount : return :##drcount
 20 : return : ##crcount

;; ===================================================================
;; COLLECTIONS FOR OUTSTANDING REPORTS
;; ===================================================================
;; Collection for DR outstanding items
 [Collection: ColmultiprintAGENTWISEOutstandingReportakham]
TYPE:BILLS
filter:ColmultiprintAGENTWISEOutstandingReportFilterdrmkp
child of:#fwf

;; System formulas for filtering CR and DR items
 [system: Formula]
 ColmultiprintAGENTWISEOutstandingReportFiltercrmkp:if $cwcaption1item:ledger:$parent=##LedgerName then not $$isdr:$closingbalance else no
 ColmultiprintAGENTWISEOutstandingReportFilterdrmkp:if $cwcaption1item:ledger:$parent=##LedgerName then $$isdr:$closingbalance else no

;; Collection for CR outstanding items
[Collection: ColmultiprintAGENTWISEOutstandingReportbkham]
TYPE:BILLS
child of:#fwf
filter:ColmultiprintAGENTWISEOutstandingReportFiltercrmkp
fetch:ledgerentries.ledgerentries.vouchertypename
sort:@@default:$parent

;; ===================================================================
;; OUTSTANDING REPORT TITLE LINE
;; ===================================================================
;; Title line for outstanding report
[Line: LnmultiprintAGENTWISEOutstandingReportTitlekham]
use: LnmultiprintAGENTWISEOutstandingReportkham
option: titleopt
local:field: sdf: set as: "DATE"
local:field: snf1: set as: "DATE"
local:field: snf: set as: "BILL NO"
local:field: fwf: set as: "BILL NO"
local:field: nf: set as: "BILL NO"
;; {30.Aug.21 11:58} local:field: fwf: set as: ""
local:field: numf: set as:"Due Days"
local:field: amtf: set as: "BILL AMT"
local:field: sdf2: set as: "DATE"
local:field: nf1: set as: "PARTICULARS"
local:field: amtf2: set as: "Amount"

;; Set styles for title fields
local: field: snf1 : style:small bold
local: field: sdf : style:small bold
local: field: sdf2 : style:small bold
local: field: snf : style:small bold
local: field: nf : style:small bold
local: field: nf1 : style:small bold
local: field: amtf : style:small bold
local: field: amtf2 : style:small bold

Local: field:fwf: Align:left
delete:explode

;; ===================================================================
;; SYSTEM FORMULAS FOR DATE FORMATTING
;; ===================================================================
[System: Formula]
cwmultiduedays:@@DSPToDate - $BillDate
cwvchtypenamems: $$CollectionField:$vouchertypename:First:ledgerentries

cwModeofcreditmulti:if @@cwvchtypenamems="Receipt" then (if not $$isempty:@@cwTransactionTypec  then @@cwTransactionTypec else "Cash") else @@cwModeofcredit

multiprintAGENTbilldate:$$CollectionField:$billdate:$$line:ColmultiprintAGENTWISEOutstandingReportakham

;; Date formatting formulas
[System: Formula]
cwBILLDays1mpdate: $$DAYOFDATE:@@multiprintAGENTbilldate
CWbillMON1mpdate : $$MONTHOFDATE:@@multiprintAGENTbilldate
CWbillYR1mpdate : $$YEAROFDATE:@@multiprintAGENTbilldate -  2000

cwbillDays2mpdate : if @@cwBILLDays1mpdate < 10 then "0" + $$string:@@cwBILLDays1mpdate else $$string:@@cwBILLDays1mpdate
CWbillMON2mpdate  : if @@CWbillMON1mpdate < 10 then "0"+$$string:@@CWbillMON1mpdate else $$string:@@CWbillMON1mpdate
CWbillYR2mpdate  : if @@CWbillYR1mpdate < 10 then "0"+$$string:@@CWbillYR1mpdate else $$string:@@CWbillYR1mpdate

 ;; DHANRAJ JAJOO
 
 ;; AGARWAL SAREE HOUSE,ORBHU/DHJ

;; ===================================================================
;; OUTSTANDING REPORT LINE DEFINITION
;; ===================================================================
;; Main line for outstanding report details
[Line: LnmultiprintAGENTWISEOutstandingReportkham]
field:snf9,snf1,nf,Amtf,sdf2,nf1,amtf2,nf9 ;;,snf1,snf2,Amtf2,nf9  ;;,amtf20,amtf21,amtf22,amtf23

;; Configure field widths
Local: field: sdf: Width:12
Local: field: nf: Width:20 ;22

;;remove if:$$isempty:#amtf or #amtf2

Option: Alter on Enter
Local: Field: snf10: Set As:$name

;; Set field values based on collection data
local:field: sdf: set as:if $$isempty:#amtf then "" else $$CollectionField:$billdate:$$line:ColmultiprintAGENTWISEOutstandingReportakham ;;if $$ISDR:$closingbalance then $billdate else "";; "Date"

;; Format date as DD/MM/YY
local:field: Snf1: set as:if $$isempty:#amtf then "" else $$string:@@cwbillDays2mpdate+$$string:"/"+$$string:@@CWbillMON2mpdate+$$string:"/"+$$string:@@CWbillYR2mpdate

;; Set bill number field (updated on May 26, 2022)
;; {26.May.22 11:03} local:field: fwf: set as:if $$isempty:#amtf then "" else $$CollectionField:$name:$$line:ColmultiprintAGENTWISEOutstandingReportakham  ;;if $$ISDR:$closingbalance then $name else ""  ;; "Bill No"
local:field: fwf: set as:$$CollectionField:$name:$$line:ColmultiprintAGENTWISEOutstandingReportakham  ;;if $$ISDR:$closingbalance then $name else ""  ;; "Bill No"
;; {22.Apr.22 09:42} local:field: fwf: set as:$$CollectionField:$parent:$$line:ColmultiprintAGENTWISEOutstandingReporta  ;;if $$ISDR:$closingbalance then $name else ""  ;; "Bill No"
local:field: nf: set as:$$CollectionField:$name:$$line:ColmultiprintAGENTWISEOutstandingReportakham

;; Set due days field
local:field: numf: set as:$$CollectionField:@@cwmultiduedays:$$line:ColmultiprintAGENTWISEOutstandingReportakham

;; Set bill amount field for DR items
local:field: amtf: set as:$$CollectionField:$closingbalance:$$line:ColmultiprintAGENTWISEOutstandingReportakham ;;if $$ISDR:$closingbalance then $closingbalance else "" ;; "Bill Amt"

;; Set fields for CR items
local:field: sdf2: set as:if $$isempty:#amtf2 then "" else $$CollectionField:$billdate:$$line:ColmultiprintAGENTWISEOutstandingReportbkham ;;if not $$ISDR:$closingbalance then $billdate else ""
local:field: nf1: set as:if $$isempty:#amtf2 then "" else $$CollectionField:$name:$$line:ColmultiprintAGENTWISEOutstandingReportbkham ;;if not $$ISDR:$closingbalance then $billdate else ""

;; Set voucher type field (updated on Sep 4, 2021)
;; {04.Sep.21 18:27} local:field: snf2: set as:$$CollectionField:@@cwvchtypenamems:$$line:ColmultiprintAGENTWISEOutstandingReportb
local:field: snf2: set as:if $$isempty:#amtf2 then "" else $$CollectionField:@@cwModeofcreditmulti:$$line:ColmultiprintAGENTWISEOutstandingReportbkham

;; Set amount field for CR items
local:field: amtf2: set as:$$CollectionField:$closingbalance:$$line:ColmultiprintAGENTWISEOutstandingReportbkham  ;;if not $$ISDR:$closingbalance then $closingbalance else "" ;; "Bill Amt"

;; Calculate running totals
Local: Field: amtf20: Set As:if $$line=1 then #amtf else $$prevlinefield+#amtf
Local: Field: amtf21: Set As:if $$line=1 then #amtf2 else $$prevlinefield+#amtf2

Local: Field: amtf22: Set As:if $$line=1 then #amtf else $$prevlinefield+#amtf
Local: Field: amtf23: Set As:if $$line=1 then #amtf2 else $$prevlinefield+#amtf2

;;Local: Field: amtf4: Set As:if $$line=1 then #amtf2 else if $parent <> $$prevobj:$parent then #amtf2 else $$prevlinefield+#amtf2

;; Hide calculation fields
;; {04.Sep.21 18:41} local: field: amtf3: Invisible: yes
local: field: amtf20: Invisible: yes
local: field: amtf21: Invisible: yes
local: field: amtf22: Invisible: yes
local: field: amtf23: Invisible: yes
local: field: amtf4: Invisible: yes

;; Configure field alignment and formatting
Local: field: SDF2: Align:LEFT

Local: field: snf9: Width:30
Local: field: nf9: Width:37.5

local: field: default : style:small
 space top:0.3
delete:explode
Local: Field: sdf2: Border: thin left
 Local: Field:default: delete:Border: thin top bottom

;; Add page breaks
;; {22.Apr.22 13:32}  add: page break:cwblankline,LnmultiprintAGENTWISEOutstandingReportTitlekhamX

;; ===================================================================
;; SUBTOTAL PARTS
;; ===================================================================
;; Subtotal part definition
[part:cwmultisubtotalkham]
line:cwmultisubtotalkham,cwmultisubtotal2kham,cwmultisubtotal3kham

;; First subtotal line - Bill Total
[line:cwmultisubtotalkham]
use: LnmultiprintAGENTWISEOutstandingReportkham
delete: explode
option: totalOpt

local:field: sdf: set as:"";; "Date"
local:field: sdf2: set as:"";; "Date"
local:field: snf: set as:""  ;; "Bill No"
local:field: nf: set as:""  ;; "Bill No"
local:field: snf2: set as:"Payment Total"  ;; "Bill No"
local:field: fwf: set as:"Bill Total"  ;; "Bill No"
local:field: numf: set as:""
local: field: sdf2: type: String

;; Set total amounts
local:field: amtf: set as:#amtf20  ;;$$total:amtf
local:field: amtf20: set as:$$prevlinefield
local:field: amtf21: set as:$$prevlinefield
local:field: amtf22: set as:$$prevlinefield
local:field: amtf23: set as:$$prevlinefield

local:field: amtf4: set as:$$prevlinefield
local:field: amtf2: set as:#amtf21
Local: field: fwf: Align: Right ;;centre

;; Blank line between subtotals
[line:cwmultisubtotal3kham]
field:nf

;; Second subtotal line - Net Outstanding
[line:cwmultisubtotal2kham]
use: LnmultiprintAGENTWISEOutstandingReportkham
delete: explode
option: totalOpt

local:field: sdf: set as:"";; "Date"
local:field: sdf2: set as:"";; "Date"
local:field: snf: set as:""  ;; "Bill No"
local:field: nf: set as:""  ;; "Bill No"
local:field: snf2: set as:""  ;; "Bill No"
local:field: nf: set as:"Net O/s"  ;; "Bill No"
local:field: numf: set as:""
local: field: sdf2: type: String

;; Calculate net outstanding amount
local:field: amtf: set as:$$nettamount:#amtf22:#amtf23  ;;$$total:amtf
local:field: amtf20: set as: $$prevlinefield
local:field: amtf22: set as:$$prevlinefield
local:field: amtf23: set as:$$prevlinefield
local:field: amtf4: set as:" ";;$$prevlinefield
local:field: amtf2: set as:"" ;;#amtf21
Local: field: fwf: Align: Right ;;centre

 local: field: sdf : style:styleCalisto2
local: field: sdf2 : style:styleCalisto2
local: field: sdf : style:styleCalisto2
local: field: sNf : style:styleCalisto2
local: field: sNf2 : style:styleCalisto2
local: field: fwf : style:styleCalisto2
local: field: nf : style:styleCalisto2
local: field: numf : style:styleCalisto2
local: field: amtf : style:styleCalisto2
local: field: amtf2 : style:styleCalisto2
          

`;
export default tdl;
