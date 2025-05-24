// Auto-generated from MULTIPRINTAREAWISEOUTSTANDINGREPORT.TXT
const tdl = `
; Created By: Khokan on 2021-09-06 17:37
; ID: 

;====================== MENU DEFINITIONS ======================

[#menu: Gateway of Tally]
;; {06.Sep.21 19:31} Add option for Area-Wise Outstanding Report Lock screen (Demo Lock condition is commented)
    add: Option: multiprintAREAWISEOutstandingReportLock ;; : @@multiprintAREAWISEOutstandingReportDemoLock

[#menu : cw_Debug_menu]   
; Add report option to Debug menu before Quit option
    add: Item: before: @@locQuit: @@multiprintAREAWISEOutstandingReportReport: Display: RepmultiprintAREAWISEOutstandingReport

[!menu: multiprintAREAWISEOutstandingReportLock]
; Add print menu for Area-Wise Outstanding Report before Quit option
    add: Item: before: @@locQuit: @@multiprintAREAWISEOutstandingReportReport: print Collection: collRepmultiprintAREAWISEOutstandingReport
    add: Item: before: @@locQuit: Blank

;====================== SYSTEM FORMULAS ======================

[System: formula]
; Caption/Title for Area-Wise Outstanding Report
multiprintAREAWISEOutstandingReportReport:@@cwcaption3tableundernew+" "+"wise O/S Statement"
;; Lock condition for Demo - currently commented
;; multiprintAREAWISEOutstandingReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;====================== COLLECTION DEFINITION ======================

[Collection: collRepmultiprintAREAWISEOutstandingReport]
; This collection pulls Cost Centres to be used in report selection
    Use         		: Extract Alias Collection
    Source	Collection	: List of Cost Centres
    Title       		: $$LocaleString:"List of Cost Centres"
    Format      		: $CstCatName
    Filter      		: CostCentreFilter
    Report      		: RepmultiprintAREAWISEOutstandingReport
    Variable    		: SCostCentre
    Trigger     		: SCostCentrex

;====================== REPORT DEFINITION ======================

[Report: RepmultiprintAREAWISEOutstandingReport]
; Base the report on existing Agent-wise Outstanding Report
    use: RepmultiprintAGENTWISEOutstandingReport

; Remove Agent-wise specific titles and printsets
    delete: Title: @@multiprintAGENTWISEOutstandingReportReport
    delete: Printset: Report Title: @@multiprintAGENTWISEOutstandingReportReport

; Add Area-wise specific titles and printsets
    add: Title: @@multiprintAREAWISEOutstandingReportReport
    add: Printset: Report Title: @@multiprintAREAWISEOutstandingReportReport

; Update local parts with new captions/titles for Area-wise Report
    local: part: multiprintAGENTWISEOutstandingReportTitlePart: local: line: DSPCompanyName: Local: Field: nf: set as: @@multiprintAREAWISEOutstandingReportReport
    local: part: PrtTitle0multiprintAGENTWISEOutstandingReport: local: line: DSPCompanyName: Local: Field: nf: set as: @@multiprintAREAWISEOutstandingReportReport

; Modify filters in collections to adapt to Area-wise requirements
    local: Collection: ColmultiprintAGENTWISEOutstandingReport: delete: filter: cwnotcloingbalancemultiprint
    local: Collection: ColmultiprintAGENTWISEOutstandingReport: add: filter: cwnotcloingbalancemultiprintitem3

    local: Collection: ColmultiprintAGENTWISEOutstandingReporta: delete: filter: ColmultiprintAGENTWISEOutstandingReportFilterdr
    local: Collection: ColmultiprintAGENTWISEOutstandingReportb: delete: filter: ColmultiprintAGENTWISEOutstandingReportFiltercr

    local: Collection: ColmultiprintAGENTWISEOutstandingReporta: add: filter: Colmultiprintareafiltermp
    local: Collection: ColmultiprintAGENTWISEOutstandingReportb: add: filter: ColmultiprintAGENTWISEOutstandingReportFilterdritem3x

; Set Cost Centre variable in multiagent part line
    local: part: multiagentpart: local: line: multiprintAGENTline: Local: Field: fwf: Set As: ##SCostCentre

;====================== FORMULAS ======================

[System: Formula]
; Filter for showing only ledgers under selected Cost Centre (Area) with non-zero balances
cwnotcloingbalancemultiprintitem3: ##SCostCentre = $cwcaption3item and (not $$isempty:$OnAccountValue or not $$isempty:$closingbalance)

; Debit closing balance filter for Area-wise collection A
Colmultiprintareafiltermp: if $cwcaption3item:ledger:$parent = ##SCostCentre then $$isdr:$closingbalance else no

; Credit closing balance filter for Area-wise collection B
ColmultiprintAGENTWISEOutstandingReportFilterdritem3x: if $cwcaption3item:ledger:$parent = ##SCostCentre then not $$isdr:$closingbalance else no

`;
export default tdl;
