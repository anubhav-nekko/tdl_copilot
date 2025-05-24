// Auto-generated from AGENTWISEAGEINGREPORT2.TXT
const tdl = `
;===============================================================================
; AGENTWISEAGEINGREPORT2.TXT
; Created By: Khokan on 2021-08-28 17:49, ID:
; Purpose: Provides an "Agent Wise Ageing Report" in Tally, showing outstanding
;          balances by period buckets (0-30, 31-60, etc.) per party/agent.
;          Includes advanced filtering, columnar breakdown, and totals.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: Add report option to Debug menu (and optionally Gateway menu)
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
;; {02.Sep.21 14:46}         add: Option: AgentWiseAgeingReport2Lock ;; : @@AgentWiseAgeingReport2DemoLock

[#menu : cw_Debug_menu]
    add: Item: before: @@locQuit: @@AgentWiseAgeingReport2Report: Display: RepAgentWiseAgeingReport2
[!menu: AgentWiseAgeingReport2Lock]
    add: Item: before: @@locQuit: @@AgentWiseAgeingReport2Report: Display Collection: collRepAgentWiseAgeingReport2
    add: Item: before: @@locQuit: Blank

;------------------------------------------------------------------------------
; COLLECTION: List of Ledgers for report trigger
;------------------------------------------------------------------------------

[Collection: collRepAgentWiseAgeingReport2]
    Use         : Extract Alias Collection
    Source Collection : List of Ledgers
    Variable    : Ledger Name
    Report      : RepAgentWiseAgeingReport2
    Trigger     : cwLedgerNamex
    Fetch       : Name

;------------------------------------------------------------------------------
; SYSTEM FORMULA: Report title (and optional demo lock)
;------------------------------------------------------------------------------

[System: formula]
    AgentWiseAgeingReport2Report: "Agent Wise Ageing Report"
;; AgentWiseAgeingReport2DemoLock: $$MachineDate < $$Date:"01/04/2013"

;------------------------------------------------------------------------------
; MAIN REPORT DEFINITION
;------------------------------------------------------------------------------

[Report: RepAgentWiseAgeingReport2]
    use: Dsp Template
    Title: @@AgentWiseAgeingReport2Report
    Printset: Report Title: @@AgentWiseAgeingReport2Report
    Form: FrmAgentWiseAgeingReport2
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes
    variable:str3,str2,str4,str5
    set:str2:""

;------------------------------------------------------------------------------
; MAIN FORM LAYOUT AND TOOLBAR BUTTONS
;------------------------------------------------------------------------------

[Form: FrmAgentWiseAgeingReport2]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0AgentWiseAgeingReport2,PrtAgentWiseAgeingReport2
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: AgentWiseAgeingReport2botbrk,AgentWiseAgeingReport2botOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    button: cwagentbotton
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSP CompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;------------------------------------------------------------------------------
; PAGE BREAK AND TITLE PARTS
;------------------------------------------------------------------------------

[part: AgentWiseAgeingReport2botBrk]
    line: EXPINV PageBreak
    border: thin top

[part: AgentWiseAgeingReport2botopbrk]
    use: dspacctitles
    add: part: AgentWiseAgeingReport2TitlePart

[part: AgentWiseAgeingReport2TitlePart]
    line: LnAgentWiseAgeingReport2Title

[line: LnAgentWiseAgeingReport2CurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf: Set As:##LedgerName
    Local: Field: fwf2:invisible: $$inprintmode

[part: PrtTitle0AgentWiseAgeingReport2]
    line : LnAgentWiseAgeingReport2CurrPeriod

;------------------------------------------------------------------------------
; MAIN DATA PART: REPEAT LINES FOR EACH PARTY/AGENT
;------------------------------------------------------------------------------

[Part: PrtAgentWiseAgeingReport2]
    Line: LnAgentWiseAgeingReport2Title,LnAgentWiseAgeingReport2Title2,LnAgentWiseAgeingReport2
    bottom Line: LnAgentWiseAgeingReport2Totals
    repeat: LnAgentWiseAgeingReport2: cwColAgentWiseAgeingReport2
    scroll: Vertical
    Common Border: YEs
    Total: Qtyf,amtf,amtf1,amtf2,amtf3,amtf4,amtf5,amtf6,amtf7,amtf8,amtf9,amtf10,amtf11,amtf12,amtf13,amtf14,amtf15

;------------------------------------------------------------------------------
; COLLECTION: Ageing data for parties under Sundry Debtors
;------------------------------------------------------------------------------

[Collection: cwColAgentWiseAgeingReport2]
    Type        : Ledger
    Fetch       : Name, Parent, closingbalance, cwcaption1item
    child of    : $$GroupSundryDebtors
    belongs to  : yes
    add:filter:ColAgentWiseAgeingReport2Filter,cwpartyagefilter,ColAgentWiseAgeingReport2Filter2,ColAgentWiseAgeingReport2Filter3

[system: Formula]
    cwpartyagefilter:if $$issysname:##str2 then yes else $name =##str2
    ColAgentWiseAgeingReport2Filter:#LedgerName=$cwcaption1item
    ColAgentWiseAgeingReport2Filter2:$$isdr:$closingbalance
    ColAgentWiseAgeingReport2Filter3:not $$isempty:$closingbalance

;------------------------------------------------------------------------------
; COLUMN HEADERS: Ageing buckets and other columns
;------------------------------------------------------------------------------

[Line: LnAgentWiseAgeingReport2Title]
    use: LnAgentWiseAgeingReport2
    option: titleopt
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
    local: field: default: Align:centre
    local: field: fwf: Align:left

[Line: LnAgentWiseAgeingReport2Title2]
    use: LnAgentWiseAgeingReport2
    option: titleopt
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
    Local: Field: amtf1: Set As:"Opening"
    Local: Field: amtf10: Set As:"Credit Note"
    Local: Field:amtf12: Set As:"Credit Limit"
    Local: field: default: Align:centre
    local: field: fwf: Align:left

;------------------------------------------------------------------------------
; MAIN DATA LINE: PARTY/AGENT AGEING DETAILS
;   (Complex field assignments and calculations are present here)
;------------------------------------------------------------------------------

[Line: LnAgentWiseAgeingReport2]
    Fields:fwf
    right field:Amtf,amtf26,amtf27,amtf28,Amtf2,amtf29,amtf30,Amtf3,amtf31,amtf32,amtf47,Amtf4,amtf33,amtf34,amtf48,Amtf5,amtf35,amtf36,amtf49 ,Amtf6,amtf37,amtf38,amtf50,Amtf7,amtf39,amtf40,Amtf13,Amtf8,unadjustedf,Amtf11,Amtf12
    Local: Field: fwf: set as: $name
    ;; (Many Local: Field assignments for ageing buckets and totals)
    Local: Field: amtf8: Set As: $ClosingBalance
    Local: Field: amtf12: Set As: $CreditLimit:ledger:$name

;------------------------------------------------------------------------------
; TOTALS LINE: DISPLAY TOTALS FOR ALL AGEING BUCKETS
;------------------------------------------------------------------------------

[line: LnAgentWiseAgeingReport2Totals]
    use: LnAgentWiseAgeingReport2
    option: totalOpt
    local: field: fwf: set as: "Total"
    Local: Field: default: Style: Normal Bold
    Local: field: fwf: Align: Right
    local:field: amtf: set as:$$total:amtf
    local:field: amtf1: set as:$$total:amtf1
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


`;
export default tdl;
