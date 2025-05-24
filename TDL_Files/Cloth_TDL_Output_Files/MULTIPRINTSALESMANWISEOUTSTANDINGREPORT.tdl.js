// SalesmanWiseOutstandingReport.tdl.js

const salesmanWiseOutstandingReportTDL = `
;===============================================================================
;  Multi-Print “Salesman-Wise Outstanding” Statement                            
;  --------------------------------------------------------------------------  
;  • Original Snippet  : Khokan (06-Sep-2021)                                   
;-------------------------------------------------------------------------------

;===============================================================================
; 1.  MENU HOOKS                                                                
;===============================================================================

[#menu: Gateway of Tally]
;; {06.Sep.21 19:30}         add: Option: multiprintSALESMANWISEOutstandingReportLock ;; : @@multiprintSALESMANWISEOutstandingReportDemoLock

[#menu : cw_Debug_menu]
add: Item: before: @@locQuit: @@multiprintSALESMANWISEOutstandingReportReport: Display: RepmultiprintSALESMANWISEOutstandingReport

[!menu: multiprintSALESMANWISEOutstandingReportLock]
add: Item: before: @@locQuit: @@multiprintSALESMANWISEOutstandingReportReport: print Collection: collRepmultiprintSALESMANWISEOutstandingReport
add: Item: before: @@locQuit: Blank

;===============================================================================
; 2.  FORMULAE (captions & demo lock)                                            
;===============================================================================
[System: formula]
multiprintSALESMANWISEOutstandingReportReport : @@cwcaption2tableundernew + " " + "wise O/S Statement"
;; multiprintSALESMANWISEOutstandingReportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;===============================================================================
; 3.  COLLECTION THAT DRIVES BATCH-PRINT LIST                                    
;===============================================================================
[Collection: collRepmultiprintSALESMANWISEOutstandingReport]
Use               : Extract Alias Collection
Source Collection : List of Ledgers
Variable          : Ledger Name
Report            : RepmultiprintSALESMANWISEOutstandingReport
Trigger           : cwLedgerName2
Fetch             : Name

;===============================================================================
; 4.  REPORT DERIVED FROM “AGENT-WISE Outstanding”                              
;===============================================================================
[Report: RepmultiprintSALESMANWISEOutstandingReport]
Use    : RepmultiprintAGENTWISEOutstandingReport

Delete : Title    : @@multiprintAGENTWISEOutstandingReportReport
Delete : Printset : Report Title: @@multiprintAGENTWISEOutstandingReportReport

Add    : Title    : @@multiprintSALESMANWISEOutstandingReportReport
Add    : Printset : Report Title: @@multiprintSALESMANWISEOutstandingReportReport

;; {06.Sep.21 17:19}        Form: FrmmultiprintSALESMANWISEOutstandingReport
;; {06.Sep.21 17:19}      Export: Yes
;; {06.Sep.21 17:19}      set  : svfromdate : ##svcurrentdate
;; {06.Sep.21 17:19}      set  : svTodate : ##svcurrentdate
;; {06.Sep.21 17:19}     Local       : Button   : RelReports        : Inactive : Yes

local:part: multiprintAGENTWISEOutstandingReportTitlePart:local:line:DSPCompanyName:Local: Field:nf: Set As: @@multiprintSALESMANWISEOutstandingReportReport
local:part: PrtTitle0multiprintAGENTWISEOutstandingReport:local:line:DSPCompanyName:Local: Field:nf: Set As: @@multiprintSALESMANWISEOutstandingReportReport

local:Collection: ColmultiprintAGENTWISEOutstandingReport            : delete: filter : cwnotcloingbalancemultiprint
local:Collection: ColmultiprintAGENTWISEOutstandingReport            : add   : filter : cwnotcloingbalancemultiprintitem2

local:Collection: ColmultiprintAGENTWISEOutstandingReporta           : delete: filter : ColmultiprintAGENTWISEOutstandingReportFilterdr
local:Collection: ColmultiprintAGENTWISEOutstandingReportb           : delete: filter : ColmultiprintAGENTWISEOutstandingReportFiltercr

local:Collection: ColmultiprintAGENTWISEOutstandingReporta           : add   : filter : ColmultiprintAGENTWISEOutstandingReportFiltercritem2
local:Collection: ColmultiprintAGENTWISEOutstandingReportb           : add   : filter : ColmultiprintAGENTWISEOutstandingReportFilterdritem2x

local:part: multiagentpart : local:line:multiprintAGENTline : Local: Field: fwf: Set As: ##LedgerName

;===============================================================================
; 5.  ADDITIONAL FORMULAE FOR NEW FILTERS                                        
;===============================================================================
[System: Formula]
cwnotcloingbalancemultiprintitem2                : ##ledgername = $cwcaption2item           and (NOT $$isempty:$OnAccountValue OR NOT $$isempty:$closingbalance)
ColmultiprintAGENTWISEOutstandingReportFiltercritem2 : if $cwcaption2item:ledger:$parent = ##LedgerName then $$isdr:$closingbalance     else No
ColmultiprintAGENTWISEOutstandingReportFilterdritem2x: if $cwcaption2item:ledger:$parent = ##LedgerName then NOT $$isdr:$closingbalance else No

;===============================================================================
;                                 END OF FILE                                   
;===============================================================================
`;

module.exports = salesmanWiseOutstandingReportTDL;
