// Auto-generated from MULTIPRINTZONEWISEOUTSTANDINGREPORT.TXT
const tdl = `
; Created By: Khokan on 2021-09-06 18:47
; ID: 

;====================== MENU DEFINITIONS ======================

[#menu: Gateway of Tally]
;; {06.Sep.21 19:31} Add option for Zone-Wise Outstanding Report Lock menu
    add: Option: multiprintZONEWISEOutstandingReportLock ;; : @@multiprintZONEWISEOutstandingReportDemoLock

[#menu : cw_Debug_menu]   
; Add debug menu item for displaying Zone-Wise Outstanding Report before Quit option
    add: Item: before: @@locQuit: @@multiprintZONEWISEOutstandingReportReport: Display: RepmultiprintZONEWISEOutstandingReport

[!menu: multiprintZONEWISEOutstandingReportLock]
; Add print option for Zone-Wise Outstanding Report with required collection
    add: Item: before: @@locQuit: @@multiprintZONEWISEOutstandingReportReport: print Collection: collRepmultiprintZONEWISEOutstandingReport  ;;: RepmultiprintZONEWISEOutstandingReport
; Add blank line for separation
    add: Item: before: @@locQuit: Blank

;====================== SYSTEM FORMULAS ======================

[System: formula]
; Define display name/caption for the Zone-Wise Outstanding Report
multiprintZONEWISEOutstandingReportReport:@@cwcaption4tableundernew+" "+"wise O/S Statement"
;; Lock condition for Demo purpose (commented out)
;; multiprintZONEWISEOutstandingReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;====================== COLLECTION DEFINITION ======================

[Collection: collRepmultiprintZONEWISEOutstandingReport]
; Extracts list of Cost Centres to use for Zone-wise selection
    Use         		: Extract Alias Collection
    Source	Collection	: List of Cost Centres
    Title       		: $$LocaleString:"List of Cost Centres"
    Format      		: $CstCatName
    Filter      		: CostCentreFilter
    Report      		: RepmultiprintZONEWISEOutstandingReport
    Variable    		: SCostCentre
    Trigger     		: SCostCentrex1

;====================== REPORT DEFINITION ======================

[Report: RepmultiprintZONEWISEOutstandingReport]
; Base the Zone-Wise report on existing Agent-Wise Outstanding Report
    use: RepmultiprintAGENTWISEOutstandingReport

; Remove default Agent-Wise report title and printset
    delete: Title: @@multiprintAGENTWISEOutstandingReportReport
    delete: Printset: Report Title: @@multiprintAGENTWISEOutstandingReportReport

; Add Zone-Wise report title and printset
    add: Title: @@multiprintZONEWISEOutstandingReportReport
    add: Printset: Report Title: @@multiprintZONEWISEOutstandingReportReport

;; Commented development/debug settings (preserved)
;; {06.Sep.21 17:19}        Form: FrmmultiprintSALESMANWISEOutstandingReport
;; {06.Sep.21 17:19}      Export: Yes
;; {06.Sep.21 17:19}      set  : svfromdate : ##svcurrentdate
;; {06.Sep.21 17:19}      set  : svTodate : ##svcurrentdate
;; {06.Sep.21 17:19}     Local       : Button   : RelReports        : Inactive : Yes

; Update captions in title parts with Zone-Wise report title
    local: part: multiprintAGENTWISEOutstandingReportTitlePart: local: line: DSPCompanyName: Local: Field: nf: set as: @@multiprintZONEWISEOutstandingReportReport
    local: part: PrtTitle0multiprintAGENTWISEOutstandingReport: local: line: DSPCompanyName: Local: Field: nf: set as: @@multiprintZONEWISEOutstandingReportReport

; Replace filters in Agent-Wise collections to align with Zone-wise logic
    local: Collection: ColmultiprintAGENTWISEOutstandingReport: delete: filter: cwnotcloingbalancemultiprint
    local: Collection: ColmultiprintAGENTWISEOutstandingReport: add: filter: cwnotcloingbalancemultiprintitem4

    local: Collection: ColmultiprintAGENTWISEOutstandingReporta: delete: filter: ColmultiprintAGENTWISEOutstandingReportFilterdr
    local: Collection: ColmultiprintAGENTWISEOutstandingReportb: delete: filter: ColmultiprintAGENTWISEOutstandingReportFiltercr

    local: Collection: ColmultiprintAGENTWISEOutstandingReporta: add: filter: ColmultiprintAGENTWISEOutstandingReportFiltercritem4
    local: Collection: ColmultiprintAGENTWISEOutstandingReportb: add: filter: ColmultiprintAGENTWISEOutstandingReportFilterdritem4

; Assign selected Cost Centre to field on print line
    local: part: multiagentpart: local: line: multiprintAGENTline: Local: Field: fwf: Set As: ##SCostCentre

;====================== FORMULAS ======================

[System: Formula]
; Display only ledgers under selected Zone having balances
cwnotcloingbalancemultiprintitem4: ##SCostCentre = $cwcaption4item and (not $$isempty:$OnAccountValue or not $$isempty:$closingbalance)

; Filter to include ledgers with credit balances under selected Zone
ColmultiprintAGENTWISEOutstandingReportFiltercritem4: if $cwcaption4item:ledger:$parent = ##SCostCentre then not $$isdr:$closingbalance else no

; Filter to include ledgers with debit balances under selected Zone
ColmultiprintAGENTWISEOutstandingReportFilterdritem4: if $cwcaption4item:ledger:$parent = ##SCostCentre then $$isdr:$closingbalance else no

`;
export default tdl;
