// Auto-generated from AGENTWISEAGEINGREPORT.TXT
const tdl = `
;===============================================================================
; AGENTWISEAGEINGREPORT.TXT
; Created By: Khokan on 2021-06-10 13:36, ID:
; Purpose: Implements an "Agent Wise Ageing Report" in Tally, showing outstanding
;          balances by period buckets (e.g., 0–30, 31–60 days, etc.) per party/agent.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
    ;;  add: Option: AgentWiseAgeingReportLock ;; : @@AgentWiseAgeingReportDemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AgentWiseAgeingReportReport: Display Collection: collRepAgentWiseAgeingReport

[!menu: AgentWiseAgeingReportLock]
    add: Item: before: @@locQuit: @@AgentWiseAgeingReportReport: Display Collection: collRepAgentWiseAgeingReport ;;: RepAgentWiseAgeingReport
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AgentWiseAgeingReportReport: "Agent Wise Ageing Report"
    ;; AgentWiseAgeingReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN COLLECTION: Cost Centres for Agent Wise Ageing Report
;------------------------------------------------------------------------------

[Collection: collRepAgentWiseAgeingReport]
    Use         		: Extract Alias Collection
    Source	Collection	: List of Cost Centres
    Title       		: $$LocaleString:"List of Cost Centres"
    Format      		: $CstCatName
    Filter      		: CostCentreFilter
    Report      		: RepAgentWiseAgeingReport
    Variable    		: SCostCentre
    Trigger     		: SCostCentreAgent
    Fetch			: Category, CstCatName, ForPayroll

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION: Agent Wise Ageing Report
;------------------------------------------------------------------------------

[Report: RepAgentWiseAgeingReport]
    use: Dsp Template
    Title: @@AgentWiseAgeingReportReport
    Printset: Report Title: @@AgentWiseAgeingReportReport
    Form: FrmAgentWiseAgeingReport
    Export: Yes
    ;; set  : svfromdate : ##svcurrentdate
    ;; set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable:str3,str2,str4,str5
    set:str2:""

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmAgentWiseAgeingReport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0AgentWiseAgeingReport,PrtAgentWiseAgeingReport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AgentWiseAgeingReportbotbrk,AgentWiseAgeingReportbotOpbrk
    Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    add:button:cwagentbotton

    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:style3n
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: AgentWiseAgeingReportbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AgentWiseAgeingReportbotopbrk]
    use: dspacctitles
    add: part: AgentWiseAgeingReportTitlePart

[part: AgentWiseAgeingReportTitlePart]
    line: LnAgentWiseAgeingReportTitle

[line: LnAgentWiseAgeingReportCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: style2x
    Local: Field: fwf2: Style: stylex
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As:##LedgerName
    Local: Field: fwf:invisible: $$inprintmode

[part: PrtTitle0AgentWiseAgeingReport]
    line : LnAgentWiseAgeingReportCurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH PARTY/AGENT
;------------------------------------------------------------------------------

[Part: PrtAgentWiseAgeingReport]
    Line: LnAgentWiseAgeingReportTitle,LnAgentWiseAgeingReportTitle2,LnAgentWiseAgeingReport
    bottom Line: LnAgentWiseAgeingReportTotals
    repeat: LnAgentWiseAgeingReport: ColAgentWiseAgeingReport
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf,amtf1,amtf2,amtf3,amtf4,amtf5,amtf6,amtf7,amtf8,amtf9,amtf10,amtf11,amtf12

;------------------------------------------------------------------------------
; AGGREGATED COLLECTION: Agent Wise Ageing Data with Period Buckets
;------------------------------------------------------------------------------

[Collection: ColAgentWiseAgeingReport]
    source Collection: ColAgentWiseAgeingReport2
    by:parent:$parent
    by:name:$name
    by:billdate:$billdate
    aggr compute : closingbalance :sum:$closingbalance
    aggr compute : openingBalance1 :sum:if not $$isdr:$openingBalance  then $openingBalance else ""
    aggr compute:cw30daysval:sum:if @@cwForPeriod < 30 then $closingbalance else $$initvalue:"Amount"
    aggr compute:cw60daysval: sum:if (@@cwForPeriod > 31 and @@cwForPeriod <=60) and $$isdr:$closingbalance then $closingbalance else $$initvalue:"Amount"
    aggr compute:cw90daysval:sum:  if (@@cwForPeriod > 61 and @@cwForPeriod <=90) and $$isdr:$closingbalance then $closingbalance else $$initvalue:"Amount"
    aggr compute:cw120daysval:sum:  if (@@cwForPeriod > 91 and @@cwForPeriod <=120) and $$isdr:$closingbalance then $closingbalance else $$initvalue:"Amount"
    aggr compute:cw150daysval:sum:  if (@@cwForPeriod > 121 and @@cwForPeriod <=150) and $$isdr:$closingbalance then $closingbalance else $$initvalue:"Amount"
    aggr compute:cw180daysval:sum:  if (@@cwForPeriod > 151 and @@cwForPeriod <=180) and $$isdr:$closingbalance then $closingbalance else $$initvalue:"Amount"
    aggr compute:cw180daysvalmore:sum:  if @@cwForPeriod > 180 and $$isdr:$closingbalance then $closingbalance else $$initvalue:"Amount"
    compute:cw180daysvalmore1:@@cwnetamt1cled180
    cwisrcpt:$$isreceipt:$vouchertypename
    cwForPeriod: $billDate-##SVFromDate

;------------------------------------------------------------------------------
; RAW BILLS COLLECTION: For Each Party/Agent
;------------------------------------------------------------------------------

[Collection: ColAgentWiseAgeingReport2]
    type :bills
    child of:$name
    fetch : billcreditperiod
    sort: @@default:$parent
    fetch:cwcaption1vch
    filter:salespersonfilms,cwagentagefilter

[System: Formula]
    cwagentagefilter:if $$issysname:##str2 then yes else $parent =##str2
    salespersonfilms:#LedgerName=$cwcaption1vch
    forperiod:@@dsptodate - $billcreditperiod

;------------------------------------------------------------------------------
; COLUMN HEADERS: Main Title Line
;------------------------------------------------------------------------------

[Line: LnAgentWiseAgeingReportTitle]
    use: LnAgentWiseAgeingReport
    option: titleopt4
    local:field: fwf: set as: "Party Name"
    local:field: amtf: set as: "0-30"
    local:field: amtf2: set as: "31-60"
    local:field: amtf3: set as: "61-90"
    local:field: amtf4: set as: "91-120"
    local:field: amtf5: set as: "121-150"
    local:field: amtf6: set as: "151-180"
    local:field: amtf7: set as: "Over 180"
    Local: Field:amtf8: Set As:"Total"
    Local: Field:unadjustedf: Set As:"Un-Adjusted"
    Local: Field:amtf11: Set As:"Interest"
    Local: Field:amtf12: Set As:"Party "
    Local: Field: unadjustedf: Sub title : Yes
    local : field : unadjustedf :Align:centre
    local: field: fwf : style:style2x
    local: field: amtf : style: style2x
    local: field: unadjustedf : style: style2x
    local: field: amtf2 : style: style2x
    local: field: amtf3 : style: style2x
    local: field: amtf4 : style: style2x
    local: field: amtf5 : style:style2x
    local: field: amtf6 : style: style2x
    local: field: amtf7 : style: style2x
    local: field: amtf8 : style:style2x
    local: field: amtf9 : style:style2x
    local: field: amtf10 : style:style2x
    local: field: amtf11 : style: style2x
    local: field: amtf12 : style:style2x
    Local: field: default: Align:centre
    Local: field: fwf: Align:left
    Local: Field: unadjustedf: Border: thin bottom

;------------------------------------------------------------------------------
; COLUMN HEADERS: Subtitle Line
;------------------------------------------------------------------------------

[Line: LnAgentWiseAgeingReportTitle2]
    use: LnAgentWiseAgeingReport
    option: titleopt3
    local:field: fwf: set as: ""
    local:field: amtf: set as: ""
    local:field: amtf2: set as: ""
    local:field: amtf3: set as: ""
    local:field: amtf4: set as: ""
    local:field: amtf5: set as: ""
    local:field: amtf6: set as: ""
    local:field: amtf7: set as: "Days"
    Local: Field:amtf8: Set As:"Outstanding"
    Local: Field:amtf9: Set As:"Payment"
    Local: Field:amtf1: Set As:"Opening"
    Local: Field:amtf10: Set As:"Credit Note"
    Local: Field:amtf11: Set As:""
    Local: Field:amtf12: Set As:"Credit Limit"
    Local: field: amtf9: Align:centre
    Local: field: amtf10: Align:centre
    local: field: fwf : style:style2x
    local: field: amtf : style: style2x
    local: field: amtf2 : style:style2x
    local: field: amtf3 : style: style2x
    local: field: amtf4 : style: style2x
    local: field: amtf5 : style: style2x
    local: field: amtf6 : style: style2x
    local: field: amtf7 : style: style2x
    local: field: amtf8 : style: style2x
    local: field: amtf9 : style: style2x
    local: field: amtf10 : style: style2x
    local: field: amtf1 : style: style2x
    local: field: amtf11 : style: style2x
    local: field: amtf12 : style: style2x
    Local: field: default: Align:centre
    Local: field: fwf: Align:left

;------------------------------------------------------------------------------
; MAIN DATA LINE: DISPLAY PARTY/AGENT AGEING DETAILS
;------------------------------------------------------------------------------

[Line: LnAgentWiseAgeingReport]
    Fields:sdf,snf1,fwf
    right field:amtf25,Amtf,Amtf2,Amtf3,Amtf4,Amtf5,Amtf6,Amtf7,Amtf8,unadjustedf,amtf20,Amtf11,Amtf12
    Local: Field: amtf25: Set As:$cw180daysvalmore1
    Local: Field: snf9: Set As:$cwcaption1vch
    local:field: sdf: set as:$billdate
    local:field: snf1: set as:$name
    local:field: fwf: set as:$parent
    local:field: amtf: set as:if $$isempty:$cw30daysval then "" else (if $$isdr:@@cwover30totalosamtx then $$NettAmount:$cw30daysval:@@cwover30totalosamt else "")
    local:field: amtf2: set as:if $$isempty:$cw60daysval then "" else if $$isdr:@@cwover30totalosamt then $$NettAmount:$cw60daysval:@@cwover60totalosamt else ""
    local:field: amtf3: set as:if $$isempty:$cw90daysval then "" else if $$isdr:@@cwover60totalosamt then $$NettAmount:$cw90daysval:@@cwover90totalosamt else ""
    local:field: amtf4: set as:if $$isempty:$cw120daysval then "" else if $$isdr:@@cwover90totalosamt then $$NettAmount:$cw120daysval:@@cwover120totalosamt else ""
    local:field: amtf5: set as:if $$isempty:$cw150daysval then "" else if $$isdr:@@cwover120totalosamt then $$NettAmount:$cw150daysval:@@cwover150totalosamt else ""
    local:field: amtf6: set as:if $$isempty:$cw180daysval then "" else if $$isdr:@@cwover150totalosamt then $$NettAmount:$cw180daysval:@@cwover180totalosamt else ""
    local:field: amtf7: set as:if $$isempty:$cw180daysvalmore then "" else if $$isdr:@@cwover180totalosamt then $$NettAmount:@@cwtotalosamt:$cw180daysvalmore else ""
    local:field: amtf20: set as:$$NettAmount:@@cwunajtval:@@cwcrnoteamt
    local: field: amtf20: Invisible: yes
    Local: Field:amtf8: Set As:$ClosingBalance
    Local: Field:amtf1: Set As:$openingBalance1
    Local: Field:amtf9: Set As:@@cwreceiptamt
    Local: Field:amtf10: Set As:$$CollAmtTotal:collr:$crnotevalue
    Local: Field:amtf11: Set As:""
    Local: Field:amtf12: Set As:$CreditLimit:ledger:$parent
    Local: Field:default: Border: thin right
    Local: field: amtf: Format: "drcr"
    Local: field: amtf1: Format: "drcr"
    Local: field: amtf2: Format: "drcr"
    Local: field: amtf3: Format: "drcr"
    Local: field: amtf4: Format: "drcr"
    Local: field: amtf5: Format: "drcr"
    Local: field: amtf6: Format: "drcr"
    Local: field: amtf7: Format: "drcr"
    Local: field: amtf8: Format: "drcr"
    Local: field: amtf9: Format: "drcr"
    Local: field: amtf10: Format: "drcr"
    Local: field: amtf11: Format: "drcr"
    Local: field: amtf12: Format: "drcr"
    Local: field: amtf13: Format: "drcr"
    Local: field: amtf20: Format: "drcr"
    local: field: default : style: style3x
    Local: field: amtf: Width:11
    Local: field: amtf1: Width:11
    Local: field: amtf2: Width:11
    Local: field: amtf3: Width:11
    Local: field: amtf4: Width:11
    Local: field: amtf5: Width:11
    Local: field: amtf6: Width:11
    Local: field: amtf7: Width:11
    Local: field: amtf8: Width:11
    Local: field: amtf11: Width:11
    Local: field: amtf12: Width:11
    Border:Thin top:$parent <> $$prevobj:$parent

;------------------------------------------------------------------------------
; RECEIPT/CREDIT NOTE COLLECTIONS AND FORMULAS
;------------------------------------------------------------------------------

[Collection: collrA]
    type :bills
    child of:#fwf
    compute:rcptvalue:$$FilterValue:$amount:ledgerentries:1:cwreceiptfilter
    compute:crnotevalue:$$FilterValue:$amount:ledgerentries:1:cwcrnotefilter

[Collection: collrB]
    USE: collra
    cleared:yes

[System: Formula]
    cwreceiptfilter:$$isreceipt:$vouchertypename
    cwcrnotefilter:$$iscreditnote:$vouchertypename

;------------------------------------------------------------------------------
; TOTALS LINE: DISPLAY TOTALS FOR ALL AGEING BUCKETS
;------------------------------------------------------------------------------

[line: LnAgentWiseAgeingReportTotals]
    use: LnAgentWiseAgeingReport
    option: totalOpt
    local:field: fwf: set as: "Total"
    Local: Field: default: Style: Normal Bold
    Local: field: fwf: Align: Right
    local:field: amtf: set as:$$total:amtf
    local:field: amtf2: set as:$$total:amtf2
    local:field: amtf3: set as:$$total:amtf3
    local:field: amtf4: set as:$$total:amtf4
    local:field: amtf5: set as:$$total:amtf5
    local:field: amtf6: set as:$$total:amtf6
    local:field: amtf7: set as:$$total:amtf7
    local:field: amtf8: set as:$$total:amtf8
    local:field: amtf9: set as:$$total:amtf9
    local:field: amtf10: set as:$$total:amtf10
    local:field: amtf11: set as:$$total:amtf11
    local:field: amtf12: set as:$$total:amtf12
    local: field: fwf : style:style2x
    local: field: amtf : style: style2x
    local: field: amtf2 : style:style2x
    local: field: amtf3 : style: style2x
    local: field: amtf4 : style: style2x
    local: field: amtf5 : style: style2x
    local: field: amtf6 : style: style2x
    local: field: amtf7 : style: style2x
    local: field: amtf8 : style: style2x
    local: field: amtf9 : style: style2x
    local: field: amtf10 : style: style2x
    local: field: amtf1 : style: style2x
    local: field: amtf11 : style: style2x
    local: field: amtf12 : style: style2x

;------------------------------------------------------------------------------
; FILTER BUTTON: Party/Agent Filter for the Report
;------------------------------------------------------------------------------

[button:cwagentbotton]
    key:f7
    title:"Filter"
    Action : Modify Variables:cwagentbotton

[report:cwagentbotton]
    form:cwagentbotton

[form:cwagentbotton]
    part:cwagentbotton
    HEIGHT:20
    WIDTH:30

[part:cwagentbotton]
    line:titlelinexns,ageAgentsmnsline

[line:ageAgentsmnsline]
    field:sp,nf
    Local: Field: sp: Set As:"Party Name"
    Local: Field: nf:modifies:str2
    space bottom:0.5
    Local: field: sp: Width:12
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf: table:cwledms, Not Applicable
    Local: Field: nf: Show table: Always
    Local: field: nf: Width:30


`;
export default tdl;
